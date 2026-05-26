"use client";

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Community } from '@/data/types';
import { Badge } from './Badge';
import { Tag } from './Tag';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoggedIn = !!session;
  const actionHref = isLoggedIn ? community.link || '#' : `${pathname}?auth=login`;
  const actionTarget = isLoggedIn ? '_blank' : undefined;
  const actionRel = isLoggedIn ? 'noopener noreferrer' : undefined;

  const isLikelyImage = (url?: string) => {
    if (!url) return false;
    if (url.startsWith('/') || url.startsWith('./')) return true;
    if (url.startsWith('data:')) return true;
    try {
      const parsed = new URL(url);
      const pathname = parsed.pathname || '';
      return /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(pathname);
    } catch (e) {
      return false;
    }
  };

  const imageSrc = isLikelyImage(community.logoUrl) ? community.logoUrl! : '/cafelogo.png';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full hover:shadow-md hover:border-gray-200 transition-all duration-200">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 relative shadow-inner">
          <Image
            src={imageSrc}
            alt={`${community.name} logo`}
            fill
            className="object-cover"
            loading="lazy"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-base font-bold text-gray-800 truncate leading-snug">
            {community.name}
          </h3>
          <span className="text-xs text-gray-400 font-medium truncate">
            {community.location}
          </span>
        </div>
      </div>

      {/* Descrição */}
      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {community.description}
      </p>

      {/* Seção de Badges/Distintivos (Agrupados para melhor aproveitamento de espaço) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {community.type && <Badge label="tipo" value={community.type} />}
        {community.category && <Badge label={community.category} className="inline-flex" />}
      </div>

      {/* Rodapé e Etiquetas (Empurrados para o final do card) */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-4">

        {/* Tags de busca */}
        <div className="flex flex-wrap items-center gap-1.5">
          {community.tags.slice(0, 5).map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
          {community.tags.length > 5 && (
            <button className="text-[11px] text-gray-500 font-semibold hover:text-blue-600 hover:underline px-1 transition-colors">
              +{community.tags.length - 5} tags
            </button>
          )}
        </div>

        {/* Ação Principal - Transformado em um botão moderno */}
        <div className="flex items-center justify-end w-full">
          <a
            href={actionHref}
            target={actionTarget}
            rel={actionRel}
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1 px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 active:bg-blue-200 transition-all duration-150"
          >
            Ver mais
          </a>
        </div>

      </div>
    </div>
  );
};
