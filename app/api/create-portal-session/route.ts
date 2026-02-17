import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { stripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { SECURITY_HEADERS } from "@/lib/security";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    try {
        // Layer 1: Rate Limiting
        const rateLimit = await checkRateLimit(ip, "api");
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { message: "Muitas solicitações. Aguarde." },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }

        // 1. Verificação de Autenticação via NextAuth (Backend-only)
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const userId = session.user.id;

        // 2. Buscar Customer ID do Stripe no Firestore
        // Buscamos a assinatura mais recente (ativa ou cancelada/expirada)
        const subQuery = await adminDb.collection("subscriptions")
            .where("userId", "==", userId)
            .where("stripeCustomerId", "!=", null)
            .limit(1)
            .get();

        if (subQuery.empty) {
            return NextResponse.json({ message: "Nenhuma assinatura conta Stripe encontrada." }, { status: 404 });
        }

        const subData = subQuery.docs[0].data();
        const stripeCustomerId = subData.stripeCustomerId;

        // 3. Criar Sessão do Portal de Clientes
        const returnOrigin = request.headers.get("origin") || request.nextUrl.origin;

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${returnOrigin}/perfil`,
        });

        const response = NextResponse.json({ url: portalSession.url });

        // Add security headers
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {
        // Layer 5: Error Sanitization
        console.error("[INTERNAL] Portal session error:", error.message);

        const safeMessage = process.env.NODE_ENV === 'production'
            ? "Erro ao abrir portal. Entre em contato com o suporte."
            : `Erro: ${error.message}`;

        return NextResponse.json({ message: safeMessage }, { status: 500 });
    }
}
