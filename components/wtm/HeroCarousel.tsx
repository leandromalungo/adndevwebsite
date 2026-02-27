"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { SLIDES, COUNTRY_DATA } from "@/components/wtm/constants";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { FilterTab } from "@/components/CountryFilter";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";

interface HeroCarouselProps {
  selectedCountry?: FilterTab;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  selectedCountry,
}) => {
  const { triggerGoogleSignup, loading: googleLoading } = useGoogleSignup();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // Para swipe/touch
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const slides = selectedCountry
    ? COUNTRY_DATA[selectedCountry]?.slides?.length > 0
      ? COUNTRY_DATA[selectedCountry].slides
      : SLIDES
    : SLIDES;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentSlide = slides[currentIndex];

  const formatDescription = (text: string, boldWords: string[]) => {
    let parts = text.split(
      new RegExp(
        `(${boldWords.join("|").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      ),
    );
    return parts.map((part, i) => (
      <span
        key={i}
        className={
          boldWords.some((word) =>
            part.toLowerCase().includes(word.toLowerCase()),
          )
            ? "font-bold"
            : ""
        }
      >
        {part}
      </span>
    ));
  };

  // Funções para swipe/touch
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        // Swipe para esquerda (próximo slide)
        nextSlide();
      } else if (distance < -50) {
        // Swipe para direita (slide anterior)
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Para mouse (desktop)
  const [mouseDownX, setMouseDownX] = useState<number | null>(null);
  const [mouseUpX, setMouseUpX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownX(e.clientX);
    setMouseUpX(null);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseUpX(e.clientX);
    if (mouseDownX !== null) {
      const distance = mouseDownX - e.clientX;
      if (distance > 50) {
        nextSlide();
      } else if (distance < -50) {
        prevSlide();
      }
    }
    setMouseDownX(null);
    setMouseUpX(null);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-white py-12 px-4 md:px-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ touchAction: "pan-y" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* TEXTO */}
        <div
          className={`transition-all duration-500 transform ${isTransitioning ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"} flex flex-col items-start gap-6`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {currentSlide.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
            {formatDescription(
              currentSlide.description,
              currentSlide.boldKeywords,
            )}
          </p>

          <button
            onClick={triggerGoogleSignup}
            disabled={googleLoading}
            className="flex items-center gap-2 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {googleLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {googleLoading ? "Processando..." : "ASSINAR AGORA"}
          </button>
        </div>

        {/* IMAGEM */}
        <div
          className={`relative transition-all duration-500 transform ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
        >
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden shadow-lg">
            <Image
              src={currentSlide.imageSrc}
              alt={currentSlide.imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CONTROLOS */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={prevSlide}
          className="p-2 text-gray-400 hover:text-gray-900 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3 items-center">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                  ? "bg-gray-900 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 text-gray-400 hover:text-gray-900 transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
