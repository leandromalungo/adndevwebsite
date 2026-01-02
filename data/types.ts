
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
  // Social/Blog features
  author: string;
  authorImage: string;
  tags: string[];
  reactions: number;
  commentsCount: number;
  readTime: string;
  topComments?: Comment[];
}

export type Category = 
  | "DOMINGO" 
  | "SEGUNDA" 
  | "TERÇA" 
  | "QUARTA" 
  | "QUINTA" 
  | "SEXTA" 
  | "SABADO";


  // app/data/types.ts

export type QuizState = 'START' | 'QUIZ' | 'RESULT';

export enum CareerType {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  DATA_IA = "DATA_IA",
  PRODUCT = "PRODUCT",
  UX_UI = "UX_UI",
}

// Cada opção de pergunta
export type ScoreWeights = Partial<Record<CareerType, number>>;

export interface QuestionOption {
  id: string;
  text: string;
  weights: ScoreWeights;
}

export interface Question {
  id: number; // você está usando números nos seus IDs
  title: string;
  description: string;
  options: QuestionOption[];
}

// Informações de cada carreira
export interface CareerInfo {
  type: CareerType;
  title: string;
  description: string;
  color: string; // tailwind gradient
  skills: string[];
}
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

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  tag: string;
  startedCount: string;
}
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
  width: string; // Tailwind width class
  label?: string;
  logo?: string;
}

