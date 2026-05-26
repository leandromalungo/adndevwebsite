"use client";

import React from 'react';
import Image from 'next/image';
import type { FilterTab } from '@/components/CountryFilter';

interface MatchmakingProps {
  selectedCountry?: FilterTab;
}

interface MatchmakingCardProps {
  title: string;
  description: string;
  imageUrl: string;
  accentColor: string;
  patternPosition: 'left' | 'right' | 'center';
}

const DecorativePattern: React.FC<{ position: 'left' | 'right' | 'center' }> = ({ position }) => {
  const alignClass = position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : 'left-1/4';
  
  return (
    <div className={`absolute top-0 ${alignClass} z-20 pointer-events-none`}>
      <div className="flex">
        <div className="grid grid-cols-2 w-12 h-12">
          <div className="bg-white"></div>
          <div className="bg-black"></div>
          <div className="bg-black"></div>
          <div className="bg-white"></div>
        </div>
        <div className="w-12 h-12 bg-white relative border border-gray-200">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-black rotate-45"></div>
              <div className="w-full h-px bg-black -rotate-45"></div>
           </div>
        </div>
        <div className="grid grid-cols-2 w-12 h-12">
          <div className="bg-black"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-black"></div>
        </div>
      </div>
    </div>
  );
};

const MatchmakingCard: React.FC<MatchmakingCardProps> = ({ title, description, imageUrl, accentColor, patternPosition }) => (
  <div className="relative group overflow-hidden h-[500px] md:h-[600px] flex flex-col justify-end">
    {/* Imagem de fundo */}
    <div className="absolute inset-0 z-0">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
    </div>

    {/* Padrão decorativo no topo */}
    <DecorativePattern position={patternPosition} />

    {/* Caixa de conteúdo branca */}
    <div className="relative z-10 bg-white p-8 mx-4 mb-8 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Separador de cor de destaque no canto inferior direito */}
    <div className={`absolute bottom-0 right-0 w-8 h-8 ${accentColor} z-20`}></div>
  </div>
);

const Matchmaking: React.FC<MatchmakingProps> = ({ selectedCountry }) => {
  const cards = [
    {
      title: "Comunidade",
      description: "Trocas e aprendizado com empreendedores e fundadores para validar sua ideia e reduzir riscos.",
      imageUrl: "/stp11.jpg",
      accentColor: "bg-gradient-to-br from-violet-600 to-violet-800",
      patternPosition: 'left' as const
    },
    {
      title: "Mentoria",
      description: "Apoio de especialistas para decisões de produto, estratégia de marketing e tração inicial.",
      imageUrl: "/stp2.jpg",
      accentColor: "bg-gradient-to-br from-purple-600 to-pink-600",
      patternPosition: 'center' as const
    },
    {
      title: "Investidores",
      description: "Conexões com investidores e fundos alinhados ao estágio inicial, para apoiar crescimento sólido.",
      imageUrl: "/stp3.jpg",
      accentColor: "bg-gradient-to-br from-violet-500 to-violet-700",
      patternPosition: 'left' as const
    },
    {
      title: "Aprendizado",
      description: "Acesso a eventos, workshops e materiais que ajudam a estruturar produto, vendas e operação.",
      imageUrl: "/stp4.jpg",
      accentColor: "bg-gradient-to-br from-pink-500 to-rose-400",
      patternPosition: 'right' as const
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-lx sm:text-xl md:text-2xl lg:text-4xl font-light text-gray-900 max-w-4xl mx-auto leading-snug uppercase">
            Matchmaking para founders, mentores e investidores de startups
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <MatchmakingCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Matchmaking;
