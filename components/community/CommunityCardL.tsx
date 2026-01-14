import React from 'react';
import { CommunityItem } from '@/data/types';

interface CommunityCardProps {
  item: CommunityItem;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ item }) => {
  return (
    <a
      href={item.href}
      className="flex items-center gap-5 p-6 bg-white border border-slate-200 hover:border-blue-400 hover:bg-slate-50 rounded-xl transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>
      <span className="text-slate-800 font-semibold text-[17px] leading-snug tracking-tight text-center flex-grow">
        {item.title}
      </span>
    </a>
  );
};
