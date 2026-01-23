import React from 'react';

/**
 * TIPOS E INTERFACES DO PROJETO
 * 
 * Este arquivo centraliza todas as interfaces TypeScript usadas
 * em toda a aplicação, garantindo tipagem consistente.
 */

// ============================================
// EVENTOS
// ============================================
/**
 * Interface Event
 * Descreve a estrutura de um evento na plataforma
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  timeRange: string;
  location: string;
  country: string;
  state?: string;
  category?: string;
  organizer: string;
  organizerLogo: string;
  imageUrl: string;
  isOnline: boolean;
  isFree: boolean;
  tags: string[];
  day: string;
  month: string;
}

// ============================================
// FILTROS
// ============================================
/**
 * Type FilterTab
 * Define os países/regiões disponíveis para filtro
 */
export type FilterTab = 'Angola' | 'Brasil' | 'Moçambique' | 'Portugal'| 'São Tomé e Principe' | 'Guiné-Bissau' | 'Cabo-Verde';

// ============================================
// COMENTÁRIOS E EDIÇÕES
// ============================================
/**
 * Interface Comment
 * Estrutura de comentários para blog/redes sociais
 */
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


export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number; // Base price in EUR
  platform: string;
  category: string;
  condition: string;
  rating: number;
  image: string;
  availableCountries: string[]; // List of country codes
  isOwn?: boolean; // Se é produto próprio (true) ou recomendado (false)
  externalStore?: 'aliexpress' | 'amazon' | 'mercadopago' | 'other'; // Loja externa se recomendado
  externalUrl?: string; // URL para o produto na loja externa
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  duration?: string;
  category: string;
  tags: string[];
  image: string;
  availableCountries: string[];
}

export interface VideoHeroProps {
  videoUrl: string;
  fallbackImage?: string;
  overlayOpacity?: number;
  title?: string;
  subtitle?: string;
}

export interface FilterState {
  category: string | null;
  rating: number | null;
  condition: string | null;
  platform: string | null;
  maxPrice: number | null;
  sort: string | null;
}

export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  rate: number; // Exchange rate from 1 EUR
}
export interface Post {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  author: string;
  date: string;
  commentsCount?: number;
  imageUrl?: string;
  videoUrl?: string;
}
