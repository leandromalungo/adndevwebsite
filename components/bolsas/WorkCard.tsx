"use client";

import React from 'react';

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
      {/* Image Container */}
      <div className="rounded overflow-hidden aspect-[4/3] md:aspect-[5/3] mb-6 shadow-sm">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover "
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow">
        <h3 className="title-font text-2xl md:text-3xl text-[#333333] mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-[#666666] text-base md:text-lg mb-8 leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};
