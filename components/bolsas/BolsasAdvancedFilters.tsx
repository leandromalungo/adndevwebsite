import React from 'react';

interface SeletorFiltrosProps {
  activeTab: string; // Ex: 'bolsas' | 'intercambio' | 'cursos' | 'bootcamps'
  setActiveTab: (tab: string) => void;
}

export default function SeletorFiltros({ activeTab, setActiveTab }: SeletorFiltrosProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 w-full max-w-4xl mx-auto shadow-sm">
      
      {/* Grid inteligente e centralizado: 2 colunas no celular e 4 colunas no PC */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full justify-center">

        {/* 1. Bolsas de Estudo */}
        <button
          type="button"
          onClick={() => setActiveTab('bolsas')}
          className={`w-full px-4 py-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 min-h-[60px] sm:min-h-[70px]
            ${activeTab === 'bolsas' 
              ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <span className="block text-[10px] uppercase tracking-wider opacity-60 font-bold">Filtrar por</span>
          <span className="truncate max-w-full">Bolsas de Estudo</span>
        </button>

        {/* 2. Programas de Intercâmbio */}
        <button
          type="button"
          onClick={() => setActiveTab('intercambio')}
          className={`w-full px-4 py-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 min-h-[60px] sm:min-h-[70px]
            ${activeTab === 'intercambio' 
              ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <span className="block text-[10px] uppercase tracking-wider opacity-60 font-bold">Filtrar por</span>
          <span className="truncate max-w-full">Intercâmbios</span>
        </button>

        {/* 3. Cursos */}
        <button
          type="button"
          onClick={() => setActiveTab('cursos')}
          className={`w-full px-4 py-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 min-h-[60px] sm:min-h-[70px]
            ${activeTab === 'cursos' 
              ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <span className="block text-[10px] uppercase tracking-wider opacity-60 font-bold">Filtrar por</span>
          <span className="truncate max-w-full">Cursos</span>
        </button>

        {/* 4. Bootcamps */}
        <button
          type="button"
          onClick={() => setActiveTab('bootcamps')}
          className={`w-full px-4 py-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all text-center flex flex-col items-center justify-center gap-1 min-h-[60px] sm:min-h-[70px]
            ${activeTab === 'bootcamps' 
              ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100 shadow-sm' 
              : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          <span className="block text-[10px] uppercase tracking-wider opacity-60 font-bold">Filtrar por</span>
          <span className="truncate max-w-full">Bootcamps</span>
        </button>

      </div>
    </div>
  );
}