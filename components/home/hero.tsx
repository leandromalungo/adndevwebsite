"use client";

import { useRouter } from "next/navigation";
import { Tag } from "./Tag";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type LoadingButton = "assinar" | "area" | null;

export const Hero = () => {
  const tags = ["E-books", "Newsletters", "Bolsas de Estudo", "E muito mais"];
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const router = useRouter();

  const handleClick = (button: LoadingButton) => {
    setLoadingButton(button);

    setTimeout(() => {
      if (button === "area") {
        router.push("/quiz");
      } else {
        router.push("/assinatura");
      }
    }, 900);
  };

  return (
    <section
      className="
        relative z-10
        px-6
        max-w-7xl mx-auto
        flex flex-col
        min-h-[70vh]
        pt-24 md:pt-32
        pb-10 md:pb-16
        md:justify-center
      "
    >
      <div className="max-w-2xl">
        {/* Título */}
        <h1 className="text-4xl md:text-6xl leading-[1.1] mb-4 md:mb-6 tracking-tight text-gray-50">
          Ecossistema de conteúdo, impulsionado por Tecnologia.
        </h1>

        {/* Descrição */}
        <p className="text-sm md:text-lg text-gray-300 mb-3 md:mb-5 leading-relaxed max-w-lg">
          O que precisas para entrar na área de tecnologia, desde cursos,
          bootcamps e muito mais. Um espaço feito para ti crescer na tua
          carreira tech, com a nossa ajuda.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-start gap-3 md:gap-4">
          <div className="flex flex-row gap-2 md:gap-3 items-center w-full sm:w-auto">
            {/* Botão Assinar */}
            <button
              onClick={() => handleClick("assinar")}
              disabled={loadingButton !== null}
              className="
                inline-flex items-center justify-center
                border border-violet-600
                bg-violet-550 hover:bg-violet-600
                text-white
                px-4 sm:px-10
                py-2 sm:py-4
                rounded-xl
                text-xs sm:text-lg
                font-bold
                transition-all transform
                shadow-xl shadow-violet-500/20
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
                "Assinar agora"
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
                px-4 sm:px-10
                py-2 sm:py-4
                rounded-xl
                text-xs sm:text-lg
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
                "Qual área é para mim?"
              )}
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-500 font-medium max-w-lg mt-2">
            Não perca tempo! Junte-se a nós e esteja com profissionais de
            tecnologia que já estão a transformar suas carreiras com nossos
            recursos exclusivos. Estamos a nos tornar o maior repositório de
            conteúdo tecnológico da lusofonia!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
