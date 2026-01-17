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
            Como funciona?
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-4xl text-[#222222] leading-[1.1] mb-8 uppercase">
          O repositório é mantido para ajudar jovens talentos a encontrarem oportunidades educacionais globais.
          </h2>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste quae doloremque atque ad quibusdam ab delectus 
            perferendis, fugiat sint molestiae reprehenderit quidem aspernatur. Mollitia illum possimus fugit iste porro quia exercitationem 
            sunt, necessitatibus odio dicta at obcaecati repellendus nisi ipsum quis. Commodi voluptas optio quaerat obcaecati in maxime hic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Feature 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-[#222222] text-xl">O que acontece se eu assinar?</h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ex, commodi aliquam quo 
                natus sit officiis vitae, facilis maiores repellendus asperiores eius ipsa magni dolorum perferendis placeat
                dolores excepturi odit corrupti adipisci! Sit labore dolorum modi libero obcaecati? Nesciunt, ullam.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-[#222222] text-xl">
                  Lorem, ipsum.
                </h3>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis doloribus molestiae eaque natus unde aspernatur 
                consectetur possimus assumenda. Tempore, doloremque facilis libero doloribus itaque vel voluptate repellendus non? Iusto 
                fugit neque unde culpa fugiat, suscipit facilis inventore. Eum, expedita aliquid?
              </p>
            </div>
          </div>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, eum! Quam eaque voluptatem, rerum molestiae nemo perferendis quis illum 
            doloribus voluptates quaerat repudiandae soluta saepe ex possimus dicta dolor eum minus ea itaque. Ab totam nisi eaque ad obcaecati debitis!
          </p>

          <div>
            <button className="bg-[#07bb1f] hover:bg-[#0aa21e] text-[#ffffff] font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
              Baixar agora
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
