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
      className="relative w-full h-80 md:h-96 lg:h-96 rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/75 transition-colors duration-300" />

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col justify-between p-5 md:p-7 lg:p-8">
        {/* Top section - Label and Title */}
        <div className="flex flex-col gap-2 md:gap-3">
          {/* Label */}
          <p className="text-xs sm:text-xs md:text-sm text-gray-400 font-light">
            {label}
          </p>

          {/* Título */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-snug text-balance">
            {title}
          </h2>
        </div>

        {/* Middle section - Button */}
        <div className="flex justify-start">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 md:px-6 py-2 md:py-3 border border-white text-white text-xs md:text-sm font-medium rounded hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
          >
            {buttonText}
          </a>
        </div>

        {/* Bottom section */}
        <div className="flex justify-end">
          <p className="text-xs text-gray-400 font-light cursor-pointer hover:text-white transition-colors">
            Tem perguntas?{' '}
            <a href="https://adndeveloper.com/faq" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Leia nosso
            </a>
            {' '}
            <a href="https://adndeveloper.com/faq" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Perguntas frequentes
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
    <div className="w-full bg-white pt-8 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
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
