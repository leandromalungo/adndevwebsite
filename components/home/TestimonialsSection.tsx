"use client";

import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  name?: string;
  role: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      text: "Great group, amazing energy, and I was able to receive so much help and assistance in the areas I need help in. I really enjoyed it here!",
      name: "Raleigh-Durham",
      role: "Workshop student, Unreal Game Create",
      avatar: "https://picsum.photos/100/100?random=11"
    },
    {
      text: "I liked that the workshop was concise while still showing us a full tour and a full description of classes including example projects. I like the connection between music and technology and will consider it in the future.",
      role: "Workshop student, NYU BGC New York",
      avatar: "https://picsum.photos/100/100?random=12"
    },
    {
      text: "Attending AfroTech was a transformative experience that reinforced the power of representation and community in tech. The connections and insights I gained have sharpened my focus on using technology to drive meaningful impact.",
      role: "AfroTech conference scholarship recipient",
      avatar: "https://picsum.photos/100/100?random=13"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 text-center">
        <div className="mb-12">
          <h3 className="text-lg font-bold text-[#1e293b] mb-2">Testemunhos</h3>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1e293b]">
            Hear What The Girls Have To Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10 transition-transform hover:scale-[1.02]">
              {/* White Top Section */}
              <div className="bg-white p-8 sm:p-10 flex flex-col items-start text-left flex-grow">
                <Quote className="w-12 h-12 text-[#475569] mb-6 rotate-180 fill-current opacity-20" />
                <p className="text-[#475569] text-base leading-relaxed">
                  {t.text}
                </p>
              </div>
              
              {/* Orange Bottom Section */}
              <div className="bg-[#1e293b] p-6 flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                  <img src={t.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col text-white">
                  {t.name && <span className="font-bold text-sm leading-tight">{t.name}</span>}
                  <span className="text-[13px] font-medium opacity-90 leading-tight">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#1e293b] text-base sm:text-lg font-medium leading-relaxed">
            These stories are just a glimpse of the impact Black Girls Code is making every day — join us and help build a future where every girl sees herself in tech.
          </p>
          <div>
            <a 
              href="#" 
              className="text-[#1e293b] font-bold text-lg underline hover:text-white transition-colors decoration-2 underline-offset-4"
            >
              Discover ways you can get involved now.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
