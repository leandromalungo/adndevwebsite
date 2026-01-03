'use client';

import React from 'react';
import { MapPin, X } from 'lucide-react';
import { FilterTab } from '@/data/types';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
  isOnline: boolean;
  setIsOnline: (val: boolean) => void;
  activeTab: FilterTab;
  setActiveTab: (tab: FilterTab) => void;
  clearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  isOnline,
  setIsOnline,
  activeTab,
  setActiveTab,
  clearFilters
}) => {
  const tabs: FilterTab[] = ['Past', 'Upcoming', 'Next 7 days', 'Next 30 days'];

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
              placeholder="Keyword or category"
              className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d79] focus:border-transparent outline-none text-sm bg-white"
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
              placeholder="City or zip code"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004d79] focus:border-transparent outline-none text-sm bg-white"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Online Toggle & Actions Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 xl:col-span-5">
          <div className="flex items-center h-[50px]">
            <label className="flex items-center cursor-pointer gap-2 select-none group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isOnline}
                  onChange={() => setIsOnline(!isOnline)}
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-[#004d79] peer-checked:border-[#004d79] transition-colors"></div>
                {isOnline && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-700 font-medium">Eventos Online </span>
            </label>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto h-[50px]">
            <button 
              onClick={clearFilters}
              className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Filter - Scrollable on mobile */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all whitespace-nowrap ${
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
