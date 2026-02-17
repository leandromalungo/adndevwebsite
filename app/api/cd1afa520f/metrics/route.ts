import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // 1. Verificar Autenticação Admin via NextAuth
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "admin") {
            await logSecurityAction({
                adminEmail: session?.user?.email || "unknown",
                action: "UNAUTHORIZED_METRICS_ACCESS",
                entity: "Metrics",
                ip,
                userAgent
            });
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        // 2. Buscar Métricas do Firestore
        const metricsRef = adminDb.collection("metrics_global").doc("current");
        const doc = await metricsRef.get();

        if (!doc.exists) {
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
        console.error("[INTERNAL] Metrics Error:", error.message);
        return NextResponse.json({ message: "Erro interno ao buscar métricas" }, { status: 500 });
    }
}
