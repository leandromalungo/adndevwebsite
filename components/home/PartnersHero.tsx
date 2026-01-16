"use client";

import React from "react";

const PartnersSection: React.FC = () => {
  const partners = [
    {
      name: "gdgluanda",
      logo: "/images/logos/gdgluanda.png",
    },
    {
      name: "opensourceangola",
      logo: "/images/logos/opensourceangola.png",
    },
    {
      name: "wtm",
      logo: "/images/logos/wtm.png",
    },
    {
      name: "podnerd",
      logo: "/images/logos/podnerd.png",
    },
    {
      name: "cftic",
      logo: "/images/logos/cftic.png",
    },
    {
      name: "anetai",
      logo: "/images/logos/anetai.png",
    },
    {
      name: "cdh",
      logo: "/images/logos/cdh.png",
    },
    {
      name: "codingao",
      logo: "/images/logos/codingao.png",
    },
    {
      name: "wt",
      logo: "/images/logos/womenintech.png",
    },
    {
      name: "elaasnocode",
      logo: "/images/logos/elasnocode.png",
    },
    
  ];

  // Doubling the array to create a seamless infinite loop effect
  const carouselItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-gray-100 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl text-[#1e293b] mb-8">
          Nossos parceiros
        </h2>

        <p className="text-[#475569] text-base sm:text-lg max-w-4xl mx-auto leading-relaxed">
          Transformar o futuro da tecnologia exige colaboração, criatividade e
          um compromisso compartilhado com o que é possível. Nossos parceiros
          desempenham um papel crucial no apoio ao aprendizado prático e
          relevante para o setor, que alimenta uma geração de aprendizes prontos
          para liderar, inovar e reimaginar o mundo por meio da tecnologia..
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full mb-16 grayscale opacity-80 hover:grayscale-0 transition-all duration-500">
        {/* Fading gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FEF3E2] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FEF3E2] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee">
          {carouselItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center px-8 md:px-12 lg:px-16 shrink-0"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto object-contain transition-transform hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent && !parent.querySelector(".fallback-text")) {
                    const span = document.createElement("span");
                    span.className =
                      "fallback-text text-xl font-black text-black/40 uppercase tracking-tighter whitespace-nowrap";
                    span.innerText = partner.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
