"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Search, SearchX, Sparkles, Filter, ArrowRight, RotateCcw, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { DiscoveryCard } from "@/components/discovery/DiscoveryCard";
import type { DiscoveryItem, DiscoveryCategory } from "@/lib/discovery-data";

interface SearchResultsViewProps {
  initialQuery: string;
  items: DiscoveryItem[];
  recentRecommendations: DiscoveryItem[];
}

export function SearchResultsView({
  initialQuery,
  items,
  recentRecommendations,
}: SearchResultsViewProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -240 : 240;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScroll, 350);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/?auth=login");
      return;
    }
    const trimmed = searchInput.trim();
    if (trimmed) {
      router.push(`/pesquisa?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/pesquisa");
    }
  };

  // Filtragem por categoria selecionada na barra de abas
  const filteredItems = useMemo(() => {
    if (selectedCategory === "todos") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Contagens por categoria
  const categoriesWithCounts = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();

    items.forEach((item) => {
      const cat = item.category || "outros";
      const existing = map.get(cat);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(cat, {
          label: item.categoryLabel || cat,
          count: 1,
        });
      }
    });

    return Array.from(map.entries()).map(([key, data]) => ({
      key,
      label: data.label,
      count: data.count,
    }));
  }, [items]);

  return (
    <div className="w-full">
      {/* Banner / Cabeçalho de Pesquisa */}
      <div className="bg-white border-b border-gray-200/90 py-8 sm:py-10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pesquisa na Plataforma</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {initialQuery ? (
                <>
                  Resultados para: <span className="text-violet-700">&ldquo;{initialQuery}&rdquo;</span>
                </>
              ) : (
                "Pesquisa Geral de Oportunidades"
              )}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              {initialQuery ? (
                items.length > 0 ? (
                  <>
                    Encontramos <strong>{items.length}</strong> {items.length === 1 ? "resultado correspondente" : "resultados correspondentes"} por título, categoria e organização.
                  </>
                ) : (
                  <>Nenhum resultado idêntico encontrado para os termos pesquisados.</>
                )
              ) : (
                "Digite palavras-chave, nomes de eventos, bolsas de estudo ou comunidades para buscar no banco de dados."
              )}
            </p>

            {/* Campo de Busca Rápida na própria página */}
            <form onSubmit={handleSearchSubmit} className="mt-5 flex items-center gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Pesquisar por título, tecnologia, país..."
                  className="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-2xs focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-violet-700 hover:bg-violet-800 text-white shadow-xs transition active:scale-95 cursor-pointer shrink-0"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Filtros em Abas por Categoria com Setas e sem scrollbar visível */}
        {categoriesWithCounts.length > 0 && (
          <div className="mb-8 flex items-center gap-1.5 sm:gap-2 w-full">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 shadow-2xs flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                !canScrollLeft
                  ? "opacity-35 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
                  : "active:scale-95"
              }`}
              aria-label="Rolar categorias para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex-1 min-w-0 overflow-x-auto scrollbar-none scroll-smooth flex items-center gap-1.5 sm:gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categoriesWithCounts.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(isSelected ? "todos" : cat.key)}
                    className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer select-none border ${
                      isSelected
                        ? "bg-violet-700 text-white border-violet-700 shadow-xs"
                        : "bg-white text-gray-700 hover:bg-violet-50/50 hover:border-violet-300 border-gray-200"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1 opacity-80">({cat.count})</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 shadow-2xs flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                !canScrollRight
                  ? "opacity-35 cursor-not-allowed hover:bg-white hover:text-gray-700 hover:border-gray-200"
                  : "active:scale-95"
              }`}
              aria-label="Rolar categorias para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Lista de Resultados Encontrados */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <DiscoveryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* =============================================================
             ESTADO "NÃO ENCONTRADO" NA PÁGINA
             ============================================================= */
          <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-4 border border-red-100 shadow-2xs">
              <SearchX className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Nenhum resultado
            </span>

            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3 mb-2">
              Não encontramos resultados para &ldquo;{initialQuery}&rdquo;
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
              A pesquisa é rigorosa para trazer apenas itens idênticos e relevantes ao que procura, sem conteúdos desconexos.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 text-left border border-gray-100 text-xs text-gray-700 space-y-2 mb-6">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                Como encontrar o que procura:
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                <li>Certifique-se de que o nome está escrito corretamente.</li>
                <li>Tente pesquisar por termos como <strong>Python</strong>, <strong>React</strong>, <strong>Angola</strong>, <strong>Portugal</strong> ou <strong>Bolsa</strong>.</li>
                <li>Pesquise por categorias como <strong>Hackathon</strong>, <strong>Comunidade</strong> ou <strong>Startup</strong>.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  router.push("/");
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-xs transition"
              >
                <span>Explorar todas as oportunidades</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  router.push("/pesquisa");
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Limpar busca</span>
              </button>
            </div>
          </div>
        )}

        {/* Recomendações caso a busca retorne 0 itens */}
        {filteredItems.length === 0 && recentRecommendations.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="mb-6">
              <h3 className="text-lg font-extrabold text-gray-900">
                Oportunidades em Destaque na Plataforma
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Confira os eventos e bolsas mais recentes que podem interessar-lhe.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentRecommendations.slice(0, 4).map((item) => (
                <DiscoveryCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
