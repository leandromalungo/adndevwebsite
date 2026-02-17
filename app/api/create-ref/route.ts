import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { sanitizeText, sanitizeEmail, generateFingerprint, SECURITY_HEADERS } from "@/lib/security";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // 1. CAMADA: Rate Limiting
        const rateLimit = await checkRateLimit(ip, "subscription");
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { message: "Muitas solicitações. Aguarde uma hora." },
                { status: 429 }
            );
        }

        // 2. CAMADA: Verificação de Sessão (NextAuth Backend-only)
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const userId = session.user.id;
        const body = await request.json();
        const { plan, email, name } = body;

        if (!plan || !email) {
            return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
        }

        // 3. CAMADA: Sanitização
        const sName = sanitizeText(name || "");
        const sEmail = sanitizeEmail(email || session.user.email || "");
        const sPlan = sanitizeText(plan);

        if (!sEmail) {
            return NextResponse.json({ message: "Email inválido" }, { status: 400 });
        }

        // 4. CAMADA: Fingerprinting
        const fingerprint = await generateFingerprint(userAgent, ip);

        const entityNumber = "00688";
        const referenceNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
        const amount = sPlan === "premium" ? 5000 : 2500;

        // 1. Criar registro no Firestore com referência
        const subRef = adminDb.collection("subscriptions").doc();
        await subRef.set({
            userId,
            name: sName,
            email: sEmail,
            plan: sPlan,
            paymentMethod: "reference",
            status: "pending",
            referenceNumber,
            entityNumber,
            amount,
            fingerprint,
            createdAt: new Date().toISOString(),
        });

        // 5. CAMADA: Audit Log
        await logSecurityAction({
            adminEmail: sEmail,
            action: "SUBSCRIPTION_CREATE_REFERENCE",
            entity: "Subscription",
            entityId: subRef.id,
            ip,
            userAgent,
            details: { plan: sPlan, fingerprint }
        });

        const response = NextResponse.json({
            entityNumber,
            referenceNumber,
            amount,
            subscriptionId: subRef.id
        });

        // Adiciona headers de segurança
        Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error: any) {
        console.error("[INTERNAL] Reference Creation failed:", error.message);
        return NextResponse.json(
            { message: "Erro ao gerar referência" },
            { status: 500 }
        );
    }
}
