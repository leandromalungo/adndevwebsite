"use client";

import React from 'react';

export const BigTechBo = () => {
  const supporters = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg' },
    { name: 'Ballmer Group', logo: 'https://www.ballmergroup.org/s/Ballmer_Group_Logo_Primary_H_RGB.png' },
    { name: 'Infosys Foundation', logo: 'https://www.infosys.com/content/dam/infosys-web/en/about/infosys-foundation/images/foundation-usa-logo.png' },
    { name: 'Vista', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Vista_Equity_Partners_logo.svg' },
    { name: 'Gates Foundation', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Bill_%26_Melinda_Gates_Foundation_logo.svg' },
  ];

  return (
    <section className="bg-[#f3f4f6] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <span className="text-[#0ea5e9] font-bold text-xs md:text-sm tracking-wider uppercase">
            Bolsas patrocinadas pelas big techs mundiais
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#1f2937] leading-tight">
            Apoiado por líderes globais
          </h2>
          
          <p className="text-[#4b5563] text-lg leading-relaxed max-w-lg">
            We are supported by top companies, foundations, and philanthropists who believe in our mission. 
            Together, we're expanding access to AI and computer science education for students everywhere.
          </p>

          <div className="pt-4">
            <button className="bg-[#006eff] hover:bg-[#0c69e3] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-md active:scale-95">
              Ver agora
            </button>
          </div>
        </div>

        {/* Right Side: Logo Grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {supporters.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 flex items-center justify-center h-28 md:h-32 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <img 
                  src={item.logo} 
                  alt={`${item.name} logo`} 
                  className={`max-h-12 md:max-h-16 w-auto object-contain filter ${item.name === 'Facebook' ? 'h-10' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
