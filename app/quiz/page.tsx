"use client";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { QuizGame } from "@/components/quiz/QuizGame";

/* =======================
   PÁGINA PRINCIPAL
   ======================= 
*/

export default function CareerQuizPage() {
  return (
    <>
      <Head>
        <title>Quiz de Carreira em Tecnologia</title>
        <meta
          name="description"
          content="Responda a perguntas sobre carreira em tecnologia e descubra qual caminho seguir."
        />
      </Head>
      <Navbar />

      {/* QUIZ SECTION CONTAINER */}
      <section className="relative w-full  min-h-screen bg-zinc-950 flex flex-col justify-center overflow-hidden py-5">
        {/* Background Decorative */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url('/fundo.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto bg-zinc-900/10 backdrop-blur-xl border border-zinc-800/50 rounded p-6 md:p-12 shadow-2xl ring-1 ring-white/5">
            <QuizGame />
          </div>
        </div>
      </section>
    </>
  );
}
