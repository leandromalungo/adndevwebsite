import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

/**
 * Rota para obter métricas globais do SaaS (Apenas para Admin)
 * Utiliza o NextAuth para validar a role de administrador.
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
                action: "UNAUTHORIZED_METRICS_ACCESS",
                entity: "Metrics",
                ip,
                userAgent
            });
            return NextResponse.json({ message: "Acesso não autorizado" }, { status: 401 });
        }

        // 2. Procurar Métricas no Firestore (Documento Singleton)
        const metricsRef = adminDb.collection("metrics_global").doc("current");
        const doc = await metricsRef.get();

        if (!doc.exists) {
            // Valores padrão se o documento ainda não existir
            return NextResponse.json({
                totalMRR: 0,
                totalSubscribers: 0,
                churnRate: 0,
                arpu: 0,
                lifetimeRevenue: 0,
                updatedAt: new Date().toISOString()
            });
        }

        return NextResponse.json(doc.data());
    } catch (error: any) {
        console.error("[INTERNAL] Erro ao obter métricas:", error.message);
        return NextResponse.json({ message: "Erro interno ao procurar métricas" }, { status: 500 });
    }
}
