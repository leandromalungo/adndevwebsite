
import React, { useRef, useState, useEffect } from 'react';

interface Tournament {
  id: string;
  title: string;
  imageUrl: string;
  year: string;
}

const TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Copa do Mundo Feminina da FIFA 2027™',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800', 
    year: '2027',
  },
  {
    id: '2',
    title: 'Copa do Mundo da FIFA 2030™',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800',
    year: '2030',
  },
  {
    id: '3',
    title: 'Copa do Mundo da FIFA 2034™',
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800',
    year: '2034',
  },
  {
    id: '4',
    title: 'FIFA Women\'s Champions Cup 2026™',
    imageUrl: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800',
    year: '2026',
  }
];

const FifaTournaments: React.FC = () => {
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
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
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
        Próximos torneios e eventos
      </h2>
      
      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
      >
        {TOURNAMENTS.map((t) => (
          <div 
            key={t.id} 
            className="group cursor-pointer min-w-[85%] md:min-w-[31.5%] snap-start"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-sm mb-4 relative">
              <img 
                src={t.imageUrl} 
                alt={t.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-[15px] font-semibold text-gray-800 group-hover:text-[#002e54] transition-colors leading-tight">
              {t.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
            canScrollLeft 
            ? 'border-gray-300 text-[#001b33] hover:bg-gray-50' 
            : 'border-gray-200 text-gray-200 cursor-not-allowed'
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
            : 'border-gray-200 text-gray-200 cursor-not-allowed'
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

export default FifaTournaments;
