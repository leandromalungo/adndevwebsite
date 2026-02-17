import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import { updateSaaSMetrics } from "@/lib/admin-api/metrics";
import { logSecurityAction } from "@/lib/admin-api/audit";

// Configura o endpoint para receber dados brutos (raw body) exigidos pelo Stripe
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || !signature) {
        return NextResponse.json({ message: "Configuração de Webhook incompleta" }, { status: 400 });
    }

    let event;

    try {
        // 6. CAMADA: Validação de Assinatura
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`[SECURITY ERROR] Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ message: "Assinatura inválida" }, { status: 400 });
    }

    // 7. CAMADA: Idempotência de Eventos
    const eventRef = adminDb.collection("stripe_events").doc(event.id);
    const eventDoc = await eventRef.get();

    if (eventDoc.exists) {
        return NextResponse.json({ received: true, duplicated: true });
    }

    // Registra o evento para evitar reprocessamento
    await eventRef.set({
        type: event.type,
        processed: false,
        receivedAt: new Date().toISOString()
    });

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as any;
                const { userId, internalSubscriptionId, plan } = session.metadata;

                // Ativar assinatura no Firestore (Layer 2: Admin SDK)
                const subRef = adminDb.collection("subscriptions").doc(internalSubscriptionId);
                await subRef.update({
                    status: "active",
                    stripeCustomerId: session.customer,
                    stripeSubscriptionId: session.subscription,
                    activatedAt: new Date().toISOString(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Aproximação, será refinado via invoice
                });

                // Atualiza Métricas SaaS (MRR Tracking)
                await updateSaaSMetrics("activation", session.amount_total / 100);

                await logSecurityAction({
                    adminEmail: session.customer_email || "system",
                    action: "STRIPE_WEBHOOK_CHECKOUT_COMPLETED",
                    entity: "Subscription",
                    entityId: internalSubscriptionId,
                    ip: "stripe-webhook",
                    userAgent: "Stripe/Webhook",
                    details: { userId, plan }
                });
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as any;
                const subscriptionId = invoice.subscription;

                const subQuery = await adminDb.collection("subscriptions")
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

                const subQuery = await adminDb.collection("subscriptions")
                    .where("stripeSubscriptionId", "==", subscription.id)
                    .limit(1)
                    .get();

                if (!subQuery.empty) {
                    const subData = subQuery.docs[0].data();
                    await subQuery.docs[0].ref.update({
                        status: "canceled",
                        canceledAt: new Date().toISOString()
                    });

                    // Atualiza Métricas SaaS (Churn Tracking)
                    // Nota: O valor exato deveria vir do plano salvo
                    await updateSaaSMetrics("cancellation", 49.90);
                }
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as any;

                const subQuery = await adminDb.collection("subscriptions")
                    .where("stripeSubscriptionId", "==", subscription.id)
                    .limit(1)
                    .get();

                if (!subQuery.empty) {
                    await subQuery.docs[0].ref.update({
                        status: subscription.status === "active" ? "active" : "pending/overdue",
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString()
                    });
                }
                break;
            }
        }

        // Marca como processado com sucesso
        await eventRef.update({ processed: true, processedAt: new Date().toISOString() });

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error(`[ERROR] Processing Webhook Event ${event.id}:`, err.message);
        return NextResponse.json({ message: "Erro ao processar evento" }, { status: 500 });
    }
}
