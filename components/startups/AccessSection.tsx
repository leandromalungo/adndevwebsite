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
    id: 'startups',
    category: 'Cubo for Startups',
    title: 'Startups',
    description: 'Troca de conhecimento e novas oportunidades de negócio para startups em fase de tração no mercado.',
    points: [
      'Conexão direta com grandes empresas',
      'Fundraising e oportunidades de negócio',
      'Espaço físico colaborativo e networking diário',
      'Participação em desafios de inovação corporativa'
    ],
    buttonText: 'Seja uma Startup Cubo',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'corporates',
    category: 'Cubo for Corporates',
    title: 'Corporates',
    description: 'Transformação digital acelerada através da conexão com as melhores soluções tecnológicas do mercado.',
    points: [
      'Acesso à curadoria exclusiva de startups',
      'Hub de inovação aberta e networking',
      'Programas de intraempreendedorismo',
      'Insights e tendências do ecossistema'
    ],
    buttonText: 'Traga sua Empresa',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'partners',
    category: 'Cubo for Partners',
    title: 'Partners',
    description: 'Apoio estratégico para o desenvolvimento da comunidade e fortalecimento do ecossistema de inovação.',
    points: [
      'Visibilidade de marca no hub',
      'Parcerias institucionais fortes',
      'Produção de conteúdo compartilhado',
      'Networking de alto nível'
    ],
    buttonText: 'Seja um Parceiro',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'investors',
    category: 'Cubo for Investors',
    title: 'Investors',
    description: 'Aproximação qualificada entre capital e inovação, facilitando o fluxo de investimentos em startups de alto potencial.',
    points: [
      'Acesso a dealflow qualificado',
      'Relacionamento com VCs e investidores anjo',
      'Demo days e eventos de pitching',
      'Monitoramento de performance do portfólio'
    ],
    buttonText: 'Invista via Cubo',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'talents',
    category: 'Cubo for Talents',
    title: 'Talents',
    description: 'Conecte-se com as melhores oportunidades no ecossistema de tecnologia e inovação da América Latina.',
    points: [
      'Acesso a vagas exclusivas em startups',
      'Programas de capacitação técnica',
      'Networking com fundadores e líderes',
      'Comunidade vibrante de talentos tech'
    ],
    buttonText: 'Quero me Conectar',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200'
  }
];

const AccessSection: React.FC<AccessSectionProps> = ({ selectedCountry }) => {
  const [activeId, setActiveId] = useState<string>('startups');

  return (
    <section className="relative bg-white pt-16 md:pt-24 pb-4 md:pb-24 overflow-hidden">
      {/* Background Decorative Pattern */}
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
        <header className="mb-10">
          <span className="text-blue-600 font-medium text-sm mb-3 block uppercase tracking-wider">#VemProCubo</span>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 max-w-3xl leading-tight">
            Fazer parte do Cubo Itaú é ter acesso a <span className="font-semibold">mercado, capital, talentos e conhecimento</span>
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
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-30'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Dividers */}
                <div className="hidden lg:block absolute left-0 top-0 w-[1px] h-full bg-white/10 z-20" />
                <div className="lg:hidden absolute top-0 left-0 w-full h-[1px] bg-white/10 z-20" />

                {/* Content Container */}
                <div className={`relative z-10 h-full w-full flex flex-col p-6 md:p-8 text-white transition-all duration-500 ${
                  isActive ? 'justify-end pb-8' : 'justify-center lg:justify-end'
                }`}>
                  
                  {/* Category Label */}
                  <div className={`transition-all duration-500 ${
                    !isActive ? 'lg:-rotate-90 lg:whitespace-nowrap lg:mb-20 lg:transform lg:origin-bottom-left' : 'mb-3'
                  }`}>
                    <h3 className={`text-sm md:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {item.category}
                    </h3>
                  </div>
                  
                  {/* Expanding Content */}
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
                              <div className="bg-blue-500 w-full h-full"></div>
                              <div className="bg-blue-500 w-full h-full"></div>
                              <div className="bg-blue-500 w-full h-full"></div>
                              <div className="bg-blue-500 w-full h-full"></div>
                            </div>
                          </div>
                          <span className="text-gray-200 text-xs md:text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs md:text-sm transition-all transform hover:translate-x-1 active:scale-95">
                      {item.buttonText}
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
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
