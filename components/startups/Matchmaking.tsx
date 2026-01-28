"use client";

import React from 'react';
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
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
    </div>

    {/* Decorative Pattern at Top */}
    <DecorativePattern position={patternPosition} />

    {/* White Content Box */}
    <div className="relative z-10 bg-white p-8 mx-4 mb-8 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-2">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Accent Color Tab at Bottom Right */}
    <div className={`absolute bottom-0 right-0 w-8 h-8 ${accentColor} z-20`}></div>
  </div>
);

const Matchmaking: React.FC<MatchmakingProps> = ({ selectedCountry }) => {
  const cards = [
    {
      title: "Comunidade",
      description: "Trocas e aprendizado com + 700 empreendedores e startups da nossa rede, no físico e no digital.",
      imageUrl: "https://images.unsplash.com/photo-1523240715639-99f84d39443b?auto=format&fit=crop&q=80&w=800",
      accentColor: "bg-gradient-to-br from-blue-600 to-indigo-600",
      patternPosition: 'left' as const
    },
    {
      title: "Geração de negócios",
      description: "A conexão no ecossistema Cubo gera escalabilidade para startups e eficiência operacional para corporates.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
      accentColor: "bg-gradient-to-br from-purple-600 to-pink-600",
      patternPosition: 'center' as const
    },
    {
      title: "Fundraising",
      description: "Preparo para rodadas de investimento e conexão com fundos, investors e benefícios de partners.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=800",
      accentColor: "bg-gradient-to-br from-indigo-500 to-blue-400",
      patternPosition: 'left' as const
    },
    {
      title: "Conteúdos exclusivos",
      description: "Networking com quem é referência no mercado em eventos, workshops, mentorias e treinamentos.",
      imageUrl: "https://images.unsplash.com/photo-1475721027187-402ad75d124c?auto=format&fit=crop&q=80&w=800",
      accentColor: "bg-gradient-to-br from-pink-500 to-rose-400",
      patternPosition: 'right' as const
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light text-gray-900 max-w-4xl mx-auto leading-snug">
            Matchmaking com resultados reais: o <span className="font-semibold">Cubo Agro gera oportunidades para todo o ecossistema</span>
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
