import React from 'react';

const Hero = () => {
  return (
    <div
      className="
        w-full rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 
        transition-all hover:ring-1 hover:ring-white/20 cursor-pointer group
        bg-black/90 relative overflow-hidden
      "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/73b942641f07e1f29b2101580080b7a4.jpg')" }}
      />

      {/* Overlay para melhorar contraste */}
      <div className="absolute inset-0 bg-black/40" />

     

      <div className="relative flex-grow text-center md:text-left">
        <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 tracking-tight uppercase">
          Os melhores desafios e competições de programação com varisos premeios
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-4xl">
        Esteja dentro das principais competições de programação, desde hackathons locais até desafios globais, e mostre suas habilidades para o mundo. Participe, aprenda e cresça como desenvolvedor enquanto compete por prêmios incríveis e reconhecimento na comunidade tech, tudo em um só lugar.
        </p>
      </div>

      <div className="relative flex-shrink-0 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
        <span className="text-white font-medium text-sm md:text-base border-b border-transparent group-hover:border-white transition-all">
          Assine e receba notificações
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

export default Hero;
