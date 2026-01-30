"use client";

import React from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export const SectionHero: React.FC<ServicesSectionProps> = ({ services,}) => {
  return (
    <section className="w-full py-2 pt-6">
      <h2 className="text-2xl font-bold text-[#444] mb-8 uppercase">
        Nós somos o caminho para o teu fututo
        <p className="text-xs text-gray-400 font-medium">
          Explora nossos serviços e descubra como podemos ajudar você a alcançar seus objetivos na área de tecnologia.
        </p>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group" >
            {/* Contentor de imagem */}
            <div className="aspect-[16/9] overflow-hidden">
              <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Área de conteúdo */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
