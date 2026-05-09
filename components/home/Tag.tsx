"use client";

import React from 'react';

interface TagProps {
  label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {

  return (
    <div className="inline-flex items-center pb-1 border-b border-violet-600 text-gray-50">
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};