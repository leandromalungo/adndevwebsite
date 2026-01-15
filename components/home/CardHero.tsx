"use client";

import React from "react";
import Image from "next/image";

interface CardHero {
  title: string;
  paragraphs: string[];
}

export const CardHero: React.FC<CardHero> = ({ title, paragraphs }) => {
  return (
    <section className="relative w-full overflow-hidden rounded-xl shadow-2xl aspect-[16/9] md:aspect-[21/9] min-h-[400px]">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/img1.jpg"
          alt="heroimg"
          fill
          priority
          className="object-cover object-center opacity-80 grayscale-[30%]"
        />
      </div>

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-gray-700/80 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            {title}
          </h1>
          <div className="space-y-4">
            {paragraphs.map((text, idx) => (
              <p
                key={idx}
                className="text-sm md:text-base lg:text-lg font-medium leading-relaxed opacity-95"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
