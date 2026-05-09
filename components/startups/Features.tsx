"use client";

import React from 'react';
import type { FilterTab } from '@/components/CountryFilter';

interface FeatureCardProps {
  icon: string;
  iconBg: string;
  text: string;
}

interface FeaturesProps {
  selectedCountry?: FilterTab;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBg, text }) => (
  <div className="flex items-stretch h-20 md:h-24">
    <div className={`${iconBg} w-20 md:w-24 flex-shrink-0 flex items-center justify-center text-white text-3xl`}>
      <i className={icon}></i>
    </div>
    <div className="bg-[#f2f2f2] flex-grow flex items-center px-6 text-gray-800 font-normal text-sm md:text-base leading-snug">
      {text}
    </div>
  </div>
);

const Features: React.FC<FeaturesProps> = ({ selectedCountry }) => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Lado esquerdo: Texto */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-gray-900 leading-tight mb-6 sm:mb-8 uppercase">
            Competências que tornam sua startup mais forte
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md leading-relaxed">
            Entenda o cliente, experimente rapidamente, monitore o negócio e organize o time para crescer
            de forma ágil e sustentável.
          </p>
        </div>

        {/* Lado direito: Grelha de funcionalidades */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard 
            icon="fas fa-search" 
            iconBg="bg-[#ff33cc]" 
            text="Entenda profundamente o cliente antes de construir" 
          />
          <FeatureCard 
            icon="fas fa-lightbulb" 
            iconBg="bg-black" 
            text="Teste hipóteses com experimentos rápidos e aprenda com dados" 
          />
          <FeatureCard 
            icon="fas fa-chart-line" 
            iconBg="bg-black" 
            text="Escolha um modelo financeiro com margem para investir e escalar" 
          />
          <FeatureCard 
            icon="fas fa-users" 
            iconBg="bg-[#ff6600]" 
            text="Priorize canais que trazem clientes pagantes e melhoram retenção" 
          />
          <FeatureCard 
            icon="fas fa-balance-scale" 
            iconBg="bg-[#3366ff]" 
            text="Use métricas acionáveis para decidir prioridades e investimento" 
          />
          <FeatureCard 
            icon="fas fa-rocket" 
            iconBg="bg-black" 
            text="Construa um time ágil, colaborativo e focado em produto" 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
