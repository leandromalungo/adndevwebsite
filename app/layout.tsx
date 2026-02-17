import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/SessionProvider";

const _geist = Geist({ subsets: ["latin"] });

const BASE_URL = "https://adndeveloper.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
    creator: "@adndeveloper",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                const noop = () => {};
                // Preservar console para depuração se necessário via variável global
                if (!window.__DEBUG__) {
                  console.log = noop;
                  console.info = noop;
                  console.warn = noop;
                  console.error = noop;
                }
              }
            `,
          }}
        />
      </head>
      <body className={`${_geist.className} antialiased`} suppressHydrationWarning>
        <SessionProvider>
          {children}
          <Toaster />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
