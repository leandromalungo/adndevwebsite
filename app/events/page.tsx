'use client';

/**
 * PÁGINA DE EVENTOS
 * ==================
 * 
 * Página que exibe eventos técnicos com sistema de filtros.
 * 
 * Funcionalidades:
 * - Listagem de eventos
 * - Filtro por busca (título/descrição)
 * - Filtro por localização (7 países/regiões)
 * - Filtro por eventos online
 * - Filtro por abas (Angola/Brasil/etc)
 * - Loading states
 */

import { useState, useMemo, useRef } from 'react';
import { Loader2 } from 'lucide-react';

import Filters from '@/components/events/Filters';
import EventCard from '@/components/events/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { MOCK_EVENTS } from '@/components/events/constants';
import { FilterTab } from '@/data/types';

const Page = () => {
  /**
   * REFERÊNCIA DO VÍDEO
   * Usada para controlar reprodução de vídeo de fundo (se houver)
   */
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * ESTADOS DA PÁGINA
   * ==================
   */
  // Termo de busca para filtrar eventos por nome/descrição
  const [searchQuery, setSearchQuery] = useState('');
  
  // Localização para filtrar eventos
  const [locationQuery, setLocationQuery] = useState('');
  
  // Flag para filtrar apenas eventos online
  const [isOnline, setIsOnline] = useState(false);
  
  // Aba ativa (país/região selecionada)
  const [activeTab, setActiveTab] = useState<FilterTab>('Angola');
  
  // Estado de carregamento para operações assincronas
  const [loading, setLoading] = useState(false);

  /**
   * MANIPULADOR DE CLIQUE
   * Simula uma ação (ex: redirecionar para detalhes ou iniciar quiz)
   */
  const handleClick = () => {
    setLoading(true);

    // Simulação de ação com delay
    setTimeout(() => {
      setLoading(false);
      console.log('Quiz iniciado');
    }, 1500);
  };

  // --- FILTRAGEM DE EVENTOS ---
  const filteredEvents = useMemo(() => {
    const now = new Date();

    return MOCK_EVENTS.filter(event => {
      const title = event.title?.toLowerCase() ?? '';
      const description = event.description?.toLowerCase() ?? '';
      const location = event.location?.toLowerCase() ?? '';

      const matchesSearch =
        title.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase());

      const matchesLocation = location.includes(locationQuery.toLowerCase());

      const matchesOnline = !isOnline || event.isOnline === true;

      const matchesTab =
        activeTab === 'Angola'
          ? new Date(event.date) >= now
          : activeTab === 'Brasil'
          ? new Date(event.date) < now
          : true;

      return matchesSearch && matchesLocation && matchesOnline && matchesTab;
    });
  }, [searchQuery, locationQuery, isOnline, activeTab]);

  // --- LIMPAR FILTROS ---
  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setIsOnline(false);
    setActiveTab('Angola');
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

        <div className="relative z-10 flex items-center px-8 py-20 md:px-12 md:py-24">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              O maior repositório de eventos de tecnologia da lusofonia.
            </h2>

            <p className="text-gray-100 mb-6">
              Descubra eventos imperdíveis, conecte-se com profissionais e
              impulsione sua carreira tech.
            </p>

          </div>
        </div>
      </section>

      {/* LISTAGEM DE EVENTOS */}
      <div className="min-h-screen bg-[#fcfcfc]">
        <main className="max-w-7xl mx-auto px-6 py-10 rounded-lg">
          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <h2 className="text-2xl font-bold my-6">
            Events ({filteredEvents.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}

            {filteredEvents.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Sem eventos listados de momento.
              </p>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Page;
