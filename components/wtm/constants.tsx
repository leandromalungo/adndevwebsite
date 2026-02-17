import {
  SlideData,
  LeadershipCardData,
  SheBuildsCardData,
  Activity,
} from "@/data/types";
import { FilterTab } from "@/components/CountryFilter";

export const NAV_ITEMS = [
  "She Builds AI",
  "Leadership Development",
  "On Demand",
];

export interface ReviewData {
  name: string;
  school: string;
  text: string;
  initials: string;
  iconColor?: string;
}

export interface ProgramItem {
  logo: string;
  name: string;
  color: string;
}

export interface CountryContent {
  slides: SlideData[];
  leadership: LeadershipCardData[];
  reviews: ReviewData[];
  activities: Activity[];
  programs: {
    universities: ProgramItem[];
    platforms: ProgramItem[];
    bigTech: ProgramItem[];
  };
}

const DEFAULT_PROGRAMS = {
  universities: [
    { logo: "H", name: "Harvard University", color: "bg-red-800 text-white" },
    { logo: "Y", name: "Yale University", color: "bg-blue-900 text-white" },
    { logo: "IIT", name: "IIT Kharagpur", color: "bg-indigo-100" },
    { logo: "MIT", name: "MIT", color: "bg-gray-900 text-white" },
    { logo: "R", name: "Rice University", color: "bg-blue-800 text-white" },
    { logo: "M", name: "IIT Madras", color: "bg-orange-100" },
    { logo: "C", name: "Columbia University", color: "bg-blue-50" },
    { logo: "CU", name: "Cornell University", color: "bg-red-50" },
    { logo: "E", name: "U. of Edinburgh", color: "bg-blue-900 text-white" },
    { logo: "P", name: "Purdue University", color: "bg-yellow-100" },
    { logo: "UP", name: "U. of Pennsylvania", color: "bg-red-100" },
    { logo: "D", name: "Duke University", color: "bg-blue-950 text-white" },
    { logo: "M", name: "U. of Michigan", color: "bg-blue-900 text-white" },
    { logo: "O", name: "The Open University", color: "bg-blue-600 text-white" },
  ],
  platforms: [
    { logo: "C", name: "Coursera", color: "bg-blue-600 text-white" },
    { logo: "U", name: "Udacity", color: "bg-blue-700 text-white" },
    { logo: "in", name: "LinkedIn Learning", color: "bg-blue-500 text-white" },
    { logo: "N", name: "Noble Desktop", color: "bg-black text-white" },
    { logo: "fcc", name: "freeCodeCamp", color: "bg-gray-950 text-white" },
    { logo: "CS", name: "CodeSignal", color: "bg-blue-100" },
    { logo: "B", name: "Boot.dev", color: "bg-amber-100" },
  ],
  bigTech: [
    { logo: "G", name: "Google", color: "bg-white" },
    { logo: "a", name: "Amazon", color: "bg-black text-white" },
    { logo: "MS", name: "Microsoft", color: "bg-white" },
    { logo: "IBM", name: "IBM", color: "bg-blue-50" },
    { logo: "S", name: "Smithsonian", color: "bg-blue-400 text-white" },
    { logo: "UN", name: "United Nations", color: "bg-sky-100" },
    { logo: "N", name: "NPTEL", color: "bg-orange-50" },
  ],
};

const DEFAULT_REVIEWS: ReviewData[] = [
  {
    name: "Joseph Myers",
    school: "BrainStation",
    text: "Having now worked as a data scientist in industry for a few months, I can really appreciate how well the course content was aligned with the skills required ...",
    initials: "JM",
  },
  {
    name: "Aleyna Acar",
    school: "Le Wagon",
    text: "My experience at Le Wagon was incredible and enriching. I really appreciated the mutual support among students, the kindness and patience of the entire teach...",
    initials: "AA",
    iconColor: "bg-[#71d9d9]",
  },
  {
    name: "Michael Garber",
    school: "Springboard",
    text: "I signed up for Springboard's Data Science program and it was definitely the best career-related decision I've made in many years. I've had an interest in Da...",
    initials: "MG",
    iconColor: "bg-[#91e2b5]",
  },
  {
    name: "Brenda Salas",
    school: "Nucamp",
    text: "I decided to learn HTML and CSS to initiate my software development skills. I had a hard time finding a course I actually felt that I was advancing in, and I...",
    initials: "BS",
  },
];

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "Tech Community Get-Together",
    description:
      "Um encontro descontraído para partilha de conhecimento e networking entre entusiastas de tecnologia.",
    year: "2022",
    location: "HUB CRIATIVO",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    types: ["evento"],
    link: "#",
  },
  {
    id: "2",
    title: "Hackathon WE4CHANGE",
    description:
      "Dois dias intensos de ideação e desenvolvimento focados em soluções inovadoras para as alterações climáticas.",
    year: "2022",
    location: "CENTRO TECH",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
    types: ["evento", "artigo"],
    link: "#",
  },
  {
    id: "3",
    title: "Workshop AI Explorers",
    description:
      "Explorando as fronteiras da Inteligência Artificial em sessões práticas de codificação.",
    year: "2023",
    location: "LAB DIGITAL",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    types: ["evento"],
    link: "#",
  },
  {
    id: "4",
    title: "Mulheres na Tech Summit",
    description:
      "A maior conferência anual celebrando e capacitando mulheres no setor tecnológico.",
    year: "2023",
    location: "AUDITÓRIO NACIONAL",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
    types: ["evento", "artigo"],
    link: "#",
  },
  {
    id: "5",
    title: "Mentoria 1-on-1",
    description:
      "Sessões personalizadas para acelerar a carreira de jovens desenvolvedoras.",
    year: "2022",
    location: "REMOTO",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    types: ["artigo"],
    link: "#",
  },
  {
    id: "6",
    title: "Coding Bootcamp",
    description: "Intensivo de 12 semanas em Full Stack Development.",
    year: "2021",
    location: "ESPAÇO CO-WORK",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "7",
    title: "UX/UI Meetup",
    description: "Discussão sobre as tendências de design para 2024.",
    year: "2023",
    location: "DESIGN STUDIO",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "8",
    title: "Data Science Workshop",
    description: "Limpeza e análise de dados com Python.",
    year: "2022",
    location: "UNIVERSIDADE",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "9",
    title: "Carreira Tech Talk",
    description: "Como conseguir o teu primeiro emprego internacional.",
    year: "2023",
    location: "WEBINAR",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
    types: ["artigo"],
    link: "#",
  },
  {
    id: "10",
    title: "Cloud Summit",
    description: "A arquitetura do futuro está na nuvem.",
    year: "2022",
    location: "DATA CENTER",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "11",
    title: "Girls in ICT Day",
    description: "Inspirando raparigas a seguir carreiras STEM.",
    year: "2023",
    location: "ESCOLAS",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "12",
    title: "Open Source Fest",
    description: "Contribuindo para Projetos de Impacto Social.",
    year: "2022",
    location: "GITHUB",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800",
    types: ["evento"],
    link: "#",
  },
  {
    id: "13",
    title: "Next.js Workshop",
    description: "Construindo Web Apps modernas com App Router.",
    year: "2023",
    location: "TECH HUB",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    types: ["evento"],
    link: "#",
  },
];

export const COUNTRY_DATA: Record<FilterTab, CountryContent> = {
  Angola: {
    slides: [
      {
        id: 1,
        title: "Women Techmakers Academy Angola",
        description:
          "The WTM Academy em Angola é a sua plataforma completa para aprendizagem e crescimento na carreira tecnológica. Ganhe competências técnicas, formação em liderança e apoio comunitário, com um foco especial em excelência no mundo da IA.",
        boldKeywords: ["competências técnicas,", "liderança", "comunitário"],
        buttonText: "Assinar agora",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Woman looking up into the sky",
      },
      {
        id: 2,
        title: "Capacitando Líderes de IA em Luanda",
        description:
          "A nossa missão é construir um mundo onde todas as mulheres possam prosperar na tecnologia em Angola. Através dos nossos programas de mentoria intensiva e workshops práticos.",
        boldKeywords: ["prosperar na tecnologia", "mentoria", "inovação."],
        buttonText: "Saber mais",
        imageSrc:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Digital collaboration",
      },
      {
        id: 3,
        title: "Comunidade WTM Angola",
        description:
          "Conecte-se com milhares de mulheres na tecnologia em Angola. Partilhe conhecimento e cresça no ecossistema lusófono.",
        boldKeywords: ["milhares de mulheres", "conhecimento", "ecossistema"],
        buttonText: "Ver mais",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Networking event",
      },
    ],
    leadership: [
      {
        id: "intro-ao",
        type: "intro",
        subtitle: "Programas Angola",
        title: "Iniciativas para participação das mulheres na T.I. em Angola",
        description:
          "Eleve a sua liderança com a nossa série imersiva projetada para capacitá-la com competências essenciais em Angola.",
      },
      {
        id: "person-ao-1",
        type: "person",
        name: "LIDIA CABRAL",
        role: "Cloud Engineer",
        image: "/images/1765478356516.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Cloud Computing em Angola",
        status: "On demand",
      },
      {
        id: "person-ao-2",
        type: "person",
        name: "ANA SILVA",
        role: "DevOps Engineer",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 2 ANOS",
        sessionTitle: "Automação e Futuro",
        status: "On demand",
      },
      {
        id: "person-ao-3",
        type: "person",
        name: "MARIA BENTO",
        role: "Product Manager",
        image: "/images/1756913513983.jpg",
        timeAgo: "HÁ 6 MESES",
        sessionTitle: "Liderança Feminina em Tech",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS.map((r) => ({
      ...r,
      school: r.school + " Luanda",
    })),
    activities: DEFAULT_ACTIVITIES.map((a) => ({
      ...a,
      location: a.location + " (ANGOLA)",
    })),
    programs: DEFAULT_PROGRAMS,
  },
  Brasil: {
    slides: [
      {
        id: 1,
        title: "Women Techmakers Academy Brasil",
        description:
          "A WTM Academy no Brasil é a sua plataforma tudo-em-um para aprendizado e crescimento na carreira de tecnologia. Desenvolva habilidades técnicas e liderança em São Paulo e Rio.",
        boldKeywords: ["habilidades técnicas,", "liderança", "comunidade"],
        buttonText: "Assinar agora",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Woman working on laptop",
      },
      {
        id: 2,
        title: "Inovação Digital no Brasil",
        description:
          "Programas focados em escalar sua startup e dominar novas ferramentas de IA no mercado brasileiro.",
        boldKeywords: ["escalar sua startup", "IA", "mercado brasileiro"],
        buttonText: "Saiba mais",
        imageSrc:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Digital innovation",
      },
      {
        id: 3,
        title: "Mentoria Brasil Tech",
        description:
          "Conecte-se com as maiores líderes do país e transforme sua trajetória profissional.",
        boldKeywords: ["maiores líderes", "transforme", "trajetória"],
        buttonText: "Ver mais",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Brasil Tech leaders",
      },
    ],
    leadership: [
      {
        id: "intro-br",
        type: "intro",
        subtitle: "Programas Brasil",
        title: "Iniciativas para participação das mulheres na T.I. no Brasil",
        description:
          "Impulsione sua carreira com mentorias exclusivas para brasileiras na tecnologia.",
      },
      {
        id: "person-br-1",
        type: "person",
        name: "LARA FERNANDES",
        role: "AI Lead",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 3 MESES",
        sessionTitle: "IA no Cotidiano Brasileiro",
        status: "On demand",
      },
      {
        id: "person-br-2",
        type: "person",
        name: "BEATRIZ COSTA",
        role: "Software Architect",
        image: "/images/1756913513983.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Sistemas em Escala",
        status: "On demand",
      },
      {
        id: "person-br-3",
        type: "person",
        name: "CARLA MOURA",
        role: "CTO",
        image: "/images/1765478356516.jpg",
        timeAgo: "HÁ 8 MESES",
        sessionTitle: "Liderando com Propósito",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS.map((r) => ({
      ...r,
      school: r.school + " Brasil",
    })),
    activities: DEFAULT_ACTIVITIES.map((a) => ({
      ...a,
      location: a.location + " (BRASIL)",
    })),
    programs: DEFAULT_PROGRAMS,
  },
  Portugal: {
    slides: [
      {
        id: 1,
        title: "Women Techmakers Academy Portugal",
        description:
          "A WTM Academy em Portugal promove a inclusão e o crescimento de mulheres no ecossistema tecnológico europeu.",
        boldKeywords: ["inclusão", "crescimento", "tecnológico"],
        buttonText: "Assinar agora",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Tech in Portugal",
      },
      {
        id: 2,
        title: "Inovação em Lisboa e Porto",
        description:
          "Programas de aceleração e mentoria para mulheres em tech em todo o território português.",
        boldKeywords: ["aceleração", "mentoria", "português"],
        buttonText: "Saber mais",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Lisboa Tech",
      },
      {
        id: 3,
        title: "Comunidade WTM Portugal",
        description:
          "Participe nos nossos meetups mensais e conecte-se com líderes da indústria em Portugal.",
        boldKeywords: ["meetups", "líderes", "indústria"],
        buttonText: "Ver mais",
        imageSrc:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Portugal community",
      },
    ],
    leadership: [
      {
        id: "intro-pt",
        type: "intro",
        subtitle: "Programas Portugal",
        title: "Tecnologia em Portugal",
        description: "O futuro das mulheres em tech na Europa.",
      },
      {
        id: "person-pt-1",
        type: "person",
        name: "RITA MENDES",
        role: "Software Engineer",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 2 MESES",
        sessionTitle: "Backend em PT",
        status: "On demand",
      },
      {
        id: "person-pt-2",
        type: "person",
        name: "SARA LOPES",
        role: "Data Scientist",
        image: "/images/1756913513983.jpg",
        timeAgo: "HÁ 5 MESES",
        sessionTitle: "Data em Lisboa",
        status: "On demand",
      },
    ],
    reviews: [
      {
        name: "Joseph Myers",
        school: "BrainStation (Portugal)",
        text: "Having now worked as a data scientist in industry for a few months, I can really appreciate how well the course content was aligned with the skills required ...",
        initials: "JM",
      },
      {
        name: "Aleyna Acar",
        school: "Le Wagon (Portugal)",
        text: "My experience at Le Wagon was incredible and enriching. I really appreciated the mutual support among students, the kindness and patience of the entire teach...",
        initials: "AA",
        iconColor: "bg-[#71d9d9]",
      },
      {
        name: "Michael Garber",
        school: "Springboard (Portugal)",
        text: "I signed up for Springboard's Data Science program and it was definitely the best career-related decision I've made in many years. I've had an interest in Da...",
        initials: "MG",
        iconColor: "bg-[#91e2b5]",
      },
      {
        name: "Brenda Salas",
        school: "Nucamp (Portugal)",
        text: "I decided to learn HTML and CSS to initiate my software development skills. I had a hard time finding a course I actually felt that I was advancing in, and I...",
        initials: "BS",
      },
    ],
    activities: [
      {
        id: "1",
        title: "Tech Community Get-Together",
        description:
          "Um encontro descontraído para partilha de conhecimento e networking entre entusiastas de tecnologia.",
        year: "2022",
        location: "HUB CRIATIVO (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        types: ["evento"],
        link: "#",
      },
      {
        id: "2",
        title: "Hackathon WE4CHANGE",
        description:
          "Dois dias intensos de ideação e desenvolvimento focados em soluções inovadoras para as alterações climáticas.",
        year: "2022",
        location: "CENTRO TECH (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
        types: ["evento", "artigo"],
        link: "#",
      },
      {
        id: "3",
        title: "Workshop AI Explorers",
        description:
          "Explorando as fronteiras da Inteligência Artificial em sessões práticas de codificação.",
        year: "2023",
        location: "LAB DIGITAL (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
        types: ["evento"],
        link: "#",
      },
      {
        id: "4",
        title: "Mulheres na Tech Summit",
        description:
          "A maior conferência anual celebrando e capacitando mulheres no setor tecnológico.",
        year: "2023",
        location: "AUDITÓRIO NACIONAL (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
        types: ["evento", "artigo"],
        link: "#",
      },
      {
        id: "5",
        title: "Mentoria 1-on-1",
        description:
          "Sessões personalizadas para acelerar a carreira de jovens desenvolvedoras.",
        year: "2022",
        location: "REMOTO (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "6",
        title: "Coding Bootcamp",
        description: "Intensivo de 12 semanas em Full Stack Development.",
        year: "2021",
        location: "ESPAÇO CO-WORK (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "7",
        title: "UX/UI Meetup",
        description: "Discussão sobre as tendências de design para 2024.",
        year: "2023",
        location: "DESIGN STUDIO (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "8",
        title: "Data Science Workshop",
        description: "Limpeza e análise de dados com Python.",
        year: "2022",
        location: "UNIVERSIDADE (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "9",
        title: "Carreira Tech Talk",
        description: "Como conseguir o teu primeiro emprego internacional.",
        year: "2023",
        location: "WEBINAR (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "10",
        title: "Cloud Summit",
        description: "A arquitetura do futuro está na nuvem.",
        year: "2022",
        location: "DATA CENTER (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "11",
        title: "Girls in ICT Day",
        description: "Inspirando raparigas a seguir carreiras STEM.",
        year: "2023",
        location: "ESCOLAS (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "12",
        title: "Open Source Fest",
        description: "Contribuindo para Projetos de Impacto Social.",
        year: "2022",
        location: "GITHUB (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "13",
        title: "Next.js Workshop",
        description: "Construindo Web Apps modernas com App Router.",
        year: "2023",
        location: "TECH HUB (PORTUGAL)",
        imageUrl:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
    ],
    programs: DEFAULT_PROGRAMS,
  },
  Moçambique: {
    slides: [
      {
        id: 1,
        title: "WTM Moçambique",
        description:
          "Capacitando mulheres no setor tecnológico moçambicano em Maputo.",
        boldKeywords: ["capacitando", "moçambicano"],
        buttonText: "Assinar",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        imageAlt: "WTM Moçambique",
      },
      {
        id: 2,
        title: "Liderança em Tech",
        description:
          "Desenvolvendo as próximas líderes de tecnologia em Moçambique.",
        boldKeywords: ["próximas líderes"],
        buttonText: "Saber mais",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Leadership",
      },
      {
        id: 3,
        title: "Educação Digital",
        description:
          "Workshops gratuitos de programação para jovens moçambicanas.",
        boldKeywords: ["workshops gratuitos"],
        buttonText: "Ver mais",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Education",
      },
    ],
    leadership: [
      {
        id: "intro-mz",
        type: "intro",
        subtitle: "Programas Moçambique",
        title: "Impacto Moçambique",
        description: "Crescendo em Maputo.",
      },
      {
        id: "person-mz-1",
        type: "person",
        name: "ELSA BIÉ",
        role: "Frontend Dev",
        image: "/images/1765478356516.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Web em Maputo",
        status: "On demand",
      },
      {
        id: "person-mz-2",
        type: "person",
        name: "JOANA TIMANA",
        role: "UX Designer",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 6 MESES",
        sessionTitle: "Design Thinking",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS,
    activities: [
      {
        id: "mz-1",
        title: "Maputo Tech Meetup",
        description:
          "Networking e partilha de experiências para mulheres em tecnologia em Moçambique.",
        year: "2023",
        location: "MAPUTO",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "mz-2",
        title: "Mentoria Digital",
        description:
          "Sessões de mentoria para jovens moçambicanas interessadas em TI.",
        year: "2022",
        location: "ONLINE (MOÇAMBIQUE)",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "mz-3",
        title: "Bootcamp de Programação",
        description: "Curso intensivo de programação para iniciantes.",
        year: "2022",
        location: "BEIRA",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "mz-4",
        title: "Feira de Startups",
        description: "Exposição de projetos liderados por mulheres.",
        year: "2023",
        location: "MAPUTO",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
    ],
    programs: DEFAULT_PROGRAMS,
  },
  "São Tomé e Príncipe": {
    slides: [
      {
        id: 1,
        title: "WTM São Tomé e Príncipe",
        description: "Transformação Digital e Inovação nas ilhas.",
        boldKeywords: ["Inovação", "ilhas"],
        buttonText: "Saber mais",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        imageAlt: "WTM STP",
      },
      {
        id: 2,
        title: "Progresso na T.I.",
        description:
          "Iniciativas para participação das mulheres na T.I. em São Tomé.",
        boldKeywords: ["São Tomé"],
        buttonText: "Ver",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Progress",
      },
      {
        id: 3,
        title: "Futuro Digital",
        description: "Conectando as ilhas ao mundo através da tecnologia.",
        boldKeywords: ["Conectando"],
        buttonText: "Entrar",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Future",
      },
    ],
    leadership: [
      {
        id: "intro-st",
        type: "intro",
        subtitle: "Programas STP",
        title: "Mulheres na tecnologia em São Tomé e Príncipe",
        description:
          "Eleve a sua liderança com a nossa série imersiva projetada para capacitá-la com competências essenciais em STP.",
      },
      {
        id: "person-st-1",
        type: "person",
        name: "INES GOMES",
        role: "Network Admin",
        image: "/images/1756913513983.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Redes na Ilha",
        status: "On demand",
      },
      {
        id: "person-st-2",
        type: "person",
        name: "ROSA CRUZ",
        role: "Web Dev",
        image: "/images/1765478356516.jpg",
        timeAgo: "HÁ 9 MESES",
        sessionTitle: "E-commerce local",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS,
    activities: [
      {
        id: "stp-1",
        title: "Ilha Digital",
        description:
          "Evento de inovação e tecnologia para mulheres em São Tomé.",
        year: "2023",
        location: "SÃO TOMÉ",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "stp-2",
        title: "Mentoria STP",
        description: "Mentoria para jovens mulheres em tecnologia.",
        year: "2022",
        location: "ONLINE (STP)",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "stp-3",
        title: "Workshop de Web",
        description: "Workshop prático de desenvolvimento web.",
        year: "2022",
        location: "PRÍNCIPE",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "stp-4",
        title: "Feira de Oportunidades",
        description: "Feira de carreiras e oportunidades para mulheres.",
        year: "2023",
        location: "SÃO TOMÉ",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
    ],
    programs: DEFAULT_PROGRAMS,
  },
  "Guiné-Bissau": {
    slides: [
      {
        id: 1,
        title: "WTM Guiné-Bissau",
        description:
          "Fortalecendo vozes femininas no cenário tech da Guiné-Bissau.",
        boldKeywords: ["vozes"],
        buttonText: "Ver",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        imageAlt: "WTM GB",
      },
      {
        id: 2,
        title: "Capacitação Tech",
        description:
          "Treinamentos práticos em desenvolvimento web para o mercado guineense.",
        boldKeywords: ["mercado guineense"],
        buttonText: "Participar",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Training",
      },
      {
        id: 3,
        title: "Liderança Feminina",
        description: "Apoio e mentoria para mulheres em posições de liderança.",
        boldKeywords: ["posições de liderança"],
        buttonText: "Saiba mais",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Leadership Support",
      },
    ],
    leadership: [
      {
        id: "intro-gw",
        type: "intro",
        subtitle: "Programas Guiné",
        title: "Guiné-Bissau em Foco",
        description: "Mentoria e crescimento tecnológico.",
      },
      {
        id: "person-gw-1",
        type: "person",
        name: "HABIBA DJALÓ",
        role: "Data Analyst",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 11 MESES",
        sessionTitle: "Dados e Impacto",
        status: "On demand",
      },
      {
        id: "person-gw-2",
        type: "person",
        name: "FATIMA BALDÉ",
        role: "Security Spec",
        image: "/images/1756913513983.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Cybersegurança",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS,
    activities: [
      {
        id: "gw-1",
        title: "Guiné Tech Day",
        description: "Encontro de mulheres em tecnologia na Guiné-Bissau.",
        year: "2023",
        location: "BISSAU",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "gw-2",
        title: "Mentoria Guiné",
        description: "Mentoria para jovens mulheres guineenses.",
        year: "2022",
        location: "ONLINE (GUINÉ)",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "gw-3",
        title: "Workshop de Dados",
        description: "Workshop de análise de dados para iniciantes.",
        year: "2022",
        location: "BISSAU",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "gw-4",
        title: "Feira de Startups",
        description: "Exposição de startups lideradas por mulheres.",
        year: "2023",
        location: "BISSAU",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
    ],
    programs: DEFAULT_PROGRAMS,
  },
  "Cabo Verde": {
    slides: [
      {
        id: 1,
        title: "WTM Cabo Verde",
        description: "Transformação Digital e Inovação no Arquipélago.",
        boldKeywords: ["Arquipélago"],
        buttonText: "Entrar",
        imageSrc:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        imageAlt: "WTM CV",
      },
      {
        id: 2,
        title: "Tech Hub Praia",
        description:
          "Programas especiais de tecnologia nas ilhas de Santiago e São Vicente.",
        boldKeywords: ["Santiago", "São Vicente"],
        buttonText: "Ver mais",
        imageSrc:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Tech Hub",
      },
      {
        id: 3,
        title: "Futuro das Ilhas",
        description:
          "Construindo uma economia digital forte através das mulheres.",
        boldKeywords: ["economia digital"],
        buttonText: "Saber mais",
        imageSrc:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
        imageAlt: "Economy",
      },
    ],
    leadership: [
      {
        id: "intro-cv",
        type: "intro",
        subtitle: "Programas Cabo Verde",
        title: "Tecnologia nas Ilhas",
        description:
          "Workshops na Praia e Mindelo projetados para capacitá-la.",
      },
      {
        id: "person-cv-1",
        type: "person",
        name: "CATIA LOPES",
        role: "System Architect",
        image: "/images/1765478356516.jpg",
        timeAgo: "HÁ 4 MESES",
        sessionTitle: "Nuvem no Mindelo",
        status: "On demand",
      },
      {
        id: "person-cv-2",
        type: "person",
        name: "SONIA VARELA",
        role: "Product Designer",
        image: "/images/1722976279688.jpg",
        timeAgo: "HÁ 1 ANO",
        sessionTitle: "Design Inclusivo",
        status: "On demand",
      },
    ],
    reviews: DEFAULT_REVIEWS,
    activities: [
      {
        id: "cv-1",
        title: "Mindelo Digital",
        description: "Evento de tecnologia e inovação em Cabo Verde.",
        year: "2023",
        location: "MINDELO",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "cv-2",
        title: "Mentoria CV",
        description: "Mentoria para jovens mulheres cabo-verdianas.",
        year: "2022",
        location: "ONLINE (CV)",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
        types: ["artigo"],
        link: "#",
      },
      {
        id: "cv-3",
        title: "Workshop de Apps",
        description: "Workshop de desenvolvimento de aplicativos.",
        year: "2022",
        location: "PRAIA",
        imageUrl:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
      {
        id: "cv-4",
        title: "Feira de Oportunidades",
        description: "Feira de carreiras e oportunidades para mulheres.",
        year: "2023",
        location: "MINDELO",
        imageUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
        types: ["evento"],
        link: "#",
      },
    ],
    programs: DEFAULT_PROGRAMS,
  },
};

// Default exports for backward compatibility
export const SLIDES: SlideData[] = COUNTRY_DATA["Angola"].slides;
export const LEADERSHIP_CARDS: LeadershipCardData[] =
  COUNTRY_DATA["Angola"].leadership;

export const SHE_BUILDS_CARDS: SheBuildsCardData[] = [
  {
    id: "sb-intro",
    type: "intro",
    subtitle: "EMPOWER. INNOVATE. BUILD.",
    title: "She Builds AI",
    description:
      "Gain AI skills, connect with a community, and grow as a leader in tech. Through training on cutting-edge Google AI tools and access to trailblazing women and inspiring stories, we're building a future where women thrive in AI.",
  },
  {
    id: "sb-hackathon",
    type: "hackathon",
    label: "GLOBAL HACKATHON",
    title:
      "Build groundbreaking AI solutions for women worldwide - join the hackathon today!",
    image:
      "https://img.freepik.com/premium-vector/mountain-climbing-concept-illustration_114360-10141.jpg",
  },
];

export const WTMLogoColored = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-[#1a73e8]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
  </svg>
);
