"use client";

import { Tag } from './Tag';

export const Hero = () => {
  const tags = [
    'Talks',
    'Artigos',
    'Bootcamps',
    'E-books',
    'Workshops', 
  ];

  return (
    <section className="relative z-10 pt-10 px-6 max-w-7xl mx-auto flex flex-col justify-center min-h-[85vh]">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-gray-50"> Ecossistema
          de conteúdo, impulsionado por Tecnologia.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
          O que precisas para entrar na area de tecnologia, desde cursos, bootcamps e muito mais. 
          um espaço feito para ti crescer na tua carreira tech, com a nossa ajuda.
        </p>

        {/* Tags Selection */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* CTA Container */}
        <div className="flex flex-col items-start gap-4">
          <button className="border border-violet-600 bg-violet-550 hover:bg-violet-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-violet-500/20 active:scale-95">
            Comece agora
          </button>
          <p className="text-xs text-gray-500 mt-5 font-medium">
           Não perca tempo! Junte-se a nós e esteja com profissionais de tecnologia que já estão a transformar suas carreiras com nossos recursos exclusivos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;