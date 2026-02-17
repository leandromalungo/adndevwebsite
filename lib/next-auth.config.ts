/**
 * NextAuth.js Configuration
 * 
 * Centralizes all authentication logic on the backend.
 * The frontend NEVER validates credentials or tokens - it only sends requests.
 * 
 * Supports:
 * - Admin authentication (with role validation)
 * - User authentication (normal users)
 * - Session management with JWT
 * - Role-based access control (RBAC)
 */

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebase-admin";

/**
 * NextAuth configuration object.
 * All authentication logic happens here on the backend.
 */
export const authOptions: NextAuthOptions = {
    // Use JWT strategy for session management
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // Custom pages for authentication flows
    pages: {
        signIn: "/cd1afa520f/login", // Default admin login page
        error: "/auth/error",
    },

    // Authentication providers
    providers: [
        /**
         * ADMIN CREDENTIALS PROVIDER
         * Backend validates admin credentials and role.
         * Frontend just sends email/password - NO validation.
         */
        CredentialsProvider({
            id: "admin-credentials",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Backend validation only - frontend sends raw credentials
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios");
                }

                try {
                    // Step 1: Verify password using Firebase Auth REST API
                    const idToken = await verifyFirebasePassword(
                        credentials.email,
                        credentials.password
                    );

                    // Step 2: Verify the ID token and get user data
                    const decodedToken = await adminAuth.verifyIdToken(idToken);

                    // Step 3: Get user record to check custom claims
                    const userRecord = await adminAuth.getUser(decodedToken.uid);
                    const customClaims = userRecord.customClaims || {};

                    // Step 4: Validate admin role
                    if (customClaims.admin !== true && customClaims.role !== "admin") {
                        throw new Error("Acesso negado. Usuário não é administrador.");
                    }

                    // Return user object for session
                    return {
                        id: userRecord.uid,
                        email: userRecord.email!,
                        name: userRecord.displayName || userRecord.email!,
                        role: "admin",
                    };
                } catch (error: any) {
                    // Generic error - don't expose details to frontend
                    console.error("[NextAuth] Admin login error:", error.message);
                    throw new Error("Credenciais inválidas ou acesso negado");
                }
            },
        }),

        /**
         * USER CREDENTIALS PROVIDER
         * Backend validates normal user credentials.
         * Frontend just sends email/password - NO validation.
         */
        CredentialsProvider({
            id: "credentials",
            name: "User Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Backend validation only
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios");
                }

                try {
                    // Step 1: Verify password using Firebase Auth REST API
                    const idToken = await verifyFirebasePassword(
                        credentials.email,
                        credentials.password
                    );

                    // Step 2: Verify the ID token and get user data
                    const decodedToken = await adminAuth.verifyIdToken(idToken);

                    // Step 3: Get user record to check custom claims
                    const userRecord = await adminAuth.getUser(decodedToken.uid);
                    const customClaims = userRecord.customClaims || {};

                    // Step 4: Ensure user is NOT an admin
                    if (customClaims.admin === true || customClaims.role === "admin") {
                        throw new Error("Use o painel de administrador para fazer login");
                    }

                    // Return user object for session
                    return {
                        id: userRecord.uid,
                        email: userRecord.email!,
                        name: userRecord.displayName || userRecord.email!,
                        role: "user",
                    };
                } catch (error: any) {
                    console.error("[NextAuth] User login error:", error.message);
                    throw new Error("Credenciais inválidas");
                }
            },
        }),
    ],

    /**
     * JWT CALLBACK
     * Adds custom data to the JWT token (backend only).
     * This data is encrypted and stored in the session cookie.
     */
    callbacks: {
        async jwt({ token, user, account }) {
            // On first sign in, add user data to token
            if (user) {
                token.uid = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = (user as any).role || "user";
            }

            return token;
        },

        /**
         * SESSION CALLBACK
         * Exposes safe user data to the frontend.
         * Frontend receives this via useSession() - NO sensitive data exposed.
         */
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.uid as string,
                    email: token.email as string,
                    name: token.name as string,
                    role: token.role as string,
                };
            }

            return session;
        },
    },

    // Security settings
    secret: process.env.NEXTAUTH_SECRET,

    // Enable debug in development
    debug: process.env.NODE_ENV === "development",
};

/**
 * Helper function to verify password using Firebase Auth REST API.
 * This is needed because Firebase Admin SDK doesn't verify passwords.
 * 
 * @param email - User email
 * @param password - User password
 * @returns Firebase ID token if valid
 */
export async function verifyFirebasePassword(
    email: string,
    password: string
): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Invalid credentials");
    }

    const data = await response.json();
    return data.idToken;
}
