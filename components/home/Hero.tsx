"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Search, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";

type LoadingButton = "assinar" | "area" | null;

export const Hero = () => {
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);
  const [search, setSearch] = useState("");

  const placeholders = [
    "Pesquisar comunidades tech...",
    "Pesquisar eventos de tecnologia...",
    "Pesquisar bolsas e oportunidades...",
    "Pesquisar dicas para devs...",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();

  const { data: session } = useSession();

  const isLoggedIn = !!session;


  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (button: LoadingButton) => {
    setLoadingButton(button);

    if (button === "assinar") {
      router.push("/?auth=register");
      setLoadingButton(null);
      return;
    }

    if (button === "area") {
      setTimeout(() => {
        router.push("/sobre-nos");
        setLoadingButton(null);
      }, 900);
    }
  };

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col min-h-[85vh] sm:min-h-[75vh] md:min-h-[70vh] pt-24 sm:pt-28 md:pt-32 pb-12 justify-center items-center">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">

        {/* 1. TÍTULO */}
        <h1 className="text-2xl mt-16 sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-50 uppercase leading-tight sm:leading-tight md:leading-none max-w-4xl">
          Ecossistema de conteúdo, impulsionado por tecnologia
        </h1>

        {/* 2. DESCRIÇÃO (Posicionada corretamente no topo para melhor leitura) */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-4 mb-3 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
          Somos um hub de conteúdo tecnológico lusófono definitivo para a sua carreira.
          Encontre Comunidades, Roadmaps, dicas e suporte.
        </p>

        {/* 4. BOTÕES E TEXTOS INFERIORES */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 items-center w-full sm:w-auto">

            {/* BOTÃO PRINCIPAL (Condicional) */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => setShowAppComingSoon(true)}
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-violet-700 bg-gradient-to-br from-neutral-950/80 via-neutral-900/90 to-black/90 text-white font-bold text-xs sm:text-sm md:text-base shadow-xl transition-all duration-300 ease-out hover:shadow-violet-600/20 hover:border-violet-600 active:scale-95 overflow-hidden w-full sm:w-auto min-w-[180px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  <Smartphone size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Baixar o aplicativo</span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleClick("assinar")}
                disabled={loadingButton !== null}
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-violet-500/40 bg-gradient-to-br from-violet-900/60 via-indigo-950/80 to-black/90 text-white font-bold text-xs sm:text-sm md:text-base shadow-xl transition-all duration-300 ease-out hover:shadow-violet-500/20 hover:border-violet-400/70 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  {loadingButton === "assinar" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Aguarde...</span>
                    </>
                  ) : (
                    "Inscrever-se no portal"
                  )}
                </span>
              </button>
            )}

            {/* BOTÃO SECUNDÁRIO (Sobre Nós) */}
            <button
              type="button"
              onClick={() => handleClick("area")}
              disabled={loadingButton !== null}
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/40 text-white font-bold text-xs sm:text-sm md:text-base shadow-md hover:border-zinc-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[160px] whitespace-nowrap"
            >
              {loadingButton === "area" ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Aguarde...</span>
                </span>
              ) : (
                "Sobre Nós"
              )}
            </button>
          </div>

          {/* TEXTO INFERIOR (Aviso Geral / Disclaimer) */}
          <p className="hidden lg:block text-[11px] text-gray-400 font-medium max-w-3xl mt-2 mx-auto text-center leading-relaxed">
            Não perca tempo! Junte-se a nós e esteja com profissionais de tecnologia que já estão a transformar
            suas carreiras com nossos recursos exclusivos. Este site não possui parceria oficial com os eventos,
            cursos, comunidades, projectos, bolsas e entidades aqui divulgadas. Fornecemos informações sobre o
            sector tecnologia e muito mais na lusofonia. Para qualquer esclarecimento, entre em contacto connosco.
          </p>
        </div>
      </div>

      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </section>
  );
};

export default Hero;