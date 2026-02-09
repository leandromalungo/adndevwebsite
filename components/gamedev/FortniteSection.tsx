"use client";

import { FORTNITE_FEATURES } from '@/components/gamedev/constants';
import { ExternalLink } from 'lucide-react';

const FortniteSection = () => {
  return (
    <div className="w-full mt-12 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FORTNITE_FEATURES.map((feature) => (
          <div key={feature.id} className="group flex flex-col space-y-4">
            {/* Contentor de imagem */}
            <div className="relative aspect-video rounded overflow-hidden shadow-sm border border-gray-100 cursor-pointer">
              <img 
                src={feature.imageUrl} 
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </div>

            {/* Contentor de conteúdo */}
            <div className="flex flex-col flex-1 space-y-3 px-1">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {feature.description}
              </p>
              
              <div className="pt-2">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold py-3 px-6 rounded transition-colors uppercase tracking-wider">
                  {feature.buttonText}
                  {feature.external && <ExternalLink className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FortniteSection;