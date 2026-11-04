"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageSquare, BookmarkCheck, Bookmark, Building2, Calendar, MapPin, Users } from "lucide-react";
import { type StartupCardItem, getCountryByCode } from "@/lib/startup-types";

interface StartupCardProps {
  startup: StartupCardItem;
  onFollowToggle?: (startupId: string) => Promise<boolean | void>;
  onRequireAuth?: () => void;
  isLoggedIn?: boolean;
}

export function StartupCard({
  startup,
  onFollowToggle,
  onRequireAuth,
  isLoggedIn = false,
}: StartupCardProps) {
  const [isFollowing, setIsFollowing] = useState(Boolean(startup.isFollowing));
  const [followersCount, setFollowersCount] = useState(startup.followers_count || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const country = getCountryByCode(startup.country_code);

  const handleFollowClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    if (isSubmitting) return;

    // Optimistic UI update
    const previousState = isFollowing;
    const previousCount = followersCount;
    setIsFollowing(!previousState);
    setFollowersCount(previousState ? Math.max(0, previousCount - 1) : previousCount + 1);
    setIsSubmitting(true);

    try {
      if (onFollowToggle) {
        await onFollowToggle(startup.id);
      } else {
        const res = await fetch(`/api/startups/${startup.id}/follow`, {
          method: "POST",
        });
        if (!res.ok) {
          throw new Error("Erro na requisição");
        }
        const data = await res.json();
        setIsFollowing(data.isFollowing);
        setFollowersCount(data.followersCount);
      }
    } catch {
      // Revert on error
      setIsFollowing(previousState);
      setFollowersCount(previousCount);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-gray-200/90 bg-white p-5 transition-all duration-200 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5">
      <div>
        {/* Top Header do Card: Logo + Título + Metadados */}
        <div className="flex items-start gap-3.5">
          <Link
            href={`/startups/${startup.slug}`}
            className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition-transform group-hover:scale-102"
          >
            {startup.logo_url ? (
              <img
                src={startup.logo_url}
                alt={startup.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Building2 className="h-6 w-6 text-violet-700" />
            )}
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/startups/${startup.slug}`}
                className="truncate text-base font-bold text-gray-900 transition-colors hover:text-violet-700"
              >
                {startup.name}
              </Link>

              {/* País com bandeira e nome sem pill invasivo */}
              <div className="flex items-center gap-1 shrink-0 text-xs text-gray-500">
                <span className="text-sm" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="font-medium">{country.code}</span>
              </div>
            </div>

            {/* Metadados desempacotados com separador tipográfico (Zero-pill) */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-medium text-violet-700">
                {startup.sector?.name || "Tecnologia"}
              </span>
              <span aria-hidden="true" className="text-gray-300">
                ·
              </span>
              <span className="font-medium text-gray-600">{startup.stage}</span>
              <span aria-hidden="true" className="text-gray-300">
                ·
              </span>
              <span className="tabular-nums">Fundada em {startup.founded_year}</span>
            </div>
          </div>
        </div>

        {/* Tagline e Descrição Curta */}
        <p className="mt-3.5 text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {startup.tagline}
        </p>

        <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {startup.description}
        </p>
      </div>

      {/* Rodapé do Card com Ações Estilo Product Hunt */}
      <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Botão Seguir / Acompanhar */}
          <button
            type="button"
            onClick={handleFollowClick}
            disabled={isSubmitting}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isFollowing
                ? "bg-violet-100 text-violet-800 border border-violet-200"
                : "bg-gray-100/90 text-gray-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 border border-transparent"
            }`}
            title={
              isLoggedIn
                ? isFollowing
                  ? "Deixar de seguir novidades"
                  : "Seguir para receber novidades"
                : "Inicie sessão para seguir"
            }
          >
            {isFollowing ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-violet-700" />
            ) : (
              <Bookmark className="w-3.5 h-3.5 text-gray-500 group-hover:text-violet-600" />
            )}
            <span>{isFollowing ? "A seguir" : "Seguir"}</span>
            <span className="font-mono tabular-nums text-[11px] opacity-80">
              ({followersCount})
            </span>
          </button>

          {/* Link para Comentários */}
          <Link
            href={`/startups/${startup.slug}#comentarios`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-violet-700 hover:bg-gray-50 transition-colors"
            title="Ver discussões e comentários"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums text-xs">
              {startup.comments_count || 0}
            </span>
          </Link>
        </div>

        {/* Botão Visitar Site Oficial */}
        {startup.website_url ? (
          <a
            href={startup.website_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-violet-700 transition-colors"
            title={`Visitar site de ${startup.name}`}
          >
            <span>Visitar</span>
            <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-violet-600" />
          </a>
        ) : (
          <Link
            href={`/startups/${startup.slug}`}
            className="text-xs font-semibold text-violet-700 hover:underline"
          >
            Ver mais
          </Link>
        )}
      </div>
    </article>
  );
}
