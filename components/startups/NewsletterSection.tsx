"use client";

import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        {/* Boxed Container */}
        <div className="relative overflow-hidden bg-[#001b3d] rounded-2xl shadow-2xl min-h-[450px] flex items-center">
          
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Swirly Waves Pattern */}
            <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,400 L0,400 Z" fill="none" stroke="#007dfc" strokeWidth="0.5" />
              <path d="M0,120 C150,220 350,20 500,120 C650,220 850,20 1000,120" fill="none" stroke="#007dfc" strokeWidth="0.5" />
              <path d="M0,140 C150,240 350,40 500,140 C650,240 850,40 1000,140" fill="none" stroke="#007dfc" strokeWidth="0.5" />
            </svg>
            
            {/* Concentric Circles in Bottom Right */}
            <div className="absolute -bottom-20 -right-20 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full border border-white" 
                  style={{ 
                    width: `${(i + 1) * 60}px`, 
                    height: `${(i + 1) * 60}px`, 
                    right: 0, 
                    bottom: 0,
                    transform: 'translate(20%, 20%)'
                  }} 
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full px-8 md:px-16 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-white text-center lg:text-left">
                {/* Branding Logo Area */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter">.StartSe</span>
                  <div className="ml-4 flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    </div>
                    <div className="flex gap-1 ml-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-100"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-20"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                  Abra sua cabeça para as novas oportunidades!
                </h2>
                
                <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                  Cadastra-se e receba diariamente o resumo do que importa com a análise do time StartSe!
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
