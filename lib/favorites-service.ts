import 'server-only';
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { fetchOpportunity } from "@/lib/opportunity-detail";
import { getAllDiscoveryItems, getDiscoveryItemById, type DiscoveryItem } from "@/lib/discovery-data";

// Armazenamento em memória seguro globalThis resiliente (persiste entre requisições na mesma instância do servidor)
const globalForFavorites = globalThis as unknown as {
  favoritesStore?: Map<string, Set<string>>;
};
const memoryFavoritesStore =
  globalForFavorites.favoritesStore || (globalForFavorites.favoritesStore = new Map<string, Set<string>>());

/**
 * Sanitiza o ID do item para evitar injeções ou valores inválidos
 */
export function sanitizeItemId(rawId: unknown): string | null {
  if (typeof rawId !== "string") return null;
  const trimmed = rawId.trim();
  if (!trimmed || trimmed.length > 150) return null;
  // Permite caracteres alfanuméricos, hífens, underscores, pontos e dois pontos
  if (!/^[a-zA-Z0-9_.:-]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Obtém a lista de IDs favoritos do utilizador de forma segura.
 */
export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  if (!userId) return [];

  const cleanUserId = userId.trim();
  const memSet = memoryFavoritesStore.get(cleanUserId);
  const memList = memSet ? Array.from(memSet) : [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("user_favorites")
        .select("item_id")
        .eq("user_id", cleanUserId)
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        const dbIds = data.map((row: any) => String(row.item_id)).filter(Boolean);
        // Sincroniza memSet com o que veio do banco
        const combined = new Set([...memList, ...dbIds]);
        memoryFavoritesStore.set(cleanUserId, combined);
        return Array.from(combined);
      }
    } catch {
      // Falha silenciosa com fallback seguro
    }
  }

  return memList;
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

  const cleanUserId = userId.trim();
  const cleanItemId = itemId.trim();

  // 1. Atualizar imediatamente o repositório em memória
  let memSet = memoryFavoritesStore.get(cleanUserId);
  if (!memSet) {
    memSet = new Set<string>();
    memoryFavoritesStore.set(cleanUserId, memSet);
  }

  let isFavoriteNow = false;
  if (memSet.has(cleanItemId)) {
    memSet.delete(cleanItemId);
    isFavoriteNow = false;
  } else {
    memSet.add(cleanItemId);
    isFavoriteNow = true;
  }

  // 2. Se o Supabase estiver ativo, sincroniza no banco de dados
  if (isSupabaseConfigured()) {
    try {
      if (!isFavoriteNow) {
        await supabaseAdmin
          .from("user_favorites")
          .delete()
          .eq("user_id", cleanUserId)
          .eq("item_id", cleanItemId);
      } else {
        await supabaseAdmin
          .from("user_favorites")
          .upsert(
            [
              {
                user_id: cleanUserId,
                item_id: cleanItemId,
                created_at: new Date().toISOString(),
              },
            ],
            { onConflict: "user_id,item_id" }
          );
      }
    } catch {
      // Ignora falhas se a tabela estiver pendente de migração no Supabase
    }
  }

  return { isFavorite: isFavoriteNow, count: memSet.size };
}

/**
 * Carrega os itens detalhados correspondentes aos IDs favoritos do utilizador.
 */
export async function getUserFavoriteItems(userId: string): Promise<DiscoveryItem[]> {
  const favoriteIds = await getUserFavoriteIds(userId);
  if (favoriteIds.length === 0) return [];

  // Mapear catálogo consolidado para resolução rápida
  const allItems = getAllDiscoveryItems();
  const map = new Map<string, DiscoveryItem>();
  allItems.forEach((i) => map.set(i.id, i));

  const items = await Promise.all(
    favoriteIds.map(async (id) => {
      // 1. Tentar mapa estático ou busca normalizada
      const direct = map.get(id) || getDiscoveryItemById(id);
      if (direct) return direct;

      // 2. Tentar busca dinâmica (banco ou listas secundárias)
      try {
        return await fetchOpportunity(id);
      } catch {
        return null;
      }
    })
  );

  return items.filter((item): item is DiscoveryItem => item !== null);
}
