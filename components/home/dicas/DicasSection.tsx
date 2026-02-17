"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "./DicasCard";
import { MOCK_TIPS } from "@/data/mockTips";

const DicasSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const posts = MOCK_TIPS.map((tip) => ({
    image: tip.image,
    title: tip.title,
    link: `/dicas/${tip.slug}`,
    readTime: tip.readTime,
  }));

  // Logic for responsive items per view
  // Mobile: 1, Tablet: 2, Desktop: 3
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = posts.length - itemsPerView + 1;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      // Fix: Ensured the assignment matches the ReturnType<typeof setInterval>
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  return (
    <section
      className="max-w-6xl mx-auto px-4 overflow-hidden mb-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-4xl md:text-5xl font-normal text-[#2d3748] tracking-tight">
          Dicas de mercado de trabalho
        </h2>

        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="relative">
        <div
          className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(0.45,0,0.55,1)]"
          style={{
            transform: `translateX(-${activeIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicatores */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              activeIndex === i ? "w-8 bg-[#272727]" : "w-2 bg-gray-200"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default DicasSection;
