"use client"; // importante se estiver usando Next.js app directory

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import Features from "@/components/startups/Features";
import AccessSection from "@/components/startups/AccessSection";
import Matchmaking from "@/components/startups/Matchmaking";
import HubShowcase from "@/components/startups/HubShowcase";
import ChallengesSection from "@/components/startups/ChallengesSection";
import NewsletterSection from "@/components/startups/NewsletterSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowRight } from "lucide-react";

const App = () => {
  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const router = useRouter();

  const handleClick = () => {
    triggerGoogleSignup();
  };

  return (
    <>
      <Head>
        <title>Recursos e apoio para Startups</title>
        <meta
          name="description"
          content="Conteúdos, eventos e oportunidades para startups, empreendedores e inovadores em Angola, Brasil, Portugal, Moçambique e toda lusofonia."
        />
      </Head>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/api/images/startupers')` }}
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
              Descubra as melhores ecubadoras, aceleradoras e recursos para
              startups de tecnologia na lusofonia e impulsione o crescimento do
              seu negócio inovador.
            </p>

            <button
              onClick={handleClick}
              disabled={googleLoading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all active:scale-95 rounded hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${googleLoading
                  ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
                }`}
            >
              {googleLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Inscrever-se no portal
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-black">
        <main>
          <Features />
          <HubShowcase />
          <AccessSection />
          <Matchmaking />
          <ChallengesSection />
          <NewsletterSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default App;
