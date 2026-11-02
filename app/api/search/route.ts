import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAllDiscoveryItems } from "@/lib/discovery-data";
import { STUDY_MATERIALS } from "@/data/study-materials";
import { MOCK_TIPS } from "@/data/mockTips";

export const dynamic = "force-dynamic";

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  country?: string;
  location?: string;
  dateOrDeadline?: string;
  imageUrl?: string;
  url: string;
  isExternalLink?: boolean;
  source: "database" | "plataforma";
  score: number;
}

/**
 * Lista de Stop Words comuns em português e inglês
 * Essas palavras não devem disparar correspondências isoladas falsas
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
 * Sanitização estrita contra SQL Injection, XSS e caracteres de controle
 * Permite estritamente letras unicode, números, espaços e hífen.
 * Remove aspas, ponto-e-vírgula, barras, tags HTML e palavras-chave perigosas.
 */
function sanitizeSearchQuery(input: string): string {
  if (!input || typeof input !== "string") return "";

  // 1. Remove qualquer tentativa de tags ou scripts
  let cleaned = input.replace(/<[^>]*>/g, "");

  // 2. Remove caracteres SQL perigosos: ' " ; \ ` -- /* */
  cleaned = cleaned.replace(/['";\\`]|--|\/\*|\*\//g, " ");

  // 3. Remove palavras-chave comuns de injeção quando isoladas
  cleaned = cleaned.replace(/\b(UNION|SELECT|DROP|INSERT|DELETE|UPDATE|WHERE|HAVING|EXEC|CHAR)\b/gi, " ");

  // 4. Manter apenas letras unicode, números, espaços e hífen
  cleaned = cleaned.replace(/[^\p{L}\p{N}\s\-]/gu, " ");

  // 5. Normalizar múltiplos espaços e limitar comprimento
  return cleaned.replace(/\s+/g, " ").trim().slice(0, 60);
}

/**
 * Normaliza o texto removendo acentos e convertendo para minúsculas
 */
function normalizeText(text: string): string {
  return (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Verifica se uma palavra-chave corresponde a um termo no texto
 * de forma precisa (como palavra inteira ou prefixo da palavra),
 * evitando correspondências falsas no meio de palavras não relacionadas.
 */
function wordMatches(targetText: string, searchToken: string): boolean {
  if (!targetText || !searchToken) return false;
  const words = targetText.split(/[\s,.\-_/()]+/);
  return words.some((w) => w === searchToken || (w.length >= 4 && w.startsWith(searchToken)));
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Inicie sessão para realizar pesquisas na plataforma.",
          query: "",
          results: [],
          total: 0,
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("q") || "";
    const cleanQuery = sanitizeSearchQuery(rawQuery);

    // Mínimo de 2 caracteres válidos
    if (!cleanQuery || cleanQuery.length < 2) {
      return NextResponse.json({
        query: cleanQuery,
        results: [],
        total: 0,
      });
    }

    const normQuery = normalizeText(cleanQuery);
    const rawTokens = normQuery.split(" ").filter((t) => t.length > 0);

    // Tokens significativos: remove palavras de parada e tokens com menos de 2 caracteres
    const significantTokens = rawTokens.filter(
      (t) => t.length >= 2 && !STOP_WORDS.has(t)
    );

    // Se a query só tinha stop words (ex.: "de", "para", "ou"), não retornar resultados falsos
    if (significantTokens.length === 0 && rawTokens.length > 0) {
      return NextResponse.json({
        query: cleanQuery,
        results: [],
        total: 0,
      });
    }

    const resultsMap = new Map<string, SearchResultItem>();

    // =========================================================================
    // 1. Pesquisa Segura e Precisa no Banco de Dados (Supabase)
    // =========================================================================
    if (isSupabaseConfigured()) {
      try {
        // Escapar caracteres coringa do SQL like (% e _)
        const safeDbTerm = cleanQuery.replace(/[%_\\]/g, "").trim();

        if (safeDbTerm.length >= 2) {
          // Busca estritamente no campo de título/nome para evitar falsos positivos
          const [eventsRes, scholarshipsRes, communitiesRes] = await Promise.all([
            supabaseAdmin
              .from("admin_events")
              .select("id, title, description, date_label, location, country, category, organizer, link, image_url")
              .eq("is_published", true)
              .ilike("title", `%${safeDbTerm}%`)
              .limit(6),

            supabaseAdmin
              .from("admin_scholarships")
              .select("id, title, description, country, level, deadline, link, image_url")
              .eq("is_published", true)
              .ilike("title", `%${safeDbTerm}%`)
              .limit(6),

            supabaseAdmin
              .from("admin_communities")
              .select("id, name, description, country, category, location, link, logo_url")
              .ilike("name", `%${safeDbTerm}%`)
              .limit(6),
          ]);

          if (eventsRes.data) {
            for (const row of eventsRes.data) {
              const key = `db-event-${row.id}`;
              resultsMap.set(key, {
                id: key,
                title: row.title,
                description: row.description ? row.description.slice(0, 140) : "",
                category: "eventos",
                categoryLabel: row.category || "Evento",
                country: row.country || "Angola",
                location: row.location || "Online",
                dateOrDeadline: row.date_label || "A anunciar",
                imageUrl: row.image_url || "/images-events.webp",
                url: `/oportunidades/${encodeURIComponent(key)}`,
                isExternalLink: false,
                source: "database",
                score: 500, // prioridade máxima para correspondência de banco
              });
            }
          }

          if (scholarshipsRes.data) {
            for (const row of scholarshipsRes.data) {
              const key = `db-scholarship-${row.id}`;
              resultsMap.set(key, {
                id: key,
                title: row.title,
                description: row.description ? row.description.slice(0, 140) : "",
                category: "bolsas",
                categoryLabel: row.level || "Bolsa de Estudo",
                country: row.country || "Internacional",
                location: row.country || "Presencial / Exterior",
                dateOrDeadline: row.deadline || "A anunciar",
                imageUrl: row.image_url || "/images-bolsas.webp",
                url: `/oportunidades/${encodeURIComponent(key)}`,
                isExternalLink: false,
                source: "database",
                score: 490,
              });
            }
          }

          if (communitiesRes.data) {
            for (const row of communitiesRes.data) {
              const key = `db-community-${row.id}`;
              resultsMap.set(key, {
                id: key,
                title: row.name,
                description: row.description ? row.description.slice(0, 140) : "",
                category: "comunidades",
                categoryLabel: row.category || "Comunidade",
                country: row.country || "Lusofonia",
                location: row.location || "Online",
                dateOrDeadline: "Comunidade Ativa",
                imageUrl: row.logo_url || "/images-community.jpg",
                url: `/oportunidades/${encodeURIComponent(key)}`,
                isExternalLink: false,
                source: "database",
                score: 480,
              });
            }
          }
        }
      } catch {
        // Silêncio seguro: erros internos de banco jamais são expostos na resposta
      }
    }

    // =========================================================================
    // 2. Pesquisa Precisa nos Itens Consolidados da Plataforma
    // =========================================================================
    const discoveryItems = getAllDiscoveryItems();

    for (const item of discoveryItems) {
      if (resultsMap.has(item.id)) continue;

      const normTitle = normalizeText(item.title);
      const normCategory = normalizeText(item.categoryLabel || item.category || "");
      const normCountry = normalizeText(item.country || "");
      const normLocation = normalizeText(item.location || "");
      const normTags = (item.tags || []).map((t) => normalizeText(t));

      let score = 0;

      // 1. Correspondência exata total no título (ex: usuário digitou "Acelera Angola")
      if (normTitle === normQuery) {
        score += 1000;
      }
      // 2. Título começa exatamente com a query
      else if (normTitle.startsWith(normQuery)) {
        score += 500;
      }
      // 3. Título contém a frase da query inteira
      else if (normTitle.includes(normQuery)) {
        score += 300;
      }
      // 4. Categoria corresponde exatamente à busca (ex: "bolsas", "hackathon", "startups")
      else if (normCategory === normQuery || normCategory.startsWith(normQuery)) {
        score += 200;
      }
      // 5. Alguma tag corresponde exatamente
      else if (normTags.some((t) => t === normQuery || t.startsWith(normQuery))) {
        score += 180;
      }
      // 6. País corresponde exatamente e é uma busca explícita por país (ex: "Angola")
      else if (normCountry === normQuery) {
        score += 150;
      }
      // 7. Todos os tokens significativos estão presentes no título ou na combinação título + país/local
      else if (significantTokens.length > 0) {
        const allTokensInTitle = significantTokens.every((token) =>
          wordMatches(normTitle, token)
        );

        if (allTokensInTitle) {
          score += 100 + significantTokens.length * 10;
        } else {
          // Permite match quando um token está no título e outro no país/local (ex: "Workshop Huambo")
          const fullMeta = `${normTitle} ${normCountry} ${normLocation} ${normCategory}`;
          const allTokensInMeta = significantTokens.every((token) =>
            wordMatches(fullMeta, token)
          );

          // Pelo menos um token significativo OBRIGATORIAMENTE deve estar no título
          const atLeastOneInTitle = significantTokens.some((token) =>
            wordMatches(normTitle, token)
          );

          if (allTokensInMeta && atLeastOneInTitle) {
            score += 60;
          }
        }
      }

      // SÓ inclui o item se tiver pontuação relevante (elimina itens desconexos)
      if (score >= 60) {
        resultsMap.set(item.id, {
          id: item.id,
          title: item.title,
          description: item.description ? item.description.slice(0, 140) : "",
          category: item.category,
          categoryLabel: item.categoryLabel,
          country: item.country,
          location: item.location || item.country,
          dateOrDeadline: item.dateOrDeadline,
          imageUrl: item.imageUrl,
          url: `/oportunidades/${encodeURIComponent(item.id)}`,
          isExternalLink: false,
          source: "plataforma",
          score,
        });
      }
    }

    // =========================================================================
    // 3. Materiais de Estudo e Dicas (Apenas se o título corresponder exatamente)
    // =========================================================================
    for (const mat of STUDY_MATERIALS) {
      const normMatTitle = normalizeText(mat.title);
      let score = 0;
      if (normMatTitle.includes(normQuery)) {
        score = 250;
      } else if (
        significantTokens.length > 0 &&
        significantTokens.every((token) => wordMatches(normMatTitle, token))
      ) {
        score = 90;
      }

      if (score >= 90) {
        const id = `material-${mat.id}`;
        resultsMap.set(id, {
          id,
          title: mat.title,
          description: mat.description ? mat.description.slice(0, 140) : "",
          category: "cursos",
          categoryLabel: "Material de Estudo",
          country: "Lusofonia",
          location: "Download Digital",
          dateOrDeadline: `${mat.pages} págs • ${mat.type.toUpperCase()}`,
          imageUrl: mat.thumbnail || "/images-events.webp",
          url: `/roadmaps`,
          isExternalLink: false,
          source: "plataforma",
          score,
        });
      }
    }

    for (const tip of MOCK_TIPS) {
      const normTipTitle = normalizeText(tip.title);
      let score = 0;
      if (normTipTitle.includes(normQuery)) {
        score = 250;
      } else if (
        significantTokens.length > 0 &&
        significantTokens.every((token) => wordMatches(normTipTitle, token))
      ) {
        score = 90;
      }

      if (score >= 90) {
        const id = `tip-${tip.id}`;
        resultsMap.set(id, {
          id,
          title: tip.title,
          description: tip.description ? tip.description.slice(0, 140) : "",
          category: "artigos",
          categoryLabel: tip.category || "Dica",
          country: "Lusofonia",
          location: "Artigo",
          dateOrDeadline: tip.date,
          imageUrl: tip.imageUrl || "/images-events.webp",
          url: tip.slug ? `/dicas/${tip.slug}` : `/dicas`,
          isExternalLink: false,
          source: "plataforma",
          score,
        });
      }
    }

    // Ordenar estritamente pela maior relevância
    const sorted = Array.from(resultsMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    return NextResponse.json({
      query: cleanQuery,
      results: sorted,
      total: sorted.length,
    });
  } catch {
    // Tratamento de erro 100% seguro: nunca expõe stack traces ou dados sensíveis
    return NextResponse.json({
      query: "",
      results: [],
      total: 0,
    });
  }
}
