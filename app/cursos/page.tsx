"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Funcao } from "@/data/types";
import { JobBoard } from "@/components/cursos/JobBoard";
import { CourseSection } from "@/components/cursos/CourseSection";
import {
  Loader2,
  ArrowRight,
  Zap,
  ClipboardList,
  Lightbulb,
  Cpu,
  BarChart3,
  Box,
  PieChart,
  TrendingUp,
  Database,
  Code,
  ShieldCheck,
  Smartphone,
  Globe,
  Users,
  Terminal,
} from "lucide-react";

const Page = () => {
  const [loadingAssinar, setLoadingAssinar] = useState(false);
  const [loadingPlano, setLoadingPlano] = useState(false);

  const router = useRouter();

  const FULL_MOCK_DATA: Funcao[] = [
    {
      id: 1,
      titulo: "Cientista de dados",
      corIcone: "bg-amber-500",
      icone: <Zap className="w-6 h-6" />,
    },
    {
      id: 2,
      titulo: "Gerente de projetos de TI",
      corIcone: "bg-blue-600",
      icone: <ClipboardList className="w-6 h-6" />,
    },
    {
      id: 3,
      titulo: "Consultor de tecnologia",
      corIcone: "bg-violet-600",
      icone: <Lightbulb className="w-6 h-6" />,
    },
    {
      id: 4,
      titulo: "Engenheiro de aprendizado de máquina",
      corIcone: "bg-amber-500",
      icone: <Cpu className="w-6 h-6" />,
    },
    {
      id: 5,
      titulo: "Analista de Business Intelligence",
      corIcone: "bg-amber-500",
      icone: <BarChart3 className="w-6 h-6" />,
    },
    {
      id: 6,
      titulo: "Gerente de produtos",
      corIcone: "bg-blue-600",
      icone: <Box className="w-6 h-6" />,
    },
    {
      id: 7,
      titulo: "Analista de negócios/gerenciamento",
      corIcone: "bg-violet-600",
      icone: <PieChart className="w-6 h-6" />,
    },
    {
      id: 8,
      titulo: "Analista de dados",
      corIcone: "bg-amber-500",
      icone: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 9,
      titulo: "Desenvolvedor de Data Warehouse",
      corIcone: "bg-blue-600",
      icone: <Database className="w-6 h-6" />,
    },
    {
      id: 10,
      titulo: "Desenvolvedor Full Stack",
      corIcone: "bg-emerald-500",
      icone: <Code className="w-6 h-6" />,
    },
    {
      id: 11,
      titulo: "Especialista em Cibersegurança",
      corIcone: "bg-rose-600",
      icone: <ShieldCheck className="w-6 h-6" />,
    },
    {
      id: 12,
      titulo: "Desenvolvedor Mobile",
      corIcone: "bg-indigo-500",
      icone: <Smartphone className="w-6 h-6" />,
    },
    {
      id: 13,
      titulo: "Arquiteto de Nuvem (Cloud)",
      corIcone: "bg-sky-500",
      icone: <Globe className="w-6 h-6" />,
    },
    {
      id: 14,
      titulo: "Scrum Master",
      corIcone: "bg-teal-500",
      icone: <Users className="w-6 h-6" />,
    },
    {
      id: 15,
      titulo: "Engenheiro de DevOps",
      corIcone: "bg-slate-700",
      icone: <Terminal className="w-6 h-6" />,
    },
  ];

  const ITEMS_PER_PAGE = 6;

  const handleClickAssinar = () => {
    setLoadingAssinar(true);
    setTimeout(() => router.push("/assinatura"), 1000);
  };

  const handleClickPlano = () => {
    setLoadingPlano(true);
    setTimeout(() => router.push("/assinatura"), 1000);
  };

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleAddRole = (funcao: Funcao) => {
    alert(`Função "${funcao.titulo}" adicionada com sucesso!`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, FULL_MOCK_DATA.length),
    );
  };

  const displayedFuncoes = FULL_MOCK_DATA.slice(0, visibleCount);
  const hasMore = visibleCount < FULL_MOCK_DATA.length;

  return (
    <>
      <Head>
        <title>Cursos Gratuitos de Programação e Tecnologia</title>
        <meta
          name="description"
          content="Cursos gratuitos de programação, tecnologia e inovação para iniciantes e profissionais."
        />
      </Head>
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

      {/* Seção de Busca e Cards de Cargos */}
      <JobBoard
        funcoes={displayedFuncoes}
        onAdd={handleAddRole}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
      {/* Seção de Parceiros (Instituições, Universidades, etc) */}
      <CourseSection />

      <Footer />
    </>
  );
};

export default Page;
