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
import AdvancedFilters from "@/components/events/AdvancedFilters";
import { useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { MOCK_EVENTS } from "@/components/events/constants";
import type { Event } from "@/data/types";
import { useSession } from "next-auth/react";

const Page = () => {

  /**
   * ESTADOS DA PÁGINA
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbEvents, setDbEvents] = useState<Event[]>([]);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  useEffect(() => {
    fetch("/api/public/events")
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
   * MANIPULADOR DE CLIQUE
   */
  const router = useRouter();

  const handleClick = () => {
    // Auth Removed
  };

  /**
   * FILTRAGEM DE EVENTOS
   * Implementa lógica de filtro por:
   * - Busca (título/descrição)
   * - País
   * - Estado/Província
   * - Categoria
   * - Tipo (online/presencial)
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

      // Filtro por categoria
      const matchesCategory =
        selectedCategories.length === 0 ||
        (event.category && selectedCategories.includes(event.category)) ||
        (event.tags?.some((tag) => selectedCategories.includes(tag)) ?? false);

      // Filtro por mês
      const matchesMonth =
        selectedMonth === "" || event.month === selectedMonth;

      // Filtro por tipo (online)
      const matchesOnline = !isOnline || event.isOnline === true;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesState &&
        matchesCategory &&
        matchesMonth &&
        matchesOnline
      );
    });
  }, [allEvents, searchQuery, selectedCountry, selectedState, selectedCategories, selectedMonth, isOnline]);

  /**
   * LIMPAR FILTROS
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCategories([]);
    setSelectedMonth("");
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
      <section className="relative overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images-events.webp')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 py-20 md:py-24 flex flex-col justify-center lg:items-center lg:text-center">
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mt-8 md:mt-12 lg:mt-14 mb-3 leading-tight max-w-lg uppercase">
            Eventos Tech
          </h2>

          <p className="text-gray-100 mb-2 md:mb-5 text-xs sm:text-sm md:text-base max-w-md">
            Descubra os melhores e imperdíveis eventos mais próximos de ti,
            conecte-se com profissionais e impulsione sua carreira tech.
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

      {/* LISTAGEM DE EVENTOS */}
      <div className="min-h-screen bg-[#fcfcfc]">
        <main className="max-w-7xl mx-auto px-6 py-10">
          {/* Filtros Avançados */}
          <AdvancedFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            isOnline={isOnline}
            setIsOnline={setIsOnline}
          />

          {/* Botão para limpar filtros */}
          {(searchQuery ||
            selectedCountry ||
            selectedState ||
            selectedCategories.length > 0 ||
            selectedMonth ||
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

          {/* Contagem e grid de eventos */}
          <h2 className="text-2xl my-8">
            Eventos encontrados ({filteredEvents.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </>
  );
};

export default Page;
