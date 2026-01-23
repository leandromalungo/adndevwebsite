
import React, { useState, useRef, useEffect } from 'react';
import { FilterOption, FilterState, CountryInfo } from '@/data/types';

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: FilterState;
  selectedCountry: CountryInfo;
  onFilterChange: (filterId: string, value: string | number | null) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, activeFilters, selectedCountry, onFilterChange, onClearFilters }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveValue = (id: string) => {
    if (id === 'regiao') return `${selectedCountry.name} (${selectedCountry.currency})`;
    switch (id) {
      case 'categoria': return activeFilters.category;
      case 'classificacao': return activeFilters.rating ? `${activeFilters.rating} Estrelas` : null;
      case 'estado': return activeFilters.condition;
      case 'plataforma': return activeFilters.platform;
      case 'ordenar': return activeFilters.sort;
      default: return null;
    }
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="flex flex-wrap gap-3 py-4 border-b border-gray-100 overflow-visible relative">
        {filters.map((filter) => {
          const activeValue = getActiveValue(filter.id);
          const isOpen = openDropdown === filter.id;
          const isRegiao = filter.id === 'regiao';

          return (
            <div key={filter.id} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : filter.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none whitespace-nowrap border ${
                  (activeValue && !isRegiao) || (isRegiao && isOpen)
                    ? 'bg-cyan-50 border-cyan-500 text-cyan-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:border-cyan-500 hover:text-cyan-600'
                }`}
              >
                {isRegiao && <span className="mr-2 text-base">🌐</span>}
                {activeValue || filter.label}
                <i className={`fa-solid fa-chevron-down ml-2 text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {isRegiao && <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Escolher Região</div>}
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onFilterChange(filter.id, option);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors flex justify-between items-center"
                    >
                      <span>{option}</span>
                      {isRegiao && <span className="text-[10px] text-gray-400 font-mono">VAL</span>}
                    </button>
                  ))}
                  {!isRegiao && (
                    <button
                      onClick={() => {
                        onFilterChange(filter.id, null);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t border-gray-50 mt-1 transition-colors"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {Object.values(activeFilters).some(v => v !== null) && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-gray-400 hover:text-red-500 underline ml-2 transition-colors self-center"
          >
            Limpar filtros
          </button>
        )}
      </div>
      
      {/* Active Selection Tags (Excluding Region as it's a global setting) */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(activeFilters).map(([key, value]) => {
          if (!value) return null;
          return (
            <div key={key} className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 font-medium">
              {value}
              <button 
                onClick={() => onFilterChange(key === 'category' ? 'categoria' : key, null)}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
