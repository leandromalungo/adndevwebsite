"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Post } from '@/data/types';

interface TrendingGridProps {
  posts: Post[];
  title: string;
}

const TrendingGrid: React.FC<TrendingGridProps> = ({ posts, title }) => {
  const totalItems = posts.length;
  // We use a tripled array to enable seamless infinite looping
  const displayPosts = [...posts, ...posts, ...posts];
  
  // Start at the beginning of the middle set
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 3500);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [totalItems]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Handle the seamless jump at the end of transition
  const handleTransitionEnd = () => {
    // If we've moved into the third set, jump back to the middle set
    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - totalItems);
    } 
    // If we've moved into the first set, jump forward to the middle set
    else if (currentIndex < totalItems) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + totalItems);
    }
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(totalItems + index);
    startTimer();
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    stopTimer();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Optional: could implement real-time following of finger here
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
    startTimer();
  };

  // Calculate current dot index
  const activeDot = currentIndex % totalItems;

  return (
    <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* Section Title with Dividers */}
        <div className="flex items-center justify-center mb-12">
            <div className="h-[1px] bg-gray-100 flex-grow"></div>
            <h2 className="px-6 text-2xl font-black text-[#0e2a47] uppercase tracking-tighter flex items-center">
                {title}
            </h2>
            <div className="h-[1px] bg-gray-100 flex-grow"></div>
        </div>

        {/* Sliding Viewport */}
        <div 
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={containerRef}
            className={`flex space-x-6 ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ 
              // The transform logic needs to account for the responsive widths of the cards
              // On desktop (lg), we show 4 items. So 1 item is 25%.
              // We'll use CSS variables to manage the shift cleanly
              transform: `translateX(calc(-${currentIndex} * var(--card-width)))`,
            }} 
          >
            {displayPosts.map((post, index) => (
              <div 
                key={`${post.id}-${Math.floor(index / totalItems)}-${index % totalItems}`} 
                className="flex-shrink-0 w-[var(--card-width-raw)] group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-600/30 hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={post.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={post.title} 
                    draggable="false"
                  />
                  <div className="absolute top-2 left-2">
                      <span className="text-[8px] font-black text-white uppercase px-2 py-0.5 rounded shadow-sm" style={{ backgroundColor: post.categoryColor }}>
                          {post.category}
                      </span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#0e2a47] leading-snug group-hover:text-blue-600 mb-4 line-clamp-2 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase">
                  <span>By {post.author}</span>
                  <span>{post.commentsCount || 0} Comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination Dots - Mapped to original 6 items */}
        <div className="flex justify-center space-x-2 mt-10">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 outline-none ${
                  activeDot === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
        </div>
      </div>

      <style>{`
        :root {
          --card-gap: 24px;
        }
        
        /* Mobile: 1 card visible */
        section {
            --card-width-raw: 100%;
            --card-width: calc(100% + var(--card-gap));
        }

        /* Tablet: 2 cards visible */
        @media (min-width: 640px) {
            section {
                --card-width-raw: calc(50% - (var(--card-gap) / 2));
                --card-width: calc(50% + (var(--card-gap) / 2));
            }
        }

        /* Desktop: 4 cards visible */
        @media (min-width: 1024px) {
            section {
                --card-width-raw: calc(25% - (var(--card-gap) * 0.75));
                --card-width: calc(25% + (var(--card-gap) / 4));
            }
        }
      `}</style>
    </section>
  );
};

export default TrendingGrid;
