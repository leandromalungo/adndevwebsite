/**
 * PÁGINA ROADMAPS - ROTEIROS DE APRENDIZADO
 * ==========================================
 *
 * Página que apresenta roteiros de aprendizado por especialidade.
 *
 * Especializações disponíveis:
 * - Frontend Development
 * - Backend Development
 * - DevOps e Infrastructure
 * - Mobile Development
 * - AI/Machine Learning
 * - Full Stack
 *
 * Cada roadmap contém:
 * - Descrição da área
 * - Projetos organizados por nível (Junior, Mid, Senior)
 * - Tecnologias recomendadas
 * - Recursos de aprendizado
 */

"use client"; // obrigatório no topo

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ROLE_ROADMAPS,
  SKILL_ROADMAPS,
  BEST_PRACTICES,
} from "@/components/roadmaps/constants";
import { RoadMapCard } from "@/components/roadmaps/RoadMapCard";
import { RoadmapDetailView } from "@/components/roadmaps/HeaderroadMap";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { RoadmapItem } from "@/data/types";
import { Loader2, ArrowRight } from "lucide-react"; // import correto dos ícones

const Page = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapItem | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => router.push("/assinatura"), 1000);
  };

  if (selectedRoadmap) {
    return (
      <RoadmapDetailView
        title={selectedRoadmap.title}
        onBack={() => setSelectedRoadmap(null)}
      />
    );
  }

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
              Faça cursos introdutorios gratuitos e descubra o roadmap ideal para
              você. E acesse o roadmap correspondente às suas habilidades e
              objetivos profissionais.
            </p>

            <div className="flex flex-nowrap gap-2 sm:gap-4">
              <button
                onClick={handleClick}
                disabled={loading}
                className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all active:scale-95 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                    : "bg-blue-400 hover:bg-blue-500 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin sm:size-auto" />
                    <span className="hidden sm:inline">Processando...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Assinar agora!</span>
                    <span className="sm:hidden">Assinar</span>
                    <ArrowRight size={18} className="sm:size-auto" />
                  </>
                )}
              </button>

              <button
                onClick={handleClick}
                disabled={loading}
                className={`inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all active:scale-95 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
                  loading
                    ? "cursor-not-allowed text-zinc-800"
                    : "border border-blue-400 hover:bg-blue-500 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin sm:size-auto" />
                    <span className="hidden sm:inline">Processando...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Criar um plano de estudo</span>
                    <span className="sm:hidden">Plano</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-slate-50 text-slate-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Role-based Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="text-center space-y-3 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Acesse agora os Roadmaps
                </h1>
                <p className="text-slate-500 text-lg">
                  Explore nossos roadmaps detalhados para guiar sua jornada de
                  aprendizado e crescimento profissional, seja você um iniciante
                  ou um profissional experiente.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLE_ROADMAPS.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadMapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Skill-based Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Ferramentas e tecnologias de desenvolvimento
                </h2>
                <p className="text-slate-500 text-lg">
                  Domine as principais ferramentas e tecnologias essenciais para
                  desenvolvedores modernos, aprimorando suas habilidades
                  técnicas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILL_ROADMAPS.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadMapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Best Practices Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Melhores práticas de desenvolvimento
                </h2>
                <p className="text-slate-500 text-lg">
                  Aprenda as melhores práticas de desenvolvimento para escrever
                  código limpo, eficiente e sustentável, garantindo a qualidade
                  dos seus projetos, independentemente da linguagem ou framework
                  utilizado.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BEST_PRACTICES.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadMapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
