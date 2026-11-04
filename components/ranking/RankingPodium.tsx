"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trophy, Crown, Medal, ArrowUp, ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import type { RankingItem } from "@/lib/ranking-types";

interface RankingPodiumProps {
  topThree: RankingItem[];
  onVote: (techId: string, type: "up" | "down") => void;
  isLoggedIn: boolean;
  onRequireAuth: () => void;
  votingId: string | null;
}

export function RankingPodium({
  topThree,
  onVote,
  isLoggedIn,
  onRequireAuth,
  votingId,
}: RankingPodiumProps) {
  if (!topThree || topThree.length === 0) return null;

  // Reordenar para pódio clássico: 2º Lugar (Esquerda), 1º Lugar (Centro), 3º Lugar (Direita)
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  const podiumSlots = [
    { item: second, rank: 2, label: "2º Lugar", medal: "🥈", color: "from-slate-200 to-gray-300", border: "border-slate-300", accent: "text-slate-700", bg: "bg-gradient-to-b from-slate-50 to-gray-100", order: "order-2 md:order-1" },
    { item: first, rank: 1, label: "1º Lugar", medal: "👑", color: "from-amber-200 via-amber-300 to-yellow-400", border: "border-amber-400/80 shadow-amber-500/10", accent: "text-amber-800", bg: "bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40", order: "order-1 md:order-2", featured: true },
    { item: third, rank: 3, label: "3º Lugar", medal: "🥉", color: "from-amber-700/20 to-orange-200", border: "border-amber-700/30", accent: "text-amber-900", bg: "bg-gradient-to-b from-orange-50/70 to-amber-50/30", order: "order-3" },
  ];

  return (
    <section className="relative my-8 sm:my-10" aria-label="Top 3 Tecnologias em Destaque">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Pódio das Tecnologias Favoritas
            </h2>
            <p className="text-xs text-gray-500">
              As mais votadas pela comunidade de desenvolvedores lusófonos
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
          <Sparkles className="w-3 h-3" />
          Atualização em tempo real
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
        {podiumSlots.map(({ item, rank, label, medal, border, accent, bg, order, featured }) => {
          if (!item) return null;

          const isVotingThis = votingId === item.id;
          const userVote = item.userVote;

          const handleVoteClick = (type: "up" | "down") => {
            if (!isLoggedIn) {
              onRequireAuth();
              return;
            }
            onVote(item.id, type);
          };

          return (
            <div
              key={item.id}
              className={`${order} relative rounded-2xl border ${border} ${bg} p-5 sm:p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
                featured
                  ? "md:-translate-y-3 shadow-lg ring-2 ring-amber-400/50"
                  : "shadow-sm"
              }`}
            >
              {/* Badge de Pódio Superior */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    rank === 1
                      ? "bg-amber-500 text-white shadow-xs"
                      : rank === 2
                      ? "bg-slate-700 text-white"
                      : "bg-amber-800 text-white"
                  }`}
                >
                  <span className="text-sm">{medal}</span>
                  <span>{label}</span>
                </span>

                <span className="text-[11px] font-bold text-gray-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-gray-200">
                  {item.categoryName}
                </span>
              </div>

              {/* Informações da Tecnologia */}
              <div className="flex items-start gap-3.5 my-2">
                <div className="relative w-14 h-14 rounded-2xl bg-white p-2.5 shadow-sm border border-gray-100 shrink-0 flex items-center justify-center overflow-hidden">
                  {item.logo_url ? (
                    <img
                      src={item.logo_url}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-lg font-black text-violet-700">
                      {item.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    {item.website_url && (
                      <a
                        href={item.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-violet-600 transition"
                        title={`Visitar site oficial de ${item.name}`}
                        aria-label={`Site oficial de ${item.name}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tags rápidas */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 my-3">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium bg-white/70 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Barra de Votos e Pontuação */}
              <div className="mt-3 pt-3 border-t border-gray-200/80 flex items-center justify-between gap-3">
                {/* Score Total */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Pontuação
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`text-xl font-black ${
                        item.filteredScore > 0
                          ? "text-emerald-700"
                          : item.filteredScore < 0
                          ? "text-rose-700"
                          : "text-gray-700"
                      }`}
                    >
                      {item.filteredScore > 0 ? `+${item.filteredScore}` : item.filteredScore}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      ({item.filteredUpvotes} ↑ / {item.filteredDownvotes} ↓)
                    </span>
                  </div>
                </div>

                {/* Botões Atómicos de Voto */}
                <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl border border-gray-200 shadow-2xs">
                  {/* Upvote */}
                  <button
                    type="button"
                    onClick={() => handleVoteClick("up")}
                    disabled={isVotingThis}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      userVote === "up"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                    }`}
                    title={
                      isLoggedIn
                        ? userVote === "up"
                          ? "Clique para remover o seu voto positivo"
                          : "Votar positivamente nesta tecnologia"
                        : "Inicie sessão para votar"
                    }
                    aria-label={`Votar positivamente em ${item.name}`}
                  >
                    <ArrowUp className={`w-3.5 h-3.5 ${userVote === "up" ? "stroke-[3]" : ""}`} />
                    <span>{item.filteredUpvotes}</span>
                  </button>

                  {/* Downvote */}
                  <button
                    type="button"
                    onClick={() => handleVoteClick("down")}
                    disabled={isVotingThis}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      userVote === "down"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-gray-700 hover:text-rose-700 hover:bg-rose-50"
                    }`}
                    title={
                      isLoggedIn
                        ? userVote === "down"
                          ? "Clique para remover o seu voto negativo"
                          : "Votar negativamente nesta tecnologia"
                        : "Inicie sessão para votar"
                    }
                    aria-label={`Votar negativamente em ${item.name}`}
                  >
                    <ArrowDown className={`w-3.5 h-3.5 ${userVote === "down" ? "stroke-[3]" : ""}`} />
                    <span>{item.filteredDownvotes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
