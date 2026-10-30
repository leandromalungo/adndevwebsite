"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllDiscoveryItems,
  DiscoveryItem,
  DiscoveryCategory,
  DiscoveryFormat,
  DiscoveryStatus,
  DiscoveryPrice,
} from "@/lib/discovery-data";
import { DiscoveryCard } from "./DiscoveryCard";
import { DiscoveryFilters } from "./DiscoveryFilters";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Inbox,
  RotateCcw,
  AlertTriangle,
  GraduationCap,
  Calendar,
  Users,
  Rocket,
} from "lucide-react";

const ITEMS_PER_PAGE = 12;

export function DiscoveryHub() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados dos filtros inicializados a partir dos parâmetros da URL
  const initialQ = searchParams?.get("q") || "";
  const initialCategory = (searchParams?.get("categoria") as DiscoveryCategory) || "todos";
  const initialCountry = searchParams?.get("pais") || "Todos";
  const initialFormat = (searchParams?.get("formato") as DiscoveryFormat) || "todos";
  const initialStatus = (searchParams?.get("estado") as DiscoveryStatus) || "todos";
  const initialPrice = (searchParams?.get("preco") as DiscoveryPrice) || "todos";
  const initialPage = parseInt(searchParams?.get("pagina") || "1", 10);

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState<DiscoveryCategory>(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedFormat, setSelectedFormat] = useState<DiscoveryFormat>(initialFormat);
  const [selectedStatus, setSelectedStatus] = useState<DiscoveryStatus>(initialStatus);
  const [selectedPrice, setSelectedPrice] = useState<DiscoveryPrice>(initialPrice);
  const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);

  const [items, setItems] = useState<DiscoveryItem[]>(() => getAllDiscoveryItems());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados extras de publicações recentes do banco de dados (se disponíveis)
  useEffect(() => {
    let isMounted = true;

    async function loadDynamicItems() {
      try {
        const [eventsRes, scholarshipsRes, communitiesRes] = await Promise.allSettled([
          fetch("/api/public/events"),
          fetch("/api/public/scholarships"),
          fetch("/api/public/communities"),
        ]);

        if (!isMounted) return;

        const extraItems: DiscoveryItem[] = [];

        // 1. Eventos do banco
        if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
          const data = await eventsRes.value.json();
          if (Array.isArray(data?.events)) {
            data.events.forEach((ev: any) => {
              extraItems.push({
                id: `db-event-${ev.id}`,
                title: ev.title,
                description: ev.description,
                category: "eventos",
                categoryLabel: ev.category || "Evento",
                country: ev.country || "Angola",
                location: ev.location,
                format: ev.isOnline ? "online" : "presencial",
                isFree: ev.isFree !== false,
                isExpired: false,
                dateOrDeadline: ev.date,
                organizer: ev.organizer || "Comunidade Tech",
                imageUrl: ev.imageUrl || "/images-events.webp",
                link: ev.link || "#",
                isExternalLink: Boolean(ev.link && ev.link.startsWith("http")),
                tags: ev.tags || ["Evento"],
              });
            });
          }
        }

        // 2. Bolsas do banco
        if (scholarshipsRes.status === "fulfilled" && scholarshipsRes.value.ok) {
          const data = await scholarshipsRes.value.json();
          if (Array.isArray(data?.scholarships)) {
            data.scholarships.forEach((sc: any) => {
              extraItems.push({
                id: `db-scholarship-${sc.id}`,
                title: sc.title,
                description: sc.description,
                category: "bolsas",
                categoryLabel: sc.category || "Bolsa de Estudo",
                country: sc.country || "Internacional",
                location: sc.country,
                format: "presencial",
                isFree: true,
                isExpired: false,
                dateOrDeadline: sc.deadline ? `Prazo: ${sc.deadline}` : undefined,
                organizer: "ADN Oportunidades",
                imageUrl: sc.image || "/images-bolsas.webp",
                link: sc.href || "#",
                isExternalLink: Boolean(sc.href && sc.href.startsWith("http")),
                tags: ["Bolsa", sc.country].filter(Boolean),
              });
            });
          }
        }

        // 3. Comunidades do banco
        if (communitiesRes.status === "fulfilled" && communitiesRes.value.ok) {
          const data = await communitiesRes.value.json();
          if (Array.isArray(data?.communities)) {
            data.communities.forEach((cm: any) => {
              extraItems.push({
                id: `db-comm-${cm.id}`,
                title: cm.name,
                description: cm.description,
                category: "comunidades",
                categoryLabel: cm.category || "Comunidade Tech",
                country: cm.country || "Angola",
                location: cm.location,
                format: cm.location?.toLowerCase().includes("online") ? "online" : "presencial",
                isFree: true,
                isExpired: false,
                organizer: "Comunidade",
                organizerLogo: cm.logoUrl,
                imageUrl: cm.logoUrl || "/images-community.jpg",
                link: cm.link || "#",
                isExternalLink: Boolean(cm.link && cm.link.startsWith("http")),
                tags: cm.tags || ["Comunidade"],
              });
            });
          }
        }

        if (extraItems.length > 0) {
          setItems((prev) => {
            const existingIds = new Set(prev.map((i) => i.id));
            const fresh = extraItems.filter((i) => !existingIds.has(i.id));
            return [...fresh, ...prev];
          });
        }
      } catch (err) {
        // Falhas na busca dinâmica não devem quebrar o feed curado
        console.warn("Dynamic discovery items could not be loaded, using cached dataset.");
      }
    }

    loadDynamicItems();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sincronizar parâmetros na URL sem recarregar a página inteira
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory !== "todos") params.set("categoria", selectedCategory);
    if (selectedCountry !== "Todos") params.set("pais", selectedCountry);
    if (selectedFormat !== "todos") params.set("formato", selectedFormat);
    if (selectedStatus !== "todos") params.set("estado", selectedStatus);
    if (selectedPrice !== "todos") params.set("preco", selectedPrice);
    if (currentPage > 1) params.set("pagina", currentPage.toString());

    const qs = params.toString();
    const newUrl = qs ? `/?${qs}` : "/";
    window.history.replaceState(null, "", newUrl);
  }, [
    searchQuery,
    selectedCategory,
    selectedCountry,
    selectedFormat,
    selectedStatus,
    selectedPrice,
    currentPage,
  ]);

  // Filtragem multi-critérios
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      // 1. Filtro de Categoria
      if (selectedCategory !== "todos") {
        if (selectedCategory === "cursos") {
          if (item.category !== "cursos" && !item.categoryLabel.toLowerCase().includes("curso")) {
            return false;
          }
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // 2. Filtro de País
      if (selectedCountry !== "Todos") {
        const itemCountry = (item.country || "").toLowerCase();
        const selCountry = selectedCountry.toLowerCase();
        if (!itemCountry.includes(selCountry) && !selCountry.includes(itemCountry)) {
          return false;
        }
      }

      // 3. Filtro de Formato (Presencial, Online, Híbrido)
      if (selectedFormat !== "todos" && item.format !== selectedFormat) {
        return false;
      }

      // 4. Filtro de Estado (Ativos vs Encerrados)
      if (selectedStatus === "ativos" && item.isExpired) {
        return false;
      }
      if (selectedStatus === "encerrados" && !item.isExpired) {
        return false;
      }

      // 5. Filtro de Custo (Gratuito vs Pago)
      if (selectedPrice === "gratis" && !item.isFree) {
        return false;
      }
      if (selectedPrice === "pago" && item.isFree) {
        return false;
      }

      // 6. Pesquisa textual ampla (título, descrição, organização, tema, tags, localização)
      if (query) {
        const hay = `${item.title} ${item.description} ${item.organizer || ""} ${item.categoryLabel} ${item.location || ""} ${(item.tags || []).join(" ")}`.toLowerCase();
        const tokens = query.split(/\s+/).filter(Boolean);
        const matchesAllTokens = tokens.every((token) => hay.includes(token));
        if (!matchesAllTokens) return false;
      }

      return true;
    });
  }, [
    items,
    searchQuery,
    selectedCategory,
    selectedCountry,
    selectedFormat,
    selectedStatus,
    selectedPrice,
  ]);

  // Resetar para a primeira página quando os filtros mudarem
  const handleCategoryChange = useCallback((cat: DiscoveryCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleCountryChange = useCallback((c: string) => {
    setSelectedCountry(c);
    setCurrentPage(1);
  }, []);

  const handleFormatChange = useCallback((f: DiscoveryFormat) => {
    setSelectedFormat(f);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((s: DiscoveryStatus) => {
    setSelectedStatus(s);
    setCurrentPage(1);
  }, []);

  const handlePriceChange = useCallback((p: DiscoveryPrice) => {
    setSelectedPrice(p);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("todos");
    setSelectedCountry("Todos");
    setSelectedFormat("todos");
    setSelectedStatus("todos");
    setSelectedPrice("todos");
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = Boolean(
    searchQuery.trim() ||
      selectedCategory !== "todos" ||
      selectedCountry !== "Todos" ||
      selectedFormat !== "todos" ||
      selectedStatus !== "todos" ||
      selectedPrice !== "todos"
  );

  // Paginação
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Rolagem suave para o início da lista
    if (typeof window !== "undefined") {
      const el = document.getElementById("discovery-results");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 pb-20 pt-16 sm:pt-16">
      {/* Barra de Filtros e Categorias */}
      <section className="bg-white border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 py-2 shadow-2xs">
        <div className="max-w-7xl mx-auto">
          <DiscoveryFilters
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            selectedFormat={selectedFormat}
            onFormatChange={handleFormatChange}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            selectedPrice={selectedPrice}
            onPriceChange={handlePriceChange}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            totalResults={filteredItems.length}
          />
        </div>
      </section>

      {/* =============================================================
          3. ÁREA DE RESULTADOS & GRELHA DE CARTÕES
          ============================================================= */}
      <main id="discovery-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        {/* Cabeçalho da Lista */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200/80 mb-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              A apresentar {filteredItems.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} de {filteredItems.length} resultados encontrados
            </p>
          </div>

          {/* Atalho de Navegação Especializada */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span>Ver por área:</span>
            <button
              type="button"
              onClick={() => handleCategoryChange("eventos")}
              className="text-violet-700 hover:underline"
            >
              Eventos
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleCategoryChange("bolsas")}
              className="text-violet-700 hover:underline"
            >
              Bolsas
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleCategoryChange("comunidades")}
              className="text-violet-700 hover:underline"
            >
              Comunidades
            </button>
          </div>
        </div>

        {/* Estado de Carregamento */}
        {isLoading ? (
          <div className="py-6">
            <CardGridSkeleton count={8} />
          </div>
        ) : error ? (
          /* Estado de Erro */
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto my-12">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-red-900">Não foi possível carregar as oportunidades</h3>
            <p className="text-xs text-red-700 mt-1 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Estado Sem Resultados */
          <div className="bg-white border border-gray-200 rounded-2xl p-10 sm:p-16 text-center max-w-xl mx-auto my-10 shadow-sm">
            <div className="w-14 h-14 bg-violet-50 text-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-100">
              <Inbox className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Não encontrámos conteúdos para os filtros selecionados
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Tenta ajustar os critérios de pesquisa, escolher outro país ou limpar os filtros para descobrir mais opções disponíveis na comunidade.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-700 hover:bg-violet-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          /* Grelha de Resultados */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedItems.map((item, idx) => (
              <DiscoveryCard key={item.id} item={item} priority={idx < 4} />
            ))}
          </div>
        )}

        {/* 4. PAGINAÇÃO E CARREGAMENTO PROGRESSIVO */}
        {filteredItems.length > ITEMS_PER_PAGE ? (
          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 font-medium">
              Página <span className="font-bold text-gray-900">{currentPage}</span> de{" "}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Botão Anterior */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              {/* Botões de Página Numerada */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNumber = currentPage - 3 + i;
                  if (pageNumber > totalPages) pageNumber = totalPages - (4 - i);
                }
                const isActive = pageNumber === currentPage;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? "bg-violet-700 text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Botão Seguinte */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Próxima página"
              >
                Seguinte
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
