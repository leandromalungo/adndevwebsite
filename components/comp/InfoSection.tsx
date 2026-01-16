
import React from 'react';

const InfoSection = () => {
  return (
    <section className="w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#001b33] tracking-tight">
         Assine a plataforma e tenha acesso a todas as competições.
        </h2>
        <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
          <p>
            Assine a plataforma e tenha acesso a todas as competições, incluido as competições de tecnologia nacionais e internacionais organizadas pela FIFA.
          </p>
          <p>
          As nossas newslatter são envidas sempre que houver uma nova competição disponivel na plataforma, para que não percas nenhuma oportunidade de participar e ganhar prémios incríveis.
          </p>
          <p>
          Esta plataforma é ideal para estudantes, profissionais e entusiastas de tecnologia que desejam aprimorar suas habilidades, competir com outros talentos e se destacar no mercado de trabalho.
          </p>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video lg:aspect-square max-h-[500px]">
        {/* Placeholder image that represents the collage from the screenshot */}
        <img 
          src="/images/MozDevz-1160x713.jpg" 
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

export default InfoSection;
