import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { sanitizeText, sanitizeEmail, generateFingerprint, SECURITY_HEADERS } from "@/lib/security";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // 1️⃣ RATE LIMIT (mantido)
        const rateLimit = await checkRateLimit(ip, "subscription");
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { message: "Muitas solicitações. Aguarde uma hora." },
                {
                    status: 429,
                    headers: {
                        'Retry-After': '3600',
                        'X-RateLimit-Limit': '3',
                        'X-RateLimit-Remaining': '0'
                    }
                }
            );
        }

        // 2️⃣ CORS (mantido)
        const allowedOrigins = process.env.NODE_ENV === 'production'
            ? [process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com']
            : ['http://localhost:3000', 'http://localhost:3001'];

        const origin = request.headers.get('origin');
        if (origin && !allowedOrigins.includes(origin)) {
            return NextResponse.json({ message: "Origem não autorizada" }, { status: 403 });
        }

        // 3️⃣ Content-Type (mantido)
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json({ message: "Content-Type inválido" }, { status: 415 });
        }

        // 4️⃣ Autenticação (mantido)
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const userId = session.user.id;

        // ✅ NOVO: Garantir que usuário existe no Firebase
        const userDoc = await adminDb.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            return NextResponse.json({ message: "Usuário inválido." }, { status: 401 });
        }

        const body = await request.json();
        const { plan, email, name, country } = body;

        // 5️⃣ Input Length (mantido)
        if (name && name.length > 100) {
            return NextResponse.json({ message: "Nome muito longo" }, { status: 400 });
        }
        if (email && email.length > 254) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }
        if (country && country.length > 50) {
            return NextResponse.json({ message: "País inválido" }, { status: 400 });
        }

        // 6️⃣ Sanitização (mantido)
        const sName = sanitizeText(name || "");
        const sEmail = sanitizeEmail(email || session.user.email || "");
        const sPlan = sanitizeText(plan || "premium");
        const sCountry = sanitizeText(country || "Angola");

        if (!sEmail) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }

        // ✅ NOVO: Plano não pode ser manipulado
        const allowedPlans = ["premium"];
        if (!allowedPlans.includes(sPlan)) {
            return NextResponse.json({ message: "Plano inválido." }, { status: 400 });
        }

        // ✅ NOVO: País não pode ser manipulado
        const allowedCountries = ["Angola", "Brasil", "Portugal"];
        if (!allowedCountries.includes(sCountry)) {
            return NextResponse.json({ message: "País inválido." }, { status: 400 });
        }

        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        // ✅ NOVO: TRANSACTION (Race condition fix)
        const subRef = adminDb.collection("subscriptions").doc();
        const internalSubId = subRef.id;

        await adminDb.runTransaction(async (transaction) => {
            const userSubsQuery = await adminDb.collection("subscriptions")
                .where("userId", "==", userId)
                .get();

            const userSubs = userSubsQuery.docs.map(doc => doc.data());

            const hasActiveSub = userSubs.some(sub => sub.status === "active");
            if (hasActiveSub) {
                throw new Error("ACTIVE_SUB_EXISTS");
            }

            const hasRecentPending = userSubs.some(sub =>
                sub.status === "pending" &&
                sub.createdAt &&
                new Date(sub.createdAt) > fiveMinutesAgo
            );

            if (hasRecentPending) {
                throw new Error("RECENT_PENDING_EXISTS");
            }

            // cria registro intermediário para travar concorrência
            transaction.set(subRef, {
                userId,
                name: sName,
                email: sEmail,
                plan: sPlan,
                paymentMethod: "stripe",
                status: "creating",
                createdAt: now,
            });
        });

        // Fingerprint (mantido)
        const fingerprint = await generateFingerprint(userAgent, ip);

        // Backend-driven pricing (mantido)
        let currency = 'usd';
        let unitAmount = 200;

        switch (sCountry) {
            case 'Brasil':
                currency = 'brl';
                unitAmount = 1200;
                break;
            case 'Portugal':
                currency = 'eur';
                unitAmount = 200;
                break;
        }

        const requestOrigin = request.headers.get("origin") || request.nextUrl.origin;

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'link', 'revolut_pay', 'paypal'],
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: `Assinatura ADN Developer (${sCountry}) - ${sPlan}`,
                            description: 'Acesso completo ao maior repositório de tecnologia da lusofonia.',
                        },
                        unit_amount: unitAmount,
                        recurring: { interval: 'month' },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${requestOrigin}/perfil?session_id={CHECKOUT_SESSION_ID}&success=true`,
            cancel_url: `${requestOrigin}/assinatura`,
            customer_email: sEmail,
            client_reference_id: userId,
            metadata: {
                userId,
                internalSubscriptionId: internalSubId,
                plan: sPlan
            },
        } as any);

        // Atualiza para pending
        await subRef.update({
            status: "pending",
            stripeSessionId: checkoutSession.id,
            fingerprint,
        });

        // Audit log (mantido)
        await logSecurityAction({
            adminEmail: sEmail,
            action: "SUBSCRIPTION_CREATE_STRIPE_SESSION",
            entity: "Subscription",
            entityId: internalSubId,
            ip,
            userAgent,
            details: { plan: sPlan, stripeSessionId: checkoutSession.id }
        });

        const response = NextResponse.json({
            url: checkoutSession.url,
            subscriptionId: internalSubId
        });

        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {

        if (error.message === "ACTIVE_SUB_EXISTS") {
            return NextResponse.json(
                { message: "Você já possui uma assinatura ativa." },
                { status: 400 }
            );
        }

        if (error.message === "RECENT_PENDING_EXISTS") {
            return NextResponse.json(
                { message: "Já existe um checkout em andamento." },
                { status: 400 }
            );
        }

        console.error("[INTERNAL] Payment processing error:", error.message);

        const safeMessage = process.env.NODE_ENV === 'production'
            ? "Erro ao processar pagamento. Entre em contato com o suporte."
            : `Erro: ${error.message}`;

        return NextResponse.json(
            { message: safeMessage },
            { status: 500 }
        );
    }
}
