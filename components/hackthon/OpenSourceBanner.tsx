
import React from 'react';

interface OpenSourceBannerProps {
  title: string;
  description: string;
  footerText: string;
  linkText: string;
  linkHref: string;
}

/**
 * OpenSourceBanner Component
 * 
 * A high-contrast dark banner highlighting Open Source values.
 * Features decorative SVG hexagons with hearts to match the provided design.
 */
export const OpenSourceBanner: React.FC<OpenSourceBannerProps> = ({
  title,
  description,
  footerText,
  linkText,
  linkHref,
}) => {
  return (
    <section className="relative w-full bg-[#181818] rounded-xl overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between min-h-[340px]">
      {/* Text Content */}
      <div className="z-10 flex-1 space-y-8">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#47f3b8] tracking-tight">
          {title}
        </h2>
        
        <div className="space-y-6 max-w-2xl">
          <p className="text-white text-sm md:text-base font-medium opacity-90 leading-relaxed">
            {description}
          </p>
          
          <p className="text-white text-sm md:text-base font-medium opacity-90 leading-relaxed">
            {footerText}{' '}
            <a 
              href={linkHref} 
              className="underline decoration-1 underline-offset-4 hover:text-[#47f3b8] transition-colors"
            >
              {linkText}
            </a>
          </p>
        </div>
      </div>

      {/* Decorative Hexagons Area */}
      <div className="relative mt-12 md:mt-0 flex-shrink-0 w-full md:w-auto flex justify-center md:justify-end items-center pr-0 md:pr-10 h-40 md:h-auto">
        {/* Large Hexagon */}
        <div className="relative transform hover:scale-110 transition-transform duration-500">
           <HexagonIcon className="w-24 h-28 md:w-32 md:h-36 text-[#47f3b8] opacity-90 drop-shadow-[0_0_20px_rgba(71,243,184,0.3)]" />
        </div>
        
        {/* Medium Hexagon (Positioned relative to large) */}
        <div className="absolute top-12 -left-12 md:-left-16 transform hover:scale-110 transition-transform duration-500">
           <HexagonIcon className="w-16 h-20 md:w-20 md:h-24 text-[#30e2c4] opacity-80 drop-shadow-[0_0_15px_rgba(48,226,196,0.3)]" />
        </div>

        {/* Small Hexagon */}
        <div className="absolute bottom-[-10px] right-[-10px] md:bottom-[-20px] md:right-[-20px] transform hover:scale-110 transition-transform duration-500">
           <HexagonIcon className="w-12 h-14 md:w-16 md:h-20 text-[#2dd4bf] opacity-70 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
        </div>
      </div>
    </section>
  );
};

/**
 * Helper SVG component for the decorative hexagons
 */
const HexagonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 115" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" 
      fill="currentColor"
    />
    <path 
      d="M50 35C50 35 48 30 42 30C36 30 32 34 32 40C32 48 42 58 50 65C58 58 68 48 68 40C68 34 64 30 58 30C52 30 50 35 50 35Z" 
      fill="white" 
      fillOpacity="0.4"
    />
  </svg>
);
