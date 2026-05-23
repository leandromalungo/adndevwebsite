"use client";

import React from "react";
import Image from "next/image";
import Link from 'next/link';

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
      <FadeIn className="mb-8 text-center" direction="up">
        <h2 className="text-2xl font-bold text-white uppercase">
          As oportunidades estão onde as coisas acontecem!
        </h2>
        <p className="text-xs text-gray-300 font-medium mt-1">
          Explora e descubra como podemos ajudar você a alcançar seus objetivos na área de tecnologia
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* TEXTURA EM XADREZ (GRID) - Aplicada de forma leve ao fundo do card */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 group-hover:opacity-[0.25] group-hover:bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] transition-all duration-500 pointer-events-none"
        />

        {services.map((service, index) => (
          <FadeIn key={service.id} delay={index * 0.50} direction="up" className="h-full">
            <div className="h-full flex flex-col bg-[#111215]/85 backdrop-blur-md rounded-2xl border border-neutral-800/60 hover:border-violet-500/40 overflow-hidden shadow-lg hover:shadow-violet-500/10 transition-all duration-300 group relative">

              {/* TEXTURA EM XADREZ INTERNA (Opcional - caso queiras reforçar o efeito dentro do card) */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.07] pointer-events-none" />

              {/* Contentor de Imagem - Proporção e transição suave */}
              <div className="aspect-[16/9] overflow-hidden relative bg-neutral-950 z-10 border-b border-neutral-800/40">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="empty"
                />
                {/* Gradiente sutil para suavizar a transição com a área de texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-transparent opacity-80" />
              </div>

              {/* Área de Conteúdo */}
              <div className="p-6 flex flex-col flex-grow z-10 justify-between">
                <div>
                  {/* Título - Branco sólido com excelente peso visual */}
                  <h3 className="text-xl font-bold text-white tracking-wide mb-2.5 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Descrição - Tom cinza fosco equilibrado para o tema dark */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Botão de Ação Transformado em Link do Next.js */}
                <Link
                  href={service.link}
                  className="w-full py-2.5 px-4 flex items-center gap-2 text-sm font-medium text-neutral-200 hover:text-violet-400 transition-all duration-300 cursor-pointer"
                >
                  <span>Saber mais</span>
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 text-neutral-400 group-hover:text-violet-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>

              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
