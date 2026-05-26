"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type DateType = "" | "passados" | "atuais";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedState: string;
  setSelectedState: (value: string) => void;
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  selectedDateType: DateType;
  setSelectedDateType: (value: DateType) => void;
  countries: string[];
  states: string[];
  EVENT_CATEGORIES: string[];
  MONTH_OPTIONS: string[];
  className?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedMonth,
  setSelectedMonth,
  selectedDateType,
  setSelectedDateType,
  countries,
  states,
  EVENT_CATEGORIES,
  MONTH_OPTIONS,
  className = "",
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className={`w-full py-1.5 advanced-filters ${className}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Container Flex Centralizado - Junta os botões ao centro eliminando o vácuo */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full pt-1 pb-2">

          {/* 1. Tipo de Evento */}
          <div className="relative w-[110px] sm:w-[130px]">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'eventType' ? null : 'eventType')}
              className="w-full px-2 py-1.5 text-[11px] sm:text-xs border border-gray-200 dark:border-zinc-700 rounded-md flex items-center justify-between bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-750 focus:outline-none"
            >
              <span className={`truncate text-left flex-1 ${searchQuery.length > 0 ? 'text-zinc-900 dark:text-white font-semibold' : 'text-gray-400 dark:text-zinc-500'}`}>
                {searchQuery.length > 0 ? `${searchQuery.split(',').length} sel.` : 'Tipo de Evento'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-zinc-500 shrink-0 ml-1.5" />
            </button>

            {openDropdown === 'eventType' && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg min-w-[150px] left-0">
                <div className="flex items-center justify-between px-2 py-1 text-[10px] border-b border-gray-100 dark:border-zinc-700">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">Selecione</span>
                  <button type="button" onClick={() => setSearchQuery('')} className="text-violet-600 dark:text-violet-400 hover:underline">Limpar</button>
                </div>
                <div className="max-h-44 overflow-y-auto custom-scrollbar">
                  {EVENT_CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center gap-1.5 w-full px-2 py-1 text-[11px] cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={searchQuery.includes(category)}
                        onChange={() => {
                          const categories = searchQuery ? searchQuery.split(',') : [];
                          if (categories.includes(category)) {
                            setSearchQuery(categories.filter(c => c !== category).join(','));
                          } else {
                            setSearchQuery([...categories, category].join(','));
                          }
                        }}
                        className="w-3 h-3 rounded border-gray-300 dark:border-zinc-600 text-zinc-900 focus:ring-zinc-500/40 shrink-0"
                      />
                      <span className="text-left truncate text-gray-700 dark:text-zinc-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. País */}
          <div className="relative w-[110px] sm:w-[130px]">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
              className="w-full px-2 py-1.5 text-[11px] sm:text-xs border border-gray-200 dark:border-zinc-700 rounded-md flex items-center justify-between bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-750 focus:outline-none"
            >
              <span className={`truncate text-left flex-1 ${selectedCountry ? 'text-zinc-900 dark:text-white font-semibold' : 'text-gray-400 dark:text-zinc-500'}`}>
                {selectedCountry || 'País'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-zinc-500 shrink-0 ml-1.5" />
            </button>

            {openDropdown === 'country' && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg min-w-[150px] left-0">
                <div className="max-h-44 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => { setSelectedCountry(''); setSelectedState(''); setOpenDropdown(null); }}
                    className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-400 italic border-b border-gray-50 dark:border-zinc-700/30"
                  >
                    Todos os países
                  </button>
                  {countries.map(country => (
                    <button
                      type="button"
                      key={country}
                      onClick={() => { setSelectedCountry(country); setSelectedState(''); setOpenDropdown(null); }}
                      className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-zinc-300 truncate block"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Estado / Província */}
          <div className="relative w-[110px] sm:w-[130px]">
            <button
              type="button"
              disabled={!selectedCountry}
              onClick={() => setOpenDropdown(openDropdown === 'state' ? null : 'state')}
              className={`w-full px-2 py-1.5 text-[11px] sm:text-xs border rounded-md flex items-center justify-between transition-colors focus:outline-none
                ${selectedCountry 
                  ? 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-750' 
                  : 'border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-850 text-gray-300 dark:text-zinc-600 cursor-not-allowed'}
              `}
            >
              <span className={`truncate text-left flex-1 ${selectedState ? 'text-zinc-900 dark:text-white font-semibold' : 'text-gray-400 dark:text-zinc-500'}`}>
                {selectedState || 'Estado/Província'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-zinc-500 shrink-0 ml-1.5" />
            </button>

            {openDropdown === 'state' && selectedCountry && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg min-w-[150px] left-0">
                <div className="max-h-44 overflow-y-auto custom-scrollbar">
                  {states.map(state => (
                    <button
                      type="button"
                      key={state}
                      onClick={() => { setSelectedState(state); setOpenDropdown(null); }}
                      className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-zinc-300 truncate block"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. Mês */}
          <div className="relative w-[110px] sm:w-[130px]">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
              className="w-full px-2 py-1.5 text-[11px] sm:text-xs border border-gray-200 dark:border-zinc-700 rounded-md flex items-center justify-between bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-750 focus:outline-none"
            >
              <span className={`truncate text-left flex-1 ${selectedMonth ? 'text-zinc-900 dark:text-white font-semibold' : 'text-gray-400'}`}>
                {selectedMonth || 'Mês'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-zinc-500 shrink-0 ml-1.5" />
            </button>

            {openDropdown === 'month' && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg min-w-[150px] left-0">
                <div className="max-h-44 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => { setSelectedMonth(''); setOpenDropdown(null); }}
                    className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-400 italic border-b border-gray-50 dark:border-zinc-700/30"
                  >
                    Todos os meses
                  </button>
                  {MONTH_OPTIONS.map((month) => (
                    <button
                      type="button"
                      key={month}
                      onClick={() => { setSelectedMonth(month); setOpenDropdown(null); }}
                      className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-zinc-300 truncate block"
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. Data */}
          <div className="relative w-[110px] sm:w-[130px]">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
              className="w-full px-2 py-1.5 text-[11px] sm:text-xs border border-gray-200 dark:border-zinc-700 rounded-md flex items-center justify-between bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-750 focus:outline-none"
            >
              <span className={`truncate text-left flex-1 ${selectedDateType ? 'text-zinc-900 dark:text-white font-semibold' : 'text-gray-400'}`}>
                {selectedDateType === 'passados' ? 'Passados' : selectedDateType === 'atuais' ? 'Atuais/Fut.' : 'Data'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 dark:text-zinc-500 shrink-0 ml-1.5" />
            </button>

            {openDropdown === 'date' && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg min-w-[150px] right-0 sm:left-0">
                <div className="flex items-center justify-between px-2 py-1 text-[10px] border-b border-gray-100 dark:border-zinc-700">
                  <span className="font-semibold text-gray-600 dark:text-zinc-400">Filtrar por data</span>
                  <button type="button" onClick={() => setSelectedDateType('')} className="text-violet-600 dark:text-violet-400 hover:underline">Limpar</button>
                </div>
                <div className="max-h-44 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => { setSelectedDateType(''); setOpenDropdown(null); }}
                    className="w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-400 italic"
                  >
                    Todos os eventos
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedDateType('atuais'); setOpenDropdown(null); }}
                    className={`w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 block ${selectedDateType === 'atuais' ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-zinc-300'}`}
                  >
                    Atuais/Futuros
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedDateType('passados'); setOpenDropdown(null); }}
                    className={`w-full px-2 py-1 text-left text-[11px] hover:bg-gray-50 dark:hover:bg-zinc-700/50 block ${selectedDateType === 'passados' ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-zinc-300'}`}
                  >
                    Passados
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 4px;
        }
        :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
};