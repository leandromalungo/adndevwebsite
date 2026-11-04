"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Trophy,
  Search,
  Filter,
  Sparkles,
  RotateCcw,
  AlertCircle,
  LogIn,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Layers,
  Clock,
  X,
  Vote,
} from "lucide-react";
import {
  LUSOPHONE_RANKING_COUNTRIES,
  type LusophoneCountry,
  type RankingItem,
  type TechnologyCategory,
  type GetRankingResult,
} from "@/lib/ranking-types";
import { RankingPodium } from "./RankingPodium";
import { RankingList } from "./RankingList";

export function RankingView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  // Parâmetros de Filtro a partir da URL
  const initialCategory = searchParams?.get("categoria") || "todos";
  const initialCountry = searchParams?.get("pais") || "ALL";
  const initialSearch = searchParams?.get("q") || "";
  const initialPeriod = (searchParams?.get("periodo") as "all" | "month" | "week" | "today") || "all";
  const initialPage = parseInt(searchParams?.get("page") || "1", 10);

  const [category, setCategory] = useState<string>(initialCategory);
  const [countryCode, setCountryCode] = useState<string>(initialCountry);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [period, setPeriod] = useState<"all" | "month" | "week" | "today">(initialPeriod);
  const [page, setPage] = useState<number>(initialPage);

  // Estados de Dados
  const [data, setData] = useState<GetRankingResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [votingId, setVotingId] = useState<string | null>(null);

  // Carregar dados da API
  const fetchRanking = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const qParams = new URLSearchParams();
      if (category && category !== "todos") qParams.set("categoria", category);
      if (countryCode && countryCode !== "ALL") qParams.set("pais", countryCode);
      if (searchQuery.trim()) qParams.set("q", searchQuery.trim());
      if (period && period !== "all") qParams.set("periodo", period);
      qParams.set("page", String(page));
      qParams.set("limit", "25");

      const res = await fetch(`/api/ranking?${qParams.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Não foi possível carregar os dados do ranking.");
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("Erro ao carregar ranking:", err);
      setError(err?.message || "Ocorreu um erro ao carregar o ranking de tecnologias.");
    } finally {
      setIsLoading(false);
    }
  }, [category, countryCode, searchQuery, period, page]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  // Atualizar URL com os filtros selecionados
  const updateUrl = useCallback(
    (newCat: string, newCountry: string, newSearch: string, newPeriod: string, newPage: number) => {
      const params = new URLSearchParams();
      if (newCat && newCat !== "todos") params.set("categoria", newCat);
      if (newCountry && newCountry !== "ALL") params.set("pais", newCountry);
      if (newSearch.trim()) params.set("q", newSearch.trim());
      if (newPeriod && newPeriod !== "all") params.set("periodo", newPeriod);
      if (newPage > 1) params.set("page", String(newPage));

      const queryStr = params.toString();
      router.replace(`/ranking${queryStr ? `?${queryStr}` : ""}`, { scroll: false });
    },
    [router]
  );

  const handleCategorySelect = (slug: string) => {
    setCategory(slug);
    setPage(1);
    updateUrl(slug, countryCode, searchQuery, period, 1);
  };

  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
    setPage(1);
    updateUrl(category, code, searchQuery, period, 1);
  };

  const handlePeriodSelect = (p: "all" | "month" | "week" | "today") => {
    setPeriod(p);
    setPage(1);
    updateUrl(category, countryCode, searchQuery, p, 1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
    updateUrl(category, countryCode, val, period, 1);
  };

  const handleClearFilters = () => {
    setCategory("todos");
    setCountryCode("ALL");
    setSearchQuery("");
    setPeriod("all");
    setPage(1);
    updateUrl("todos", "ALL", "", "all", 1);
  };

  const handleRequireAuth = () => {
    router.push("/?auth=login");
  };

  // Votação Otimista com Sincronização Atómica
  const handleVote = async (techId: string, voteType: "up" | "down") => {
    if (!isLoggedIn) {
      handleRequireAuth();
      return;
    }

    setVotingId(techId);

    // 1. Atualização Otimista Instantânea no estado local
    setData((prev) => {
      if (!prev) return prev;

      const updateItem = (item: RankingItem): RankingItem => {
        if (item.id !== techId) return item;

        const currentVote = item.userVote;
        let newVote: "up" | "down" | null = voteType;
        let upDelta = 0;
        let downDelta = 0;

        if (currentVote === voteType) {
          // Remover voto
          newVote = null;
          if (voteType === "up") upDelta = -1;
          else downDelta = -1;
        } else if (currentVote && currentVote !== voteType) {
          // Mudar voto
          newVote = voteType;
          if (voteType === "up") {
            upDelta = 1;
            downDelta = -1;
          } else {
            downDelta = 1;
            upDelta = -1;
          }
        } else {
          // Novo voto
          newVote = voteType;
          if (voteType === "up") upDelta = 1;
          else downDelta = 1;
        }

        const newUpvotes = Math.max(0, item.filteredUpvotes + upDelta);
        const newDownvotes = Math.max(0, item.filteredDownvotes + downDelta);
        const newScore = newUpvotes - newDownvotes;

        return {
          ...item,
          userVote: newVote,
          filteredUpvotes: newUpvotes,
          filteredDownvotes: newDownvotes,
          filteredScore: newScore,
          upvotes_count: Math.max(0, item.upvotes_count + upDelta),
          downvotes_count: Math.max(0, item.downvotes_count + downDelta),
          score: item.score + (upDelta - downDelta),
        };
      };

      const updatedItems = prev.items.map(updateItem);
      const updatedTopThree = prev.topThree.map(updateItem);

      // Reordenar dinamicamente caso o novo score altere a ordem
      updatedItems.sort((a, b) => {
        if (b.filteredScore !== a.filteredScore) return b.filteredScore - a.filteredScore;
        return b.filteredUpvotes - a.filteredUpvotes;
      });

      const reRanked = updatedItems.map((item, idx) => ({
        ...item,
        rank: idx + 1,
      }));

      return {
        ...prev,
        items: reRanked,
        topThree: updatedTopThree,
      };
    });

    // 2. Chamar a API em Background
    try {
      const res = await fetch("/api/ranking/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          technologyId: techId,
          voteType,
          countryCode: countryCode !== "ALL" ? countryCode : undefined,
        }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error || "Falha ao registar o voto.");
      }
    } catch (err: any) {
      console.error("Erro na votação:", err);
      // Reverter estado local caso a API falhe
      fetchRanking();
    } finally {
      setVotingId(null);
    }
  };

  const activeCountry =
    LUSOPHONE_RANKING_COUNTRIES.find((c) => c.code === countryCode) ||
    LUSOPHONE_RANKING_COUNTRIES[0];

  const hasActiveFilters =
    category !== "todos" || countryCode !== "ALL" || searchQuery.trim() !== "" || period !== "all";

  return (
    <div className="min-h-screen bg-[#fafbfc] selection:bg-violet-200 pb-20">
      {/* =============================================================
          1. HERO HEADER: TÍTULO, SUBTÍTULO E MÉTRICAS DA COMUNIDADE
          ============================================================= */}
      <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold uppercase tracking-wider mb-3 border border-violet-200">
                <Trophy className="w-3.5 h-3.5 text-violet-700" />
                <span>Ranking Comunitário Lusófono</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Ranking de Tecnologias
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
                A voz dos desenvolvedores de Angola, Brasil, Portugal, Moçambique e de toda a CPLP.
                Vote com <strong>Upvote (↑)</strong> ou <strong>Downvote (↓)</strong> nas tecnologias que mais utiliza e recomenda.
              </p>
            </div>

            {/* Cartões de Métricas em Tempo Real */}
            {data?.stats && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-2xs">
                  <div className="flex items-center justify-center gap-1.5 text-violet-700 mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-gray-500">Tecnologias</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{data.stats.totalTechnologies}</span>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-2xs">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 mb-1">
                    <Vote className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-gray-500">Votos</span>
                  </div>
                  <span className="text-lg font-black text-gray-900">{data.stats.totalVotes.toLocaleString()}</span>
                </div>

                <div className="hidden sm:block bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-2xs col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-gray-500">Líder Atual</span>
                  </div>
                  <span className="text-sm font-black text-gray-900 truncate block">
                    {data.stats.topTechnologyName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =============================================================
          2. BARRA DE FILTROS: PAÍS, CATEGORIA, PESQUISA E PERÍODO
          ============================================================= */}
      <section className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-2xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Linha 1: Seletor de Países Lusófonos */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <span>País:</span>
            </span>

            {LUSOPHONE_RANKING_COUNTRIES.map((c) => {
              const isSelected = countryCode === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c.code)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-violet-700 text-white shadow-xs font-bold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-950"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Linha 2: Categorias + Busca + Filtro de Período */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1 border-t border-gray-100">
            {/* Categorias */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => handleCategorySelect("todos")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  category === "todos"
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Todas as Áreas
              </button>

              {data?.categories?.map((cat) => {
                const isSelected = category === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Direita: Busca e Período */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Input de Busca */}
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Pesquisar tecnologia..."
                  className="w-full pl-8 pr-8 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-600 focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    title="Limpar pesquisa"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Seletor de Período */}
              <div className="relative shrink-0">
                <select
                  value={period}
                  onChange={(e) => handlePeriodSelect(e.target.value as any)}
                  className="text-xs font-semibold bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-600 cursor-pointer"
                  aria-label="Filtrar por período"
                >
                  <option value="all">Todo o período</option>
                  <option value="month">Este Mês</option>
                  <option value="week">Esta Semana</option>
                  <option value="today">Hoje</option>
                </select>
              </div>

              {/* Botão Limpar Filtros */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Limpar todos os filtros"
                  aria-label="Limpar todos os filtros"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================
          3. ÁREA PRINCIPAL: PÓDIO E LISTA CLASSIFICADA
          ============================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Banner do Filtro Ativo */}
        <div className="flex items-center justify-between text-xs text-gray-500 py-2">
          <span>
            A exibir resultados para <strong>{activeCountry.name}</strong>{" "}
            {category !== "todos" ? `• Categoria: ${category}` : ""}
            {period !== "all" ? ` • Período: ${period}` : ""}
          </span>
          {data?.total !== undefined && (
            <span className="font-semibold text-gray-700">
              {data.total} {data.total === 1 ? "tecnologia encontrada" : "tecnologias encontradas"}
            </span>
          )}
        </div>

        {/* Estado: Carregamento */}
        {isLoading && !data ? (
          <div className="py-12 space-y-4" aria-busy="true">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="h-48 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="h-56 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="h-44 rounded-2xl bg-gray-200 animate-pulse" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          /* Estado: Erro */
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 sm:p-12 text-center my-8 max-w-lg mx-auto">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-red-900 mb-1">
              Não foi possível carregar o ranking
            </h3>
            <p className="text-xs text-red-700 mb-5">{error}</p>
            <button
              type="button"
              onClick={() => fetchRanking()}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Tentar novamente
            </button>
          </div>
        ) : data && data.items.length === 0 ? (
          /* Estado: Vazio / Sem Resultados */
          <div className="bg-white border border-gray-200 rounded-2xl p-10 sm:p-16 text-center my-8 max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 bg-violet-50 text-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-100">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Nenhuma tecnologia encontrada
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
              Não encontrámos tecnologias para os filtros ou pesquisa selecionados. Tente ajustar os termos ou selecionar outro país.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-700 hover:bg-violet-800 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Limpar todos os filtros</span>
            </button>
          </div>
        ) : (
          /* Estado: Conteúdo Normal */
          <>
            {/* Top 3 Podium (Visível apenas na primeira página e sem pesquisa de texto muito restrita) */}
            {page === 1 && !searchQuery && data?.topThree && data.topThree.length >= 3 && (
              <RankingPodium
                topThree={data.topThree}
                onVote={handleVote}
                isLoggedIn={isLoggedIn}
                onRequireAuth={handleRequireAuth}
                votingId={votingId}
              />
            )}

            {/* Lista Completa Classificada */}
            <section className="mt-6 mb-8" aria-label="Classificação Geral">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Classificação Geral de Tecnologias
                </h2>
                <span className="text-xs text-gray-500">
                  Pontuação = Upvotes (↑) - Downvotes (↓)
                </span>
              </div>

              <RankingList
                items={data?.items || []}
                onVote={handleVote}
                isLoggedIn={isLoggedIn}
                onRequireAuth={handleRequireAuth}
                votingId={votingId}
              />
            </section>

            {/* Paginação */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-6">
                <button
                  type="button"
                  onClick={() => {
                    const p = Math.max(1, page - 1);
                    setPage(p);
                    updateUrl(category, countryCode, searchQuery, period, p);
                  }}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <span className="px-3 py-1 text-xs font-semibold text-gray-600">
                  Página {page} de {data.totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const p = Math.min(data.totalPages, page + 1);
                    setPage(p);
                    updateUrl(category, countryCode, searchQuery, period, p);
                  }}
                  disabled={page >= data.totalPages}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Seguinte</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Banner de Chamada para Utilizadores Não Autenticados */}
        {!isLoggedIn && (
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-violet-900 via-indigo-900 to-violet-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-violet-800 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Vote className="w-6 h-6 text-violet-300" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold">
                  Faça login para votar nas suas tecnologias favoritas
                </h4>
                <p className="text-xs text-violet-200 mt-0.5 leading-relaxed">
                  Os seus votos ajudam a construir o ranking oficial das tecnologias mais adotadas no espaço lusófono.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRequireAuth}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-violet-900 font-bold text-xs sm:text-sm hover:bg-violet-50 transition shadow-md shrink-0 cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sessão / Criar Conta</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
