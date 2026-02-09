"use client";

import { useState } from 'react';
import { LATEST_NEWS_FEED } from '@/components/gamedev/constants';
import { MessageSquare, Target, User } from 'lucide-react';

const CATEGORIES = ['Indie Games', '2D', '3D', 'Adventure', 'Logioc', 'Casual'];

const LatestNewsFeed = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  return (
    <div className="w-full mt-12 mb-20 space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl text-gray-900 tracking-tight">
          Mais recente <span className="text-[#a11d21]">Notícias</span>
        </h2>

        {/* Pílulas de categorias */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded text-sm transition-all ${
                activeCategory === cat 
                  ? 'bg-[#1a1c23] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de notícias */}
      <div className="flex flex-col space-y-10">
        {LATEST_NEWS_FEED.map((news) => (
          <div key={news.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-pointer">
            {/* Contentor de imagem */}
            <div className="md:col-span-3 aspect-[16/9] md:aspect-auto md:h-48 rounded overflow-hidden shadow-sm border border-gray-100 shrink-0">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Contentor de conteúdo */}
            <div className="md:col-span-9 flex flex-col justify-center space-y-2">
              <h3 className="text-xl text-gray-900 leading-tight group-hover:text-[#a11d21] transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {news.description}
              </p>

              {/* Etiquetas meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-[#a11d21] uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  {news.tag}
                </div>
               
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNewsFeed;
