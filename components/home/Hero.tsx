"use client";

import { useRouter } from "next/navigation";
import { Tag } from "./Tag";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

type LoadingButton = "assinar" | "area" | null;

export const Hero = () => {
  const tags = ["Eventos", "Bolsas de Estudo", "Newsletters", "E muito mais"];
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const router = useRouter();

  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();

  const handleClick = (button: LoadingButton) => {
    setLoadingButton(button);

    if (button === "assinar") {
      triggerGoogleSignup().finally(() => setLoadingButton(null));
      return;
    }

    setTimeout(() => {
      if (button === "area") {
        router.push("/sobre-nos");
      }
    }, 900);
  };

  return (
    <section
      className="
        relative z-10
        px-4 sm:px-6 lg:px-8
        max-w-7xl mx-auto
        flex flex-col
        min-h-[75vh] md:min-h-[70vh]
        pt-28 sm:pt-32 md:pt-16
        pb-12 md:pb-16
        justify-center
      "
    >
      <div className="max-w-4xl">
        {/* Título */}
        <h1 className="text-3xl font-bold sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-[1.1] mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight text-gray-50">
          Ecossistema de conteúdo, impulsionado por Tecnologia
        </h1>

        {/* Descrição */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed max-w-3xl">
          O maior repositorio de conteúdo tecnológico da lusofonia com tudo o
          que precisas para entrar na área de tecnologia, desde cursos
          e muito mais. Um espaço feito para desenvolver a tua
          carreira no sector tecnologico. Conte com a nossa ajuda.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-5 sm:mb-6 md:mb-7 lg:mb-10">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 items-center w-full sm:w-auto">
            {/* Botão Assinar */}
            <button
              onClick={() => handleClick("assinar")}
              disabled={loadingButton !== null || googleLoading}
              className="
                inline-flex items-center justify-center
                border border-violet-600
                bg-violet-550 hover:bg-violet-600/90
                text-white
                px-5 sm:px-10 lg:px-12
                py-3 sm:py-4 lg:py-5
                rounded-xl
                text-sm sm:text-lg lg:text-xl
                font-bold
                transition-all transform
                shadow-xl shadow-violet-500/40
                active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loadingButton === "assinar" ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Carregando...
                </span>
              ) : (
                "Inscrever-se no portal"
              )}
            </button>

            {/* Botão Área */}
            <button
              onClick={() => handleClick("area")}
              disabled={loadingButton !== null}
              className="
                inline-flex items-center justify-center
                border bg-violet-600 hover:border-violet-600
                text-white
                px-5 sm:px-10 lg:px-12
                py-3 sm:py-4 lg:py-5
                rounded-xl
                text-sm sm:text-lg lg:text-xl
                font-bold
                transition-all transform
                shadow-xl shadow-violet-500/20
                active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed
              "
            >
              {loadingButton === "area" ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </span>
              ) : (
                "Saber mais"
              )}
            </button>
          </div>

          <p className="text-xs md:text-sm lg:text-[10px] text-gray-100 font-medium max-w-2xl lg:max-w-3xl mt-3 lg:mt-1">
            Não perca tempo! Junte-se a nós e esteja com profissionais de
            tecnologia que já estão a transformar suas carreiras com nossos
            recursos exclusivos. Este site não possui parceria oficial
            com os eventos, cursos, comunidades, projectos, bolsas e entidades aqui divulgadas.
            Fornecemos informações sobre o sector tecnologia e muito mais na lusofonia.
            Para qualquer esclarecimento, entre em contacto connosco.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
