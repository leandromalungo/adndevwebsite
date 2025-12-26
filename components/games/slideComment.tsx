"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "HackerRank SkillUp received rave reviews. We started with our junior team and have now extended it to our mid-level.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    text: "The learning paths are incredibly well-structured, helping our engineers level up their skills in record time.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200"
  },
  {
    text: "An essential tool for any modern tech team looking to stay ahead of the curve and maintain high standards.",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1200"
  },
  {
    text: "Intuitive, powerful, and deeply impactful. Our development velocity has increased since we started using it.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    text: "The quality of the challenges and projects ensures that our developers are learning practical, real-world skills.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    text: "A game-changer for our recruitment and internal training programs alike.",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200"
  }  
];

export const TestimonialSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000); // Auto-play every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative text-white flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '112.5rem' }}>
      {/* Background Images with Transitions */}
      {testimonials.map((t, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={t.image} 
            alt="Game background" 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* FIXED Overlays */}
      <div className="absolute inset-0 bg-[#020617] opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90"></div>
      <div className="absolute inset-0 bg-[#1E3A8A] mix-blend-multiply opacity-50"></div>

      <div className="relative z-10 max-w-4xl w-full text-center px-6">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-medium mb-12 leading-tight tracking-tight max-w-3xl mx-auto drop-shadow-lg">
          Loved by companies of all sizes and developers from all backgrounds
        </h2>

        {/* Testimonial Content with Smooth Cross-fade */}
        <div className="relative flex items-center justify-center mb-8" style={{ minHeight: '25rem' }}>
          <button 
            onClick={prev}
            className="absolute left-0 md:-left-12 p-2 text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-10 h-10 stroke-[1px]" />
          </button>

          <div className="relative w-full h-full">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                  i === current 
                    ? 'opacity-100 transform-none translate-y-0' 
                    : 'opacity-0 pointer-events-none translate-y-4'
                }`}
              >
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md italic">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={next}
            className="absolute right-0 md:-right-12 p-2 text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-10 h-10 stroke-[1px]" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'bg-white w-8' : 'bg-gray-600 w-2'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
