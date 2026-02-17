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
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCategory,
  setSelectedCategory,
  isOnline,
  setIsOnline,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const countries = useMemo(() => getCountries(), []);
  const states = useMemo(
    () => (selectedCountry ? getStatesByCountry(selectedCountry) : []),
    [selectedCountry]
  );

  return (
    <div className="bg-white p-4 rounded border border-gray-200 space-y-4">
      
      {/* Barra de filtros */}
      <div className="flex flex-wrap items-end gap-3">

        {/* Busca */}
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Buscar evento
          </label>
          <input
            type="text"
            placeholder="Workshop, Palestras, Hackathon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#004d79] outline-none"
          />
        </div>

        {/* País */}
        <div className="relative min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            País
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={selectedCountry ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCountry || 'Selecionar'}
            </span>
            <ChevronDown className="w-4 h-4" />
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
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
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
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estado */}
        <div className="relative min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Estado / Província
          </label>
          <button
            disabled={!selectedCountry}
            onClick={() => setOpenDropdown(openDropdown === 'state' ? null : 'state')}
            className={`w-full px-3 py-2 text-sm border rounded flex items-center justify-between
              ${selectedCountry ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-100 cursor-not-allowed'}
            `}
          >
            <span className={selectedState ? 'text-gray-900' : 'text-gray-400'}>
              {selectedState || 'Selecionar'}
            </span>
            <ChevronDown className="w-4 h-4" />
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
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categoria */}
        <div className="relative min-w-[180px]">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Categoria
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded flex items-center justify-between bg-white"
          >
            <span className={selectedCategory ? 'text-gray-900' : 'text-gray-400'}>
              {selectedCategory || 'Selecionar'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {openDropdown === 'category' && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow">
              <div className="max-h-48 overflow-y-auto">
                {EVENT_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Online */}
        <div className="flex items-center h-[38px] px-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="w-4 h-4"
            />
            Online
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
