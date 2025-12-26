import React from 'react';

interface CollectionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative h-60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${className}`}
    >
      {children}
    </div>
  );
};
