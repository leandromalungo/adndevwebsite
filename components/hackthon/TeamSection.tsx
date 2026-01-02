
import React, { useState, useEffect, useCallback } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
}

/**
 * TeamSection Component (Automatic Carousel with Social Links and Navigation Buttons)
 * 
 * Displays team members in a responsive, auto-sliding carousel.
 * Features:
 * - Auto-slide (pauses on hover)
 * - Indicator dots for direct navigation
 * - Next/Previous arrow buttons
 * - Hover effects and social media links
 */
export const TeamSection: React.FC<TeamSectionProps> = ({ title, members }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const updateItemsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) setItemsPerView(6);
    else if (width >= 1024) setItemsPerView(4);
    else if (width >= 768) setItemsPerView(3);
    else if (width >= 640) setItemsPerView(2);
    else setItemsPerView(1);
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  const maxIndex = Math.max(0, members.length - itemsPerView);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section 
      className="w-full bg-[#121212] py-20 px-4 md:px-12 rounded-3xl overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 ml-2 gap-6">
          <h2 className="text-2xl md:text-3xl font-medium text-white">
            {title}
          </h2>
          
          <div className="flex items-center gap-6">
            {/* Indicators */}
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-[150px] md:max-w-full no-scrollbar">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`flex-shrink-0 h-1.5 transition-all duration-500 rounded-full ${
                    currentIndex === idx ? 'bg-white w-8' : 'bg-white/20 w-3 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Nav Buttons (Desktop Header) */}
            <div className="hidden md:flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-90"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-90"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Mobile Overlay Nav Buttons */}
          <div className="md:hidden absolute inset-y-0 -left-2 z-20 flex items-center">
             <button 
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm active:scale-90"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
          </div>
          <div className="md:hidden absolute inset-y-0 -right-2 z-20 flex items-center">
             <button 
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white backdrop-blur-sm active:scale-90"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
          </div>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-default bg-[#1a1a1a]">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col justify-end min-h-[60%]">
                      <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1 transform transition-all duration-500 group-hover:-translate-y-2">
                        {member.name}
                      </h3>
                      <p className="text-white/70 text-[10px] md:text-xs font-semibold uppercase tracking-widest leading-tight mb-4 transform transition-all duration-500 group-hover:-translate-y-2">
                        {member.role}
                      </p>

                      {/* Social Media Links */}
                      <div className="flex gap-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        {member.socials?.instagram && (
                          <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-pink-500 transition-colors">
                            <InstagramIcon className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials?.linkedin && (
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-500 transition-colors">
                            <LinkedinIcon className="w-5 h-5" />
                          </a>
                        )}
                        {member.socials?.facebook && (
                          <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-600 transition-colors">
                            <FacebookIcon className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden mt-8 text-white/30 text-xs text-center font-medium uppercase tracking-widest">
          Slide or use arrows to explore
        </div>
      </div>
    </section>
  );
};

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
