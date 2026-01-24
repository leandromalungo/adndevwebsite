"use client";

import React from "react";
import Image from "next/image";

interface CardHero {
  title: string;
  paragraphs: string[];
}

export const CardHero: React.FC<CardHero> = ({ title, paragraphs }) => {
  return (
    <section className="relative w-full max-w-full overflow-hidden rounded-xl shadow-2xl" style={{ paddingBottom: "calc(100% / 2.33)" }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
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
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 box-border">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight break-words">
            {title}
          </h1>
          <div className="space-y-4">
            {paragraphs.map((text, idx) => (
              <p
                key={idx}
                className="text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed opacity-95 break-words"
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
