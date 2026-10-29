import { COMPREHENSIVE_EVENTS } from "@/data/eventsDatabase";
import { bolsas } from "@/data/bolsas";
import { intercambio } from "@/data/intercambio";
import { mockCommunities } from "@/data/dataCommunity";
import type { Event, ScholarshipItem, Community } from "@/data/types";

export type DiscoveryCategory =
  | "todos"
  | "eventos"
  | "hackathons"
  | "bolsas"
  | "cursos"
  | "comunidades"
  | "startups"
  | "mulheres_ti"
  | "game_dev"
  | "intercambio";

export type DiscoveryFormat = "todos" | "online" | "presencial" | "hibrido";
export type DiscoveryStatus = "todos" | "ativos" | "encerrados";
export type DiscoveryPrice = "todos" | "gratis" | "pago";

export interface DiscoveryItem {
  id: string;
  title: string;
  description: string;
  category: DiscoveryCategory;
  categoryLabel: string;
  country: string;
  location?: string;
  format: "online" | "presencial" | "hibrido";
  isFree: boolean;
  isExpired: boolean;
  dateOrDeadline?: string;
  dateBadge?: {
    day: string;
    month: string;
  };
  organizer?: string;
  organizerLogo?: string;
  imageUrl: string;
  link: string;
  isExternalLink: boolean;
  tags: string[];
  membersCount?: number;
  highlightBadge?: string;
}

/**
 * Normaliza datas para deteção de estado expirado
 */
export function checkIsExpired(dateStr?: string | null): boolean {
  if (!dateStr) return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Formato YYYY-MM-DD
    const ymd = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymd) {
      const [, year, month, day] = ymd.map(Number);
      const target = new Date(year, month - 1, day);
      return target.getTime() < today.getTime();
    }

    // Formato DD-MM-YYYY
    const dmy = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (dmy) {
      const [, day, month, year] = dmy.map(Number);
      const target = new Date(year, month - 1, day);
      return target.getTime() < today.getTime();
    }

    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      parsed.setHours(0, 0, 0, 0);
      return parsed.getTime() < today.getTime();
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Identifica se um evento/hackathon pertence a categorias especiais (mulheres na TI, game dev, etc.)
 */
function detectSpecialCategory(title: string, desc: string, tags: string[] = []): DiscoveryCategory | null {
  const text = `${title} ${desc} ${tags.join(" ")}`.toLowerCase();

  if (
    text.includes("women") ||
    text.includes("mulher") ||
    text.includes("wtm") ||
    text.includes("meninas") ||
    text.includes("shebuilds") ||
    text.includes("female")
  ) {
    return "mulheres_ti";
  }

  if (
    text.includes("game") ||
    text.includes("jogos") ||
    text.includes("unity") ||
    text.includes("unreal") ||
    text.includes("godot")
  ) {
    return "game_dev";
  }

  if (
    text.includes("hackathon") ||
    text.includes("maratona") ||
    text.includes("desafio") ||
    text.includes("challenge")
  ) {
    return "hackathons";
  }

  return null;
}

/**
 * Converte eventos estáticos em DiscoveryItems
 */
function normalizeEvents(eventsList: Event[]): DiscoveryItem[] {
  return eventsList.map((e) => {
    const special = detectSpecialCategory(e.title, e.description, e.tags);
    const category: DiscoveryCategory = special || (e.category?.toLowerCase().includes("hackathon") ? "hackathons" : "eventos");

    let categoryLabel = "Evento";
    if (category === "hackathons") categoryLabel = "Hackathon";
    else if (category === "mulheres_ti") categoryLabel = "Mulheres na TI";
    else if (category === "game_dev") categoryLabel = "Game Development";
    else if (e.category) categoryLabel = e.category;

    const isExpired = checkIsExpired(e.date);

    return {
      id: `event-${e.id}`,
      title: e.title,
      description: e.description,
      category,
      categoryLabel,
      country: e.country || "Angola",
      location: e.location || (e.isOnline ? "Online" : undefined),
      format: e.isOnline ? "online" : "presencial",
      isFree: e.isFree !== false,
      isExpired,
      dateOrDeadline: e.date,
      dateBadge: e.day && e.month ? { day: e.day, month: e.month } : undefined,
      organizer: e.organizer || "Comunidade Tech",
      organizerLogo: e.organizerLogo,
      imageUrl: e.imageUrl || "/images-events.webp",
      link: e.link || `/events/${e.id}`,
      isExternalLink: Boolean(e.link && e.link.startsWith("http")),
      tags: e.tags || [],
    };
  });
}

/**
 * Converte bolsas e programas de intercâmbio
 */
function normalizeScholarships(list: ScholarshipItem[], typeOverride?: "bolsas" | "intercambio" | "cursos"): DiscoveryItem[] {
  return list.map((b) => {
    const isIntercambio = typeOverride === "intercambio" || b.category === "intercambio";
    const category: DiscoveryCategory = isIntercambio ? "intercambio" : (typeOverride === "cursos" || b.category === "cursos" ? "cursos" : "bolsas");
    const categoryLabel = isIntercambio ? "Intercâmbio & Voluntariado" : (category === "cursos" ? "Curso Gratuito" : "Bolsa de Estudo");
    const isExpired = checkIsExpired(b.deadline);

    // Identificar país do título/descrição se não estiver explícito
    let country = b.country || "";
    if (!country) {
      const lower = `${b.title} ${b.description}`.toLowerCase();
      if (lower.includes("angola")) country = "Angola";
      else if (lower.includes("brasil")) country = "Brasil";
      else if (lower.includes("portugal")) country = "Portugal";
      else if (lower.includes("moçambique")) country = "Moçambique";
      else if (lower.includes("espanha")) country = "Espanha";
      else if (lower.includes("reino unido") || lower.includes("irlanda") || lower.includes("uk")) country = "Reino Unido";
      else if (lower.includes("alemanha")) country = "Alemanha";
      else if (lower.includes("holanda")) country = "Holanda";
      else if (lower.includes("itália") || lower.includes("italia")) country = "Itália";
      else if (lower.includes("estados unidos") || lower.includes("eua")) country = "Estados Unidos";
      else country = "Internacional";
    }

    return {
      id: `scholarship-${b.id}`,
      title: b.title,
      description: b.description,
      category,
      categoryLabel,
      country,
      location: country,
      format: b.description.toLowerCase().includes("online") ? "online" : "presencial",
      isFree: true,
      isExpired,
      dateOrDeadline: b.deadline ? `Prazo: ${b.deadline}` : undefined,
      organizer: b.institution || "Programa Internacional",
      imageUrl: b.image || "/images-bolsas.webp",
      link: b.href || `/bolsas/${b.id}`,
      isExternalLink: Boolean(b.href && b.href.startsWith("http")),
      tags: [categoryLabel, country].filter(Boolean),
    };
  });
}

/**
 * Converte comunidades
 */
function normalizeCommunities(list: Community[]): DiscoveryItem[] {
  return list.map((c) => {
    const special = detectSpecialCategory(c.name, c.description, c.tags);
    const category: DiscoveryCategory = special || "comunidades";

    let categoryLabel = "Comunidade Tech";
    if (category === "mulheres_ti") categoryLabel = "Mulheres na TI";
    else if (category === "game_dev") categoryLabel = "Game Development";

    const isOnline = c.location.toLowerCase().includes("online");

    return {
      id: `community-${c.id}`,
      title: c.name,
      description: c.description,
      category,
      categoryLabel,
      country: c.country || "Angola",
      location: c.location,
      format: isOnline ? "online" : "presencial",
      isFree: true,
      isExpired: false,
      organizer: c.type || "Comunidade",
      organizerLogo: c.logoUrl,
      imageUrl: c.logoUrl || "/images-community.jpg",
      link: c.link || `/community`,
      isExternalLink: Boolean(c.link && c.link.startsWith("http")),
      tags: c.tags || [],
      membersCount: c.members > 0 ? c.members : undefined,
    };
  });
}

/**
 * Programas reais de aceleração e startups da Lusofonia
 */
const STARTUP_ITEMS: DiscoveryItem[] = [
  {
    id: "startup-acelera-angola",
    title: "Acelera Angola",
    description: "Programa de aceleração de startups em Angola, focado em crescimento, captação de investimento e validação de modelo de negócio.",
    category: "startups",
    categoryLabel: "Aceleradora de Startups",
    country: "Angola",
    location: "Luanda",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Acelera Angola",
    organizerLogo: "/images-card1.jpg",
    imageUrl: "/images-card1.jpg",
    link: "https://acelera.ao",
    isExternalLink: true,
    tags: ["Startups", "Aceleração", "Luanda", "Investimento"],
  },
  {
    id: "startup-cila-angola",
    title: "CILA – Centro de Incubação Local de Angola",
    description: "Centro de incubação dedicado ao suporte de empreendedores e startups em fases iniciais no mercado angolano.",
    category: "startups",
    categoryLabel: "Incubadora Tech",
    country: "Angola",
    location: "Luanda",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "CILA",
    organizerLogo: "/images-card2.webp",
    imageUrl: "/images-card2.webp",
    link: "/startups",
    isExternalLink: false,
    tags: ["Incubação", "Empreendedorismo", "Angola"],
  },
  {
    id: "startup-founder-institute-luanda",
    title: "Founder Institute Luanda",
    description: "Capítulo angolano do maior acelerador pré-seed do mundo, com mentoria direta de líderes da indústria global.",
    category: "startups",
    categoryLabel: "Programa Global",
    country: "Angola",
    location: "Luanda",
    format: "hibrido",
    isFree: false,
    isExpired: false,
    organizer: "Founder Institute",
    organizerLogo: "/images-card3.webp",
    imageUrl: "/images-card3.webp",
    link: "https://fi.co/luanda",
    isExternalLink: true,
    tags: ["Startups", "Global", "Pré-seed"],
  },
  {
    id: "startup-startup-lisboa",
    title: "Startup Lisboa",
    description: "Uma das principais incubadoras e polos de inovação da Europa, apoiando startups lusófonas e internacionais a expandir no mercado europeu.",
    category: "startups",
    categoryLabel: "Incubadora Europeia",
    country: "Portugal",
    location: "Lisboa",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Startup Lisboa",
    imageUrl: "/images-card4.webp",
    link: "https://www.startuplisboa.com",
    isExternalLink: true,
    tags: ["Portugal", "Escala", "Europa", "Startups"],
  },
  {
    id: "startup-cabo-verde-digital",
    title: "Cabo Verde Digital",
    description: "Iniciativa governamental e ecossistémica que apoia jovens empreendedores com bolsas, capacitação e bolsas de aceleração tecnológica.",
    category: "startups",
    categoryLabel: "Programa de Apoio",
    country: "Cabo Verde",
    location: "Praia / Online",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Governo de Cabo Verde",
    imageUrl: "/images-card1.jpg",
    link: "https://digital.cv",
    isExternalLink: true,
    tags: ["Cabo Verde", "Inovação", "Bolsas Tech"],
  },
  {
    id: "startup-inova-moz",
    title: "IdeiaLab Moçambique",
    description: "Hub de aceleração e desenvolvimento de ecossistemas inovadores em Moçambique, focado em negócios de impacto e base tecnológica.",
    category: "startups",
    categoryLabel: "Hub de Empreendedorismo",
    country: "Moçambique",
    location: "Maputo",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "IdeiaLab",
    imageUrl: "/images-card2.webp",
    link: "/startups",
    isExternalLink: false,
    tags: ["Moçambique", "Aceleração", "Maputo"],
  },
];

/**
 * Retorna todos os itens consolidados
 */
export function getAllDiscoveryItems(): DiscoveryItem[] {
  const events = normalizeEvents(COMPREHENSIVE_EVENTS);
  const scholarshipsList = normalizeScholarships(bolsas, "bolsas");
  const exchangeList = normalizeScholarships(intercambio, "intercambio");
  const communitiesList = normalizeCommunities(mockCommunities);

  const combined = [
    ...events,
    ...scholarshipsList,
    ...exchangeList,
    ...communitiesList,
    ...STARTUP_ITEMS,
  ];

  // Ordenação inteligente:
  // 1. Itens ativos primeiro
  // 2. Eventos e bolsas com data mais recente/próxima
  return combined.sort((a, b) => {
    if (a.isExpired !== b.isExpired) {
      return a.isExpired ? 1 : -1;
    }
    return 0;
  });
}
