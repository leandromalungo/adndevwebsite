import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserFavoriteIds,
  getUserFavoriteItems,
  toggleFavorite,
  sanitizeItemId,
} from "@/lib/favorites-service";

export const dynamic = "force-dynamic";

/**
 * GET /api/favorites
 * Retorna os IDs dos itens favoritos (ou itens completos caso ?full=true).
 * Restrito estritamente a utilizadores com sessão iniciada.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || session?.user?.email;

    if (!userId) {
      return NextResponse.json(
        { error: "Sessão necessária para aceder aos favoritos." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const wantFull = searchParams.get("full") === "true";

    if (wantFull) {
      const items = await getUserFavoriteItems(userId);
      return NextResponse.json({
        success: true,
        items,
        count: items.length,
      });
    }

    const favoriteIds = await getUserFavoriteIds(userId);
    return NextResponse.json({
      success: true,
      favoriteIds,
      count: favoriteIds.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os favoritos de forma segura." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/favorites
 * Alterna um item entre favorito e não favorito.
 * Restrito estritamente a utilizadores com sessão iniciada.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || session?.user?.email;

    if (!userId) {
      return NextResponse.json(
        { error: "Inicie sessão para guardar conteúdos como favoritos." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const sanitizedId = sanitizeItemId(body?.itemId);

    if (!sanitizedId) {
      return NextResponse.json(
        { error: "Identificador de item inválido." },
        { status: 400 }
      );
    }

    const result = await toggleFavorite(userId, sanitizedId);

    return NextResponse.json({
      success: true,
      itemId: sanitizedId,
      isFavorite: result.isFavorite,
      count: result.count,
    });
  } catch {
    return NextResponse.json(
      { error: "Ocorreu um erro ao atualizar o favorito." },
      { status: 500 }
    );
  }
}
