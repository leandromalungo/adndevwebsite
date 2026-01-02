
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
        
        {/* Subtle branding or caption overlay if needed */}
        <div className="absolute bottom-6 right-6">
           <div className="bg-[#001b33] p-3 rounded-full shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
               <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
               <path d="M3.265 10.602l7.667 4.13a2.25 2.25 0 002.136 0l7.667-4.13a.75.75 0 01.702 1.322l-7.665 4.13a3.75 3.75 0 01-3.564 0l-7.665-4.13a.75.75 0 01.702-1.322z" />
               <path d="M3.265 14.352l7.667 4.13a2.25 2.25 0 002.136 0l7.667-4.13a.75.75 0 01.702 1.322l-7.665 4.13a3.75 3.75 0 01-3.564 0l-7.665-4.13a.75.75 0 01.702-1.322z" />
             </svg>
           </div>
        </div>
      </div>
    </section>
  );
};

export default FifaInfoSection;
