"use client";

import { useRef, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from "@/components/community/CommunityGrid";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 mb-3 leading-tight">
             As melhores comunidades de tecnologia na lusofonia
            </h2>

            <p className="text-gray-100 mb-2 text-sm md:text-base">
              Descubra grupos e comunidades de tecnologia na lusofonia e
              participe delas para expandir seu networking, aprender novas
              habilidades e colaborar em projetos inovadores.
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

      {/* SEÇÃO COMUNIDADES */}
      <div className="min-h-screen bg-[#f9fafb]">
        <header className="bg-white border-b border-gray-200 py-6 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900">Comunidades</h1>
            <p className="text-gray-500 text-sm mt-1">
              Descubra grupos e comunidades de tecnologia na lusofonia e
              participe.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4">
          <CommunityGrid />
        </main>

        <Footer />
      </div>
    </>
  );
}
