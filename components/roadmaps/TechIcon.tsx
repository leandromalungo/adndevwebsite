
import React from 'react';

export type TechCategory = 'database' | 'cloud' | 'frontend' | 'mobile' | 'ai' | 'security' | 'backend' | 'default';

export const getCategory = (title: string): TechCategory => {
  const t = title.toLowerCase();
  
  // Categorias priorizadas por palavras-chave
  if (t.includes('sql') || t.includes('mongo') || t.includes('redis') || t.includes('elastic') || t.includes('data')) return 'database';
  
  if (t.includes('aws') || t.includes('cloud') || t.includes('docker') || t.includes('kubernetes') || t.includes('terra') || t.includes('devops') || t.includes('sre') || t.includes('iac') || t.includes('infrastructure')) return 'cloud';
  
  if (t.includes('react') || t.includes('vue') || t.includes('angular') || t.includes('next') || t.includes('html') || t.includes('css') || t.includes('frontend') || t.includes('design') || t.includes('figma') || t.includes('svelte') || t.includes('tailwind') || t.includes('a11y') || t.includes('accessibility')) return 'frontend';
  
  if (t.includes('ios') || t.includes('android') || t.includes('flutter') || t.includes('swift') || t.includes('mobile')) return 'mobile';
  
  if (t.includes('ai') || t.includes('machine') || t.includes('prompt') || t.includes('mlops')) return 'ai';
  
  if (t.includes('security') || t.includes('cyber') || t.includes('sec') || t.includes('testing') || t.includes('qa')) return 'security';
  
  if (t.includes('backend') || t.includes('node') || t.includes('java') || t.includes('php') || t.includes('python') || t.includes('go') || t.includes('server') || t.includes('api') || t.includes('laravel') || t.includes('django') || t.includes('spring') || t.includes('ruby') || t.includes('c#') || t.includes('solidity') || t.includes('web3') || t.includes('embedded') || t.includes('clean code')) return 'backend';
  
  return 'default';
};

interface TechIconProps {
  title: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ title, className = "w-5 h-5" }) => {
  const category = getCategory(title);

  switch (category) {
    case 'database':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      );
    case 'cloud':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19a3.5 3.5 0 0 0 0-7h-1.5a7 7 0 1 0-11 6.5"></path>
        </svg>
      );
    case 'frontend':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case 'mobile':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      );
    case 'ai':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
      );
    case 'security':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
    case 'backend':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
  }
};
