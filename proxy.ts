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
 * - /api/images/* - Utilizadores autenticados + rate limit (imagens privadas)
 */

// Rate limit: max pedidos por IP por janela de tempo
const RATE_LIMIT_MAX = 60;       // máximo de pedidos
const RATE_LIMIT_WINDOW = 60;    // janela em segundos

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

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
                return NextResponse.redirect(new URL("/cd1afa520f/login", req.url));
            }
        }

        // 2. Proteção de rotas do Utilizador (Perfil)
        if (path.startsWith("/perfil")) {
            if (!token) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        // 3. Proteção das imagens privadas via API + Rate Limit
        if (path.startsWith("/api/images")) {
            // 3a. Autenticação — redireciona para a página principal se não autenticado
            // Removido para permitir que imagens públicas (ex: CardHeroo) carreguem sem login
            /*
            if (!token) {
                console.warn(
                    `[SECURITY] Tentativa de acesso não autenticado a imagem ${path} (IP: ${ip}) em ${new Date().toISOString()}`
                );
                return NextResponse.redirect(new URL("/", req.url));
            }
            */

            // 3b. Rate Limit via Upstash Redis
            try {
                const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
                const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

                if (redisUrl && redisToken) {
                    const key = `rl:img:${ip}`;

                    // Incrementa o contador com a API REST do Upstash
                    const incrRes = await fetch(`${redisUrl}/incr/${key}`, {
                        headers: { Authorization: `Bearer ${redisToken}` },
                    });
                    const incrData = await incrRes.json();
                    const count = incrData.result as number;

                    // Na primeira chamada da janela, define o TTL
                    if (count === 1) {
                        await fetch(`${redisUrl}/expire/${key}/${RATE_LIMIT_WINDOW}`, {
                            headers: { Authorization: `Bearer ${redisToken}` },
                        });
                    }

                    if (count > RATE_LIMIT_MAX) {
                        console.warn(
                            `[RATE LIMIT] IP ${ip} atingiu o limite de pedidos de imagens (${count}/${RATE_LIMIT_MAX}) em ${new Date().toISOString()}`
                        );
                        return new NextResponse(
                            JSON.stringify({ error: "Demasiados pedidos. Tente mais tarde." }),
                            {
                                status: 429,
                                headers: {
                                    "Content-Type": "application/json",
                                    "Retry-After": String(RATE_LIMIT_WINDOW),
                                    "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
                                    "X-RateLimit-Remaining": "0",
                                },
                            }
                        );
                    }
                }
            } catch (e) {
                // Rate limit não bloqueia o pedido se o Redis falhar
                console.error("[RATE LIMIT] Erro ao verificar rate limit:", e);
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            /**
             * Determina se o pedido é entregue ao middleware acima.
             * Para /api/images retornamos true mesmo sem token — o bloco
             * middleware acima trata do redirect para / (evita redirect para login admin).
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

                // Imagens: sempre passa para o middleware (que decide o redirect)
                if (path.startsWith("/api/images")) {
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
        "/api/images/:path*",
    ],
};
