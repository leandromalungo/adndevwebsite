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
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
