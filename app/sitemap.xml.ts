// Sitemap generator for Next.js App Router
// Uses SITE_URL or NEXT_PUBLIC_SITE_URL env var, falls back to http://localhost:3000

const SITE_URL =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

import { COMPREHENSIVE_EVENTS } from '@/data/eventsDatabase'

// Rotas estáticas principais (alinhadas com SEO e sitelinks desejados)
const STATIC_ROUTES = [
  '/',                    // Home
  '/community',           // Comunidade
  '/cursos',              // Cursos
  '/events',               // Eventos de tecnologia
  '/startups',             // Para Startups
  '/gamedev',              // GameDeveloper
  '/bolsas',               // Bolsas de estudo

  // Rotas de suporte / conversão
  '/assinatura',
  '/quiz',
]

// Data fixa para páginas estáticas (boa prática SEO)
const STATIC_LASTMOD = '2025-01-01'

function generateSitemap(): string {
  // Rotas dinâmicas de eventos
  const eventRoutes = COMPREHENSIVE_EVENTS.map((event) => ({
    route: `/events/${event.id}`,
    lastmod: event.updatedAt ?? new Date().toISOString(),
    priority: '0.7'
  }))

  // Rotas estáticas com prioridade
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    route,
    lastmod: STATIC_LASTMOD,
    priority: route === '/' ? '1.0' : '0.8'
  }))

  const allRoutes = [...staticRoutes, ...eventRoutes]

  const urls = allRoutes
    .map(({ route, lastmod, priority }) => {
      const loc = `${SITE_URL.replace(/\/$/, '')}${route}`

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export async function GET() {
  const sitemap = generateSitemap()

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}
