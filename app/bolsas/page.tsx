"use client";

import Head from "next/head";
import { useState } from "react";
import { LeaderBo } from "@/components/bolsas/LeaderBo";
import { AboutUsSection } from "@/components/bolsas/AboutUsSection";
import { BigTechBo } from "@/components/bolsas/BigTechBo";
import { Preview } from "@/components/bolsas/Preview";
import { CarroselBo } from "@/components/bolsas/CarroselBo";
import { RecentSection } from "@/components/bolsas/RecentSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

const Page = () => {
  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const router = useRouter();

  const handleClick = () => {
    triggerGoogleSignup();
  };

  return (
    <>
      <Head>
        <title>Bolsas de Estudo</title>
        <meta
          name="description"
          content="Bolsas de estudo nacionais e internacionais para todas áreas de estudo para as melhores faculdades do mundo."
        />
      </Head>

      <Navbar />
      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/api/images/bolsas')` }}
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
              do mundo. Aproveite essas oportunidades para impulsionar sua
              carreira acadêmica e profissional.
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
      <CarroselBo />
      <main className="min-h-screen bg-white">
        <Preview />
        <div className="space-y-0">
          <RecentSection />

          <BigTechBo />

          <div className="py-12 px-4 md:px-8">
            <LeaderBo />
          </div>

          <div className="py-12 px-4 md:px-8">
            <AboutUsSection />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Page;
