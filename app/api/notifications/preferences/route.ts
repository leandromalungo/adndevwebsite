import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserNotificationPreferences,
  updateUserNotificationPreferences,
  NotificationPreferences,
} from "@/lib/notifications-service";

export const dynamic = "force-dynamic";

/**
 * GET /api/notifications/preferences
 * Obtém as preferências de categorias de notificação do utilizador.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Sessão necessária para aceder às preferências de notificações." },
        { status: 401 }
      );
    }

    const preferences = await getUserNotificationPreferences(session.user.id);
    return NextResponse.json({
      success: true,
      preferences,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao carregar preferências de notificações." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notifications/preferences
 * Atualiza com segurança as preferências de categorias selecionadas pelo utilizador.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Sessão necessária para atualizar preferências." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawPrefs = body?.preferences;

    if (!rawPrefs || typeof rawPrefs !== "object") {
      return NextResponse.json(
        { error: "Dados de preferências inválidos." },
        { status: 400 }
      );
    }

    // Valida e sanitiza cada chave de preferência
    const sanitizedPrefs: Partial<NotificationPreferences> = {};
    const allowedKeys: (keyof NotificationPreferences)[] = [
      "eventos",
      "bolsas",
      "comunidades",
      "cursos",
      "startups",
      "plataforma",
      "emailDigest",
    ];

    for (const key of allowedKeys) {
      if (typeof rawPrefs[key] === "boolean") {
        sanitizedPrefs[key] = rawPrefs[key];
      }
    }

    const updated = await updateUserNotificationPreferences(session.user.id, sanitizedPrefs);

    return NextResponse.json({
      success: true,
      preferences: updated,
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível guardar as preferências de notificações." },
      { status: 500 }
    );
  }
}
