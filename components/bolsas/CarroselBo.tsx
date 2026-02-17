"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, DollarSign, Calendar } from "lucide-react";

interface ScholarshipCardProps {
  title: string;
  amount: string;
  deadline: string;
  description: string;
  tags: string[];
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  title,
  amount,
  deadline,
  description,
  tags,
}) => {
  return (
    <div className="bg-[#2e405c] rounded p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-teal-50/50 min-w-full md:min-w-0">
      <div className="flex items-start gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#ffffff] leading-tight pt-1">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1 text-[#d4d5d5] text-xs uppercase tracking-wider mb-1">
            <DollarSign className="w-3.5 h-3.5" /> Mensalidade:
          </div>
          <div className="text-xl text-[#ffffff]">{amount}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#d4d5d5] text-xs uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" /> Data do edital:
          </div>
          <div className="text-base text-[#ffffff]">{deadline}</div>
        </div>
      </div>

      <p className="text-[#ffffff] text-sm leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-white px-3 py-1.5 rounded text-[11px] font-bold text-[#374151] border border-gray-100 shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
            <span className="text-[10px] text-gray-100 mb-1">
              Fonte: Esta bolsa tem as suas fontes devidamente mencionadas nesta postagem sem nenhuma alteração.
            </span>
      <div className="mt-auto pt-4 border-t border-gray-200/50 flex items-center justify-between">
        <button className="bg-[#0080ff] hover:bg-[#0a77e3] text-white py-2.5 px-8 rounded transition-all duration-200 text-sm shadow-md active:scale-95">
          Inscrever
        </button>
      </div>
    </div>
  );
};

export const CarroselBo = () => {
  const scholarships = [
    {
      title: "Dolly Parton Songwriters Award",
      amount: "$20,000",
      deadline: "January 15, 2026",
      description:
        "The Dolly Parton Songwriters Award is a prestigious annual competition designed for young songwriters to showcase their talent and creativity.",
      tags: ["Artistic Ability", "Current Year in School"],
    },
    {
      title: "National FFA Scholarship Program",
      amount: "$10,000",
      deadline: "January 15, 2026",
      description:
        "Through the National FFA Foundation, businesses and individuals support scholarships that are awarded to members who are future leaders.",
      tags: ["Organization Selections", "Current Year in School"],
    },
    {
      title: "American Red Cross - Leaders Save Lives Scholarship",
      amount: "$2,500",
      deadline: "January 15, 2026",
      description:
        "Sign up to host a blood drive while school is out of session and join the impressive group of youth leaders who help save lives.",
      tags: ["Current Year in School", "Personal Interest/Attribute"],
    },
    {
      title: "NASA Space Grant Consortium",
      amount: "$15,000",
      deadline: "March 01, 2026",
      description:
        "Providing opportunities for students to pursue careers in science, technology, engineering, and mathematics through NASA-related research.",
      tags: ["STEM", "Undergraduate"],
    },
    {
      title: "Google Generation Scholarship",
      amount: "$10,000",
      deadline: "December 10, 2025",
      description:
        "The Generation Google Scholarship was established to help aspiring computer scientists excel in technology and become leaders in the field.",
      tags: ["Computer Science", "Diversity"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
    {
      title: "Microsoft Disability Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2026",
      description:
        "A scholarship for high school seniors with disabilities who plan to attend a vocational or academic college and target a career in the technology industry.",
      tags: ["Technology", "Disability Support"],
    },
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
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [updateItemsPerView]);

  const maxIndex = Math.max(0, scholarships.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Lógica para pontos (indicadores)
  // Queremos mostrar um ponto para cada posição inicial "visível"
  const dotsCount = maxIndex + 1;

  // Para swipe/touch
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Para mouse (desktop)
  const [mouseDownX, setMouseDownX] = useState<number | null>(null);
  const [mouseUpX, setMouseUpX] = useState<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownX(e.clientX);
    setMouseUpX(null);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseUpX(e.clientX);
    if (mouseDownX !== null) {
      const distance = mouseDownX - e.clientX;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    setMouseDownX(null);
    setMouseUpX(null);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div
        className="max-w-7xl mx-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex justify-start mb-10">
          <button className="border-2 border-[#0a081d] text-[#0a081d] py-2 px-6 rounded text-sm uppercase tracking-tight">
            Bolsas de estudos
          </button>
        </div>

        <div className="relative group">
          {/* Setas de navegação */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 z-10 transition-all ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gray-50"}`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-100 z-10 transition-all ${currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gray-50"}`}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Janela do carrossel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                gap: "1.5rem", // Standard tailwind gap-6 is 1.5rem
              }}
            >
              {scholarships.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: `0 0 calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 1.5) / itemsPerView}rem)`,
                  }}
                >
                  <ScholarshipCard {...s} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: dotsCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "w-8 bg-[#404040]"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
