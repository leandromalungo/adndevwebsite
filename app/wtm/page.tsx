"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LeadershipSection } from "@/components/wtm/LeadershipSection";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
import ActivitiesSection from "@/components/wtm/activity/ActivitiesSection";
import ReviewsSection from "@/components/wtm/ReviewsSection";
import { Programs } from "@/components/wtm/Programs";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

const App = () => {
  // --- REFERÊNCIA DO VÍDEO ---

  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  // --- ESTADO DO BOTÃO QUIZ ---
  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const router = useRouter();

  const handleClick = () => {
    triggerGoogleSignup();
  };

  return (
    <>
      <Head>
        <title>Programas de apoio a mulheres na tecnologia</title>
        <meta
          name="description"
          content="Descubra iniciativas, programas e recursos dedicados a promover a inclusão e o empoderamento de mulheres no setor de tecnologia na lusofonia."
        />
      </Head>

      <Navbar />

      {/* HERO / CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/api/images/wtm')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl mt-3 md:text-4xl font-bold text-white mb-3 leading-tight">
              Iniciativas para inclusão de mulheres na tecnologia
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
              Descubra quais programas e recursos estão disponíveis para apoiar
              e incentivar a participação feminina no setor de tecnologia,
              promovendo diversidade e igualdade de oportunidades, através de um
              quiz rápido e informativo.
            </p>

            <button
              onClick={handleClick}
              disabled={googleLoading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all active:scale-95 rounded hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${googleLoading
                  ? "bg-rose-300 cursor-not-allowed text-zinc-800"
                  : "bg-rose-400 hover:bg-rose-500 text-white"
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

      {/* FILTRO POR PAÍS */}
      <CountryFilter
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        className="bg-white border-b border-gray-200"
      />
      <ReviewsSection selectedCountry={selectedCountry} />
      <LeadershipSection selectedCountry={selectedCountry} />
      <Programs selectedCountry={selectedCountry} />
      <ActivitiesSection selectedCountry={selectedCountry} />

      <Footer />
    </>
  );
};

export default App;
