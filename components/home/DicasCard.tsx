"use client";

import React from 'react';

interface DicasCardProps {
  image: string;
  title: string;
  link: string;
}

const DicasCard: React.FC<DicasCardProps> = ({ image, title, link }) => {
  return (
    <a 
      href={link}
      className="flex items-center gap-4 p-4 border border-gray-100 rounded shadow-sm hover:shadow-md transition-shadow group bg-white"
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden rounded ">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center overflow-hidden">
        <h3 className="text-[#1a202c] font-semibold text-sm md:text-base leading-snug group-hover:text-[#440bd6] transition-colors line-clamp-2">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-[11px] md:text-xs text-gray-500 whitespace-nowrap">
          <span className="text-gray-300 mx-1">•</span>
        </div>
      </div>
    </a>
  );
};

export default DicasCard;
