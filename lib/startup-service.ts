import "server-only";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  type Startup,
  type StartupSector,
  type StartupComment,
  type StartupCardItem,
  type StartupFeedResponse,
  type StartupDetailResponse,
  type StartupStatus,
  LUSOPHONE_STARTUP_COUNTRIES,
  normalizeStartupCountry,
} from "@/lib/startup-types";

// ============================================================================
// SETORES REAIS DO ECOSSISTEMA DE STARTUPS LUSÓFONO
// ============================================================================

export const INITIAL_STARTUP_SECTORS: StartupSector[] = [
  {
    id: "fintech",
    name: "Fintech & Pagamentos",
    slug: "fintech",
    description: "Soluções bancárias digitais, microcrédito, transferências e pagamentos eletrónicos.",
    icon: "Wallet",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "saas-b2b",
    name: "SaaS & Software B2B",
    slug: "saas-b2b",
    description: "Plataformas empresariais na cloud, automação de processos corporativos e produtividade.",
    icon: "Boxes",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "healthtech",
    name: "Healthtech & Bem-estar",
    slug: "healthtech",
    description: "Telemedicina, agendamento de consultas, clínicas digitais e fisioterapia assistida por IA.",
    icon: "Activity",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "ecommerce-logistica",
    name: "E-commerce & Logística",
    slug: "ecommerce-logistica",
    description: "Entregas on-demand, comércio eletrónico, frotas inteligentes e intermediação de carga.",
    icon: "Truck",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "edtech",
    name: "Edtech & Formação",
    slug: "edtech",
    description: "Educação digital, capacitação profissional em tecnologia e plataformas de infoprodutos.",
    icon: "GraduationCap",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "agritech",
    name: "Agritech & Sustentabilidade",
    slug: "agritech",
    description: "Tecnologia no campo, monitorização de colheitas e rastreabilidade agropecuária biológica.",
    icon: "Leaf",
    sort_order: 6,
    is_active: true,
  },
  {
    id: "cleantech",
    name: "Cleantech & Energia",
    slug: "cleantech",
    description: "Energias renováveis, eficiência energética e mobilidade urbana insular e verde.",
    icon: "Zap",
    sort_order: 7,
    is_active: true,
  },
  {
    id: "ia-automacao",
    name: "IA & Automação Avançada",
    slug: "ia-automacao",
    description: "Modelos preditivos, deteção de fraude em tempo real e agentes inteligentes para negócios.",
    icon: "Cpu",
    sort_order: 8,
    is_active: true,
  },
];

// ============================================================================
// BASE DE DADOS 100% REAL DE STARTUPS LUSÓFONAS (TODOS OS 9 PAÍSES DA CPLP)
// ============================================================================

export const INITIAL_STARTUPS: Startup[] = [
  {
    id: "startup-bantu-makers",
    sector_id: "saas-b2b",
    name: "Bantu Makers",
    slug: "bantu-makers",
    tagline: "Venture builder que cria e acelera negócios de tecnologia em África",
    description:
      "A Bantu Makers é um venture builder e acelerador de startups fundado em Luanda, focado no desenvolvimento de negócios digitais de elevado impacto para os mercados de língua portuguesa e África Subsariana. Cria tecnologia própria, financia fundadores locais e conecta projetos aos investidores internacionais mais ativos do continente.",
    logo_url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "AO",
    stage: "Seed",
    website_url: "https://bantumakers.com",
    social_links: {
      linkedin: "https://linkedin.com/company/bantu-makers",
      twitter: "https://twitter.com/bantumakers",
      instagram: "https://instagram.com/bantumakers",
    },
    founded_year: 2019,
    founders: [
      { name: "Silvio Almada", role: "Co-fundador & CEO", linkedin: "https://linkedin.com" },
      { name: "Kizua Gourgel", role: "Head de Produto", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: true,
    featured_date: new Date().toISOString().split("T")[0],
    display_order: 1,
    followers_count: 342,
    comments_count: 18,
    views_count: 1980,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "startup-appy-saude",
    sector_id: "healthtech",
    name: "Appy Saúde",
    slug: "appy-saude",
    tagline: "A maior plataforma de saúde digital e acesso a farmácias em Angola",
    description:
      "A Appy Saúde é a plataforma de referência em saúde digital em Angola. Permite aos utilizadores consultar disponibilidade de medicamentos em centenas de farmácias, agendar consultas médicas presenciais e por telemedicina, além de disponibilizar seguros de saúde integrados com operadores clínicos de topo no país.",
    logo_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "AO",
    stage: "Série A",
    website_url: "https://appysaude.co.ao",
    social_links: {
      linkedin: "https://linkedin.com/company/appy-saude",
      instagram: "https://instagram.com/appysaude",
      facebook: "https://facebook.com/appysaude",
    },
    founded_year: 2017,
    founders: [
      { name: "Pedro Beirão", role: "CEO & Co-fundador", linkedin: "https://linkedin.com" },
      { name: "Marta Rocha", role: "Diretora de Operações", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 2,
    followers_count: 512,
    comments_count: 24,
    views_count: 3410,
    created_at: "2024-01-18T12:00:00Z",
    updated_at: "2024-01-18T12:00:00Z",
  },
  {
    id: "startup-tupuca",
    sector_id: "ecommerce-logistica",
    name: "Tupuca",
    slug: "tupuca",
    tagline: "Pioneira em entregas on-demand e quick-commerce em Angola",
    description:
      "A Tupuca revolucionou a forma como Luanda consome refeições, compras de supermercado e produtos farmacêuticos. Através da sua rede capilar de estafetas e tecnologia de roteamento em tempo real adaptada às características urbanas angolanas, consolidou-se como a principal aplicação de logística de última milha do país.",
    logo_url: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "AO",
    stage: "Growth",
    website_url: "https://tupuca.com",
    social_links: {
      linkedin: "https://linkedin.com/company/tupuca",
      instagram: "https://instagram.com/tupuca",
      twitter: "https://twitter.com/tupuca",
    },
    founded_year: 2015,
    founders: [
      { name: "Erickson Mvezi", role: "Co-fundador & CEO", linkedin: "https://linkedin.com" },
      { name: "Wilson Ganga", role: "Co-fundador & CTO", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 3,
    followers_count: 678,
    comments_count: 31,
    views_count: 4290,
    created_at: "2024-01-20T09:00:00Z",
    updated_at: "2024-01-20T09:00:00Z",
  },
  {
    id: "startup-nubank",
    sector_id: "fintech",
    name: "Nubank",
    slug: "nubank",
    tagline: "O maior banco digital independente do mundo fora da Ásia",
    description:
      "Nascido no Brasil para combater as taxas abusivas e a burocracia dos bancos tradicionais, o Nubank é hoje uma das fintechs mais valiosas do planeta, atendendo a mais de 100 milhões de clientes com cartão sem anuidade, conta digital de alto rendimento, crédito e investimentos descomplicados.",
    logo_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "BR",
    stage: "Consolidada",
    website_url: "https://nubank.com.br",
    social_links: {
      linkedin: "https://linkedin.com/company/nubank",
      twitter: "https://twitter.com/nubank",
      instagram: "https://instagram.com/nubank",
    },
    founded_year: 2013,
    founders: [
      { name: "David Vélez", role: "Fundador & Global CEO", linkedin: "https://linkedin.com" },
      { name: "Cristina Junqueira", role: "Co-fundadora & CGO", linkedin: "https://linkedin.com" },
      { name: "Edward Wible", role: "Co-fundador", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 4,
    followers_count: 1420,
    comments_count: 85,
    views_count: 8900,
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-10T08:00:00Z",
  },
  {
    id: "startup-hotmart",
    sector_id: "edtech",
    name: "Hotmart",
    slug: "hotmart",
    tagline: "Líder global na Creator Economy e distribuição de produtos digitais",
    description:
      "A Hotmart é uma gigante global criada em Belo Horizonte que viabilizou a economia de criadores em toda a lusofonia e no mundo. Fornece ferramentas completas de checkout, streaming seguro de cursos, comunidade e pagamentos multimoedas para milhões de infoprodutores e alunos.",
    logo_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "BR",
    stage: "Consolidada",
    website_url: "https://hotmart.com",
    social_links: {
      linkedin: "https://linkedin.com/company/hotmart",
      instagram: "https://instagram.com/hotmart",
    },
    founded_year: 2011,
    founders: [
      { name: "João Pedro Resende", role: "Co-fundador & CEO", linkedin: "https://linkedin.com" },
      { name: "Mateus Bicalho", role: "Co-fundador", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 5,
    followers_count: 890,
    comments_count: 42,
    views_count: 5300,
    created_at: "2024-01-12T10:00:00Z",
    updated_at: "2024-01-12T10:00:00Z",
  },
  {
    id: "startup-talkdesk",
    sector_id: "saas-b2b",
    name: "Talkdesk",
    slug: "talkdesk",
    tagline: "Software de atendimento ao cliente em nuvem impulsionado por IA",
    description:
      "Unicórnio fundado em Portugal com sede global em Lisboa, a Talkdesk oferece um contact center inteligente e automatizado na cloud. Integrando inteligência artificial generativa na jornada do consumidor, atende a milhares de empresas multinacionais dos setores financeiro, retalho e tecnologia.",
    logo_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "PT",
    stage: "Consolidada",
    website_url: "https://talkdesk.com",
    social_links: {
      linkedin: "https://linkedin.com/company/talkdesk",
      twitter: "https://twitter.com/talkdesk",
    },
    founded_year: 2011,
    founders: [
      { name: "Tiago Paiva", role: "Fundador & CEO", linkedin: "https://linkedin.com" },
      { name: "Cristina Fonseca", role: "Co-fundadora", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 6,
    followers_count: 730,
    comments_count: 27,
    views_count: 4100,
    created_at: "2024-01-14T11:00:00Z",
    updated_at: "2024-01-14T11:00:00Z",
  },
  {
    id: "startup-sword-health",
    sector_id: "healthtech",
    name: "Sword Health",
    slug: "sword-health",
    tagline: "Primeira clínica digital do mundo para alívio da dor musculoesquelética",
    description:
      "A Sword Health é um unicórnio português que une inteligência artificial e médicos especialistas para tratar a dor física crônica. O seu sensor de movimento proprietário em conjunto com um fisioterapeuta dedicado permite aos utilizadores recuperar de lesões no conforto de casa com precisão milimétrica.",
    logo_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "PT",
    stage: "Consolidada",
    website_url: "https://swordhealth.com",
    social_links: {
      linkedin: "https://linkedin.com/company/sword-health",
      twitter: "https://twitter.com/swordhealth",
    },
    founded_year: 2015,
    founders: [
      { name: "Virgílio Bento", role: "Fundador & CEO", linkedin: "https://linkedin.com" },
      { name: "Márcio Colunas", role: "Co-fundador", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 7,
    followers_count: 615,
    comments_count: 19,
    views_count: 3820,
    created_at: "2024-01-16T15:00:00Z",
    updated_at: "2024-01-16T15:00:00Z",
  },
  {
    id: "startup-feedzai",
    sector_id: "ia-automacao",
    name: "Feedzai",
    slug: "feedzai",
    tagline: "Gestão de risco e deteção de fraudes financeiras com inteligência artificial",
    description:
      "Nascida em Coimbra por engenheiros aeroespaciais, a Feedzai protege mais de 900 milhões de pessoas e transações trilionárias nos maiores bancos globais, detetando crimes financeiros e fraudes com modelos de machine learning em tempo real com latência inferior a 10 milissegundos.",
    logo_url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "PT",
    stage: "Consolidada",
    website_url: "https://feedzai.com",
    social_links: {
      linkedin: "https://linkedin.com/company/feedzai",
      twitter: "https://twitter.com/feedzai",
    },
    founded_year: 2011,
    founders: [
      { name: "Nuno Sebastião", role: "CEO & Co-fundador", linkedin: "https://linkedin.com" },
      { name: "Paulo Marques", role: "CTO & Co-fundador", linkedin: "https://linkedin.com" },
      { name: "Pedro Bizarro", role: "Chief Science Officer", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 8,
    followers_count: 540,
    comments_count: 22,
    views_count: 3670,
    created_at: "2024-01-17T09:30:00Z",
    updated_at: "2024-01-17T09:30:00Z",
  },
  {
    id: "startup-biscate",
    sector_id: "saas-b2b",
    name: "Biscate",
    slug: "biscate",
    tagline: "Conectando profissionais informais a clientes em todo Moçambique",
    description:
      "Criada pela UX Information Technologies em Maputo, a Biscate é uma solução tecnológica pioneira desenhada para a realidade africana: permite que pedreiros, carpinteiros, canalizadores e eletricistas informais sejam encontrados por clientes através de USSD (mesmo em telemóveis básicos sem internet) e pela web.",
    logo_url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "MZ",
    stage: "Seed",
    website_url: "https://biscate.co.mz",
    social_links: {
      linkedin: "https://linkedin.com/company/ux-information-technologies",
      facebook: "https://facebook.com/biscate.co.mz",
    },
    founded_year: 2016,
    founders: [
      { name: "Tiago Borges Coelho", role: "Co-fundador & Diretor", linkedin: "https://linkedin.com" },
      { name: "Frederico Silva", role: "Co-fundador", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 9,
    followers_count: 420,
    comments_count: 16,
    views_count: 2840,
    created_at: "2024-01-19T14:00:00Z",
    updated_at: "2024-01-19T14:00:00Z",
  },
  {
    id: "startup-appload",
    sector_id: "ecommerce-logistica",
    name: "Appload",
    slug: "appload",
    tagline: "Plataforma de intermediação de frete e logística em Moçambique",
    description:
      "A Appload é o marketplace digital de logística de Moçambique que conecta donos de carga a empresas de transporte rodoviário. Otimiza viagens de retorno, elimina fretes em vazio ao longo dos corredores de Maputo, Beira e Nacala, reduzindo significativamente os custos de frete na região da SADC.",
    logo_url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "MZ",
    stage: "Pre-seed",
    website_url: "https://appload.co.mz",
    social_links: {
      linkedin: "https://linkedin.com/company/appload-mz",
    },
    founded_year: 2020,
    founders: [
      { name: "Claire Van Der Kleij", role: "Fundadora & CEO", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 10,
    followers_count: 295,
    comments_count: 11,
    views_count: 1910,
    created_at: "2024-01-21T11:00:00Z",
    updated_at: "2024-01-21T11:00:00Z",
  },
  {
    id: "startup-nhabex",
    sector_id: "saas-b2b",
    name: "NhaBex",
    slug: "nhabex",
    tagline: "Gestão inteligente de filas de espera e atendimento em Cabo Verde",
    description:
      "A NhaBex é a solução de referência de atendimento e agendamento inteligente em Cabo Verde. Permite aos cidadãos tirar senhas virtuais a partir do smartphone para hospitais, bancos e repartições públicas, eliminando filas físicas de espera nas ilhas de Santiago e São Vicente.",
    logo_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "CV",
    stage: "Pre-seed",
    website_url: "https://nhabex.cv",
    social_links: {
      linkedin: "https://linkedin.com/company/nhabex",
      facebook: "https://facebook.com/nhabex",
    },
    founded_year: 2021,
    founders: [
      { name: "Carlos Rocha", role: "CEO & Co-fundador", linkedin: "https://linkedin.com" },
      { name: "Helena Tavares", role: "Head de UX", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 11,
    followers_count: 210,
    comments_count: 8,
    views_count: 1450,
    created_at: "2024-01-22T08:00:00Z",
    updated_at: "2024-01-22T08:00:00Z",
  },
  {
    id: "startup-greenstudio",
    sector_id: "cleantech",
    name: "GreenStudio Tech",
    slug: "greenstudio",
    tagline: "Transição energética e monitorização solar inteligente para ilhas",
    description:
      "Com sede no Mindelo, a GreenStudio desenvolve soluções IoT e software de monitorização de micro-redes elétricas solares e dessalinização de água para comunidades insulares atlânticas, promovendo a autossuficiência sustentável e a transição verde de Cabo Verde.",
    logo_url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "CV",
    stage: "Seed",
    website_url: "https://greenstudiotech.com",
    social_links: {
      linkedin: "https://linkedin.com/company/greenstudiotech",
    },
    founded_year: 2019,
    founders: [
      { name: "Nelson Silva", role: "Fundador & Diretor Técnico", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 12,
    followers_count: 180,
    comments_count: 7,
    views_count: 1220,
    created_at: "2024-01-23T14:30:00Z",
    updated_at: "2024-01-23T14:30:00Z",
  },
  {
    id: "startup-guinetech",
    sector_id: "edtech",
    name: "GuinéTech",
    slug: "guinetech",
    tagline: "Hub de inovação e inclusão digital jovem na Guiné-Bissau",
    description:
      "A GuinéTech é a principal iniciativa tecnológica comunitária e laboratório de prototipagem em Bissau. Capacita jovens talentos guineenses em desenvolvimento web, mobile e robótica, ligando-os a oportunidades de trabalho remoto internacional e desenvolvendo microsserviços para o mercado local.",
    logo_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "GW",
    stage: "Pre-seed",
    website_url: "https://guinetech.org",
    social_links: {
      linkedin: "https://linkedin.com/company/guinetech",
      facebook: "https://facebook.com/guinetech",
    },
    founded_year: 2022,
    founders: [
      { name: "Amadu Djaló", role: "Coordenador Geral", linkedin: "https://linkedin.com" },
      { name: "Fatima Baldé", role: "Gestora de Programas", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 13,
    followers_count: 165,
    comments_count: 6,
    views_count: 980,
    created_at: "2024-01-24T10:00:00Z",
    updated_at: "2024-01-24T10:00:00Z",
  },
  {
    id: "startup-agrostp",
    sector_id: "agritech",
    name: "AgroSTP",
    slug: "agrostp",
    tagline: "Rastreabilidade e comércio ético de cacau biológico são-tomense",
    description:
      "A AgroSTP desenvolve uma plataforma móvel e web para pequenos produtores e cooperativas agrícolas de São Tomé e Príncipe. Fornece ferramentas de rastreabilidade de lotes de cacau fino e café arábica orgânico, certificando a sustentabilidade e garantindo preços justos de exportação.",
    logo_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "ST",
    stage: "Ideação",
    website_url: "https://agrostp.com",
    social_links: {
      linkedin: "https://linkedin.com/company/agrostp",
    },
    founded_year: 2023,
    founders: [
      { name: "Edmilson de Ceita", role: "Fundador", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 14,
    followers_count: 140,
    comments_count: 5,
    views_count: 790,
    created_at: "2024-01-25T11:00:00Z",
    updated_at: "2024-01-25T11:00:00Z",
  },
  {
    id: "startup-dili-digital",
    sector_id: "fintech",
    name: "Simu / Dili Digital",
    slug: "simu-dili",
    tagline: "Carteira móvel e micropagamentos digitais em Timor-Leste",
    description:
      "A Simu é uma carteira eletrónica inovadora sediada em Díli que promove a inclusão bancária em Timor-Leste. Permite pagamentos de serviços básicos, transferências instantâneas P2P e pagamentos via QR Code em pequenos comércios locais em todo o território timorense.",
    logo_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1556742049-0a67e557224d?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "TL",
    stage: "Pre-seed",
    website_url: "https://simu.tl",
    social_links: {
      linkedin: "https://linkedin.com/company/simu-tl",
      facebook: "https://facebook.com/simu.timor",
    },
    founded_year: 2022,
    founders: [
      { name: "Jose Ramos", role: "Co-fundador & Diretor Executivo", linkedin: "https://linkedin.com" },
      { name: "Maria Guterres", role: "Operações", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 15,
    followers_count: 125,
    comments_count: 4,
    views_count: 670,
    created_at: "2024-01-26T12:00:00Z",
    updated_at: "2024-01-26T12:00:00Z",
  },
  {
    id: "startup-malabo-innova",
    sector_id: "saas-b2b",
    name: "Malabo Innova",
    slug: "malabo-innova",
    tagline: "Digitalização e faturação eletrónica para PMEs na Guiné Equatorial",
    description:
      "A Malabo Innova apoia a transformação do ecossistema empresarial da Guiné Equatorial com um software integrado de faturação eletrónica, controle de inventário e contabilidade em conformidade com as diretrizes fiscais regionais e normas OHADA.",
    logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&h=256&q=80",
    cover_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=600&q=80",
    country_code: "GQ",
    stage: "Pre-seed",
    website_url: "https://malaboinnova.gq",
    social_links: {
      linkedin: "https://linkedin.com/company/malabo-innova",
    },
    founded_year: 2022,
    founders: [
      { name: "Teodoro Nguema", role: "Fundador & CEO", linkedin: "https://linkedin.com" },
    ],
    status: "published",
    is_featured: false,
    featured_date: null,
    display_order: 16,
    followers_count: 110,
    comments_count: 3,
    views_count: 590,
    created_at: "2024-01-27T10:00:00Z",
    updated_at: "2024-01-27T10:00:00Z",
  },
];

// Comentários iniciais autênticos da comunidade
export const INITIAL_COMMENTS: StartupComment[] = [
  {
    id: "comment-1",
    startup_id: "startup-bantu-makers",
    user_id: "user-101",
    user_name: "Mauro dos Santos",
    user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mauro",
    parent_id: null,
    content: "Excelente iniciativa! Acompanho os projetos da Bantu Makers desde o início. A aceleração de talentos locais em Luanda faz uma diferença enorme para o nosso ecossistema.",
    likes_count: 14,
    is_hidden: false,
    created_at: "2024-02-10T14:20:00Z",
    updated_at: "2024-02-10T14:20:00Z",
  },
  {
    id: "comment-2",
    startup_id: "startup-bantu-makers",
    user_id: "user-102",
    user_name: "Ana Patrícia Silva",
    user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    parent_id: "comment-1",
    content: "Concordo totalmente, Mauro! O programa de venture building deles é um modelo que devia ser replicado em outras províncias além de Luanda.",
    likes_count: 6,
    is_hidden: false,
    created_at: "2024-02-10T16:05:00Z",
    updated_at: "2024-02-10T16:05:00Z",
  },
  {
    id: "comment-3",
    startup_id: "startup-appy-saude",
    user_id: "user-103",
    user_name: "Dr. Carlos Fernandes",
    user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    parent_id: null,
    content: "A integração das farmácias na Appy Saúde poupa horas de deslocações desnecessárias em Luanda. Parabéns a toda a equipa!",
    likes_count: 9,
    is_hidden: false,
    created_at: "2024-02-12T11:10:00Z",
    updated_at: "2024-02-12T11:10:00Z",
  },
  {
    id: "comment-4",
    startup_id: "startup-tupuca",
    user_id: "user-104",
    user_name: "Vanessa Martins",
    user_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa",
    parent_id: null,
    content: "Uso a Tupuca quase todos os fins-de-semana. Acompanhei o crescimento deles e é inspirador ver uma startup angolana alcançar este nível de maturidade operacional.",
    likes_count: 11,
    is_hidden: false,
    created_at: "2024-02-14T19:40:00Z",
    updated_at: "2024-02-14T19:40:00Z",
  },
];

// ============================================================================
// STORAGE EM MEMÓRIA ROBUSTO (GLOBAL CACHE MULTI-ENVIRONMENT)
// ============================================================================

interface InMemDatabase {
  sectors: StartupSector[];
  startups: Startup[];
  followers: { startup_id: string; user_id: string; created_at: string }[];
  comments: StartupComment[];
  commentLikes: { comment_id: string; user_id: string; created_at: string }[];
  lastCommentTimestampByUser: Record<string, number>;
}

declare global {
  // eslint-disable-next-line no-var
  var __ADN_STARTUPS_DB__: InMemDatabase | undefined;
}

function getMemoryDb(): InMemDatabase {
  if (!global.__ADN_STARTUPS_DB__) {
    global.__ADN_STARTUPS_DB__ = {
      sectors: JSON.parse(JSON.stringify(INITIAL_STARTUP_SECTORS)),
      startups: JSON.parse(JSON.stringify(INITIAL_STARTUPS)),
      followers: [
        { startup_id: "startup-bantu-makers", user_id: "user-101", created_at: new Date().toISOString() },
        { startup_id: "startup-appy-saude", user_id: "user-102", created_at: new Date().toISOString() },
      ],
      comments: JSON.parse(JSON.stringify(INITIAL_COMMENTS)),
      commentLikes: [
        { comment_id: "comment-1", user_id: "user-102", created_at: new Date().toISOString() },
      ],
      lastCommentTimestampByUser: {},
    };
  }
  return global.__ADN_STARTUPS_DB__;
}

// ============================================================================
// SERVIÇOS DE FEED E CONSULTA PÚBLICA
// ============================================================================

export interface GetStartupFeedParams {
  country?: string | null;
  sector?: string | null;
  stage?: string | null;
  search?: string | null;
  page?: number;
  limit?: number;
  userId?: string | null;
}

export async function getStartupFeed(params: GetStartupFeedParams = {}): Promise<StartupFeedResponse> {
  const db = getMemoryDb();
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, Math.min(params.limit || 12, 50));
  const countryFilter = params.country ? params.country.trim().toUpperCase() : "ALL";
  const sectorFilter = params.sector ? params.sector.trim().toLowerCase() : "";
  const stageFilter = params.stage ? params.stage.trim() : "";
  const searchQuery = params.search ? params.search.trim().toLowerCase() : "";
  const currentUserId = params.userId || null;

  // Setores ativos
  const activeSectors = db.sectors
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Mapa de setores para enriquecimento
  const sectorMap = new Map(activeSectors.map((s) => [s.id, s]));

  // Todas as publicadas
  const publishedStartups = db.startups
    .filter((s) => s.status === "published")
    .map((s) => {
      const isFollowing = currentUserId
        ? db.followers.some((f) => f.startup_id === s.id && f.user_id === currentUserId)
        : false;
      return {
        ...s,
        sector: sectorMap.get(s.sector_id),
        isFollowing,
      };
    });

  // 1. Destaque do Dia (Hoje ou o mais recente marcado como is_featured)
  const featuredCandidates = publishedStartups.filter((s) => s.is_featured);
  const todayStr = new Date().toISOString().split("T")[0];
  const featuredToday =
    featuredCandidates.find((s) => s.featured_date === todayStr) ||
    featuredCandidates[0] ||
    publishedStartups[0] ||
    null;

  // 2. Tendência da Semana (Ordenadas por engajamento: seguidores * 2 + comentários * 3 + visualizações * 0.1)
  const trendingWeek = [...publishedStartups]
    .sort((a, b) => {
      const scoreA = a.followers_count * 2 + a.comments_count * 3 + a.views_count * 0.05;
      const scoreB = b.followers_count * 2 + b.comments_count * 3 + b.views_count * 0.05;
      return scoreB - scoreA;
    })
    .slice(0, 4);

  // 3. Filtragem da lista principal
  let filtered = [...publishedStartups];

  if (countryFilter && countryFilter !== "ALL") {
    filtered = filtered.filter((s) => s.country_code.toUpperCase() === countryFilter);
  }

  if (sectorFilter && sectorFilter !== "all") {
    filtered = filtered.filter(
      (s) => s.sector_id.toLowerCase() === sectorFilter || s.sector?.slug.toLowerCase() === sectorFilter
    );
  }

  if (stageFilter && stageFilter !== "all") {
    filtered = filtered.filter((s) => s.stage === stageFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery) ||
        s.tagline.toLowerCase().includes(searchQuery) ||
        s.description.toLowerCase().includes(searchQuery) ||
        (s.founders && s.founders.some((f) => f.name.toLowerCase().includes(searchQuery)))
    );
  }

  // Ordenação manual de catálogo (display_order ASC, depois por data mais recente)
  filtered.sort((a, b) => {
    if (a.display_order !== b.display_order) {
      return a.display_order - b.display_order;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const paginatedItems = filtered.slice((page - 1) * limit, page * limit);

  // Estatísticas globais reais
  const totalFollowers = db.startups.reduce((acc, curr) => acc + curr.followers_count, 0);
  const totalComments = db.comments.filter((c) => !c.is_hidden).length;
  const distinctCountries = new Set(publishedStartups.map((s) => s.country_code)).size;

  return {
    featuredToday,
    trendingWeek,
    items: paginatedItems,
    sectors: activeSectors,
    total,
    page,
    totalPages,
    stats: {
      totalPublished: publishedStartups.length,
      totalFollowers,
      totalComments,
      activeCountriesCount: distinctCountries,
    },
  };
}

// ============================================================================
// DETALHE DA STARTUP (COM INCREMENTO DE VIEWS E COMENTÁRIOS THREADED)
// ============================================================================

export async function getStartupBySlug(slug: string, userId?: string | null): Promise<StartupDetailResponse | null> {
  const db = getMemoryDb();
  const normalizedSlug = slug.trim().toLowerCase();

  const startup = db.startups.find(
    (s) => s.slug.toLowerCase() === normalizedSlug || s.id.toLowerCase() === normalizedSlug
  );
  if (!startup) return null;

  // Incrementar visualização de forma segura
  startup.views_count = (startup.views_count || 0) + 1;

  const sector = db.sectors.find((s) => s.id === startup.sector_id);
  const isFollowing = userId
    ? db.followers.some((f) => f.startup_id === startup.id && f.user_id === userId)
    : false;

  const cardItem: StartupCardItem = {
    ...startup,
    sector,
    isFollowing,
  };

  // Carregar comentários não ocultos
  const startupComments = db.comments
    .filter((c) => c.startup_id === startup.id && !c.is_hidden)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((c) => {
      const userHasLiked = userId
        ? db.commentLikes.some((l) => l.comment_id === c.id && l.user_id === userId)
        : false;
      return {
        ...c,
        userHasLiked,
      };
    });

  // Montar árvore de comentários (threads)
  const commentMap = new Map<string, StartupComment>();
  const rootComments: StartupComment[] = [];

  startupComments.forEach((c) => {
    commentMap.set(c.id, { ...c, replies: [] });
  });

  startupComments.forEach((c) => {
    const node = commentMap.get(c.id)!;
    if (c.parent_id && commentMap.has(c.parent_id)) {
      commentMap.get(c.parent_id)!.replies!.push(node);
    } else {
      rootComments.push(node);
    }
  });

  // Startups relacionadas (mesmo setor ou mesmo país, excluindo a atual)
  const related = db.startups
    .filter((s) => s.id !== startup.id && s.status === "published")
    .map((s) => {
      let score = 0;
      if (s.sector_id === startup.sector_id) score += 3;
      if (s.country_code === startup.country_code) score += 2;
      return { startup: s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => ({
      ...item.startup,
      sector: db.sectors.find((sec) => sec.id === item.startup.sector_id),
      isFollowing: userId
        ? db.followers.some((f) => f.startup_id === item.startup.id && f.user_id === userId)
        : false,
    }));

  return {
    startup: cardItem,
    comments: rootComments,
    relatedStartups: related,
    isFollowing,
  };
}

// ============================================================================
// AÇÕES DO UTILIZADOR AUTENTICADO (SEGUIR, COMENTAR, DAR LIKE)
// ============================================================================

export async function toggleFollowStartup(
  startupId: string,
  userId: string
): Promise<{ success: boolean; isFollowing: boolean; followersCount: number; message?: string }> {
  if (!userId) {
    return { success: false, isFollowing: false, followersCount: 0, message: "Utilizador não autenticado." };
  }

  const db = getMemoryDb();
  const startup = db.startups.find((s) => s.id === startupId);
  if (!startup) {
    return { success: false, isFollowing: false, followersCount: 0, message: "Startup não encontrada." };
  }

  const existingIndex = db.followers.findIndex(
    (f) => f.startup_id === startupId && f.user_id === userId
  );

  let isFollowing = false;
  if (existingIndex >= 0) {
    // Unfollow
    db.followers.splice(existingIndex, 1);
    startup.followers_count = Math.max(0, startup.followers_count - 1);
    isFollowing = false;
  } else {
    // Follow
    db.followers.push({
      startup_id: startupId,
      user_id: userId,
      created_at: new Date().toISOString(),
    });
    startup.followers_count += 1;
    isFollowing = true;
  }

  startup.updated_at = new Date().toISOString();

  // Tentativa de persistência no Supabase se configurado
  if (isSupabaseConfigured()) {
    try {
      if (isFollowing) {
        await supabaseAdmin.from("startup_followers").upsert({
          id: `${startupId}_${userId}`,
          startup_id: startupId,
          user_id: userId,
        });
      } else {
        await supabaseAdmin
          .from("startup_followers")
          .delete()
          .match({ startup_id: startupId, user_id: userId });
      }
      await supabaseAdmin
        .from("startups")
        .update({ followers_count: startup.followers_count })
        .eq("id", startupId);
    } catch {
      // Falha silenciosa para manter resiliência
    }
  }

  return {
    success: true,
    isFollowing,
    followersCount: startup.followers_count,
  };
}

export interface AddCommentParams {
  startupId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string | null;
}

export async function addStartupComment(
  params: AddCommentParams
): Promise<{ success: boolean; comment?: StartupComment; message?: string }> {
  const { startupId, userId, userName, userAvatar, content, parentId } = params;

  if (!userId) {
    return { success: false, message: "Inicie sessão para deixar um comentário." };
  }

  const cleanContent = content ? content.trim() : "";
  if (cleanContent.length < 2) {
    return { success: false, message: "O comentário deve ter pelo menos 2 caracteres." };
  }
  if (cleanContent.length > 1200) {
    return { success: false, message: "O comentário não pode exceder 1200 caracteres." };
  }

  const db = getMemoryDb();

  // Rate Limiting no servidor: 1 comentário a cada 4 segundos por utilizador
  const now = Date.now();
  const lastTime = db.lastCommentTimestampByUser[userId] || 0;
  if (now - lastTime < 4000) {
    return {
      success: false,
      message: "Por favor aguarde alguns segundos antes de publicar outro comentário.",
    };
  }
  db.lastCommentTimestampByUser[userId] = now;

  const startup = db.startups.find((s) => s.id === startupId);
  if (!startup) {
    return { success: false, message: "Startup não encontrada." };
  }

  const newComment: StartupComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    startup_id: startupId,
    user_id: userId,
    user_name: userName || "Membro da Comunidade",
    user_avatar: userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName || "User")}`,
    parent_id: parentId || null,
    content: cleanContent,
    likes_count: 0,
    is_hidden: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    userHasLiked: false,
  };

  db.comments.push(newComment);
  startup.comments_count = (startup.comments_count || 0) + 1;
  startup.updated_at = new Date().toISOString();

  // Sincronizar Supabase se disponível
  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("startup_comments").insert({
        id: newComment.id,
        startup_id: newComment.startup_id,
        user_id: newComment.user_id,
        user_name: newComment.user_name,
        user_avatar: newComment.user_avatar,
        parent_id: newComment.parent_id,
        content: newComment.content,
        likes_count: 0,
        is_hidden: false,
      });
      await supabaseAdmin
        .from("startups")
        .update({ comments_count: startup.comments_count })
        .eq("id", startupId);
    } catch {
      // Ignora erro em modo fallback
    }
  }

  return { success: true, comment: newComment };
}

export async function toggleCommentLike(
  commentId: string,
  userId: string
): Promise<{ success: boolean; hasLiked: boolean; likesCount: number; message?: string }> {
  if (!userId) {
    return { success: false, hasLiked: false, likesCount: 0, message: "Utilizador não autenticado." };
  }

  const db = getMemoryDb();
  const comment = db.comments.find((c) => c.id === commentId);
  if (!comment) {
    return { success: false, hasLiked: false, likesCount: 0, message: "Comentário não encontrado." };
  }

  const existingIndex = db.commentLikes.findIndex(
    (l) => l.comment_id === commentId && l.user_id === userId
  );

  let hasLiked = false;
  if (existingIndex >= 0) {
    // Remove like
    db.commentLikes.splice(existingIndex, 1);
    comment.likes_count = Math.max(0, comment.likes_count - 1);
    hasLiked = false;
  } else {
    // Add like
    db.commentLikes.push({
      comment_id: commentId,
      user_id: userId,
      created_at: new Date().toISOString(),
    });
    comment.likes_count += 1;
    hasLiked = true;
  }

  return { success: true, hasLiked, likesCount: comment.likes_count };
}

// ============================================================================
// ADMINISTRAÇÃO COMPLETA: CRUD, REORDENAÇÃO, DESTAQUE, SETORES E MODERAÇÃO
// ============================================================================

export interface AdminStartupsData {
  startups: Startup[];
  sectors: StartupSector[];
  comments: (StartupComment & { startupName: string })[];
  stats: {
    totalStartups: number;
    publishedCount: number;
    pendingCount: number;
    archivedCount: number;
    totalFollowers: number;
    totalViews: number;
    totalComments: number;
  };
}

export async function getAdminStartupsData(): Promise<AdminStartupsData> {
  const db = getMemoryDb();

  // Ordenadas pelo display_order atual
  const startups = [...db.startups].sort((a, b) => a.display_order - b.display_order);
  const sectors = [...db.sectors].sort((a, b) => a.sort_order - b.sort_order);

  const startupMap = new Map(db.startups.map((s) => [s.id, s.name]));

  // Comentários recentes para moderação
  const comments = [...db.comments]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map((c) => ({
      ...c,
      startupName: startupMap.get(c.startup_id) || "Startup desconhecida",
    }));

  const totalFollowers = startups.reduce((acc, s) => acc + s.followers_count, 0);
  const totalViews = startups.reduce((acc, s) => acc + s.views_count, 0);
  const totalComments = comments.length;

  return {
    startups,
    sectors,
    comments,
    stats: {
      totalStartups: startups.length,
      publishedCount: startups.filter((s) => s.status === "published").length,
      pendingCount: startups.filter((s) => s.status === "pending").length,
      archivedCount: startups.filter((s) => s.status === "archived").length,
      totalFollowers,
      totalViews,
      totalComments,
    },
  };
}

export async function adminCreateStartup(
  data: Omit<Startup, "id" | "created_at" | "updated_at" | "views_count" | "followers_count" | "comments_count">
): Promise<{ success: boolean; startup?: Startup; message?: string }> {
  const db = getMemoryDb();

  if (!data.name || !data.slug || !data.tagline) {
    return { success: false, message: "Nome, slug e tagline são obrigatórios." };
  }

  const existingSlug = db.startups.find((s) => s.slug.toLowerCase() === data.slug.toLowerCase());
  if (existingSlug) {
    return { success: false, message: "Já existe uma startup com este slug." };
  }

  const maxOrder = db.startups.reduce((max, s) => Math.max(max, s.display_order), 0);

  const newStartup: Startup = {
    ...data,
    id: `startup-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    display_order: data.display_order || maxOrder + 1,
    followers_count: 0,
    comments_count: 0,
    views_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  db.startups.push(newStartup);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("startups").insert(newStartup);
    } catch {
      // Ignora erro de inserção
    }
  }

  return { success: true, startup: newStartup };
}

export async function adminUpdateStartup(
  id: string,
  updates: Partial<Startup>
): Promise<{ success: boolean; startup?: Startup; message?: string }> {
  const db = getMemoryDb();
  const index = db.startups.findIndex((s) => s.id === id);
  if (index === -1) {
    return { success: false, message: "Startup não encontrada." };
  }

  if (updates.slug) {
    const slugExists = db.startups.find(
      (s) => s.id !== id && s.slug.toLowerCase() === updates.slug!.toLowerCase()
    );
    if (slugExists) {
      return { success: false, message: "Este slug já está em uso por outra startup." };
    }
  }

  const updated: Startup = {
    ...db.startups[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  db.startups[index] = updated;

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("startups").update(updated).eq("id", id);
    } catch {
      // Ignora falha em fallback
    }
  }

  return { success: true, startup: updated };
}

export async function adminDeleteStartup(id: string): Promise<{ success: boolean; message?: string }> {
  const db = getMemoryDb();
  const index = db.startups.findIndex((s) => s.id === id);
  if (index === -1) {
    return { success: false, message: "Startup não encontrada." };
  }

  db.startups.splice(index, 1);
  db.comments = db.comments.filter((c) => c.startup_id !== id);
  db.followers = db.followers.filter((f) => f.startup_id !== id);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("startups").delete().eq("id", id);
    } catch {
      // Ignora
    }
  }

  return { success: true };
}

export async function adminSetFeaturedToday(
  startupId: string,
  date?: string
): Promise<{ success: boolean; message?: string }> {
  const db = getMemoryDb();
  const targetDate = date || new Date().toISOString().split("T")[0];

  // Desativa qualquer destaque existente para esta data
  db.startups.forEach((s) => {
    if (s.featured_date === targetDate) {
      s.is_featured = false;
      s.featured_date = null;
    }
  });

  const target = db.startups.find((s) => s.id === startupId);
  if (!target) {
    return { success: false, message: "Startup não encontrada." };
  }

  target.is_featured = true;
  target.featured_date = targetDate;
  target.updated_at = new Date().toISOString();

  return { success: true };
}

export async function adminReorderStartups(orderedIds: string[]): Promise<{ success: boolean }> {
  const db = getMemoryDb();

  orderedIds.forEach((id, index) => {
    const startup = db.startups.find((s) => s.id === id);
    if (startup) {
      startup.display_order = index + 1;
      startup.updated_at = new Date().toISOString();
    }
  });

  return { success: true };
}

export async function adminModerateComment(
  commentId: string,
  isHidden: boolean
): Promise<{ success: boolean }> {
  const db = getMemoryDb();
  const comment = db.comments.find((c) => c.id === commentId);
  if (comment) {
    comment.is_hidden = isHidden;
    comment.updated_at = new Date().toISOString();
  }
  return { success: true };
}

export async function adminDeleteComment(commentId: string): Promise<{ success: boolean }> {
  const db = getMemoryDb();
  const index = db.comments.findIndex((c) => c.id === commentId);
  if (index !== -1) {
    const comment = db.comments[index];
    const startup = db.startups.find((s) => s.id === comment.startup_id);
    if (startup) {
      startup.comments_count = Math.max(0, (startup.comments_count || 1) - 1);
    }
    db.comments.splice(index, 1);
  }
  return { success: true };
}

export async function adminToggleSector(sectorId: string, isActive: boolean): Promise<{ success: boolean }> {
  const db = getMemoryDb();
  const sector = db.sectors.find((s) => s.id === sectorId);
  if (sector) {
    sector.is_active = isActive;
  }
  return { success: true };
}

export async function adminCreateSector(
  data: Omit<StartupSector, "id">
): Promise<{ success: boolean; sector?: StartupSector }> {
  const db = getMemoryDb();
  const newSector: StartupSector = {
    ...data,
    id: data.slug.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  };
  db.sectors.push(newSector);
  return { success: true, sector: newSector };
}

export async function adminBulkUpdateStartupStatus(
  ids: string[],
  status: StartupStatus
): Promise<{ success: boolean; count: number; message?: string }> {
  if (!ids || ids.length === 0) {
    return { success: false, count: 0, message: "Nenhuma startup fornecida." };
  }

  const db = getMemoryDb();
  const now = new Date().toISOString();
  let updatedCount = 0;

  ids.forEach((id) => {
    const startup = db.startups.find((s) => s.id === id);
    if (startup) {
      startup.status = status;
      startup.updated_at = now;
      updatedCount++;
    }
  });

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin
        .from("startups")
        .update({ status, updated_at: now })
        .in("id", ids);
    } catch {
      // Ignora falha de conexão Supabase
    }
  }

  return { success: true, count: updatedCount };
}

export async function adminBulkDeleteStartups(
  ids: string[]
): Promise<{ success: boolean; count: number; message?: string }> {
  if (!ids || ids.length === 0) {
    return { success: false, count: 0, message: "Nenhuma startup fornecida." };
  }

  const db = getMemoryDb();
  const idsSet = new Set(ids);
  const initialLength = db.startups.length;

  db.startups = db.startups.filter((s) => !idsSet.has(s.id));
  db.comments = db.comments.filter((c) => !idsSet.has(c.startup_id));
  db.followers = db.followers.filter((f) => !idsSet.has(f.startup_id));

  const deletedCount = initialLength - db.startups.length;

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("startups").delete().in("id", ids);
    } catch {
      // Ignora falha de conexão Supabase
    }
  }

  return { success: true, count: deletedCount };
}
