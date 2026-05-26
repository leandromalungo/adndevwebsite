"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
  }, [error]);

  return (
    < main className="fixed inset-0 w-screen h-screen flex flex-row bg-gray-50 overflow-hidden z-50" >
      {/* LADO ESQUERDO */}
      <section className="hidden lg:block relative w-1/2 h-full select-none">
        <img
          src="/error.jpg"
          alt="error"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* OVERLAY EM DEGRADÊ: Começa escuro embaixo para dar leitura ao texto e fica 100% transparente no topo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent z-10" />

        {/* CONTEÚDO (Textos por cima do overlay) */}
        <div className="absolute inset-0 flex flex-col justify-end h-full p-16 z-20">
          <div className="max-w-xl">
            <h1 className="text-6xl font-bold text-white leading-tight">
              Erro 500,
            </h1>

            <p className="text-lg text-gray-200 mt-5 leading-relaxed">
              Ocorreu um erro inesperado na aplicação, clique no botão para tentar novamente ou volte para a página inicial.
            </p>
          </div>
        </div>
      </section>

      {/* LADO DIREITO (Centraliza o conteúdo e se adapta fluidamente)  */}

      <section className="w-full lg:w-1/2 min-h-screen lg:h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-md w-full p-4 sm:p-8 text-center flex flex-col items-center justify-center">

          {/* Logo / Ícone da Empresa */}
          <div className="flex justify-center mb-6 sm:mb-8 transition-transform hover:scale-105">
            <img
              src="/logoNavbar.png"
              alt="Logo Adn Developer"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Título Corrigido: Menor no mobile, encorpado no desktop */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 dark:text-red-500 mb-3 tracking-tight">
            Ops! Algo correu mal.
          </h2>

          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 mb-8 leading-relaxed max-w-sm">
            Ocorreu um erro inesperado na aplicação.
          </p>

          {/* Botões: Empilham no mobile (col) e ficam lado a lado a partir de telas 'sm' */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={() => reset()}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <RefreshCcw className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Tentar Novamente</span>
            </button>

            <a
              href="/"
              className="w-full py-3 px-4 text-gray-700 dark:text-zinc-300 border-2 border-violet-600 rounded-lg font-semibold text-sm sm:text-base hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="whitespace-nowrap text-violet-700 hover:text-white">Voltar ao Início</span>
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
