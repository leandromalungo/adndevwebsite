"use client";

/**
 * PÁGINA DE EVENTOS
 * ==================
 *
 * Página que exibe eventos técnicos com sistema avançado de filtros.
 *
 * Funcionalidades:
 * - Listagem de eventos
 * - Filtro por busca (título/descrição)
 * - Filtro por localização (país, estado, cidade)
 * - Filtro por categoria do evento
 * - Filtro por eventos online
 * - Loading states
 */

import { useState, useMemo, useEffect } from "react";
import { Loader2, ArrowRight, Smartphone } from "lucide-react";
import Head from "next/head";
import { AppComingSoonModal } from "@/components/AppComingSoonModal";
import { FilterSection } from "@/components/events/AdvancedFilters";
import { usePathname, useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { MOCK_EVENTS } from "@/components/events/constants";
import type { Event } from "@/data/types";
import { useSession } from "next-auth/react";
import { LUSOPHONE_LOCATIONS, EVENT_CATEGORIES, getStatesByCountry } from "@/data/locationsData";

/**
 * Função para determinar se um evento é passado ou futuro
 * Compara a data do evento com a data atual
 */
function isEventPast(eventDate: string): boolean {
  try {
    const eventDateObj = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDateObj.setHours(0, 0, 0, 0);
    return eventDateObj < today;
  } catch {
    return false;
  }
}

/**
 * Constantes de filtro
 */
const COUNTRIES = LUSOPHONE_LOCATIONS.map(l => l.country);

// Mapeamento de mês em português para abreviação em inglês
const MONTH_MAP: Record<string, string> = {
  'Janeiro': 'Jan',
  'Fevereiro': 'Feb',
  'Março': 'Mar',
  'Abril': 'Apr',
  'Maio': 'May',
  'Junho': 'Jun',
  'Julho': 'Jul',
  'Agosto': 'Aug',
  'Setembro': 'Sep',
  'Outubro': 'Oct',
  'Novembro': 'Nov',
  'Dezembro': 'Dec'
};

const MONTH_OPTIONS = Object.keys(MONTH_MAP);

const Page = () => {

  /**
   * ESTADOS DA PÁGINA
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDateType, setSelectedDateType] = useState<"" | "passados" | "atuais">("");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbEvents, setDbEvents] = useState<Event[]>([]);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [showAppComingSoon, setShowAppComingSoon] = useState(false);
  useEffect(() => {
    fetch("/api/public/events", { cache: "no-store" })
      .then((res) => res.json())
      .then((payload) => {
        setDbEvents(Array.isArray(payload?.events) ? payload.events : []);
      })
      .catch(() => {
        setDbEvents([]);
      });
  }, []);

  const allEvents = useMemo(() => [...dbEvents, ...MOCK_EVENTS], [dbEvents]);

  /**
   * Estados disponíveis baseado no país selecionado
   */
  const availableStates = useMemo(() => {
    return selectedCountry ? getStatesByCountry(selectedCountry) : [];
  }, [selectedCountry]);


  /**
   * MANIPULADOR DE CLIQUE
   */
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push(`${pathname}?auth=register`);
    }
  };

  /**
   * FILTRAGEM DE EVENTOS
   * Implementa lógica de filtro por:
   * - Busca (título/descrição)
   * - País
   * - Estado/Província
   * - Categoria
   * - Tipo (online/presencial)
   * - Data (passados/atuais)
   */
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Filtro por tipo de evento (selecionado via checklist)
      const selectedEventTypes = searchQuery ? searchQuery.split(',').filter(t => t.trim()) : [];
      const matchesSearch =
        selectedEventTypes.length === 0 ||
        (event.category && selectedEventTypes.includes(event.category)) ||
        (event.tags?.some((tag) => selectedEventTypes.includes(tag)) ?? false);

      // Filtro por país
      const matchesCountry =
        selectedCountry === "" || event.country === selectedCountry;

      // Filtro por estado/província
      const matchesState =
        selectedState === "" || event.state === selectedState;

      // Filtro por mês (converter português para abreviação em inglês)
      const monthAbbr = selectedMonth ? MONTH_MAP[selectedMonth] : "";
      const matchesMonth =
        selectedMonth === "" || event.month === monthAbbr;

      // Filtro por tipo (online)
      const matchesOnline = !isOnline || event.isOnline === true;

      // Filtro por data (passados/atuais)
      const eventIsPast = isEventPast(event.date);
      const matchesDateType =
        selectedDateType === "" ||
        (selectedDateType === "passados" && eventIsPast) ||
        (selectedDateType === "atuais" && !eventIsPast);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesState &&
        matchesMonth &&
        matchesOnline &&
        matchesDateType
      );
    });
  }, [allEvents, searchQuery, selectedCountry, selectedState, selectedCategories, selectedMonth, isOnline, selectedDateType]);

  /**
   * LIMPAR FILTROS
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedMonth("");
    setSelectedDateType("");
    setIsOnline(false);
  };

  return (
    <>

      <Head>
        <title>Eventos de Tecnologia na Lusofonia</title>
        <meta
          name="description"
          content="Descubra os melhores eventos de tecnologia na lusofonia, desde conferências até workshops e meetups."
        />
      </Head>
      <Navbar />

      {/* SEÇÃO COM FUNDO E CTA */}
      <section className="relative overflow-hidden bg-zinc-950">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-events.webp')` }}
        >
          {/* OVERLAY INTELIGENTE: Escurece o mobile por igual e vira gradiente no desktop */}
          <div className="absolute inset-0 bg-zinc-950/75 sm:bg-gradient-to-r sm:from-zinc-950 sm:via-zinc-950/80 sm:to-transparent" />
        </div>

        {/* CONTEÚDO CENTRALIZADO EM TODAS AS TELAS */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-12 lg:px-16 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-4 sm:mt-6 mb-3 tracking-tight uppercase max-w-xl">
            Eventos Tech
          </h2>

          <p className="text-zinc-200 mb-6 sm:mb-8 text-sm sm:text-base max-w-md leading-relaxed">
            Descubra os melhores e imperdíveis eventos mais próximos de ti,
            conecte-se com profissionais e impulsione sua carreira tech.
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

      {/* LISTAGEM DE EVENTOS */}
      <div className="min-h-screen bg-[#fcfcfc]">
        <main className="max-w-7xl mx-auto p-4 py-10">
          {/* Filtros Avançados */}
          <FilterSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDateType={selectedDateType}
            setSelectedDateType={setSelectedDateType}
            countries={COUNTRIES}
            states={availableStates}
            EVENT_CATEGORIES={EVENT_CATEGORIES}
            MONTH_OPTIONS={MONTH_OPTIONS}
          />

          {/* Botão para limpar filtros */}
          {(searchQuery ||
            selectedCountry ||
            selectedState ||
            selectedCategories.length > 0 ||
            selectedMonth ||
            selectedDateType ||
            isOnline) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}

            {filteredEvents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum evento encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-[#004d79] text-white rounded hover:bg-[#003d5f] transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
      <AppComingSoonModal open={showAppComingSoon} onClose={() => setShowAppComingSoon(false)} />
    </>
  );
};

export default Page;
