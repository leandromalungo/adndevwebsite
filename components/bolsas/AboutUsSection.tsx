"use client";

import React from 'react';
import { Zap, Network } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Text Content */}
        <div className="flex flex-col">
          <span className="text-[#666666] font-bold text-sm tracking-widest uppercase mb-4">
            Encontre as bolsas de estudos
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#222222] leading-[1.1] mb-8 uppercase">
          Repositório é mantido para ajudar jovens talentos a encontrarem oportunidades educacionais globais.
          </h2>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Global Young Leaders is a Brazilian initiative with international reach, 
            founded in 2020 in Itarema, Ceará, by young people committed to social, 
            climate, and territorial justice. It was born out of the urgent need to 
            develop concrete actions that would positively impact traditional communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#FFD600] p-1 rounded-full">
                  <Zap className="w-4 h-4 text-white fill-current" />
                </div>
                <h3 className="font-bold text-[#222222] text-xl">Our Communities</h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                We work with traditional communities including quilombola, Indigenous, 
                riverside, and semi-arid populations through education, sanitation, 
                culture, and youth empowerment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#FFD600] p-1 rounded-full">
                  <Network className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-[#222222] text-xl">Global Network</h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                From our roots in Brazil, we've grown into an international network 
                connecting youth with initiatives in China, Sweden, the United States, 
                and Latin America.
              </p>
            </div>
          </div>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Guided by the mission of empowering young people from their own territories, 
            we promote cultural exchange, political education, social innovation, and 
            sustainability across borders.
          </p>

          <div>
            <button className="bg-[#FFD600] hover:bg-[#e6c100] text-[#222222] font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
              Read more about us
            </button>
          </div>
        </div>

        {/* Right Column: Image Stack */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[24px] overflow-hidden shadow-lg h-[350px] lg:h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop" 
              alt="Group of people talking to an elder"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="rounded-[24px] overflow-hidden shadow-lg h-[350px] lg:h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop" 
              alt="Large group of young people posing outdoors"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
