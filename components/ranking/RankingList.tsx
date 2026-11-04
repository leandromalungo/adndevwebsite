"use client";

import { ArrowUp, ArrowDown, ExternalLink, Globe } from "lucide-react";
import type { RankingItem } from "@/lib/ranking-types";

interface RankingListProps {
  items: RankingItem[];
  onVote: (techId: string, type: "up" | "down") => void;
  isLoggedIn: boolean;
  onRequireAuth: () => void;
  votingId: string | null;
}

export function RankingList({
  items,
  onVote,
  isLoggedIn,
  onRequireAuth,
  votingId,
}: RankingListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3" role="list" aria-label="Lista de Tecnologias Classificadas">
      {items.map((item) => {
        const isVotingThis = votingId === item.id;
        const userVote = item.userVote;

        const handleVoteClick = (type: "up" | "down") => {
          if (!isLoggedIn) {
            onRequireAuth();
            return;
          }
          onVote(item.id, type);
        };

        const scoreColorClass =
          item.filteredScore > 0
            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
            : item.filteredScore < 0
            ? "text-rose-700 bg-rose-50 border-rose-200"
            : "text-gray-700 bg-gray-50 border-gray-200";

        return (
          <article
            key={item.id}
            className="group relative bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:border-violet-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Esquerda: Posição + Logo + Informações */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              {/* Posição no Ranking */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 ${
                  item.rank === 1
                    ? "bg-amber-400 text-amber-950 ring-2 ring-amber-300"
                    : item.rank === 2
                    ? "bg-slate-300 text-slate-900"
                    : item.rank === 3
                    ? "bg-amber-700/80 text-white"
                    : "bg-gray-100 text-gray-700 group-hover:bg-violet-50 group-hover:text-violet-700"
                }`}
                title={`Posição #${item.rank} no ranking`}
              >
                #{item.rank}
              </div>

              {/* Logo / Ícone */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 p-2 border border-gray-100 shrink-0 flex items-center justify-center overflow-hidden">
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
                  <Globe className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* Detalhes da Tecnologia */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {item.name}
                  </h3>

                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200/80">
                    {item.categoryName}
                  </span>

                  {item.website_url && (
                    <a
                      href={item.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-violet-600 transition"
                      title={`Visitar documentação / site oficial de ${item.name}`}
                      aria-label={`Site oficial de ${item.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Direita: Pontuação e Controles de Votação */}
            <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
              {/* Pontuação Consolidada (Upvotes - Downvotes) */}
              <div className="flex flex-col items-start md:items-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Pontos
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center justify-center min-w-[56px] px-2.5 py-1 rounded-lg text-sm sm:text-base font-black border ${scoreColorClass}`}
                  >
                    {item.filteredScore > 0 ? `+${item.filteredScore}` : item.filteredScore}
                  </span>
                </div>
              </div>

              {/* Botões Atómicos de Voto: Upvote (↑) e Downvote (↓) */}
              <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-200">
                {/* Botão Upvote */}
                <button
                  type="button"
                  onClick={() => handleVoteClick("up")}
                  disabled={isVotingThis}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    userVote === "up"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                  }`}
                  title={
                    isLoggedIn
                      ? userVote === "up"
                        ? "Clique para remover o seu voto positivo"
                        : "Dar Upvote (+1) nesta tecnologia"
                      : "Inicie sessão para votar"
                  }
                  aria-label={`Upvote em ${item.name}`}
                >
                  <ArrowUp className={`w-4 h-4 ${userVote === "up" ? "stroke-[3]" : ""}`} />
                  <span>{item.filteredUpvotes}</span>
                </button>

                {/* Botão Downvote */}
                <button
                  type="button"
                  onClick={() => handleVoteClick("down")}
                  disabled={isVotingThis}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    userVote === "down"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-gray-700 hover:text-rose-700 hover:bg-rose-50"
                  }`}
                  title={
                    isLoggedIn
                      ? userVote === "down"
                        ? "Clique para remover o seu voto negativo"
                        : "Dar Downvote (-1) nesta tecnologia"
                      : "Inicie sessão para votar"
                  }
                  aria-label={`Downvote em ${item.name}`}
                >
                  <ArrowDown className={`w-4 h-4 ${userVote === "down" ? "stroke-[3]" : ""}`} />
                  <span>{item.filteredDownvotes}</span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
