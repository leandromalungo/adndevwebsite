/**
 * Configuração do NextAuth.js
 *
 * O Frontend comunica com o backend de Cloud Functions para toda a lógica de autenticação.
 * As Cloud Functions gerem:
 * - Validação de email/password
 * - Verificação de OAuth do Google
 * - Gestão de sessões com JWT + Redis
 * - Controlo de acesso baseado em roles (RBAC)
 *
 * Este ficheiro configura o NextAuth para delegar a autenticação nas Cloud Functions.
 */

import { NextAuthOptions } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    token?: string;
  }

  interface User {
    id: string;
    role?: string;
    token?: string;
  }
}

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

/**
 * URL base das Cloud Functions, adaptada para ambiente local ou produção
 */
const CLOUD_FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://us-central1-adndev-5a2b0.cloudfunctions.net"
    : "http://localhost:5001/adndev-5a2b0/us-central1");

/**
 * Objeto de configuração do NextAuth
 * Delega toda a lógica de autenticação para as Cloud Functions.
 */
export const authOptions: NextAuthOptions = {
  // Utiliza a estratégia JWT para gestão de sessões
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias de validade
  },

  // Páginas personalizadas para fluxos de autenticação
  pages: {
    signIn: "/cd1afa520f/login",
    error: "/auth/error",
  },

  // Provedores de Autenticação
  providers: [
    /**
     * PROVEDOR DE CREDENCIAIS ADMIN
     * Chama a Cloud Function signinAdmin para validar administradores
     */
    CredentialsProvider({
      id: "admin-credentials",
      name: "Login Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        try {
          // Chamada segura ao backend para autenticação de admin
          const response = await fetch(`${CLOUD_FUNCTIONS_URL}/signinAdmin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha na autenticação");
          }

          const data = await response.json();

          // Retorna o objeto do utilizador com o token gerado pelo backend
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            token: data.token,
          };
        } catch (error: any) {
          console.error("[NextAuth] Erro no login admin:", error.message);
          throw new Error("Credenciais inválidas ou acesso negado");
        }
      },
    }),

    /**
     * PROVEDOR DE CREDENCIAIS UTILIZADOR
     * Chama a Cloud Function signinUser para autenticação padrão
     */
    CredentialsProvider({
      id: "credentials",
      name: "Login Utilizador",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        try {
          // Chamada segura ao backend para login de utilizador
          const response = await fetch(`${CLOUD_FUNCTIONS_URL}/signinUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha na autenticação");
          }

          const data = await response.json();

          // Retorna o utilizador com o JWT de sessão do backend
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            token: data.token,
          };
        } catch (error: any) {
          console.error("[NextAuth] Erro no login utilizador:", error.message);
          throw new Error("Credenciais inválidas");
        }
      },
    }),

    /**
     * PROVEDOR GOOGLE OAUTH
     * Envia o token do Google para a Cloud Function validar e criar/atualizar o perfil
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // allowDangerousEmailAccountLinking REMOVIDO — previne account takeover.
      // Um atacante com acesso ao email de outra pessoa não pode fazer merge de contas.
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  /**
   * CALLBACKS DO NEXTAUTH
   */
  callbacks: {
    /**
     * Callback de JWT: Executado quando um token JWT é criado ou atualizado
     */
    async jwt({ token, user, account }) {
      // No primeiro login, popula o token com os dados retornados pelo backend
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role || "user";
        token.cloudFunctionToken = (user as any).token;
      }

      // Se for login via Google, troca o ID Token do Google por um token do nosso backend
      if (account?.provider === "google" && account.id_token) {
        try {
          const response = await fetch(
            `${CLOUD_FUNCTIONS_URL}/signupWithGoogle`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                googleIdToken: account.id_token,
              }),
            },
          );

          if (response.ok) {
            const data = await response.json();
            token.uid = data.user.id;
            token.email = data.user.email;
            token.name = data.user.name;
            token.role = data.user.role;
            token.cloudFunctionToken = data.token;
          }
        } catch (error) {
          console.error("[NextAuth] Erro no callback do Google:", error);
        }
      }

      return token;
    },

    /**
     * Callback de Sessão: Disponibiliza os dados do token para o frontend via useSession()
     */
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.uid as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
        };
        // Armazena o token do backend para chamadas de API futuras
        (session as any).token = token.cloudFunctionToken;
      }

      return session;
    },
  },

  // Segredo usado para assinar os cookies do NextAuth
  secret: process.env.NEXTAUTH_SECRET,

  // Ativa logs de detalhados em ambiente de desenvolvimento
  debug: process.env.NODE_ENV === "development",
};
