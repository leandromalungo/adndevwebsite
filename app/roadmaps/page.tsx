"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MoveLeft, Search, ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";
import { Input } from "@/components/ui/input";
import { STUDY_PLANS } from "@/data/study-plans";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";



export default function StudyPlanSelectionPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);

  const filteredPlans = STUDY_PLANS.filter((plan) =>
    plan.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`${pathname}?auth=register`);
    }
  };

  return (
    <>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-cursos.webp')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center lg:items-center lg:text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-8 md:mt-12 lg:mt-14 mb-3 leading-tight max-w-lg uppercase">
            Carreira Tech
          </h2>

          <p className="text-gray-100 mb-2 md:mb-5 text-xs sm:text-sm md:text-base max-w-md">
           Selecione uma trilha para ver o roadmap completo, desde os
          fundamentos até a especialização avançada. 
          </p>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setShowAppComingSoon(true)}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Smartphone size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                Baixar o aplicativo
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2">
                Inscrever-se no portal
                <ArrowRight size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </button>
          )}
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 text-zinc-950 pb-20">

        {/* SEARCH & GRID */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-8 sm:mt-12">
          {/* Search */}
          <div className="relative mb-6 sm:mb-10 max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Buscar carreira (ex: Frontend, DevOps...)"
              className="pl-8 sm:pl-10 bg-white border-zinc-200 focus:ring-blue-500/50 h-9 sm:h-12 text-xs sm:text-base shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPlans.map((plan) => (
              <Link
                href={`/roadmaps/plan/${plan.id}`}
                key={plan.id}
                className="group"
              >
                <div
                  className="
                      h-full bg-white rounded border border-gray-200
                      shadow-sm hover:shadow-md hover:border-violet-300
                      transition-all duration-300 cursor-pointer
                      flex flex-col overflow-hidden
                      hover:-translate-y-1
                    "
                >
                  {/* Barra colorida no topo */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-gray-400 to-violet-700" />

                  <div className="p-5 flex flex-col flex-1 gap-3">
                    {/* Ícone + Título */}
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                        <plan.icon className="w-5 h-5 text-violet-700" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-800 leading-snug">
                        {plan.role}
                      </h3>
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-500 line-clamp-3 flex-1">
                      {plan.description}
                    </p>

                    {/* Rodapé */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-gray-100 text-gray-600 border border-gray-200">
                        Ver Roadmap
                      </span>
                      <ArrowRight
                        className="w-4 h-4 text-violet-700 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filteredPlans.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                <p className="text-lg">
                  Nenhuma carreira encontrada para &quot;{searchTerm}&quot;.
                </p>
                <Button
                  variant="link"
                  className="text-blue-400 mt-2"
                  onClick={() => setSearchTerm("")}
                >
                  Limpar busca
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
}
