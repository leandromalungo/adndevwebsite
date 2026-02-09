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

import { useState, useMemo, useRef } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import Head from "next/head";
import AdvancedFilters from "@/components/events/AdvancedFilters";
import { useRouter } from "next/navigation";
import EventCard from "@/components/events/EventCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_EVENTS } from "@/components/events/constants";

const Page = () => {

  /**
   * ESTADOS DA PÁGINA
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * MANIPULADOR DE CLIQUE
   */
  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => router.push("/assinatura"), 1000);
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
    return MOCK_EVENTS.filter((event) => {
      // Filtro por busca (título ou descrição)
      const title = event.title?.toLowerCase() ?? "";
      const description = event.description?.toLowerCase() ?? "";
      const matchesSearch =
        searchQuery === "" ||
        title.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase());

      // Filtro por país
      const matchesCountry =
        selectedCountry === "" || event.country === selectedCountry;

      // Filtro por estado/província
      const matchesState =
        selectedState === "" || event.state === selectedState;

      // Filtro por categoria
      const matchesCategory =
        selectedCategory === "" ||
        event.category === selectedCategory ||
        event.tags?.includes(selectedCategory);

      // Filtro por tipo (online)
      const matchesOnline = !isOnline || event.isOnline === true;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesState &&
        matchesCategory &&
        matchesOnline
      );
    });
  }, [searchQuery, selectedCountry, selectedState, selectedCategory, isOnline]);

  /**
   * LIMPAR FILTROS
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCategory("");
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
      <section className="relative w-full h-[50vh] overflow-hidden bg-zinc-900">
        {/* FUNDO COM IMAGEM */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/events.png')` }}
        >
          {/* OVERLAY / GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex items-center h-full px-8 md:px-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-6 mb-3 leading-tight">
              O maior repositório de eventos de tecnologia da lusofonia.
            </h2>

            <p className="text-gray-100 mb-2 md:mb-5 text-sm md:text-base">
              Descubra os melhores e imperdíveis eventos mais próximos de ti,
              conecte-se com profissionais e impulsione sua carreira tech.
            </p>

            <button
              onClick={handleClick}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all active:scale-95 rounded hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] ${
                loading
                  ? "bg-blue-300 cursor-not-allowed text-zinc-800"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Assinar agora!
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
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
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isOnline={isOnline}
            setIsOnline={setIsOnline}
          />

          {/* Botão para limpar filtros */}
          {(searchQuery ||
            selectedCountry ||
            selectedState ||
            selectedCategory ||
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
          <h2 className="text-2xl font-bold my-8">
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
                  className="mt-4 px-6 py-2 bg-[#004d79] text-white rounded-xl hover:bg-[#003d5f] transition-colors"
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
