"use client";

import React from 'react';
import { Bootcamp } from '@/data/types';
import { Calendar, Tag, ExternalLink } from 'lucide-react';

interface ReviewCardProps {
  bootcamp: Bootcamp;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ bootcamp }) => {
  const startDate = new Date(bootcamp.startDate).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const endDate = new Date(bootcamp.endDate).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <a
      href={bootcamp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#f3f7f9] p-6 rounded shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 overflow-hidden group cursor-pointer flex flex-col h-full hover:-translate-y-1"
    >
      {/* Header with Logo and Title */}
      <div className="flex items-center gap-4 mb-3">
        {/* Logo Section */}
        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center">
          <img
            src={bootcamp.logoUrl}
            alt={bootcamp.title}
            className="max-h-12 max-w-12 object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="text-[#1a202c] font-bold text-base leading-tight group-hover:text-[#440bd6] transition-colors line-clamp-2">
          {bootcamp.title}
        </h3>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow">

        {/* Description */}
        <p className="text-[#4a5568] text-xs leading-relaxed line-clamp-3 mb-4 flex-grow">
          {bootcamp.description}
        </p>
{/*  
        /* Dates 
        <div className="flex items-center gap-2 text-[#718096] text-xs mb-3 pb-3 border-b border-gray-200">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{startDate} - {endDate}</span>
        </div>  */}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {bootcamp.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-[#e8f1f5] text-[#440bd6] text-xs px-2 py-1 rounded"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Link Button */}
        <div className="flex items-center gap-1 text-[#440bd6] font-semibold text-xs mt-auto pt-2">
          Ver mais
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
};

export default ReviewCard;
