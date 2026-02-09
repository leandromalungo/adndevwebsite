'use client';

import React from 'react';
import { MapPin, Globe, Clock } from 'lucide-react';
import type { Event } from '@/data/types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 h-full group">
      {/* Secção de imagem */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Sobreposições */}
        {event.isFree && (
          <div className="absolute top-3 left-3 bg-[#004d79] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
             Workshop
          </div>
        )}
        
        {/* Distintivo de data */}
        <div className="absolute bottom-3 left-3 bg-white rounded-lg p-1.5 flex flex-col items-center min-w-[42px] shadow-md border border-gray-50">
          <span className="text-lg font-bold text-gray-800 leading-none">{event.day}</span>
          <span className="text-[10px] text-[#004d79] uppercase font-bold">{event.month}</span>
        </div>
      </div>

      {/* Secção de conteúdo */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-[#334155] font-bold text-base sm:text-lg mb-3 leading-snug min-h-[3rem] line-clamp-2 group-hover:text-[#004d79] transition-colors">
          {event.title}
        </h3>

        {/* Informação do organizador */}
        <div className="flex items-center gap-2 mb-4">
          <img src={event.organizerLogo} alt="" className="w-6 h-6 rounded-full border border-gray-100" />
          <span className="text-xs text-gray-500 font-medium truncate">{event.organizer}</span>
        </div>

        {/* Informação de data/hora */}
        <div className="flex flex-col gap-2.5 text-xs text-gray-600 mb-5">
          <div className="flex items-start gap-2">
             <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />
             <span className="font-medium">{event.date} • {event.timeRange}</span>
          </div>
          <div className="flex items-start gap-2">
            {event.isOnline ? (
              <Globe className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#FF6B00]" />
            ) : (
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#FF6B00]" />
            )}
            <span className="line-clamp-2">{event.location}</span>
          </div>
        </div>

        {/* Secção de etiquetas */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-gray-50">
          {event.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-[9px] sm:text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-md whitespace-nowrap border border-gray-100" >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-[9px] sm:text-[10px] text-gray-400 px-1 py-1">+{event.tags.length - 3} more</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
