"use client";

import { POPULAR_NEWS } from '@/components/gamedev/constants';

const NewsSection = () => {
  return (
    <div className="w-full mt-16 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Coluna de notícias em destaque */}
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <h2 className="text-3xl text-[#262626] tracking-tight uppercase">
          Notícias
        </h2>
        <div className="relative aspect-[16/9] rounded overflow-hidden shadow-2xl border border-gray-100 group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=1200&auto=format&fit=crop" 
            alt="Mario and Yoshi"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Coluna lateral: Popular */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        <h2 className="text-xl text-[#262626] tracking-tight uppercase border-b border-gray-200 pb-2">
          Popular
        </h2>
        <div className="flex flex-col space-y-6 pt-2">
          {POPULAR_NEWS.map((news, index) => (
            <div key={news.id} className="flex gap-4 group cursor-pointer items-start">
              {/* Distintivo de posição */}
              <div className="flex items-center justify-center w-6 h-6 rounded border border-gray-900 shrink-0 mt-1">
                <span className="text-[10px] font-black text-gray-900">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              
              {/* Conteúdo */}
              <div className="flex flex-col space-y-1 min-w-0">
                <p className="text-xs font-bold text-[#262626] leading-none uppercase">
                  {news.time}
                </p>
                <h3 className="text-sm font-black text-gray-900 leading-snug group-hover:text-[#262626] transition-colors line-clamp-2">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
