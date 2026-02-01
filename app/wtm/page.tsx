export const metadata = {
  title: "Programas de apoio a mulheres na tecnolgia",
  description:
    "Descubra iniciativas, programas e recursos dedicados a promover a inclusão e o empoderamento de mulheres no setor de tecnologia na lusofonia.",
};

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroCarousel } from "@/components/wtm/HeroCarousel";
import { LeadershipSection } from "@/components/wtm/LeadershipSection";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";

const App = () => {
  // --- REFERÊNCIA DO VÍDEO ---

  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  // --- ESTADO DO BOTÃO QUIZ ---
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubscribe = () => {
    setLoading(true);
    setTimeout(() => router.push("/assinatura"), 900);
  };

  return (
    <>
      <Navbar />

      {/* HERO / CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/wtm.jpg')` }}
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
              onClick={handleSubscribe}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-3 py-3 mb-4 font-semibold transition-all active:scale-95 rounded-xl ${
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
      <LeadershipSection selectedCountry={selectedCountry} />
      <HeroCarousel selectedCountry={selectedCountry} />
      <Footer />
    </>
  );
};

export default App;
