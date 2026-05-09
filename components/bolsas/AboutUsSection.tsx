"use client";

import { FadeIn } from "@/components/ui/fade-in";

export const AboutUsSection = () => {

  return (
    <section className="max-w-7xl mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Text Content */}
        <FadeIn direction="right" className="flex flex-col">
          <span className="text-[#666666] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Como funciona?
          </span>

          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl text-[#222222] leading-[1.1] mb-6 sm:mb-8 uppercase">
            O repositório é mantido para ajudar jovens talentos a encontrarem
            oportunidades educacionais globais.
          </h2>

          <p className="text-[#666666] text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
            Nós conectamos você com oportunidades de bolsas de estudo em
            universidades renomadas ao redor do mundo, facilitando o acesso a
            uma educação de qualidade sem custos financeiros. Seja você um
            estudante buscando expandir seus horizontes acadêmicos ou um jovem
            profissional em busca de crescimento pessoal e profissional, nosso
            repositório é o seu ponto de partida para alcançar seus objetivos
            educacionais globais.
          </p>
          
        </FadeIn>

        {/* Right Column: Image Stack */}
        <FadeIn direction="left" delay={0.2} className="flex flex-col gap-6">
          <div className="rounded overflow-hidden shadow-lg h-[350px] lg:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop"
              alt="Group of people talking to an elder"
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
