import type { MetadataRoute } from "next";

/**
 * Arquivo robots.ts para gerar robots.txt dinamicamente
 * Segue a abordagem moderna de Next.js 13+ (App Router)
 *
 * Este arquivo gera o robots.txt dinamicamente e garante:
 * - URLs canónicas corretas (sem www)
 * - Bloqueio de rotas sensíveis (admin, api, login)
 * - Referência correta ao sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login"],
        crawlDelay: 1,
      },
      {
        // Bots agressivos que gastam muitos recursos
        userAgent: ["AhrefsBot", "SemrushBot", "DotBot"],
        disallow: ["/"],
      },
    ],
    sitemap: "https://adndeveloper.com/sitemap.xml",
  };
}
