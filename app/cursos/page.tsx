"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowRight } from "lucide-react";

const Page = () => {
  const [loadingAssinar, setLoadingAssinar] = useState(false);
  const [loadingPlano, setLoadingPlano] = useState(false);

  const router = useRouter();

  const handleClickAssinar = () => {
    setLoadingAssinar(true);
    setTimeout(() => router.push("/assinatura"), 1000);
  };

  const handleClickPlano = () => {
    setLoadingPlano(true);
    setTimeout(() => router.push("/assinatura"), 1000);
  };

  return (
    <>
      <Navbar />

      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/fundo_1.jpg')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-6 mb-3 leading-tight">
              Descubra seu Roadmap Ideal e impulsione sua carreira.
            </h2>

            <p className="text-gray-100 mb-5 text-sm md:text-base">
              Faça cursos introdutorios gratuitos e descubra o roadmap ideal
              para você. E acesse o roadmap correspondente às suas habilidades e
              objetivos profissionais.
            </p>

            <div className="flex flex-nowrap gap-2 sm:gap-4">
              <button
                onClick={handleClickAssinar}
                disabled={loadingAssinar}
                className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all active:scale-95 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
                  loadingAssinar
                    ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                    : "bg-blue-400 hover:bg-blue-500 text-white"
                }`}
              >
                {loadingAssinar ? (
                  <>
                    <Loader2 size={16} className="animate-spin sm:size-auto" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    Assinar agora!
                    <ArrowRight size={18} className="sm:size-auto" />
                  </>
                )}
              </button>

              <button
                onClick={handleClickPlano}
                disabled={loadingPlano}
                className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all active:scale-95 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
                  loadingPlano
                    ? "cursor-not-allowed text-zinc-800"
                    : "border border-blue-400 hover:bg-blue-500 text-white"
                }`}
              >
                {loadingPlano ? (
                  <>
                    <Loader2 size={16} className="animate-spin sm:size-auto" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>Criar um plano de estudo</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;
