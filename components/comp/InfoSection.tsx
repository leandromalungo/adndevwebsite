
import React from 'react';

const FifaInfoSection: React.FC = () => {
  return (
    <section className="w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#001b33] tracking-tight">
          O melhor do mundo nos torneios FIFA
        </h2>
        <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
          <p>
            Além de mostrarem o melhor que o jogo bonito tem a oferecer, os torneios da FIFA levam desenvolvimento para o futebol e suas variantes.
          </p>
          <p>
            A Copa do Mundo FIFA e a Copa do Mundo FIFA Feminina oferecem uma chance de glória para as nações, e clubes de elite se reúnem para disputar a Copa do Mundo FIFA de Clubes.
          </p>
          <p>
            As Copas do Mundo FIFA Sub-17 e Sub-20 da FIFA e suas equivalentes femininas têm uma merecida reputação por ajudar a desenvolver superestrelas em formação. Já a Copa do Mundo FIFA de Futsal e a Copa do Mundo FIFA de Beach Soccer fornecem uma plataforma para o melhor dessas emocionantes modalidades.
          </p>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video lg:aspect-square max-h-[500px]">
        {/* Placeholder image that represents the collage from the screenshot */}
        <img 
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200" 
          alt="Collage of football players" 
          className="w-full h-full object-cover"
        />
        {/* Decorative Overlay mimicking the angled slices */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#001b33]/60 to-transparent"></div>
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <line x1="20%" y1="0" x2="15%" y2="100%" stroke="white" strokeWidth="2" opacity="0.3" />
             <line x1="40%" y1="0" x2="35%" y2="100%" stroke="white" strokeWidth="2" opacity="0.3" />
             <line x1="60%" y1="0" x2="55%" y2="100%" stroke="white" strokeWidth="2" opacity="0.3" />
             <line x1="80%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
        
      </div>
    </section>
  );
};

export default FifaInfoSection;
