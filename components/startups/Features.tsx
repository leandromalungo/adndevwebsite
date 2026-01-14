"use client";

import React from 'react';

interface FeatureCardProps {
  icon: string;
  iconBg: string;
  text: string;
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

const Features: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-8">
            Inovação é nosso compromisso, conexões que fazem a diferença são nosso resultado
          </h2>
          <p className="text-lg text-gray-700 max-w-md leading-relaxed">
            O Cubo Itaú é uma organização sem fins lucrativos com a <span className="font-semibold">missão de transformar a vida das pessoas por meio do empreendedorismo tecnológico.</span>
          </p>
        </div>

        {/* Right Side: Feature Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard 
            icon="fas fa-search" 
            iconBg="bg-[#ff33cc]" 
            text="Curadoria e scouting de startups" 
          />
          <FeatureCard 
            icon="fas fa-network-wired" 
            iconBg="bg-black" 
            text="Ecossistema diverso e colaborativo" 
          />
          <FeatureCard 
            icon="fas fa-building" 
            iconBg="bg-black" 
            text="Infraestrutura física e plataforma digital" 
          />
          <FeatureCard 
            icon="fas fa-comments" 
            iconBg="bg-[#ff6600]" 
            text="Conexão com startups, corporates e investidores" 
          />
          <FeatureCard 
            icon="fas fa-rocket" 
            iconBg="bg-[#3366ff]" 
            text="Eventos e iniciativas para inovação constante" 
          />
          <FeatureCard 
            icon="fas fa-bullseye" 
            iconBg="bg-black" 
            text="Cultura de inovação e mentalidade disruptiva" 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
