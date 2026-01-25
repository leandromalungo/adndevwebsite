"use client"; // importante se estiver usando Next.js app directory

import React, { useState } from "react";
import { Hero } from "@/components/bolsas/Hero";
import { LeaderBo } from "@/components/bolsas/LeaderBo";
import { AboutUsSection } from "@/components/bolsas/AboutUsSection";
import { BigTechBo } from "@/components/bolsas/BigTechBo";
import { Preview } from "@/components/bolsas/Preview";
import { CarroselBo } from "@/components/bolsas/CarroselBo";
import { RecentSection } from "@/components/bolsas/RecentSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";

// ícones
import { Loader2, ArrowRight } from "lucide-react";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  const handleClick = () => {
    setLoading(true);
    // Aqui você pode adicionar qualquer ação, ex: abrir WhatsApp ou redirecionar
    setTimeout(() => setLoading(false), 2000); // simulação de carregamento
  };

  return (
    <>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/fundo_1.jpg')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-3 leading-tight">
              Esteja atento as melhores bolsas de estudo e oportunidades
              internacionais.
            </h2>

            <p className="text-gray-100 mb-2 text-sm md:text-base">
              Bolsas 100% gratuitas para você estudar nas melhores universidades
              do mundo. Aproveite essas oportunidades para impulsionar sua carreira
              acadêmica e profissional.
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all active:scale-95 rounded-xl ${
                loading
                  ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Assinar agora!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* FILTRO POR PAÍS */}
      <CountryFilter
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        className="bg-white border-b border-gray-200"
      />

      <main className="min-h-screen bg-white">
        <Preview />
        <div className="space-y-0">
          <div className="py-12 px-4 md:px-8">
            <AboutUsSection />
          </div>

          <BigTechBo />

          <div className="py-12 px-4 md:px-8">
            <LeaderBo />
          </div>

          <CarroselBo />

          <RecentSection selectedCountry={selectedCountry} />

          <Footer />
        </div>
      </main>
    </>
  );
};

export default App;
