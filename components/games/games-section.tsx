// Exemplo: components/games/hero.tsx
"use client"; // adicione esta linha no topo
// resto do código...

import React from 'react';
import { 
  Search, 
  ShieldCheck, 
  Folder, 
  Heart, 
  ShoppingCart, 
  LayoutGrid, 
  User, 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean }> = ({ children, active }) => (
  <a href="#" className={`text-xs font-bold uppercase tracking-wider hover:text-blue-400 transition-colors ${active ? 'text-white' : 'text-gray-300'}`}>
    {children}
  </a>
);

const StatItem: React.FC<{ icon: React.ReactNode; text: string; boldPart: string }> = ({ icon, text, boldPart }) => (
  <div className="flex items-center gap-2 text-[11px] text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <span>{text} <span className="font-bold">{boldPart}</span></span>
  </div>
);

const CategoryCard: React.FC<{ title: string; imageUrl: string }> = ({ title, imageUrl }) => (
  <div className="flex flex-col group cursor-pointer">
    <div className="aspect-video overflow-hidden shadow-sm border border-gray-200 mb-2" style={{ borderRadius: '0.5rem' }}>
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <span className="text-[10px] font-bold text-[#1E40AF] text-center uppercase tracking-widest mt-1">
      {title}
    </span>
  </div>
);

export const AssetStoreSection: React.FC = () => {
  return (
    <div className="w-full font-sans bg-white overflow-hidden mb-20">
      {/* Top Black Header */}
      

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between flex-wrap gap-4">
        <StatItem icon={<Star className="w-3.5 h-3.5" />} text="Over" boldPart="13,000 top-rated assets" />
        <StatItem icon={<ThumbsUp className="w-3.5 h-3.5" />} text="Rated by" boldPart="85,000+ customers" />
        <StatItem icon={<MessageSquare className="w-3.5 h-3.5" />} text="Supported by" boldPart="100,000+ forum members" />
        <StatItem icon={<CheckCircle2 className="w-3.5 h-3.5" />} text="Every asset" boldPart="moderated by Unity" />
      </div>

      {/* Hero Banner Section */}
      <div className="relative h-80 bg-sky-950 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Sky Background with simulated clouds/elements */}
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover blur-sm" 
            alt="background" 
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">2D</h1>
          <p className="text-white text-sm md:text-base leading-relaxed font-medium opacity-90 drop-shadow-md">
            We offer a wide range of assets for 2D game development, including <br className="hidden md:block"/>
            characters, environments, fonts, GUI elements, textures, and materials.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-360 mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <CategoryCard 
            title="Free" 
            imageUrl="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" 
          />
          <CategoryCard 
            title="Shop All" 
            imageUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" 
          />
          <CategoryCard 
            title="Characters" 
            imageUrl="https://images.unsplash.com/photo-1614728263952-84ea206f25b1?auto=format&fit=crop&q=80&w=400" 
          />
          <CategoryCard 
            title="Environments" 
            imageUrl="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400" 
          />
          <CategoryCard 
            title="GUI" 
            imageUrl="https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=400" 
          />
          <CategoryCard 
            title="Textures & Materials" 
            imageUrl="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400" 
          />
        </div>

        {/* Footer Link */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-1 text-[11px] font-bold text-gray-800 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
            Show 1 more
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
