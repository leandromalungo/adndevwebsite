import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware de Segurança ADN Developer
 * 
 * Protege rotas baseadas em autenticação e papéis (roles) no nível do servidor (Edge Runtime).
 * 
 * Rotas protegidas:
 * - /cd1afa520f/* - Apenas administradores (role: 'admin')
 * - /perfil/* - Utilizadores autenticados
 * - /api/cd1afa520f/* - Apenas administradores (Proteção adicional para rotas de API)
 */
export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // 1. Proteção de rotas Administrativas
        if (path.startsWith("/cd1afa520f")) {
            // Permite sempre o acesso à página de login
            if (path === "/cd1afa520f/login") {
                return NextResponse.next();
            }

            // Verifica se o utilizador tem a role de administrador
            if (token?.role !== "admin") {
                console.warn(
                    `[SECURITY] Tentativa de acesso não autorizado a ${path} por ${token?.email || "Anónimo"} (IP: ${ip}) em ${new Date().toISOString()}`
                );
                // Redireciona para o login administrativo
                return NextResponse.redirect(new URL("/cd1afa520f/login", req.url));
            }
        }

        // 2. Proteção de rotas do Utilizador (Perfil)
        if (path.startsWith("/perfil")) {
            if (!token) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            /**
             * Determina se o pedido está autorizado a prosseguir.
             * O token deve existir para rotas protegidas.
             */
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Rotas que são sempre públicas
                if (
                    path === "/" ||
                    path.startsWith("/_next") ||
                    path.startsWith("/api/auth") ||
                    path === "/cd1afa520f/login"
                ) {
                    return true;
                }

                // Rotas que requerem autenticação (token)
                if (
                    path.startsWith("/cd1afa520f") ||
                    path.startsWith("/perfil") ||
                    path.startsWith("/api/cd1afa520f")
                ) {
                    return !!token;
                }

                // Por defeito, permite outras rotas (públicas)
                return true;
            },
        },
        pages: {
            signIn: "/cd1afa520f/login",
            error: "/auth/error",
        },
    }
);

/**
 * Configuração de correspondência (matcher) para otimizar a execução do middleware.
 */
export const config = {
    matcher: [
        "/cd1afa520f/:path*",
        "/perfil/:path*",
        "/api/cd1afa520f/:path*",
    ],
};
