"use client";

import React from 'react';
import Image from 'next/image';
import type { FilterTab } from '@/components/CountryFilter';

interface ChallengesSectionProps {
  selectedCountry?: FilterTab;
}

interface CourseCardProps {
  thumbnailUrl: string;
  thumbnailBg: string;
  title: string;
  duration: string;
  location: string;
  description: string;
  brandingText: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ thumbnailUrl, thumbnailBg, title, duration, location, description, brandingText }) => (
  <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Miniatura */}
    <div className={`${thumbnailBg} w-full md:w-48 h-48 flex-shrink-0 relative flex items-center justify-center p-6 text-white text-center`}>
      <div className="z-10 flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-tighter uppercase opacity-80 mb-1">.StartSe</span>
        <div className="font-bold leading-tight text-lg">
          {brandingText.split('<br/>').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {thumbnailUrl && (
        <Image src={thumbnailUrl} alt="" fill className="absolute inset-0 object-cover mix-blend-overlay opacity-40" loading="lazy" />
      )}
    </div>

    {/* Conteúdo */}
    <div className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const ChallengesSection: React.FC<ChallengesSectionProps> = ({ selectedCountry }) => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Cartão de destaque à esquerda */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-end group">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
            alt="Resolva seu principal desafio"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* Sobreposição de conteúdo */}
          <div className="relative z-10 p-10 pb-16">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[0.9] mb-6 drop-shadow-lg">
              Resolva seu <br />
              <span className="tracking-tighter">principal desafio</span>
            </h2>
            <p className="text-gray-200 max-w-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed drop-shadow-lg">
              Use inteligência artificial para acelerar a geração de ideias, montar protótipos, validar hipóteses com clientes e preparar pitches mais rápidos e precisos.
            </p>
          </div>

          {/* Padrão decorativo de linha ondulada (estilizado a partir da imagem) */}
          <div className="absolute bottom-10 left-0 w-full px-10 pointer-events-none opacity-40">
            <svg viewBox="0 0 400 20" className="w-full h-auto text-white fill-current">
              <path d="M0 10 Q 50 0, 100 10 T 200 10 T 300 10 T 400 10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Pilha de cursos à direita */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <CourseCard
            thumbnailBg="bg-[#003d2b]"
            thumbnailUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
            title="IA para ideação"
            duration="20 horas"
            location="Online"
            brandingText="AI STARTUP<br/>IDEATION"
            description="Aprenda a usar IA para gerar ideias de produto, criar personas detalhadas e mapear oportunidades em mercados lusófonos com mais velocidade."
          />

          <CourseCard
            thumbnailBg="bg-[#4a154b]"
            thumbnailUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
            title="IA para MVP e validação"
            duration="28 horas"
            location="Online"
            brandingText="MVP &<br/>VALIDAÇÃO<br/>COM IA"
            description="Use ferramentas de IA para desenhar protótipos, testar mensagens de mercado e coletar feedback dos primeiros usuários com agilidade."
          />

          <CourseCard
            thumbnailBg="bg-[#001f3f]"
            thumbnailUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
            title="IA para pitch e crescimento"
            duration="6 horas"
            location="Online"
            brandingText="AI STARTUP<br/>PITCH"
            description="Domine como aplicar IA na preparação de pitch decks, projeções e no planejamento de tração para acelerar a entrada no mercado."
          />
        </div>

      </div>
    </section>
  );
};

export default ChallengesSection;
