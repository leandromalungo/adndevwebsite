import 'server-only';
import NextAuth, { type NextAuthOptions, type DefaultSession, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "@/lib/supabase/admin";
import bcrypt from "bcryptjs";
import { SESSION_CONFIG, generateExpiryTimestamp } from "@/lib/session";
import { loginRateLimit, checkLoginAttempts, recordFailedLogin, clearLoginAttempts } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { isAdminEmail } from "@/lib/admin-auth";
import { trackEvent } from "@/lib/analytics";
import { isEmailVerified } from "@/lib/email-verification";

// -----------------------------------------------------------------------
// SEGURANÇA: Busca utilizador para autenticação.
// -----------------------------------------------------------------------
const getPasswordHash = async (email: string): Promise<string | null> => {
  try {
    const { data } = await supabaseAdmin
      .from("users")
      .select("password")
      .eq("email", email)
      .single();
    
    return data?.password ?? null;
  } catch (err) {
    return null;
  }
};

const getUserForSession = async (email: string) => {
  try {
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, email, name, image")
      .eq("email", email)
      .single();
    
    if (!user) return null;

    const { data: profile } = await supabaseAdmin
      .from("user_profiles")
      .select("username")
      .eq("user_id", user.id)
      .single();

    return {
      ...user,
      username: profile?.username || user.name,
      image: user.image
    };
  } catch (err) {
    return null;
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      image?: string | null;
      isAdmin?: boolean;
    } & DefaultSession["user"];
    expiresAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    expiresAt?: string;
    isAdmin?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Supabase",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
        const identifier = `${credentials.email}:${ip}`; // Track per email+IP combination

        // Check progressive blocking first
        const attemptCheck = await checkLoginAttempts(identifier);
        if (!attemptCheck.allowed) {
          await trackEvent({
            eventType: "login_failed",
            userEmail: credentials.email,
            metadata: { reason: "progressive_block" },
          });
          throw new Error(attemptCheck.message || "Conta temporariamente bloqueada devido a muitas tentativas falhadas.");
        }

        // Check basic rate limit
        const { success } = await loginRateLimit.limit(ip);
        if (!success) {
          await trackEvent({
            eventType: "login_failed",
            userEmail: credentials.email,
            metadata: { reason: "rate_limit" },
          });
          throw new Error("Muitas tentativas de login. Tente novamente em 15 minutos.");
        }

        try {
          const passwordHash = await getPasswordHash(credentials.email);
          
          if (!passwordHash) {
            await trackEvent({
              eventType: "login_failed",
              userEmail: credentials.email,
              metadata: { reason: "invalid_credentials" },
            });
            throw new Error("Email ou senha inválidos. Tente novamente.");
          }

          const isValid = await bcrypt.compare(credentials.password, passwordHash);
          if (!isValid) {
            await trackEvent({
              eventType: "login_failed",
              userEmail: credentials.email,
              metadata: { reason: "invalid_credentials" },
            });
            throw new Error("Email ou senha inválidos. Tente novamente.");
          }

          const user = await getUserForSession(credentials.email);
          if (!user) {
            await recordFailedLogin(identifier);
            await trackEvent({
              eventType: "login_failed",
              userEmail: credentials.email,
              metadata: { reason: "session_load_error" },
            });
            throw new Error("Erro ao carregar sessão.");
          }

          const verified = await isEmailVerified(credentials.email);
          if (!verified) {
            await recordFailedLogin(identifier);
            await trackEvent({
              eventType: "login_failed",
              userEmail: credentials.email,
              metadata: { reason: "email_not_verified" },
            });
            throw new Error("Conta não verificada. Verifique seu email antes de entrar.");
          }

          const userIsAdmin = isAdminEmail(user.email);

          // Clear failed attempts on successful login
          await clearLoginAttempts(identifier);
          await trackEvent({
            eventType: "login_success",
            userId: user.id,
            userEmail: user.email,
            metadata: { admin: userIsAdmin },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image ?? null,
            username: user.username,
            expiresAt: generateExpiryTimestamp(SESSION_CONFIG.MAX_AGE_HOURS),
            isAdmin: userIsAdmin,
          };
        } catch (error: any) {
          // Only record failed login for auth errors, not for rate limiting errors
          if (error.message.includes("Email ou senha inválidos")) {
            await recordFailedLogin(identifier);
          }
          console.error("[auth] Falha na autenticação do utilizador");
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: SESSION_CONFIG.MAX_AGE_SECONDS,
    updateAge: SESSION_CONFIG.UPDATE_AGE_SECONDS,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.picture = (user as any).image;
        token.expiresAt = (user as any).expiresAt || generateExpiryTimestamp(SESSION_CONFIG.MAX_AGE_HOURS);
        token.isAdmin = Boolean((user as any).isAdmin);
      }
      if (trigger === "update" && session && typeof session === "object") {
        const s = session as { image?: string | null };
        if (s.image !== undefined) token.picture = s.image;
      }

      if (token.expiresAt) {
        const expiresAtMs = new Date(token.expiresAt).getTime();
        if (Date.now() > expiresAtMs) return null as any;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        (session.user as any).username = token.username as string;
        session.user.image = token.picture as string | null;
        session.user.isAdmin = Boolean(token.isAdmin);
        session.expiresAt = token.expiresAt as string | undefined;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-for-ai-studio-session-auth",
};

export const auth = NextAuth(authOptions);
export const getCurrentSession = () => getServerSession(authOptions);
