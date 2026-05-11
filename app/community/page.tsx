"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from "@/components/community/CommunityGrid";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
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
    fetch("/api/public/communities")
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
      <section className="relative overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-community.jpg')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center lg:items-center lg:text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-8 md:mt-12 lg:mt-14 mb-3 leading-tight max-w-lg uppercase">
            Comunidades Tech
          </h2>

          <p className="text-gray-100 mb-2 md:mb-5 text-xs sm:text-sm md:text-base max-w-md">
            Junta-te a milhares de entusiastas, desenvolvedores e criativos
            que partilham conhecimento, colaboram em projetos e impulsionam a
            inovação. Escolha a sua comunidade e comece a explorar hoje mesmo!
          </p>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => setShowAppComingSoon(true)}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-neutral-950 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-neutral-50 active:scale-95 transition-transform shadow-lg w-fit border border-violet-700"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Smartphone size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                Baixar aplicativo
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

      {/* SEÇÃO COMUNIDADES */}
      <div className="min-h-screen bg-[#f9fafb]">
        <header className="bg-white border-b border-gray-200 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 pl-3 sm:pl-7">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 pl-0 sm:pl-3">Comunidades</h1>
            <p className="text-gray-500 text-xs sm:text-sm pl-0 sm:pl-3 mb-4 sm:mb-6">
              Descubra grupos e comunidades de tecnologia na lusofonia e
              participe.
            </p>

            {/* BARRA DE PESQUISA DESTACADA */}
            <div className="px-0 sm:px-3 mb-6 sm:mb-8 w-full max-w-3xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquisar por nome da comunidade, assunto ou tecnologia (ex: React, AWS, Data Science)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50 focus:bg-white transition-colors shadow-sm"
                />
                <Search className="absolute left-3 sm:left-4 top-2.5 sm:top-3.5 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* FILTROS */}
            <div className="pl-0 sm:pl-3">
              <CountryFilter
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                className="bg-white border-gray-200"
              />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4">
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
