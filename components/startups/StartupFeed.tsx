"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  ExternalLink,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  Building2,
  X,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  type StartupFeedResponse,
  type StartupCardItem,
  type StartupSector,
  LUSOPHONE_STARTUP_COUNTRIES,
  STARTUP_STAGES,
  getCountryByCode,
} from "@/lib/startup-types";
import { StartupCard } from "@/components/startups/StartupCard";

interface StartupFeedProps {
  initialData: StartupFeedResponse;
  isLoggedIn: boolean;
  currentUser?: any;
}

export function StartupFeed({
  initialData,
  isLoggedIn,
  currentUser,
}: StartupFeedProps) {
  const [data, setData] = useState<StartupFeedResponse>(initialData);
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  // Função para recarregar o feed ao mudar filtros
  const fetchFeed = async (newParams: {
    country?: string;
    sector?: string;
    stage?: string;
    search?: string;
    page?: number;
  }) => {
    setIsLoading(true);
    try {
      const country = newParams.country ?? selectedCountry;
      const sector = newParams.sector ?? selectedSector;
      const stage = newParams.stage ?? selectedStage;
      const search = newParams.search ?? searchQuery;
      const currentPage = newParams.page ?? page;

      const queryParams = new URLSearchParams();
      if (country && country !== "ALL") queryParams.set("pais", country);
      if (sector && sector !== "all") queryParams.set("setor", sector);
      if (stage && stage !== "all") queryParams.set("estagio", stage);
      if (search.trim()) queryParams.set("q", search.trim());
      queryParams.set("page", String(currentPage));
      queryParams.set("limit", "12");

      const res = await fetch(`/api/startups?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const result: StartupFeedResponse = await res.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao carregar feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    setPage(1);
    fetchFeed({ country: code, page: 1 });
  };

  const handleSectorSelect = (slug: string) => {
    setSelectedSector(slug);
    setPage(1);
    fetchFeed({ sector: slug, page: 1 });
  };

  const handleStageSelect = (stage: string) => {
    setSelectedStage(stage);
    setPage(1);
    fetchFeed({ stage, page: 1 });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchFeed({ page: 1 });
  };

  const handleResetFilters = () => {
    setSelectedCountry("ALL");
    setSelectedSector("all");
    setSelectedStage("all");
    setSearchQuery("");
    setPage(1);
    fetchFeed({ country: "ALL", sector: "all", stage: "all", search: "", page: 1 });
  };

  const featured = data.featuredToday;
  const trending = data.trendingWeek || [];

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO & APRESENTAÇÃO ESTILO PRODUCT HUNT LUSÓFONO
         ========================================================================= */}
      <section className="relative border-b border-gray-200/80 bg-gradient-to-b from-gray-50/60 to-white px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700 mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Ecossistema Empreendedor da C.P.L.P.</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Startups Lusófonas
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
              O diretório oficial onde fundadores de Angola, Brasil, Portugal, Moçambique,
              Cabo Verde e toda a lusofonia revelam os seus produtos e conectam-se à comunidade.
            </p>

            {/* Métricas do Diretório em Texto Limpo com Separadores (Zero-pill) */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="tabular-nums font-bold text-gray-900">
                {data.stats.totalPublished} Startups ativas
              </span>
              <span aria-hidden="true" className="text-gray-300">
                ·
              </span>
              <span className="tabular-nums font-bold text-gray-900">
                {data.stats.activeCountriesCount} Países representados
              </span>
              <span aria-hidden="true" className="text-gray-300">
                ·
              </span>
              <span className="tabular-nums font-bold text-gray-900">
                {data.stats.totalFollowers} Seguidores
              </span>
              <span aria-hidden="true" className="text-gray-300">
                ·
              </span>
              <span className="tabular-nums font-bold text-gray-900">
                {data.stats.totalComments} Comentários
              </span>
            </div>
          </div>

          {/* =========================================================================
              DESTAQUE DO DIA (SPOTLIGHT CARD)
             ========================================================================= */}
          {featured && (
            <div className="mt-8 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50/40 via-white to-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <Link
                    href={`/startups/${featured.slug}`}
                    className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xs"
                  >
                    {featured.logo_url ? (
                      <img
                        src={featured.logo_url}
                        alt={featured.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-violet-700" />
                    )}
                  </Link>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700">
                        ★ Destaque do Dia
                      </span>
                      <span aria-hidden="true" className="text-gray-300">
                        ·
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {getCountryByCode(featured.country_code).flag} {getCountryByCode(featured.country_code).name}
                      </span>
                    </div>

                    <Link
                      href={`/startups/${featured.slug}`}
                      className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-violet-700 transition-colors"
                    >
                      {featured.name}
                    </Link>

                    <p className="mt-1 text-sm font-semibold text-gray-700 max-w-2xl line-clamp-1">
                      {featured.tagline}
                    </p>

                    <p className="mt-1.5 text-xs text-gray-600 max-w-2xl line-clamp-2 leading-relaxed">
                      {featured.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="font-semibold text-violet-800">
                        {featured.sector?.name || "Tecnologia"}
                      </span>
                      <span aria-hidden="true" className="text-gray-300">
                        ·
                      </span>
                      <span>{featured.stage}</span>
                      <span aria-hidden="true" className="text-gray-300">
                        ·
                      </span>
                      {featured.founders && featured.founders.length > 0 && (
                        <span>
                          Fundadores:{" "}
                          <strong className="text-gray-700 font-medium">
                            {featured.founders.map((f) => f.name).join(", ")}
                          </strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ações do Destaque */}
                <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
                  {featured.website_url && (
                    <a
                      href={featured.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:border-violet-300 hover:text-violet-700 transition-colors shadow-2xs"
                    >
                      <span>Visitar Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Link
                    href={`/startups/${featured.slug}#comentarios`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:border-violet-300 hover:text-violet-700 transition-colors shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Comentar ({featured.comments_count || 0})</span>
                  </Link>

                  <Link
                    href={`/startups/${featured.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-700 hover:bg-violet-800 transition-colors shadow-xs"
                  >
                    <span>Ver Perfil</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TENDÊNCIA DA SEMANA
             ========================================================================= */}
          {trending.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-rose-600" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                  Tendência da Semana
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {trending.map((item) => (
                  <Link
                    key={item.id}
                    href={`/startups/${item.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-200/90 bg-white p-3 hover:border-violet-300 hover:shadow-2xs transition-all"
                  >
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                      {item.logo_url ? (
                        <img
                          src={item.logo_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Building2 className="h-5 w-5 text-violet-700" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-gray-900 truncate">
                          {item.name}
                        </span>
                        <span className="text-xs" title={getCountryByCode(item.country_code).name}>
                          {getCountryByCode(item.country_code).flag}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate leading-snug">
                        {item.tagline}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="tabular-nums font-mono">{item.followers_count} seguidores</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-mono">{item.comments_count} coments</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          BARRA DE FILTROS (PAÍSES, SETORES, ESTÁGIOS E BUSCA)
         ========================================================================= */}
      <section className="sticky top-[57px] z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Linha 1: Seletor de Países Lusófonos (Com bandeiras e botões de filtro funcionais) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {LUSOPHONE_STARTUP_COUNTRIES.map((country) => {
              const isSelected = selectedCountry === country.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-violet-700 text-white shadow-2xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span aria-hidden="true">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>

          {/* Linha 2: Setores + Estágio + Campo de Pesquisa */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-1">
              {/* Setores */}
              <button
                type="button"
                onClick={() => handleSectorSelect("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedSector === "all"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Todos os setores
              </button>

              {data.sectors.map((sec) => {
                const isSelected = selectedSector === sec.id || selectedSector === sec.slug;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSectorSelect(sec.slug)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-gray-900 text-white font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {sec.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Filtro por Estágio */}
              <select
                value={selectedStage}
                onChange={(e) => handleStageSelect(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 focus:border-violet-600 focus:outline-none cursor-pointer"
                aria-label="Filtrar por estágio da startup"
              >
                <option value="all">Todos os estágios</option>
                {STARTUP_STAGES.map((stg) => (
                  <option key={stg} value={stg}>
                    {stg}
                  </option>
                ))}
              </select>

              {/* Input de Pesquisa em Tempo Real */}
              <form onSubmit={handleSearchSubmit} className="relative min-w-[180px] sm:min-w-[220px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar startup..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/70 pl-8 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:border-violet-600 focus:bg-white focus:outline-none"
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      fetchFeed({ search: "" });
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LISTA PRINCIPAL DE STARTUPS LUSÓFONAS
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">
              {selectedCountry !== "ALL"
                ? `Startups em ${getCountryByCode(selectedCountry).name}`
                : "Startups em Destaque"}
            </h2>
            <span className="text-xs text-gray-400 font-mono tabular-nums">
              ({data.total} encontradas)
            </span>
          </div>

          {(selectedCountry !== "ALL" || selectedSector !== "all" || selectedStage !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Grade de Startups */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-xl border border-gray-100 bg-gray-50/70 animate-pulse p-5"
              />
            ))}
          </div>
        ) : data.items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-base font-bold text-gray-900">
              Nenhuma startup encontrada com os filtros selecionados
            </h3>
            <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
              Tente selecionar outro país da lusofonia, setor ou redefinir a busca por termos mais gerais.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ver todas as startups</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items.map((startup) => (
              <StartupCard
                key={startup.id}
                startup={startup}
                isLoggedIn={isLoggedIn}
                onRequireAuth={() => setAuthModalOpen(true)}
              />
            ))}
          </div>
        )}

        {/* Paginação */}
        {data.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => {
                const prev = Math.max(1, page - 1);
                setPage(prev);
                fetchFeed({ page: prev });
              }}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Anterior
            </button>

            <span className="text-xs text-gray-500 font-mono tabular-nums px-2">
              Página {page} de {data.totalPages}
            </span>

            <button
              type="button"
              disabled={page >= data.totalPages}
              onClick={() => {
                const next = Math.min(data.totalPages, page + 1);
                setPage(next);
                fetchFeed({ page: next });
              }}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 cursor-pointer"
            >
              Seguinte
            </button>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL DE AUTENTICAÇÃO REQUERIDA (SEGUIR / COMENTAR)
         ========================================================================= */}
      {authModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setAuthModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">
                Acesso à Comunidade
              </span>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Inicie sessão para participar
              </h3>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                Para seguir as suas startups favoritas, receber novidades e participar das
                discussões com fundadores, é necessário ter sessão iniciada.
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/?auth=login"
                className="w-full text-center py-2.5 px-4 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition shadow-xs"
              >
                Iniciar Sessão
              </Link>
              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Continuar a navegar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
