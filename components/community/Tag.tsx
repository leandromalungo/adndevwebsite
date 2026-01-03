"use client";

import React from 'react';

interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="px-2.5 py-1 text-[11px] text-[#6b7280] border border-[#e5e7eb] rounded-md bg-white whitespace-nowrap">
      {children}
    </span>
  );
};
