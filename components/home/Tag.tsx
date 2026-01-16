"use client";

import React, { useState } from 'react';

interface TagProps {
  label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button 
      onClick={() => setIsSelected(!isSelected)}
      className={`
        group flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-200
        ${isSelected 
          ? 'bg-white/20 border-white text-white' 
          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <div className={`
        w-4 h-4 rounded border flex items-center justify-center transition-colors
        ${isSelected 
          ? 'bg-violet-500 border-violet-500' 
          : 'bg-transparent border-gray-600 group-hover:border-gray-400'
        }
      `}>
        {isSelected && (
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current stroke-[3] stroke-white">
            <polyline points="20 6 9 17 4 12" fill="none" />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};