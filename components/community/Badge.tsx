
import React from 'react';

interface BadgeProps {
  label: string;
  value?: string | number;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, value, className = "" }) => {
  return (
    <div className={`flex items-center text-[10px] font-semibold overflow-hidden rounded ${className}`}>
      <span className="bg-[#2d2d2d] text-white px-2 py-1 uppercase tracking-tight">
        {label}
      </span>
      {value !== undefined && (
        <span className="bg-white text-[#555] border-y border-r border-[#e5e7eb] px-2 py-1 min-w-[30px] text-center">
          {value}
        </span>
      )}
    </div>
  );
};
