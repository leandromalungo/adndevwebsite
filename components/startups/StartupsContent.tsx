"use client";

import { useRouter } from "next/navigation";
import StartupProgramsSlider from "@/components/startups/StartupProgramsSlider";
import Matchmaking from "@/components/startups/Matchmaking";
import HubShowcase from "@/components/startups/HubShowcase";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Smartphone } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const StartupsContent = () => {
  const router = useRouter();

  // Caso pretendas controlar o estado logado futuramente para manter o padrão das outras páginas
  const isLoggedIn = false; 

  const handleClick = () => {
    // Auth Removed
  };

  return (
    <>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA - INTEGRADA E RESPONSIVA */}
      <section className="relative overflow-hidden bg-zinc-950">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-startupers.webp')` }}
        >
          {/* OVERLAY INTELIGENTE: Melhora o contraste no mobile e suaviza no desktop */}
          <div className="absolute inset-0 bg-zinc-950/75 sm:bg-gradient-to-r sm:from-zinc-950 sm:via-zinc-950/80 sm:to-transparent" />
        </div>

        {/* CONTEÚDO CENTRALIZADO EM TODAS AS TELAS */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-12 lg:px-16 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-4 sm:mt-6 mb-3 tracking-tight uppercase max-w-xl">
            O que é uma startup?
          </h2>

          <p className="text-zinc-200 mb-6 sm:mb-8 text-sm sm:text-base max-w-xl leading-relaxed">
            Uma startup é uma empresa jovem que usa tecnologia para resolver um
            problema real de forma escalável e repetível. Aqui reunimos programas,
            mentoria e conexões para o ecossistema empreendedor lusófono.
          </p>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {}}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                Baixar o aplicativo
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Conheça oportunidades
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          )}
        </div>
      </section>

      <div className="min-h-screen bg-white">
        <main className="overflow-hidden">          
          <FadeIn><StartupProgramsSlider /></FadeIn>
          <FadeIn><HubShowcase /></FadeIn> 
          <FadeIn><Matchmaking /></FadeIn>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default StartupsContent;