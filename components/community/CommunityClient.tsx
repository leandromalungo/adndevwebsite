"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { CommunityGrid } from "@/components/community/CommunityGrid";
import { CountryFilter, type FilterTab } from "@/components/CountryFilter";
import { Loader2, ArrowRight, Smartphone } from "lucide-react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";

export default function CommunityClient() {
  const [selectedCountry, setSelectedCountry] = useState<FilterTab>("Angola");
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = !!session;
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`${pathname}?auth=register`);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO / CTA */}
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-community.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl mt-3 md:text-4xl font-bold text-white mb-3 leading-tight">
              As melhores comunidades da area da tecnologia da lusofonia num só lugar!
            </h2>

            <p className="text-gray-100 mb-3 text-sm md:text-base">
              Junta-te a milhares de entusiastas, desenvolvedores e criativos
              que partilham conhecimento, colaboram em projetos e impulsionam a
              inovação. Escolha a sua comunidade e comece a explorar hoje mesmo!
            </p>

            <button
              type="button"
              onClick={isLoggedIn ? () => setShowAppComingSoon(true) : handleClick}
              className={`inline-flex items-center gap-2 px-3 py-3 mb-4 font-semibold transition-all active:scale-95 rounded-xl ${isLoggedIn ? 'bg-neutral-950 hover:bg-neutral-800 text-neutral-50 border border-violet-700' : 'bg-violet-400 hover:bg-violet-500 text-white'}`}
            >
              {isLoggedIn ? (
                <>
                  <Smartphone size={20} />
                  Baixar o aplicativo
                </>
              ) : (
                <>
                  Inscrever-se no portal
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO COMUNIDADES */}
      <div className="min-h-screen bg-[#f9fafb]">
        <header className="bg-white border-b border-gray-200 py-6 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900">Comunidades</h1>
            <p className="text-gray-500 text-sm mt-1">
              Descubra grupos e comunidades de tecnologia na lusofonia e
              participe.
            </p>
          </div>
        </header>

        {/* FILTRO POR PAÍS */}
        <CountryFilter
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          className="bg-white border-b border-gray-200"
        />

        <main className="max-w-7xl mx-auto px-4">
          <CommunityGrid selectedCountry={selectedCountry} />
        </main>

        <Footer />
      </div>
      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
}
