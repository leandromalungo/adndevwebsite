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
  color?: string;
  link?: string;
}

export interface CountryContent {
  slides: SlideData[];
  leadership: LeadershipCardData[];
  activities: Activity[];
  programs: {
    universities: ProgramItem[];
    platforms: ProgramItem[];
    bigTech: ProgramItem[];
  };
}

const DEFAULT_PROGRAMS = {
  universities: [
      {
        name: "Women Who Tech",
        link: "https://womenwhotech.com/",
        logo: "https://iili.io/qxCs7S4.png",
      },
      {
        name: "AnitaB.org (Girls in Tech)",
        link: "https://anitab.org/",
        logo: "https://iili.io/qxCmnrF.webp",
      },
      {
        name: "Women Techmakers (Google)",
        link: "https://wtm.tech/",
        logo: "https://iili.io/qxnHkPV.png",
      }
    
  ],
  platforms: [
    { logo: "https://iili.io/qxJ3sx1.png", name: "Coursera", color: "bg-blue-600 text-white" },
    { logo: "https://iili.io/qxfzm8l.png", name: "Udacity", color: "bg-blue-700 text-white" },
    { logo: "https://iili.io/qxfEorB.png", name: "LinkedIn Learning", color: "bg-blue-500 text-white" },
    { logo: "https://iili.io/qxfSpwv.png", name: "Noble Desktop", color: "bg-black text-white" },
    { logo: "https://iili.io/qxq3L8X.png", name: "freeCodeCamp", color: "bg-gray-950 text-white" },
    { logo: "https://iili.io/qxqocmP.png", name: "CodeSignal", color: "bg-blue-100" },
    { logo: "https://iili.io/qxqAAEF.jpg", name: "Boot.dev", color: "bg-amber-100" },
  ],
  bigTech: [
    { logo: "https://iili.io/qopdnlS.webp", name: "Google", color: "bg-white" },
    { logo: "https://iili.io/qoyHrOu.png", name: "Amazon", color: "bg-black text-white" },
    { logo: "https://iili.io/qoyBzKb.png", name: "Microsoft", color: "bg-white" },
    { logo: "https://iili.io/qoyRg6B.jpg", name: "Meta", color: "bg-blue-50" },
    { logo: "https://iili.io/qx9dIbn.png", name: "Web Summit", color: "bg-gray-900 text-white" },
  ],
};

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
        "id": "cftic-angola-intro",
        "type": "leader",
        "title": "Comunidade Feminina de Tecnologia de Angola (CFTIC/CFTIA)",
        "subtitle": "Associação para inclusão de mulheres em TI",
        "description": "Organização angolana sem fins lucrativos que promove a participação de mulheres e meninas nas Tecnologias de Informação e Comunicação através de formações técnicas, mentorias, estágios e eventos.",
        "status": "ativa",
        "link": "https://www.cftic.ao",
        "image": "/images/initiatives/cftic-angola.jpg"
      },
      {
        "id": "women-techmakers-luanda-intro",
        "type": "leader",
        "title": "Women Techmakers Luanda",
        "subtitle": "Capítulo local do programa da Google para mulheres em tecnologia",
        "description": "Comunidade em Luanda que organiza meetups, workshops e bootcamps para apoiar e dar visibilidade a mulheres desenvolvedoras e profissionais de tecnologia.",
        "status": "ativa",
        "link": "https://wtmluanda.netlify.app",
        "image": "/images/initiatives/wtm-luanda.jpg"
      },
      {
        "id": "women-in-tech-angola-intro",
        "type": "leader",
        "title": "Women in Tech Angola – Programa UJUMO",
        "subtitle": "Capacitação em literacia digital e cibersegurança",
        "description": "Capítulo angolano da rede Women in Tech com programa focado em competências técnicas e comportamentais para jovens mulheres interessadas em literacia digital, segurança e cibersegurança.",
        "status": "ativa",
        "link": "https://women-in-tech.org/women-in-tech-angola",
        "image": "/images/initiatives/women-in-tech-angola.jpg"
      },
    ],
    activities: DEFAULT_ACTIVITIES.map((a) => ({
      ...a,
      location: a.location + " (ANGOLA)",
    })),
    programs: {
      universities: [
        {
          name: "WTM Luanda",
          link: "https://wtmluanda.netlify.app",
          logo: "https://iili.io/qxH8z4R.png"
        },
        {
          name: "Women in Tech Angola",
          link: "https://freeimage.host/a/adndeveloper.mASyl",
          logo: "https://iili.io/qxHLPJs.png"
        },
        {
          name: "CFTIC Angola",
          link: "https://www.cftic.ao",
          logo: "https://iili.io/qxJ3sx1.png"
        }
      ],
      platforms: DEFAULT_PROGRAMS.platforms,
      bigTech: DEFAULT_PROGRAMS.bigTech,
    },
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
        id: "br-reprograma-intro",
        type: "leader",
        title: "{reprograma}",
        subtitle: "Formação em programação para mulheres",
        description: "Iniciativa de impacto social que oferece cursos gratuitos e bolsas em programação para mulheres cis e trans, com foco em reduzir a lacuna de gênero em TI.",
        status: "ativa",
        image: "",
        link: "https://www.reprograma.com.br"
      },
      {
        id: "br-womakerscode-intro",
        type: "leader",
        title: "WoMakersCode",
        subtitle: "Educação e mentoria para mulheres na tecnologia",
        description: "Comunidade que oferece bootcamps, cursos e mentorias em áreas como back-end Python, back-end Java e outras carreiras digitais, impulsionando mulheres diversas na tecnologia.",
        status: "ativa",
        image: "",
        link: "https://womakerscode.org"
      },
      {
        id: "br-programaria-intro",
        type: "leader",
        title: "PrograMaria",
        subtitle: "Primeiros passos na programação para mulheres",
        description: "Startup que desenvolve cursos online introdutórios de programação e dados para mulheres, com bolsas e valores acessíveis, visando ampliar a diversidade na tecnologia.",
        status: "ativa",
        image: "",
        link: "https://www.programaria.org"
      }
    ],
    activities: DEFAULT_ACTIVITIES.map((a) => ({
      ...a,
      location: a.location + " (BRASIL)",
    })),
    programs: {
      universities:
        [
          {
            "name": "PyLadies Brasil",
            "link": "http://brasil.pyladies.com/",
            "logo": "https://iili.io/qxBE1kP.png",
          },
          { 
            "name": "Ladies in Tech",
            "link": "https://ladiesintech.com.br",
            "logo": "https://iili.io/qxBWMSR.png",

          },
          {
            "name": "Women Techmakers Brasil",
            "link": "https://www.instagram.com/wtmbrasil/",
            "logo": "https://iili.io/qxBeTsS.jpg",
          },
          {
            "name": "SysAdminas",
            "link": "https://sysadminas.com.br/",
            "logo": "https://iili.io/qxBrhnj.png",
          }],
      platforms: DEFAULT_PROGRAMS.platforms,
      bigTech: DEFAULT_PROGRAMS.bigTech,
    },
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
        description: "O futuro das mulheres em tech na Europa. Descubra as iniciativas que estão a transformar o cenário tecnológico português e a criar oportunidades para mulheres em todo o país.",
      },
      {
        id: "pt-women-in-tech-pt-intro",
        type: "leader",
        title: "Women in Tech Portugal",
        subtitle: "Comunidade global de mulheres em tecnologia",
        description: "Capítulo português de movimento global presente em 60+ países, com eventos, workshops, mentorias e formação para capacitar mulheres e raparigas em TI até 2030.",
        status: "ativa",
        image: "",
        link: "https://www.womenintech.pt"
      },
      {
        id: "pt-raparigas-do-codigo-intro",
        type: "leader",
        title: "Raparigas do Código",
        subtitle: "Comunidade para inclusão digital feminina",
        description: "Comunidade jovem que promove programação para raparigas (ensino básico a superior) através de clubes, hackatons, webinars e encontros presenciais para desmistificar TI.",
        status: "ativa",
        image: "",
        link: "https://raparigasdocodigo.pt"
      },
      {
        id: "pt-programa-raparigas-stem-intro",
        type: "leader",
        title: "Programa Nacional das Raparigas nas STEM",
        subtitle: "Iniciativa governamental para STEM feminina",
        description: "Programa nacional para atrair e reter raparigas/mulheres em STEM (incluindo TIC), com mentoras, formação contínua e ações em educação, superior e mercado de trabalho.",
        status: "ativa",
        image: "",
        link: "https://digital.gov.pt/estrategias/estrategia-digital-nacional/as-pessoas/02-programa-nacional-raparigas-nas-stem"
      }
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
        description: "Crescendo em Maputo. Descubra as iniciativas que estão a transformar o cenário tecnológico moçambicano e a criar oportunidades para mulheres em todo o país.",
      },
      {
        id: "mz-coding-girls-uem-intro",
        type: "leader",
        title: "Coding Girls – As Mulheres do Amanhã na Economia Digital",
        subtitle: "Projeto da Universidade Eduardo Mondlane para raparigas em tecnologia",
        description: "Iniciativa do Espaço de Inovação da Universidade Eduardo Mondlane que formou mais de mil raparigas moçambicanas em programação e desenvolvimento de soluções tecnológicas entre 2022 e 2025.",
        status: "encerrada/legado",
        image: "",
        link: "https://uem.mz"
      },
      {
        id: "mz-african-girls-can-code-intro",
        type: "leader",
        title: "African Girls Can Code Initiative (AGCCI) – ONU Mulheres Moçambique",
        subtitle: "Campus de literacia digital e programação para raparigas",
        description: "Programa da ONU Mulheres em colaboração com o Ministério da Ciência, Tecnologia e Ensino Superior que capacita raparigas moçambicanas em literacia digital, codificação e programação para carreiras em TIC.",
        status: "ativa",
        image: "",
        link: "https://www.unwomen.org"
      },
      {
        id: "mz-economic-linkages-women-intro",
        type: "leader",
        title: "Economic Linkages for Diversification – Empoderamento Feminino Digital",
        subtitle: "Projeto do Ministério da Economia e Finanças de Moçambique",
        description: "Iniciativa apoiada pelo Banco Mundial que inclui ações específicas para empreendedorismo feminino, com foco em capacitação e fortalecimento digital de negócios liderados por mulheres.",
        status: "ativa",
        image: "",
        link: "https://www.mef.gov.mz"
      }
    ],
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
    ],
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
        description: "Mentoria e crescimento tecnológico. Descubra as iniciativas que estão a transformar o cenário tecnológico guineense e a criar oportunidades para mulheres em todo o país.",
      },
    ],
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
        id: "cv-women-in-tech-cv-intro",
        type: "leader",
        title: "Women in Tech Cabo Verde (WIT-CV)",
        subtitle: "Capítulo cabo-verdiano para empoderamento feminino em TIC",
        description: "Organização dedicada a aumentar a representação feminina na tecnologia através de summits internacionais, workshops, mentoria e redes de apoio para mulheres e raparigas nas TIC.",
        status: "ativa",
        image: "",
        link: "https://www.facebook.com/womenintechcv/"
      }
    ],
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
