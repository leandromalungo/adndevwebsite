"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BootcampCard from './BootcampCard';

const BootcampsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bootcamps = [
    {
      name: "Springboard",
      rating: 4.6,
      reviews: 1763,
      description: "Springboard is an online learning platform that prepares students for the tech industry's most in-demand careers with comprehensive, mentor-led online programs in software engin...",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Springboard_Logo.png/600px-Springboard_Logo.png",
      logoBg: "bg-white"
    },
    {
      name: "Flatiron School",
      rating: 4.5,
      reviews: 581,
      description: "Flatiron School offers immersive on-campus and online programs in software engineering, data science, cybersecurity, and artificial intelligence. Flatiron School's immersive cou...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfF8rG0_3R0-I7U_Q4J7zY_7vR-p_4S7_Q6Q&s",
      logoBg: "bg-[#00a9e0]"
    },
    {
      name: "TripleTen",
      rating: 4.8,
      reviews: 509,
      description: "TripleTen is a family of digital re-skilling products offering 20-46-week online programs in AI and Machine Learning, AI Automation, AI Software Engineering, Quality Assurance (...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0t_G7v5v5v5v5v5v5v5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-black"
    },
    {
      name: "Le Wagon",
      rating: 4.9,
      reviews: 2150,
      description: "Le Wagon is a global leader in immersive tech training. We help you learn the skills you need to change your life or accelerate your career in Web Dev and Data Science...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S_yWk6C5_LzG5Z5_5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-[#FD1015]"
    },
    {
      name: "General Assembly",
      rating: 4.4,
      reviews: 3200,
      description: "General Assembly is a pioneer in education and career transformation, specializing in today’s most in-demand skills: coding, data, design, marketing, and business...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_S_yWk6C5_LzG5Z5_5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-red-600"
    },
    {
      name: "BrainStation",
      rating: 4.7,
      reviews: 890,
      description: "BrainStation is the global leader in digital skills training, empowering businesses and professionals to succeed in the digital age through data-driven bootcamps...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_S_yWk6C5_LzG5Z5_5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-white"
    },
    {
      name: "App Academy",
      rating: 4.5,
      reviews: 1100,
      description: "App Academy is one of the world's best coding schools. We provide intensive training for software engineers to help them find their dream jobs at top companies...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcP_S_yWk6C5_LzG5Z5_5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-[#ff5a5f]"
    },
    {
      name: "CareerFoundry",
      rating: 4.6,
      reviews: 750,
      description: "CareerFoundry is an online school that helps you build the skills you need for a job in tech. Learn UI Design, UX Design, Data Analytics, or Web Development...",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcM_S_yWk6C5_LzG5Z5_5v5v5v5v5v5v5v5v5v&s",
      logoBg: "bg-[#01262d]"
    }
  ];

  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = bootcamps.length - itemsPerView + 1;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  return (
    <section 
    className="max-w-6xl mx-auto px-4 overflow-hidden mb-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-normal text-[#2d3748] tracking-tight mb-2">
            Bootcamps para ti.
          </h2>
          <p className="text-[#718096] text-sm">
            Schools may compensate Course Report for featured placement.
          </p>
        </div>

        {/* Desktop Arrows */}
        <div className="hidden md:flex gap-2">
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors group"
            aria-label="Previous bootcamp"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors group"
            aria-label="Next bootcamp"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="relative">
        <div 
          className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]"
          style={{ transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)` }}
        >
          {bootcamps.map((bootcamp, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <BootcampCard {...bootcamp} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeIndex === i ? 'w-8 bg-[#030303]' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BootcampsSection;
