"use client";

import React from 'react';

interface BootcampCardProps {
  name: string;
  rating: number;
  reviews: number;
  description: string;
  logo: string;
  logoBg?: string;
}

const BootcampCard: React.FC<BootcampCardProps> = ({ name, description, logo, logoBg }) => {
  return (
    <div className="bg-white border border-gray-100 rounded p-6 shadow-sm hover:shadow-md transition-shadow relative">

      {/* Header with Logo */}
      <div className="mb-4">
        <div className={`w-12 h-12 rounded flex items-center justify-center p-2 border border-gray-50 ${logoBg || 'bg-white'}`}>
           <img src={logo} alt={`${name} - Fonte Oficial (Conteúdo de Terceiros)`} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* School Name */}
      <h3 className="text-xl font-bold text-[#1a202c] mb-1">{name}</h3>

      {/* Description & Arrow Icon */}
      <div className="flex justify-between items-start gap-4">
        <p className="text-[#4a5568] text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
            
        <div className="flex-shrink-0 mt-2">
          <div className="w-8 h-8 rounded-full border border-[#4504a6] flex items-center justify-center group cursor-pointer hover:bg-[#4e268a] transition-colors">
            <svg className="w-4 h-4 text-[#080808] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      <span className="text-[5px] text-gray-400 block mt-2 text-center">
        Fonte: {name}. Este conteúdo pertençe a marca citada. O ADN apenas divulga.
      </span>
    </div>
  );
};

export default BootcampCard;
