
import React from 'react';

const FifaHospitalityBanner: React.FC = () => {
  return (
    <div className="w-full bg-black rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all hover:ring-1 hover:ring-white/20 cursor-pointer group">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <div className="w-20 h-24 bg-white/5 rounded flex items-center justify-center overflow-hidden">
          {/* Using a placeholder that mimics the 2026 logo structure */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/pt/d/d1/2026_FIFA_World_Cup_logo.svg" 
            alt="FIFA 26 Logo" 
            className="w-16 h-auto invert"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://www.fifa.com/static-assets/fifacom-logo.png";
            }}
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-grow text-center md:text-left">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight">
          Hospitalidade da Copa do Mundo FIFA™
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-4xl">
          Viva a experiência definitiva da Copa do Mundo FIFA 2026™ com pacotes de hospitalidade que oferecem conforto luxuoso, comodidades de primeira classe e muito mais para criar memórias do futebol que durarão a vida toda.
        </p>
      </div>

      {/* CTA Section */}
      <div className="flex-shrink-0 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
        <span className="text-white font-medium text-sm md:text-base border-b border-transparent group-hover:border-white transition-all">
          Escolha o seu pacote
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-5 h-5 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </div>
  );
};

export default FifaHospitalityBanner;
