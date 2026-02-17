"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FilterTab =
  | "Angola"
  | "Brasil"
  | "Moçambique"
  | "Portugal"
  | "São Tomé e Príncipe"
  | "Guiné-Bissau"
  | "Cabo Verde";

export const LUSOPHONE_COUNTRIES: FilterTab[] = [
  "Angola",
  "Brasil",
  "Moçambique",
  "Portugal",
  "São Tomé e Príncipe",
  "Guiné-Bissau",
  "Cabo Verde",
];

interface CountryFilterProps {
  selectedCountry: FilterTab;
  onCountryChange: (country: FilterTab) => void;
  className?: string;
}

export const CountryFilter: React.FC<CountryFilterProps> = ({
  selectedCountry,
  onCountryChange,
  className = "",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Verificar se pode fazer scroll
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Atualizar estado após animação
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className={`w-full py-6 country-filter ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Escolha um país
        </h3>

        {/* Container com scroll horizontal */}
        <div className="relative group">
          {/* Botão esquerdo */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 rounded-full p-2 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* Botão direito */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-zinc-800 rounded-full p-2 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4"
          >
            {LUSOPHONE_COUNTRIES.map((country) => (
              <button
                key={country}
                onClick={() => onCountryChange(country)}
                className={`
                  px-6 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap
                  transition-all duration-200 flex-shrink-0
                  ${
                    selectedCountry === country
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }
                `}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CSS para esconder scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
