
import React, { useRef, useState, useEffect } from 'react';
import { GOG_PRESERVATION_GAMES } from '@/components/gamedev/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GOGPreservation: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft, scrollWidth } = scrollRef.current;
      
      // Update progress bar
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);

      // Update current index based on visible items
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 320;
      const gap = 24; // gap-6 is 24px
      const index = Math.round(scrollLeft / (itemWidth + gap)) + 1;
      setCurrentIndex(Math.min(index, GOG_PRESERVATION_GAMES.length));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      const amount = clientWidth * 0.7;
      const target = direction === 'left' ? scrollLeft - amount : scrollLeft + amount;
      
      scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
      
      // Timeout to update state after smooth scroll starts/ends
      setTimeout(updateScrollState, 100);
      setTimeout(updateScrollState, 500);
    }
  };

  // Add scroll listener for real-time updates
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState);
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, []);

  return (
    <div className="w-full bg-[#1a1c20] py-12 px-6 md:px-12 rounded-[2rem] mt-16 overflow-hidden">
      <div className="max-w-[1300px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-white tracking-tight">
                Programa de Preservação GOG
              </h2>
              {/* Numeric Indicator */}
              <span className="bg-white/10 text-white/60 text-[10px] font-black px-2 py-0.5 rounded-full border border-white/5">
                {currentIndex} / {GOG_PRESERVATION_GAMES.length}
              </span>
            </div>
            <button className="text-gray-400 hover:text-white text-sm font-bold transition-colors">
              Veja mais
            </button>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            O Programa de Preservação da GOG garante que seus clássicos favoritos rodem, agora e sempre, sem complicações em PCs modernos, em sua melhor forma possível.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group">
          {/* Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 active:scale-90"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 disabled:opacity-30 active:scale-90"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {GOG_PRESERVATION_GAMES.map((game) => (
              <div 
                key={game.id}
                className="min-w-[280px] md:min-w-[320px] bg-[#2b2d31] rounded-xl overflow-hidden shadow-xl flex flex-col group/card cursor-pointer snap-start"
              >
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-[9px] font-black text-white bg-black border border-white px-2 py-0.5 rounded tracking-tighter uppercase">
                      O BOM E VELHO JOGO
                    </span>
                  </div>
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors" />
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
                  <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                    {game.title}
                  </h3>

                  <div className="flex items-center justify-end gap-3 self-end">
                    <div className="bg-[#a855f7] text-white text-sm font-black px-2 py-1 rounded">
                      {game.discount}
                    </div>
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] text-gray-400 line-through">
                        {game.oldPrice}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {game.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center pt-4">
          <div className="w-32 h-[3px] bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: '100%', transform: `translateX(${(scrollProgress - 1) * 100}%)` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GOGPreservation;
