"use client";

import { useState, useRef, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
import DiscoverSection from '@/components/gamedev/DiscoverSection';
import FortniteSection from '@/components/gamedev/FortniteSection';
import TopChartsSection from '@/components/gamedev/TopChartsSection';
import NewsSection from '@/components/gamedev/NewsSection';
import LatestNewsFeed from '@/components/gamedev/LatestNewsFeed';
import MagazineSubscription from '@/components/gamedev/MagazineSubscription';
import WeeklyHighlights from '@/components/gamedev/WeeklyHighlights';
import CardHero from '@/components/gamedev/CardHero';
import GOGPreservation from '@/components/gamedev/GOGPreservation';

const Page = () => {
  // --- REFERÊNCIA DO VÍDEO ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Erro ao rodar vídeo:", err));
    }
  }, []);

  // --- ESTADO DO BOTÃO QUIZ ---
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />

      {/* SEÇÃO HERÓI */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO DE VÍDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />

        {/* CONTEÚDO */}
        <div className="relative z-10 flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-6 mb-3 leading-tight">
              Um espaço dedicado a GameDevelopers da lusofonia.
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
                Junte-se a uma comunidade vibrante de desenvolvedores de jogos, partilhe os seus projetos,
                 aprenda novas habilidades e colabore em emocionantes iniciativas de GameDev. Com os melhores estudios indie da lusofonia.
            </p>

            <button
              disabled={loading}
              onClick={() => setLoading(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 active:scale-95 rounded-xl ${
                loading
                  ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? "Carregando..." : "Assinar agora!"}
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



