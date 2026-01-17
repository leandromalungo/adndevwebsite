"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface WorkCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  image,
  title,
  description,
  link
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Image Container */}
      <div className="rounded-[20px] overflow-hidden aspect-[4/3] md:aspect-[5/3] mb-6 shadow-sm">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="title-font text-2xl md:text-3xl font-black text-[#333333] mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-[#666666] text-base md:text-lg mb-8 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Footer Area with Button and Metric */}
        <div className="flex items-end justify-between mt-auto">
          <a 
            href={link}
            className="inline-flex items-center bg-[#0178f8] hover:bg-[#0f6dd2] text-[#ffffff] font-bold py-3 px-6 rounded-xl transition-colors duration-200 text-sm md:text-base"
          >
            Saiba mais
            <ChevronRight className="ml-1 w-5 h-5" />
          </a>

        </div>
      </div>
    </div>
  );
};
