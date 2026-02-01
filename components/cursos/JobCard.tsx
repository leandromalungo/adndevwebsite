"use client";

import React from 'react';
import { Plus } from 'lucide-react';
import { Funcao } from '@/data/types';

interface JobCardProps {
  funcao: Funcao;
  onAdd: (funcao: Funcao) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ funcao, onAdd }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default group">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className={`flex-shrink-0 w-12 h-12 ${funcao.corIcone} rounded-lg flex items-center justify-center text-white shadow-sm`}>
          {funcao.icone}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 truncate pr-2">
          {funcao.titulo}
        </h3>
      </div>
      <button
        onClick={() => onAdd(funcao)}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Adicionar função"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};
