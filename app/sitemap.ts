import type { MetadataRoute } from "next";
import { COMPREHENSIVE_EVENTS } from "@/data/eventsDatabase";
import { MOCK_TIPS } from "@/data/mockTips";
import { parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * DOMÍNIO OFICIAL DO SITE
 */
const BASE_URL = "https://adndeveloper.com";

/**
 * Constrói URLs válidas
 */
const buildUrl = (path: string): string =>
  path ? `${BASE_URL}/${path}` : BASE_URL;

type SitemapEntry = MetadataRoute.Sitemap[number];

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
  lastModified?: Date;
};

/**
 * Rotas estáticas do site
 */
const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "events", priority: 0.8, changeFrequency: "weekly" },
  { path: "community", priority: 0.8, changeFrequency: "weekly" },
  { path: "wtm", priority: 0.7, changeFrequency: "weekly" },
  { path: "cursos", priority: 0.8, changeFrequency: "weekly" },
  { path: "sobre-nos", priority: 0.8, changeFrequency: "monthly" },
  { path: "bolsas", priority: 0.7, changeFrequency: "monthly" },
  { path: "startups", priority: 0.7, changeFrequency: "monthly" },
  { path: "projectos", priority: 0.7, changeFrequency: "weekly" },
  { path: "quiz", priority: 0.6, changeFrequency: "weekly" },
  { path: "dicas", priority: 0.8, changeFrequency: "daily" },
];

/**
 * Sitemap (Metadata Route)
 * Inclui rotas estáticas e dinâmicas
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rotas estáticas
  const staticSitemaps: MetadataRoute.Sitemap = staticRoutes
    .map((route) => ({
      url: buildUrl(route.path),
      lastModified: route.lastModified ?? now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  // Rotas dinâmicas: Eventos
  const eventsSitemaps: MetadataRoute.Sitemap = COMPREHENSIVE_EVENTS.map(
    (event) => ({
      url: buildUrl(`events/${event.id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  // Rotas dinâmicas: Dicas/Artigos
  const tipsSitemaps: MetadataRoute.Sitemap = MOCK_TIPS.map((tip) => {
    // suporta datas em pt-BR (ex.: "10 Fev 2026") e ISO; fallback para `now`
    let lastModified = now;

    if (tip.date) {
      // tenta parsear formato abreviado em pt-BR (dd MMM yyyy)
      const parsedPt = parse(tip.date, "dd MMM yyyy", new Date(), {
        locale: ptBR,
      });

      if (isValid(parsedPt)) {
        lastModified = parsedPt;
      } else {
        // tenta ISO / Date nativo como fallback
        const parsedIso = new Date(tip.date);
        lastModified = Number.isNaN(parsedIso.getTime()) ? now : parsedIso;
      }
    }

    return {
      url: buildUrl(`dicas/${tip.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  // Combina todas as rotas
  return [...staticSitemaps, ...eventsSitemaps, ...tipsSitemaps];
}
