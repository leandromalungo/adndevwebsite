import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { stripe } from "@/lib/stripe";
import { SECURITY_HEADERS } from "@/lib/security";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const dynamic = 'force-dynamic';

// === Redis Rate Limiter ===
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // max 10 requests/min por IP
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    // 1️⃣ Rate Limiting
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { message: "Muitas solicitações. Tente novamente mais tarde." },
        { status: 429 }
      );
    }

    // 2️⃣ Autenticação via NextAuth (backend-only)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }
    const userId = session.user.id;

    // 3️⃣ Verificação: usuário existe no Firebase
    const userDoc = await adminDb.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    // 4️⃣ Buscar a assinatura mais recente com Customer ID do Stripe
    const subQuery = await adminDb.collection("subscriptions")
      .where("userId", "==", userId)
      .where("stripeCustomerId", "!=", null)
      .limit(1)
      .get();

    if (subQuery.empty) {
      return NextResponse.json({ message: "Nenhuma assinatura Stripe encontrada" }, { status: 404 });
    }

    const subData = subQuery.docs[0].data();
    const stripeCustomerId = subData.stripeCustomerId;

    // 5️⃣ Criar sessão do portal Stripe no backend
    const returnOrigin = request.headers.get("origin") || request.nextUrl.origin;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${returnOrigin}/perfil`,
    });

    const response = NextResponse.json({ url: portalSession.url });

    // 6️⃣ Adiciona headers de segurança
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;

  } catch (error: any) {
    // Logging seguro, sem expor payload
    console.error("[INTERNAL] Portal session error:", error.message);

    const safeMessage = process.env.NODE_ENV === 'production'
      ? "Erro ao abrir portal. Entre em contato com o suporte."
      : `Erro: ${error.message}`;

    return NextResponse.json({ message: safeMessage }, { status: 500 });
  }
}
