import React from 'react';
import { TOP_CHARTS, ChartItem } from '@/components/gamedev/constants';
import { ChevronRight, Crown } from 'lucide-react';

const ChartColumn: React.FC<{ title: string; items: ChartItem[] }> = ({ title, items }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between px-2 cursor-pointer group">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
          {title}
        </h2>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
      </div>

      <div className="flex flex-col">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            {/* Poster */}
            <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate leading-tight mb-1">
                {item.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2">
                {item.discount && (
                  <span className="text-[10px] font-bold bg-[#0078f2] text-white px-1.5 py-0.5 rounded">
                    {item.discount}
                  </span>
                )}
                
                {item.tag && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {item.hasCrown && <Crown className="w-2.5 h-2.5 text-yellow-600 fill-yellow-600" />}
                    {item.tag}
                  </span>
                )}

                <div className="flex items-center gap-1">
                  {item.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {item.oldPrice} *
                    </span>
                  )}
                  <span className="text-xs text-gray-600 font-medium">
                    {item.price || item.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopChartsSection: React.FC = () => {
  return (
    <div className="w-full mt-12 py-8 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ChartColumn title="Mais vendidos" items={TOP_CHARTS.maisVendidos} />
        <ChartColumn title="Mais tocados" items={TOP_CHARTS.maisTocados} />
        <ChartColumn 
          title="Principais itens da lista de desejos para os próximos lançamentos" 
          items={TOP_CHARTS.listaDesejos} 
        />
      </div>
    </div>
  );
};

export default TopChartsSection;