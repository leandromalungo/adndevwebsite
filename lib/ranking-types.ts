export interface TechnologyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Technology {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  logo_url: string;
  tags: string[];
  upvotes_count: number;
  downvotes_count: number;
  score: number; // upvotes_count - downvotes_count
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TechnologyVote {
  id: string;
  technology_id: string;
  user_id: string;
  vote_type: "up" | "down";
  country_code: string;
  created_at: string;
}

export interface RankingItem extends Technology {
  rank: number;
  userVote: "up" | "down" | null;
  categoryName: string;
  categorySlug: string;
  filteredScore: number;
  filteredUpvotes: number;
  filteredDownvotes: number;
}

export interface LusophoneCountry {
  code: string;
  name: string;
  flag: string;
}

export const LUSOPHONE_RANKING_COUNTRIES: LusophoneCountry[] = [
  { code: "ALL", name: "Todos os Países", flag: "🌍" },
  { code: "AO", name: "Angola", flag: "🇦🇴" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "MZ", name: "Moçambique", flag: "🇲🇿" },
  { code: "CV", name: "Cabo Verde", flag: "🇨🇻" },
  { code: "GW", name: "Guiné-Bissau", flag: "🇬🇼" },
  { code: "ST", name: "São Tomé e Príncipe", flag: "🇸🇹" },
  { code: "TL", name: "Timor-Leste", flag: "🇹🇱" },
  { code: "GQ", name: "Guiné Equatorial", flag: "🇬🇶" },
];

export function normalizeCountryCode(rawCountry?: string | null): string {
  if (!rawCountry) return "AO";
  const upper = rawCountry.trim().toUpperCase();
  const found = LUSOPHONE_RANKING_COUNTRIES.find(
    (c) => c.code === upper || c.name.toUpperCase() === upper
  );
  if (found) return found.code;

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

export interface GetRankingResult {
  items: RankingItem[];
  topThree: RankingItem[];
  total: number;
  page: number;
  totalPages: number;
  categories: TechnologyCategory[];
  activeCountry: LusophoneCountry;
  stats: {
    totalTechnologies: number;
    totalVotes: number;
    topTechnologyName: string;
    activeVotersCount: number;
  };
}
