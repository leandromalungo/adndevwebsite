import 'server-only';
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { fetchOpportunity } from "@/lib/opportunity-detail";
import type { DiscoveryItem } from "@/lib/discovery-data";

// Armazenamento em memória seguro como fallback resiliente (para ambientes de dev ou caso a tabela esteja pendente de migração)
const memoryFavoritesStore = new Map<string, Set<string>>();

/**
 * Sanitiza o ID do item para evitar injeções ou valores inválidos
 */
export function sanitizeItemId(rawId: unknown): string | null {
  if (typeof rawId !== "string") return null;
  const trimmed = rawId.trim();
  if (!trimmed || trimmed.length > 100) return null;
  // Permite apenas caracteres alfanuméricos, hífens e underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Obtém a lista de IDs favoritos do utilizador de forma segura.
 */
export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  if (!userId) return [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("user_favorites")
        .select("item_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map((row: any) => row.item_id).filter(Boolean);
      }
    } catch {
      // Falha silenciosa e resiliente com fallback em memória
    }
  }

  // Fallback em memória
  const userSet = memoryFavoritesStore.get(userId);
  return userSet ? Array.from(userSet) : [];
}

/**
 * Alterna (adiciona ou remove) um item dos favoritos do utilizador.
 */
export async function toggleFavorite(
  userId: string,
  itemId: string
): Promise<{ isFavorite: boolean; count: number }> {
  if (!userId || !itemId) {
    throw new Error("Parâmetros inválidos.");
  }

  let isFavoriteNow = false;

  if (isSupabaseConfigured()) {
    try {
      // 1. Verificar se já existe
      const { data: existing, error: checkError } = await supabaseAdmin
        .from("user_favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("item_id", itemId)
        .maybeSingle();

      if (!checkError) {
        if (existing) {
          // Remover
          await supabaseAdmin
            .from("user_favorites")
            .delete()
            .eq("user_id", userId)
            .eq("item_id", itemId);
          isFavoriteNow = false;
        } else {
          // Inserir
          await supabaseAdmin
            .from("user_favorites")
            .insert([
              {
                user_id: userId,
                item_id: itemId,
                created_at: new Date().toISOString(),
              },
            ]);
          isFavoriteNow = true;
        }

        // Buscar contagem atualizada
        const { count } = await supabaseAdmin
          .from("user_favorites")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);

        // Manter fallback sincronizado
        let memSet = memoryFavoritesStore.get(userId);
        if (!memSet) {
          memSet = new Set<string>();
          memoryFavoritesStore.set(userId, memSet);
        }
        if (isFavoriteNow) memSet.add(itemId);
        else memSet.delete(itemId);

        return { isFavorite: isFavoriteNow, count: count ?? memSet.size };
      }
    } catch {
      // Continua para o fallback seguro em caso de indisponibilidade transitória
    }
  }

  // Fallback de memória
  let memSet = memoryFavoritesStore.get(userId);
  if (!memSet) {
    memSet = new Set<string>();
    memoryFavoritesStore.set(userId, memSet);
  }

  if (memSet.has(itemId)) {
    memSet.delete(itemId);
    isFavoriteNow = false;
  } else {
    memSet.add(itemId);
    isFavoriteNow = true;
  }

  return { isFavorite: isFavoriteNow, count: memSet.size };
}

/**
 * Carrega os itens detalhados correspondentes aos IDs favoritos do utilizador.
 */
export async function getUserFavoriteItems(userId: string): Promise<DiscoveryItem[]> {
  const favoriteIds = await getUserFavoriteIds(userId);
  if (favoriteIds.length === 0) return [];

  const items = await Promise.all(
    favoriteIds.map(async (id) => {
      try {
        return await fetchOpportunity(id);
      } catch {
        return null;
      }
    })
  );

  return items.filter((item): item is DiscoveryItem => item !== null);
}
