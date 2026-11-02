"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Loader2,
  X,
  SearchX,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  country?: string;
  location?: string;
  dateOrDeadline?: string;
  imageUrl?: string;
  url: string;
  isExternalLink?: boolean;
  source: "database" | "plataforma";
  score: number;
}

export function HeaderSearch() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Executa a busca segura e precisa no endpoint /api/search (apenas para utilizadores com sessão iniciada)
  const executeSearch = useCallback(async (searchTerm: string) => {
    if (!isLoggedIn) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    const trimmed = searchTerm.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Falha na consulta");

      const data = await res.json();
      setResults(data.results || []);
    } catch {
      // Erro seguro: sem vazamento de detalhes sensíveis
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Debounce de digitação para performance (250ms)
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!isLoggedIn) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    if (query.trim().length >= 2) {
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(() => {
        executeSearch(query);
      }, 250);
    } else {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query, executeSearch, isLoggedIn]);

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  /**
   * Submissão do formulário:
   * Requer sessão iniciada. Se não autenticado, direciona para o login.
   * Se autenticado, navega para a página de resultados (/pesquisa?q=...).
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isLoggedIn) {
      router.push("/?auth=login");
      return;
    }

    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/pesquisa?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/pesquisa");
    }
  };

  // Navegação por teclado dentro da lista do dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const filteredResults =
    activeCategory === "todos"
      ? results
      : results.filter((item) => item.category === activeCategory);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "eventos":
      case "hackathons":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "bolsas":
      case "intercambio":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "comunidades":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cursos":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "startups":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center"
    >
      {/* Formulário com o design exatamente igual à imagem de referência */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center bg-white border border-gray-200/90 hover:border-gray-300 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 rounded-full h-9 sm:h-10 pl-3 sm:pl-3.5 pr-1 py-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all"
        role="search"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600 animate-spin shrink-0" />
          ) : !isLoggedIn ? (
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" strokeWidth={1.9} />
          ) : (
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 shrink-0" strokeWidth={1.9} />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (!isLoggedIn) {
                setIsOpen(true);
              } else if (query.trim().length >= 1) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={isLoggedIn ? "Buscar eventos..." : "Inicie sessão para pesquisar..."}
            className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-500 outline-none border-none focus:ring-0 p-0"
            aria-label="Campo de pesquisa da plataforma"
            aria-expanded={isOpen}
            aria-autocomplete="list"
          />

          {/* Botão de Limpar (X) */}
          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition mr-0.5 shrink-0 cursor-pointer"
              aria-label="Limpar pesquisa"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Botão com ícone de busca / lupa (Leva à página de resultados ou ao login se não autenticado) */}
        <button
          type="submit"
          aria-label={isLoggedIn ? "Pesquisar e ver resultados completos" : "Iniciar sessão para pesquisar"}
          title={isLoggedIn ? "Pesquisar" : "Inicie sessão para pesquisar"}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#18181b] hover:bg-black text-white flex items-center justify-center shrink-0 ml-1.5 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer"
        >
          {isLoggedIn ? (
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.2} />
          ) : (
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" strokeWidth={2.2} />
          )}
        </button>
      </form>

      {/* =============================================================
         UI DE FEEDBACK / BLOQUEIO PARA USUÁRIO NÃO AUTENTICADO
         ============================================================= */}
      {isOpen && !isLoggedIn && (
        <div className="absolute top-full mt-2.5 w-[calc(100vw-24px)] min-[380px]:w-[340px] sm:w-[420px] left-1/2 -translate-x-1/2 bg-white rounded shadow-2xl border border-gray-200/90 p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-2xs">
            <Lock className="w-6 h-6" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">
            Crie uma conta e use todas as funcionalidades
          </h4>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Para pesquisar, acessar conteúdos e ver mais detalhes, é necessário iniciar sessão com a sua conta.
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/?auth=login");
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition shadow-xs cursor-pointer active:scale-98"
            >
              Iniciar Sessão / Criar Conta
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium py-1 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* =============================================================
         UI DE FEEDBACK EM TEMPO REAL ANCORADA AO INPUT (USUÁRIO AUTENTICADO)
         ============================================================= */}
      {isOpen && isLoggedIn && query.trim().length >= 1 && (
        <div className="absolute top-full mt-2.5 w-[calc(100vw-24px)] min-[380px]:w-[340px] sm:w-[460px] md:w-[520px] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Cabeçalho do Feedback */}
          <div className="p-3 sm:px-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-gray-600 truncate">
              <span>Pesquisando:</span>
              <strong className="text-gray-900 font-bold truncate max-w-[150px] sm:max-w-[200px]">
                &ldquo;{query}&rdquo;
              </strong>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isLoading ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-violet-700">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Buscando...
                </span>
              ) : hasSearched ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                  {results.length} {results.length === 1 ? "resultado" : "resultados"}
                </span>
              ) : null}
            </div>
          </div>

          {/* Filtros rápidos por categoria dentro da sugestão */}
          {results.length > 0 && (
            <div className="px-3 pt-2.5 pb-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
              <button
                type="button"
                onClick={() => setActiveCategory("todos")}
                className={`px-2.5 py-1 rounded-full font-semibold transition shrink-0 ${
                  activeCategory === "todos"
                    ? "bg-violet-700 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todos ({results.length})
              </button>

              {Array.from(new Set(results.map((r) => r.category))).map((cat) => {
                const count = results.filter((r) => r.category === cat).length;
                const sample = results.find((r) => r.category === cat);
                const label = sample?.categoryLabel || cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-full font-semibold transition shrink-0 ${
                      activeCategory === cat
                        ? "bg-violet-700 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Corpo: Resultados Sugeridos ou Feedback "Não Encontrado" */}
          <div className="max-h-[340px] sm:max-h-[390px] overflow-y-auto divide-y divide-gray-100">
            {isLoading && results.length === 0 ? (
              <div className="py-10 text-center">
                <Loader2 className="w-7 h-7 text-violet-600 animate-spin mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-medium">
                  A consultar banco de dados...
                </p>
              </div>
            ) : hasSearched && results.length === 0 ? (
              /* =============================================================
                 FEEDBACK: NÃO ENCONTRADO (Preciso e Amigável)
                 ============================================================= */
              <div className="p-6 sm:p-7 text-center">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-3 border border-red-100 shadow-xs">
                  <SearchX className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Não encontrado
                </h3>

                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed mb-4">
                  Nenhum item correspondente encontrado para{" "}
                  <strong className="text-gray-900">&ldquo;{query}&rdquo;</strong>.
                </p>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-left text-xs text-gray-600 space-y-1 mb-4">
                  <div className="font-semibold text-gray-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    Sugestões:
                  </div>
                  <ul className="list-disc list-inside text-gray-500 space-y-0.5 text-[11px]">
                    <li>Verifique o nome digitado.</li>
                    <li>Busque pelo nome exato do evento, bolsa ou comunidade.</li>
                    <li>Experimente buscar por país ou tecnologia (ex: <em>Python</em>, <em>Angola</em>).</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/pesquisa?q=${encodeURIComponent(query)}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-700 hover:bg-violet-800 text-white shadow-xs transition"
                >
                  <span>Abrir página de pesquisa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : filteredResults.length > 0 ? (
              /* Lista de itens correspondentes */
              filteredResults.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-start gap-3 p-3 sm:p-3.5 transition group ${
                    activeIndex === idx ? "bg-violet-50/70" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    <Image
                      src={item.imageUrl || "/images-events.webp"}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {item.categoryLabel}
                      </span>

                      {item.country && (
                        <span className="text-[10px] font-semibold text-gray-500">
                          • {item.country}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-1 leading-snug">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400 font-medium">
                      {item.dateOrDeadline && (
                        <span className="flex items-center gap-1 text-gray-600 truncate">
                          <Calendar className="w-3 h-3 text-violet-600 shrink-0" />
                          <span className="truncate">{item.dateOrDeadline}</span>
                        </span>
                      )}

                      {item.location && (
                        <span className="hidden sm:flex items-center gap-1 text-gray-600 truncate">
                          <MapPin className="w-3 h-3 text-violet-600 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-violet-700" />
                  </div>
                </Link>
              ))
            ) : null}
          </div>

          {/* Rodapé: Botão explícito para ir à página de resultados da pesquisa */}
          <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="hidden sm:inline">
              Pressione Enter ou clique na lupa para ver a página completa
            </span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push(`/pesquisa?q=${encodeURIComponent(query.trim())}`);
              }}
              className="ml-auto font-bold text-violet-700 hover:text-violet-900 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver resultados completos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
