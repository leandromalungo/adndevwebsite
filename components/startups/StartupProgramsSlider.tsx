"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ExternalLink, Users, MapPin, Tag, ChevronLeft, ChevronRight } from "lucide-react";

type StartupFilterTab =
  | "Todos"
  | "Angola"
  | "Brasil"
  | "Portugal"
  | "Moçambique"
  | "Cabo Verde"
  | "Guiné-Bissau"
  | "São Tomé e Príncipe"
  | "Timor-Leste"
  | "Global";

const STARTUP_FILTER_TABS: StartupFilterTab[] = [
  "Todos",
  "Angola",
  "Brasil",
  "Portugal",
  "Moçambique",
  "Cabo Verde",
  "Guiné-Bissau",
  "São Tomé e Príncipe",
  "Timor-Leste",
  "Global",
];

type Program = {
  id: string;
  name: string;
  organization: string;
  country: Exclude<StartupFilterTab, "Todos">;
  logo: string;
  imageFit?: "cover" | "contain";
  description: string;
  tags: string[];
  region: string;
  link: string;
  type: "incubadora" | "aceleradora" | "fundo" | "programa";
};

const PROGRAMS_LIST: Program[] = [
  // ==================== ANGOLA ====================
  {
    id: "ao-acelera",
    name: "Acelera Angola",
    organization: "Acelera Net / Acelera Angola",
    country: "Angola",
    logo: "/images/programs/acelera-angola.png",
    imageFit: "cover",
    description:
      "Principal incubadora e aceleradora privada de Angola, com mentoria, programas de validação e ligação entre empreendedores e investidores.",
    tags: ["Aceleração", "Incubação", "Inovação"],
    region: "Luanda",
    link: "https://www.aceleranet.ao/",
    type: "aceleradora",
  },
  {
    id: "ao-lispa",
    name: "LISPA – Laboratório de Inovação do Sistema de Pagamentos",
    organization: "Banco Nacional de Angola & INAPEM",
    country: "Angola",
    logo: "/images/programs/lispa.png",
    imageFit: "contain",
    description:
      "Incubadora e laboratório regulatório dedicado a fintechs e soluções de inclusão financeira e pagamentos digitais em Angola.",
    tags: ["Fintech", "Pagamentos", "Incubação"],
    region: "Luanda",
    link: "https://www.lispa.ao/",
    type: "incubadora",
  },
  {
    id: "ao-orange-corners",
    name: "Orange Corners Angola",
    organization: "Reino dos Países Baixos & Parceiros Locais",
    country: "Angola",
    logo: "/images/programs/orange-corners.png",
    imageFit: "cover",
    description:
      "Programa internacional de incubação de 6 meses para jovens empreendedores em Luanda, com formação prática, mentoria e acesso a financiamento.",
    tags: ["Incubação", "Juventude", "Financiamento"],
    region: "Luanda",
    link: "https://www.orangecorners.com/country/angola/",
    type: "incubadora",
  },
  {
    id: "ao-fi-luanda",
    name: "Founder Institute Luanda",
    organization: "Founder Institute",
    country: "Angola",
    logo: "/images/programs/founder-institute.jpg",
    imageFit: "cover",
    description:
      "Capítulo angolano da maior rede global de pré-aceleração, apoiando fundadores em fase inicial com metodologia estruturada e mentores internacionais.",
    tags: ["Pré-seed", "Mentoria", "Global"],
    region: "Luanda",
    link: "https://fi.co/luanda",
    type: "aceleradora",
  },
  {
    id: "ao-kiandahub",
    name: "KiandaHub",
    organization: "KiandaHub",
    country: "Angola",
    logo: "/images/programs/kiandahub.png",
    imageFit: "contain",
    description:
      "Hub pioneiro de tecnologia, coworking e inovação em Luanda que acolhe comunidades tech, programas de aceleração e eventos para startups.",
    tags: ["Hub Tech", "Coworking", "Comunidade"],
    region: "Luanda",
    link: "https://kiandahub.com/",
    type: "incubadora",
  },
  {
    id: "ao-bantu-makers",
    name: "Bantu Makers",
    organization: "Bantu Makers",
    country: "Angola",
    logo: "/images/programs/bantu-makers.png",
    imageFit: "contain",
    description:
      "Startup studio angolano que constrói, incuba e apoia novos negócios digitais em Angola com equipa multidisciplinar e capital inicial.",
    tags: ["Startup Studio", "Venture Builder", "Digital"],
    region: "Luanda",
    link: "https://bantumakers.com/",
    type: "incubadora",
  },
  {
    id: "ao-unitel-go",
    name: "Unitel Go Challenge",
    organization: "UNITEL",
    country: "Angola",
    logo: "/images/programs/unitel-go.png",
    imageFit: "contain",
    description:
      "Concurso e programa anual de aceleração da UNITEL que premeia e capacita startups digitais angolanas de alto potencial.",
    tags: ["Desafio", "Prémios", "Inovação"],
    region: "Nacional",
    link: "https://www.unitel.ao/",
    type: "programa",
  },
  {
    id: "ao-bna-sandbox",
    name: "Sandbox Regulatório do BNA",
    organization: "Banco Nacional de Angola",
    country: "Angola",
    logo: "/images/programs/bna-sandbox.jpg",
    imageFit: "cover",
    description:
      "Ambiente regulatório controlado pelo Banco Nacional de Angola para testar produtos financeiros inovadores com segurança jurídica.",
    tags: ["Regulação", "Fintech", "Banco Central"],
    region: "Luanda",
    link: "https://www.bna.ao/",
    type: "programa",
  },
  {
    id: "ao-totalenergies",
    name: "TotalEnergies Startupper Challenge Angola",
    organization: "TotalEnergies",
    country: "Angola",
    logo: "/images/programs/totalenergies-startupper.jpg",
    imageFit: "cover",
    description:
      "Desafio pan-africano da TotalEnergies que apoia jovens empreendedores angolanos com bolsas financeiras, coaching e visibilidade.",
    tags: ["Impacto", "Energia", "Subvenção"],
    region: "Nacional",
    link: "https://startupper.totalenergies.com/",
    type: "programa",
  },

  // ==================== BRASIL ====================
  {
    id: "br-cubo-itau",
    name: "Cubo Itaú",
    organization: "Itaú Unibanco",
    country: "Brasil",
    logo: "/images/programs/cubo-itau.webp",
    imageFit: "cover",
    description:
      "Um dos maiores hubs de fomento ao empreendedorismo tecnológico da América Latina, conectando startups em tração a grandes empresas e fundos.",
    tags: ["Hub", "Corporate", "Escala"],
    region: "São Paulo",
    link: "https://cubo.itau/",
    type: "aceleradora",
  },
  {
    id: "br-inovativa",
    name: "InovAtiva Brasil",
    organization: "MDIC & Sebrae",
    country: "Brasil",
    logo: "/images/programs/inovativa-brasil.jpg",
    imageFit: "cover",
    description:
      "Programa público gratuito de aceleração em larga escala para startups brasileiras, com ciclos para tração, impacto socioambiental e bioeconomia.",
    tags: ["Gratuito", "Equity-free", "Nacional"],
    region: "Nacional",
    link: "https://www.inovativa.online/",
    type: "programa",
  },
  {
    id: "br-google-campus-sp",
    name: "Google for Startups Campus São Paulo",
    organization: "Google for Startups",
    country: "Brasil",
    logo: "/images/programs/google-startups.webp",
    imageFit: "cover",
    description:
      "Campus físico e programas de aceleração do Google no Brasil com mentorias em IA, cloud, produto e acesso à rede global do Google.",
    tags: ["Google", "IA & Cloud", "Aceleração"],
    region: "São Paulo",
    link: "https://startup.google.com/campus/sao-paulo/",
    type: "aceleradora",
  },
  {
    id: "br-porto-digital",
    name: "Porto Digital",
    organization: "Porto Digital",
    country: "Brasil",
    logo: "/images/programs/porto-digital.png",
    imageFit: "contain",
    description:
      "Um dos maiores parques tecnológicos e ambientes abertos de inovação do Brasil, abrigando mais de 400 empresas e programas de incubação no Recife.",
    tags: ["Parque Tech", "Ecossistema", "Software"],
    region: "Recife",
    link: "https://www.portodigital.org/",
    type: "incubadora",
  },
  {
    id: "br-tecnopuc",
    name: "Tecnopuc (PUCRS)",
    organization: "PUCRS",
    country: "Brasil",
    logo: "/images/programs/tecnopuc.webp",
    imageFit: "cover",
    description:
      "Parque Científico e Tecnológico da PUCRS em Porto Alegre, referência nacional em pré-incubação, incubação e conexão universidade-empresa.",
    tags: ["Universidade", "Deep Tech", "Incubação"],
    region: "Porto Alegre",
    link: "https://www.pucrs.br/tecnopuc/",
    type: "incubadora",
  },
  {
    id: "br-hotmilk",
    name: "HOTMILK – Ecossistema de Inovação PUCPR",
    organization: "PUCPR",
    country: "Brasil",
    logo: "/images/programs/hotmilk.png",
    imageFit: "contain",
    description:
      "Ecossistema de inovação da PUCPR em Curitiba com programas de aceleração, venture building e conexão corporativa para startups tecnológicas.",
    tags: ["Universidade", "Aceleração", "Inovação"],
    region: "Curitiba",
    link: "https://www.pucpr.br/hotmilk/",
    type: "aceleradora",
  },
  {
    id: "br-darwin",
    name: "Darwin Startups",
    organization: "Darwin Startups",
    country: "Brasil",
    logo: "/images/programs/darwin-startups.webp",
    imageFit: "cover",
    description:
      "Aceleradora premiada do Sul e Sudeste brasileiro com investimento financeiro, mentoria intensiva e parceria estratégica com grandes corporações.",
    tags: ["Seed", "Fintech", "B2B"],
    region: "Florianópolis / SP",
    link: "https://darwinstartups.com/",
    type: "aceleradora",
  },
  {
    id: "br-sebrae-startups",
    name: "Sebrae Startups",
    organization: "Sebrae",
    country: "Brasil",
    logo: "/images/programs/sebrae-startups.webp",
    imageFit: "cover",
    description:
      "Plataforma nacional do Sebrae que oferece capacitação, mentorias, editais e acesso a feiras como Startup Summit para startups em todo o Brasil.",
    tags: ["Nacional", "Capacitação", "Networking"],
    region: "Nacional",
    link: "https://sebraestartups.com.br/",
    type: "programa",
  },
  {
    id: "br-bndes-garagem",
    name: "BNDES Garagem",
    organization: "BNDES",
    country: "Brasil",
    logo: "/images/programs/bndes-garagem.jpg",
    imageFit: "cover",
    description:
      "Programa do Banco Nacional de Desenvolvimento Econômico e Social para criação e aceleração de negócios de impacto socioambiental positivo.",
    tags: ["Impacto", "Equity-free", "Nacional"],
    region: "Rio de Janeiro / Nacional",
    link: "https://www.bndes.gov.br/wps/portal/site/home/onde-atuamos/inovacao/bndes-garagem",
    type: "aceleradora",
  },
  {
    id: "br-artemisia",
    name: "Artemisia",
    organization: "Artemisia",
    country: "Brasil",
    logo: "/images/programs/artemisia.jpg",
    imageFit: "cover",
    description:
      "Organização pioneira no Brasil no apoio e aceleração de negócios de impacto social em saúde, educação, finanças e inclusão produtiva.",
    tags: ["Impacto Social", "Educação", "Saúde"],
    region: "São Paulo",
    link: "https://artemisia.org.br/",
    type: "aceleradora",
  },
  {
    id: "br-quintessa",
    name: "Quintessa",
    organization: "Quintessa",
    country: "Brasil",
    logo: "/images/programs/quintessa.png",
    imageFit: "contain",
    description:
      "Aceleradora de negócios de impacto positivo que conecta startups brasileiras a fundos de investimento e corporações comprometidas com ESG.",
    tags: ["Impacto", "ESG", "Aceleração"],
    region: "São Paulo",
    link: "https://quintessa.org.br/",
    type: "aceleradora",
  },
  {
    id: "br-wow",
    name: "WOW Aceleradora",
    organization: "WOW Aceleradora",
    country: "Brasil",
    logo: "/images/programs/wow-aceleradora.png",
    imageFit: "cover",
    description:
      "Aceleradora independente que une mais de 300 investidores-anjos executivos para investir e mentorar startups B2B de todo o Brasil.",
    tags: ["Investimento Anjo", "SaaS", "Mentoria"],
    region: "Porto Alegre / Nacional",
    link: "https://www.wow.ac/",
    type: "aceleradora",
  },
  {
    id: "br-distrito",
    name: "Distrito",
    organization: "Distrito",
    country: "Brasil",
    logo: "/images/programs/distrito.webp",
    imageFit: "cover",
    description:
      "Plataforma de inovação aberta e inteligência sobre startups da América Latina, conectando founders a grandes empresas e venture capital.",
    tags: ["Inovação Aberta", "Dados", "Corporate"],
    region: "São Paulo",
    link: "https://distrito.me/",
    type: "programa",
  },
  {
    id: "br-endeavor",
    name: "Endeavor Brasil – Scale-Up",
    organization: "Endeavor",
    country: "Brasil",
    logo: "/images/programs/endeavor-brasil.webp",
    imageFit: "cover",
    description:
      "Rede global de apoio a empreendedores de alto crescimento, com programas Scale-Up e mentoria com líderes das maiores scale-ups do país.",
    tags: ["Scale-Up", "Alto Impacto", "Rede Global"],
    region: "Nacional",
    link: "https://brasil.endeavor.org/",
    type: "aceleradora",
  },
  {
    id: "br-boostlab",
    name: "boostLAB – BTG Pactual",
    organization: "BTG Pactual",
    country: "Brasil",
    logo: "/images/programs/boostlab-btg.png",
    imageFit: "cover",
    description:
      "Hub de negócios do BTG Pactual que acelera startups em estágio de escala com mentoria executiva e oportunidades comerciais diretas.",
    tags: ["Fintech", "B2B", "Scale-Up"],
    region: "São Paulo",
    link: "https://www.btgpactual.com/boostlab",
    type: "aceleradora",
  },
  {
    id: "br-centelha",
    name: "Programa Centelha",
    organization: "FINEP / MCTI / CONFAP",
    country: "Brasil",
    logo: "/images/programs/centelha.png",
    imageFit: "contain",
    description:
      "Iniciativa federal e estadual que concede subvenção econômica (recursos não reembolsáveis) para ideias inovadoras virarem startups em todo o Brasil.",
    tags: ["Subvenção", "P&D", "Governo"],
    region: "Nacional",
    link: "https://programacentelha.com.br/",
    type: "fundo",
  },
  {
    id: "br-wayra",
    name: "Wayra Brasil",
    organization: "Telefónica / Vivo",
    country: "Brasil",
    logo: "/images/programs/wayra.png",
    imageFit: "cover",
    description:
      "Fundo de corporate venture capital e hub de inovação aberta da Telefónica que investe e escala startups integradas ao ecossistema Vivo.",
    tags: ["CVC", "Telecom", "Venture Capital"],
    region: "São Paulo",
    link: "https://www.wayra.com/",
    type: "fundo",
  },

  // ==================== PORTUGAL ====================
  {
    id: "pt-startup-portugal",
    name: "Startup Portugal",
    organization: "Startup Portugal",
    country: "Portugal",
    logo: "/images/programs/startup-portugal.png",
    imageFit: "cover",
    description:
      "Entidade pública de fomento ao ecossistema empreendedor em Portugal, responsável por programas como Vale Incubação, Startup Visa e RNI.",
    tags: ["Nacional", "Startup Visa", "Políticas Públicas"],
    region: "Nacional",
    link: "https://startupportugal.com/",
    type: "programa",
  },
  {
    id: "pt-unicorn-factory",
    name: "Unicorn Factory Lisboa & Startup Lisboa",
    organization: "Unicorn Factory Lisboa",
    country: "Portugal",
    logo: "/images/programs/unicorn-factory-lisboa.webp",
    imageFit: "cover",
    description:
      "Principal plataforma de inovação de Lisboa, reunindo incubação, hubs temáticos (IA, Web3, Gaming) e o programa ScaleUp para empresas globais.",
    tags: ["Lisboa", "ScaleUp", "Hubs Temáticos"],
    region: "Lisboa",
    link: "https://unicornfactorylisboa.com/",
    type: "aceleradora",
  },
  {
    id: "pt-fintech-house",
    name: "The Fintech House",
    organization: "Portugal Fintech & Sitawi",
    country: "Portugal",
    logo: "/images/programs/fintech-house.png",
    imageFit: "contain",
    description:
      "Maior hub de fintech, regtech, insurtech e cibersegurança em Portugal, reunindo startups, bancos, reguladores e investidores em Lisboa.",
    tags: ["Fintech", "Insurtech", "RegTech"],
    region: "Lisboa",
    link: "https://thefintechhouse.com/",
    type: "incubadora",
  },
  {
    id: "pt-uptec",
    name: "UPTEC – Parque de Ciência e Tecnologia",
    organization: "Universidade do Porto",
    country: "Portugal",
    logo: "/images/programs/uptec.png",
    imageFit: "cover",
    description:
      "Parque científico e incubadora da Universidade do Porto com centros em Tecnologias, Biotecnologia, Indústrias Criativas e Mar.",
    tags: ["Porto", "Universidade", "Deep Tech"],
    region: "Porto",
    link: "https://uptec.up.pt/",
    type: "incubadora",
  },
  {
    id: "pt-ipn",
    name: "Instituto Pedro Nunes (IPN)",
    organization: "Universidade de Coimbra / IPN",
    country: "Portugal",
    logo: "/images/programs/ipn.jpg",
    imageFit: "cover",
    description:
      "Incubadora tecnológica de Coimbra eleita entre as melhores do mundo, que também aloja a ESA BIC Portugal para tecnologias espaciais.",
    tags: ["Coimbra", "ESA BIC", "Transferência Tech"],
    region: "Coimbra",
    link: "https://www.ipn.pt/",
    type: "incubadora",
  },
  {
    id: "pt-startup-braga",
    name: "Startup Braga",
    organization: "InvestBraga",
    country: "Portugal",
    logo: "/images/programs/startup-braga.png",
    imageFit: "contain",
    description:
      "Hub de inovação do Norte de Portugal com programas de pré-aceleração e aceleração em HealthTech, Nanotecnologia e Economia Digital.",
    tags: ["Braga", "HealthTech", "Aceleração"],
    region: "Braga",
    link: "https://startupbraga.com/",
    type: "aceleradora",
  },
  {
    id: "pt-beta-i",
    name: "Beta-i",
    organization: "Beta-i",
    country: "Portugal",
    logo: "/images/programs/beta-i.png",
    imageFit: "cover",
    description:
      "Consultora e aceleradora internacional sediada em Lisboa, promotora do Lisbon Investment Summit e programas de inovação colaborativa.",
    tags: ["Inovação Aberta", "Internacional", "Lisboa"],
    region: "Lisboa",
    link: "https://beta-i.com/",
    type: "aceleradora",
  },
  {
    id: "pt-fabrica-startups",
    name: "Fábrica de Startups",
    organization: "Fábrica de Startups",
    country: "Portugal",
    logo: "/images/programs/fabrica-startups.webp",
    imageFit: "cover",
    description:
      "Aceleradora portuguesa especializada em criação de novos negócios digitais, ideação e capacitação de empreendedores e intraempreendedores.",
    tags: ["Ideação", "Aceleração", "Negócios Digitais"],
    region: "Lisboa",
    link: "https://www.fabricadestartups.com/",
    type: "aceleradora",
  },
  {
    id: "pt-bgi",
    name: "BGI – Building Global Innovators",
    organization: "BGI & EIT",
    country: "Portugal",
    logo: "/images/programs/bgi.png",
    imageFit: "contain",
    description:
      "Aceleradora deep-tech nascida da parceria MIT Portugal, focada em escalar startups de ciência e tecnologia com mentorias e acesso à Europa.",
    tags: ["Deep Tech", "EIT", "Europa"],
    region: "Lisboa",
    link: "https://www.bgi.pt/",
    type: "aceleradora",
  },
  {
    id: "pt-casa-impacto",
    name: "Casa do Impacto",
    organization: "Santa Casa da Misericórdia de Lisboa",
    country: "Portugal",
    logo: "/images/programs/casa-do-impacto.png",
    imageFit: "cover",
    description:
      "Hub de empreendedorismo social e investimento de impacto em Lisboa com prémios de financiamento, incubação e mentoria para os ODS.",
    tags: ["Impacto Social", "ODS", "Prémios"],
    region: "Lisboa",
    link: "https://casadoimpacto.scml.pt/",
    type: "incubadora",
  },
  {
    id: "pt-impact-hub-lisbon",
    name: "Impact Hub Lisbon",
    organization: "Impact Hub",
    country: "Portugal",
    logo: "/images/programs/impact-hub-lisbon.webp",
    imageFit: "cover",
    description:
      "Comunidade global de empreendedores de impacto em Lisboa com programas de aceleração sustentável, eventos e espaço colaborativo.",
    tags: ["Comunidade Global", "Sustentabilidade", "Coworking"],
    region: "Lisboa",
    link: "https://lisbon.impacthub.net/",
    type: "incubadora",
  },
  {
    id: "pt-lispolis",
    name: "Lispolis – Polo Tecnológico de Lisboa",
    organization: "Lispolis",
    country: "Portugal",
    logo: "/images/programs/lispolis.png",
    imageFit: "contain",
    description:
      "Polo tecnológico e incubadora certificada para Startup Visa em Lisboa, apoiando empresas tech e centros de investigação.",
    tags: ["Startup Visa", "Polo Tech", "Lisboa"],
    region: "Lisboa",
    link: "https://www.lispolis.pt/",
    type: "incubadora",
  },
  {
    id: "pt-madan-parque",
    name: "Madan Parque",
    organization: "FCT NOVA & Municípios da Margem Sul",
    country: "Portugal",
    logo: "/images/programs/madan-parque.png",
    imageFit: "contain",
    description:
      "Parque de ciência e tecnologia ligado à NOVA School of Science and Technology (Almada), apoiando spin-offs e startups tecnológicas.",
    tags: ["Spin-offs", "Ciência", "Almada"],
    region: "Almada / Lisboa",
    link: "https://www.madanparque.pt/",
    type: "incubadora",
  },
  {
    id: "pt-dna-cascais",
    name: "DNA Cascais",
    organization: "DNA Cascais",
    country: "Portugal",
    logo: "/images/programs/dna-cascais.webp",
    imageFit: "cover",
    description:
      "Agência municipal de promoção do empreendedorismo em Cascais com incubadora física, rede de anjos e programas juvenis de inovação.",
    tags: ["Incubadora", "Investimento Anjo", "Cascais"],
    region: "Cascais",
    link: "https://dnacascais.pt/",
    type: "incubadora",
  },

  // ==================== MOÇAMBIQUE ====================
  {
    id: "mz-ideialab",
    name: "ideiaLab Moçambique",
    organization: "ideiaLab",
    country: "Moçambique",
    logo: "/images/programs/ideialab.png",
    imageFit: "contain",
    description:
      "Pioneira em incubação e aceleração em Moçambique, com programas como Orange Corners Maputo e FemTech apoiando empreendedores locais.",
    tags: ["Incubação", "FemTech", "Ecossistema"],
    region: "Maputo",
    link: "https://ideialab.biz/",
    type: "aceleradora",
  },
  {
    id: "mz-orange-corners",
    name: "Orange Corners Moçambique",
    organization: "Orange Corners & ideiaLab",
    country: "Moçambique",
    logo: "/images/programs/orange-corners.png",
    imageFit: "cover",
    description:
      "Programa holandês de incubação para jovens fundadores em Maputo com formação empresarial intensiva, mentoria e fundos de prototipagem.",
    tags: ["Juventude", "Prototipagem", "Mentoria"],
    region: "Maputo",
    link: "https://www.orangecorners.com/country/mozambique/",
    type: "incubadora",
  },
  {
    id: "mz-standard-bank",
    name: "Incubadora de Negócios Standard Bank",
    organization: "Standard Bank Moçambique",
    country: "Moçambique",
    logo: "/images/programs/standard-bank-mz.jpg",
    imageFit: "cover",
    description:
      "Espaço de referência em Maputo dedicado ao empreendedorismo, hackathon fintech, capacitação de PMEs e networking corporativo.",
    tags: ["Banco", "Fintech", "Espaço de Inovação"],
    region: "Maputo",
    link: "https://www.standardbank.co.mz/",
    type: "incubadora",
  },
  {
    id: "mz-uem",
    name: "Incubadora de Empresas da UEM",
    organization: "Universidade Eduardo Mondlane",
    country: "Moçambique",
    logo: "/images/programs/uem-mz.png",
    imageFit: "cover",
    description:
      "Incubadora académica da Universidade Eduardo Mondlane que transforma investigação e talento universitário em negócios tecnológicos viáveis.",
    tags: ["Universidade", "Académica", "Inovação"],
    region: "Maputo",
    link: "https://uem.mz/",
    type: "incubadora",
  },
  {
    id: "mz-gapi",
    name: "Gapi – Sociedade de Investimentos",
    organization: "Gapi S.I.",
    country: "Moçambique",
    logo: "/images/programs/gapi-mz.png",
    imageFit: "contain",
    description:
      "Instituição financeira de desenvolvimento em Moçambique que combina assistência técnica, incubação e financiamento a jovens e PMEs inovadoras.",
    tags: ["Financiamento", "Desenvolvimento", "PMEs"],
    region: "Nacional",
    link: "https://www.gapi.co.mz/",
    type: "fundo",
  },
  {
    id: "mz-mozdevz",
    name: "MozDevz – Incubação & Talentos Digitais",
    organization: "MozDevz",
    country: "Moçambique",
    logo: "/images/programs/mozdevz.png",
    imageFit: "contain",
    description:
      "Comunidade e iniciativa moçambicana de programadores que promove hackathons, formações práticas e apoio ao nascimento de produtos digitais.",
    tags: ["Developers", "Hackathons", "Produtos Digitais"],
    region: "Maputo / Beira / Nampula",
    link: "https://www.mozdevz.org/",
    type: "programa",
  },

  // ==================== CABO VERDE ====================
  {
    id: "cv-digital",
    name: "Cabo Verde Digital (Bolsa Digital & Startup Young)",
    organization: "Cabo Verde Digital / Governo de Cabo Verde",
    country: "Cabo Verde",
    logo: "/images/programs/cabo-verde-digital.jpg",
    imageFit: "contain",
    description:
      "Plataforma pública de referência no arquipélago com programas Bolsa Digital e Startup Young para capacitação, pré-incubação e bolsas tech.",
    tags: ["Bolsa Digital", "Pré-incubação", "Governo"],
    region: "Praia / Nacional",
    link: "https://caboverdedigital.cv/",
    type: "programa",
  },
  {
    id: "cv-techpark",
    name: "TechPark CV – Parque Tecnológico de Cabo Verde",
    organization: "TechPark CV",
    country: "Cabo Verde",
    logo: "/images/programs/techpark-cv.png",
    imageFit: "contain",
    description:
      "Infraestrutura tecnológica internacional na Praia e Mindelo com centro de incubação, data center, centro de formação e espaços para startups.",
    tags: ["Parque Tech", "Incubação", "África Ocidental"],
    region: "Praia & São Vicente",
    link: "https://techpark.cv/",
    type: "incubadora",
  },
  {
    id: "cv-proempresa",
    name: "Pró Empresa – Fundo & Apoio ao Empreendedor",
    organization: "Pró Empresa",
    country: "Cabo Verde",
    logo: "/images/programs/proempresa-cv.png",
    imageFit: "contain",
    description:
      "Instituto público cabo-verdiano que apoia jovens e micro, pequenas e médias empresas através de assistência técnica, pré-incubação e garantias.",
    tags: ["Financiamento", "MPME", "Assistência Técnica"],
    region: "Nacional",
    link: "https://proempresa.cv/index.php/pt/",
    type: "fundo",
  },
  {
    id: "cv-nosi",
    name: "NOSi Akademia",
    organization: "NOSi – Núcleo Operacional da Sociedade de Informação",
    country: "Cabo Verde",
    logo: "/images/programs/nosi-cv.png",
    imageFit: "contain",
    description:
      "Programa de capacitação e inovação tecnológica do NOSi que prepara jovens engenheiros e fundadores de soluções digitais em Cabo Verde.",
    tags: ["Engenharia", "Talentos Tech", "Inovação"],
    region: "Praia",
    link: "https://www.nosi.cv/",
    type: "programa",
  },

  // ==================== GUINÉ-BISSAU ====================
  {
    id: "gw-orange-digital",
    name: "Orange Digital Center & Orange Fab Guiné-Bissau",
    organization: "Orange Guiné-Bissau / Fundação Orange",
    country: "Guiné-Bissau",
    logo: "/images/programs/orange-digital-center.png",
    imageFit: "contain",
    description:
      "Centro gratuito em Bissau com Escola de Código, FabLab Solidário e aceleradora Orange Fab para jovens programadores e startups locais.",
    tags: ["Escola de Código", "FabLab", "Aceleração"],
    region: "Bissau",
    link: "https://orangedigitalcenters.com/",
    type: "aceleradora",
  },
  {
    id: "gw-innovalab",
    name: "InnovaLab Guiné-Bissau",
    organization: "InnovaLab",
    country: "Guiné-Bissau",
    logo: "/images/programs/innovalab-gw.jpg",
    imageFit: "cover",
    description:
      "Centro de inovação tecnológica e empreendedorismo em Bissau que fomenta a transformação digital, prototipagem e apoio a novos projetos.",
    tags: ["Hub Tech", "Inovação", "Juventude"],
    region: "Bissau",
    link: "https://www.innovalab-gw.org/",
    type: "incubadora",
  },
  {
    id: "gw-undp-lab",
    name: "UNDP Accelerator Lab Guiné-Bissau",
    organization: "PNUD Guiné-Bissau",
    country: "Guiné-Bissau",
    logo: "/images/programs/undp-accelerator.png",
    imageFit: "contain",
    description:
      "Laboratório do PNUD que apoia empreendedores locais, desafios de inovação social e soluções digitais para o desenvolvimento sustentável.",
    tags: ["PNUD", "Impacto Social", "Experimentação"],
    region: "Bissau",
    link: "https://www.undp.org/guinea-bissau/accelerator-lab",
    type: "programa",
  },

  // ==================== SÃO TOMÉ E PRÍNCIPE ====================
  {
    id: "st-empreende",
    name: "REINA & Plataforma Empreende+ STP",
    organization: "Governo de São Tomé e Príncipe",
    country: "São Tomé e Príncipe",
    logo: "/images/programs/empreende-stp.png",
    imageFit: "contain",
    description:
      "Portal oficial do ecossistema empreendedor santomense integrando a Rede Nacional de Incubadoras (REINA), mentoria e concursos para jovens.",
    tags: ["REINA", "Incubação", "Juventude"],
    region: "São Tomé",
    link: "https://empreendedorismo.gov.st/pt/",
    type: "programa",
  },
  {
    id: "st-undp",
    name: "PNUD São Tomé e Príncipe – Juventude & Inovação",
    organization: "PNUD STP",
    country: "São Tomé e Príncipe",
    logo: "/images/programs/undp-accelerator.png",
    imageFit: "contain",
    description:
      "Iniciativas do PNUD em São Tomé e Príncipe de fomento ao empreendedorismo jovem, economia azul/verde e capacitação digital.",
    tags: ["PNUD", "Economia Azul", "Capacitação"],
    region: "São Tomé e Príncipe",
    link: "https://www.undp.org/sao-tome-and-principe",
    type: "programa",
  },

  // ==================== TIMOR-LESTE ====================
  {
    id: "tl-iade",
    name: "IADE – Instituto de Apoio ao Desenvolvimento Empresarial",
    organization: "IADE Timor-Leste",
    country: "Timor-Leste",
    logo: "/images/programs/iade-tl.jpg",
    imageFit: "cover",
    description:
      "Instituição pública timorense responsável por incubação empresarial, concursos de planos de negócio inovadores e capacitação de empreendedores.",
    tags: ["Incubação", "Governo", "Empresas"],
    region: "Díli",
    link: "https://iade.gov.tl/",
    type: "incubadora",
  },
  {
    id: "tl-undp",
    name: "UNDP Timor-Leste Accelerator Lab & YEES",
    organization: "PNUD Timor-Leste",
    country: "Timor-Leste",
    logo: "/images/programs/undp-accelerator.png",
    imageFit: "contain",
    description:
      "Laboratório de aceleração e programa Youth Employment & Entrepreneurship Skills que financia e acompanha jovens fundadores em Timor-Leste.",
    tags: ["PNUD", "Juventude", "Aceleração"],
    region: "Díli",
    link: "https://www.undp.org/timor-leste/accelerator-labs",
    type: "aceleradora",
  },

  // ==================== GLOBAL (ACESSÍVEL À LUSOFONIA) ====================
  {
    id: "gl-aws-activate",
    name: "AWS Activate for Startups",
    organization: "Amazon Web Services",
    country: "Global",
    logo: "/images/programs/aws-activate.png",
    imageFit: "contain",
    description:
      "Créditos gratuitos de infraestrutura cloud (até USD 100.000), suporte técnico e arquitetura para startups elegíveis em toda a lusofonia.",
    tags: ["Créditos Cloud", "Infraestrutura", "Global"],
    region: "Online / Global",
    link: "https://aws.amazon.com/startups/",
    type: "programa",
  },
  {
    id: "gl-ms-founders",
    name: "Microsoft for Startups Founders Hub",
    organization: "Microsoft",
    country: "Global",
    logo: "/images/programs/microsoft-startups.webp",
    imageFit: "cover",
    description:
      "Créditos Azure até USD 150.000, acesso a modelos OpenAI/AI, ferramentas GitHub Enterprise e mentoria técnica sem exigir investidor prévio.",
    tags: ["Azure & IA", "GitHub", "Sem Investidor Prévio"],
    region: "Online / Global",
    link: "https://www.microsoft.com/en-us/startups",
    type: "programa",
  },
  {
    id: "gl-google-startups",
    name: "Google for Startups Cloud Program",
    organization: "Google Cloud",
    country: "Global",
    logo: "/images/programs/google-startups.webp",
    imageFit: "cover",
    description:
      "Acesso a créditos Google Cloud para startups early-stage e de IA (até USD 200.000 ou USD 350.000 em programas AI-first) além de sessões técnicas.",
    tags: ["Google Cloud", "AI-First", "Créditos"],
    region: "Online / Global",
    link: "https://startup.google.com/",
    type: "programa",
  },
  {
    id: "gl-y-combinator",
    name: "Y Combinator (YC)",
    organization: "Y Combinator",
    country: "Global",
    logo: "/images/programs/y-combinator.png",
    imageFit: "contain",
    description:
      "A mais reconhecida aceleradora mundial de startups: investimento padrão de USD 500.000 e imersão de 3 meses aberta a fundadores de qualquer país.",
    tags: ["Venture Capital", "Aceleração", "EUA / Global"],
    region: "San Francisco / Global",
    link: "https://www.ycombinator.com/",
    type: "aceleradora",
  },
  {
    id: "gl-techstars",
    name: "Techstars Accelerators",
    organization: "Techstars",
    country: "Global",
    logo: "/images/programs/techstars.png",
    imageFit: "contain",
    description:
      "Rede global com dezenas de programas verticais e regionais (fintech, IA, clima) oferecendo capital semente e acesso vitalício a mentores.",
    tags: ["Rede Global", "Pré-seed", "Mentoria"],
    region: "Global",
    link: "https://www.techstars.com/",
    type: "aceleradora",
  },
  {
    id: "gl-seedstars",
    name: "Seedstars International Programs",
    organization: "Seedstars",
    country: "Global",
    logo: "/images/programs/seedstars.png",
    imageFit: "contain",
    description:
      "Programas de aceleração e investimentos voltados a mercados emergentes em África, América Latina e Europa, com foco em impacto escalável.",
    tags: ["Mercados Emergentes", "África & LATAM", "Aceleração"],
    region: "Global",
    link: "https://www.seedstars.com/",
    type: "aceleradora",
  },
];

export default function StartupProgramsSlider() {
  const [selectedCountry, setSelectedCountry] = useState<StartupFilterTab>("Todos");
  const sliderRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLoggedIn = !!session;
  const getActionHref = (href: string) => (isLoggedIn ? href : `${pathname}?auth=login`);

  const programs = useMemo(() => {
    if (selectedCountry === "Todos") {
      return PROGRAMS_LIST;
    }
    return PROGRAMS_LIST.filter((p) => p.country === selectedCountry);
  }, [selectedCountry]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="py-12 px-4 bg-zinc-50 w-full border-t border-zinc-200/70">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl text-center sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-2 tracking-tight uppercase">
            Programas de Apoio a Startups
          </h2>
          <p className="text-gray-500 text-center text-sm sm:text-base max-w-2xl mx-auto">
            Incubadoras, aceleradoras, fundos e programas reais com atuação na lusofonia e acesso global para fundadores.
          </p>
        </div>

        {/* Filtro de País */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STARTUP_FILTER_TABS.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer ${
                  selectedCountry === country
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white border border-zinc-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        {programs.length > 0 ? (
          <div className="relative group">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={scrollLeft}
              className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 cursor-pointer"
              aria-label="Scroll para esquerda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards Container */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {programs.map((program) => {
                const isContain = program.imageFit === "contain";
                return (
                  <div
                    key={program.id}
                    className="min-w-[300px] w-[300px] sm:min-w-[320px] sm:w-[320px] bg-white flex-shrink-0 flex flex-col rounded-2xl border border-violet-500/10 hover:border-violet-200 overflow-hidden shadow-lg hover:shadow-violet-300/40 transition-all duration-300 group/card relative"
                  >
                    {/* Card Image */}
                    <div
                      className={`relative h-44 w-full overflow-hidden border-b border-zinc-100 ${
                        isContain ? "bg-white" : "bg-zinc-900"
                      }`}
                    >
                      <Image
                        src={program.logo}
                        alt={program.name}
                        fill
                        sizes="320px"
                        referrerPolicy="no-referrer"
                        className={
                          isContain
                            ? "object-contain p-6 transition-transform duration-300 group-hover/card:scale-105"
                            : "object-cover transition-transform duration-300 group-hover/card:scale-105"
                        }
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-zinc-900 font-bold text-base sm:text-lg leading-tight line-clamp-2">
                          {program.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 flex-shrink-0 text-violet-600" />
                        <span className="truncate">{program.organization}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-violet-600" />
                        <span className="truncate">
                          {program.region}, {program.country}
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                        {program.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {program.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 text-[11px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg font-medium"
                          >
                            <Tag className="w-3 h-3 text-zinc-500" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={getActionHref(program.link)}
                        target={isLoggedIn ? "_blank" : undefined}
                        rel={isLoggedIn ? "noopener noreferrer" : undefined}
                        className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-violet-700 transition-colors rounded-lg py-2.5"
                      >
                        Ver programa
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={scrollRight}
              className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 cursor-pointer"
              aria-label="Scroll para direita"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 text-gray-400">
            <p className="text-base font-medium">Nenhum programa encontrado para este país.</p>
          </div>
        )}
      </div>
    </section>
  );
}
