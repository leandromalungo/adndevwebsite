"use client";

import { useState } from 'react';
import { LATEST_NEWS_FEED } from '@/components/gamedev/constants';
import { MessageSquare, Target, User } from 'lucide-react';

const CATEGORIES = ['Todos', 'Jogos', 'Filmes', 'TV', 'Quadrinhos', 'Tecnologia'];

const LatestNewsFeed = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  return (
    <div className="w-full mt-12 mb-20 space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
          Mais recente <span className="text-[#a11d21]">Notícias</span>
        </h2>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
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

      {/* News List */}
      <div className="flex flex-col space-y-10">
        {LATEST_NEWS_FEED.map((news) => (
          <div key={news.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-pointer">
            {/* Image Wrapper */}
            <div className="md:col-span-3 aspect-[16/9] md:aspect-auto md:h-48 rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
              <img 
                src={news.imageUrl} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content Wrapper */}
            <div className="md:col-span-9 flex flex-col justify-center space-y-2">
              <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-[#a11d21] transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {news.description}
              </p>
              
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#a11d21] uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" />
                  {news.tag}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#a11d21] uppercase tracking-wider">
                  <User className="w-3.5 h-3.5" />
                  {news.author}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-black text-[#a11d21] uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 fill-[#a11d21]" />
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
