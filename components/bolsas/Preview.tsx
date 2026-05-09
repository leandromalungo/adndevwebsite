"use client";

import { DollarSign, Check, ShieldCheck } from 'lucide-react';

export const Preview = () => {
  return (
    <section className="bg-[#f0fdfa] py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado esquerdo: conteúdo */}
        <div className="flex flex-col space-y-8">
          <h2 className="text-4xl md:text-4xl font-normal text-[#111827] leading-tight uppercase">
            Encontre as melhores <span className="text-violet-700">bolsas de estudo</span> nacionais e internacionais
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-gray-200 rounded-full">
                <DollarSign className="w-5 h-5 text-gray-700" />
              </div>
              <p className="text-xl text-[#374151]">
                Estude no exterior e seja <span className="font-bold text-violet-700">pago</span>; 
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-gray-200 rounded-full">
                <Check className="w-5 h-5 text-gray-700" />
              </div>
              <p className="text-xl text-[#374151]">As 
                <span className="font-bold text-violet-700"> 100%</span> financidas e parciais;
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-gray-200 rounded-full">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
              </div>
              <p className="text-xl text-[#374151]">
                <span className="font-bold text-violet-700">Bolsas de estudo</span> comprovadas;
              </p>
            </div>
          </div>

        </div>

        {/* Lado direito: composição visual */}
        <div className="relative">
          {/* Imagem principal */}
          <div className="relative z-10 w-full max-w-[500px] mx-auto">
            
            {/* Confetes/Gráficos de fundo (simplificados com CSS) */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

          </div>
          
          {/* Ziguezagues decorativos */}
          <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none -translate-y-1/2 z-0 opacity-40">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="#2DD4BF" d="M41.5,-63.1C51.5,-54.6,55.8,-39.3,62.8,-24.5C69.8,-9.6,79.5,4.7,78.2,18.4C76.9,32,64.7,45,51.3,53.4C37.9,61.8,23.3,65.6,8.6,67.5C-6.1,69.4,-20.9,69.5,-34.5,64.4C-48.1,59.3,-60.5,49,-68.2,35.8C-75.9,22.6,-78.9,6.5,-75.8,-8.5C-72.7,-23.4,-63.5,-37.2,-51.1,-46.3C-38.6,-55.4,-22.9,-59.8,-6.9,-51.5C9.1,-43.3,31.5,-71.6,41.5,-63.1Z" transform="translate(100 100)" />
             </svg>
          </div>
        </div>

      </div>
    </section>
  );
};
