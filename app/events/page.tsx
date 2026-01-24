'use client';

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

import { useState, useMemo, useRef } from 'react';
import { Loader2 } from 'lucide-react';

import AdvancedFilters from '@/components/events/AdvancedFilters';
import EventCard from '@/components/events/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { MOCK_EVENTS } from '@/components/events/constants';

const Page = () => {
  /**
   * REFERÊNCIA DO VÍDEO
   */
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * ESTADOS DA PÁGINA
   */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);

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
    return MOCK_EVENTS.filter(event => {
      // Filtro por busca (título ou descrição)
      const title = event.title?.toLowerCase() ?? '';
      const description = event.description?.toLowerCase() ?? '';
      const matchesSearch =
        searchQuery === '' ||
        title.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase());

      // Filtro por país
      const matchesCountry =
        selectedCountry === '' || event.country === selectedCountry;

      // Filtro por estado/província
      const matchesState =
        selectedState === '' || event.state === selectedState;

      // Filtro por categoria
      const matchesCategory =
        selectedCategory === '' ||
        event.category === selectedCategory ||
        event.tags?.includes(selectedCategory);

      // Filtro por tipo (online)
      const matchesOnline = !isOnline || event.isOnline === true;

      return matchesSearch && matchesCountry && matchesState && matchesCategory && matchesOnline;
    });
  }, [searchQuery, selectedCountry, selectedState, selectedCategory, isOnline]);

  /**
   * LIMPAR FILTROS
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCategory('');
    setIsOnline(false);
  };

  return (
    <>
      <Navbar />

      {/* SEÇÃO DO VÍDEO HERO */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" />

        <div className="relative z-10 flex items-center px-8 py-15 md:px-12 md:py-10">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-5xl mt-4 font-bold text-white mb-8 leading-tight">
              O maior repositório de eventos de tecnologia da lusofonia.
            </h2>

            <p className="text-gray-100 mb-4">
              Descubra os melhores e imperdíveis eventos mais proximos de ti, conecte-se com profissionais e
              impulsione sua carreira tech.
            </p>

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
          {(searchQuery || selectedCountry || selectedState || selectedCategory || isOnline) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}

            {filteredEvents.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum evento encontrado com os filtros selecionados.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-[#004d79] text-white rounded-lg hover:bg-[#003d5f] transition-colors"
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
