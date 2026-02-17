/**
 * NextAuth Middleware
 * 
 * Protege rotas baseado em autenticação e roles.
 * BACKEND: Valida sessão e roles - frontend não tem acesso.
 * 
 * Rotas protegidas:
 * - /cd1afa520f/* - Apenas admins
 * - /perfil - Usuários autenticados
 * - /api/cd1afa520f/* - Apenas admins (API routes)
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Proteção de rotas de admin
        if (path.startsWith("/cd1afa520f")) {
            // Permite acesso à página de login
            if (path === "/cd1afa520f/login") {
                return NextResponse.next();
            }

            // BACKEND: Verifica role de admin
            if (token?.role !== "admin") {
                return NextResponse.redirect(new URL("/cd1afa520f/login", req.url));
            }
        }

        // Proteção de rotas de usuário
        if (path.startsWith("/perfil")) {
            // BACKEND: Verifica se está autenticado
            if (!token) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            // BACKEND: Define quais rotas requerem autenticação
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Rotas públicas
                if (
                    path === "/" ||
                    path.startsWith("/_next") ||
                    path.startsWith("/api/auth") ||
                    path === "/cd1afa520f/login"
                ) {
                    return true;
                }

                // Rotas protegidas requerem token
                if (
                    path.startsWith("/cd1afa520f") ||
                    path.startsWith("/perfil") ||
                    path.startsWith("/api/cd1afa520f")
                ) {
                    return !!token;
                }

                // Outras rotas são públicas
                return true;
            },
        },
    }
);

// Configuração de rotas que o middleware deve processar
export const config = {
    matcher: [
        "/cd1afa520f/:path*",
        "/perfil/:path*",
        "/api/cd1afa520f/:path*",
    ],
};
