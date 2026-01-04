"use client";

import React from 'react';

const ImpactSection: React.FC = () => {
  const stats = [
    {
      value: "40,000",
      description: "Learners reached through live and virtual workshops since 2011."
    },
    {
      value: "4,766",
      description: "Learners took part in our programs in 2024, driving a 47% year-over-year growth and expanding access to tech across communities."
    },
    {
      value: "8M+",
      description: "Global learners viewed our digital content, with 100k subscribers and counting."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#1e293b] mb-6 uppercase">
            Nossos alcance
          </h2>
          <p className="text-[#64748b] text-base sm:text-lg max-w-3xl leading-relaxed">
            We're closing the opportunity gap for the next generation of innovators— from elementary school to early career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-3xl lg:text-6xl font-semibold text-[#1e293b] mb-4 tracking-tight">
                {stat.value}
              </span>
              <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
