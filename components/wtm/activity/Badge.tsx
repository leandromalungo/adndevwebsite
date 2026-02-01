
import React from 'react';
import { BadgeType } from '@/data/types';

interface BadgeProps {
  type: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ type }) => {
  if (type === 'evento') {
    return (
      <span className="bg-[#001A72] text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
        evento
      </span>
    );
  }

  return (
    <span className="border-2 border-dotted border-[#00BFFF] text-[#00BFFF] px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white">
      artigo
    </span>
  );
};

export default Badge;
