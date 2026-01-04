
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
export type FilterTab = 'Past' | 'Upcoming' | 'Next 7 days' | 'Next 30 days';

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

// Quiz e Carreira
export type QuizState = 'START' | 'QUIZ' | 'RESULT';

export enum CareerType {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  DATA_IA = "DATA_IA",
  PRODUCT = "PRODUCT",
  UX_UI = "UX_UI",
}

export type ScoreWeights = Partial<Record<CareerType, number>>;

export interface QuestionOption {
  id: string;
  text: string;
  weights: ScoreWeights;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  options: QuestionOption[];
}

export interface CareerInfo {
  type: CareerType;
  title: string;
  description: string;
  color: string;
  skills: string[];
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

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

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
