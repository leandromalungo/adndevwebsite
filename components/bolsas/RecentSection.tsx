"use client";

import React from 'react';

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, description }) => {
  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="flex flex-col flex-grow p-6 bg-[#2e405c]">
        <h3 className="text-xl font-extrabold text-[#ffffff] mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-[#ffffff] text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <div>
          <button className="border-2 border-[#ffffff] text-[#ffffff] font-bold py-2 px-6 rounded-xl hover:bg-[#0d9488] hover:text-white transition-all duration-200 text-sm">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
};

export const RecentSection = () => {
  const categories = [
    {
      image: "https://images.unsplash.com/photo-1523240715639-99a8080f970c?q=80&w=800&auto=format&fit=crop",
      title: "Scholarships for High School Seniors",
      description: "Your senior year in high school is a crucial time for college preparation. Among the many tasks, finding and applying for college scholarships should be a priority. It's important to start this process early."
    },
    {
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop",
      title: "Scholarships for High School Juniors",
      description: "High school juniors shouldn't wait until senior year to start applying for scholarships. Many scholarship programs are open to juniors, offering them an early opportunity to secure scholarships for college."
    },
    {
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
      title: "Scholarships for Women",
      description: "Women have surpassed men in achieving college degrees. This can be at least partially attributed to the number of scholarships available exclusively for women, enhancing their educational opportunities."
    },
    {
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop",
      title: "Texas Scholarships",
      description: "Scholarships for Texas students supply an enormous amount of financial aid for aspiring students each year. Leveraging Texas scholarships can reduce student loans and make it easier to attend college."
    },
    {
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
      title: "California Scholarships",
      description: "California offers a multitude of scholarship opportunities to undergraduate and graduate students. California scholarships aim to support eligible students in their pursuit of a college education."
    },
    {
      image: "https://images.unsplash.com/photo-1506477331477-33d6d8b3dc85?q=80&w=800&auto=format&fit=crop",
      title: "Florida Scholarships",
      description: "Florida is the third largest state in the United States and offers a number of exclusive scholarships for residents. Discover the best Florida scholarships, where to find them and how to apply."
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4 uppercase">
            Bolsas de estudo <span className="font-light">mais recorente</span>
          </h2>
          <p className="text-[#4b5563] text-lg md:text-xl font-medium mb-8">
            We provide expert scholarship advice to help you pay for college.
          </p>
          <button className="bg-[#620fe7] hover:bg-[#5815c4] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-md active:scale-95">
            Assinar
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
