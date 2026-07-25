/** @type {import('next').NextConfig} */
const nextConfig = {
  // Padroniza URLs sem barra final (trailing slash) globalmente
  trailingSlash: false,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },

  // Configuração para Turbopack - mitigar EPERM errors no Windows
  turbopack: {},

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
    qualities: [75, 80],
    // Necessário para os avatares DiceBear que são servidos como SVG
    dangerouslyAllowSVG: true,
    // Content Security Policy restringe scripts em SVGs externos — mitiga o risco do SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "attachment",
    // Aumenta timeout para otimização de imagens (padrão: 30s, aumentado para 60s)
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
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
      {
        protocol: "https",
        hostname: "iili.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Centralização de Headers de Segurança Básicos
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const scriptSrc = isDev
      ? "'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-analytics.com https://static.cloudflareinsights.com"
      : "'self' 'unsafe-inline' https://*.vercel-analytics.com https://static.cloudflareinsights.com";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://*.supabase.co https://*.vercel-analytics.com https://static.cloudflareinsights.com https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https://* blob:; font-src 'self' https://fonts.gstatic.com; frame-ancestors 'none';`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // Cache headers para imagens públicas
      {
        source: "/images(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800", // 7 dias
          },
        ],
      },
    ];
  },
};

export default nextConfig;
