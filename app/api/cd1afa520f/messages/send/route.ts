import { NextRequest, NextResponse } from "next/server";
import { sanitizeText, sanitizeUrl, isSafeString } from "@/lib/security";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // CAMADA 1: Rate Limiting
        const rateLimit = await checkRateLimit(ip, "api");
        if (!rateLimit.allowed) {
            return NextResponse.json({ message: "Muitas solicitações" }, { status: 429 });
        }

        // 2. Verificar Autenticação Admin via NextAuth
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "admin") {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const formData = await request.formData();
        const title = formData.get("title") as string;
        const subject = formData.get("subject") as string;
        const link = formData.get("link") as string;
        const channel = formData.get("channel") as "email" | "telegram";
        const image = formData.get("image") as File | null;

        // Validação de campos obrigatórios
        if (!title || !subject || !channel) {
            return NextResponse.json({ message: "Campos obrigatórios faltando" }, { status: 400 });
        }

        // Validação de segurança
        if (!isSafeString(title) || !isSafeString(subject)) {
            await logSecurityAction({
                adminEmail: "admin@adndeveloper.com",
                action: "MALICIOUS_CONTENT_REJECTED",
                entity: "Messages",
                ip,
                userAgent,
                details: { title, subject }
            });
            return NextResponse.json({ message: "Conteúdo inválido detectado" }, { status: 400 });
        }

        const sanitizedData = {
            title: sanitizeText(title),
            subject: sanitizeText(subject),
            link: link ? sanitizeUrl(link) : "",
            channel,
        };

        // Auditoria de Sucesso
        await logSecurityAction({
            adminEmail: session.user.email || "admin@adndeveloper.com",
            action: `SEND_MESSAGE_${channel.toUpperCase()}`,
            entity: "Messages",
            ip,
            userAgent,
            details: sanitizedData
        });

        return NextResponse.json({
            message: `Mensagem enviada com sucesso via ${channel === "email" ? "Email" : "Telegram"}`,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Erro ao enviar mensagem" }, { status: 500 });
    }
}
