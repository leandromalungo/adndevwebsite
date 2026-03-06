import React from 'react';
import { COUNTRY_DATA, LEADERSHIP_CARDS } from '@/components/wtm/constants';

import type { FilterTab } from '@/components/CountryFilter';
import { ExternalLink } from 'lucide-react';

interface LeadershipSectionProps {
  selectedCountry?: FilterTab;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ selectedCountry }) => {
  const cards = selectedCountry ? (COUNTRY_DATA[selectedCountry]?.leadership?.length > 0 ? COUNTRY_DATA[selectedCountry].leadership : LEADERSHIP_CARDS) : LEADERSHIP_CARDS;

  return (
    <section className="container md:mx-10 max-w-6xl py-16 px-2">
      {/* Título da secção */}
      <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-10 uppercase">
        Mulheres na tecnologia {selectedCountry && <span className="text-2xl md:text-3xl font-medium">em {selectedCountry}</span>}
      </h2>

      {/* Grelha de cartões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (

          <div key={card.id} className="flex flex-col h-full">
            {/* Cartão introdutório */}
            {card.type === 'intro' ? (
              <div className="bg-white border-b border-l border-r border-gray-100 rounded-lg shadow-sm border-t-[6px] border-t-[#00CBA9] p-6 md:p-8 flex flex-col h-full">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                  {card.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {card.description}
                </p>
              </div>
            ) : (
              /* Cartão de Líder Padrão */
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col h-full overflow-hidden relative group">

                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                  style={{ backgroundImage: `url(${"https://iili.io/qomO0f1.jpg"})` }}
                />

                {/* Canto turquesa */}
                <div className="absolute top-0 right-0 w-16 h-8 bg-[#00CBA9] rounded-bl-3xl z-20" />

                {/* Conteúdo */}
                <div className="relative z-10 bg-white/35 backdrop-blur-sm border-b border-l border-r border-gray-100 rounded-lg shadow-sm p-6 md:p-8 flex flex-col h-full">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                    {card.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-gray-800 mb-4 md:mb-6">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm md:sm">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-1 text-[#440bd6] font-semibold text-xs mt-auto pt-2">
                    <a href={card.link} target="_blank" rel="noopener noreferrer">Ver Mais</a>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
