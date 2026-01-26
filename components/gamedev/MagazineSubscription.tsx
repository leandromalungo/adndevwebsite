
import React from 'react';
import { MAGAZINE_FEATURES } from '@/components/gamedev/constants';
import { Check } from 'lucide-react';

const MagazineSubscription = () => {
  return (
    <div className="w-full relative overflow-hidden bg-[#452b27] py-16 px-4 md:px-12 flex flex-col items-center justify-center text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-0 text-[12rem] font-black italic whitespace-nowrap rotate-12 select-none">GAMEINFORMER</div>
        <div className="absolute -right-20 bottom-0 text-[12rem] font-black italic whitespace-nowrap -rotate-12 select-none">GAMEINFORMER</div>
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        
        {/* Left Side: Magazine Cover */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end">
          <div className="relative group transition-transform duration-500 hover:scale-105 perspective-1000">
            <div className="w-[280px] h-[380px] rounded shadow-2xl overflow-hidden border-r-2 border-white/10 transform -rotate-3 group-hover:rotate-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop" 
                alt="Magazine Cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-0 right-0 flex justify-center">
                <span className="text-white font-black text-2xl italic tracking-tighter drop-shadow-md">GAMEINFORMER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Content */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
            Adquira a revista
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left w-fit">
            {MAGAZINE_FEATURES.map((feature) => (
              <div key={feature.id} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white/80 shrink-0" />
                <span className="text-base md:text-lg font-bold text-white leading-tight">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="bg-[#e52d27] hover:bg-[#c42520] text-white font-black py-4 px-12 rounded-sm shadow-xl transition-all active:scale-95 text-sm uppercase tracking-widest">
              VEJA OS PLANOS
            </button>
          </div>
        </div>

        {/* Right Side: Open Magazine */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <div className="relative group transition-transform duration-500 hover:scale-105 perspective-1000 hidden md:block">
            <div className="w-[320px] h-[240px] bg-white rounded-sm shadow-2xl overflow-hidden transform rotate-6 group-hover:rotate-0 transition-all duration-700 relative">
              <div className="absolute inset-0 flex">
                {/* Left Page */}
                <div className="flex-1 border-r border-black/10 p-4 bg-gray-50 flex flex-col justify-center overflow-hidden">
                   <h4 className="text-[10px] font-black text-black leading-none mb-1">EMBRACING THE</h4>
                   <h4 className="text-3xl font-black text-black leading-none tracking-tighter">CHAOS</h4>
                   <div className="w-full h-1 bg-black/10 my-2" />
                   <div className="space-y-1">
                     <div className="w-full h-1.5 bg-black/5" />
                     <div className="w-[80%] h-1.5 bg-black/5" />
                     <div className="w-[90%] h-1.5 bg-black/5" />
                   </div>
                </div>
                {/* Right Page */}
                <div className="flex-1 p-0 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Spread"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/10" />
                </div>
              </div>
              <div className="absolute inset-y-0 left-1/2 w-[2px] bg-black/20 shadow-inner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineSubscription;
