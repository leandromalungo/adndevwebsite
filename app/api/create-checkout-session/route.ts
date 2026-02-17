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
        // 1. CAMADA: Enhanced Rate Limiting (IP & Endpoint)
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

        // 2. CAMADA: CORS Validation (Layer 3)
        const allowedOrigins = process.env.NODE_ENV === 'production'
            ? [process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com']
            : ['http://localhost:3000', 'http://localhost:3001'];

        const origin = request.headers.get('origin');
        if (origin && !allowedOrigins.includes(origin)) {
            return NextResponse.json({ message: "Origem não autorizada" }, { status: 403 });
        }

        // 3. CAMADA: Content-Type Validation (Layer 4)
        const contentType = request.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json({ message: "Content-Type inválido" }, { status: 415 });
        }

        // 4. CAMADA: Request Size Limit (Layer 4)
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > 1048576) { // 1MB limit
            return NextResponse.json({ message: "Requisição muito grande" }, { status: 413 });
        }

        // 5. CAMADA: NextAuth Authentication (Backend-only)
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const userId = session.user.id;
        const body = await request.json();
        const { plan, email, name, country } = body;

        // 6. CAMADA: Input Length Validation (Layer 8 - before sanitization)
        if (name && name.length > 100) {
            return NextResponse.json({ message: "Nome muito longo" }, { status: 400 });
        }
        if (email && email.length > 254) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }
        if (country && country.length > 50) {
            return NextResponse.json({ message: "País inválido" }, { status: 400 });
        }

        // 3. CAMADA: Sanitização Rigorosa
        const sName = sanitizeText(name || "");
        const sEmail = sanitizeEmail(email || session.user.email || "");
        const sPlan = sanitizeText(plan || "premium");
        const sCountry = sanitizeText(country || "Angola");

        if (!sEmail) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }

        // 4. CAMADA: Validação Anti-Duplicidade
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        // Fetch user subscriptions
        const userSubsQuery = await adminDb.collection("subscriptions")
            .where("userId", "==", userId)
            .get();

        const userSubs = userSubsQuery.docs.map(doc => doc.data());

        // Check active subs
        const hasActiveSub = userSubs.some(sub => sub.status === "active");
        if (hasActiveSub) {
            return NextResponse.json({
                message: "Você já possui uma assinatura ativa. Cancele-a antes de iniciar uma nova."
            }, { status: 400 });
        }

        // Check pending subs
        const hasRecentPending = userSubs.some(sub =>
            sub.status === "pending" &&
            sub.createdAt > fiveMinutesAgo.toISOString()
        );

        if (hasRecentPending) {
            return NextResponse.json({
                message: "Já existe um checkout em andamento. Aguarde alguns minutos."
            }, { status: 400 });
        }

        // 5. CAMADA: Fingerprinting de Segurança
        const fingerprint = await generateFingerprint(userAgent, ip);

        // 6. Criar registro pendente no Firestore
        const subRef = adminDb.collection("subscriptions").doc();
        const internalSubId = subRef.id;

        // 7. Criar Checkout Session Real no Stripe
        const requestOrigin = request.headers.get("origin") || request.nextUrl.origin;

        // Lógica de Preço e Moeda Segura (Backend-driven)
        let currency = 'usd';
        let unitAmount = 200; // $2.00

        // Métodos de pagamento universais
        const paymentMethods: any[] = [
            'card',           // Cartões (Visa, Mastercard, Amex, etc.)
            'link',           // Link (inclui Google Pay, Apple Pay)
            'revolut_pay',    // Revolut Pay
            'paypal'          // PayPal
        ];

        // Conversão de moeda por país
        switch (sCountry) {
            case 'Brasil':
                currency = 'brl';
                unitAmount = 1200; // R$ 12,00
                break;
            case 'Portugal':
                currency = 'eur';
                unitAmount = 200; // €2.00
                break;
            default:
                currency = 'usd';
                unitAmount = 200; // $2.00
                break;
        }

        // Fallback para compatibilidade máxima
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: paymentMethods,
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: `Assinatura ADN Developer (${sCountry}) - ${sPlan}`,
                            description: 'Acesso completo ao maior repositório de tecnologia da lusofonia.',
                        },
                        unit_amount: unitAmount,
                        recurring: {
                            interval: 'month',
                        },
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
                userId: userId,
                internalSubscriptionId: internalSubId,
                plan: sPlan
            },
        } as any);

        // 8. Salvar no Firestore via Admin SDK
        await subRef.set({
            userId,
            name: sName,
            email: sEmail,
            plan: sPlan,
            paymentMethod: "stripe",
            status: "pending",
            stripeSessionId: checkoutSession.id,
            fingerprint,
            createdAt: now.toISOString(),
        });

        // 9. CAMADA: Audit Log
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

        // Adiciona headers de segurança
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error: any) {
        // Layer 5: Error Sanitization - log detailed errors server-side only
        console.error("[INTERNAL] Payment processing error:", error.message);

        // Generic error message for production, detailed for development
        const safeMessage = process.env.NODE_ENV === 'production'
            ? "Erro ao processar pagamento. Entre em contato com o suporte."
            : `Erro: ${error.message}`;

        return NextResponse.json(
            { message: safeMessage },
            { status: 500 }
        );
    }
}
