'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MapPin, Globe } from 'lucide-react';
import type { Event } from '@/data/types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoggedIn = !!session;
  const actionHref = isLoggedIn ? event.link || '#' : `${pathname}?auth=login`;
  const actionTarget = isLoggedIn ? '_blank' : undefined;
  const actionRel = isLoggedIn ? 'noopener noreferrer' : undefined;

  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 h-full group">
      {/* Secção de imagem */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
        <Image
          src={event.imageUrl}
          alt={`${event.title} - Fonte: ${event.organizer} (Conteúdo de Terceiros)`}
          fill
          quality={75}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="empty"
        />
        
      </div>

      {/* Secção de conteúdo */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-[#334155] font-bold text-base sm:text-lg mb-3 leading-snug min-h-[3rem] line-clamp-2 group-hover:text-[#5a0cb9] transition-colors">
          {event.title}
        </h3>

        {/* Informação do organizador */}
        <div className="flex items-center gap-2 mb-4">
          <Image src={event.organizerLogo} alt="" width={24} height={24} quality={80} className="rounded-full border border-gray-100" loading="lazy" />
          <span className="text-xs text-gray-500 font-medium truncate">{event.organizer}</span>
        </div>

        {/* Descrição curta */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Informação de data/hora e localização */}
        <div className="flex flex-col gap-3 mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-xs text-gray-700">
              <span className="font-semibold">{event.date}</span>
              <span className="text-gray-500 text-[11px]">{event.timeRange}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            {event.isOnline ? (
              <Globe className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
            ) : (
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
            )}
            <span className="text-xs text-gray-600 line-clamp-2">{event.location}</span>
          </div>
        </div>

        {/* Secção de etiquetas e Botão */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-4">
            <span className="text-[9px] text-gray-400">
              Fonte: este evento tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
            </span>
          <a 
            href={actionHref}
            target={actionTarget}
            rel={actionRel}
            className="w-full text-center py-2 rounded-lg bg-violet-50 text-violet-600 font-semibold text-sm hover:bg-violet-100 transition-colors"
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
