"use client"; // importante se estiver usando Next.js app directory

import React, { useState } from 'react';
import Features from '@/components/startups/Features';
import AccessSection from '@/components/startups/AccessSection';
import Matchmaking from '@/components/startups/Matchmaking';
import HubShowcase from '@/components/startups/HubShowcase';
import ChallengesSection from '@/components/startups/ChallengesSection';
import NewsletterSection from '@/components/startups/NewsletterSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";

// ícones do lucide-react
import { Loader2, ArrowRight } from "lucide-react";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  const handleClick = () => {
    setLoading(true);
    // Aqui você pode adicionar qualquer ação, ex: redirecionar para WhatsApp
    setTimeout(() => setLoading(false), 2000); // simulação de loading
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
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-6 mb-3 leading-tight">
              Aprenda como criar e escalar sua startup com tecnologia
            </h2>

            <p className="text-gray-100 mb-2 md:mb-5 text-sm md:text-base">
             Descubra as melhores ecubadoras, aceleradoras e recursos para startups de tecnologia na 
             lusofonia e impulsione o crescimento do seu negócio inovador.
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

      <div className="min-h-screen bg-black">
        <main>
          <Features selectedCountry={selectedCountry} />
          <AccessSection selectedCountry={selectedCountry} />
          <Matchmaking selectedCountry={selectedCountry} />
          <HubShowcase selectedCountry={selectedCountry} />
          <ChallengesSection selectedCountry={selectedCountry} />
          <NewsletterSection selectedCountry={selectedCountry} />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default App;
