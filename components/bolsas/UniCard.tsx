"use client";

import { FadeIn } from "@/components/ui/fade-in";

export const UniCard = () => {

  const supporters = [
    {
      name: "M.I.T - Massachusetts Institute of Technology",
      logo: "/images-bolsas-mit.webp",
    },
    {
      name: "Harvard University",
      logo: "/images-bolsas-hardvard.webp",
    },
    {
      name: "Universidade de Cambridge",
      logo: "/images-bolsas-cambridge.webp",
    },
    {
      name: "Universidade de Oxford",
      logo: "/images-bolsas-oxford.webp",
    },
    {
      name: "Imperial College London",
      logo: "/images-bolsas-imperial.webp",
    },
    {
      name: "Universidade de Princeton",
      logo: "/images-bolsas-princeton.webp",
    },
    {
      name: "Universidade de São Paulo (USP)",
      logo: "/images-bolsas-paulo.webp",
    },
    {
      name: "Universidade Nacional de Singapura",
      logo: "/images-bolsas-nus.webp",
    },
    {
      name: "Universidade de Pequim (PKU ou Beida)",
      logo: "/images-bolsas-china.webp",
    },{
      name: "Universidade de Pequim (PKU ou Beida)",
      logo: "/images-bolsas-china.webp",
    },
  ];

  return (
    <section className="bg-[#f3f4f6] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Lado esquerdo */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="text-violet-600 font-bold text-xs sm:text-xs md:text-sm tracking-wider uppercase">
            Confira
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1f2937] leading-tight uppercase">
            As melhores universidades do mundo
          </h2>

          <p className="text-[#4b5563]  sm:text-base md:text-lg leading-relaxed max-w-lg">
            Confiam partilham estas informações para oferecer
            bolsas de estudo a talentos emergentes na área da tecnologia e muito
            mais. Assine a plataforma e receba alertas exclusivos todos os
            meses e conte com a nossa ajuda no processo de inscrição.
          </p>

        </div>

        {/* Lado direito: logos */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {supporters.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <div
                  className="group relative bg-white rounded h-28 md:h-32 shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                >
                  {/* Imagem */}
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Sobreposição */}
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm md:text-base font-semibold text-center px-3">
                      {item.name}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
