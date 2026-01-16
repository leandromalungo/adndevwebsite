"use client";

import React, { useEffect, useState } from 'react';
import DecorativeGrid from './DecorativeGrid';

interface HeroProps {
  title: string;
  description: string;
  videoUrl: string;
  buttonText: string;
}

const Hero: React.FC<HeroProps> = ({ title, description, videoUrl, buttonText }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl">
            {/* Logic to bold the specific part seen in the image if it matches */}
            {description.includes("colocamos a América Latina no radar da inovação") ? (
              <>
                {description.split("colocamos a América Latina no radar da inovação")[0]}
                <span className="font-bold text-white">colocamos a América Latina no radar da inovação.</span>
              </>
            ) : description}
          </p>

          <button className="group relative inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl overflow-hidden">
            <span>{buttonText}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-3 transform transition-transform duration-300 group-hover:translate-x-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

     

      {/* Bottom Right Decorative Pattern */}
      <div className="absolute bottom-0 right-0 z-10 w-full max-w-md hidden md:block opacity-70">
        <DecorativeGrid />
      </div>
    </section>
  );
};

export default Hero;
