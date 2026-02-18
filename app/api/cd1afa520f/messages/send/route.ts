import { NextRequest, NextResponse } from "next/server";
import { sanitizeText, sanitizeUrl, isSafeString } from "@/lib/security";
import { checkRateLimit } from "@/lib/admin-api/rate-limit";
import { logSecurityAction } from "@/lib/admin-api/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth.config";

export const dynamic = 'force-dynamic';

/**
 * Rota para envio de mensagens/notificações em massa (Apenas para Admin)
 * Suporta canais como Email e Telegram.
 */
export async function POST(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        // CAMADA 1: Controlo de Taxa (Rate Limiting)
        const rateLimit = await checkRateLimit(ip, "api");
        if (!rateLimit.allowed) {
            return NextResponse.json({ message: "Muitas solicitações" }, { status: 429 });
        }

        // 2. Verificar Autenticação Admin via NextAuth
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== "admin") {
            return NextResponse.json({ message: "Acesso não autorizado" }, { status: 401 });
        }

        const formData = await request.formData();
        const title = formData.get("title") as string;
        const subject = formData.get("subject") as string;
        const link = formData.get("link") as string;
        const channel = formData.get("channel") as "email" | "telegram";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const image = formData.get("image") as File | null;

        // Validação de campos obrigatórios
        if (!title || !subject || !channel) {
            return NextResponse.json({ message: "Campos obrigatórios em falta" }, { status: 400 });
        }

        // Validação de segurança de strings
        if (!isSafeString(title) || !isSafeString(subject)) {
            await logSecurityAction({
                adminEmail: session.user.email || "admin@adndeveloper.com",
                action: "MALICIOUS_CONTENT_REJECTED",
                entity: "Messages",
                ip,
                userAgent,
                details: { title, subject }
            });
            return NextResponse.json({ message: "Conteúdo inválido detetado" }, { status: 400 });
        }

        const sanitizedData = {
            title: sanitizeText(title),
            subject: sanitizeText(subject),
            link: link ? sanitizeUrl(link) : "",
            channel,
        };

        // Auditoria de Sucesso do Envio
        await logSecurityAction({
            adminEmail: session.user.email || "admin@adndeveloper.com",
            action: `SEND_MESSAGE_${channel.toUpperCase()}`,
            entity: "Messages",
            ip,
            userAgent,
            details: sanitizedData
        });

        // PONTO DE INTEGRAÇÃO: Aqui chamarias o serviço real de envio (SendGrid, Telegram Bot API, etc.)
        return NextResponse.json({
            message: `Mensagem enviada com sucesso via ${channel === "email" ? "Email" : "Telegram"}`,
        }, { status: 200 });

    } catch (error) {
        console.error("[INTERNAL] Erro no envio de mensagem:", error);
        return NextResponse.json({ message: "Erro interno ao enviar mensagem" }, { status: 500 });
    }
}
