"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, Search, ArrowRight, Loader2 } from "lucide-react";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { STUDY_PLANS } from "@/data/study-plans";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StudyPlanSelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredPlans = STUDY_PLANS.filter((plan) =>
    plan.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const router = useRouter();

  const handleClick = () => {
    triggerGoogleSignup();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gry-100 text-zinc-950 pb-20">
        {/* HEADER RESPONSIVO */}
        <div className="relative w-full min-h-[60vh] sm:h-[60vh] overflow-hidden bg-zinc-900">
          {/* Imagem */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/api/images/cursos')` }}
          />

          {/* Overlay melhorado */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-black/40 z-10" />

          {/* Conteúdo */}
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col justify-center min-h-[60vh]">
            {/* Voltar */}
            <Link href="/cursos">
              <Button
                variant="ghost"
                className="mb-4 sm:mb-6 text-zinc-200 hover:text-white pl-0 hover:bg-transparent"
              >
                <MoveLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>

            {/* Título Responsivo */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 to-violet-600 bg-clip-text text-transparent mb-4 leading-tight">
              Escolha sua Carreira Tech
            </h1>

            {/* Descrição */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-100 max-w-2xl mb-6">
              Selecione uma trilha para ver o roadmap completo, desde os
              fundamentos até a especialização avançada.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={handleClick}
                disabled={googleLoading}
                className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 sm:px-6 py-3 font-semibold transition-all active:scale-95 rounded hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${googleLoading
                    ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
              >
                {googleLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Subscreva ao portal
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <Link href="/projectos" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold transition-all active:scale-95 rounded border border-blue-400 hover:bg-blue-500 text-white">
                  Projectos de estudo
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* SEARCH & GRID */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          {/* Search Bar */}
          <div className="relative mb-10 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <Input
              placeholder="Buscar carreira (ex: Frontend, DevOps...)"
              className="pl-10 bg-gray-100 border-blue-100 focus:ring-blue-500/50 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid de planos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <Link
                href={`/cursos/plano-de-estudos/${plan.id}`}
                key={plan.id}
                className="group"
              >
                <Card className="h-full bg-gray-100/20 hover:border-blue-200 transition-all cursor-pointer shadow">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <div className="p-3 rounded bg-gray-200 group-hover:text-violet-600 transition-colors">
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-bold">
                      {plan.role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 text-zinc-600">
                      {plan.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {filteredPlans.length === 0 && (
              <div className="col-span-full text-center py-20 text-zinc-500">
                <p className="text-lg">
                  Nenhuma carreira encontrada para "{searchTerm}".
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
    </>
  );
}
