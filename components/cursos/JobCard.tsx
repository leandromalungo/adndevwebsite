"use client";

import React from 'react';
import Link from 'next/link';
import { Funcao } from '@/data/types';
import { slugify } from '@/lib/utils';
interface JobCardProps {
  funcao: Funcao;
  onAdd: (funcao: Funcao) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ funcao, onAdd }) => {
  return (
    <div className="relative flex items-center justify-between p-3 bg-white border border-gray-100 rounded shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <Link href={`/cursos/${slugify(funcao.titulo)}`} className="absolute inset-0 z-0" aria-label={`Ver cursos de ${funcao.titulo}`} />
      <div className="flex items-center gap-4 flex-1 min-w-0 z-10 pointer-events-none">
        <div className={`flex-shrink-0 w-12 h-12 ${funcao.corIcone} rounded flex items-center justify-center text-white shadow-sm`}>
          {funcao.icone}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 truncate pr-2">
          {funcao.titulo}
        </h3>
      </div>
    </div>
  );
};
