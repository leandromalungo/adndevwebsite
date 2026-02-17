"use client";

import React from 'react';

interface TagProps {
  label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {

  return (
    <button className="group flex items-center gap-3 px-4 py-2 rounded-xl border transition-all text-gray-50 duration-200">
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};