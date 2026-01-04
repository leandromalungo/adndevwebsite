"use client";

import React from 'react';

export const LogoCloud = () => {
  const logos = [
    { name: 'Spotify', url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg' },
    { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Marvel', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' },
    { name: 'HubSpot', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/HubSpot_Logo.svg' },
    { name: 'New York Times', url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo_white.svg' },
    { name: 'TED', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/TED_logo.svg' },
    { name: 'The Economist', url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/The_Economist_logo.svg' },
  ];

  return (
    <div className="relative z-20 w-full px-6 pb-10 max-w-[1400px] mx-auto">
      {/* Container justified to center */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Label */}
        <div className="flex-shrink-0">
          <p className="text-[#8e9aaf] text-[14px] font-medium whitespace-nowrap">
            Stacks do momento:
          </p>
        </div>

        {/* Logos Container justified to center */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-10">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="h-5 md:h-6 flex items-center transition-opacity duration-300"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-full w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
