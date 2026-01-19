"use client";

import React from 'react';

const DecorativeGrid: React.FC = () => {
  // Vamos construir o padrão de grade visto no canto inferior direito da imagem
  // É uma mistura de blocos brancos e ícones "X" em um layout de grade
  
  const CrossBox = () => (
    <div className="w-16 h-16 border border-gray-400 flex items-center justify-center relative bg-white">
      <div className="absolute w-[120%] h-px bg-black rotate-45"></div>
      <div className="absolute w-[120%] h-px bg-black -rotate-45"></div>
    </div>
  );

  const WhiteBox = () => (
    <div className="w-16 h-16 bg-white border border-gray-200"></div>
  );

  const BlackBox = () => (
    <div className="w-16 h-16 bg-black"></div>
  );

  const CheckerBox = () => (
    <div className="w-16 h-16 grid grid-cols-2 grid-rows-2">
      <div className="bg-white"></div>
      <div className="bg-black"></div>
      <div className="bg-black"></div>
      <div className="bg-white"></div>
    </div>
  );

  return (
    <div className="flex justify-end items-end select-none pointer-events-none opacity-90">
      <div className="flex flex-col items-end">
        {/* Floating single white dot seen in the image */}
        <div className="w-2 h-2 bg-white mb-8 mr-12"></div>
        
        <div className="flex">
          {/* Row 1 */}
          <CheckerBox />
          <div className="w-16 h-16 bg-transparent"></div>
          <div className="flex">
            <WhiteBox />
            <BlackBox />
            <CrossBox />
            <BlackBox />
            <WhiteBox />
            <CrossBox />
            <BlackBox />
            <WhiteBox />
          </div>
        </div>
        
        <div className="flex">
          {/* Row 2 */}
          <CheckerBox />
          <div className="w-16 h-16 bg-transparent"></div>
          <div className="flex">
            <BlackBox />
            <WhiteBox />
            <CrossBox />
            <WhiteBox />
            <BlackBox />
            <CrossBox />
            <WhiteBox />
            <BlackBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorativeGrid;
