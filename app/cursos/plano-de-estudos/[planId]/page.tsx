"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Layers,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { STUDY_PLANS, StudyPlan } from "@/data/study-plans";

export default function StudyPlanDetailsPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  // Unwrap params using React.use() - Next.js 15 pattern for async params
  const resolvedParams = use(params);
  const [plan, setPlan] = useState<StudyPlan | null>(null);

  useEffect(() => {
    const foundPlan = STUDY_PLANS.find((p) => p.id === resolvedParams.planId);
    if (foundPlan) setPlan(foundPlan);
  }, [resolvedParams.planId]);

  if (!plan && typeof window !== "undefined") {
    const exists = STUDY_PLANS.some((p) => p.id === resolvedParams.planId);
    if (!exists) return notFound();
  }

  if (!plan)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Carregando...
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen text-zinc-900 pb-20">
        {/* HEADER COM FUNDO + OVERLAY */}
        <div className="relative w-full h-[50vh] overflow-hidden">
          {/* Imagem de fundo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/fundo_1.jpg')` }}
          />

          {/* Overlay / Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent z-10" />

          {/* Conteúdo do Header */}
          <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 flex flex-col justify-center h-full">
            <Link href="/cursos/plano-de-estudos">
              <Button
                variant="ghost"
                className="mb-6 text-zinc-100 hover:text-white pl-0 hover:bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar 
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="p-4 rounded bg-zinc-800 text-blue-400 shadow-xl shadow-blue-900/10">
                <plan.icon className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {plan.role}
                </h1>
                <p className="text-lg md:text-xl text-zinc-100 max-w-3xl leading-relaxed">
                  {plan.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 space-y-12">
          {/* Overview Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="shadow h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-violet-500">
                  <Briefcase className="w-6 h-6" />
                  Responsabilidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-950"
                    >
                      <CheckCircle2 className="w-5 h-5 text-violet-500/50 mt-0.5 shrink-0" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-amber-400">
                  <BookOpen className="w-6 h-6" />
                  Pré-requisitos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                    Conhecimentos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.prerequisites.knowledge.map((k, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700 px-3 py-1 text-sm"
                      >
                        {k}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                    Soft Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.prerequisites.softSkills.map((s, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-zinc-400 border-zinc-700 px-3 py-1 text-sm"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Roadmap Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
                Jornada de aprendizado (RoadMap)
              </h2>
            </div>

            <Tabs defaultValue="beginner" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-200 border-zinc-800 h-auto p-1 rounded-xl">
                <TabsTrigger
                  value="beginner"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white py-3 md:py-4 text-sm md:text-lg font-medium transition-all"
                >
                  Junior
                </TabsTrigger>
                <TabsTrigger
                  value="intermediate"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white py-3 md:py-4 text-sm md:text-lg font-medium transition-all"
                >
                  Pleno
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white py-3 md:py-4 text-sm md:text-lg font-medium transition-all"
                >
                  Senior
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 md:mt-8">
                <TabsContent value="beginner" className="focus-visible:ring-0">
                  <StageCard
                    stage={plan.stages.beginner}
                    colorClass="border-violet-500/20 shadow"
                    iconColor="text-violet-500"
                  />
                </TabsContent>

                <TabsContent
                  value="intermediate"
                  className="focus-visible:ring-0"
                >
                  <StageCard
                    stage={plan.stages.intermediate}
                    colorClass="border-blue-500/20 bg-blue-500/5"
                    iconColor="text-blue-500"
                  />
                </TabsContent>

                <TabsContent value="advanced" className="focus-visible:ring-0">
                  <StageCard
                    stage={plan.stages.advanced}
                    colorClass="border-violet-500/20 bg-violet-500/5"
                    iconColor="text-violet-500"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </section>

          {/* Tools Section */}
          <section className="rounded-xl bg-gray-100 border shadow p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-8 h-8 text-violet-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Ferramentas do Profissional
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <ToolColumn
                title="Linguagens Principais"
                items={plan.tools.languages}
              />
              <ToolColumn
                title="Frameworks & Libs"
                items={plan.tools.frameworks}
              />
              <ToolColumn
                title="Ferramentas Essenciais"
                items={plan.tools.tools}
              />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

function StageCard({
  stage,
  colorClass,
  iconColor,
}: {
  stage: any;
  colorClass: string;
  iconColor: string;
}) {
  return (
    <Card className={`${colorClass} border-2 overflow-hidden bg-gray-50`}>
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl md:text-3xl mb-2">{stage.title}</CardTitle>
        <CardDescription className="text-base md:text-lg">
          {stage.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="grid gap-4 md:grid-cols-2">
          {stage.items.map((item: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded border border-zinc-800/40 hover:bg-gray-100 transition-colors"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border bg-blue-200 font-bold ${iconColor}`}
              >
                {i + 1}
              </span>
              <span className="text-base md:text-lg text-zinc-950 mt-0.5">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ToolColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-widest pb-2">
        {title}
      </h4>
      <ul className="space-y-3">
        {items.map((t, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-gray-800 text-lg group"
          >
            <div className="w-1.5 h-1.5 rounded group-hover:bg-pink-400 transition-colors" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
