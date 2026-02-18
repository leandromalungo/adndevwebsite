import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

/**
 * Rota para obter estatísticas resumidas do sistema (Apenas para Admin)
 * Inclui verificação de rate limiting e autenticação.
 */
export async function GET(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // CAMADA 1: Controlo de Taxa (Rate Limiting)
        const rateLimit = await checkRateLimit(ip, "api");
        if (!rateLimit.allowed) {
            return NextResponse.json({ message: "Muitas solicitações" }, { status: 429 });
        }

        // 2. Verificar Autenticação Admin via NextAuth
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "admin") {
            // Regista tentativa de acesso não autorizado
            await logSecurityAction({
                adminEmail: session?.user?.email || "unknown",
                action: "UNAUTHORIZED_STATS_ACCESS",
                entity: "Stats",
                ip,
                userAgent
            });
            return NextResponse.json({ message: "Acesso não autorizado" }, { status: 401 });
        }

        /**
         * Dados estatísticos (Simulados)
         * PONTO DE INTEGRAÇÃO: Substituir por uma query agregada no Firestore ou Cloud Function específica.
         */
        const stats = {
            totalUsers: 1247,
            activeSubscriptions: 342,
            canceledSubscriptions: 89,
            pendingSubscriptions: 23,
        };

        return NextResponse.json(stats, { status: 200 });
    } catch (error: any) {
        console.error("[INTERNAL] Erro ao obter estatísticas:", error.message);
        return NextResponse.json(
            { message: "Erro interno ao procurar estatísticas" },
            { status: 500 }
        );
    }
}
