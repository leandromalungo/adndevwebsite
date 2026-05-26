"use client";

import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { UniCard } from "@/components/bolsas/UniCard";
import { RecentSection } from "@/components/bolsas/RecentSection";
import BolsasAdvancedFilters from "@/components/bolsas/BolsasAdvancedFilters";
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

  /**
   * LIMPAR FILTROS
   */
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedMonth("");
    setSelectedDateType("");
  };

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
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-20 flex flex-col justify-center lg:items-center lg:text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-6 md:mt-12 lg:mt-14 mb-3 leading-tight max-w-lg uppercase">
            Bolsas de estudo
          </h2>

          <p className="text-gray-100 mb-2 max-w-md">
            Aproveite essas oportunidades para impulsionar sua
            carreira acadêmica e profissional. Explore as bolsas de estudo, 
            Programas de Intercambio e mais. Desde os mais recentes e populares disponíveis para ti.
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

      <main className="min-h-screen bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Grid de Bolsas */}
        <RecentSection dynamicItems={filteredScholarships} />
        </div>
        <UniCard />
        <Footer />
      </main>
      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
};

export default App;
