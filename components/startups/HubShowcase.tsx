"use client";

import React, { useState } from 'react';
import type { FilterTab } from '@/components/CountryFilter';

interface HubShowcaseProps {
  selectedCountry?: FilterTab;
}

interface AccordionItem {
  title: string;
  description: string;
}

const accordionData: AccordionItem[] = [
  {
    title: "Inicie projetos rapidamente",
    description: "Crie projetos com modelos ou arquivos de projeto de tutoriais. Escolha entre um repertório crescente de modelos de núcleo, amostra ou aprendizado para 2D, 3D, VR, AR, dispositivos móveis, Microgames e muito mais."
  },
  {
    title: "Download e gerenciamento de instalações",
    description: "Gerencie várias versões do motor de forma centralizada. Encontre, baixe e instale diferentes versões do Cubo OS com facilidade, garantindo compatibilidade total com seus projetos legados ou de vanguarda."
  },
  {
    title: "Organize e colabore",
    description: "Mantenha seus projetos organizados em uma visão única. Colabore com membros da equipe compartilhando repositórios e gerenciando permissões de acesso diretamente da interface do Hub."
  },
  {
    title: "Continue aprendendo",
    description: "Acesse uma biblioteca vasta de recursos educacionais. De tutoriais guiados a documentação técnica profunda, o Hub é sua porta de entrada para o domínio das novas tecnologias."
  },
  {
    title: "Conecte e ative licenças",
    description: "Gerenciamento simplificado de identidade e licenças. Ative suas credenciais de parceiro, startup ou corporate com um único clique e acesse benefícios exclusivos do ecossistema."
  },
  {
    title: "Junte-se à comunidade",
    description: "Conecte-se com milhares de outros desenvolvedores e entusiastas. Participe de fóruns, grupos de discussão e eventos presenciais ou digitais organizados pelo Cubo."
  }
];

const HubShowcase: React.FC<HubShowcaseProps> = ({ selectedCountry }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-gray-100">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conheça o Cubo Hub
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Simplifique a sua jornada de inovação, gerenciamento de projetos e conexões estratégicas em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Accordion */}
          <div className="space-y-0 border-t border-gray-200">
            {accordionData.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-blue-600'}`}>
                      {item.title}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Interface Mockup */}
          <div className="relative">
            <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800 transform lg:translate-y-4">
              {/* Fake Window Bar */}
              <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-xs text-gray-400 font-mono">Cubo Hub v2.5.0-preview</div>
                <div className="w-12"></div>
              </div>
              
              {/* Fake UI Content */}
              <div className="flex h-[400px] md:h-[500px]">
                {/* Sidebar */}
                <div className="w-40 bg-[#252525] p-4 flex flex-col space-y-4 border-r border-gray-800">
                  <div className="h-4 w-full bg-blue-600/30 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                </div>
                {/* Main View */}
                <div className="flex-grow p-6 bg-[#1a1a1a] overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-6 w-32 bg-gray-700 rounded"></div>
                    <div className="h-8 w-24 bg-blue-600 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`p-4 rounded-lg border ${i === 2 ? 'border-blue-500 bg-blue-500/5' : 'border-gray-800 bg-gray-900/50'}`}>
                        <div className="w-10 h-10 mb-3 rounded bg-gray-800"></div>
                        <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
                        <div className="h-2 w-full bg-gray-800 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Detail Panel */}
                <div className="w-64 bg-[#212121] p-6 border-l border-gray-800 hidden md:block">
                  <div className="aspect-video bg-gray-800 rounded mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  </div>
                  <div className="h-5 w-3/4 bg-gray-700 rounded mb-4"></div>
                  <div className="space-y-2 mb-8">
                    <div className="h-2 w-full bg-gray-800 rounded"></div>
                    <div className="h-2 w-5/6 bg-gray-800 rounded"></div>
                    <div className="h-2 w-4/5 bg-gray-800 rounded"></div>
                  </div>
                  <div className="mt-auto pt-4 flex flex-col space-y-2">
                     <div className="h-10 w-full bg-gray-800 rounded border border-gray-700"></div>
                     <div className="h-10 w-full bg-blue-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-50 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubShowcase;
