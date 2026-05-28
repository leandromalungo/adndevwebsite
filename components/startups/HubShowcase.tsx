"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

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
    description: "Busque incubadoras, aceleradoras e redes como BAI Incuba, Startup Brasil, InovAtiva Brasil e Beta-i para mentoria, investmento e tração."
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

export default function HubShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 bg-gray-50/50 dark:bg-zinc-900/40 border-y border-gray-100 dark:border-zinc-800/50">
        
        <div className="max-w-7xl mx-auto px-4">
        
        {/* items-stretch: Garante que ambas as colunas tenham alturas idênticas dinamicamente */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* COLUNA ESQUERDA: Imagem que estica conforme o acordeão cresce */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full rounded-lg overflow-hidden shadow-md min-h-[300px]">
            <Image
              src="/stp1.jpg"
              alt="Hub Showcase"
              fill
              sizes="(max-w-1024px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>

          {/* COLUNA DIREITA: Acordeão de Etapas do Ecossistema */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-800 p-4 sm:p-5 border border-gray-100 dark:border-zinc-700/50 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Roadmap de Desenvolvimento
                </h4>
                <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                  Passo a passo estratégico para o mercado lusófono.
                </p>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-zinc-700/50">
                {accordionData.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-3 text-left font-medium text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 focus:outline-none"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-400 dark:text-zinc-500">0{idx + 1}</span>
                          <span className={isOpen ? "font-bold text-indigo-600 dark:text-indigo-400" : ""}>{item.title}</span>
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                      </button>
                      
                      <div className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="text-xs text-gray-500 dark:text-zinc-400 bg-gray-50/50 dark:bg-zinc-850/40 p-2.5 leading-relaxed border-l border-indigo-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}