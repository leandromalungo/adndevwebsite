"use client";

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef } from 'react';

export const CuratedCollections = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const courses = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'Desenvolvimento Web Completo',
      description: 'Aprenda HTML, CSS, JavaScript e frameworks modernos para criar websites responsivos',
      provider: 'Udemy',
      link: '#',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'Python para Data Science',
      description: 'Domine Python, NumPy, Pandas e Machine Learning com projetos práticos',
      provider: 'Coursera',
      link: '#',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'React.js Avançado',
      description: 'Desenvolva aplicações profissionais com React, Redux e ferramentas modernas',
      provider: 'LinkedIn Learning',
      link: '#',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'UI/UX Design Fundamentals',
      description: 'Design principles, Figma e prototypagem para criar interfaces incríveis',
      provider: 'Skillshare',
      link: '#',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'DevOps & Docker',
      description: 'Containerização, CI/CD e orquestração com Docker e Kubernetes',
      provider: 'Pluralsight',
      link: '#',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'Mobile App com Flutter',
      description: 'Crie aplicativos nativos para iOS e Android com Flutter e Dart',
      provider: 'edX',
      link: '#',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=300',
      title: 'Cloud Computing AWS',
      description: 'Domine serviços AWS, arquitetura em nuvem e certificação profissional',
      provider: 'A Cloud Guru',
      link: '#',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto relative px-4 md:px-0">
      {/* Linhas decorativas de fundo (SVG) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 600" fill="none">
          <path d="M-100 600L1300 -100" stroke="#007E7E" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M200 700L1400 0" stroke="#007E7E" strokeWidth="2" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-[#202020]">
          Navegue pela diversidade de áreas dentro do sector <span className="text-violet-600">tecnologico.</span>
        </h2>
      </div>

      {/* Contentor do carrossel */}
      <div className="relative z-10 group">
        {/* Carrossel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-none w-full md:w-96 min-w-80 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Imagem do curso */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo do curso */}
              <div className="p-5 flex flex-col h-64">
                {/* Título */}
                <h3 className="text-lg font-bold text-[#002D2D] mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {course.description}
                </p>

                {/* Fornecedor */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#303030] bg-[#E8F4F4] px-3 py-1 rounded">
                    {course.provider}
                  </span>
                </div>

                {/* Botão de acesso */}
                <Link href={course.link}>
                  <button className="w-full bg-violet-600 hover:bg-[#4504a6] text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 mt-auto">
                    Acessar Curso
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de navegação */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-[#303030] hover:bg-[#4a4a4a] text-white p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-[#303030] hover:bg-[#4a4a4a] text-white p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Botão de chamada à ação */}
      <div className="flex justify-center mt-12 relative z-10">
        <button className="flex items-center gap-2 bg-violet-600 font-bold text-gray-50 py-3 px-10 rounded hover:bg-[#4504a6] transition-colors shadow-sm group">
          <Link href="/cursos">Ver mais cursos disponíveis</Link>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CuratedCollections;