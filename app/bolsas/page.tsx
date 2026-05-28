"use client";

import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { UniCard } from "@/components/bolsas/UniCard";
import { RecentSection } from "@/components/bolsas/RecentSection";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Smartphone } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";

/**
 * Função para determinar se uma bolsa expirou ou está ativa
 * Compara a data de deadline com a data atual
 */
function isScholarshipExpired(deadline: string | null | undefined): boolean {
  if (!deadline) return false;
  try {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  } catch {
    return false;
  }
}

interface ScholarshipData {
  id: string;
  image: string;
  title: string;
  description: string;
  href: string;
  buttonLabel?: string;
  category?: string;
  country?: string;
  state?: string;
  deadline?: string;
}

const App = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);
  const [dbScholarships, setDbScholarships] = useState<ScholarshipData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDateType, setSelectedDateType] = useState<"" | "passados" | "atuais">("");

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`${pathname}?auth=register`);
    }
  };

  useEffect(() => {
    fetch("/api/public/scholarships")
      .then((res) => res.json())
      .then((payload) => {
        const scholarships = Array.isArray(payload?.scholarships) ? payload.scholarships : [];
        setDbScholarships(scholarships);
      })
      .catch(() => setDbScholarships([]));
  }, []);

  /**
   * EXTRAIR CATEGORIAS ÚNICAS
   */
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    dbScholarships.forEach(scholarship => {
      if (scholarship.category) {
        categories.add(scholarship.category);
      }
    });
    return Array.from(categories).sort();
  }, [dbScholarships]);

  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    dbScholarships.forEach((scholarship) => {
      if (scholarship.country) {
        countries.add(scholarship.country);
      }
    });
    return Array.from(countries).sort();
  }, [dbScholarships]);

  const availableStates = useMemo(() => {
    const states = new Set<string>();
    dbScholarships.forEach((scholarship) => {
      if (scholarship.state) {
        states.add(scholarship.state);
      }
    });
    return Array.from(states).sort();
  }, [dbScholarships]);

  /**
   * FILTRAGEM DE BOLSAS
   * Implementa lógica de filtro por:
   * - Categoria
   * - País
   * - Estado/Província
   * - Mês
   * - Data (passados/atuais)
   */
  const filteredScholarships = useMemo(() => {
    return dbScholarships.filter((scholarship) => {
      // Filtro por categoria
      const matchesCategory =
        selectedCategory === "" || scholarship.category === selectedCategory;

      // Filtro por país
      const matchesCountry =
        selectedCountry === "" || scholarship.country === selectedCountry;

      // Filtro por estado
      const matchesState =
        selectedState === "" || scholarship.state === selectedState;

      // Filtro por mês (baseado na data de deadline)
      const matchesMonth = selectedMonth === "" ||
        (scholarship.deadline && new Date(scholarship.deadline).toLocaleString('en-US', { month: 'short' }) === selectedMonth);

      // Filtro por data (passados/atuais)
      const scholarshipIsExpired = isScholarshipExpired(scholarship.deadline);
      const matchesDateType =
        selectedDateType === "" ||
        (selectedDateType === "passados" && scholarshipIsExpired) ||
        (selectedDateType === "atuais" && !scholarshipIsExpired);

      return (
        matchesCategory &&
        matchesCountry &&
        matchesState &&
        matchesMonth &&
        matchesDateType
      );
    });
  }, [dbScholarships, selectedCategory, selectedCountry, selectedState, selectedMonth, selectedDateType]);

  return (
    <>
      <Head>
        <title>OPORTUNIDADES E BOLSAS</title>
        <meta
          name="description"
          content="Escolha uma das oportunidades de bolsa de estudo disponíveis e impulsione sua carreira acadêmica e profissional. 
          Explore as bolsas de estudo, programas de intercâmbio e mais, desde os mais recentes e populares disponíveis para ti."
        />
      </Head>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative overflow-hidden bg-zinc-950">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-bolsas.webp')` }}
        >
          {/* OVERLAY INTELIGENTE: Escurece uniformemente no mobile e faz gradiente no desktop */}
          <div className="absolute inset-0 bg-zinc-950/75 sm:bg-gradient-to-r sm:from-zinc-950 sm:via-zinc-950/80 sm:to-transparent" />
        </div>

        {/* CONTEÚDO CENTRALIZADO EM TODAS AS TELAS */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-12 lg:px-16 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-4 sm:mt-6 mb-3 tracking-tight uppercase max-w-xl">
          CARREIRAS E OPORTUNIDADES  
          </h2>

          <p className="text-zinc-200 mb-6 sm:mb-8 text-sm sm:text-base max-w-xl leading-relaxed">
            Aproveite essas oportunidades para impulsionar sua carreira acadêmica e profissional.
            Explore as bolsas de estudo, programas de intercâmbio e mais, desde os mais recentes
            e populares disponíveis para ti.
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

      {/* Grid de Bolsas */}
      <div className="w-full mx-auto py-6">
        <RecentSection dynamicItems={filteredScholarships} />
      </div>

      <div className="min-h-screen bg-[#fcfcfc]">
        <UniCard />
        <Footer />
      </div>

      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
};

export default App;
