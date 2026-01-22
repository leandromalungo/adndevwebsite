'use client';

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
      videoRef.current.play().catch(err => console.log("Erro ao rodar vídeo:", err));
    }
  }, []);

  // --- ESTADO DO BOTÃO QUIZ ---
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar />

      {/* SEÇÃO HERÓI */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
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
          {/* Caminho correto do vídeo na pasta public/videos */}
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>

        {/* OVERLAY / GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex items-center px-8 py-20 md:px-12 md:py-24">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Iniciativas para inclusão de mulheres na tecnologia
            </h2>

            <p className="text-gray-100 mb-6">
              Descubra quais programas e recursos estão disponíveis para apoiar e incentivar a participação feminina no setor de tecnologia, 
              promovendo diversidade e igualdade de oportunidades, através de um quiz rápido e informativo.
            </p>

            <button
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 active:scale-95 rounded-xl ${
                loading
                  ? "bg-orange-300 cursor-not-allowed text-zinc-800"
                  : "bg-rose-400 hover:bg-rose-400 text-white"
              }`} >
              Comece agora!
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
