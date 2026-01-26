import React, { useRef } from 'react';
import { DISCOVER_GAMES } from '@/components/gamedev/constants';
import { ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from 'lucide-react';

const DiscoverSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full mt-16 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 group">
          <h2 className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Descubra algo novo
          </h2>
          <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors border border-gray-200 active:scale-90"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors border border-gray-200 active:scale-90"
            aria-label="Rolar para direita"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}} />
        
        {DISCOVER_GAMES.map((game) => (
          <div 
            key={game.id} 
            className="min-w-[calc(50%-10px)] md:min-w-[calc(33.333%-14px)] lg:min-w-[calc(16.666%-17px)] group cursor-pointer space-y-3 transition-transform duration-300 snap-start"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img 
                src={game.imageUrl} 
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>

            {/* Info */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                {game.subtitle || 'Jogo Base'}
              </p>
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
                {game.title}
              </h3>
              
              {game.promoText && (
                <div className="mt-2">
                  <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                    {game.promoText}
                  </span>
                </div>
              )}
              
              <p className="text-sm font-medium text-gray-900 pt-1">
                {game.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverSection;