import React, { useState, useCallback } from 'react';
import { SLIDES, WTMLogo } from '@/components/wtm/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FilterTab } from '@/components/CountryFilter';

interface HeroCarouselProps {
  selectedCountry?: FilterTab;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ selectedCountry }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentSlide = SLIDES[currentIndex];

  const formatDescription = (text: string, boldWords: string[]) => {
    let parts = text.split(new RegExp(`(${boldWords.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => (
      <span key={i} className={boldWords.some(word => part.toLowerCase().includes(word.toLowerCase())) ? "font-bold" : ""}>
        {part}
      </span>
    ));
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* TEXTO */}
        <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'} flex flex-col items-start gap-6`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {currentSlide.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            {formatDescription(currentSlide.description, currentSlide.boldKeywords)}
          </p>

          <button className="bg-[#1a73e8] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition">
            {currentSlide.buttonText}
          </button>
        </div>

        {/* IMAGEM */}
        <div className={`relative transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-lg">
            <img src={currentSlide.imageSrc} alt={currentSlide.imageAlt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* CONTROLOS */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button onClick={prevSlide} className="p-2 text-gray-400 hover:text-gray-900 transition" aria-label="Previous slide">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3 items-center">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-gray-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="p-2 text-gray-400 hover:text-gray-900 transition" aria-label="Next slide">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
