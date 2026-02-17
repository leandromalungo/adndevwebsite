'use client';

import React from 'react';
import { MapPin, Globe, Clock } from 'lucide-react';
import type { Event } from '@/data/types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 h-full group">
      {/* Secção de imagem */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={`${event.title} - Fonte: ${event.organizer} (Conteúdo de Terceiros)`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Sobreposições */}
        {event.isFree && (
          <div className="absolute top-3 left-3 bg-[#c2c2c2]/50 text-violet-600 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
             Workshop
          </div>
        )}
        
        {/* Distintivo de data */}
        <div className="absolute bottom-3 left-3 bg-white rounded-lg p-1.5 flex flex-col items-center min-w-[42px] shadow-md border border-gray-50">
          <span className="text-lg font-bold text-gray-800 leading-none">{event.day}</span>
          <span className="text-[10px] text-[#5a0cb9] uppercase font-bold">{event.month}</span>
        </div>
      </div>

      {/* Secção de conteúdo */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-[#334155] font-bold text-base sm:text-lg mb-3 leading-snug min-h-[3rem] line-clamp-2 group-hover:text-[#5a0cb9] transition-colors">
          {event.title}
        </h3>

        {/* Informação do organizador */}
        <div className="flex items-center gap-2 mb-4">
          <img src={event.organizerLogo} alt="" className="w-6 h-6 rounded-full border border-gray-100" />
          <span className="text-xs text-gray-500 font-medium truncate">{event.organizer}</span>
        </div>

        {/* Descrição curta */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Informação de data/hora */}
        <div className="flex flex-col gap-2.5 text-xs text-gray-600 mb-5">
          <div className="flex items-start gap-2">
             <Clock className="w-3.5 h-3.5 shrink-0 text-gray-400" />
             <span className="font-medium text-[9px]">{event.date} • {event.timeRange}</span>
          </div>
          <div className="flex items-start gap-2">
            {event.isOnline ? (
              <Globe className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#0095f8]" />
            ) : (
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#0095f8]" />
            )}
            <span className="line-clamp-2">{event.location}</span>
          </div>
        </div>

        {/* Secção de etiquetas e Botão */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-4">
            <span className="text-[9px] text-gray-400">
              Fonte: este evento tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
            </span>
          <a 
            href={event.link || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full text-center py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-colors"
          >
            Acessar
          </a>
        </div>
      </div>
      
      {/* Fonte da imagem (Overlay) */}
      {event.imageSource && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/40 px-1 rounded z-20 pointer-events-none">
          <span className="text-[6px] text-white/50 bg-black/20 p-0.5 rounded">Fonte Externa</span>
          <div className="text-[8px] text-white/60">
             {event.imageSource}
          </div>
        </div>
      )}

      <div className="px-5 pb-4">
         <p className="text-[9px] text-gray-400 text-center leading-tight border-t border-gray-50 pt-2 mt-2">
            Este conteúdo é de propriedade de terceiros ({event.organizer}). O ADN Developer apenas compartilha para fins informativos sem fins lucrativos sobre a marca.
         </p>
      </div>
    </div>
  );
};

export default EventCard;
