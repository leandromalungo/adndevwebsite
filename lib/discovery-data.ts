import { COMPREHENSIVE_EVENTS } from "@/data/eventsDatabase";
import { bolsas } from "@/data/bolsas";
import { intercambio } from "@/data/intercambio";
import { cursos } from "@/data/cursos";
import { certificacoes } from "@/data/certificacoes";
import { mockCommunities } from "@/data/dataCommunity";
import type { Event, ScholarshipItem, Community, NavCategory } from "@/data/types";

export type DiscoveryCategory =
  | "todos"
  | "eventos"
  | "hackathons"
  | "bolsas"
  | "cursos"
  | "comunidades"
  | "startups"
  | "game_dev";

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
  timeRange?: string;
  state?: string;
  fullDescription?: string;
  requirements?: string[];
  benefits?: string[];
  institution?: string;
  degreeLevels?: string;
  funding?: string;
  deadline?: string;
  address?: string;
  contactEmail?: string;
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
    return "eventos";
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
      timeRange: e.timeRange,
      state: e.state,
      address: e.location,
      fullDescription: e.description,
    };
  });
}

/**
 * Converte bolsas e programas de intercâmbio
 */
function normalizeScholarships(list: ScholarshipItem[], typeOverride?: NavCategory): DiscoveryItem[] {
  return list.map((b) => {
    const resolvedType = typeOverride || b.category;
    let category: DiscoveryCategory = "bolsas";
    let categoryLabel = "Bolsa de Estudo";

    if (resolvedType === "intercambio") {
      category = "bolsas";
      categoryLabel = "Intercâmbio & Bolsa";
    } else if (resolvedType === "cursos") {
      category = "cursos";
      categoryLabel = "Curso Gratuito";
    } else if (resolvedType === "certificações") {
      category = "cursos";
      categoryLabel = "Certificação Gratuita";
    }

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

    const lowerDesc = `${b.title} ${b.description} ${b.degreeLevels || ""}`.toLowerCase();
    const isOnline =
      category === "cursos" ||
      lowerDesc.includes("online") ||
      lowerDesc.includes("remoto");

    return {
      id: `scholarship-${b.id}`,
      title: b.title,
      description: b.description,
      category,
      categoryLabel,
      country,
      location: country,
      format: isOnline && !lowerDesc.includes("presencial") ? "online" : "presencial",
      isFree: true,
      isExpired,
      dateOrDeadline: b.deadline ? `Prazo: ${b.deadline}` : undefined,
      organizer: b.institution || "Programa Internacional",
      imageUrl: b.image || "/images-bolsas.webp",
      link: b.href || `/bolsas/${b.id}`,
      isExternalLink: Boolean(b.href && b.href.startsWith("http")),
      tags: [categoryLabel, country].filter(Boolean),
      institution: b.institution,
      degreeLevels: b.degreeLevels,
      funding: b.funding,
      benefits: b.benefits,
      requirements: b.requirements,
      fullDescription: b.fullDescription || b.description,
      deadline: b.deadline,
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
    if (category === "eventos") categoryLabel = "Evento & Comunidade";
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
      fullDescription: c.description,
    };
  });
}

/**
 * Programas reais de aceleração e startups da Lusofonia e globais
 */
const STARTUP_ITEMS: DiscoveryItem[] = [
  {
    id: "startup-acelera-angola",
    title: "Acelera Angola",
    description: "Principal incubadora e aceleradora privada de Angola, com mentoria, validação e ligação a investidores.",
    category: "startups",
    categoryLabel: "Aceleradora de Startups",
    country: "Angola",
    location: "Luanda",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Acelera Net",
    organizerLogo: "/images/programs/acelera-angola.png",
    imageUrl: "/images/programs/acelera-angola.png",
    link: "https://www.aceleranet.ao/",
    isExternalLink: true,
    tags: ["Startups", "Aceleração", "Luanda", "Investimento"],
  },
  {
    id: "startup-lispa-angola",
    title: "LISPA – Laboratório de Inovação do Sistema de Pagamentos",
    description: "Incubadora e laboratório regulatório em Luanda dedicado a fintechs e inclusão financeira.",
    category: "startups",
    categoryLabel: "Incubadora Fintech",
    country: "Angola",
    location: "Luanda",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "BNA & INAPEM",
    organizerLogo: "/images/programs/lispa.png",
    imageUrl: "/images/programs/lispa.png",
    link: "https://www.lispa.ao/",
    isExternalLink: true,
    tags: ["Fintech", "Pagamentos", "Angola", "Incubação"],
  },
  {
    id: "startup-orange-corners-angola",
    title: "Orange Corners Angola",
    description: "Programa internacional de incubação de 6 meses para jovens empreendedores em Luanda com formação e acesso a financiamento.",
    category: "startups",
    categoryLabel: "Programa de Incubação",
    country: "Angola",
    location: "Luanda",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "Orange Corners",
    organizerLogo: "/images/programs/orange-corners.png",
    imageUrl: "/images/programs/orange-corners.png",
    link: "https://www.orangecorners.com/country/angola/",
    isExternalLink: true,
    tags: ["Incubação", "Angola", "Juventude", "Startups"],
  },
  {
    id: "startup-founder-institute-luanda",
    title: "Founder Institute Luanda",
    description: "Capítulo angolano da maior rede global de pré-aceleração pré-seed, com mentoria internacional direta.",
    category: "startups",
    categoryLabel: "Aceleradora Global",
    country: "Angola",
    location: "Luanda",
    format: "hibrido",
    isFree: false,
    isExpired: false,
    organizer: "Founder Institute",
    organizerLogo: "/images/programs/founder-institute.jpg",
    imageUrl: "/images/programs/founder-institute.jpg",
    link: "https://fi.co/luanda",
    isExternalLink: true,
    tags: ["Startups", "Global", "Pré-seed", "Luanda"],
  },
  {
    id: "startup-cubo-itau",
    title: "Cubo Itaú",
    description: "Um dos maiores hubs de empreendedorismo tecnológico da América Latina conectando startups em tração a grandes corporações e investidores.",
    category: "startups",
    categoryLabel: "Hub & Aceleradora",
    country: "Brasil",
    location: "São Paulo",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Itaú Unibanco",
    organizerLogo: "/images/programs/cubo-itau.webp",
    imageUrl: "/images/programs/cubo-itau.webp",
    link: "https://cubo.itau/",
    isExternalLink: true,
    tags: ["Brasil", "Startups", "Scale-up", "Corporativo"],
  },
  {
    id: "startup-inovativa-brasil",
    title: "InovAtiva Brasil",
    description: "Maior programa público gratuito e equity-free de aceleração de startups do Brasil, realizado pelo MDIC e Sebrae.",
    category: "startups",
    categoryLabel: "Aceleração Gratuita",
    country: "Brasil",
    location: "Nacional / Online",
    format: "online",
    isFree: true,
    isExpired: false,
    organizer: "MDIC & Sebrae",
    organizerLogo: "/images/programs/inovativa-brasil.jpg",
    imageUrl: "/images/programs/inovativa-brasil.jpg",
    link: "https://www.inovativa.online/",
    isExternalLink: true,
    tags: ["Brasil", "Equity-free", "Aceleração", "Sebrae"],
  },
  {
    id: "startup-google-campus-sp",
    title: "Google for Startups Campus São Paulo",
    description: "Hub e programas de aceleração do Google no Brasil oferecendo mentorias em IA, produto, cloud e expansão internacional.",
    category: "startups",
    categoryLabel: "Aceleradora Tech",
    country: "Brasil",
    location: "São Paulo",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Google for Startups",
    organizerLogo: "/images/programs/google-startups.webp",
    imageUrl: "/images/programs/google-startups.webp",
    link: "https://startup.google.com/campus/sao-paulo/",
    isExternalLink: true,
    tags: ["Google", "IA", "Cloud", "Brasil"],
  },
  {
    id: "startup-unicorn-factory-lisboa",
    title: "Unicorn Factory Lisboa & Startup Lisboa",
    description: "Principal hub europeu de incubação e aceleração em Lisboa, com programas temáticos em IA, Web3 e apoio a startups internacionais.",
    category: "startups",
    categoryLabel: "Incubadora & ScaleUp",
    country: "Portugal",
    location: "Lisboa",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Unicorn Factory Lisboa",
    organizerLogo: "/images/programs/unicorn-factory-lisboa.webp",
    imageUrl: "/images/programs/unicorn-factory-lisboa.webp",
    link: "https://unicornfactorylisboa.com/",
    isExternalLink: true,
    tags: ["Portugal", "Escala", "Europa", "Lisboa"],
  },
  {
    id: "startup-uptec-porto",
    title: "UPTEC – Parque de Ciência e Tecnologia da U.Porto",
    description: "Incubadora tecnológica ligada à Universidade do Porto que apoia startups de software, biotecnologia e indústrias criativas.",
    category: "startups",
    categoryLabel: "Incubadora Universitária",
    country: "Portugal",
    location: "Porto",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "Universidade do Porto",
    organizerLogo: "/images/programs/uptec.png",
    imageUrl: "/images/programs/uptec.png",
    link: "https://uptec.up.pt/",
    isExternalLink: true,
    tags: ["Portugal", "Porto", "Deep Tech", "Incubadora"],
  },
  {
    id: "startup-cabo-verde-digital",
    title: "Cabo Verde Digital (Bolsa Digital & TechPark CV)",
    description: "Iniciativa oficial de Cabo Verde que apoia jovens fundadores com bolsas, capacitação e pré-incubação no Parque Tecnológico da Praia.",
    category: "startups",
    categoryLabel: "Programa de Apoio",
    country: "Cabo Verde",
    location: "Praia / Online",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Governo de Cabo Verde",
    organizerLogo: "/images/programs/cabo-verde-digital.jpg",
    imageUrl: "/images/programs/cabo-verde-digital.jpg",
    link: "https://caboverdedigital.cv/",
    isExternalLink: true,
    tags: ["Cabo Verde", "Inovação", "Bolsa Digital"],
  },
  {
    id: "startup-inova-moz",
    title: "ideiaLab Moçambique & Orange Corners Maputo",
    description: "Hub de referência em Moçambique que capacita e acelera startups de base tecnológica e impacto social em Maputo.",
    category: "startups",
    categoryLabel: "Hub de Empreendedorismo",
    country: "Moçambique",
    location: "Maputo",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "ideiaLab",
    organizerLogo: "/images/programs/ideialab.png",
    imageUrl: "/images/programs/ideialab.png",
    link: "https://ideialab.biz/",
    isExternalLink: true,
    tags: ["Moçambique", "Aceleração", "Maputo"],
  },
  {
    id: "startup-orange-digital-gw",
    title: "Orange Digital Center & Orange Fab Guiné-Bissau",
    description: "Centro gratuito em Bissau com escola de programação, FabLab e aceleradora para impulsionar startups locais.",
    category: "startups",
    categoryLabel: "Aceleradora & Escola",
    country: "Guiné-Bissau",
    location: "Bissau",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "Orange Digital Centers",
    organizerLogo: "/images/programs/orange-digital-center.png",
    imageUrl: "/images/programs/orange-digital-center.png",
    link: "https://orangedigitalcenters.com/",
    isExternalLink: true,
    tags: ["Guiné-Bissau", "FabLab", "Startups"],
  },
  {
    id: "startup-microsoft-founders-hub",
    title: "Microsoft for Startups Founders Hub",
    description: "Até USD 150.000 em créditos Azure, acesso a modelos OpenAI, GitHub Enterprise e mentoria técnica para startups em fase inicial.",
    category: "startups",
    categoryLabel: "Programa Global",
    country: "Internacional",
    location: "Global / Online",
    format: "online",
    isFree: true,
    isExpired: false,
    organizer: "Microsoft",
    organizerLogo: "/images/programs/microsoft-startups.webp",
    imageUrl: "/images/programs/microsoft-startups.webp",
    link: "https://www.microsoft.com/en-us/startups",
    isExternalLink: true,
    tags: ["Azure", "IA", "Créditos Cloud", "Global"],
  },
  {
    id: "startup-aws-activate",
    title: "AWS Activate for Startups",
    description: "Créditos gratuitos de computação em nuvem AWS até USD 100.000, suporte técnico e benefícios para startups em crescimento.",
    category: "startups",
    categoryLabel: "Programa Global",
    country: "Internacional",
    location: "Global / Online",
    format: "online",
    isFree: true,
    isExpired: false,
    organizer: "Amazon Web Services",
    organizerLogo: "/images/programs/aws-activate.png",
    imageUrl: "/images/programs/aws-activate.png",
    link: "https://aws.amazon.com/startups/",
    isExternalLink: true,
    tags: ["AWS", "Cloud", "Infraestrutura", "Global"],
  },
  {
    id: "startup-kiandahub-angola",
    title: "KiandaHub Angola",
    description: "Primeiro espaço de coworking e incubação colaborativa em Luanda impulsionando startups digitais, comunidades tech e fundadores angolanos.",
    category: "startups",
    categoryLabel: "Hub & Incubadora",
    country: "Angola",
    location: "Luanda",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "KiandaHub",
    organizerLogo: "/images/programs/kiandahub.png",
    imageUrl: "/images/programs/kiandahub.png",
    link: "https://kiandahub.com/",
    isExternalLink: true,
    tags: ["Angola", "Luanda", "Incubação", "Startups"],
  },
  {
    id: "startup-bantu-makers",
    title: "Bantu Makers Venture Studio (Angola)",
    description: "Venture studio angolano focado na construção de startups tecnológicas escaláveis e capacitação de equipas fundadoras em Luanda.",
    category: "startups",
    categoryLabel: "Venture Studio",
    country: "Angola",
    location: "Luanda",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Bantu Makers",
    organizerLogo: "/images/programs/bantu-makers.png",
    imageUrl: "/images/programs/bantu-makers.png",
    link: "https://www.bantumakers.com/",
    isExternalLink: true,
    tags: ["Venture Studio", "Angola", "Produto Digital", "Startups"],
  },
  {
    id: "startup-standard-bank-mz",
    title: "Standard Bank Incubadora Moçambique",
    description: "Incubadora empresarial em Maputo oferecendo aceleração, mentoria financeira e ligação a mercado para startups e PMEs tecnológicas moçambicanas.",
    category: "startups",
    categoryLabel: "Incubadora Corporativa",
    country: "Moçambique",
    location: "Maputo",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Standard Bank Moçambique",
    organizerLogo: "/images/programs/standard-bank-mz.jpg",
    imageUrl: "/images/programs/standard-bank-mz.jpg",
    link: "https://www.standardbank.co.mz/",
    isExternalLink: true,
    tags: ["Moçambique", "Maputo", "Fintech", "Aceleração"],
  },
  {
    id: "startup-braga-portugal",
    title: "Startup Braga",
    description: "Hub de inovação e aceleração de referência no Norte de Portugal para startups tecnológicas, saúde digital e nanotecnologia em escala global.",
    category: "startups",
    categoryLabel: "Hub & Aceleradora",
    country: "Portugal",
    location: "Braga",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "InvestBraga",
    organizerLogo: "/images/programs/startup-braga.png",
    imageUrl: "/images/programs/startup-braga.png",
    link: "https://startupbraga.com/",
    isExternalLink: true,
    tags: ["Portugal", "Braga", "Aceleração", "Deep Tech"],
  },
  {
    id: "startup-porto-digital",
    title: "Porto Digital & Manguezal (Recife)",
    description: "Um dos principais parques tecnológicos e ecossistemas de inovação aberta e software do Brasil, com mais de 400 empresas e programas de incubação.",
    category: "startups",
    categoryLabel: "Parque Tecnológico",
    country: "Brasil",
    location: "Recife, PE",
    format: "hibrido",
    isFree: true,
    isExpired: false,
    organizer: "Porto Digital",
    organizerLogo: "/images/programs/porto-digital.png",
    imageUrl: "/images/programs/porto-digital.png",
    link: "https://www.portodigital.org/",
    isExternalLink: true,
    tags: ["Brasil", "Recife", "Software", "Inovação"],
  },
  {
    id: "startup-iade-timor-leste",
    title: "IADE – Instituto de Apoio ao Desenvolvimento Empresarial (Timor-Leste)",
    description: "Instituição nacional de Timor-Leste promovendo capacitação empresarial, concursos de planos de negócio e apoio a novas startups em Díli.",
    category: "startups",
    categoryLabel: "Apoio Empreendedor",
    country: "Timor-Leste",
    location: "Díli",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "IADE Timor-Leste",
    organizerLogo: "/images/programs/iade-tl.jpg",
    imageUrl: "/images/programs/iade-tl.jpg",
    link: "https://iade.gov.tl/",
    isExternalLink: true,
    tags: ["Timor-Leste", "Díli", "Empreendedorismo", "Startups"],
  },
  {
    id: "startup-empreende-stp",
    title: "Empreende+ São Tomé e Príncipe",
    description: "Plataforma e programa de aceleração em São Tomé e Príncipe voltado para jovens empreendedores, inovação digital e economia azul.",
    category: "startups",
    categoryLabel: "Aceleradora Nacional",
    country: "São Tomé e Príncipe",
    location: "São Tomé",
    format: "presencial",
    isFree: true,
    isExpired: false,
    organizer: "Empreende+ STP",
    organizerLogo: "/images/programs/empreende-stp.png",
    imageUrl: "/images/programs/empreende-stp.png",
    link: "https://empreendestp.st/",
    isExternalLink: true,
    tags: ["São Tomé e Príncipe", "Startups", "Juventude", "Digital"],
  },
];

/**
 * Retorna todos os itens consolidados
 */
export function getAllDiscoveryItems(): DiscoveryItem[] {
  const events = normalizeEvents(COMPREHENSIVE_EVENTS);
  const scholarshipsList = normalizeScholarships(bolsas, "bolsas");
  const exchangeList = normalizeScholarships(intercambio, "intercambio");
  const coursesList = normalizeScholarships(cursos, "cursos");
  const certificationsList = normalizeScholarships(certificacoes, "certificações");
  const communitiesList = normalizeCommunities(mockCommunities);

  const combined = [
    ...events,
    ...scholarshipsList,
    ...exchangeList,
    ...coursesList,
    ...certificationsList,
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

/**
 * Procura um item pelo seu ID com suporte a normalização de prefixos
 */
export function getDiscoveryItemById(id: string): DiscoveryItem | null {
  if (!id) return null;
  const decodedId = decodeURIComponent(id).trim();
  const allItems = getAllDiscoveryItems();

  // 1. Busca exata por ID
  const directMatch = allItems.find((item) => item.id === decodedId);
  if (directMatch) return directMatch;

  // 2. Busca ignorando maiúsculas/minúsculas
  const caseInsensitiveMatch = allItems.find(
    (item) => item.id.toLowerCase() === decodedId.toLowerCase()
  );
  if (caseInsensitiveMatch) return caseInsensitiveMatch;

  // 3. Remove todos os prefixos conhecidos (inclusive repetidos)
  const cleanId = decodedId
    .replace(/^(db-event-|db-scholarship-|db-comm-|admin-event-|admin-scholarship-|admin-community-|event-|scholarship-|community-|startup-)+/gi, "")
    .toLowerCase();

  const prefixMatch = allItems.find((item) => {
    const itemCleanId = item.id
      .replace(/^(db-event-|db-scholarship-|db-comm-|admin-event-|admin-scholarship-|admin-community-|event-|scholarship-|community-|startup-)+/gi, "")
      .toLowerCase();
    return itemCleanId === cleanId;
  });
  if (prefixMatch) return prefixMatch;

  // 4. Busca por sufixo ou terminação (caso o ID original seja um código como br-sp-001)
  if (cleanId.length >= 3) {
    const looseMatch = allItems.find((item) => {
      const itemLower = item.id.toLowerCase();
      return itemLower.endsWith(`-${cleanId}`) || itemLower === cleanId || cleanId.endsWith(itemLower);
    });
    if (looseMatch) return looseMatch;
  }

  return null;
}
