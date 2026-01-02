
import React, { useState, useEffect } from 'react';
import { HeroProps } from '@/data/types';

const FifaHero: React.FC<HeroProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoPlayDuration = 8000; // 8 seconds
  const progressInterval = 100; // Update progress every 100ms
  
  const nextIndex = (currentIndex + 1) % items.length;
  const nextItem = items[nextIndex];

  // Progress bar and auto-play logic
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % items.length);
          return 0;
        }
        return prev + (progressInterval / autoPlayDuration) * 100;
      });
    }, progressInterval);

    return () => clearInterval(timer);
  }, [currentIndex, items.length]);

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-[#00213b] text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[400px] relative">
        
        {/* Background Layers for Images - Cross-fade transition */}
        <div className="absolute inset-0 lg:col-start-1 lg:col-end-11 z-0 overflow-hidden">
          {items.map((item, index) => (
            <div
              key={`img-${item.id}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#002e54] via-[#002e54]/60 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Left Side: Content Overlays with slide-up animation */}
        <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center z-10 relative pointer-events-none">
          {items.map((item, index) => (
            <div
              key={`content-${item.id}`}
              className={`absolute inset-x-8 md:inset-x-12 lg:inset-x-16 transition-all duration-1000 ease-out flex flex-col space-y-6 ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-white/80">
                  {item.category}
                </h3>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-lg drop-shadow-md">
                  {item.description}
                </p>
              </div>

              {item.dateBadge && (
                <div className="pt-4">
                  <span className="inline-block px-8 py-4 bg-white text-[#004e89] font-bold rounded-full text-sm md:text-base shadow-xl hover:bg-gray-100 transition-colors cursor-pointer transform hover:-translate-y-1 active:translate-y-0 transition-transform">
                    {item.dateBadge}
                  </span>
                </div>
              )}
            </div>
          ))}
          {/* Invisible spacer to reserve height */}
          <div className="invisible py-12">
            <h2 className="text-3xl md:text-5xl font-extrabold">Placeholder</h2>
            <p className="text-lg">Placeholder text to maintain container height.</p>
          </div>
        </div>

        {/* Spacer for middle grid */}
        <div className="lg:col-span-5 pointer-events-none"></div>

        {/* Right: Next Item Sidebar Preview */}
        <div className="hidden lg:flex lg:col-span-2 flex-col bg-[#001b33]/80 backdrop-blur-md p-6 border-l border-white/10 z-20">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">A seguir</h4>
          <div 
            className="relative flex-1 group cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
            onClick={() => handleTabClick(nextIndex)}
          >
            <img 
              src={nextItem.imageUrl} 
              alt="Next article" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] font-bold uppercase text-white/70 mb-1">{nextItem.category}</p>
              <p className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-white transition-colors">{nextItem.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation with Progress Indicators */}
      <div className="w-full border-t border-white/10 bg-[#001b33]/60 backdrop-blur-md z-30 relative">
        <div className="flex overflow-x-auto no-scrollbar px-4 lg:px-8">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(index)}
              className={`flex-1 min-w-[200px] py-6 px-4 text-left transition-all relative group ${
                index === currentIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <span className="block text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 text-white/70">
                {item.category}
              </span>
              <span className="block text-xs md:text-sm font-bold line-clamp-2 leading-snug">
                {item.title}
              </span>
              
              {/* Progress Background */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-white/10 w-full"></div>
              
              {/* Active Progress Bar */}
              {index === currentIndex && (
                <div 
                  className="absolute bottom-0 left-0 h-[3px] bg-white transition-all ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
              
              {/* Hover highlight */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-white/30 w-0 group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default FifaHero;
