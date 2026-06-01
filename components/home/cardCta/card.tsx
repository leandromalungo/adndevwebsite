'use client';

interface CTACardProps {
  label: string;
  title: string;
  buttonText: string;
  backgroundImage: string;
  href: string;
}

const CTACard = ({ label, title, buttonText, backgroundImage, href }: CTACardProps) => {
  return (
    <div 
      className="relative w-full h-80 sm:h-85 md:h-96 rounded-2xl overflow-hidden group cursor-pointer"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/75 transition-colors duration-300 group-hover:bg-black/80" />

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col justify-between p-4 sm:p-5 md:p-6">
        
        {/* Top section - Label and Title */}
        <div className="flex flex-col gap-1.5 md:gap-2">
          {/* Label */}
          <p className="text-[11px] md:text-xs text-gray-400 font-light tracking-wide uppercase">
            {label}
          </p>

          {/* Título - Reduzido para caber perfeitamente na coluna estreita */}
          <h2 className="text-base sm:text-lg md:text-xl text-white font-bold leading-snug text-balance">
            {title}
          </h2>
        </div>

        {/* Middle section - Button */}
        <div className="flex justify-start">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-5 py-2 border border-white text-white text-xs font-medium rounded hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
          >
            {buttonText}
          </a>
        </div>

        {/* Bottom section - FAQ simplificado para telas menores */}
        <div className="flex justify-start sm:justify-end">
          <p className="text-[10px] md:text-xs text-gray-400 font-light">
            Dúvidas?{' '}
            <a href="https://adndeveloper.com/faq" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
              Perguntas Frequentes
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

interface CTACardsGridProps {
  cards: CTACardProps[];
}

export const CTACardsGrid = ({ cards }: CTACardsGridProps) => {
  return (
    <div className="w-full bg-[#111111] pt-8 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid responsivo ajustado de 1 para 2, e de 2 para 4 colunas em telas grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <CTACard
              key={index}
              label={card.label}
              title={card.title}
              buttonText={card.buttonText}
              backgroundImage={card.backgroundImage}
              href={card.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTACard;