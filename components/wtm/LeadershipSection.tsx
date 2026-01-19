import React from 'react';
import { LEADERSHIP_CARDS, WTMLogoColored } from '@/components/wtm/constants';

export const LeadershipSection: React.FC = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-medium text-gray-700 mb-10 uppercase">
        Mulheres africanas na tecnologia
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LEADERSHIP_CARDS.map((card) => (
          <div key={card.id} className="flex flex-col h-full">
            {/* Intro Card */}
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
                
                {/* Teal Corner */}
                <div className="absolute top-0 right-0 w-16 h-10 bg-[#00CBA9] rounded-bl-3xl" />

                <div className="p-4 md:p-6 flex flex-col h-full">
                  <div className="flex gap-4 mb-4">
                    
                    {/* Profile Image */}
                    <div className="flex-shrink-0 relative w-20 md:w-24 h-28 md:h-32">
                      <div className="absolute inset-0 -m-1 border-2 border-blue-500 rounded-tr-[2rem] rounded-bl-[1rem] border-l-0 border-b-0"></div>
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-full h-full object-cover rounded-sm relative z-10"
                      />
                    </div>
                    
                    {/* Name + Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg md:text-xl leading-tight mb-1">
                          {card.name}
                        </h4>
                        <p className="text-[10px] md:text-sm text-gray-500 font-medium leading-tight mb-2 md:mb-3">
                          {card.role}
                        </p>
                        <span className="bg-[#ff6d6d] text-white text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-sm uppercase inline-block">
                          Líderes em ascensão
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-1">
                        <WTMLogoColored />
                        <span className="text-[9px] md:text-[10px] font-medium text-gray-400">
                          Rostos femeninos em T.I
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Session Title */}
                  <h5 className="text-lg md:text-xl font-bold text-gray-800 leading-tight mt-auto">
                    {card.sessionTitle}
                  </h5>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
