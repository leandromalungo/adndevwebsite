export type StartupStage =
  | "Ideação"
  | "Pre-seed"
  | "Seed"
  | "Série A"
  | "Growth"
  | "Consolidada";

export type StartupStatus = "published" | "pending" | "archived";

export interface StartupSector {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface StartupFounder {
  name: string;
  role: string;
  linkedin?: string;
  avatar?: string;
}

export interface StartupSocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface Startup {
  id: string;
  sector_id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url: string;
  cover_url?: string;
  country_code: string;
  stage: StartupStage;
  website_url: string;
  social_links: StartupSocialLinks;
  founded_year: number;
  founders: StartupFounder[];
  status: StartupStatus;
  is_featured: boolean;
  featured_date?: string | null;
  display_order: number;
  followers_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  sector?: StartupSector;
}

export interface StartupComment {
  id: string;
  startup_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  parent_id?: string | null;
  content: string;
  likes_count: number;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  userHasLiked?: boolean;
  replies?: StartupComment[];
}

export interface LusophoneCountry {
  code: string;
  name: string;
  flag: string;
  demonym: string;
}

export const LUSOPHONE_STARTUP_COUNTRIES: LusophoneCountry[] = [
  { code: "ALL", name: "Todos os Países", flag: "🌍", demonym: "Lusófono" },
  { code: "AO", name: "Angola", flag: "🇦🇴", demonym: "Angolana" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", demonym: "Brasileira" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", demonym: "Portuguesa" },
  { code: "MZ", name: "Moçambique", flag: "🇲🇿", demonym: "Moçambicana" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻", demonym: "Cabo-verdiana" },
  { code: "GW", name: "Guiné-Bissau", flag: "🇬🇼", demonym: "Guineense" },
  { code: "ST", name: "São Tomé e Príncipe", flag: "🇸🇹", demonym: "São-tomense" },
  { code: "TL", name: "Timor-Leste", flag: "🇹🇱", demonym: "Timorense" },
  { code: "GQ", name: "Guiné Equatorial", flag: "🇬🇶", demonym: "Equato-guineense" },
];

export const STARTUP_STAGES: StartupStage[] = [
  "Ideação",
  "Pre-seed",
  "Seed",
  "Série A",
  "Growth",
  "Consolidada",
];

export function getCountryByCode(code?: string | null): LusophoneCountry {
  if (!code) return LUSOPHONE_STARTUP_COUNTRIES[0];
  const upper = code.trim().toUpperCase();
  const match = LUSOPHONE_STARTUP_COUNTRIES.find((c) => c.code === upper);
  return match || LUSOPHONE_STARTUP_COUNTRIES[0];
}

export function normalizeStartupCountry(raw?: string | null): string {
  if (!raw) return "AO";
  const upper = raw.trim().toUpperCase();
  const match = LUSOPHONE_STARTUP_COUNTRIES.find(
    (c) => c.code === upper || c.name.toUpperCase() === upper
  );
  if (match && match.code !== "ALL") return match.code;

  if (upper.includes("ANGOLA")) return "AO";
  if (upper.includes("BRASIL") || upper.includes("BRAZIL")) return "BR";
  if (upper.includes("PORTUGAL")) return "PT";
  if (upper.includes("MOCAMBIQUE") || upper.includes("MOÇAMBIQUE")) return "MZ";
  if (upper.includes("CABO VERDE") || upper.includes("CAPE VERDE")) return "CV";
  if (upper.includes("GUINE-BISSAU") || upper.includes("GUINÉ-BISSAU")) return "GW";
  if (upper.includes("SAO TOME") || upper.includes("SÃO TOMÉ")) return "ST";
  if (upper.includes("TIMOR")) return "TL";
  if (upper.includes("EQUATORIAL")) return "GQ";

  return "AO";
}

export interface StartupCardItem extends Startup {
  isFollowing?: boolean;
}

export interface StartupFeedResponse {
  featuredToday: StartupCardItem | null;
  trendingWeek: StartupCardItem[];
  items: StartupCardItem[];
  sectors: StartupSector[];
  total: number;
  page: number;
  totalPages: number;
  stats: {
    totalPublished: number;
    totalFollowers: number;
    totalComments: number;
    activeCountriesCount: number;
  };
}

export interface StartupDetailResponse {
  startup: StartupCardItem;
  comments: StartupComment[];
  relatedStartups: StartupCardItem[];
  isFollowing: boolean;
}
