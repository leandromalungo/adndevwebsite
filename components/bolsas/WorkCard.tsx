"use client";

import React from 'react';
import Image from 'next/image';

interface WorkCardProps {
  image: string;
  title: string;
  description: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Contentor de imagem */}
      <div className="rounded overflow-hidden aspect-[4/3] md:aspect-[5/3] mb-6 shadow-sm relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Contentor de conteúdo */}
      <div className="flex flex-col flex-grow">
        <h3 className="title-font text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#333333] mb-3 sm:mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-[#666666] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};
