import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// Importar a fonte Geist do Google Fonts
const _geist = Geist({ subsets: ["latin"] })

/**
 * LAYOUT RAIZ DO PROJETO
 * 
 * Este é o layout principal que envolve todas as páginas do aplicativo.
 * Define metadados globais, configurações de font, e integrações com analytics.
 */

// Metadados globais da aplicação
export const metadata: Metadata = {
  title: "ADN Developer",
  description: "seja bem-vindo",
  generator: "www.adndeveloper.com",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

/**
 * RootLayout - Componente layout raiz
 * @param {React.ReactNode} children - Componentes filhos (páginas)
 * @returns HTML com layout principal
 */
export default function RootLayout({ children,}: Readonly<
  { children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body className={`${_geist.className} antialiased`}>
        {/* Renderiza o conteúdo da página */}
        {children}
        {/* Analytics do Vercel para rastreamento */}
        <Analytics />
      </body>
    </html>
  )
}
