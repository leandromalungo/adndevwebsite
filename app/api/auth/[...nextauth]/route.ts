/**
 * NextAuth.js API Route Handler
 * 
 * This file handles ALL authentication requests.
 * The frontend sends requests here - NO authentication logic in frontend.
 * 
 * Endpoints automatically created by NextAuth:
 * - POST /api/auth/signin - Sign in
 * - POST /api/auth/signout - Sign out
 * - GET  /api/auth/session - Get session
 * - GET  /api/auth/csrf - Get CSRF token
 * - POST /api/auth/callback/:provider - Callback after authentication
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

/**
 * NextAuth handler - manages all auth endpoints.
 * Frontend calls these endpoints - backend validates everything.
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
