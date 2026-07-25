import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";


/**
 * Fonte padrão Geist com subset latim
 * Fallback para sans-serif para evitar bloqueios em caso de erro de conexão com Google Fonts
 */
const _geist = Geist({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist'
});

/**
 * URL base do ADN Developer para geração de meta-tags e sitemaps
 */
const BASE_URL = "https://adndeveloper.com";

/**
 * Configurações de viewport para responsividade e cores do sistema
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Metadados globais (SEO) do ADN Developer
 * Define títulos, descrições, keywords e tags OpenGraph/Twitter
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ADN Developer",
    template: "%s | ADN Developer",
  },
  description:
    "Maior repositório de informações sobre tecnologia na lusofonia. Saiba de tudo o que se passa sobre tecnologia na C.P.L.P. (Angola, Brasil, Portugal, Moçambique e mais).",
  keywords: [
    "tecnologia", "programação", "lusofonia", "CPLP", "dev",
    "desenvolvimento de software", "cursos de tecnologia", "bolsas de estudo",
    "ADN Developer", "Angola", "Portugal", "Brasil", "Moçambique"
  ],
  authors: [{ name: "ADN Developer" }],
  creator: "ADN Developer",
  publisher: "ADN Developer",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ADN Developer",
    description: "Maior repositório de informações sobre tecnologia na lusofonia.",
    url: BASE_URL,
    siteName: "ADN Developer",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logoNavbar.png",
        width: 1200,
        height: 630,
        alt: "ADN Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADN Developer",
    description: "Maior repositório de informações sobre tecnologia na lusofonia.",
    images: ["/logoNavbar.png"],
    creator: "@adndeveloper",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-light-32x32.webp", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.webp", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.webp",
  },
};

/**
 * Layout Principal (Root Layout) da Aplicação
 * Envolve toda a aplicação com os providers necessários (Autenticação, UI Toasts, Analytics)
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body className={`${_geist.className} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
