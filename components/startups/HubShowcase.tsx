"use client";

import Image from 'next/image';
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
    title: "Defina o problema que você resolve",
    description: "Identifique uma dor clara do cliente e formule uma proposta de valor que gere ganho de tempo, redução de custo ou melhor experiência no mercado lusófono."
  },
  {
    title: "Valide a ideia junto ao mercado",
    description: "Fale com potenciais clientes, colete feedback e construa um MVP simples para testar hipóteses antes de investir em produto completo."
  },
  {
    title: "Estruture o modelo de negócio",
    description: "Defina receita, canais, segmentação e métricas chave como CAC, LTV e taxa de conversão para orientar crescimento sustentável."
  },
  {
    title: "Acesse apoio e parcerias reais",
    description: "Busque incubadoras, aceleradoras e redes como BAI Incuba, Startup Brasil, InovAtiva Brasil e Beta-i para mentoria, investimento e tração."
  },
  {
    title: "Formalize a operação",
    description: "Registre a empresa, organize processos legais e financeiros e prepare acordos de sócios, contratos e demonstrações de desempenho."
  },
  {
    title: "Escale com foco em tração",
    description: "Use dados de mercado para priorizar vendas, marketing e produto. Cresça em etapas, buscando investidores alinhados ao seu setor e ao seu estágio." 
  }
];

const HubShowcase: React.FC<HubShowcaseProps> = ({ selectedCountry }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 border-t border-gray-100">
      <div className="container mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-3 sm:mb-4 uppercase">
            Como criar uma startup?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light max-w-2xl mx-auto">
            Passos práticos para transformar uma ideia em uma empresa de tecnologia
            viável, com validação de mercado, apoio estruturado e tração na lusofonia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Esquerda: Acordeão */}
          <div className="space-y-0 border-t border-gray-200">
            {accordionData.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium transition-colors ${isOpen ? 'text-gray-900' : 'text-violet-600'}`}>
                      {item.title}
                    </span>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direita: imagem stp1 */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl border border-gray-200 bg-white lg:translate-y-4 h-[420px] md:h-[480px]">
              <Image
                src="/stp1.jpg"
                alt="STP1"
                width={900}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Acento de fundo */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-violet-50 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HubShowcase;
