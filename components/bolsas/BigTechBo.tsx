"use client";

import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { Loader2 } from "lucide-react";

export const BigTechBo = () => {
  const { triggerGoogleSignup, loading } = useGoogleSignup();

  const supporters = [
    {
      name: "M.I.T - Massachusetts Institute of Technology",
      logo: "/api/images/mit",
    },
    {
      name: "Harvard University",
      logo: "/api/images/hardvard",
    },
    {
      name: "Universidade de Cambridge",
      logo: "/api/images/cambridge",
    },
    {
      name: "Universidade de Oxford",
      logo: "/api/images/oxford",
    },
    {
      name: "Imperial College London",
      logo: "/api/images/imperial",
    },
    {
      name: "Universidade de Princeton",
      logo: "/api/images/princeton",
    },
    {
      name: "Universidade de São Paulo (USP)",
      logo: "/api/images/paulo",
    },
    {
      name: "Universidade Nacional de Singapura",
      logo: "/api/images/nus",
    },
    {
      name: "Universidade de Pequim (PKU ou Beida)",
      logo: "/api/images/china",
    },
  ];

  return (
    <section className="bg-[#f3f4f6] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Lado esquerdo */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="text-[#0ea5e9] font-bold text-xs md:text-sm tracking-wider uppercase">
            Tenha acesso
          </span>

          <h2 className="text-3xl md:text-5xl text-[#1f2937] leading-tight">
            Bolsas de estudo das melhores universidades do mundo
          </h2>

          <p className="text-[#4b5563] text-lg leading-relaxed max-w-lg">
            As melhores universidades do mundo confiam em nós para oferecer
            bolsas de estudo a talentos emergentes na área da tecnologia e muito
            mais. Assine a plataforma e receba alertas exclusivos todos os
            meses.
          </p>

          <div className="pt-4">
            <button
              onClick={triggerGoogleSignup}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#006eff] hover:bg-[#0c69e3] text-white font-bold py-3 px-8 rounded transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Processando..." : "Assinar agora"}
            </button>
          </div>
        </div>

        {/* Lado direito: logos */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {supporters.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg h-28 md:h-32 shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
