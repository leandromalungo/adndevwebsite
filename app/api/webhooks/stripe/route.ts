import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import { updateSaaSMetrics } from "@/lib/admin-api/metrics";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const dynamic = "force-dynamic";

// === Redis Rate Limiter ===
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // max 10 requests/min por IP
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // Rate limit
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { message: "Muitas requisições. Tente novamente mais tarde." },
      { status: 429 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !signature) {
    return NextResponse.json(
      { message: "Configuração de webhook incompleta" },
      { status: 400 }
    );
  }

  let event;

  try {
    // 1️⃣ Validação da assinatura (segurança principal)
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[SECURITY] Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ message: "Assinatura inválida" }, { status: 400 });
  }

  // 2️⃣ Idempotência: evita processar evento duplicado
  const eventRef = adminDb.collection("stripe_events").doc(event.id);
  const eventDoc = await eventRef.get();
  if (eventDoc.exists) {
    return NextResponse.json({ received: true, duplicated: true });
  }

  await eventRef.set({
    type: event.type,
    processed: false,
    receivedAt: new Date().toISOString(),
  });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const { userId, internalSubscriptionId, plan } = session.metadata;

        // ✅ Validação: usuário deve existir
        const userDoc = await adminDb.collection("users").doc(userId).get();
        if (!userDoc.exists) {
          console.error(`[SECURITY] User ${userId} not found`);
          break;
        }

        // Atualiza assinatura no Firestore
        const subRef = adminDb.collection("subscriptions").doc(internalSubscriptionId);
        await subRef.update({
          status: "active",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          activatedAt: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

        // Atualiza métricas SaaS
        await updateSaaSMetrics("activation", session.amount_total / 100);

        // Audit log
        await logSecurityAction({
          adminEmail: session.customer_email || "system",
          action: "STRIPE_WEBHOOK_CHECKOUT_COMPLETED",
          entity: "Subscription",
          entityId: internalSubscriptionId,
          ip: "stripe-webhook",
          userAgent: "Stripe/Webhook",
          details: { userId, plan },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const subscriptionId = invoice.subscription;

        const subQuery = await adminDb
          .collection("subscriptions")
          .where("stripeSubscriptionId", "==", subscriptionId)
          .limit(1)
          .get();

        if (!subQuery.empty) {
          await subQuery.docs[0].ref.update({ status: "overdue" });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;

        const subQuery = await adminDb
          .collection("subscriptions")
          .where("stripeSubscriptionId", "==", subscription.id)
          .limit(1)
          .get();

        if (!subQuery.empty) {
          await subQuery.docs[0].ref.update({
            status: "canceled",
            canceledAt: new Date().toISOString(),
          });

          // Atualiza métricas SaaS
          await updateSaaSMetrics("cancellation", 49.90);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as any;

        const subQuery = await adminDb
          .collection("subscriptions")
          .where("stripeSubscriptionId", "==", subscription.id)
          .limit(1)
          .get();

        if (!subQuery.empty) {
          await subQuery.docs[0].ref.update({
            status: subscription.status === "active" ? "active" : "pending/overdue",
            currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
          });
        }
        break;
      }
    }

    // Marca evento como processado
    await eventRef.update({ processed: true, processedAt: new Date().toISOString() });

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[ERROR] Processing Webhook Event ${event.id}:`, err.message);
    return NextResponse.json({ message: "Erro ao processar evento" }, { status: 500 });
  }
}
