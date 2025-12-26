
import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '@/components/newslatter/Constants';
import { Category } from '../../data/types';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeCategory: Category | null;
  setActiveCategory: (cat: Category | null) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory
}) => {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar edições por título ou data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50/50 py-3 pl-12 pr-4 text-base text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200/50 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={`px-3 py-1 text-[10px] font-bold border rounded transition-all tracking-tight uppercase ${
              activeCategory === cat
                ? 'bg-blue-400 border-blue-400 text-gray-900'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
