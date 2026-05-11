"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { AboutUsSection } from "@/components/bolsas/AboutUsSection";
import { BigTechBo } from "@/components/bolsas/BigTechBo";
import { Preview } from "@/components/bolsas/Preview";
import { RecentSection } from "@/components/bolsas/RecentSection";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { ArrowRight, Smartphone, Apple } from "lucide-react";
import { useSession } from "next-auth/react";

const App = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [dbScholarships, setDbScholarships] = useState<
    Array<{
      id: string;
      image: string;
      title: string;
      description: string;
      href: string;
      buttonLabel?: string;
    }>
  >([]);

  const handleClick = () => {
    // Auth Removed
  };

  useEffect(() => {
    fetch("/api/public/scholarships")
      .then((res) => res.json())
      .then((payload) => {
        setDbScholarships(Array.isArray(payload?.scholarships) ? payload.scholarships : []);
      })
      .catch(() => setDbScholarships([]));
  }, []);

  return (
    <>
      <Head>
        <title>Bolsas de Estudo</title>
        <meta
          name="description"
          content="Bolsas de estudo nacionais e internacionais para todas áreas de estudo para as melhores faculdades do mundo."
        />
      </Head>

      <Navbar />
      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-bolsas.webp')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center lg:items-center lg:text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-6 md:mt-12 lg:mt-14 mb-3 leading-tight max-w-lg uppercase">
            Bolsas de estudo
          </h2>

          <p className="text-gray-100 mb-2 text-xs sm:text-sm md:text-base max-w-md">
            Bolsas 100% gratuitas para você estudar nas melhores universidades
            do mundo. Aproveite essas oportunidades para impulsionar sua
            carreira acadêmica e profissional.
          </p>

          {isLoggedIn ? (
            <div className="flex gap-2 md:gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.adndeveloper"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-green-900 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-white active:scale-95 transition-transform shadow-lg w-fit border border-green-600 hover:border-green-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Smartphone size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  Android
                </span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-green-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                </span>
              </a>

              <a
                href="https://apps.apple.com/app/adn-developer/id1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-gray-800 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-white active:scale-95 transition-transform shadow-lg w-fit border border-gray-600 hover:border-gray-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Apple size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  iPhone
                </span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-gray-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                </span>
              </a>
            </div>
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
      <main className="min-h-screen bg-white overflow-hidden">
        <div className="space-y-0">
          <RecentSection dynamicItems={dbScholarships} />
          <BigTechBo />
          <AboutUsSection />
          <Preview />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default App;
