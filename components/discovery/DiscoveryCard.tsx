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

  // Cores de badge por categoria
  const getCategoryColor = () => {
    switch (item.category) {
      case "eventos":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "hackathons":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "bolsas":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "intercambio":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "cursos":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "comunidades":
        return "bg-violet-50 text-violet-700 border-violet-200";
      case "startups":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "mulheres_ti":
        return "bg-pink-50 text-pink-700 border-pink-200";
      case "game_dev":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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

  const CardContent = (
    <article className="group flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-violet-300 transition-all duration-200 overflow-hidden">
      {/* Imagem de Capa */}
      <div className="relative w-full h-44 sm:h-48 bg-gray-100 overflow-hidden shrink-0">
        <Image
          src={imgSrc}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
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
          ) : null}
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

        {/* Título */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-2 leading-snug mb-2">
          {item.title}
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

        {/* Rodapé do Cartão */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
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
            <span className="text-xs text-gray-500 truncate max-w-[130px] font-medium">
              {item.organizer || "ADN Developer"}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 group-hover:text-violet-800 group-hover:translate-x-0.5 transition-transform">
            Ver oportunidade
            {item.isExternalLink ? (
              <ExternalLink className="w-3.5 h-3.5" />
            ) : (
              <span aria-hidden="true">&rarr;</span>
            )}
          </span>
        </div>
      </div>
    </article>
  );

  if (item.isExternalLink) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-xl"
        aria-label={`${item.title} (abre num novo separador)`}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link
      href={item.link}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-xl"
      aria-label={item.title}
    >
      {CardContent}
    </Link>
  );
}
