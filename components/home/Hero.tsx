"use client";

import { useRouter } from "next/navigation";
import { Tag } from "./Tag";
import { useState } from "react";
import { Loader2, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";

type LoadingButton = "assinar" | "area" | null;

export const Hero = () => {
  const tags = ["Eventos", "Bolsas de Estudo", "Newsletters", "E muito mais"];
  const [loadingButton, setLoadingButton] = useState<LoadingButton>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;

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
        {/* Título principal do Hero - Utiliza tipografia robusta e uppercase para impacto visual */}
        <h1 className="text-3xl font-bold sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl leading-[1.1] mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-tight text-gray-50 uppercase mt-12">
          Ecossistema de conteúdo, impulsionado por Tecnologia
        </h1>

        {/* Descrição do Ecossistema - Texto persuasivo que detalha a proposta de valor do portal */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed max-w-3xl">
          Um Hub de conteúdo tecnológico da Lusofonia com tudo o
          que precisas para entrar na área de tecnologia, desde cursos e muito
          mais. Um espaço feito para desenvolver a tua carreira no sector
          tecnologico. Conte com a nossa ajuda.
        </p>

        {/* Etiquetas de categorias - Exibe os principais tópicos cobertos pelo ecossistema */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-5 sm:mb-6 md:mb-7 lg:mb-10">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Chamadas para Ação (CTAs) - Botões principais de interação com o utilizador */}
        <div className="flex flex-col items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 items-center w-full sm:w-auto">
            {/* Botão de Inscrição / Baixar App - Inclui efeito de brilho animado e gestão de estados de carregamento */}
            {isLoggedIn ? (
              // Quando logado: mostra botão de download
              <a
                href="https://play.google.com/store/apps/details?id=com.adndeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative
                  inline-flex items-center justify-center
                  px-3 sm:px-8 lg:px-10
                  py-3 sm:py-5
                  rounded-2xl
                  border-2 border-violet-700
                  bg-gradient-to-br from-neutral-950/80 via-neutral-900/90 to-black/90
                  text-white
                  font-bold
                  text-[11px] sm:text-base lg:text-lg
                  shadow-xl
                  transition-all duration-300 ease-out
                  hover:shadow-violet-600/40
                  hover:shadow-xl
                  hover:border-violet-600/70
                  active:scale-95
                  overflow-hidden
                  flex-1 sm:flex-none
                "
              >
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-transparent via-violet-400/30 to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-1000 ease-out
                  "
                />
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r from-violet-600/10 via-violet-400/20 to-violet-600/10
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <Smartphone size={16} />
                  <span className="hidden sm:inline">Baixar aplicativo</span>
                  <span className="sm:hidden">Download</span>
                </span>
              </a>
            ) : (
              // Quando não logado: mostra botão de inscrição (original)
              <button
                type="button"
                onClick={() => handleClick("assinar")}
                disabled={loadingButton !== null}
                className="
                  group relative
                  inline-flex items-center justify-center
                  px-3 sm:px-10 lg:px-12
                  py-3 sm:py-5
                  rounded-2xl
                  border-2 border-violet-500/50
                  bg-gradient-to-br from-violet-900/80 via-indigo-950/90 to-black/90
                  text-white
                  font-bold
                  text-[11px] sm:text-lg lg:text-xl
                  shadow-xl
                  transition-all duration-300 ease-out
                  hover:shadow-violet-500/40
                  hover:shadow-xl
                  hover:border-violet-400/70
                  active:scale-95
                  disabled:opacity-70 disabled:cursor-not-allowed
                  overflow-hidden
                  w-1/2 sm:w-auto
                "
              >
                {/* Efeito de brilho animado que percorre o botão ao passar o cursor (hover) */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-transparent via-violet-400/30 to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-1000 ease-out
                  "
                />

                {/* Brilho interno suave que aumenta a visibilidade do botão no hover */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r from-violet-500/10 via-violet-400/20 to-violet-500/10
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />

                <span className="relative z-10 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                  {loadingButton === "assinar" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="hidden sm:inline">Carregando...</span>
                      <span className="sm:hidden">Aguarde...</span>
                    </>
                  ) : (
                    "Inscrever-se no portal"
                  )}
                </span>
              </button>
            )}

            {/* Botão Saber Mais - Redireciona o utilizador para a secção institucional */}
            <button
              type="button"
              onClick={() => handleClick("area")}
              disabled={loadingButton !== null}
              className="
                group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border-2 border-violet-200 bg-transparent px-10 font-bold text-white transition-all duration-100 [box-shadow:5px_5px_rgb(124,58,237)] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_rgb(124,58,237)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-1/2 sm:w-auto whitespace-nowrap
              "
            >
              {loadingButton === "area" ? (
                <span className="inline-flex items-center gap-1 sm:gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="hidden sm:inline">Processando...</span>
                  <span className="sm:hidden">Aguarde...</span>
                </span>
              ) : (
                "Sobre Nós"
              )}
            </button>
          </div>

          <p className="hidden lg:block text-[10px] text-gray-100 font-medium max-w-3xl mt-1">
            Não perca tempo! Junte-se a nós e esteja com profissionais de
            tecnologia que já estão a transformar suas carreiras com nossos
            recursos exclusivos. Este site não possui parceria oficial com os
            eventos, cursos, comunidades, projectos, bolsas e entidades aqui
            divulgadas. Fornecemos informações sobre o sector tecnologia e muito
            mais na lusofonia. Para qualquer esclarecimento, entre em contacto
            connosco.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
