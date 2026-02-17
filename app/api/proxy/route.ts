import { NextRequest, NextResponse } from "next/server";
import { validateProxyToken } from "@/lib/auth-node";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { SECURITY_HEADERS } from "@/lib/security";

/**
 * PROXY DE API SEGURO
 * Centraliza requisições para Stripe, Multicaixa e outros serviços.
 * Exige JWT com escopo e expiração curta.
 */
export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 1. Rate Limiting (Camada 1)
    const rateLimit = await checkRateLimit(ip, "api");
    if (!rateLimit.allowed) {
        return NextResponse.json({ message: "Muitas solicitações" }, { status: 429 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const service = searchParams.get("service");

        // 2. Validação de Token Proxy (JWT)
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Token ausente" }, { status: 401 });
        }

        const token = authHeader.split("Bearer ")[1];
        const payload = await validateProxyToken(token);

        if (!payload || (service && payload.service !== service)) {
            await logSecurityAction({
                adminEmail: "unknown",
                action: "PROXY_UNAUTHORIZED_ACCESS",
                entity: "Proxy",
                ip,
                userAgent,
                details: { service, reason: "Invalid token or scope" }
            });
            return NextResponse.json({ message: "Acesso não autorizado ao Proxy" }, { status: 403 });
        }

        const body = await request.json();

        // 3. Encaminhamento para Serviços Internos Protegidos
        let result;
        if (service === "stripe") {
            // Internamente chama a rota de checkout (que já tem suas camadas)
            const res = await fetch(`${new URL(request.url).origin}/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Repassa o token se necessário ou usa admin key
                },
                body: JSON.stringify(body)
            });
            result = await res.json();
        } else if (service === "multicaixa") {
            const res = await fetch(`${new URL(request.url).origin}/api/create-reference`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            result = await res.json();
        } else {
            return NextResponse.json({ message: "Serviço desconhecido" }, { status: 400 });
        }

        // 4. Log de Sucesso
        await logSecurityAction({
            adminEmail: payload.userId || "user",
            action: `PROXY_SUCCESS_${service.toUpperCase()}`,
            entity: "Proxy",
            ip,
            userAgent,
            details: { service }
        });

        const response = NextResponse.json(result);

        // Aplica headers de segurança
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {
        console.error("[INTERNAL] Proxy Error:", error.message);
        return NextResponse.json({ message: "Erro interno no Proxy" }, { status: 500 });
    }
}
