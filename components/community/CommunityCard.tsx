"use client";

import React from 'react';
import { Community } from '@/data/types';
import { Badge } from './Badge';
import { Tag } from './Tag';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Cabeçalho */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded overflow-hidden flex items-center justify-center border border-gray-100">
          <img
            src={community.logoUrl || '/cafelogo.png'}
            alt={`${community.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-base font-bold text-[#333] truncate leading-tight">
            {community.name}
          </h3>
          <span className="text-xs text-gray-400 font-medium">
            {community.location}
          </span>
        </div>
      </div>

      {/* Descrição */}
      <p className="text-xs text-[#6b7280] leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {community.description}
      </p>

      {/* Etiquetas meta */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge label="membros" value={community.members} />
        {community.type && <Badge label="tipo" value={community.type} />}
      </div>

      {/* Distintivo de categoria */}
      <div className="mb-4">
        <Badge label={community.category} className="inline-flex" />
      </div>

      {/* Etiquetas */}
      <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {community.tags.slice(0, 5).map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
          {community.tags.length > 5 && (
            <button className="text-[11px] text-[#333] font-semibold hover:underline px-1">
              + Tags
            </button>
          )}
        </div>
        <span className="text-[10px] text-gray-400">
          Fonte: este comunidade tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
        </span>
        <div className="flex items-center justify-between">

          <a
            href={community.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Ver mais
          </a>
        </div>
      </div>
    </div>
  );
};
