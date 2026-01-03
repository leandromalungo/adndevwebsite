"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="bg-[#FEF3E2] rounded-2xl overflow-hidden mb-4 border border-transparent transition-all duration-300">
      <button 
        onClick={onClick}
        className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-2xl sm:text-3xl font-bold text-[#1e293b]">{title}</span>
        <div className="bg-transparent rounded-full p-1">
          {isOpen ? <Minus className="w-6 h-6 text-[#1e293b]" /> : <Plus className="w-6 h-6 text-[#1e293b]" />}
        </div>
      </button>
      <div 
        className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[#475569] text-sm sm:text-base leading-relaxed max-w-xl">
          {content}
        </p>
      </div>
    </div>
  );
};

const VisionSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: "Inspire",
      content: "Ignite joy and curiosity in learners of all ages by showing them that tech is a space where they belong, where their ideas matter, and where they have the power to build bold, thriving careers."
    },
    {
      title: "Educate",
      content: "Provide world-class technical training and mentorship that bridges the gap between curiosity and mastery, ensuring our community is prepared for the demands of the future."
    },
    {
      title: "Launch",
      content: "Create direct pathways into the tech ecosystem through partnerships, career development, and real-world project experience that turns potential into leadership."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#1e293b] mb-4 uppercase">Nossa visão</span>
          <h2 className="text-4xl sm:text-3xl font-extrabold text-[#1e293b] leading-[1.1] mb-8">
            Capacitando a próxima geração de líderes de tecnologia para prosperar em tecnologia por meio da criatividade, da confiança e da programação.
          </h2>
          <p className="text-[#475569] text-base text-lg mb-10 leading-relaxed">
            Estamos ampliando o acesso a quem poderá programar o futuro. Ao apoiar a ADN Developer, você investe na próxima geração de inovadores, criadores e líderes. 
            Juntos, estamos reconstruindo um amanhã inclusivo, poderoso e projetado para todos. 
          </p>
          <div>
            <button className="bg-[#FF4D00] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e64500] transition-all shadow-lg shadow-orange-100 hover:scale-105 active:scale-95">
              Contribute Today
            </button>
          </div>
        </div>

        {/* Accordion */}
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
