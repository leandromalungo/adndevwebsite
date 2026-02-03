
import { useState, useEffect, useCallback } from 'react';
import { Activity } from '@/data/types';
import ActivityCard from '@/components/wtm/activity/ActivityCard';
import { ChevronRight } from '@/components/wtm/activity/constants';

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Tech Community Get-Together',
    description: 'Um encontro descontraído para partilha de conhecimento e networking entre entusiastas de tecnologia em Lisboa.',
    year: '2022',
    location: '42 LISBOA',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    types: ['evento'],
    link: '#'
  },
  {
    id: '2',
    title: 'Hackathon WE4CHANGE',
    description: 'Dois dias intensos de ideação e desenvolvimento focados em soluções inovadoras para as alterações climáticas.',
    year: '2022',
    location: 'RESENDE',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
  {
    id: '3',
    title: 'Hackathon WE4CHANGE',
    description: 'A edição de Almada do desafio nacional que une competências digitais ao empreendedorismo social e ambiental.',
    year: '2022',
    location: 'ALMADA',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
  {
    id: '4',
    title: 'Jogof issões',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
    {
    id: '5',
    title: 'Jogo das Profissões',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
    {
    id: '6',
    title: 'Jogo',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
    {
    id: '7',
    title: 'Profissões',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
    {
    id: '8',
    title: 'Jogo Profissões',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  },
    {
    id: '9',
    title: 'Jogo das',
    description: 'Uma iniciativa lúdica para inspirar as gerações futuras sobre as diversas carreiras no mundo da tecnologia.',
    year: '2021',
    location: 'DIA DA CRIANÇA',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
    types: ['evento', 'artigo'],
    link: '#'
  }
];

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const updateSlides = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      if (w >= 1024) setSlidesPerView(10);
      else if (w >= 768) setSlidesPerView(3);
      else if (w >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  const displayActivities = [...activities, ...activities, ...activities];
  const offsetIndex = currentIndex + activities.length;
  const slideWidthPercent = 100 / slidesPerView; 

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  useEffect(() => {
    if (currentIndex === activities.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (currentIndex === -1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(activities.length - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex, activities.length]);

  return (
    <section className="max-w-[1440px] mx-auto px-10 py-20 overflow-hidden">
      <div className="flex items-center justify-between mb-16 px-2">
        <h2 className="text-[36px] text-gray-800 tracking-tight">
          Atividades
        </h2>
        
      </div>

      <div className="relative group">
        <div 
          className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : 'transition-none'}`}
          style={{ transform: `translateX(-${offsetIndex * slideWidthPercent}%)` }}
        >
          {displayActivities.map((activity, idx) => (
            <div 
              key={`${activity.id}-${idx}`} 
              className="flex-shrink-0"
              style={{ width: `calc(${slideWidthPercent}% - 18px)` }}
            >
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white w-[64px] h-[64px] rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#001A72] hover:scale-105 transition-all z-20 border border-gray-50"
          aria-label="Seguinte"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div className="flex justify-center items-center gap-3 mt-16">
        {activities.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full border-2 border-[#001A72] ${
              ((currentIndex % activities.length + activities.length) % activities.length) === idx 
                ? 'w-3 h-3 bg-[#001A72]' 
                : 'w-3 h-3 bg-transparent'
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default ActivitiesSection;
