"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

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

import { FadeIn } from "@/components/ui/fade-in";

/**
 * Seção de Serviços - Exibe uma grelha de serviços com animações de entrada (FadeIn).
 * Consome uma lista de serviços através de props e renderiza cartões responsivos.
 */
export const SectionHero: React.FC<ServicesSectionProps> = ({ services, }) => {
  return (
    <section className="w-full max-w-7xl mx-auto py-2 pt-6">
      <FadeIn className="mb-8" direction="up">
        <h2 className="text-2xl font-bold text-[#444] uppercase">
          Nós somos o caminho para o teu futuro
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-2">
          Explora nossos serviços e descubra como podemos ajudar você a alcançar seus objetivos na área de tecnologia.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <FadeIn key={service.id} delay={index * 0.15} direction="up" className="h-full">
            <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 group" >
              {/* Contentor de Imagem - Define a proporção de 16:9 e inclui um efeito de zoom suave ao passar o cursor */}
              <div className="aspect-[16/9] overflow-hidden relative bg-gray-100">
                <Image 
                  src={service.imageUrl} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="empty"
                />
              </div>

              {/* Área de Conteúdo - Apresenta o título e a descrição de cada serviço individualmente */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
