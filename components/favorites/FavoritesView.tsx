"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Heart,
  Search,
  Sparkles,
  ArrowRight,
  Compass,
  Loader2,
  Lock,
  BookmarkX,
  Layers,
} from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import { DiscoveryCard } from "@/components/discovery/DiscoveryCard";
import type { DiscoveryItem } from "@/lib/discovery-data";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";

export function FavoritesView() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const { favoriteIds, isLoading: isContextLoading } = useFavorites();

  const [items, setItems] = useState<DiscoveryItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");

  // Busca os itens detalhados dos favoritos
  useEffect(() => {
    let isMounted = true;

    async function loadFavoriteItems() {
      if (!isLoggedIn) {
        setIsLoadingItems(false);
        setItems([]);
        return;
      }

      setIsLoadingItems(true);
      try {
        const res = await fetch("/api/favorites?full=true", {
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.items)) {
            setItems(data.items);
          }
        }
      } catch {
        // Falha silenciosa
      } finally {
        if (isMounted) {
          setIsLoadingItems(false);
        }
      }
    }

    loadFavoriteItems();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn, favoriteIds]);

  // Filtra itens com base na pesquisa local e na categoria
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!favoriteIds.includes(item.id)) return false;

      if (categoryFilter !== "todos" && item.category !== categoryFilter) {
        return false;
      }

      if (searchFilter.trim()) {
        const term = searchFilter.toLowerCase();
        const text = `${item.title} ${item.description} ${item.organizer || ""} ${item.categoryLabel} ${item.location || ""}`.toLowerCase();
        return text.includes(term);
      }

      return true;
    });
  }, [items, favoriteIds, categoryFilter, searchFilter]);

  // 1. Estado: Carregando Sessão
  if (status === "loading") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-rose-600 animate-spin mb-3" />
        <p className="text-xs text-gray-500 font-medium">A verificar sessão...</p>
      </div>
    );
  }

  // 2. Estado: Não Autenticado (Proteção de Acesso Seguro)
  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
          <Heart className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-3 inline-block">
          Acesso Exclusivo a Membros
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Inicie sessão para ver os seus favoritos
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
          Para guardar oportunidades, eventos, bolsas de estudo e aceder à sua lista pessoal em qualquer dispositivo, inicie sessão com a sua conta.
        </p>
        <button
          type="button"
          onClick={() => router.push("/?auth=login")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
        >
          <span>Iniciar Sessão / Criar Conta</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // 3. Estado: Utilizador Autenticado
  const totalFavs = favoriteIds.length;

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página de Favoritos */}
      <div className="bg-white border-b border-gray-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Os Meus Favoritos
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                  {totalFavs} {totalFavs === 1 ? "item" : "itens"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                Aqui tem acesso direto e organizado a todas as oportunidades guardadas na sua conta.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition self-start md:self-center"
          >
            <Compass className="w-3.5 h-3.5 text-violet-600" />
            <span>Explorar mais oportunidades</span>
          </Link>
        </div>
      </div>

      {/* Barra de Filtro e Busca nos Favoritos (se existirem itens salvos) */}
      {totalFavs > 0 && (
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Pesquisar nos favoritos..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setCategoryFilter("todos")}
              className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${
                categoryFilter === "todos"
                  ? "bg-rose-600 text-white shadow-2xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todos ({totalFavs})
            </button>

            {Array.from(new Set(items.map((i) => i.category))).map((cat) => {
              const count = items.filter((i) => i.category === cat && favoriteIds.includes(i.id)).length;
              if (count === 0) return null;
              const sample = items.find((i) => i.category === cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sample?.categoryLabel || cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      {isLoadingItems || isContextLoading ? (
        <CardGridSkeleton count={8} />
      ) : totalFavs === 0 ? (
        /* Estado Vazio: Nenhum Favorito Salvo */
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-14 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
            Ainda não tem itens favoritos
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
            Ao explorar o catálogo, clique no ícone de coração em qualquer oportunidade, evento, bolsa ou comunidade para guardá-la e consultá-la aqui a qualquer momento.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Compass className="w-4 h-4" />
            <span>Explorar Oportunidades</span>
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Nenhum item correspondente à busca nos favoritos */
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center max-w-md mx-auto my-8">
          <BookmarkX className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            Nenhum resultado nos favoritos
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Não foram encontrados itens guardados para o filtro atual.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchFilter("");
              setCategoryFilter("todos");
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        /* Grelha de Favoritos */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <DiscoveryCard key={item.id} item={item} priority={idx < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
