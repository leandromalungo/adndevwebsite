'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { FilterTab } from '@/data/types';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  activeTab,
  setActiveTab,
}) => {
  const tabs: FilterTab[] = [
    'Angola', 
    'Brasil', 
    'Moçambique', 
    'Portugal', 
    'São Tomé e Principe', 
    'Guiné-Bissau', 
    'Cabo-Verde'
  ];

  return (
    <div className="space-y-6">
      {/* Search Controls Grid */}
      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12 xl:items-end">
        {/* Search Input */}
        <div className="xl:col-span-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Procurar evento</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tipo de evento"
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#004d79] focus:border-transparent outline-none text-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="xl:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Localização</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Digite sua localização" 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#004d79] focus:border-transparent outline-none text-sm bg-white" 
              value={locationQuery} 
              onChange={(e) => setLocationQuery(e.target.value)} 
            />
          </div>
        </div>

      </div>

      {/* Tabs Filter - Scrollable on mobile */}
      <div className="relative overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-0 scrollbar-hide no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-[#004d79] text-white border-[#004d79]' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Mobile visual hint for more tabs */}
        <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#fcfcfc] to-transparent pointer-events-none sm:hidden"></div>
      </div>
    </div>
  );
};

export default Filters;
