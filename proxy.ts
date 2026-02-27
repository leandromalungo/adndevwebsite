import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Middleware de Segurança ADN Developer — proxy.ts
 *
 * No Next.js 16+ (Turbopack), o ficheiro de middleware chama-se "proxy.ts".
 * Protege rotas baseadas em autenticação e papéis (roles) no nível do servidor (Edge Runtime).
 *
 * Rotas protegidas:
 * - /cd1afa520f/*       — Apenas administradores (role: "admin")
 * - /api/cd1afa520f/*   — Apenas administradores (proteção adicional de API)
 * - /perfil/*           — Utilizadores autenticados (qualquer role)
 * - /api/images/*       — Público, mas com rate limit via Upstash Redis
 */

// Rate limit: max pedidos por IP por janela de tempo (imagens)
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW = 60; // segundos

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

        // ─── 1. PROTEÇÃO DAS ROTAS ADMINISTRATIVAS ──────────────────────────────
        if (path.startsWith("/cd1afa520f") || path.startsWith("/api/cd1afa520f")) {
            // A página de login é sempre pública
            if (path === "/cd1afa520f/login") {
                return NextResponse.next();
            }

            // Verifica se o token tem a role de administrador
            if (token?.role !== "admin") {
                console.warn(
                    `[SECURITY] Acesso não autorizado a ${path} por ${token?.email || "Anónimo"
                    } (IP: ${ip}) em ${new Date().toISOString()}`
                );
                const loginUrl = new URL("/cd1afa520f/login", req.url);
                loginUrl.searchParams.set("error", "AccessDenied");
                return NextResponse.redirect(loginUrl);
            }
        }

        // ─── 2. PROTEÇÃO DO PERFIL DE UTILIZADOR ────────────────────────────────
        if (path.startsWith("/perfil")) {
            if (!token) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        // ─── 3. RATE LIMIT NAS IMAGENS (via Upstash Redis) ───────────────────────
        if (path.startsWith("/api/images")) {
            try {
                const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
                const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

                if (redisUrl && redisToken) {
                    const key = `rl:img:${ip}`;

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
                            `[RATE LIMIT] IP ${ip} atingiu o limite de imagens (${count}/${RATE_LIMIT_MAX}) em ${new Date().toISOString()}`
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
                // Rate limit não bloqueia se o Redis falhar
                console.error("[RATE LIMIT] Erro ao verificar rate limit:", e);
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            /**
             * Determina se o pedido é entregue ao middleware acima ou redirecionado
             * automaticamente pelo withAuth para a página de signIn.
             */
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Rotas sempre públicas
                if (
                    path === "/" ||
                    path.startsWith("/_next") ||
                    path.startsWith("/api/auth") ||
                    path === "/cd1afa520f/login"
                ) {
                    return true;
                }

                // Imagens são públicas mas passam pelo middleware (para rate limit)
                if (path.startsWith("/api/images")) {
                    return true;
                }

                // Rotas que requerem autenticação
                if (
                    path.startsWith("/cd1afa520f") ||
                    path.startsWith("/perfil") ||
                    path.startsWith("/api/cd1afa520f")
                ) {
                    return !!token;
                }

                // Por defeito, permite rotas públicas
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
 * Matcher — define quais rotas passam pelo middleware.
 * Exclui automaticamente _next/static, _next/image, favicons, etc.
 */
export const config = {
    matcher: [
        "/cd1afa520f/:path*",
        "/perfil/:path*",
        "/api/cd1afa520f/:path*",
        "/api/images/:path*",
    ],
};
