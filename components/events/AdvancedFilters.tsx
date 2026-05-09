'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { getCountries, getStatesByCountry, EVENT_CATEGORIES } from '@/data/locationsData';

interface AdvancedFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
}

const MONTH_OPTIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCategories,
  setSelectedCategories,
  selectedMonth,
  setSelectedMonth,
  isOnline,
  setIsOnline,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const countries = useMemo(() => getCountries(), []);
  const states = useMemo(
    () => (selectedCountry ? getStatesByCountry(selectedCountry) : []),
    [selectedCountry]
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded border border-gray-200 space-y-3 sm:space-y-4">
      
      {/* Barra de filtros */}
      <div className="flex flex-wrap items-end gap-2 sm:gap-3">

        {/* Tipo de Evento */}
        <div className="relative min-w-[140px] sm:min-w-[180px]">
          <label className="block text-xs sm:text-xs font-semibold text-gray-600 mb-1">
            Tipo de Evento
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'eventType' ? null : 'eventType')}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={searchQuery.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
              {searchQuery.length > 0 ? `${searchQuery.split(',').length} selecionado(s)` : 'Selecionar'}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {openDropdown === 'eventType' && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="flex items-center justify-between px-2 sm:px-3 py-2 text-xs sm:text-sm border-b border-gray-100">
                <span className="font-medium">Tipos de eventos</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:underline"
                >
                  Limpar
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto">
                {EVENT_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                  >
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
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span className="text-left">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* País */}
        <div className="relative min-w-[140px] sm:min-w-[180px]">
          <label className="block text-xs sm:text-xs font-semibold text-gray-600 mb-1">
            País
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={selectedCountry ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCountry || 'Selecionar'}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {openDropdown === 'country' && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCountry('');
                    setSelectedState('');
                    setOpenDropdown(null);
                  }}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50"
                >
                  Todos os países
                </button>
                {countries.map(country => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setSelectedState('');
                      setOpenDropdown(null);
                    }}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estado */}
        <div className="relative min-w-[140px] sm:min-w-[180px]">
          <label className="block text-xs sm:text-xs font-semibold text-gray-600 mb-1">
            Estado / Província
          </label>
          <button
            disabled={!selectedCountry}
            onClick={() => setOpenDropdown(openDropdown === 'state' ? null : 'state')}
            className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded flex items-center justify-between
              ${selectedCountry ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-100 cursor-not-allowed'}
            `}
          >
            <span className={selectedState ? 'text-gray-900' : 'text-gray-400'}>
              {selectedState || 'Selecionar'}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {openDropdown === 'state' && selectedCountry && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="max-h-48 overflow-y-auto">
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => {
                      setSelectedState(state);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50"
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mês */}
        <div className="relative min-w-[140px] sm:min-w-[180px]">
          <label className="block text-xs sm:text-xs font-semibold text-gray-600 mb-1">
            Mês
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={selectedMonth ? 'text-gray-900' : 'text-gray-400'}>
              {selectedMonth || 'Selecionar'}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {openDropdown === 'month' && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedMonth('');
                    setOpenDropdown(null);
                  }}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50"
                >
                  Todos os meses
                </button>
                {MONTH_OPTIONS.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm hover:bg-gray-50"
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categoria */}
        <div className="relative min-w-[140px] sm:min-w-[180px]">
          <label className="block text-xs sm:text-xs font-semibold text-gray-600 mb-1">
            Categoria
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={selectedCategories.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCategories.length > 0
                ? `${selectedCategories.length} selecionado(s)`
                : 'Selecionar'}
            </span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {openDropdown === 'category' && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="flex items-center justify-between px-2 sm:px-3 py-2 text-xs sm:text-sm border-b border-gray-100">
                <span className="font-medium">Filtrar por tipo</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="text-blue-600 hover:underline"
                >
                  Limpar
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto">
                {EVENT_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span className="text-left">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Online */}
        <div className="flex items-center h-[32px] sm:h-[38px] px-1 sm:px-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            Online
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
