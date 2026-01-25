"use client";

import { useState, useRef, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OutrosRecursos from "@/components/wtm/outros-recursos";
import RecursosOrganizador from "@/components/wtm/recursos-organizador";
import { HeroCarousel } from "@/components/wtm/HeroCarousel";
import { LeadershipSection } from "@/components/wtm/LeadershipSection";

const App = () => {
  // --- REFERÊNCIA DO VÍDEO ---
  const videoRef = useRef<HTMLVideoElement>(null);

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
              Iniciativas para inclusão de mulheres na tecnologia
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
              Descubra quais programas e recursos estão disponíveis para apoiar
              e incentivar a participação feminina no setor de tecnologia,
              promovendo diversidade e igualdade de oportunidades, através de um
              quiz rápido e informativo.
            </p>

            <button
              disabled={loading}
              onClick={() => setLoading(true)}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 active:scale-95 rounded-xl ${
                loading
                  ? "bg-orange-300 cursor-not-allowed text-zinc-800"
                  : "bg-rose-400 hover:bg-rose-500 text-white"
              }`}
            >
              {loading ? "Carregando..." : "Assinar agora!"}
            </button>
          </div>
        </div>
      </section>
      <LeadershipSection />
      <RecursosOrganizador />
      <HeroCarousel />
      <OutrosRecursos />

      <Footer />
    </>
  );
};

export default App;
