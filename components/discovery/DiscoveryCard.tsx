"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  Tag,
  Users,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
  Rocket,
  ArrowRight,
} from "lucide-react";
import type { DiscoveryItem } from "@/lib/discovery-data";
import { useState } from "react";

interface DiscoveryCardProps {
  item: DiscoveryItem;
  priority?: boolean;
}

export function DiscoveryCard({ item, priority = false }: DiscoveryCardProps) {
  const [imgSrc, setImgSrc] = useState(item.imageUrl || "/images-events.webp");

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
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
          <Globe className="w-3 h-3" />
          Online
        </span>
      );
    }
    if (item.format === "hibrido") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-medium text-cyan-700 border border-cyan-200">
          <Sparkles className="w-3 h-3" />
          Híbrido
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700 border border-gray-200">
        <MapPin className="w-3 h-3" />
        Presencial
      </span>
    );
  };

  return (
    <article className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-md hover:border-violet-300 transition-all duration-200 overflow-hidden">
      {/* Imagem de Capa */}
      <div className="relative w-full h-44 sm:h-48 bg-gray-100 overflow-hidden shrink-0">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />

        {/* Gradiente sutil para legibilidade dos badges sobrepostos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Badges do topo */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {item.isExpired ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600/90 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-sm">
              <Clock className="w-3 h-3" />
              Encerrado
            </span>
          ) : item.isFree ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/90 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              Gratuito
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-xs text-white px-2.5 py-0.5 text-[11px] font-medium shadow-sm">
              {item.categoryLabel}
            </span>
          )}
        </div>

        {/* Localização / País no canto inferior da imagem */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1.5 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-violet-300 shrink-0" />
            <span className="truncate max-w-[200px]">
              {item.location || item.country}
            </span>
          </div>
          {item.membersCount ? (
            <div className="flex items-center gap-1 drop-shadow bg-black/40 px-2 py-0.5 rounded-full text-[11px]">
              <Users className="w-3 h-3 text-violet-300" />
              <span>{item.membersCount} membros</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Corpo do Cartão */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Metadados: Data/Prazo & Formato */}
        <div className="flex items-center justify-between gap-2 mb-2.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 font-medium text-violet-700">
            {item.dateBadge ? (
              <span className="font-bold">
                {item.dateBadge.day} {item.dateBadge.month}
              </span>
            ) : item.dateOrDeadline ? (
              <span className="truncate max-w-[170px]">{item.dateOrDeadline}</span>
            ) : (
              <span className="text-gray-500">Inscrições abertas</span>
            )}
          </div>
          {getFormatBadge()}
        </div>

        {/* Título com Link para a Página de Detalhes */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-snug mb-2">
          <Link
            href={`/oportunidades/${encodeURIComponent(item.id)}`}
            className="hover:text-violet-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded"
          >
            {item.title}
          </Link>
        </h3>

        {/* Descrição curta */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="inline-flex items-center text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        {/* Rodapé do Cartão com Ações Claras */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto gap-2">
          {/* Organizador */}
          <div className="flex items-center gap-2 min-w-0">
            {item.organizerLogo ? (
              <img
                src={item.organizerLogo}
                alt={item.organizer || "Organização"}
                className="w-5 h-5 rounded-full object-cover border border-gray-200 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                {item.organizer?.charAt(0) || "A"}
              </div>
            )}
            <span
              className="text-xs text-gray-500 truncate max-w-[95px] sm:max-w-[120px] font-medium"
              title={item.organizer || "ADN Developer"}
            >
              {item.organizer || "ADN Developer"}
            </span>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Botão "Ver mais" explícito para a página de detalhes */}
            <Link
              href={`/oportunidades/${encodeURIComponent(item.id)}`}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-violet-50 text-gray-800 hover:text-violet-700 border border-gray-200 hover:border-violet-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 active:scale-95"
              aria-label={`Ver mais sobre ${item.title}`}
            >
              <span>Ver mais</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Botão de ação existente (site oficial/inscrição externa), independente do Ver mais */}
            {item.link ? (
              <a
                href={item.link}
                target={item.isExternalLink ? "_blank" : undefined}
                rel={item.isExternalLink ? "noopener noreferrer" : undefined}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-violet-700 text-white hover:bg-violet-800 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 active:scale-95"
                aria-label={`${item.category === "bolsas" ? "Candidatar-se a" : "Aceder a"} ${item.title}${item.isExternalLink ? " (abre num novo separador)" : ""}`}
              >
                <span>{item.category === "bolsas" ? "Candidatar" : "Aceder"}</span>
                {item.isExternalLink ? <ExternalLink className="w-3 h-3" /> : null}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
