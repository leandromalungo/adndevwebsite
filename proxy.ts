/**
 * proxy.ts — Middleware de Segurança ADN Developer
 *
 * IMPORTANTE: No Next.js 16+ com Turbopack, o ficheiro de middleware chama-se "proxy.ts".
 * O Next.js procura por este ficheiro especificamente na raiz do projeto.
 *
 * Camadas de proteção (Edge Runtime — executa antes de qualquer HTML ser gerado):
 *
 *  CAMADA 1 — /cd1afa520f/*       → Apenas administradores (role: "admin")
 *  CAMADA 1 — /api/cd1afa520f/*   → Apenas administradores (API backend)
 *  CAMADA 2 — /perfil/*           → Utilizadores autenticados (qualquer role)
 *  CAMADA 3 — /api/images/*       → Público, com rate limit via Upstash Redis
 *  CAMADA 4 — /cd1afa520f/*       → Headers de obscuridade (X-Robots-Tag: noindex)
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// ── Constantes de Rate Limit ───────────────────────────────────────────────────
// Imagens: máx 60 pedidos por IP por minuto
const IMG_RATE_LIMIT_MAX = 60;
const IMG_RATE_LIMIT_WINDOW = 60; // segundos

// Login admin: máx 5 tentativas por IP por 15 minutos (anti-brute-force)
const ADMIN_LOGIN_RATE_LIMIT_MAX = 5;
const ADMIN_LOGIN_RATE_LIMIT_WINDOW = 900; // 15 minutos em segundos

/**
 * Utilitário de rate limit via Upstash REST API (compatível com Edge Runtime)
 */
async function checkRedisRateLimit(
    key: string,
    maxRequests: number,
    windowSeconds: number,
    redisUrl: string,
    redisToken: string
): Promise<{ allowed: boolean; count: number }> {
    try {
        const incrRes = await fetch(`${redisUrl}/incr/${encodeURIComponent(key)}`, {
            headers: { Authorization: `Bearer ${redisToken}` },
        });
        if (!incrRes.ok) return { allowed: true, count: 0 };
        const incrData = await incrRes.json();
        const count = incrData.result as number;

        if (count === 1) {
            await fetch(
                `${redisUrl}/expire/${encodeURIComponent(key)}/${windowSeconds}`,
                { headers: { Authorization: `Bearer ${redisToken}` } }
            ).catch(() => { });
        }

        return { allowed: count <= maxRequests, count };
    } catch {
        // Fail-open: não bloqueia se o Redis falhar
        return { allowed: true, count: 0 };
    }
}

/**
 * Adiciona headers de segurança restritivos às respostas do painel admin
 */
function addAdminSecurityHeaders(response: NextResponse): NextResponse {
    // Previne indexação por motores de busca (obscuridade)
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    // Previne clickjacking — mais restritivo que SAMEORIGIN
    response.headers.set("X-Frame-Options", "DENY");
    // Sem cache de páginas admin
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
}

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        // IP extraído de forma segura — nunca falha
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
        const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

        // ─── 1. PROTEÇÃO DAS ROTAS ADMINISTRATIVAS ──────────────────────────────
        if (
            path.startsWith("/cd1afa520f") ||
            path.startsWith("/api/cd1afa520f")
        ) {
            // Página de login pública — rate limit anti-brute-force
            if (path === "/cd1afa520f/login") {
                if (redisUrl && redisToken) {
                    const result = await checkRedisRateLimit(
                        `rl:admin_login:${ip}`,
                        ADMIN_LOGIN_RATE_LIMIT_MAX,
                        ADMIN_LOGIN_RATE_LIMIT_WINDOW,
                        redisUrl,
                        redisToken
                    );
                    if (!result.allowed) {
                        // Resposta 429 sem corpo JSON — minimiza informação para atacantes
                        const blockedRes = new NextResponse(null, { status: 429 });
                        blockedRes.headers.set("Retry-After", String(ADMIN_LOGIN_RATE_LIMIT_WINDOW));
                        return addAdminSecurityHeaders(blockedRes);
                    }
                }
                const loginRes = NextResponse.next();
                return addAdminSecurityHeaders(loginRes);
            }

            // Verifica role de administrador — bloqueia sem revelar informação
            if (token?.role !== "admin") {
                // Redirect silencioso: sem ?error= na URL (previne enumeração)
                const loginUrl = new URL("/cd1afa520f/login", req.url);
                const redirectRes = NextResponse.redirect(loginUrl);
                return addAdminSecurityHeaders(redirectRes);
            }

            // Admin autenticado — continua com headers de segurança
            const adminRes = NextResponse.next();
            return addAdminSecurityHeaders(adminRes);
        }

        // ─── 2. PROTEÇÃO DO PERFIL DE UTILIZADOR ────────────────────────────────
        if (path.startsWith("/perfil")) {
            if (!token) {
                // Redirect silencioso para homepage
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        // ─── 3. RATE LIMIT NAS IMAGENS ───────────────────────────────────────────
        if (path.startsWith("/api/images")) {
            if (redisUrl && redisToken) {
                const { allowed } = await checkRedisRateLimit(
                    `rl:img:${ip}`,
                    IMG_RATE_LIMIT_MAX,
                    IMG_RATE_LIMIT_WINDOW,
                    redisUrl,
                    redisToken
                );

                if (!allowed) {
                    return new NextResponse(null, {
                        status: 429,
                        headers: {
                            "Retry-After": String(IMG_RATE_LIMIT_WINDOW),
                            "X-RateLimit-Limit": String(IMG_RATE_LIMIT_MAX),
                            "X-RateLimit-Remaining": "0",
                        },
                    });
                }
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            /**
             * Controla se o pedido entra no middleware ou é redirecionado pelo withAuth.
             * true = entra no middleware acima, false = withAuth redireciona para signIn.
             */
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Rotas públicas — não requerem token
                if (
                    path === "/" ||
                    path.startsWith("/_next") ||
                    path.startsWith("/api/auth") ||
                    path === "/cd1afa520f/login" ||
                    path.startsWith("/api/images")
                ) {
                    return true;
                }

                // Admin, perfil e API admin — entram no middleware para verificação granular
                if (
                    path.startsWith("/cd1afa520f") ||
                    path.startsWith("/perfil") ||
                    path.startsWith("/api/cd1afa520f")
                ) {
                    return true; // O middleware decide o que fazer
                }

                // Todas as outras rotas são públicas
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
 * Matcher — define quais rotas passam pelo Edge Middleware.
 * Next.js exclui automaticamente _next/static, _next/image, favicons, etc.
 */
export const config = {
    matcher: [
        "/cd1afa520f/:path*",
        "/perfil/:path*",
        "/api/cd1afa520f/:path*",
        "/api/images/:path*",
    ],
};
