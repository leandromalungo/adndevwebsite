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
    <div className="bg-[#efefef] rounded-lg overflow-hidden mb-2 border border-transparent transition-all duration-300">
      {/* Cabeçalho do Acordeão - Botão que alterna entre os estados aberto/fechado */}
      <button
        type="button"
        onClick={onClick}
        className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-2xl sm:text-3xl text-[#1e293b]">
          {title}
        </span>
        <div className="bg-transparent rounded-full p-1">
          {isOpen ? (
            <Minus className="w-6 h-6 text-[#1e293b]" />
          ) : (
            <Plus className="w-6 h-6 text-[#1e293b]" />
          )}
        </div>
      </button>
      {/* Conteúdo Expansível - Utiliza transições de max-height e opacidade para animação suave */}
      <div
        className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-60 pb-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#475569] text-sm sm:text-base leading-relaxed max-w-xl">
          {content}
        </p>
      </div>
    </div>
  );
};

/**
 * Secção Visão - Componente principal que apresenta os pilares estratégicos da organização.
 * Utiliza um sistema de acordeão para manter o layout limpo e interativo.
 */
const VisionSection = () => {
  // Estado que controla qual item do acordeão está aberto (apenas um de cada vez)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: "Tecnologia",
      content:
        "Desenvolver soluções criativas e colaborativas em equipe, com desafios práticos e oportunidades de networking, impulsionando sua carreira na área de tecnologia.",
    },
    {
      title: "Educação",
      content:
        "Fomentar o aprendizado contínuo e o desenvolvimento de habilidades técnicas por meio de programas educacionais inovadores e acessíveis.",
    },
    {
      title: "Eventos",
      content:
        "Participe de eventos e atividades que promovem o networking e o desenvolvimento profissional, impulsionando sua carreira na área de tecnologia.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Conteúdo de Texto - Visão principal e proposta de valor tecnológica */}
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#1e293b] mb-4 uppercase">
            Nossa visão
          </span>
          <h2 className="text-4xl sm:text-3xl text-[#1e293b] leading-[1.1] mb-8">
            Tecnologia por meio da criatividade, da confiança e da programação.
          </h2>
          <p className="text-[#475569] text-base mb-10 leading-relaxed">
            Somos a voz que impulsiona a inovação tecnológica, promovendo a
            criatividade e a confiança através da programação. Nosso compromisso
            é capacitar indivíduos e organizações a alcançarem seu potencial
            máximo, transformando ideias em soluções tecnológicas impactantes.
          </p>
        </div>

        {/* Área do Acordeão - Lista dinâmica de pilares (Tecnologia, Educação, Eventos) */}
        <div className="flex flex-col">
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
