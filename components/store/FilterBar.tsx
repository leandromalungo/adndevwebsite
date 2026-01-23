"use client";

import React, { useState, useRef, useEffect } from "react";
import { FilterOption, FilterState, CountryInfo } from "@/data/types";

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: FilterState;
  selectedCountry: CountryInfo;
  onFilterChange: (filterId: string, value: string | number | null) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilters,
  selectedCountry,
  onFilterChange,
  onClearFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getActiveValue = (id: string) => {
    if (id === "regiao")
      return `${selectedCountry.name} (${selectedCountry.currency})`;
    switch (id) {
      case "categoria":
        return activeFilters.category;
      case "classificacao":
        return activeFilters.rating ? `${activeFilters.rating} Estrelas` : null;
      case "estado":
        return activeFilters.condition;
      case "plataforma":
        return activeFilters.platform;
      case "ordenar":
        return activeFilters.sort;
      default:
        return null;
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {/* TROCA AQUI: overflow-x-auto -> overflow-visible */}
      <div className="flex gap-3 items-center overflow-visible">
        {filters.map((filter) => {
          const activeValue = getActiveValue(filter.id);
          const isOpen = openDropdown === filter.id;
          const isRegiao = filter.id === "regiao";

          return (
            <div key={filter.id} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : filter.id)}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none whitespace-nowrap border ${
                  (activeValue && !isRegiao) || (isRegiao && isOpen)
                    ? "bg-cyan-50 border-cyan-500 text-cyan-700"
                    : "bg-white border-gray-300 text-gray-700 hover:border-cyan-500 hover:text-cyan-600"
                }`}
              >
                {isRegiao && <span className="mr-2 text-base">🌐</span>}
                {activeValue || filter.label}
                <i
                  className={`fa-solid fa-chevron-down ml-2 text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
                ></i>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-[9999] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {isRegiao && (
                    <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
                      Escolher Região
                    </div>
                  )}
                  {filter.options.map((option) => (
                    <button key={option}
                      onClick={() => {
                        onFilterChange(filter.id, option);
                        setOpenDropdown(null); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors flex justify-between items-center" >
                      <span>{option}</span>
                      {isRegiao && ( <span className="text-[10px] text-gray-400 font-mono"> Moeda </span> )}
                    </button>
                  ))}
                  {!isRegiao && (
                    <button
                      onClick={() => {
                        onFilterChange(filter.id, null);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t border-gray-50 mt-1 transition-colors" > Limpar </button> )}
                </div> )}
            </div>
          );
        })}
        {Object.values(activeFilters).some((v) => v !== null) && (
          <button onClick={onClearFilters} className="text-sm text-gray-400 hover:text-red-500 underline ml-2 transition-colors self-center" > Limpar filtros </button> )}
      </div>
    </div>
  );
};

export default FilterBar;
