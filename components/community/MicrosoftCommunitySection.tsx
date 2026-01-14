import React from 'react';
import { CommunityItem } from '@/data/types';
import { CommunityCard } from '@/components/community/CommunityCardL';

const Icons: Record<string, React.ReactNode> = {
  AI: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#3B82F6" fillOpacity="0.2"/>
      <path d="M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" fill="#60A5FA"/>
      <path d="M12 7v2m0 6v2m-5-5h2m6 0h2m-1.5-3.5l-1.5 1.5m-4 4l-1.5 1.5m7 0l-1.5-1.5m-4-4l-1.5-1.5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M12.333 21.083L16 14.5l3.667 6.583h-7.334zM24.75 30H7.25l1.625-2.9L16 14.5l7.125 12.6L24.75 30zM16 2L2 27.1h28L16 2z" fill="#0078D4"/>
    </svg>
  ),
  Data: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M12 13c4.97 0 9-1.343 9-3s-4.03-3-9-3-9 1.343-9 3 4.03 3 9 3z" fill="#6366F1"/>
      <path d="M3 10v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4c0 1.657-4.03 3-9 3s-9-1.343-9-3z" fill="#4F46E5"/>
      <path d="M3 14v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4c0 1.657-4.03 3-9 3s-9-1.343-9-3z" fill="#4338CA"/>
    </svg>
  ),
  Games: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <rect x="2" y="6" width="20" height="12" rx="6" fill="#818CF8"/>
      <circle cx="7" cy="12" r="2" fill="white" fillOpacity="0.4"/>
      <path d="M15 10h4m-2-2v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  M365: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M1 5.5L11 1l12 5.5v11L11 23 1 17.5V5.5z" fill="#D83B01"/>
      <path d="M11 5L3 8.5v7l8 3.5 8-3.5v-7L11 5z" fill="#F1511B"/>
      <path d="M11 7.5L6 10v4l5 2.5 5-2.5v-4l-5-2.5z" fill="white" fillOpacity="0.5"/>
    </svg>
  ),
  DotNet: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <rect width="32" height="32" rx="4" fill="#512BD4"/>
      <path d="M8 10h2v12H8V10zm4 0h6c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4v4h-2V10zm2 6h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z" fill="white"/>
      <circle cx="24" cy="22" r="2" fill="#A291FF"/>
    </svg>
  ),
  PowerPlatform: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#00A67E"/>
      <path d="M12 6L7 9v6l5 3 5-3V9l-5-3z" fill="#33D6AD"/>
      <path d="M12 8.5l2.5 1.5v3L12 14.5 9.5 13v-3L12 8.5z" fill="white" fillOpacity="0.6"/>
    </svg>
  ),
  Security: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#3B82F6"/>
      <circle cx="12" cy="10" r="3" fill="white" fillOpacity="0.5"/>
      <path d="M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const communities: CommunityItem[] = [
  { id: '1', title: 'Inteligência Artificial', icon: Icons.AI, href: '#' },
  { id: '2', title: 'Azure', icon: Icons.Azure, href: '#' },
  { id: '3', title: 'Dados', icon: Icons.Data, href: '#' },
  { id: '4', title: 'Desenvolvedores de Jogos', icon: Icons.Games, href: '#' },
  { id: '5', title: 'Microsoft 365', icon: Icons.M365, href: '#' },
  { id: '6', title: '.NET', icon: Icons.DotNet, href: '#' },
  { id: '7', title: 'Power Platform', icon: Icons.PowerPlatform, href: '#' },
  { id: '8', title: 'Segurança', icon: Icons.Security, href: '#' },
];

const MicrosoftCommunitySection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Conheça as melhores comunidades para você crescer na área de tecnologia
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-5xl mx-auto leading-relaxed">
           Explore um universo de comunidades dedicadas à tecnologia, onde você pode aprender, compartilhar e crescer profissionalmente. Seja você um iniciante ou um especialista, há um espaço para você se conectar com outros entusiastas e profissionais da área.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((item) => (
            <CommunityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicrosoftCommunitySection;
