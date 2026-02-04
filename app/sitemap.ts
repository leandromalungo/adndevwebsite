import type { MetadataRoute } from "next";

const BASE_URL = "https://andeveloper.com";
const buildUrl = (path: string) => (path ? `${BASE_URL}/${path}` : BASE_URL);

type SitemapEntry = MetadataRoute.Sitemap[number];

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
  lastModified?: Date;
};

// Rotas estáticas do site
const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "events", priority: 0.8, changeFrequency: "weekly" },
  { path: "community", priority: 0.8, changeFrequency: "weekly" },
  { path: "gamedev", priority: 0.7, changeFrequency: "weekly" },
  { path: "wtm", priority: 0.7, changeFrequency: "weekly" },
  { path: "cursos", priority: 0.8, changeFrequency: "weekly" },
  { path: "bolsas", priority: 0.7, changeFrequency: "monthly" },
  { path: "startups", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  try {
    const pages: SitemapEntry[] = staticRoutes.map(route => ({
      url: buildUrl(route.path),
      lastModified: route.lastModified ?? now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

    return pages.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  } catch (error) {
    console.error("Erro ao gerar sitemap:", error);
    return [{ url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 }];
  }
}

export const revalidate = 86400; // Revalida o sitemap a cada 24h
