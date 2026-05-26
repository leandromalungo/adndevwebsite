"use client";

import { useRouter } from "next/navigation";
import StartupProgramsSlider from "@/components/startups/StartupProgramsSlider";
import AccessSection from "@/components/startups/AccessSection";
import Matchmaking from "@/components/startups/Matchmaking";
import HubShowcase from "@/components/startups/HubShowcase";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const StartupsContent = () => {
  const router = useRouter();

  const handleClick = () => {
    // Auth Removed
  };

  return (
    <>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-startupers.webp')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center lg:items-center lg:text-center">
          <div className="max-w-md mx-auto lg:mx-0">
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-8 md:mt-12 lg:mt-14 mb-3 leading-tight uppercase">
              O que é uma startup?
            </h2>

            <p className="text-gray-100 mb-2 md:mb-5 text-xs sm:text-sm md:text-base">
              Uma startup é uma empresa jovem que usa tecnologia para resolver um
              problema real de forma escalável e repetível. Aqui reunimos programas,
              mentoria e conexões para o ecossistema empreendedor lusófono.
            </p>

            <button
              onClick={handleClick}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2">
                Conheça oportunidades
                <ArrowRight size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-white">
        <main className="overflow-hidden">
          <FadeIn><Matchmaking /></FadeIn>
          <FadeIn><HubShowcase /></FadeIn>   
          <FadeIn><StartupProgramsSlider /></FadeIn>
          <FadeIn><AccessSection /></FadeIn>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default StartupsContent;
