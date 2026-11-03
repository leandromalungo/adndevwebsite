"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Globe, MapPin, Users, Sparkles, ArrowRight, Heart } from "lucide-react";
import type { DiscoveryItem } from "@/lib/discovery-data";
import { useState } from "react";
import { useFavorites } from "@/components/favorites/FavoritesContext";

interface DiscoveryCardProps {
  item: DiscoveryItem;
  priority?: boolean;
}

export function DiscoveryCard({ item, priority = false }: DiscoveryCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(item.id);

  const [imgSrc, setImgSrc] = useState(item.imageUrl || "/images-events.webp");
  const [isSavingFav, setIsSavingFav] = useState(false);

  // Fallback visual para imagens quebradas ou indisponíveis
  const handleImageError = () => {
    if (item.category === "bolsas" || item.category === "intercambio") {
      setImgSrc("/images-bolsas.webp");
    } else if (item.category === "comunidades") {
      setImgSrc("/images-community.jpg");
    } else if (item.category === "startups") {
      setImgSrc("/images-startupers.webp");
    } else {
      setImgSrc("/images-events.webp");
    }
  };

  const getFormatBadge = () => {
    if (item.format === "online") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white border border-emerald-400/30 shadow-xs">
          <Globe className="w-2.5 h-2.5" />
          Online
        </span>
      );
    }
    if (item.format === "hibrido") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white border border-cyan-400/30 shadow-xs">
          <Sparkles className="w-2.5 h-2.5" />
          Híbrido
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-black/45 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white/95 border border-white/20 shadow-xs">
        <MapPin className="w-2.5 h-2.5" />
        Presencial
      </span>
    );
  };

  const handleActionClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/?auth=login");
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push("/?auth=login");
      return;
    }
    if (isSavingFav) return;
    setIsSavingFav(true);
    try {
      await toggleFavorite(item.id);
    } finally {
      setIsSavingFav(false);
    }
  };

  return (
    <article className="group relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-gray-900 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-3 sm:p-3.5">
      {/* Imagem de Capa que preenche todo o card */}
      <Image
        src={imgSrc}
        alt={item.title}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        onError={handleImageError}
        referrerPolicy="no-referrer"
      />

      {/* Gradiente uniforme de alta legibilidade para todo o conteúdo sobreposto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

      {/* Topo do Card: Organizador, Badge de Formato e Botão de Coração (Favoritos) */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        {/* Organizador */}
        <div className="flex items-center gap-1.5 px-2 py-1 max-w-[55%] min-w-0 shadow-xs">
          {item.organizerLogo ? (
            <img
              src={item.organizerLogo}
              alt={item.organizer || "Organização"}
              className="w-4 h-4 rounded-full object-cover shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
              {item.organizer?.charAt(0) || "A"}
            </div>
          )}
          <span
            className="text-[11px] font-medium text-white/95 truncate"
            title={item.organizer || "Organizador"}
          >
            {item.organizer || "Organizador"}
          </span>
        </div>

        {/* Canto direito superior: Badge de Formato + Botão de Coração */}
        <div className="shrink-0 flex items-center gap-1.5">

          {/* Botão de Coração (Favoritos) Seguro */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            disabled={isSavingFav}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xs active:scale-90 ${
              isFav
                ? "bg-rose-600 text-white border border-rose-400 shadow-rose-950/40"
                : "text-white/90 hover:text-white"
            }`}
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
        </div>
      </div>

      {/* Base do Card: Título, Localização e Botão "Ver mais" */}
      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-2">
        {/* Título com Link protegido por autenticação */}
        <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 leading-snug drop-shadow-xs">
          {isLoggedIn ? (
            <Link
              href={`/oportunidades/${encodeURIComponent(item.id)}`}
              className="hover:text-violet-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
            >
              {item.title}
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleActionClick}
              className="text-left font-semibold hover:text-violet-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded cursor-pointer"
              title="Inicie sessão para ver detalhes"
            >
              {item.title}
            </button>
          )}
        </h3>

        {/* Rodapé: Localização/Membros e Botão "Ver mais" */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/85 text-[11px] font-medium min-w-0">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-violet-300 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[160px]">
                {item.location || item.country || "Geral"}
              </span>
            </div>
            {item.membersCount ? (
              <div className="hidden min-[400px]:flex items-center gap-1 text-white/70 shrink-0">
                <Users className="w-3 h-3 text-violet-300" />
                <span>{item.membersCount}</span>
              </div>
            ) : null}
          </div>

          {/* Botão Único: APENAS "Ver mais" */}
          <div className="shrink-0">
            {isLoggedIn ? (
              <Link
                href={`/oportunidades/${encodeURIComponent(item.id)}`}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white hover:bg-violet-700 text-gray-900 hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
                aria-label={`Ver mais sobre ${item.title}`}
              >
                <span>Ver mais</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleActionClick}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white hover:bg-violet-700 text-gray-900 hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
                aria-label={`Inicie sessão para ver mais sobre ${item.title}`}
                title="Inicie sessão para ver detalhes"
              >
                <span>Ver mais</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
