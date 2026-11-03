"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FavoritesContextType {
  favoriteIds: string[];
  favoritesCount: number;
  isLoading: boolean;
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string) => Promise<{ success: boolean; isFavorite?: boolean }>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Carrega a lista de favoritos do servidor quando o utilizador estiver autenticado
  const fetchFavorites = useCallback(async () => {
    if (!isLoggedIn) {
      setFavoriteIds([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.favoriteIds)) {
          setFavoriteIds(data.favoriteIds);
        }
      }
    } catch {
      // Falha silenciosa
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavorites();
    } else {
      setFavoriteIds([]);
    }
  }, [isLoggedIn, fetchFavorites]);

  const isFavorite = useCallback(
    (itemId: string) => {
      if (!itemId) return false;
      return favoriteIds.includes(itemId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (itemId: string): Promise<{ success: boolean; isFavorite?: boolean }> => {
      if (!isLoggedIn) {
        // Redireciona para login seguro se não tiver sessão iniciada
        router.push("/?auth=login");
        return { success: false };
      }

      const cleanId = String(itemId).trim();
      if (!cleanId) return { success: false };

      const currentlyFav = favoriteIds.includes(cleanId);
      const nextFav = !currentlyFav;

      // 1. Atualização Otimista imediata para experiência fluida
      setFavoriteIds((prev) =>
        nextFav ? [cleanId, ...prev.filter((id) => id !== cleanId)] : prev.filter((id) => id !== cleanId)
      );

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ itemId: cleanId }),
        });

        if (!res.ok) {
          throw new Error("Erro na resposta do servidor");
        }

        const data = await res.json();
        if (typeof data.isFavorite === "boolean") {
          // Ajusta conforme a confirmação definitiva do banco de dados
          setFavoriteIds((prev) =>
            data.isFavorite
              ? [cleanId, ...prev.filter((id) => id !== cleanId)]
              : prev.filter((id) => id !== cleanId)
          );
          return { success: true, isFavorite: data.isFavorite };
        }

        return { success: true, isFavorite: nextFav };
      } catch {
        // Reverte a atualização otimista em caso de erro
        setFavoriteIds((prev) =>
          currentlyFav
            ? [cleanId, ...prev.filter((id) => id !== cleanId)]
            : prev.filter((id) => id !== cleanId)
        );
        return { success: false };
      }
    },
    [isLoggedIn, favoriteIds, router]
  );

  const value = useMemo(
    () => ({
      favoriteIds,
      favoritesCount: favoriteIds.length,
      isLoading,
      isFavorite,
      toggleFavorite,
      refreshFavorites: fetchFavorites,
    }),
    [favoriteIds, isLoading, isFavorite, toggleFavorite, fetchFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser utilizado dentro de um FavoritesProvider.");
  }
  return context;
}
