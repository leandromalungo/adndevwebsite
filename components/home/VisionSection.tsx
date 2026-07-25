"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isOpen,
  onClick,
}) => {
  return (
    <div className={`rounded overflow-hidden mb-2.5 border transition-all duration-300 ${
        isOpen 
          ? "bg-[#111111] border-violet-600/30 shadow" 
          : "bg-gray-100/70 border border-gray-300 hover:bg-gray-100"
      }`} >
      {/* Cabeçalho do Acordeão - Ajuste de padding para ficar mais compacto */}
      <button
        type="button"
        onClick={onClick}
        className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none group"
      >
        <span 
          className={`text-base font-semibold transition-colors duration-200 ${
            isOpen ? "text-violet-700" : "text-gray-800 group-hover:text-black"
          }`}
        >
          {title}
        </span>
        
        {/* Caixa do Ícone com padding otimizado */}
        <div 
          className={`p-1 rounded-full transition-colors ${
            isOpen ? "bg-violet-100 text-violet-600" : "bg-gray-200/80 text-gray-500 group-hover:text-gray-700"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Conteúdo Expansível com preenchimento interno ajustado */}
      <div
        className={`px-5 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-100 text-xs sm:text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

/**
 * Secção Visão - Componente principal em Fundo Branco
 */
const VisionSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: "Tecnologia",
      content:
        "Desenvolver soluções criativas e colaborativas em equipa, com desafios práticos e oportunidades de networking, impulsionando a sua carreira na área de tecnologia.",
    },
    {
      title: "Educação",
      content:
        "Fomentar o aprendizado contínuo e o desenvolvimento de habilidades técnicas por meio de programas educacionais inovadores e acessíveis.",
    },
    {
      title: "Eventos",
      content:
        "Participe de eventos e atividades que promovem o networking e o desenvolvimento profissional, impulsionando a sua carreira na área de tecnologia.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white text-gray-800 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Conteúdo de Texto à Esquerda */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
            Nossa visão
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-gray-900 max-w-xl uppercase">
            Acesso a informação de forma filtrada
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl pt-1">
            Somos a voz que impulsiona a inovação tecnológica, promovendo a
            criatividade e a confiança através da programação. Nosso compromisso
            é capacitar indivíduos e organizações a alcançarem seu potencial
            máximo, transformando ideias em soluções tecnológicas impactantes.
          </p>
        </div>

        {/* Área do Acordeão à Direita */}
        <div className="flex flex-col w-full max-w-xl lg:max-w-none justify-self-center lg:justify-self-auto">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default VisionSection;