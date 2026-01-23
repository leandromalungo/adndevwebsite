'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { 
  getCountries, 
  getStatesByCountry, 
  getCitiesByState,
  EVENT_CATEGORIES,
  LUSOPHONE_LOCATIONS 
} from '@/data/locationsData';

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
  const states = useMemo(() => 
    selectedCountry ? getStatesByCountry(selectedCountry) : [], 
    [selectedCountry]
  );

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedState('');
    setOpenDropdown(null);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setOpenDropdown(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenDropdown(null);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      {/* Título */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Filtrar Eventos</h3>
      </div>

      {/* Busca por título/descrição */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Procurar evento por nome
        </label>
        <input 
          type="text" 
          placeholder="Ex: Workshop, Hackathon, Webinar..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d79] focus:border-transparent outline-none text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtros em grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* País */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            País
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 bg-white transition-colors"
          >
            <span className={selectedCountry ? 'text-gray-900' : 'text-gray-500'}>
              {selectedCountry || 'Selecionar país'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {openDropdown === 'country' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCountry('');
                    setSelectedState('');
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600 text-sm"
                >
                  Todos os países
                </button>
                {countries.map(country => (
                  <button
                    key={country}
                    onClick={() => handleCountryChange(country)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                      selectedCountry === country 
                        ? 'bg-blue-50 text-[#004d79] font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Estado/Província */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado/Província
          </label>
          <button
            disabled={!selectedCountry}
            onClick={() => setOpenDropdown(openDropdown === 'state' ? null : 'state')}
            className={`w-full px-4 py-3 border rounded-lg text-left flex items-center justify-between transition-colors ${
              selectedCountry
                ? 'border-gray-300 hover:border-gray-400 bg-white'
                : 'border-gray-200 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <span className={selectedState ? 'text-gray-900' : 'text-gray-500'}>
              {selectedState || (selectedCountry ? 'Selecionar estado' : 'Selecione um país')}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {openDropdown === 'state' && selectedCountry && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedState('');
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600 text-sm"
                >
                  Todos os estados
                </button>
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => handleStateChange(state)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                      selectedState === state 
                        ? 'bg-blue-50 text-[#004d79] font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categoria */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoria do Evento
          </label>
          <button
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 bg-white transition-colors"
          >
            <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
              {selectedCategory || 'Selecionar categoria'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {openDropdown === 'category' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="max-h-48 overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600 text-sm"
                >
                  Todas as categorias
                </button>
                {EVENT_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                      selectedCategory === category 
                        ? 'bg-blue-50 text-[#004d79] font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Eventos Online */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              className="w-4 h-4 text-[#004d79] rounded focus:ring-2"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Apenas eventos online
            </span>
          </label>
        </div>
      </div>

      {/* Tags de filtros ativos */}
      {(searchQuery || selectedCountry || selectedState || selectedCategory || isOnline) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          {searchQuery && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Busca: {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {selectedCountry && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              País: {selectedCountry}
              <button
                onClick={() => {
                  setSelectedCountry('');
                  setSelectedState('');
                }}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {selectedState && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Estado: {selectedState}
              <button
                onClick={() => setSelectedState('')}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory('')}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {isOnline && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Online
              <button
                onClick={() => setIsOnline(false)}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
