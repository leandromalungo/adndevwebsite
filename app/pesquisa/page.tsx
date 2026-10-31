import { Suspense } from "react";
import type { Metadata } from "next";
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
