import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { SearchResultsView } from "@/components/search/SearchResultsView";
import { searchPlatformContent, sanitizeSearchQuery } from "@/lib/search-service";
import { getAllDiscoveryItems } from "@/lib/discovery-data";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";

interface PesquisaPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PesquisaPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const cleanQ = sanitizeSearchQuery(q || "");
  const title = cleanQ
    ? `Pesquisa: "${cleanQ}" | ADN Developer`
    : `Pesquisa de Oportunidades | ADN Developer`;

  return {
    title,
    description: `Resultados da pesquisa por oportunidades, eventos, bolsas de estudo e comunidades tecnológicas em ${
      cleanQ || "toda a lusofonia"
    }.`,
    robots: {
      index: false, // resultados dinâmicos de busca interna não devem ser indexados por SEO padrão
      follow: true,
    },
  };
}

export default async function PesquisaPage({ searchParams }: PesquisaPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fafbfc]">
        <Navbar />
        <main className="flex-1 max-w-2xl mx-auto px-4 py-24 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
           <Link href="/" className="focus:outline-none flex items-center shrink-0" aria-label="Página Inicial">
              <Image
                src="/logo.png"
                alt="ADN Developer"
                width={130}
                height={38}
                className="h-7 sm:h-8 md:h-9 w-auto cursor-pointer object-contain"
                priority
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-semibold uppercase text-gray-900 mb-3 tracking-tight">
            Inicie sessão para pesquisar no acervo
          </h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
            A pesquisa e acesso a todas as oportunidades, eventos, bolsas de estudo e comunidades em Angola, Portugal, Brasil e toda a lusofonia requerem início de sessão.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/?auth=login"
              className="w-full sm:w-auto px-6 py-3 rounded bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-sm transition active:scale-95 text-center"
            >
              Iniciar Sessão / Criar Conta
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm shadow-2xs transition text-center"
            >
              Voltar ao Início
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { q } = await searchParams;
  const cleanQ = sanitizeSearchQuery(q || "");

  const [items, allItems] = await Promise.all([
    cleanQ ? searchPlatformContent(cleanQ) : Promise.resolve([]),
    Promise.resolve(getAllDiscoveryItems()),
  ]);

  const recentRecommendations = allItems.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] selection:bg-violet-200">
      <Navbar />

      <main className="flex-1 w-full pt-16 sm:pt-20">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="h-32 w-full bg-gray-200 rounded-2xl animate-pulse mb-8" />
              <CardGridSkeleton count={8} />
            </div>
          }
        >
          <SearchResultsView
            initialQuery={cleanQ}
            items={items}
            recentRecommendations={recentRecommendations}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
