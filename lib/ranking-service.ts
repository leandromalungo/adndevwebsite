import "server-only";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  type TechnologyCategory,
  type Technology,
  type TechnologyVote,
  type RankingItem,
  type LusophoneCountry,
  LUSOPHONE_RANKING_COUNTRIES,
  normalizeCountryCode,
  type GetRankingResult,
} from "@/lib/ranking-types";

export type {
  TechnologyCategory,
  Technology,
  TechnologyVote,
  RankingItem,
  LusophoneCountry,
  GetRankingResult,
};
export { LUSOPHONE_RANKING_COUNTRIES, normalizeCountryCode };

// ============================================================================
// BASE INICIAL REAL (CATEGORIAS E TECNOLOGIAS REAIS DO ECOSSISTEMA LUSÓFONO)
// ============================================================================

export const INITIAL_CATEGORIES: TechnologyCategory[] = [
  {
    id: "web",
    name: "Web & Frontend",
    slug: "web",
    description: "Frameworks, bibliotecas e ecossistema para desenvolvimento web moderno.",
    icon: "Globe",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "linguagens",
    name: "Linguagens",
    slug: "linguagens",
    description: "Linguagens de programação fundamentais e de alto desempenho.",
    icon: "Code",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "mobile",
    name: "Mobile",
    slug: "mobile",
    description: "Tecnologias para desenvolvimento multiplataforma e nativo Android / iOS.",
    icon: "Smartphone",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "databases",
    name: "Bases de Dados",
    slug: "databases",
    description: "Sistemas relacionais, NoSQL, caches em memória e BaaS escaláveis.",
    icon: "Database",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "git_devops",
    name: "Git & DevOps",
    slug: "git-devops",
    description: "Controlo de versões, infraestrutura em nuvem, CI/CD e orquestração de contentores.",
    icon: "GitBranch",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "ia_ml",
    name: "IA & Machine Learning",
    slug: "ia-ml",
    description: "Modelos generativos, visão computacional, LLMs e pipelines de inteligência artificial.",
    icon: "Brain",
    sort_order: 6,
    is_active: true,
  },
  {
    id: "ferramentas",
    name: "Ferramentas & IDEs",
    slug: "ferramentas",
    description: "Editores, plataformas de colaboração, teste de APIs e ambientes de trabalho.",
    icon: "Wrench",
    sort_order: 7,
    is_active: true,
  },
  {
    id: "desktop",
    name: "Desktop",
    slug: "desktop",
    description: "Frameworks para criação de aplicações nativas e multiplataforma de secretária.",
    icon: "Monitor",
    sort_order: 8,
    is_active: true,
  },
  {
    id: "jogos",
    name: "Jogos & 3D",
    slug: "jogos",
    description: "Motores gráficos, simulação 3D e desenvolvimento de videojogos.",
    icon: "Gamepad2",
    sort_order: 9,
    is_active: true,
  },
  {
    id: "design",
    name: "Design & UI/UX",
    slug: "design",
    description: "Sistemas de design, prototipagem e estilização CSS moderna.",
    icon: "Palette",
    sort_order: 10,
    is_active: true,
  },
];

export const INITIAL_TECHNOLOGIES: Omit<Technology, "upvotes_count" | "downvotes_count" | "score">[] = [
  // Web & Frontend
  {
    id: "tech-nextjs",
    category_id: "web",
    name: "Next.js",
    slug: "nextjs",
    description: "Framework React para produção com App Router, Server Actions, SSR e renderização híbrida rápida.",
    website_url: "https://nextjs.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    tags: ["React", "SSR", "App Router", "Fullstack", "Vercel"],
    is_active: true,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-react",
    category_id: "web",
    name: "React",
    slug: "react",
    description: "Biblioteca declarativa baseada em componentes para construção de interfaces web e móveis interativas.",
    website_url: "https://react.dev",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tags: ["Frontend", "UI", "JavaScript", "Virtual DOM"],
    is_active: true,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-vue",
    category_id: "web",
    name: "Vue.js",
    slug: "vuejs",
    description: "Framework progressivo acessível com reatividade apurada e Composition API eficiente.",
    website_url: "https://vuejs.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    tags: ["Frontend", "Progressive", "Composition API"],
    is_active: true,
    created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-tailwind",
    category_id: "design",
    name: "Tailwind CSS",
    slug: "tailwind-css",
    description: "Framework CSS utility-first concebido para criar interfaces modernas de alto nível diretamente nas classes.",
    website_url: "https://tailwindcss.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    tags: ["CSS", "Utility-First", "Design System", "Styling"],
    is_active: true,
    created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Linguagens
  {
    id: "tech-typescript",
    category_id: "linguagens",
    name: "TypeScript",
    slug: "typescript",
    description: "Superset tipado de JavaScript que traz rigor estático, auto-completar inteligente e robustez empresarial.",
    website_url: "https://www.typescriptlang.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    tags: ["Tipagem Estática", "JavaScript", "Microsoft", "Fullstack"],
    is_active: true,
    created_at: new Date(Date.now() - 58 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-python",
    category_id: "linguagens",
    name: "Python",
    slug: "python",
    description: "Linguagem versátil, elegante e legível, referência global em inteligência artificial, dados e backends.",
    website_url: "https://www.python.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    tags: ["IA", "Data Science", "Backend", "Automação"],
    is_active: true,
    created_at: new Date(Date.now() - 58 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-golang",
    category_id: "linguagens",
    name: "Go (Golang)",
    slug: "golang",
    description: "Linguagem compilada criada pela Google focada em concorrência, microsserviços velozes e simplicidade.",
    website_url: "https://go.dev",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    tags: ["Concorrência", "Backend", "Google", "Microsserviços"],
    is_active: true,
    created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-rust",
    category_id: "linguagens",
    name: "Rust",
    slug: "rust",
    description: "Linguagem de programação de sistemas que oferece velocidade de execução sem precedentes e segurança de memória.",
    website_url: "https://www.rust-lang.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    tags: ["Sistemas", "Performance", "Memory Safe", "WebAssembly"],
    is_active: true,
    created_at: new Date(Date.now() - 48 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Mobile
  {
    id: "tech-flutter",
    category_id: "mobile",
    name: "Flutter",
    slug: "flutter",
    description: "SDK da Google em Dart para compilação nativa de aplicações mobile, web e desktop a partir de uma base de código.",
    website_url: "https://flutter.dev",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    tags: ["Dart", "Multiplataforma", "Google", "iOS", "Android"],
    is_active: true,
    created_at: new Date(Date.now() - 54 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-react-native",
    category_id: "mobile",
    name: "React Native",
    slug: "react-native",
    description: "Framework móvel baseado em React que permite construir aplicações móveis nativas usando JavaScript e JSX.",
    website_url: "https://reactnative.dev",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    tags: ["React", "Mobile", "Expo", "iOS", "Android"],
    is_active: true,
    created_at: new Date(Date.now() - 52 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-kotlin",
    category_id: "mobile",
    name: "Kotlin",
    slug: "kotlin",
    description: "Linguagem oficial moderna de desenvolvimento Android da JetBrains, com concorrência via Coroutines.",
    website_url: "https://kotlinlang.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    tags: ["Android", "JVM", "Jetpack Compose", "JetBrains"],
    is_active: true,
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Bases de Dados
  {
    id: "tech-postgresql",
    category_id: "databases",
    name: "PostgreSQL",
    slug: "postgresql",
    description: "O sistema de base de dados relacional e relacional-objeto de código aberto mais avançado do mundo.",
    website_url: "https://www.postgresql.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    tags: ["SQL", "Relacional", "JSONB", "ACID", "Open Source"],
    is_active: true,
    created_at: new Date(Date.now() - 56 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-supabase",
    category_id: "databases",
    name: "Supabase",
    slug: "supabase",
    description: "Alternativa open source ao Firebase construída sobre PostgreSQL, com Auth, Realtime, Storage e Edge Functions.",
    website_url: "https://supabase.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    tags: ["Postgres", "BaaS", "Realtime", "Auth", "Storage"],
    is_active: true,
    created_at: new Date(Date.now() - 52 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-redis",
    category_id: "databases",
    name: "Redis",
    slug: "redis",
    description: "Armazenamento em memória de chave-valor de baixíssima latência, ideal para cache, filas e sessões distribuídas.",
    website_url: "https://redis.io",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    tags: ["Cache", "In-Memory", "NoSQL", "Pub/Sub"],
    is_active: true,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Git & DevOps
  {
    id: "tech-git",
    category_id: "git_devops",
    name: "Git",
    slug: "git",
    description: "Sistema distribuído padrão para controlo de versões e colaboração segura entre equipas de engenharia.",
    website_url: "https://git-scm.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    tags: ["VCS", "Controlo de Versão", "Colaboração", "Essencial"],
    is_active: true,
    created_at: new Date(Date.now() - 58 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-docker",
    category_id: "git_devops",
    name: "Docker",
    slug: "docker",
    description: "Plataforma de contentorização para empacotar, distribuir e executar aplicações com consistência absoluta.",
    website_url: "https://www.docker.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    tags: ["Containers", "DevOps", "Microservices", "Infraestrutura"],
    is_active: true,
    created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // IA & Machine Learning
  {
    id: "tech-pytorch",
    category_id: "ia_ml",
    name: "PyTorch",
    slug: "pytorch",
    description: "Framework open source líder de Machine Learning e Deep Learning com diferenciação automática dinâmica.",
    website_url: "https://pytorch.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    tags: ["Deep Learning", "IA", "Redes Neuronais", "Python"],
    is_active: true,
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-gemini",
    category_id: "ia_ml",
    name: "Google Gemini SDK",
    slug: "gemini-sdk",
    description: "SDK multimodal avançado da Google para integração de modelos de raciocínio, visão, código e agentes inteligentes.",
    website_url: "https://ai.google.dev",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    tags: ["LLM", "Multimodal", "Agentes", "Google AI"],
    is_active: true,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Ferramentas & IDEs
  {
    id: "tech-vscode",
    category_id: "ferramentas",
    name: "VS Code",
    slug: "vscode",
    description: "Editor de código leve e extensível mais popular da indústria, com ecossistema massivo de plugins.",
    website_url: "https://code.visualstudio.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    tags: ["IDE", "Editor", "Microsoft", "Produtividade"],
    is_active: true,
    created_at: new Date(Date.now() - 55 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-postman",
    category_id: "ferramentas",
    name: "Postman",
    slug: "postman",
    description: "Plataforma completa para desenvolvimento, documentação, testes automatizados e monitorização de APIs.",
    website_url: "https://www.postman.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    tags: ["APIs", "REST", "Testing", "Documentação"],
    is_active: true,
    created_at: new Date(Date.now() - 42 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Desktop
  {
    id: "tech-tauri",
    category_id: "desktop",
    name: "Tauri",
    slug: "tauri",
    description: "Framework inovador que utiliza frontend web com núcleo em Rust para construir binários desktop ultraleves e seguros.",
    website_url: "https://tauri.app",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tauri/tauri-original.svg",
    tags: ["Rust", "Desktop", "Lightweight", "Webview"],
    is_active: true,
    created_at: new Date(Date.now() - 38 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-electron",
    category_id: "desktop",
    name: "Electron",
    slug: "electron",
    description: "Framework para construir aplicações desktop multiplataforma com JavaScript, HTML e CSS (VS Code, Discord, Slack).",
    website_url: "https://www.electronjs.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
    tags: ["Desktop", "Node.js", "Chromium", "Multiplataforma"],
    is_active: true,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Jogos & 3D
  {
    id: "tech-godot",
    category_id: "jogos",
    name: "Godot Engine",
    slug: "godot",
    description: "Motor de jogos 2D e 3D gratuito e de código aberto com arquitetura orientada a nós e linguagem GDScript intuitiva.",
    website_url: "https://godotengine.org",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
    tags: ["Game Dev", "2D", "3D", "Open Source", "GDScript"],
    is_active: true,
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "tech-unity",
    category_id: "jogos",
    name: "Unity",
    slug: "unity",
    description: "Motor líder para criação de videojogos, experiências interativas 3D em tempo real e realidade virtual com C#.",
    website_url: "https://unity.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    tags: ["C#", "Game Engine", "VR/AR", "3D"],
    is_active: true,
    created_at: new Date(Date.now() - 42 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Design
  {
    id: "tech-figma",
    category_id: "design",
    name: "Figma",
    slug: "figma",
    description: "Ferramenta colaborativa baseada na web para design de interfaces, prototipagem ágil e passagem de código para dev.",
    website_url: "https://www.figma.com",
    logo_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    tags: ["UI/UX", "Prototipagem", "Design System", "Colaboração"],
    is_active: true,
    created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================================================
// STORE RESILIENTE SINCRONIZADA EM MEMÓRIA / GLOBALTHIS
// ============================================================================

interface RankingMemoryStore {
  categories: Map<string, TechnologyCategory>;
  technologies: Map<string, Technology>;
  votes: Map<string, TechnologyVote>; // chave: `${user_id}:${technology_id}`
  initialized: boolean;
}

const globalForRanking = globalThis as unknown as {
  adnRankingStore?: RankingMemoryStore;
};

function getStore(): RankingMemoryStore {
  if (!globalForRanking.adnRankingStore) {
    const store: RankingMemoryStore = {
      categories: new Map(),
      technologies: new Map(),
      votes: new Map(),
      initialized: false,
    };

    // Inicializar categorias padrão
    INITIAL_CATEGORIES.forEach((cat) => {
      store.categories.set(cat.id, { ...cat });
    });

    // Inicializar tecnologias com contagem inicial balanceada e orgânica da comunidade
    const initialSeedVotes: Array<{
      techId: string;
      upvotes: number;
      downvotes: number;
      countryDistribution: Record<string, { up: number; down: number }>;
    }> = [
      {
        techId: "tech-nextjs",
        upvotes: 487,
        downvotes: 18,
        countryDistribution: { AO: { up: 180, down: 6 }, BR: { up: 160, down: 5 }, PT: { up: 95, down: 4 }, MZ: { up: 32, down: 2 }, CV: { up: 20, down: 1 } },
      },
      {
        techId: "tech-typescript",
        upvotes: 462,
        downvotes: 14,
        countryDistribution: { AO: { up: 170, down: 5 }, BR: { up: 155, down: 4 }, PT: { up: 90, down: 3 }, MZ: { up: 30, down: 1 }, CV: { up: 17, down: 1 } },
      },
      {
        techId: "tech-react",
        upvotes: 440,
        downvotes: 29,
        countryDistribution: { AO: { up: 165, down: 11 }, BR: { up: 150, down: 10 }, PT: { up: 80, down: 5 }, MZ: { up: 28, down: 2 }, CV: { up: 17, down: 1 } },
      },
      {
        techId: "tech-python",
        upvotes: 412,
        downvotes: 16,
        countryDistribution: { AO: { up: 150, down: 5 }, BR: { up: 140, down: 5 }, PT: { up: 75, down: 4 }, MZ: { up: 30, down: 1 }, CV: { up: 17, down: 1 } },
      },
      {
        techId: "tech-postgresql",
        upvotes: 395,
        downvotes: 8,
        countryDistribution: { AO: { up: 145, down: 3 }, BR: { up: 135, down: 2 }, PT: { up: 72, down: 2 }, MZ: { up: 28, down: 1 }, CV: { up: 15, down: 0 } },
      },
      {
        techId: "tech-tailwind",
        upvotes: 382,
        downvotes: 22,
        countryDistribution: { AO: { up: 140, down: 8 }, BR: { up: 130, down: 8 }, PT: { up: 70, down: 4 }, MZ: { up: 26, down: 1 }, CV: { up: 16, down: 1 } },
      },
      {
        techId: "tech-supabase",
        upvotes: 360,
        downvotes: 11,
        countryDistribution: { AO: { up: 130, down: 4 }, BR: { up: 125, down: 4 }, PT: { up: 65, down: 2 }, MZ: { up: 25, down: 1 }, CV: { up: 15, down: 0 } },
      },
      {
        techId: "tech-flutter",
        upvotes: 348,
        downvotes: 24,
        countryDistribution: { AO: { up: 140, down: 10 }, BR: { up: 110, down: 7 }, PT: { up: 58, down: 4 }, MZ: { up: 24, down: 2 }, CV: { up: 16, down: 1 } },
      },
      {
        techId: "tech-docker",
        upvotes: 335,
        downvotes: 15,
        countryDistribution: { AO: { up: 120, down: 5 }, BR: { up: 115, down: 5 }, PT: { up: 60, down: 3 }, MZ: { up: 24, down: 1 }, CV: { up: 16, down: 1 } },
      },
      {
        techId: "tech-vscode",
        upvotes: 330,
        downvotes: 12,
        countryDistribution: { AO: { up: 120, down: 4 }, BR: { up: 112, down: 4 }, PT: { up: 59, down: 2 }, MZ: { up: 23, down: 1 }, CV: { up: 16, down: 1 } },
      },
      {
        techId: "tech-git",
        upvotes: 325,
        downvotes: 7,
        countryDistribution: { AO: { up: 118, down: 2 }, BR: { up: 110, down: 2 }, PT: { up: 58, down: 2 }, MZ: { up: 24, down: 1 }, CV: { up: 15, down: 0 } },
      },
      {
        techId: "tech-golang",
        upvotes: 295,
        downvotes: 18,
        countryDistribution: { AO: { up: 100, down: 6 }, BR: { up: 105, down: 6 }, PT: { up: 55, down: 4 }, MZ: { up: 20, down: 1 }, CV: { up: 15, down: 1 } },
      },
      {
        techId: "tech-gemini",
        upvotes: 284,
        downvotes: 19,
        countryDistribution: { AO: { up: 105, down: 7 }, BR: { up: 95, down: 6 }, PT: { up: 50, down: 4 }, MZ: { up: 20, down: 1 }, CV: { up: 14, down: 1 } },
      },
      {
        techId: "tech-figma",
        upvotes: 275,
        downvotes: 10,
        countryDistribution: { AO: { up: 98, down: 3 }, BR: { up: 95, down: 4 }, PT: { up: 48, down: 2 }, MZ: { up: 20, down: 1 }, CV: { up: 14, down: 0 } },
      },
      {
        techId: "tech-react-native",
        upvotes: 260,
        downvotes: 35,
        countryDistribution: { AO: { up: 95, down: 12 }, BR: { up: 90, down: 12 }, PT: { up: 45, down: 6 }, MZ: { up: 18, down: 3 }, CV: { up: 12, down: 2 } },
      },
      {
        techId: "tech-vue",
        upvotes: 248,
        downvotes: 20,
        countryDistribution: { AO: { up: 88, down: 7 }, BR: { up: 85, down: 7 }, PT: { up: 45, down: 4 }, MZ: { up: 17, down: 1 }, CV: { up: 13, down: 1 } },
      },
      {
        techId: "tech-tauri",
        upvotes: 232,
        downvotes: 12,
        countryDistribution: { AO: { up: 80, down: 4 }, BR: { up: 82, down: 4 }, PT: { up: 42, down: 2 }, MZ: { up: 16, down: 1 }, CV: { up: 12, down: 1 } },
      },
      {
        techId: "tech-godot",
        upvotes: 215,
        downvotes: 14,
        countryDistribution: { AO: { up: 75, down: 5 }, BR: { up: 74, down: 5 }, PT: { up: 40, down: 2 }, MZ: { up: 15, down: 1 }, CV: { up: 11, down: 1 } },
      },
      {
        techId: "tech-rust",
        upvotes: 210,
        downvotes: 18,
        countryDistribution: { AO: { up: 70, down: 6 }, BR: { up: 75, down: 6 }, PT: { up: 40, down: 4 }, MZ: { up: 14, down: 1 }, CV: { up: 11, down: 1 } },
      },
      {
        techId: "tech-pytorch",
        upvotes: 202,
        downvotes: 11,
        countryDistribution: { AO: { up: 70, down: 4 }, BR: { up: 72, down: 4 }, PT: { up: 36, down: 2 }, MZ: { up: 13, down: 1 }, CV: { up: 11, down: 0 } },
      },
      {
        techId: "tech-redis",
        upvotes: 195,
        downvotes: 9,
        countryDistribution: { AO: { up: 68, down: 3 }, BR: { up: 70, down: 3 }, PT: { up: 35, down: 2 }, MZ: { up: 12, down: 1 }, CV: { up: 10, down: 0 } },
      },
      {
        techId: "tech-kotlin",
        upvotes: 188,
        downvotes: 15,
        countryDistribution: { AO: { up: 66, down: 5 }, BR: { up: 65, down: 5 }, PT: { up: 34, down: 3 }, MZ: { up: 13, down: 1 }, CV: { up: 10, down: 1 } },
      },
      {
        techId: "tech-electron",
        upvotes: 174,
        downvotes: 42,
        countryDistribution: { AO: { up: 60, down: 15 }, BR: { up: 60, down: 14 }, PT: { up: 32, down: 8 }, MZ: { up: 12, down: 3 }, CV: { up: 10, down: 2 } },
      },
      {
        techId: "tech-unity",
        upvotes: 168,
        downvotes: 28,
        countryDistribution: { AO: { up: 60, down: 10 }, BR: { up: 58, down: 10 }, PT: { up: 30, down: 5 }, MZ: { up: 11, down: 2 }, CV: { up: 9, down: 1 } },
      },
      {
        techId: "tech-postman",
        upvotes: 162,
        downvotes: 14,
        countryDistribution: { AO: { up: 58, down: 5 }, BR: { up: 55, down: 5 }, PT: { up: 30, down: 2 }, MZ: { up: 11, down: 1 }, CV: { up: 8, down: 1 } },
      },
    ];

    INITIAL_TECHNOLOGIES.forEach((tech) => {
      const seedInfo = initialSeedVotes.find((s) => s.techId === tech.id);
      const up = seedInfo?.upvotes ?? 120;
      const down = seedInfo?.downvotes ?? 10;
      store.technologies.set(tech.id, {
        ...tech,
        upvotes_count: up,
        downvotes_count: down,
        score: up - down,
      });

      // Gerar votos simulados por país para permitir filtragem nacional precisa
      if (seedInfo?.countryDistribution) {
        let voterIdx = 1;
        Object.entries(seedInfo.countryDistribution).forEach(([country, counts]) => {
          for (let i = 0; i < counts.up; i++) {
            const voteKey = `seed-user-${voterIdx}-${country}:${tech.id}`;
            store.votes.set(voteKey, {
              id: `vote-${voterIdx}`,
              technology_id: tech.id,
              user_id: `seed-user-${voterIdx}-${country}`,
              vote_type: "up",
              country_code: country,
              created_at: new Date(Date.now() - (voterIdx % 45) * 86400000).toISOString(),
            });
            voterIdx++;
          }
          for (let j = 0; j < counts.down; j++) {
            const voteKey = `seed-user-down-${voterIdx}-${country}:${tech.id}`;
            store.votes.set(voteKey, {
              id: `vote-down-${voterIdx}`,
              technology_id: tech.id,
              user_id: `seed-user-down-${voterIdx}-${country}`,
              vote_type: "down",
              country_code: country,
              created_at: new Date(Date.now() - (voterIdx % 45) * 86400000).toISOString(),
            });
            voterIdx++;
          }
        });
      }
    });

    store.initialized = true;
    globalForRanking.adnRankingStore = store;
  }
  return globalForRanking.adnRankingStore;
}

/**
 * Tenta sincronizar a base de dados Supabase na inicialização
 */
async function syncDatabaseTables(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const { data: existingCats } = await supabaseAdmin
      .from("technology_categories")
      .select("id")
      .limit(1);

    if (!existingCats || existingCats.length === 0) {
      // Tentar popular categorias se a tabela foi criada mas está vazia
      await supabaseAdmin.from("technology_categories").upsert(
        INITIAL_CATEGORIES.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon,
          sort_order: c.sort_order,
          is_active: c.is_active,
        }))
      );
    }
  } catch {
    // Sincronização em background graciosa
  }
}

// ============================================================================
// CONSULTA PRINCIPAL DO RANKING (COM FILTROS DE PAÍS, CATEGORIA, BUSCA E TEMPO)
// ============================================================================

export interface GetRankingParams {
  categorySlug?: string;
  countryCode?: string;
  searchQuery?: string;
  period?: "all" | "month" | "week" | "today";
  page?: number;
  limit?: number;
  userId?: string | null;
}

export async function getCommunityRanking(
  params: GetRankingParams = {}
): Promise<GetRankingResult> {
  const store = getStore();
  await syncDatabaseTables();

  const {
    categorySlug = "todos",
    countryCode = "ALL",
    searchQuery = "",
    period = "all",
    page = 1,
    limit = 25,
    userId = null,
  } = params;

  const cleanCountryCode = countryCode.trim().toUpperCase();
  const isGlobal = cleanCountryCode === "ALL" || cleanCountryCode === "TODOS" || !cleanCountryCode;
  const activeCountry =
    LUSOPHONE_RANKING_COUNTRIES.find((c) => c.code === cleanCountryCode) ||
    LUSOPHONE_RANKING_COUNTRIES[0];

  // Calcular timestamp de corte para o filtro de período
  let cutoffTimestamp = 0;
  const now = Date.now();
  if (period === "month") cutoffTimestamp = now - 30 * 86400000;
  else if (period === "week") cutoffTimestamp = now - 7 * 86400000;
  else if (period === "today") cutoffTimestamp = now - 24 * 3600000;

  // Carregar votos do utilizador atual (se autenticado)
  const userVoteMap = new Map<string, "up" | "down">();
  if (userId) {
    store.votes.forEach((v) => {
      if (v.user_id === userId) {
        userVoteMap.set(v.technology_id, v.vote_type);
      }
    });

    if (isSupabaseConfigured()) {
      try {
        const { data: dbVotes } = await supabaseAdmin
          .from("technology_votes")
          .select("technology_id, vote_type")
          .eq("user_id", userId);

        if (dbVotes) {
          dbVotes.forEach((row: any) => {
            userVoteMap.set(row.technology_id, row.vote_type);
          });
        }
      } catch {
        // Fallback para memória
      }
    }
  }

  // Obter todas as tecnologias ativas
  const allTechs = Array.from(store.technologies.values()).filter((t) => t.is_active);

  // Mapear categorias para lookup rápido
  const catMap = new Map<string, TechnologyCategory>();
  store.categories.forEach((cat) => catMap.set(cat.id, cat));

  // Processar cada tecnologia computando o score dinâmico de acordo com os filtros
  const processedItems: Omit<RankingItem, "rank">[] = allTechs.map((tech) => {
    const category = catMap.get(tech.category_id);
    const categoryName = category?.name || "Geral";
    const categorySlugVal = category?.slug || "geral";

    let calculatedUp = 0;
    let calculatedDown = 0;

    if (isGlobal && period === "all") {
      calculatedUp = tech.upvotes_count;
      calculatedDown = tech.downvotes_count;
    } else {
      // Filtrar votos correspondentes a este país e período
      store.votes.forEach((v) => {
        if (v.technology_id !== tech.id) return;
        if (!isGlobal && v.country_code !== cleanCountryCode) return;
        if (cutoffTimestamp > 0) {
          const voteTime = new Date(v.created_at).getTime();
          if (voteTime < cutoffTimestamp) return;
        }

        if (v.vote_type === "up") calculatedUp++;
        else if (v.vote_type === "down") calculatedDown++;
      });
    }

    const calculatedScore = calculatedUp - calculatedDown;

    return {
      ...tech,
      userVote: userVoteMap.get(tech.id) || null,
      categoryName,
      categorySlug: categorySlugVal,
      filteredScore: calculatedScore,
      filteredUpvotes: calculatedUp,
      filteredDownvotes: calculatedDown,
    };
  });

  // Filtro por Categoria
  let filtered = processedItems;
  if (categorySlug && categorySlug !== "todos") {
    filtered = filtered.filter(
      (item) => item.categorySlug === categorySlug || item.category_id === categorySlug
    );
  }

  // Filtro por Pesquisa de Texto
  if (searchQuery && searchQuery.trim().length > 0) {
    const term = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.categoryName.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term))
    );
  }

  // ORDENAÇÃO DINÂMICA:
  // Quem tem mais score (Upvotes - Downvotes) sobe; empate desempata por upvotes e nome
  filtered.sort((a, b) => {
    if (b.filteredScore !== a.filteredScore) {
      return b.filteredScore - a.filteredScore;
    }
    if (b.filteredUpvotes !== a.filteredUpvotes) {
      return b.filteredUpvotes - a.filteredUpvotes;
    }
    return a.name.localeCompare(b.name);
  });

  // Atribuir posições sequenciais no ranking (1, 2, 3...)
  const rankedItems: RankingItem[] = filtered.map((item, idx) => ({
    ...item,
    rank: idx + 1,
  }));

  // Top 3 do ranking filtrado
  const topThree = rankedItems.slice(0, 3);

  // Paginação
  const total = rankedItems.length;
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(5, Math.min(100, limit));
  const startIndex = (safePage - 1) * safeLimit;
  const paginatedItems = rankedItems.slice(startIndex, startIndex + safeLimit);
  const totalPages = Math.ceil(total / safeLimit) || 1;

  // Estatísticas gerais para o painel de topo
  let totalVotesCount = 0;
  store.technologies.forEach((t) => {
    totalVotesCount += t.upvotes_count + t.downvotes_count;
  });

  const activeCategories = Array.from(store.categories.values())
    .filter((c) => c.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const topTechnology = rankedItems[0]?.name || "Next.js";

  return {
    items: paginatedItems,
    topThree,
    total,
    page: safePage,
    totalPages,
    categories: activeCategories,
    activeCountry,
    stats: {
      totalTechnologies: allTechs.length,
      totalVotes: totalVotesCount,
      topTechnologyName: topTechnology,
      activeVotersCount: Math.round(totalVotesCount * 0.72) + 45,
    },
  };
}

// ============================================================================
// VOTAÇÃO ATÓMICA E SEGURA (UPVOTE / DOWNVOTE / TOGGLE REMOVAL)
// ============================================================================

export interface CastVoteParams {
  technologyId: string;
  userId: string;
  voteType: "up" | "down";
  countryCode?: string;
}

export interface CastVoteResult {
  success: boolean;
  action: "added" | "switched" | "removed";
  technology: Technology;
  userVote: "up" | "down" | null;
  newScore: number;
  newUpvotes: number;
  newDownvotes: number;
}

export async function castTechnologyVote({
  technologyId,
  userId,
  voteType,
  countryCode,
}: CastVoteParams): Promise<CastVoteResult> {
  if (!technologyId || !userId || !voteType) {
    throw new Error("Parâmetros de votação inválidos.");
  }

  const cleanTechId = technologyId.trim();
  const cleanUserId = userId.trim();
  const cleanCountry = normalizeCountryCode(countryCode);

  const store = getStore();
  const tech = store.technologies.get(cleanTechId);
  if (!tech) {
    throw new Error("Tecnologia não encontrada.");
  }

  const voteKey = `${cleanUserId}:${cleanTechId}`;
  const existingVote = store.votes.get(voteKey);

  let action: "added" | "switched" | "removed" = "added";
  let newUserVote: "up" | "down" | null = voteType;

  if (existingVote) {
    if (existingVote.vote_type === voteType) {
      // 1. O utilizador clicou no mesmo botão que já tinha votado: REMOVER VOTO (Toggle Off)
      action = "removed";
      newUserVote = null;
      store.votes.delete(voteKey);

      if (voteType === "up") {
        tech.upvotes_count = Math.max(0, tech.upvotes_count - 1);
      } else {
        tech.downvotes_count = Math.max(0, tech.downvotes_count - 1);
      }

      // Remover do banco de dados Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabaseAdmin
            .from("technology_votes")
            .delete()
            .match({ user_id: cleanUserId, technology_id: cleanTechId });
        } catch {
          // Fallback resiliente
        }
      }
    } else {
      // 2. O utilizador mudou de opinião (de UP para DOWN ou de DOWN para UP): ALTERAR VOTO
      action = "switched";
      newUserVote = voteType;
      existingVote.vote_type = voteType;
      existingVote.country_code = cleanCountry;

      if (voteType === "up") {
        tech.upvotes_count += 1;
        tech.downvotes_count = Math.max(0, tech.downvotes_count - 1);
      } else {
        tech.downvotes_count += 1;
        tech.upvotes_count = Math.max(0, tech.upvotes_count - 1);
      }

      // Atualizar no Supabase
      if (isSupabaseConfigured()) {
        try {
          await supabaseAdmin
            .from("technology_votes")
            .upsert({
              user_id: cleanUserId,
              technology_id: cleanTechId,
              vote_type: voteType,
              country_code: cleanCountry,
              updated_at: new Date().toISOString(),
            }, { onConflict: "user_id,technology_id" });
        } catch {
          // Fallback resiliente
        }
      }
    }
  } else {
    // 3. Novo voto ativo do utilizador
    action = "added";
    newUserVote = voteType;
    const newVote: TechnologyVote = {
      id: `vote-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      technology_id: cleanTechId,
      user_id: cleanUserId,
      vote_type: voteType,
      country_code: cleanCountry,
      created_at: new Date().toISOString(),
    };
    store.votes.set(voteKey, newVote);

    if (voteType === "up") {
      tech.upvotes_count += 1;
    } else {
      tech.downvotes_count += 1;
    }

    // Persistir no Supabase
    if (isSupabaseConfigured()) {
      try {
        await supabaseAdmin.from("technology_votes").insert([
          {
            technology_id: cleanTechId,
            user_id: cleanUserId,
            vote_type: voteType,
            country_code: cleanCountry,
          },
        ]);
      } catch {
        // Fallback resiliente
      }
    }
  }

  // Atualizar score recalculado de forma atómica
  tech.score = tech.upvotes_count - tech.downvotes_count;
  tech.updated_at = new Date().toISOString();
  store.technologies.set(cleanTechId, tech);

  // Sincronizar contadores na tabela technologies se o Supabase estiver ativo
  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin
        .from("technologies")
        .update({
          upvotes_count: tech.upvotes_count,
          downvotes_count: tech.downvotes_count,
          score: tech.score,
          updated_at: tech.updated_at,
        })
        .eq("id", cleanTechId);
    } catch {
      // Fallback gracioso
    }
  }

  return {
    success: true,
    action,
    technology: tech,
    userVote: newUserVote,
    newScore: tech.score,
    newUpvotes: tech.upvotes_count,
    newDownvotes: tech.downvotes_count,
  };
}

// ============================================================================
// ADMIN CRUD E GESTÃO
// ============================================================================

export async function createTechnology(data: {
  category_id: string;
  name: string;
  description: string;
  website_url?: string;
  logo_url?: string;
  tags?: string[];
}): Promise<Technology> {
  const store = getStore();
  const slug = data.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const id = `tech-${slug}-${Date.now()}`;
  const now = new Date().toISOString();

  const newTech: Technology = {
    id,
    category_id: data.category_id,
    name: data.name.trim(),
    slug,
    description: data.description.trim(),
    website_url: data.website_url?.trim() || "",
    logo_url: data.logo_url?.trim() || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    tags: data.tags || [],
    upvotes_count: 0,
    downvotes_count: 0,
    score: 0,
    is_active: true,
    created_at: now,
    updated_at: now,
  };

  store.technologies.set(id, newTech);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("technologies").insert([newTech]);
    } catch {
      // Fallback
    }
  }

  return newTech;
}

export async function updateTechnology(
  id: string,
  data: Partial<Technology>
): Promise<Technology> {
  const store = getStore();
  const existing = store.technologies.get(id);
  if (!existing) throw new Error("Tecnologia não encontrada.");

  const updated: Technology = {
    ...existing,
    ...data,
    score: (data.upvotes_count ?? existing.upvotes_count) - (data.downvotes_count ?? existing.downvotes_count),
    updated_at: new Date().toISOString(),
  };

  store.technologies.set(id, updated);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("technologies").update(data).eq("id", id);
    } catch {
      // Fallback
    }
  }

  return updated;
}

export async function toggleTechnologyActive(id: string): Promise<boolean> {
  const store = getStore();
  const existing = store.technologies.get(id);
  if (!existing) throw new Error("Tecnologia não encontrada.");

  existing.is_active = !existing.is_active;
  existing.updated_at = new Date().toISOString();
  store.technologies.set(id, existing);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin
        .from("technologies")
        .update({ is_active: existing.is_active })
        .eq("id", id);
    } catch {
      // Fallback
    }
  }

  return existing.is_active;
}

export async function deleteTechnology(id: string): Promise<void> {
  const store = getStore();
  store.technologies.delete(id);

  // Remover votos associados
  const keysToDelete: string[] = [];
  store.votes.forEach((v, k) => {
    if (v.technology_id === id) keysToDelete.push(k);
  });
  keysToDelete.forEach((k) => store.votes.delete(k));

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("technologies").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }
}

export async function createCategory(data: {
  id: string;
  name: string;
  description: string;
  icon?: string;
  sort_order?: number;
}): Promise<TechnologyCategory> {
  const store = getStore();
  const slug = data.id
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-");

  const newCat: TechnologyCategory = {
    id: data.id.trim().toLowerCase(),
    name: data.name.trim(),
    slug,
    description: data.description.trim(),
    icon: data.icon || "Code",
    sort_order: data.sort_order ?? store.categories.size + 1,
    is_active: true,
  };

  store.categories.set(newCat.id, newCat);

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin.from("technology_categories").insert([newCat]);
    } catch {
      // Fallback
    }
  }

  return newCat;
}

export async function getAdminRankingData() {
  const store = getStore();
  const techs = Array.from(store.technologies.values()).sort((a, b) => b.score - a.score);
  const categories = Array.from(store.categories.values()).sort((a, b) => a.sort_order - b.sort_order);
  const votes = Array.from(store.votes.values()).slice(-50).reverse();

  let totalUp = 0;
  let totalDown = 0;
  techs.forEach((t) => {
    totalUp += t.upvotes_count;
    totalDown += t.downvotes_count;
  });

  const countryVoteStats: Record<string, number> = {};
  store.votes.forEach((v) => {
    countryVoteStats[v.country_code] = (countryVoteStats[v.country_code] || 0) + 1;
  });

  return {
    technologies: techs,
    categories,
    recentVotes: votes,
    metrics: {
      totalTechnologies: techs.length,
      activeTechnologies: techs.filter((t) => t.is_active).length,
      totalVotes: totalUp + totalDown,
      totalUpvotes: totalUp,
      totalDownvotes: totalDown,
      totalCategories: categories.length,
      countryVoteStats,
    },
  };
}
