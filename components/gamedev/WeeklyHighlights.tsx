import React from 'react';
import { WEEKLY_HIGHLIGHTS } from '@/components/gamedev/constants';

const WeeklyHighlights = () => {
  return (
    <div className="w-full mt-16 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          As principais notícias desta semana
        </h2>
        <p className="text-gray-500 text-sm">
          Confira algumas das notícias mais importantes desta semana no mundo dos videogames.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {WEEKLY_HIGHLIGHTS.map((item) => (
          <div key={item.id} className="flex flex-col space-y-4 group cursor-pointer">
            {/* Image */}
            <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col space-y-2">
              <div className="bg-[#4a69e2] text-white text-[10px] font-black px-2 py-0.5 w-fit rounded uppercase tracking-wider">
                {item.category}
              </div>
              <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-[#4a69e2] transition-colors line-clamp-4">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {item.description}
              </p>
              
              {/* Footer metadata */}
              <div className="pt-1">
                <p className="text-[11px] text-gray-400 font-medium">
                  Por <span className="text-[#4a69e2]">{item.author}</span> em {item.date} às {item.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyHighlights;