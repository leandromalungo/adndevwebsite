"use client"; // obrigatório no topo

import { useState } from "react";
import { ROLE_ROADMAPS, SKILL_ROADMAPS, PROJECT_IDEAS, BEST_PRACTICES } from "@/components/roadmaps/constants";
import { RoadmapCard } from "@/components/roadmaps/RoadmapCard";
import { RoadmapDetailView } from "@/components/roadmaps/RoadmapDetailView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RoadmapItem } from "@/data/types";
import { Loader2, ArrowRight } from "lucide-react"; // import correto dos ícones

const Page = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Exemplo de ação ao clicar (pode trocar conforme necessidade)
    setTimeout(() => {
      setLoading(false);
      alert("Ação executada!");
    }, 2000);
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

      <section className="relative w-full overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/fundo_1.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        <div className="relative flex items-center px-8 py-20 md:px-12 md:py-24">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Explore Roadmaps to Advance Your Tech Career
            </h2>

            <p className="text-gray-100 mb-6">
              Discover structured paths to master skills, build projects, and excel in your tech journey.
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all
                ${loading
                  ? "bg-orange-300 cursor-not-allowed text-zinc-800"
                  : "bg-orange-400 hover:bg-orange-500 text-white"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Acessar agora!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-slate-50 text-slate-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Role-based Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  Role-based Roadmaps
                </span>
              </div>
              <div className="text-center space-y-3 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Career Paths
                </h1>
                <p className="text-slate-500 text-lg">
                  Step-by-step guides for different engineering roles in the industry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLE_ROADMAPS.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadmapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Skill-based Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  Skill-based Roadmaps
                </span>
              </div>
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Technology Skills
                </h2>
                <p className="text-slate-500 text-lg">
                  Deep-dive guides for specific tools, languages, and technologies.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKILL_ROADMAPS.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadmapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Project Ideas Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  Project Ideas
                </span>
              </div>
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Project Paths
                </h2>
                <p className="text-slate-500 text-lg">
                  Comprehensive project ideas to help you build and showcase your portfolio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECT_IDEAS.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadmapCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Best Practices Section */}
          <section>
            <div className="flex flex-col items-center mb-12">
              <div className="inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
                <span className="text-sm font-semibold text-slate-500">
                  Best Practices
                </span>
              </div>
              <div className="text-center space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Engineering Standards
                </h2>
                <p className="text-slate-500 text-lg">
                  Industry-standard practices for high-performance and secure software.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BEST_PRACTICES.map((item) => (
                <div key={item.id} onClick={() => setSelectedRoadmap(item)}>
                  <RoadmapCard item={item} />
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
