"use client";

import React from 'react';

interface CourseCardProps {
  thumbnailUrl: string;
  thumbnailBg: string;
  title: string;
  duration: string;
  location: string;
  description: string;
  brandingText: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ thumbnailUrl, thumbnailBg, title, duration, location, description, brandingText }) => (
  <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Thumbnail */}
    <div className={`${thumbnailBg} w-full md:w-48 h-48 flex-shrink-0 relative flex items-center justify-center p-6 text-white text-center`}>
      <div className="z-10 flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-tighter uppercase opacity-80 mb-1">.StartSe</span>
        <div className="font-bold leading-tight text-lg" dangerouslySetInnerHTML={{ __html: brandingText }}></div>
      </div>
      {thumbnailUrl && (
        <img src={thumbnailUrl} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" alt="" />
      )}
    </div>
    
    {/* Content */}
    <div className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
          <span className="flex items-center">
            <i className="far fa-clock mr-1.5"></i> {duration}
          </span>
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-1.5"></i> {location}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
      </div>
      <button className="self-start px-6 py-2.5 bg-[#007dfc] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors">
        CONHEÇA SOBRE O CURSO
      </button>
    </div>
  </div>
);

const ChallengesSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Feature Card */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[500px] flex flex-col justify-end group">
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
            alt="Resolva seu principal desafio"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          {/* Content Overlap */}
          <div className="relative z-10 p-10 pb-16">
            <h2 className="text-white text-5xl md:text-6xl font-bold leading-[0.9] mb-8 drop-shadow-lg">
              Resolva seu <br />
              <span className="tracking-tighter">principal desafio</span>
            </h2>
            
            <button className="px-8 py-3.5 border-2 border-[#007dfc] text-[#007dfc] hover:bg-[#007dfc] hover:text-white transition-all duration-300 font-bold rounded-xl bg-white/5 backdrop-blur-sm">
              Ver todos os cursos
            </button>
          </div>

          {/* Decorative Wavy Line Pattern (Styled after image) */}
          <div className="absolute bottom-10 left-0 w-full px-10 pointer-events-none opacity-40">
            <svg viewBox="0 0 400 20" className="w-full h-auto text-white fill-current">
              <path d="M0 10 Q 50 0, 100 10 T 200 10 T 300 10 T 400 10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Right Course Stack */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <CourseCard 
            thumbnailBg="bg-[#003d2b]"
            thumbnailUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
            title="Liderança e Eficiência"
            duration="24 horas"
            location="Online"
            brandingText="PROGRAMA DE<br/>LIDERANÇA &<br/>EFICIÊNCIA"
            description="Uma formação com visão 360 e habilidades para lideranças que querem conduzir a transformação das suas empresas com máxima performance e eficiência"
          />
          
          <CourseCard 
            thumbnailBg="bg-[#4a154b]"
            thumbnailUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
            title="Liderança Feminina"
            duration="30 horas"
            location="Online"
            brandingText="UNIVERSITY<br/>PROGRAMA DE<br/>LIDERANÇA<br/>FEMININA"
            description="Formação completa para desenvolvimento de habilidades, competências e superação de desafios de carreira com ajuda e acompanhamento das principais..."
          />
          
          <CourseCard 
            thumbnailBg="bg-[#001f3f]"
            thumbnailUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400"
            title="AI for Leaders"
            duration="4 horas"
            location="Online"
            brandingText="< AI/academy ><br/>AI for Leaders"
            description="Torne-se um líder que domina o ChatGPT e outras ferramentas A.I. para otimizar processos e tomadas de decisão."
          />
        </div>

      </div>
    </section>
  );
};

export default ChallengesSection;
