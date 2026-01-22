
import React from 'react';
import { RoadmapItem } from '@/data/types';
import { TechIcon, getCategory, TechCategory } from './TechIcon';

interface RoadmapCardProps {
  item: RoadmapItem;
}

const categoryStyles: Record<TechCategory, {
  hoverBorder: string;
  hoverBg: string;
  hoverShadow: string;
  iconActive: string;
  iconBgActive: string;
  chevronActive: string;
}> = {
  frontend: {
    hoverBorder: 'hover:border-blue-400',
    hoverBg: 'hover:bg-blue-50/40',
    hoverShadow: 'hover:shadow-blue-200/50',
    iconActive: 'group-hover:text-blue-600',
    iconBgActive: 'group-hover:bg-blue-100',
    chevronActive: 'text-blue-400',
  },
  backend: {
    hoverBorder: 'hover:border-emerald-400',
    hoverBg: 'hover:bg-emerald-50/40',
    hoverShadow: 'hover:shadow-emerald-200/50',
    iconActive: 'group-hover:text-emerald-600',
    iconBgActive: 'group-hover:bg-emerald-100',
    chevronActive: 'text-emerald-400',
  },
  database: {
    hoverBorder: 'hover:border-amber-400',
    hoverBg: 'hover:bg-amber-50/40',
    hoverShadow: 'hover:shadow-amber-200/50',
    iconActive: 'group-hover:text-amber-600',
    iconBgActive: 'group-hover:bg-amber-100',
    chevronActive: 'text-amber-400',
  },
  cloud: {
    hoverBorder: 'hover:border-sky-400',
    hoverBg: 'hover:bg-sky-50/40',
    hoverShadow: 'hover:shadow-sky-200/50',
    iconActive: 'group-hover:text-sky-600',
    iconBgActive: 'group-hover:bg-sky-100',
    chevronActive: 'text-sky-400',
  },
  mobile: {
    hoverBorder: 'hover:border-rose-400',
    hoverBg: 'hover:bg-rose-50/40',
    hoverShadow: 'hover:shadow-rose-200/50',
    iconActive: 'group-hover:text-rose-600',
    iconBgActive: 'group-hover:bg-rose-100',
    chevronActive: 'text-rose-400',
  },
  ai: {
    hoverBorder: 'hover:border-indigo-400',
    hoverBg: 'hover:bg-indigo-50/40',
    hoverShadow: 'hover:shadow-indigo-200/50',
    iconActive: 'group-hover:text-indigo-600',
    iconBgActive: 'group-hover:bg-indigo-100',
    chevronActive: 'text-indigo-400',
  },
  security: {
    hoverBorder: 'hover:border-red-400',
    hoverBg: 'hover:bg-red-50/40',
    hoverShadow: 'hover:shadow-red-200/50',
    iconActive: 'group-hover:text-red-600',
    iconBgActive: 'group-hover:bg-red-100',
    chevronActive: 'text-red-400',
  },
  default: {
    hoverBorder: 'hover:border-slate-400',
    hoverBg: 'hover:bg-slate-100/40',
    hoverShadow: 'hover:shadow-slate-200/50',
    iconActive: 'group-hover:text-slate-700',
    iconBgActive: 'group-hover:bg-slate-200',
    chevronActive: 'text-slate-400',
  },
};

export const RoadMapCard: React.FC<RoadmapCardProps> = ({ item }) => {
  const category = getCategory(item.title);
  const theme = categoryStyles[category];

  return (
    <div className={`group relative bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 cursor-pointer flex items-center gap-4 min-h-[80px] shadow-sm hover:shadow-lg ${theme.hoverBorder} ${theme.hoverBg} ${theme.hoverShadow}`}>
      <div className={`flex-shrink-0 p-2.5 rounded-lg bg-slate-50 transition-colors duration-200 text-slate-500 ${theme.iconBgActive} ${theme.iconActive}`}>
        <TechIcon title={item.title} className="w-6 h-6" />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-slate-800 font-semibold text-base group-hover:text-slate-900 transition-colors">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Subtle chevron for better affordance */}
      <div className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 ${theme.chevronActive}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
};
