"use client";

import React, { useState } from 'react';
import type { FilterTab } from '@/components/CountryFilter';

interface AccessSectionProps {
  selectedCountry?: FilterTab;
}

interface AccessItem {
  id: string;
  category: string;
  title: string;
  description: string;
  points: string[];
  buttonText: string;
  image: string;
}

const accessData: AccessItem[] = [
  {
    id: 'ideacao',
    category: 'Ferramentas',
    title: 'Ferramentas de ideação',
    description: 'Acesse frameworks e templates que ajudam a transformar problemas reais em oportunidades de negócio.',
    points: [
      'Modelos de proposta de valor',
      'Mapas de empatia e jornada do cliente',
      'Brainstorming estruturado',
      'Checklist de validação inicial'
    ],
    buttonText: 'Usar ferramentas',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'validacao',
    category: 'Processo',
    title: 'Validação rápida',
    description: 'Métodos e passos para testar hipóteses, coletar feedback e medir interesse real do mercado.',
    points: [
      'Guias de entrevista com clientes',
      'Protótipos de baixa fidelidade',
      'Pesquisa de preços e aceitação',
      'Ajustes rápidos com base em dados'
    ],
    buttonText: 'Testar hipótese',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'modelo',
    category: 'Planejamento',
    title: 'Planeje o negócio',
    description: 'Modelos e checklists que facilitam a definição de receitas, custos, canais e previsões financeiras.',
    points: [
      'Planilhas de fluxo de caixa',
      'Mapeamento de fontes de receita',
      'Cálculo de custo de aquisição',
      'Projeção de crescimento incremental'
    ],
    buttonText: 'Planejar negócio',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'tracao',
    category: 'Crescimento',
    title: 'Geração de tração',
    description: 'Estratégias para atrair os primeiros clientes pagantes e construir um caminho repetível de crescimento.',
    points: [
      'Campanhas digitais focadas',
      'Parcerias estratégicas',
      'Testes A/B de oferta',
      'Retenção inicial e NPS'
    ],
    buttonText: 'Gerar tração',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'investimento',
    category: 'Investimento',
    title: 'Investimento',
    description: 'Materiais e conexões que facilitam a preparação de pitch, projeções e negociação com investidores.',
    points: [
      'Modelos de deck eficazes',
      'Métricas que impressionam investidores',
      'Onde encontrar investidores anjo',
      'Eventos e demo days relevantes'
    ],
    buttonText: 'Preparar pitch',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  }
];

const AccessSection: React.FC<AccessSectionProps> = ({ selectedCountry }) => {
  const [activeId, setActiveId] = useState<string>('ideacao');

  return (
    <section className="relative bg-white pt-16 md:pt-24 pb-4 md:pb-24 overflow-hidden">
      {/* Padrão decorativo de fundo */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 opacity-5 md:opacity-10 pointer-events-none select-none">
        <div className="grid grid-cols-6 gap-0">
          {[...Array(36)].map((_, i) => (
            <div key={i} className={`w-12 md:w-16 h-12 md:h-16 border border-gray-300 flex items-center justify-center ${i % 7 === 0 ? 'bg-gray-200' : ''}`}>
               {i % 5 === 0 && (
                 <div className="w-full h-full relative">
                   <div className="absolute w-[141%] h-px bg-gray-300 rotate-45 top-1/2 -left-[20%]"></div>
                   <div className="absolute w-[141%] h-px bg-gray-300 -rotate-45 top-1/2 -left-[20%]"></div>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10">
        <header className="mb-8 sm:mb-10">
          <span className="text-violet-600 font-medium text-xs sm:text-sm mb-2 sm:mb-3 block uppercase tracking-wider">#CrieSuaStartup</span>
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 max-w-3xl leading-tight">
            Etapas essenciais para transformar uma ideia em uma startup de tecnologia real.
          </h2>
        </header>

        {/* Slider Boxed - Ajustado para evitar espaço inferior no mobile */}
        <div className="flex flex-col lg:flex-row h-[550px] md:h-[600px] w-full gap-0 rounded-xl overflow-hidden shadow-2xl bg-gray-900">
          {accessData.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className={`relative transition-all duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)] cursor-pointer overflow-hidden ${
                  isActive 
                    ? 'flex-[8] lg:flex-[4]' 
                    : 'flex-[1] lg:flex-[1]'
                }`}
              >
                {/* Imagem de fundo */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-30'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Separadores */}
                <div className="hidden lg:block absolute left-0 top-0 w-[1px] h-full bg-white/10 z-20" />
                <div className="lg:hidden absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />

                {/* Contentor de conteúdo */}
                <div className={`relative z-10 h-full w-full flex flex-col p-6 md:p-8 text-white transition-all duration-500 ${
                  isActive ? 'justify-end pb-8' : 'justify-center lg:justify-end'
                }`}>
                  
                  {/* Etiqueta de categoria */}
                  <div className={`transition-all duration-500 ${
                    !isActive ? 'lg:-rotate-90 lg:whitespace-nowrap lg:mb-20 lg:transform lg:origin-bottom-left' : 'mb-3'
                  }`}>
                    <h3 className={`text-sm md:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {item.category}
                    </h3>
                  </div>
                  
                  {/* Conteúdo expansível */}
                  <div className={`transition-all duration-700 ease-in-out ${
                    isActive ? 'opacity-100 max-h-[400px] translate-y-0' : 'opacity-0 max-h-0 translate-y-10 invisible pointer-events-none'
                  }`}>
                    <p className="text-gray-300 text-xs md:text-base mb-4 max-w-md font-light leading-snug">
                      {item.description}
                    </p>
                    
                    <ul className="space-y-1.5 md:space-y-2 mb-6">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="mr-3 mt-1 flex-shrink-0">
                            <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                              <div className="bg-violet-500 w-full h-full"></div>
                              <div className="bg-violet-500 w-full h-full"></div>
                              <div className="bg-violet-500 w-full h-full"></div>
                              <div className="bg-violet-500 w-full h-full"></div>
                            </div>
                          </div>
                          <span className="text-gray-200 text-xs md:text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-6 py-3 text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700">
                      <span className="relative z-10 flex items-center font-bold text-xs md:text-sm">
                        {item.buttonText}
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccessSection;
