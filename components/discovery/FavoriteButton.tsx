"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/components/favorites/FavoritesContext";

interface FavoriteButtonProps {
  itemId: string;
  variant?: "card" | "detail";
  className?: string;
}

export function FavoriteButton({
  itemId,
  variant = "detail",
  className = "",
}: FavoriteButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(itemId);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/?auth=login");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);
    try {
      await toggleFavorite(itemId);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs active:scale-90 ${
          isFav
            ? "bg-rose-600 text-white border border-rose-400 shadow-rose-950/40"
            : "bg-black/50 text-white/90 hover:text-white hover:bg-black/70 border border-white/20"
        } ${className}`}
        aria-label={isFav ? "Remover dos favoritos" : "Salvar como favorito"}
        title={
          isLoggedIn
            ? isFav
              ? "Remover dos favoritos"
              : "Salvar como favorito"
            : "Inicie sessão para salvar como favorito"
        }
      >
        <Heart
          className={`w-3.5 h-3.5 transition-all ${
            isFav ? "fill-current text-white scale-110" : "text-white"
          }`}
          strokeWidth={isFav ? 2.5 : 2}
        />
      </button>
    );
  }

  // Variant "detail"
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer border shadow-2xs ${
        isFav
          ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-rose-600 hover:border-rose-200"
      } ${className}`}
      aria-label={isFav ? "Remover dos favoritos" : "Salvar como favorito"}
      title={
        isLoggedIn
          ? isFav
            ? "Remover dos favoritos"
            : "Salvar como favorito"
          : "Inicie sessão para salvar como favorito"
      }
    >
      <Heart
        className={`w-4 h-4 transition-transform ${
          isFav ? "fill-current text-rose-600 scale-110" : "text-gray-500 group-hover:text-rose-600"
        }`}
        strokeWidth={1.8}
      />
      <span className="hidden sm:inline">
        {isFav ? "Guardado" : "Guardar"}
      </span>
    </button>
  );
}
