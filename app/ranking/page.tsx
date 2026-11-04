import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { RankingView } from "@/components/ranking/RankingView";

export const metadata: Metadata = {
  title: "Ranking de Tecnologias Lusófono | ADN Developer",
  description:
    "Descubra e vote nas tecnologias mais utilizadas e populares entre os desenvolvedores de Angola, Brasil, Portugal, Moçambique e de toda a comunidade lusófona.",
  openGraph: {
    title: "Ranking de Tecnologias Lusófono | ADN Developer",
    description:
      "Votação comunitária em tempo real de frameworks, linguagens, ferramentas e bases de dados na CPLP.",
    url: "https://adndeveloper.com/ranking",
    siteName: "ADN Developer",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranking de Tecnologias Lusófono | ADN Developer",
    description: "Votação comunitária em tempo real de tecnologias no ecossistema lusófono.",
  },
};

export default function RankingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />
      <div className="flex-1 w-full">
        <Suspense
          fallback={
            <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-44 w-full animate-pulse bg-gray-200 rounded-2xl mb-8" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-20 w-full animate-pulse bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>
          }
        >
          <RankingView />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
