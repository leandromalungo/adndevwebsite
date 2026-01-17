"use client";

import Image from "next/image";
import { Calculator, Book, Pencil, Beaker } from "lucide-react";

// IMPORT DIRETO DA IMAGEM
import heroBg from "@/public/images/imgbol1.jpeg";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white font-sans">
      
      {/* Background Image */}
      <Image
        src={heroBg}
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay 40% */}
      <div className="absolute inset-0 bg-black/70 opacity-4 z-10" />

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-20">
        <Calculator className="absolute top-[10%] left-[5%] w-16 h-16 rotate-12" />
        <Book className="absolute top-[15%] left-[30%] w-20 h-20 -rotate-6" />
        <Pencil className="absolute top-[20%] right-[45%] w-14 h-14 rotate-45" />
        <Beaker className="absolute top-[25%] right-[10%] w-16 h-16 -rotate-12" />
        <div className="absolute bottom-[10%] left-[15%] w-12 h-12 border-4 border-white rotate-45 opacity-50" />
        <div className="absolute bottom-[5%] right-[30%] w-20 h-20 border-t-4 border-l-4 border-white rotate-12 opacity-50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          
          {/* Left Side */}
          <div className="md:pr-12 py-12 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8 max-w-md uppercase">
              Confira as bolsas de estudo de 50% até 100% finaciada
            </h1>
            <p className="mb-10 text-lg lg:text-xl opacity-90 max-w-md">
              Your classmates have earned thousands on RaiseMe. Now it’s your turn.
            </p>
            <button className="bg-white text-[#2b58e6] px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all w-fit">
              Aassinar agora
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
