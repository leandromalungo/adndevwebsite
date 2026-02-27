import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

const sanitizeText = (str: string) => str.replace(/[<>]/g, '').trim();
const sanitizeEmail = (str: string) => str.replace(/[<>]/g, '').trim().toLowerCase();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Não autorizado." },
                { status: 401, headers: SECURITY_HEADERS }
            );
        }

        const body = await request.json();
        const { plan, userId, country, userName, userEmail } = body;

        const sName = sanitizeText(userName || session.user.name || "Unknown");
        const sEmail = sanitizeEmail(userEmail || session.user.email);

        if (!plan || !userId || !country || !sEmail) {
            return NextResponse.json(
                { message: "Dados incompletos ou mal formatados." },
                { status: 400, headers: SECURITY_HEADERS }
            );
        }

        // Simulação / Criação real seria interligada ao Gateway BNA/Multicaixa via Proxy
        const refData = {
            entityNumber: "12345",
            referenceNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
            amount: plan === "premium_mensal" ? 2500 : 25000,
            status: "pending",
            createdAt: new Date().toISOString(),
            userId: (session.user as any).id || userId,
            customerName: sName,
            customerEmail: sEmail,
            plan: plan as string
        };

        // Regista Subscrição e Referência Gerada
        await adminDb.collection("subscriptions").doc(userId).set(refData, { merge: true });

        return NextResponse.json({
            message: "Referência gerada com sucesso",
            ...refData
        }, { status: 200, headers: SECURITY_HEADERS });

    } catch (error: any) {
        console.error("[CreateRef API] Error:", error.message);
        return NextResponse.json(
            { message: "Impossível processar pagamento multicaixa no momento." },
            { status: 500, headers: SECURITY_HEADERS }
        );
    }
}
