"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, Trophy, DollarSign, Calendar } from 'lucide-react';

interface ScholarshipCardProps {
  logo: string;
  title: string;
  amount: string;
  deadline: string;
  description: string;
  tags: string[];
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  logo,
  title,
  amount,
  deadline,
  description,
  tags
}) => {
  return (
    <div className="bg-[#f0f9f9] rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-teal-50/50 min-w-full md:min-w-0">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-sm border border-gray-100">
          <img src={logo} alt={title} className="w-10 h-10 object-contain" />
        </div>
        <h3 className="text-lg font-bold text-[#1f2937] leading-tight pt-1">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1 text-[#4b5563] text-xs font-bold uppercase tracking-wider mb-1">
            <DollarSign className="w-3.5 h-3.5" /> Amount:
          </div>
          <div className="text-xl font-extrabold text-[#111827]">{amount}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#4b5563] text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" /> Deadline:
          </div>
          <div className="text-base font-extrabold text-[#111827]">{deadline}</div>
        </div>
      </div>

      <p className="text-[#4b5563] text-sm leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-white px-3 py-1.5 rounded-md text-[11px] font-bold text-[#374151] border border-gray-100 shadow-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[#9ca3af]">
          <button className="hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hover:text-yellow-500 transition-colors">
            <Trophy className="w-5 h-5" />
          </button>
        </div>
        <button className="bg-[#f26533] hover:bg-[#e05626] text-white font-black py-2.5 px-8 rounded-lg transition-all duration-200 text-sm shadow-md active:scale-95">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export const ScholarshipListSection: React.FC = () => {
  const scholarships = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Dolly_Parton_logo.png",
      title: "Dolly Parton Songwriters Award",
      amount: "$20,000",
      deadline: "January 15, 2026",
      description: "The Dolly Parton Songwriters Award is a prestigious annual competition designed for young songwriters to showcase their talent and creativity.",
      tags: ["Artistic Ability", "Current Year in School"]
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/National_FFA_Organization_logo.svg/1200px-National_FFA_Organization_logo.svg.png",
      title: "National FFA Scholarship Program",
      amount: "$10,000",
      deadline: "January 15, 2026",
      description: "Through the National FFA Foundation, businesses and individuals support scholarships that are awarded to members who are future leaders.",
      tags: ["Organization Selections", "Current Year in School"]
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/Red_cross_icon.svg",
      title: "American Red Cross - Leaders Save Lives Scholarship",
      amount: "$2,500",
      deadline: "January 15, 2026",
      description: "Sign up to host a blood drive while school is out of session and join the impressive group of youth leaders who help save lives.",
      tags: ["Current Year in School", "Personal Interest/Attribute"]
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/NASA_logo.svg/1200px-NASA_logo.svg.png",
      title: "NASA Space Grant Consortium",
      amount: "$15,000",
      deadline: "March 01, 2026",
      description: "Providing opportunities for students to pursue careers in science, technology, engineering, and mathematics through NASA-related research.",
      tags: ["STEM", "Undergraduate"]
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
      title: "Google Generation Scholarship",
      amount: "$10,000",
      deadline: "December 10, 2025",
      description: "The Generation Google Scholarship was established to help aspiring computer scientists excel in technology and become leaders in the field.",
      tags: ["Computer Science", "Diversity"]
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description: "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const updateItemsPerView = useCallback(() => {
    if (window.innerWidth < 768) {
      setItemsPerView(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2);
    } else {
      setItemsPerView(3);
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  const maxIndex = Math.max(0, scholarships.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Logic for dots (indicators)
  // We want to show a dot for each "viewable" start position
  const dotsCount = maxIndex + 1;

  return (
    <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start mb-10">
          <button className="border-2 border-[#0d9488] text-[#0d9488] font-black py-2 px-6 rounded-lg hover:bg-teal-50 transition-colors text-sm uppercase tracking-tight">
            See All Scholarships
          </button>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 z-10 transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'}`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 z-10 transition-all ${currentIndex === maxIndex ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50'}`}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Carousel Viewport */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                gap: '1.5rem' // Standard tailwind gap-6 is 1.5rem
              }}
            >
              {scholarships.map((s, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    flex: `0 0 calc(${(100 / itemsPerView)}% - ${(itemsPerView - 1) * 1.5 / itemsPerView}rem)` 
                  }}
                >
                  <ScholarshipCard {...s} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i 
                  ? 'w-8 bg-[#2dd4bf]' 
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
