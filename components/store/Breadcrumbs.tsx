
import React from 'react';
import { BreadcrumbItem } from '../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <a
            href={item.href}
            className={`hover:text-cyan-600 transition-colors ${
              index === items.length - 1 ? 'underline font-medium text-gray-900' : ''
            }`}
          >
            {item.label}
          </a>
          {index < items.length - 1 && (
            <span className="text-gray-400">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
