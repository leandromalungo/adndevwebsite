import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { sanitizeEmail, generateFingerprint, SECURITY_HEADERS } from "@/lib/security";

/**
 * CAMADA DE SEGURANÇA 5 NÍVEIS PARA LOGIN DE USUÁRIO
 */
export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // 1. CAMADA: Rate Limiting (Anti-Brute Force)
        const rateLimit = await checkRateLimit(ip, "user_login");
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { message: "Muitas tentativas de login de seu IP. Aguarde 15 minutos." },
                { status: 429 }
            );
        }

        const { email } = await request.json();

        // 2. CAMADA: Token/Intent (Validação de intenção básica)
        if (!email) {
            return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
        }

        // 3. CAMADA: Sanitização de Input
        const sEmail = sanitizeEmail(email);
        if (!sEmail) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }

        // 4. CAMADA: Fingerprinting
        const fingerprint = await generateFingerprint(userAgent, ip);

        // 5. CAMADA: Audit Log (Início do Intento)
        await logSecurityAction({
            adminEmail: sEmail,
            action: "USER_LOGIN_INTENT",
            entity: "UserAuth",
            ip,
            userAgent,
            details: { fingerprint }
        });

        const response = NextResponse.json({
            success: true,
            fingerprint
        });

        // Adiciona headers de segurança
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {
        console.error("[INTERNAL] Auth Checkpoint Error:", error.message);
        return NextResponse.json({ message: "Erro de segurança" }, { status: 500 });
    }
}
