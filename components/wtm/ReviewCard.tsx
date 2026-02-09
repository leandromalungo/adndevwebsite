"use client";

import React from 'react';

interface ReviewCardProps {
  name: string;
  school: string;
  text: string;
  initials: string;
  iconColor?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, school, text, initials, iconColor }) => {
  return (
    <div className="bg-[#f3f7f9] p-6 rounded shadow-sm hover:shadow-md transition-shadow border border-white/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded flex items-center justify-center text-white font-semibold text-xs ${iconColor || 'bg-[#a7e4e4]'}`}>
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-[#1a202c] font-bold text-sm leading-tight">{name}</span>
          <span className="text-[#718096] text-xs font-medium">{school}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-[#4a5568] text-xs leading-relaxed line-clamp-4">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
