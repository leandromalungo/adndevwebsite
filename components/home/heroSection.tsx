"use client";

import React, { useMemo } from 'react';

interface EcosystemHeroProps {
  title: string;
  paragraphs: string[];
  ctaText: string;
  ctaHref: string;
}

export const EcosystemHero: React.FC<EcosystemHeroProps> = ({
  title,
  paragraphs,
  ctaText,
  ctaHref,
}) => {

  const mosaicImages = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      // Using picsum with specific seeds to keep them consistent for the session
      url: `https://picsum.photos/seed/`,
    }));
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-2xl aspect-[16/9] md:aspect-[21/9] min-h-[400px]">
      {/* Background Mosaic Grid */}
      <div className="absolute inset-0 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-0.5 bg-black">
        {mosaicImages.map((img) => (
          <div key={img.id} className="relative w-full h-full aspect-video md:aspect-auto">
            <img src={img.url} alt=""  className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[30%]" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-blue-700/80 mix-blend-multiply transition-opacity" />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            {title}
          </h1>
          
          <div className="space-y-4">
            {paragraphs.map((text, idx) => (
              <p 
                key={idx} 
                className="text-sm md:text-base lg:text-lg font-medium leading-relaxed opacity-95"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={ctaHref}
              className="inline-block text-sm md:text-base lg:text-lg font-semibold underline decoration-2 underline-offset-8 hover:opacity-80 transition-opacity"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
