import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/notifications-service";

export const dynamic = "force-dynamic";

/**
 * GET /api/notifications
 * Retorna as notificações do utilizador de acordo com as preferências selecionadas.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Sessão necessária para aceder às notificações." },
        { status: 401 }
      );
    }

    const notifications = await getUserNotifications(session.user.id);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao carregar notificações de forma segura." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notifications
 * Executa ações como marcar como lida individualmente ou todas de uma vez.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Sessão necessária para gerir notificações." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action;

    if (action === "markAllAsRead") {
      await markAllNotificationsAsRead(session.user.id);
      return NextResponse.json({ success: true, message: "Todas marcadas como lidas." });
    }

    if (action === "markAsRead" && typeof body?.id === "string") {
      const cleanId = body.id.trim();
      await markNotificationAsRead(session.user.id, cleanId);
      return NextResponse.json({ success: true, id: cleanId });
    }

    return NextResponse.json(
      { error: "Ação de notificação inválida." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar ação de notificação." },
      { status: 500 }
    );
  }
}
