
import React, { useRef, useState, useEffect } from 'react';

interface RecentEvent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const RECENT_EVENTS: RecentEvent[] = [
  {
    id: '1',
    title: 'Copa Árabe da FIFA Catar 2025™',
    description: 'Relembre a conquista do Marrocos na Copa Árabe',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'Copa Intercontinental da FIFA 2024™',
    description: 'Relembre a dramática vitória do Real Madrid',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'Copa do Mundo de Clubes da FIFA 2023™',
    description: 'A histórica campanha do Fluminense',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '4',
    title: 'Copa do Mundo Feminina da FIFA 2023™',
    description: 'A glória da Espanha em Sydney',
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=1200',
  }
];

const FifaRecentEvents = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.7;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <section className="w-full py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#001b33] mb-8">
        Torneios e eventos recentes
      </h2>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
      >
        {RECENT_EVENTS.map((event, index) => (
          <div 
            key={event.id}
            className="relative min-w-[85%] md:min-w-[60%] lg:min-w-[65%] h-[400px] md:h-[500px] rounded-sm overflow-hidden snap-center group cursor-pointer"
          >
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start space-y-4">
              <div className="space-y-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  {event.title}
                </h3>
                <p className="text-sm md:text-base text-white/80 font-medium">
                  {event.description}
                </p>
              </div>
              <button className="bg-white text-[#001b33] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
                Relembre
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
            canScrollLeft 
            ? 'border-gray-300 text-[#001b33] hover:bg-gray-50' 
            : 'border-gray-100 text-gray-200 cursor-not-allowed'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
            canScrollRight 
            ? 'border-gray-300 text-[#001b33] hover:bg-gray-50' 
            : 'border-gray-100 text-gray-200 cursor-not-allowed'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default FifaRecentEvents;
