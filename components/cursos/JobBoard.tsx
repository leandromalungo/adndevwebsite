"use client";

import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { JobBoardProps } from '@/data/types';
import { SearchBar } from '@/components/cursos/SearchBar';
import { JobCard } from '@/components/cursos/JobCard';

export const JobBoard: React.FC<JobBoardProps> = ({ funcoes, onAdd, onLoadMore, hasMore }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFuncoes = useMemo(() => {
    return funcoes.filter((f) =>
      f.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [funcoes, searchTerm]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Search Section */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Grid Section */}
      {filteredFuncoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFuncoes.map((funcao) => (
            <JobCard key={funcao.id} funcao={funcao} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Nenhuma função encontrada para "{searchTerm}"
        </div>
      )}

      {/* Footer Button - Only shows if there are more functions to load and no active search filtering everything */}
      {hasMore && searchTerm === '' && (
        <div className="mt-12 flex justify-start">
          <button
            onClick={onLoadMore}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            <div className="p-1 bg-transparent group-hover:bg-blue-50 rounded transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            Ver mais áreas
          </button>
        </div>
      )}
    </div>
  );
};
