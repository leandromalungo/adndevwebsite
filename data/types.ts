import React from 'react';
// Eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  timeRange: string;
  location: string;
  country: string;
  organizer: string;
  organizerLogo: string;
  imageUrl: string;
  isOnline: boolean;
  isFree: boolean;
  tags: string[];
  day: string;
  month: string;
}

// Filter Tabs
export type FilterTab = 'Angola' | 'Brasil' | 'Moçambique' | 'Portugal'| 'São Tomé e Principe' | 'Guiné-Bissau' | 'Cabo-Verde';

// Comentários e edições (para blog/social)
export interface Comment {
  author: string;
  authorImage: string;
  text: string;
  timeAgo: string;
}

export interface Edition {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  relativeTime: string;
  imageUrl: string;
  category?: string;
  hasLogo?: boolean;
  author: string;
  authorImage: string;
  tags: string[];
  reactions: number;
  commentsCount: number;
  readTime: string;
  topComments?: Comment[];
}

// Comunidade e Projetos
export interface Community {
  id: string;
  name: string;
  location: string;
  description: string;
  logoUrl: string;
  members: number;
  type: string;
  category: string;
  tags: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  isNew?: boolean;
}

export type Difficulty = 'Junior' | 'Pleno' | 'Senior';

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tag: string;
  startedCount: string;
}

// Notícias e Hero
export interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  dateBadge?: string;
}

export interface HeroProps {
  items: NewsItem[];
}

// Mídia
export enum AspectRatio {
  SQUARE = 'aspect-square',
  LANDSCAPE = 'aspect-video',
  PORTRAIT = 'aspect-[9/16]',
  WIDE = 'aspect-[4/3]'
}

export interface MediaItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  aspectRatio: AspectRatio;
  width: string;
  label?: string;
  logo?: string;
}
export interface CommunityItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}


export interface SlideData {
  id: number;
  title: string;
  description: string;
  boldKeywords: string[];
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

export interface LeadershipCardData {
  id: string;
  type: 'intro' | 'person';
  title?: string;
  subtitle?: string;
  description?: string;
  name?: string;
  role?: string;
  image?: string;
  timeAgo?: string;
  sessionTitle?: string;
  status?: string;
}
export interface SheBuildsCardData {
  id: string;
  type: 'intro' | 'hackathon' | 'workshop';
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  timeAgo?: string;
  status?: string;
  label?: string;
}
