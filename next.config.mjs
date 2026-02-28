/** @type {import('next').NextConfig} */
const nextConfig = {
  // Padroniza URLs sem barra final (trailing slash) globalmente
  trailingSlash: false,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },

  // Redirects permanentes (301) para normalizar URLs
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.adndeveloper.com" }],
        destination: "https://adndeveloper.com/:path*",
        permanent: true,
      },
    ];
  },

  // REWRITES: Segurança por Obscuridade
  // Mapeia URLs amigáveis para endpoints protegidos
  async rewrites() {
    return [
      {
        source: "/portal/payment-ref",
        destination: "/api/create-ref",
      },
    ];
  },

  images: {
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Centralização de Headers de Segurança Globais
  async headers() {
    return [
      {
        // Headers de segurança globais — aplicados a TODAS as rotas
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // DENY previne framing mesmo por subdomínios próprios
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // strict-origin evita vazar path da URL no Referer
            key: "Referrer-Policy",
            value: "strict-origin",
          },
          {
            // Desativa APIs de hardware desnecessárias
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
          },
        ],
      },
      {
        // Headers extra para TODAS as rotas do painel admin
        // Previne indexação por motores de busca
        source: "/cd1afa520f/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, private",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
