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
            <h1 className="text-5xl font-bold text-white leading-tight">
              Erro
            </h1>

            <p className="text-lg text-gray-200 mt-5 leading-relaxed">
              Ocorreu um erro inesperado na aplicação, clique no botão para tentar novamente ou volte para a página inicial.
            </p>
          </div>
        </div>
      </section>

      {/* LADO DIREITO (Centraliza o conteúdo e herda o fundo do main) */}
      <section className="w-full lg:w-1/2 h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12 lg:px-16">
        <div className="max-w-md w-full p-8 text-center">

          {/* Logo / Ícone da Empresa */}
          <div className="flex justify-center mb-8">
            <img
              src="/logoNavbar.png" // Substitua pelo caminho correto do seu logo (ex: /logo.png)
              alt="Logo Adn Developer"
              className="h-14 w-auto object-contain" // Controla a altura de forma proporcional
            />
          </div>

          <h2 className="text-2xl font-black text-red-600 mb-2">Ops! algo correu mal.</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Ocorreu um erro inesperado na aplicação.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => reset()}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCcw className="w-4 h-4" />
              Tentar Novamente
            </button>

            <a
              href="/"
              className="w-full py-3 text-gray-700 border border-violet-600 rounded-lg font-bold hover:text-violet-600 transition flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Voltar ao Início
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
