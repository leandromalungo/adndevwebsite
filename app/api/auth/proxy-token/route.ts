import { NextRequest, NextResponse } from "next/server";
import { generateProxyToken } from "@/lib/auth-node";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

/**
 * TOKEN EXCHANGE ENDPOINT
 * Gera um JWT Proxy de curta duração baseado na sessão NextAuth.
 */
export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    try {
        const rateLimit = await checkRateLimit(ip, "api");
        if (!rateLimit.allowed) {
            return NextResponse.json({ message: "Muitas solicitações" }, { status: 429 });
        }

        // 1. Verificação de Sessão (NextAuth Backend-only)
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Sessão ausente ou inválida" }, { status: 401 });
        }

        const { service } = await request.json();

        // 2. Gerar JWT Proxy Seguro (Expiração de 5 min)
        const proxyToken = generateProxyToken(session.user.id, service || "generic");

        return NextResponse.json({ proxyToken });

    } catch (error: any) {
        console.error("[INTERNAL] Token Exchange Error:", error.message);
        return NextResponse.json({ message: "Erro ao gerar token de segurança" }, { status: 401 });
    }
}
