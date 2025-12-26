
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
