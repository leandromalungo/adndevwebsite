"use client";

import React from 'react';
import { WorkCard } from './WorkCard';

export const LeaderBo = () => {
  const workItems = [
    {
      image: "https://picsum.photos/seed/bolsas1/800/500",
      title: "Programa de Bolsas Líderes Estudar",
      description: "Oferecemos bolsas para estudar no Brasil ou no exterior, além de apoio vitalício para o desenvolvimento pessoal e profissional de nossos Fellows Estudar.",
      link: "#"
    },
    {
      image: "https://picsum.photos/seed/prep1/800/500",
      title: "Prep Program",
      description: "Criado por Thiago Picolo e Wolff Klabin, o Prep Program oferece orientação personalizada para brasileiros no ensino médio que sonham fazer graduação no exterior.",
      link: "#"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-12">
      <header className="mb-12">
        <h2 className="title-font text-4xl md:text-[40px] font-black text-[#333333] mb-6 uppercase">
          Bolsas para líderes
        </h2>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-5xl">
          A comunidade é a essência da Fundação Estudar. Identificamos e impulsionamos talentos brasileiros que encontram aqui um espaço de acolhimento e troca para a vida toda.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workItems.map((item, index) => (
          <WorkCard 
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </section>
  );
};
