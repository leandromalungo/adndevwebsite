import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAllDiscoveryItems, DiscoveryItem } from "@/lib/discovery-data";

/**
 * Lista de Stop Words em português e inglês que não devem gerar falsos positivos
 */
const STOP_WORDS = new Set([
  "de", "do", "da", "dos", "das",
  "em", "no", "na", "nos", "nas",
  "para", "por", "com", "sem", "sob", "sobre",
  "e", "ou", "o", "a", "os", "as",
  "um", "uma", "uns", "umas",
  "ao", "aos", "que", "se", "nao", "não",
  "the", "a", "an", "and", "or", "in", "on", "at", "to", "for", "with", "of"
]);

/**
 * Sanitização estrita contra SQL Injection, scripts e caracteres maliciosos
 */
export function sanitizeSearchQuery(input: string): string {
  if (!input || typeof input !== "string") return "";

  // 1. Remove tags HTML e scripts
  let cleaned = input.replace(/<[^>]*>/g, "");

  // 2. Remove caracteres SQL perigosos: ' " ; \ ` -- /* */
  cleaned = cleaned.replace(/['";\\`]|--|\/\*|\*\//g, " ");

  // 3. Remove palavras-chave comuns de injeção quando isoladas
  cleaned = cleaned.replace(/\b(UNION|SELECT|DROP|INSERT|DELETE|UPDATE|WHERE|HAVING|EXEC|CHAR)\b/gi, " ");

  // 4. Manter estritamente letras unicode, números, espaços e hífen
  cleaned = cleaned.replace(/[^\p{L}\p{N}\s\-]/gu, " ");

  // 5. Normalizar espaços múltiplos e limitar a 60 caracteres
  return cleaned.replace(/\s+/g, " ").trim().slice(0, 60);
}

/**
 * Normaliza o texto removendo acentos e convertendo para minúsculas
 */
export function normalizeText(text: string): string {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Verifica se um token de busca corresponde a uma palavra no texto
 * (como palavra inteira ou prefixo com 4+ caracteres),
 * evitando falsos positivos no meio de palavras.
 */
function wordMatches(targetText: string, searchToken: string): boolean {
  if (!targetText || !searchToken) return false;
  const words = targetText.split(/[\s,.\-_/()]+/);
  return words.some((w) => w === searchToken || (w.length >= 4 && w.startsWith(searchToken)));
}

/**
 * Executa a pesquisa precisa e segura em todo o conteúdo da plataforma e banco de dados
 */
export async function searchPlatformContent(rawQuery: string): Promise<DiscoveryItem[]> {
  const cleanQuery = sanitizeSearchQuery(rawQuery);

  if (!cleanQuery || cleanQuery.length < 2) {
    return [];
  }

  const normQuery = normalizeText(cleanQuery);
  const rawTokens = normQuery.split(" ").filter((t) => t.length > 0);

  const significantTokens = rawTokens.filter(
    (t) => t.length >= 2 && !STOP_WORDS.has(t)
  );

  if (significantTokens.length === 0 && rawTokens.length > 0) {
    return [];
  }

  const resultsMap = new Map<string, { item: DiscoveryItem; score: number }>();

  // =========================================================================
  // 1. Pesquisa Segura nas Tabelas do Banco de Dados (Supabase)
  // =========================================================================
  if (isSupabaseConfigured()) {
    try {
      const safeDbTerm = cleanQuery.replace(/[%_\\]/g, "").trim();

      if (safeDbTerm.length >= 2) {
        const [eventsRes, scholarshipsRes, communitiesRes] = await Promise.all([
          supabaseAdmin
            .from("admin_events")
            .select("id, title, description, date_label, location, country, category, organizer, link, image_url")
            .eq("is_published", true)
            .ilike("title", `%${safeDbTerm}%`)
            .limit(10),

          supabaseAdmin
            .from("admin_scholarships")
            .select("id, title, description, country, level, deadline, link, image_url")
            .eq("is_published", true)
            .ilike("title", `%${safeDbTerm}%`)
            .limit(10),

          supabaseAdmin
            .from("admin_communities")
            .select("id, name, description, country, category, location, link, logo_url")
            .ilike("name", `%${safeDbTerm}%`)
            .limit(10),
        ]);

        if (eventsRes.data) {
          for (const row of eventsRes.data) {
            const id = `db-event-${row.id}`;
            resultsMap.set(id, {
              item: {
                id,
                title: row.title,
                description: row.description || "Evento publicado na plataforma ADN Developer.",
                fullDescription: row.description,
                category: "eventos",
                categoryLabel: row.category || "Evento",
                country: row.country || "Angola",
                location: row.location || "Online",
                format: row.location?.toLowerCase().includes("online") ? "online" : "presencial",
                isFree: true,
                isExpired: false,
                dateOrDeadline: row.date_label || "A anunciar",
                organizer: row.organizer || "ADN Developer",
                imageUrl: row.image_url || "/images-events.webp",
                link: row.link || "#",
                isExternalLink: Boolean(row.link && row.link.startsWith("http")),
                tags: ["Evento", row.country || "Angola"].filter(Boolean),
              },
              score: 500,
            });
          }
        }

        if (scholarshipsRes.data) {
          for (const row of scholarshipsRes.data) {
            const id = `db-scholarship-${row.id}`;
            resultsMap.set(id, {
              item: {
                id,
                title: row.title,
                description: row.description || "Oportunidade de bolsa de estudo para jovens lusófonos.",
                fullDescription: row.description,
                category: "bolsas",
                categoryLabel: row.level || "Bolsa de Estudo",
                country: row.country || "Internacional",
                location: row.country || "Exterior",
                format: "presencial",
                isFree: true,
                isExpired: false,
                dateOrDeadline: row.deadline || "A anunciar",
                imageUrl: row.image_url || "/images-bolsas.webp",
                link: row.link || "#",
                isExternalLink: Boolean(row.link && row.link.startsWith("http")),
                tags: ["Bolsa", row.country || "Internacional"].filter(Boolean),
              },
              score: 490,
            });
          }
        }

        if (communitiesRes.data) {
          for (const row of communitiesRes.data) {
            const id = `db-community-${row.id}`;
            resultsMap.set(id, {
              item: {
                id,
                title: row.name,
                description: row.description || "Comunidade técnica de desenvolvimento e tecnologia.",
                fullDescription: row.description,
                category: "comunidades",
                categoryLabel: row.category || "Comunidade Tech",
                country: row.country || "Lusofonia",
                location: row.location || "Online",
                format: "online",
                isFree: true,
                isExpired: false,
                dateOrDeadline: "Comunidade Ativa",
                imageUrl: row.logo_url || "/images-community.jpg",
                link: row.link || "#",
                isExternalLink: Boolean(row.link && row.link.startsWith("http")),
                tags: ["Comunidade", row.country || "Lusofonia"].filter(Boolean),
              },
              score: 480,
            });
          }
        }
      }
    } catch {
      // Erro seguro: sem vazamento de detalhes
    }
  }

  // =========================================================================
  // 2. Pesquisa Precisa nos Itens Consolidados
  // =========================================================================
  const allItems = getAllDiscoveryItems();

  for (const item of allItems) {
    if (resultsMap.has(item.id)) continue;

    const normTitle = normalizeText(item.title);
    const normCategory = normalizeText(item.categoryLabel || item.category || "");
    const normCountry = normalizeText(item.country || "");
    const normLocation = normalizeText(item.location || "");
    const normTags = (item.tags || []).map((t) => normalizeText(t));

    let score = 0;

    // Correspondência exata total
    if (normTitle === normQuery) {
      score += 1000;
    } else if (normTitle.startsWith(normQuery)) {
      score += 500;
    } else if (normTitle.includes(normQuery)) {
      score += 300;
    } else if (normCategory === normQuery || normCategory.startsWith(normQuery)) {
      score += 200;
    } else if (normTags.some((t) => t === normQuery || t.startsWith(normQuery))) {
      score += 180;
    } else if (normCountry === normQuery) {
      score += 150;
    } else if (significantTokens.length > 0) {
      const allTokensInTitle = significantTokens.every((token) =>
        wordMatches(normTitle, token)
      );

      if (allTokensInTitle) {
        score += 100 + significantTokens.length * 10;
      } else {
        const fullMeta = `${normTitle} ${normCountry} ${normLocation} ${normCategory}`;
        const allTokensInMeta = significantTokens.every((token) =>
          wordMatches(fullMeta, token)
        );
        const atLeastOneInTitle = significantTokens.some((token) =>
          wordMatches(normTitle, token)
        );

        if (allTokensInMeta && atLeastOneInTitle) {
          score += 60;
        }
      }
    }

    if (score >= 60) {
      resultsMap.set(item.id, { item, score });
    }
  }

  // Ordenar pela maior pontuação
  return Array.from(resultsMap.values())
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
