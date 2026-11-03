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

function getStorageKey(userEmail?: string | null): string {
  return `adn_favs_${userEmail || "current"}`;
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const userEmail = session?.user?.email;
  const router = useRouter();

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("adn_favs_cache");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {}
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sincroniza cache local sempre que favoriteIds mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("adn_favs_cache", JSON.stringify(favoriteIds));
        if (userEmail) {
          localStorage.setItem(getStorageKey(userEmail), JSON.stringify(favoriteIds));
        }
      } catch {}
    }
  }, [favoriteIds, userEmail]);

  // Carrega a lista de favoritos do servidor e sincroniza com o cache local
  const fetchFavorites = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }

    // Carregar cache local do utilizador se existir
    if (typeof window !== "undefined" && userEmail) {
      try {
        const userStored = localStorage.getItem(getStorageKey(userEmail));
        if (userStored) {
          const parsed = JSON.parse(userStored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFavoriteIds((prev) => Array.from(new Set([...prev, ...parsed])));
          }
        }
      } catch {}
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.favoriteIds)) {
          setFavoriteIds((prev) => {
            const merged = Array.from(new Set([...prev, ...data.favoriteIds]));
            return merged;
          });
        }
      }
    } catch {
      // Falha silenciosa
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn, userEmail]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavorites();
    } else {
      // Quando deslogar, limpa a memória ativa
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

      // 1. Atualização Otimista imediata para experiência fluida no ecrã
      const updatedList = nextFav
        ? [cleanId, ...favoriteIds.filter((id) => id !== cleanId)]
        : favoriteIds.filter((id) => id !== cleanId);

      setFavoriteIds(updatedList);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("adn_favs_cache", JSON.stringify(updatedList));
          if (userEmail) {
            localStorage.setItem(getStorageKey(userEmail), JSON.stringify(updatedList));
          }
        } catch {}
      }

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ itemId: cleanId }),
        });

        if (res.ok) {
          const data = await res.json();
          if (typeof data.isFavorite === "boolean") {
            const finalFav = data.isFavorite;
            const finalList = finalFav
              ? [cleanId, ...favoriteIds.filter((id) => id !== cleanId)]
              : favoriteIds.filter((id) => id !== cleanId);
            setFavoriteIds(finalList);
            return { success: true, isFavorite: finalFav };
          }
        }

        return { success: true, isFavorite: nextFav };
      } catch {
        // Mantém a preferência local mesmo em caso de erro transitório de rede
        return { success: true, isFavorite: nextFav };
      }
    },
    [isLoggedIn, favoriteIds, userEmail, router]
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
