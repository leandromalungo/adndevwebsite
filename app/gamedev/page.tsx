"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
import DiscoverSection from "@/components/gamedev/DiscoverSection";
import FortniteSection from "@/components/gamedev/FortniteSection";
import TopChartsSection from "@/components/gamedev/TopChartsSection";
import NewsSection from "@/components/gamedev/NewsSection";
import LatestNewsFeed from "@/components/gamedev/LatestNewsFeed";
import MagazineSubscription from "@/components/gamedev/MagazineSubscription";
import WeeklyHighlights from "@/components/gamedev/WeeklyHighlights";
import CardHero from "@/components/gamedev/CardHero";
import GOGPreservation from "@/components/gamedev/GOGPreservation";

const Page = () => {
  // --- REFERÊNCIA DO VÍDEO ---
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- FILTRO ---
  const [selectedCountry, setSelectedCountry] =
    useState<FilterTab>("Angola");

  // --- BOTÃO CTA ---
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);

    // exemplo: redirecionar depois de clicar
    setTimeout(() => {
      router.push("/assinatura"); // muda para a rota que quiseres
    }, 1200);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Erro ao rodar vídeo:", err));
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO / CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/events.png')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-6 mb-3 leading-tight">
              O maior repositório de eventos de tecnologia da lusofonia.
            </h2>

            <p className="text-gray-100 mb-5 text-sm md:text-base">
              Descubra os melhores e imperdíveis eventos mais próximos de ti,
              conecte-se com profissionais e impulsione sua carreira tech.
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

      {/* CONTEÚDO */}
      <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 md:px-8 overflow-x-hidden">
        <div className="w-full max-w-[1400px] space-y-12">
          <CardHero />
          <DiscoverSection />
          <GOGPreservation />
          <FortniteSection />
          <TopChartsSection />
          <WeeklyHighlights />
          <MagazineSubscription />
          <NewsSection />
          <LatestNewsFeed />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
