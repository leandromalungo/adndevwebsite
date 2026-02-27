"use client";

import Head from "next/head";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from "@/components/community/CommunityGrid";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
import { Loader2, ArrowRight } from "lucide-react";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

export default function Page() {
  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  const handleClick = () => {
    triggerGoogleSignup();
  };

  return (
    <>
      <Head>
        <title>Comunidades de Tecnologia na Lusofonia</title>
        <meta
          name="description"
          content="Descubra as melhores comunidades de tecnologia, programação e inovação na lusofonia."
        />
      </Head>
      <Navbar />

      {/* HERO / CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/api/images/community?v=1')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl mt-3 md:text-4xl font-bold text-white mb-3 leading-tight">
              Comunidades de varias áreas da tecnologia da lusofonia num só lugar!
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
              Junta-te a milhares de entusiastas, desenvolvedores e criativos
              que partilham conhecimento, colaboram em projetos e impulsionam a
              inovação. Escolha a sua comunidade e comece a explorar hoje mesmo!
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

      {/* SEÇÃO COMUNIDADES */}
      <div className="min-h-screen bg-[#f9fafb]">
        <header className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900 pl-3">Comunidades</h1>
            <p className="text-gray-500 text-sm pl-3">
              Descubra grupos e comunidades de tecnologia na lusofonia e
              participe.
            </p>

            {/* FILTRO POR PAÍS */}
            <CountryFilter
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              className="bg-white border-gray-200"
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4">
          <CommunityGrid selectedCountry={selectedCountry} />
        </main>

        <Footer />
      </div>
    </>
  );
}
