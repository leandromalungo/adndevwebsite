"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from "@/components/community/CommunityGrid";
import { CountryFilter, LUSOPHONE_COUNTRIES, type FilterTab } from "@/components/CountryFilter";
import { ArrowRight, Search, Smartphone } from "lucide-react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";
import type { Community } from "@/data/types";
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbCommunities, setDbCommunities] = useState<Community[]>([]);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);
  useEffect(() => {
    fetch("/api/public/communities", { cache: "no-store" })
      .then((res) => res.json())
      .then((payload) => {
        setDbCommunities(Array.isArray(payload?.communities) ? payload.communities : []);
      })
      .catch(() => setDbCommunities([]));
  }, []);


  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`${pathname}?auth=register`);
    }
  };

  return (
    <>
      <Head>
        <title>Comunidades de Tecnologia na Lusofonia</title>
        <meta
          name="description"
          content="Descubra as melhores comunidades de tecnologia, programação e inovação na lusofonia."
        />
      </Head>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
<section className="relative overflow-hidden bg-zinc-950">
  {/* FUNDO COM IMAGEM */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('/images-community.jpg')` }}
  >
    {/* OVERLAY INTELIGENTE: Escurece uniformemente no mobile e faz gradiente no desktop */}
    <div className="absolute inset-0 bg-zinc-950/75 sm:bg-gradient-to-r sm:from-zinc-950 sm:via-zinc-950/80 sm:to-transparent" />
  </div>

  {/* CONTEÚDO CENTRALIZADO EM TODAS AS TELAS */}
  <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-12 lg:px-16 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center text-center">
    
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-4 sm:mt-6 mb-3 tracking-tight uppercase max-w-xl">
      Comunidades Tech
    </h2>

    <p className="text-zinc-200 mb-6 sm:mb-8 text-sm sm:text-base max-w-md leading-relaxed">
      Junta-te a milhares de entusiastas, desenvolvedores e criativos
      que partilham conhecimento, colaboram em projetos e impulsionam a
      inovação. Escolha a sua comunidade e comece a explorar hoje mesmo!
    </p>

    {isLoggedIn ? (
      <button
        type="button"
        onClick={() => setShowAppComingSoon(true)}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
      >
        <span className="relative z-10 flex items-center gap-2 font-medium">
          <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
          Baixar o aplicativo
        </span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
        </span>
      </button>
    ) : (
      <button
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
      >
        <span className="relative z-10 flex items-center gap-2 font-medium">
          Inscrever-se no portal
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </span>
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-violet-600 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
        </span>
      </button>
    )}
  </div>
</section>

      {/* SEÇÃO COMUNIDADES */}
      <div className="min-h-screen bg-[#f9fafb]">
        
        <header className="bg-white border-b border-gray-200 py-6 sm:py-8">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">

            {/* BLOCO UNIFICADO: Mudei para gap-1 para ficarem bem colados */}
            <div className="w-full max-w-2xl mx-auto px-2 sm:px-0 flex flex-col gap-1">

              {/* BARRA DE PESQUISA DESTACADA */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquisar por nome da comunidade, assunto ou tecnologia (ex: React, AWS, Data Science)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 text-gray-900 bg-gray-50 focus:bg-white transition-all shadow-sm placeholder-gray-400"
                />
                <Search className="absolute left-3.5 sm:left-4 top-3 sm:top-4 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* FILTROS (Agora coladinho no input de cima) */}
              <div className="w-full flex justify-center">
                <CountryFilter
                  selectedCountry={selectedCountry}
                  onCountryChange={setSelectedCountry}
                  countries={LUSOPHONE_COUNTRIES.filter((country) => country !== "Todos")}
                  className="bg-white border-gray-200 w-full"
                />
              </div>

            </div>

          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-2">
          <CommunityGrid
            selectedCountry={selectedCountry}
            searchQuery={searchQuery}
            extraCommunities={dbCommunities}
          />
        </main>

        <Footer />
      </div>
      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
}
