
import {
    Server,
    Layout,
    Smartphone,
    Cloud,
    Shield,
    Database,
    Brain,
    BarChart,
    Globe,
    Terminal,
    Cpu,
    PenTool,
    Briefcase,
    Users,
    Gamepad2,
    BookOpen,
    Wifi,
    Layers,
    Search,
    Megaphone,
    FileText
} from "lucide-react";

export interface StudyPlanStage {
    title: string;
    description: string;
    items: string[];
}

export interface ProjectItem {
    title: string;
    description: string;
    techStack: string[];
}

export interface StudyPlan {
    id: string;
    role: string;
    icon: any;
    color: string;
    description: string;
    responsibilities: string[];
    prerequisites: {
        knowledge: string[];
        softSkills: string[];
        complementary?: string[];
    };
    stages: {
        beginner: StudyPlanStage;
        intermediate: StudyPlanStage;
        advanced: StudyPlanStage;
    };
    tools: {
        languages: string[];
        frameworks: string[];
        tools: string[];
    };
    faq?: { q: string; a: string; }[];
    projects?: {
        junior: ProjectItem[];
        pleno: ProjectItem[];
        senior: ProjectItem[];
    };
}

export const STUDY_PLANS: StudyPlan[] = [
    {
        id: "frontend",
        role: "Frontend Engineer",
        icon: Layout,
        color: "blue",
        description: "Profissional que constrói a experiência visual, interativa e acessível de aplicações web, unindo design, código e usabilidade do browser. Atua no ciclo completo de interface, desde a resposta para o utilizador até a performance e acessibilidade em produção.",
        responsibilities: [
            "Criar interfaces web responsivas, acessíveis e de alta qualidade",
            "Transformar design em HTML/CSS limpos e componentes reutilizáveis",
            "Consumir APIs RESTful e GraphQL com gestão eficiente de dados",
            "Otimizar performance de carregamento, renderização e experiência do utilizador",
            "Escrever testes unitários, de integração e E2E para validar fluxos e componentes",
            "Garantir compatibilidade entre navegadores, SEO técnico e boas práticas de acessibilidade",
            "Documentar componentes e padrões de interface para uso de equipes front-end",
            "Colaborar com Product, Design e Backend para entrega segura e escalável"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação", "Fundamentos de HTML e CSS", "JavaScript básico", "Inglês técnico para leitura de docs", "Noções de linha de comando e Git"],
            softSkills: ["Empatia pelo utilizador final", "Atenção a detalhes visuais", "Comunicação clara com designers e backend", "Curiosidade para aprender novas ferramentas", "Organização para gerir layout, estados e prazos"],
            complementary: ["Como a Web funciona (HTTP, browser, DNS)", "Princípios básicos de UI/UX", "Noções iniciais de SEO e performance", "Conceitos de acessibilidade digital" ]
        },
        stages: {
            beginner: {
                title: "Fundamentos Web Essenciais",
                description: "A base que todo Frontend Engineer precisa: Web, HTML, CSS, JavaScript e o comportamento do browser.",
                items: [
                    "Como a Web funciona: requisições HTTP/HTTPS, DNS, servidores e hospedagem",
                    "Arquitetura do browser: parsing, render tree, repaint e reflow",
                    "HTML semântico: estruturas de página, navegação e formulários acessíveis",
                    "Acessibilidade inicial: WCAG, ARIA, navegação por teclado e uso de leitores de tela",
                    "CSS básico e avançado: Box Model, seletores, cascata, herança, Flexbox e Grid",
                    "Layout responsivo: mobile-first, media queries, unidades relativas (rem, em, vw, vh)",
                    "Fundamentos de tipografia, cores, contraste e design visual para interfaces",
                    "JavaScript básico: variáveis, tipos, operadores, funções, objetos, arrays e controle de fluxo",
                    "DOM e Eventos: manipulação de elementos, escuta de eventos e atualização dinâmica de interface",
                    "Assincronicidade: callbacks, promises, fetch e async/await",
                    "Ferramentas do desenvolvedor: DevTools, inspeção de elementos, console, network e debugging",
                    "Controle de versão: Git básico, commit, branch, merge e GitHub flow"
                ]
            },
            intermediate: {
                title: "Frontend Moderno e Profissional",
                description: "Construção de aplicações modernas com frameworks, tipagem, testes e práticas de engenharia de software.",
                items: [
                    "JavaScript moderno: ES6+, módulos, classes, destructuring e operadores avançados",
                    "TypeScript: tipos, interfaces, genéricos, utility types e inferência de tipos, com configuração strict",
                    "Componentes reutilizáveis: design system, composição, atomic design e organização de código",
                    "Frameworks e bibliotecas: React, Vue, Angular, Svelte e ecossistemas paralelos",
                    "Gerenciamento de estado: context API, Redux Toolkit, Zustand, Pinia e patterns de dados imutáveis",
                    "Estilos em projetos: CSS Modules, Tailwind CSS, Styled Components, CSS-in-JS e BEM",
                    "Consumir APIs: REST, GraphQL, Axios, fetch, tratamento de erros, loading states e cache local",
                    "Testes de frontend: Jest/Vitest, Testing Library, snapshots, testes de componentes e regressão visual",
                    "Performance prática: lazy loading, code splitting, imagens responsivas, optimization budgets e comparação de bundle size",
                    "SEO técnico para SPAs e sites: metatags, título dinâmico, sitemap, robots.txt e server-side rendering",
                    "Segurança no frontend: XSS, CORS, CSP, sanitização de entradas e armazenamento seguro de tokens",
                    "Boas práticas de acessibilidade: labels, focus outline, aria-live, contraste e navegação com teclado",
                    "Experiência cross-browser: polyfills, progressive enhancement, graceful degradation e testes em múltiplos navegadores"
                ]
            },
            advanced: {
                title: "Engenharia e Escala Frontend",
                description: "Profundidade em arquiteturas grandes, performance, tooling avançado e projetos escaláveis.",
                items: [
                    "Meta-frameworks e SSR/SSG: Next.js, Nuxt, Remix, Astro ou outras soluções híbridas",
                    "Arquitetura de aplicações: Atomic Design, feature folders, component libraries e monorepos",
                    "TypeScript avançado: mapeamento de tipos, inferência condicional, template literal types e utility types complexos",
                    "Performance a nível de aplicação: Core Web Vitals, Lighthouse, cache de dados, renderização incremental e budgets de performance",
                    "Progressive Web Apps (PWA): service workers, cache offline, manifest, notificações e instalação",
                    "Gestão avançada de dados: React Query, SWR, Apollo Client, cache de API, sincronização em tempo real e stale-while-revalidate",
                    "Microfrontends e deploy independente: module federation, web components, iframes e arquitetura de integração",
                    "Internacionalização (i18n) e localização (l10n): tradução, pluralização, formatos regionais e conteúdo dinâmico",
                    "Animações e motion design: transições CSS, Web Animations API, microinterações e performance suave",
                    "Observabilidade no frontend: monitoramento de erros, performance, logging, telemetry e user session replay",
                    "CI/CD para frontend: pipelines automáticos, linting, formatação, testes no build e deploy contínuo",
                    "Design systems e componentes acessíveis: tokens, theming, documentação, versionamento e manutenção a longo prazo",
                    "Comunicação em tempo real: WebSockets, Server-Sent Events e conceitos de streaming de dados",
                    "Estratégias de release: feature flags, A/B testing, rollback e deploy canary"
                ]
            }
        },
        tools: {
            languages: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
            frameworks: ["React", "Next.js", "Vue", "Angular", "Svelte", "Tailwind CSS"],
            tools: ["VS Code", "Git / GitHub", "Vite", "Webpack", "Figma", "Cypress", "Playwright", "ESLint", "Prettier", "Vercel"]
        },
        faq: [
            { q: "O que faz um Frontend Engineer?", a: "Lida com toda a parte visual, interativa e de consumo de dados na perspectiva do browser do utilizador." },
            { q: "Tenho de saber criar designs?", a: "Não. Deves saber implementar designs criados por outros e ter bom senso estético, mas habilidades de UI ajudam." },
            { q: "Posso ignorar HTML e CSS e ir direto para React?", a: "Péssima ideia. Sem base forte de HTML/CSS não conseguirás resolver problemas de layout complexos ou debugar interfaces." },
            { q: "Preciso conhecer performance e acessibilidade?", a: "Sim. Essas duas áreas diferenciam um bom frontend de um profissional completo." },
            { q: "Posso trabalhar remoto de Angola?", a: "Sim, Frontend é uma das áreas com mais oportunidades remotas a nível global." }
        ]
    },
    {
        id: "backend",
        role: "Backend Engineer",
        icon: Server,
        color: "emerald",
        description: "Responsável pela lógica core, persistência de dados, design de APIs e arquitetura de infraestrutura de aplicações complexas. Atua na construção de serviços confiáveis, seguros e prontos para produção em escala.",
        responsibilities: [
            "Arquitetar e desenvolver APIs RESTful e GraphQL escaláveis e seguras",
            "Modelar, otimizar e gerir transações em bases de dados relacionais e não relacionais",
            "Garantir a segurança aplicacional (autenticação, autorização e criptografia)",
            "Implementar arquiteturas assíncronas com mensageria e processamento em background",
            "Criar pipelines de deploy, containerização e integração contínua",
            "Estabelecer observabilidade: logs estruturados, métricas, tracing e alertas",
            "Projetar sistemas tolerantes a falhas com retry, circuit breaker e política de rollback"
        ],
        prerequisites: {
            knowledge: ["Estruturas de dados", "Lógica matemática sólida", "Comando de terminal (Linux)", "Noções de redes e sistemas distribuídos"],
            softSkills: ["Pensamento algorítmico", "Visão sistémica", "Atenção rígida à segurança", "Trabalho colaborativo com equipes diversas"],
            complementary: ["Funcionamento do hardware vs software", "Noções profundas de rede (TCP/IP)", "Fundamentos de criptografia básica", "Conceitos de containers e virtualização"]
        },
        stages: {
            beginner: {
                title: "Fundamentos Sistémicos de Servidor",
                description: "O núcleo do computador e da web: como os dados fluem e persistem na rede.",
                items: [
                    "Fundamentos de Internet: como a Internet funciona, TCP/IP, DNS, portas de rede e HTTP/HTTPS",
                    "Sistema operativo e CLI: navegação em terminal Linux, permissões, processos e serviços",
                    "Linguagem backend base: Python, Go, Node.js, C# ou Java",
                    "Protocolo HTTP explícito: verbos, status codes, headers, formulários vs JSON e payloads",
                    "Fundamentos de bancos de dados relacionais: modelagem, tabelas, chaves primárias e estrangeiras",
                    "Linguagem SQL básica: CRUD, Joins, Group By e cláusulas WHERE",
                    "Princípios de APIs REST: endpoints baseados em recursos, verbos e boas práticas JSON",
                    "Versionamento de código real: git branching, merge conflicts, pull requests e code review"
                ]
            },
            intermediate: {
                title: "Arquiteturas robustas e integração de dados",
                description: "Criação de APIs maduras e domínio dos ecossistemas de banco de dados.",
                items: [
                    "Framework principal de web: Express/NestJS (JS), FastAPI (Python), Spring (Java) ou Gin (Go)",
                    "Segurança aplicacional web: OWASP Top 10, SQL Injection, hashing de senhas (Bcrypt/Argon2)",
                    "Autenticação e autorização: JWT, OAuth 2.0, OpenID Connect e sessões seguras",
                    "Interação dinâmica com bancos de dados: ORMs/Query Builders (Prisma, TypeORM, SQLAlchemy, Dapper)",
                    "Bancos de dados NoSQL: MongoDB, Redis, Cassandra e diferenças essenciais vs SQL",
                    "Conceitos ACID e transações: atomicidade, consistência, isolamento e durabilidade",
                    "Otimizações essenciais: índices, normalização, desnormalização e caching com Redis",
                    "Containerização de aplicações: Docker, Docker Compose, imagens otimizadas e redes internas",
                    "Design de software: princípios SOLID, DRY, KISS, Clean Code e camadas de domínio",
                    "Testes de backend sólidos: testes unitários, testes de integração e contratos de API"
                ]
            },
            advanced: {
                title: "Sistemas distribuídos e alta escala",
                description: "A arte de lidar com milhões de requisições, evitar pontos únicos de falha e criar software elástico.",
                items: [
                    "Design de microserviços: service discovery, API gateways e comunicação entre serviços (gRPC, REST)",
                    "Filas de processamento e mensageria: RabbitMQ, Kafka, SQS/SNS e arquitetura event-driven",
                    "Arquitetura baseada em eventos: event sourcing, CQRS e streams de dados",
                    "Otimização avançada de base de dados: sharding, replicação read/write e estratégias de particionamento",
                    "Escalabilidade e load balancing: proxies reversos (Nginx), balanceadores, autoscaling e caches distribuídos",
                    "Engenharia de cloud prática: AWS, GCP ou Azure com compute, storage, networking e IAM",
                    "Observabilidade e monitoring: logs estruturados, métricas, tracing distribuído e alertas",
                    "Integração/Deploy contínuo profundo: pipelines Jenkins, GitHub Actions ou GitLab CI com testes e deploy automatizados",
                    "Kubernetes básico: pods, deployments, services, volumes e configurações de ambiente",
                    "Segurança avançada: rate limiting, DDoS mitigation, WAF e políticas de controle de acesso"
                ]
            }
        },
        tools: {
            languages: ["Node.js", "Python", "Go", "Java", "SQL"],
            frameworks: ["Express / NestJS", "Spring Boot", "FastAPI"],
            tools: ["Docker", "Postman / Insomnia", "Redis", "DBeaver / DataGrip", "Swagger / OpenAPI"]
        },
        faq: [
            { q: "O que faz exatamente um Backend Engineer?", a: "Constrói a lógica de negócio invisível, trata das bases de dados, servidores, APIs e performance do sistema à escala." },
            { q: "Qual a melhor linguagem para começar?", a: "Depende do seu stack alvo. Node.js e Python são mais acessíveis, mas Go e Java são ótimas para sistemas de alta performance." },
            { q: "Preciso saber muita matemática?", a: "Não para a grande maioria das vagas, mas lógica, algoritmos e decomposição de problemas são essenciais." },
            { q: "O trabalho é muito solitário?", a: "Não. Há muita colaboração com frontend, product e operações para construir serviços confiáveis." },
            { q: "O que significa observabilidade?", a: "É ter métricas, logs e tracing suficientes para diagnosticar problemas em produção rapidamente." }
        ]
    },
    {
        id: "fullstack",
        role: "Full-Stack Developer",
        icon: Globe,
        color: "violet",
        description: "Profissional híbrido capaz de conceber e entregar um produto inteiro, desde o Design System até à infraestrutura. Domina o fluxo completo e entende o impacto de cada escolha técnica no usuário e no negócio.",
        responsibilities: [
            "Conceber e projetar a arquitetura completa de novas aplicações do zero",
            "Desenvolver interfaces visuais com React/Next.js e lógicas de servidor complexas com Node/Python",
            "Gerir o estado global da aplicação e a integridade da persistência de dados",
            "Orquestrar o deployment contínuo juntando frontend (ex: Vercel) e backend (ex: AWS, Railway)",
            "Tomar decisões arquiteturais transversais equilibrando user experience com escalabilidade técnica",
            "Criar testes end-to-end, integração e automação que cubram o produto como um todo",
            "Comunicar tradeoffs entre velocidade de entrega, segurança e desempenho"
        ],
        prerequisites: {
            knowledge: ["Compreensão do ciclo de vida do produto", "Lógica de programação forte", "Noções de redes web", "Conceitos de banco de dados e versão de código"],
            softSkills: ["Agilidade contextual", "Priorização rápida de tarefas", "Senso de produto apurado", "Capacidade de aprender novas stacks rapidamente"],
            complementary: ["Planejamento de projetos ágeis", "Noções de UI/UX e bases de dados", "Entendimento de CI/CD", "Noções de segurança web básica"]
        },
        stages: {
            beginner: {
                title: "A construção da ponte (o básico do full flow)",
                description: "Entender como juntar a renderização do browser com os dados de um servidor básico.",
                items: [
                    "Trindade frontend: HTML5, CSS3 e JavaScript (manipulação de DOM)",
                    "Primeiros passos backend: configuração de um servidor local básico (Node.js + Express)",
                    "Bases de dados iniciais: instalação e criação de DB (PostgreSQL ou MySQL)",
                    "O fluxo completo: fazer com que o cliente (fetch/axios) leia dados reais da base de dados através da API",
                    "Controle de versões básico: Git, branches e pull requests",
                    "Princípios REST simples: criar endpoints CRUD completos (GET, POST, PUT, DELETE)",
                    "Gerenciadores de pacotes universais: NPM/Yarn no contexto do servidor e da UI"
                ]
            },
            intermediate: {
                title: "Consolidação da stack MERN/Next.js",
                description: "Domínio e velocidade para criar SaaS, plataformas robustas e integrações.",
                items: [
                    "Framework frontend profissional: React.js (hooks avançados, roteamento, state management local)",
                    "Autenticação ponta a ponta: JWT vs sessions e implementação front-to-back completa",
                    "Integração com ORMs: lidar com banco de dados sem escrever SQL puro (Prisma, TypeORM)",
                    "Validação de dados estrita: Zod, Joi (validar payload no backend e feedback visual no frontend)",
                    "Estilização avançada e eficiente: Tailwind CSS e bibliotecas de componentes (shadcn/ui, MUI)",
                    "Adoção de tipagem front-to-back: criação de tipos e interfaces globais partilháveis",
                    "Integração com serviços externos: Stripe/MercadoPago, SendGrid, AWS S3 uploads",
                    "Segurança cruzada: CORS, CSRF, proteção de cookies e headers seguros",
                    "Gestão de caching UI/API: React Query, SWR e estratégias de stale-while-revalidate",
                    "Deploys básicos: plataformas PaaS e serverless em Render, Heroku, Railway e Vercel"
                ]
            },
            advanced: {
                title: "Meta-frameworks, escala e deployments sérios",
                description: "O expoente full-stack: lidando com arquitetura avançada, WebSockets e DevOps.",
                items: [
                    "Frameworks full-stack modernos: Next.js App Router, Remix ou SvelteKit",
                    "Estratégias de renderização profunda: SSR, SSG, ISR e edge rendering",
                    "Monorepos modernos em escala: Turborepo/Nx para pacotes partilhados (UI, validações, DB)",
                    "Docker prático full-stack: Dockerfile multistage para front e back, Docker Compose para DB local",
                    "WebSockets e tempo real: Socket.io, Server-Sent Events e mensageria bidirecional",
                    "Serverless architecture: AWS Lambda, Vercel serverless functions e edge computing",
                    "Bancos de dados avançados para fullstack: Redis para cache de sessões e filas (BullMQ)",
                    "Pipelines de CI/CD robustos: GitHub Actions para testar a app completa, build e deploy em múltiplos ambientes",
                    "Otimizações finais: load balancing, CDN, compressão, lazy loading e monitorização completa",
                    "Testes integrados ponta a ponta: Cypress ou Playwright, com ambientes de teste e dados sintéticos"
                ]
            }
        },
        tools: {
            languages: ["TypeScript", "JavaScript", "SQL"],
            frameworks: ["React", "Next.js", "Express", "TailwindCSS", "GraphQL"],
            tools: ["VS Code", "Docker", "Prisma", "Vercel", "GitHub Actions", "Storybook"]
        },
        faq: [
            { q: "Devo começar diretamente como Full-Stack?", a: "Geralmente é melhor fortalecer-se em uma área primeiro e depois aprender a outra. Full-Stack exige entendimento dos dois lados." },
            { q: "Ganho mais que um especialista?", a: "Em muitas startups e PMEs, sim. Mas em grandes empresas, especialistas muito profundos também têm alto valor." },
            { q: "É muito stressante?", a: "Demanda atenção a muitas tecnologias, mas com disciplina e boas práticas a carga se torna gerenciável." },
            { q: "Preciso saber deploy e infra?", a: "Sim. Um bom Full-Stack deve entender como o app roda em produção para evitar surpresas no lançamento." }
        ]
    },
    {
        id: "mobile",
        role: "Mobile Developer",
        icon: Smartphone,
        color: "pink",
        description: "Especialista em aplicações móveis nativas ou híbridas, focado em interfaces fluidas, desempenho e experiência consistente em iOS e Android.",
        responsibilities: [
            "Construir arquiteturas escaláveis para aplicações mobile (cross-platform ou nativas)",
            "Garantir 60fps constantes (ou 120fps) com renderização fluida de UI",
            "Consumir APIs de backend utilizando estratégias de cache offline eficientes",
            "Integrar funcionalidades nativas de hardware (acelerômetro, câmera, Bluetooth, notificações)",
            "Navegar processos de build, code signing e revisão de App Store e Google Play",
            "Monitorar crashes e métricas de uso para melhorar a estabilidade"
        ],
        prerequisites: {
            knowledge: ["Lógica orientada a objetos", "Entendimento de threads/assincronia", "Noções de redes e APIs REST"],
            softSkills: ["Perfeccionismo com layouts nativos", "Resiliência para bugs complexos de iOS", "Boa comunicação"],
            complementary: ["Diretrizes Human Interface (Apple) / Material Design", "Entendimento de bancos de dados em dispositivos", "Fundamentos de UI/UX mobile"]
        },
        stages: {
            beginner: {
                title: "A plataforma e o setup móvel",
                description: "Compreender o mundo mobile, simuladores e a arquitetura das árvores visuais.",
                items: [
                    "Escolha de base e setup: configurar React Native (Expo/CLI), Flutter ou desenvolvimento nativo",
                    "Entender o ciclo de vida: states de app (background, foreground, active, inactive)",
                    "Construção da UI base móvel: views, textos, imagens e layouts flexíveis",
                    "Interatividade e feedback tátil: toques, gestos, teclado virtual e safe area",
                    "Estilização mobile básica: adaptação a múltiplas telas, temas e dark mode",
                    "Listas performáticas: FlatList, RecyclerView e otimização de renderização",
                    "Navegação móvel essencial: stacks, tabs, modais e drawers entre telas",
                    "Integração com APIs: fetch, tratamento de promessas e estados de carregamento"
                ]
            },
            intermediate: {
                title: "Desenvolvimento fluído, hardware e offline first",
                description: "Conectar o app ao sistema móvel nativo e lidar com dados no dispositivo.",
                items: [
                    "Armazenamento local avançado: AsyncStorage, SharedPreferences, SQLite ou WatermelonDB",
                    "Sincronização online-offline: estratégias de cache e reconciliação de dados",
                    "Gestão de estado completa: Redux, MobX, Context API, Zustand e patterns de fluxo de dados",
                    "Navegação profunda: passar parâmetros complexos e deep linking básico",
                    "Acesso nativo a sensores: permissões, câmera, galeria, localização e mapas",
                    "Animações complexas a 60fps: Reanimated, Lottie e transições suaves",
                    "Tuning de performance: identificar UI bloqueante e otimizar renderização",
                    "Testes em mobile: Jest para lógica e Detox/Appium para testes de interface",
                    "Notificações locais e background: cargas agendadas e atualização silenciosa"
                ]
            },
            advanced: {
                title: "Lojas, automação profunda e engenharia mobile real",
                description: "Arquiteturas enterprise, módulos nativos próprios e DevSecOps móvel.",
                items: [
                    "Código nativo cru: bridges e plugins em Swift/Objective-C e Kotlin/Java para funções ausentes",
                    "Push notifications completas: Firebase Cloud Messaging, APNs e tokens seguros",
                    "Deep linking universal/app links: abertura direta em rotas internas verificadas",
                    "In-app purchases e assinaturas: RevenueCat, verificação de recibos e restauração de compras",
                    "Segurança mobile: proteção contra engenharia reversa, Keychain/Keystore e criptografia local",
                    "Integração nativa avançada: Siri shortcuts, Apple Watch, WearOS e widgets de home",
                    "CI/CD para mobile: Fastlane, automação de versões e distribuição beta contínua",
                    "Monitorização crítica: Sentry, Crashlytics e analytics sem bloquear a UI",
                    "Atualizações OTA: Expo Updates, CodePush e deploy sem revisão de loja",
                    "Micro-apps avançados: App Clips (iOS) e Instant Apps (Android)"
                ]
            }
        },
        tools: {
            languages: ["JavaScript/TypeScript", "Dart", "Swift / Kotlin", "Java"],
            frameworks: ["React Native (Expo)", "Flutter"],
            tools: ["Android Studio", "Xcode", "Fastlane", "Firebase", "App Center"]
        },
        faq: [
            { q: "O que faz um Mobile Developer?", a: "Cria e otimiza aplicações para smartphones, garantindo performance, fluidez nativa e boa autonomia de bateria." },
            { q: "Nativo ou cross-platform?", a: "Para começar rápido, React Native ou Flutter. Para máxima estabilidade e desempenho, apps nativas em Swift/Kotlin." },
            { q: "É necessário ter um Mac?", a: "Para compilar e publicar apps iOS, sim. Alternativas em nuvem existem, mas o Mac é a forma mais direta." },
            { q: "Como lido com aprovação nas App Stores?", a: "É um processo rigoroso; a App Store costuma rejeitar apps por UX, privacidade ou problemas de desempenho." }
        ]
    },
    {
        id: "devops",
        role: "DevOps Engineer",
        icon: Terminal,
        color: "orange",
        description: "A ponte vital entre Desenvolvimento e Operações. Automatiza entregas, garante estabilidade e reduz o time-to-market.",
        responsibilities: [
            "Arquitetar e manter pipelines CI/CD automatizados (zero downtime)",
            "Gerir toda a infraestrutura através de código (IaC)",
            "Orquestrar e escalar clusters de containers",
            "Implementar observabilidade total (logs, métricas e traces)",
            "Garantir a segurança automatizada do código em produção (DevSecOps)",
            "Controlar custos e governança de ambientes cloud"
        ],
        prerequisites: {
            knowledge: ["Administração Linux sólida", "Redes/TCP-IP", "Shell scripting/Python básico", "Fundamentos de containers e virtualização"],
            softSkills: ["Tolerância à frustração", "Mentalidade de automação extrema", "Resolução de problemas críticos", "Comunicação com time de dev e infra"],
            complementary: ["Arquiteturas de software (microserviços)", "Bases de cibersegurança", "Conceitos de backend engineering"]
        },
        stages: {
            beginner: {
                title: "As ferramentas base (o system admin moderno)",
                description: "Domínio profundo do terminal, redes e da fundação de onde tudo corre.",
                items: [
                    "Sistemas operativos focados em servidor: gestão avançada de Linux (processos, cronjobs, systemd)",
                    "Shell scripting robusto: automação em Bash/Zsh, sed, awk e manipulação de texto CLI",
                    "Fundamentos de redes: DNS, TCP vs UDP, subnets, portas, NAT e VPNs",
                    "Versionamento em equipe: Git avançado (rebase, cherry-pick, resolução de conflitos)",
                    "Python prático: scripts de automação, chamadas HTTP e integração com APIs de cloud",
                    "Servidores web & proxies: Nginx vs Apache, virtual hosts, SSL e Certbot",
                    "Monitorização nível 1: htop, netstat, df, systemctl status e logs básicos"
                ]
            },
            intermediate: {
                title: "Containerização, CI/CD e infra na cloud",
                description: "Mudar do servidor manual para pipelines de entrega e containers imutáveis.",
                items: [
                    "Docker avançado: imagens otimizadas, multi-stage builds e registries privados",
                    "Orquestração local: Docker Compose, volumes, redes e configuração multi-serviço",
                    "CI/CD profissional: GitHub Actions, GitLab CI ou Jenkins com pipelines reais",
                    "Cloud computing: AWS (EC2, S3, RDS, IAM, VPC), Azure ou GCP e seus serviços gerenciados",
                    "Gestão de segredos: .env seguro, AWS Secrets Manager e HashiCorp Vault básico",
                    "Web servers avançados: Nginx com load balancing, caching e rate limiting",
                    "Infraestrutura como código: Terraform state, providers e módulos básicos",
                    "Configuração de servidores: Ansible playbooks, roles, inventários e idempotência"
                ]
            },
            advanced: {
                title: "Kubernetes, GitOps e engenharia de fiabilidade (SRE)",
                description: "Gerir tráfego global, clusters gigantescos e implementar infraestrutura autocurável.",
                items: [
                    "Kubernetes profundo: arquitetura, deployments, statefulsets, ingress controllers e volumes",
                    "Helm charts: criação, parametrização e deploy de aplicações Kubernetes",
                    "GitOps real: Argo CD ou Flux CD sincronizando Git com clusters",
                    "IaC mestra: Terraform em larga escala, AWS CDK ou Pulumi",
                    "Service mesh: Istio ou Linkerd para tráfego mTLS, roteamento e políticas de segurança",
                    "Observabilidade completa: métricas (Prometheus), logs (ELK/Loki), tracing (Jaeger)",
                    "Dashboards e alertas: Grafana avançado, Alertmanager e notificações no PagerDuty/Slack",
                    "DevSecOps contínuo: SonarQube, Trivy, Snyk e scanners de imagens Docker",
                    "Chaos Engineering: testes intencionais de falhas e validação de resiliência",
                    "FinOps: otimização de custos, instâncias spot e ambientes de baixo consumo" 
                ]
            }
        },
        tools: {
            languages: ["Bash", "Python", "Go", "YAML / JSON"],
            frameworks: ["Terraform", "Ansible", "Helm"],
            tools: ["AWS / GCP / Azure", "Docker / Kubernetes", "GitHub Actions", "Prometheus / Grafana", "Vault", "Argo CD"]
        },
        faq: [
            { q: "DevOps é um cargo para iniciantes (júnior)?", a: "Não. A maioria das empresas prefere alguém com experiência em desenvolvimento ou sysadmin devido ao risco de afetar a infraestrutura inteira." },
            { q: "Preciso saber programar?", a: "Sim. Você escreve IaC e automações em Python/Golang/Bash diariamente." },
            { q: "A pressão é muito grande?", a: "Sim. Quando a produção cai ou há uma falha de segurança, você é o ponto de contato técnico principal." },
            { q: "Vale a pena aprender várias clouds?", a: "Sim. Entender conceitos multi-cloud e como escolher o melhor serviço ajuda a resolver problemas reais." }
        ]
    },
    {
        id: "datascience",
        role: "Data Scientist",
        icon: Brain,
        color: "cyan",
        description: "Transforma terabytes de dados brutos e caóticos em previsões de negócio poderosas, suportadas por IA. Trabalha do data wrangling até a entrega do modelo em produção.",
        responsibilities: [
            "Realizar análise exploratória (EDA) em dados não estruturados e estruturados",
            "Criar, treinar e afinar modelos de machine learning (classificação, regressão e séries temporais)",
            "Implementar algoritmos de processamento de linguagem natural (NLP) e visão computacional",
            "Apresentar insights de negócio baseados em estatística e métricas aos stakeholders",
            "Preparar modelos para integração aplicacional e operações de MLOps"
        ],
        prerequisites: {
            knowledge: ["Álgebra linear e cálculo numérico", "Probabilidade e estatística", "Pensamento lógico consistente", "Fundamentos de programação Python"],
            softSkills: ["Ceticismo positivo com dados", "Storytelling de dados", "Curiosidade para explorar padrões"],
            complementary: ["Conhecimento de negócio do domínio escolhido", "Privacidade de dados (GDPR e práticas de compliance)", "Noções básicas de sistemas distribuídos"]
        },
        stages: {
            beginner: {
                title: "A fundação estatística e Python numérico",
                description: "Dominar o terreno dos dados: matemática essencial e manipulação de dados para extrair valor.",
                items: [
                    "Python intermédio e ambientes virtuais (Conda/Venv)",
                    "Estatística descritiva: médias, variância, desvio padrão e distribuições básicas",
                    "Álgebra linear prática: vetores, matrizes, multiplicações e autovalores",
                    "NumPy profundo: arrays multidimensionais, broadcasting e operações vetorizadas",
                    "Pandas avançado: DataFrames, groupby, merge, pivot tables e limpeza de dados",
                    "Visualização de dados: Matplotlib, Seaborn e interpretação de gráficos",
                    "SQL básico: consultas SELECT, JOIN, agregações e extração de dados para análise",
                    "Data cleaning: tratamento de missing values, outliers, duplicates e normalização"
                ]
            },
            intermediate: {
                title: "Machine learning e feature engineering",
                description: "Treinar a máquina para encontrar padrões e construir features que realmente importam.",
                items: [
                    "Scikit-Learn: pipelines de treino, pré-processamento e avaliação de modelos",
                    "Aprendizado supervisionado: regressão linear/logística, árvores de decisão, random forest",
                    "Aprendizado não supervisionado: clustering, PCA e redução dimensional",
                    "Métricas críticas: precisão, recall, F1-score, ROC/AUC e matriz de confusão",
                    "Feature engineering: one-hot encoding, scaling, normalização e criação de categorias relevantes",
                    "Validação robusta: cross-validation, K-fold e regularização (Lasso/Ridge)",
                    "Modelos avançados: XGBoost, LightGBM e técnicas de tuning de hiperparâmetros",
                    "NLP clássico: tokenização, stopwords, bag of words, TF-IDF e embeddings simples",
                    "Prototipagem de dashboards: Streamlit, Dash ou Voila para demonstrar resultados"
                ]
            },
            advanced: {
                title: "Deep learning e MLOps",
                description: "Simular o cérebro humano e escalar IA para milhões de utilizadores na nuvem.",
                items: [
                    "Deep learning: camadas densas, backpropagation e funções de ativação",
                    "PyTorch ou TensorFlow: tensores, autograd, DataLoaders e treinamento em batch",
                    "CNNs para visão computacional: convoluções, pooling e transfer learning",
                    "RNN/LSTM e transformers para séries temporais e NLP avanços",
                    "Transformers modernos: BERT, GPT, HuggingFace e fine-tuning de LLMs",
                    "MLOps básico: versionamento de dados, tracking de experimentos e deployment de modelos",
                    "Big data: PySpark, ETLs distribuídos e processamento em clusters",
                    "Servir modelos em API: FastAPI, Docker e containers para inferência em produção",
                    "Hardware de inferência: GPU local com CUDA vs TPUs em AWS SageMaker/GCP Vertex"
                ]
            }
        },
        tools: {
            languages: ["Python", "R", "SQL"],
            frameworks: ["Pandas / Scikit-Learn", "PyTorch / TensorFlow", "FastAPI"],
            tools: ["Jupyter Notebook", "Docker", "MLflow", "Google Colab", "Weights & Biases"]
        },
        faq: [
            { q: "O que faz um Data Scientist?", a: "Transforma dados em insights acionáveis, treina modelos e ajuda o negócio a tomar decisões baseadas em informação." },
            { q: "Devo dominar matemática?", a: "Sim. Álgebra e estatística são essenciais para entender por que um modelo funciona ou falha." },
            { q: "Devo aprender R ou Python?", a: "Python é mais usado em produção e integra melhor com pipelines, mas R ainda é útil para análise estatística." },
            { q: "Data Science é só IA?", a: "Não. Boa parte do trabalho é preparação de dados, experimentação e comunicação com o negócio." }
        ]
    },
    {
        id: "uiux",
        role: "UI/UX Designer",
        icon: PenTool,
        color: "fuchsia",
        description: "Mais do que ecrãs bonitos, é o construtor científico de experiências focadas no utilizador, acessíveis e alinhadas com os objetivos de negócio.",
        responsibilities: [
            "Conduzir estudos de utilizador e pesquisas qualitativas/quantitativas",
            "Desenhar interfaces escaláveis e coerentes com design systems",
            "Traduzir modelos mentais complexos para fluxos de utilizador intuitivos",
            "Avaliar acessibilidade total e impacto de micro-interações",
            "Entregar handoffs técnicos claros para as equipas de frontend"
        ],
        prerequisites: {
            knowledge: ["Princípios da Gestalt", "Teoria das cores e tipografia", "Empatia cognitiva", "Fundamentos de usabilidade"],
            softSkills: ["Receber feedback construtivo", "Advogar pelo utilizador", "Comunicação visual clara"],
            complementary: ["Noções de HTML/CSS", "Pensamento crítico", "Compreensão de métricas de produto"]
        },
        stages: {
            beginner: {
                title: "Alfabetização visual e prototipagem inicial",
                description: "Entender espaços, pixels, intenção digital e empatia básica.",
                items: [
                    "Domínio inicial do Figma: frames, shapes, layers, componentes e grids",
                    "Fundamentos de UX: UX vs UI, user-centered design e empatia pelo utilizador",
                    "Princípios visuais sólidos: alinhamento, contraste, repetição e proximidade",
                    "Tipografia: escolha de fontes, hierarquia, line height e legibilidade",
                    "Teoria das cores: paletas, contraste e acessibilidade de cores",
                    "Layouts e espaçamento: sistemas base-8 e base-4 para consistência visual",
                    "Arquitetura da informação: sitemaps, hierarquia e padrões de leitura F/Z",
                    "Wireframes de baixa fidelidade: protótipos rápidos em papel ou em ferramentas digitais"
                ]
            },
            intermediate: {
                title: "Profissionalização do UI e research aplicada",
                description: "Construir sistemas visuais com consistência e decisões suportadas por dados.",
                items: [
                    "Figma avançado: auto layout, componentes, variants e constraints",
                    "Prototipagem tátil: protótipos interativos, animações e testes de fluxo",
                    "Design systems: tokens, estilos globais, componentes reutilizáveis e documentação",
                    "UX research prático: personas, JTBD, entrevistas e surveys estruturadas",
                    "Avaliação heurística: aplicar os 10 princípios de usabilidade de Nielsen",
                    "Acessibilidade: contraste, tamanho de toque, leitura de tela e validação de WCAG",
                    "Mapeamento de journeys: fluxos emocionais e pontos de fricção do utilizador",
                    "Design atômico: átomos, moléculas, organismos e templates"
                ]
            },
            advanced: {
                title: "Estratégia UX, micro-interações e design ops",
                description: "Ter visão de produto, protótipos avançados e integração perfeita com engenharia.",
                items: [
                    "Variants complexas: propriedades avançadas de componentes e estados booleanos",
                    "Testes de usabilidade e A/B tests com utilizadores reais",
                    "Micro-interações e motion UX: easing, timing, feedback e animações relevantes",
                    "Acessibilidade contínua: auditoria WCAG 2.1 AA e documentação de compliance",
                    "Handoff perfeito: specs claras, exportação de assets e comunicação com devs",
                    "Métricas de UX: SUS, NPS, task success rate, tempo por tarefa e churn",
                    "DesignOps: bibliotecas multi-equipe, versionamento e governança de design",
                    "UX writing: mensagens claras, tonalidade de voz e microcópias eficazes",
                    "Noções reais de frontend: entender limitações do HTML/CSS e facilitar a implementação"
                ]
            }
        },
        tools: {
            languages: ["HTML / CSS (noções técnicas)"],
            frameworks: ["Material Design", "Apple HIG", "WCAG"],
            tools: ["Figma", "Miro / FigJam", "Maze / Hotjar", "Notion / Confluence"]
        },
        faq: [
            { q: "O que faz um UI/UX Designer?", a: "Projeta experiências digitais que são usáveis, bonitas e alinhadas aos objetivos de negócio." },
            { q: "Preciso saber design gráfico avançado?", a: "Não necessariamente. Habilidades de layout, tipografia e hierarquia visual são mais importantes do que arte complexa." },
            { q: "UX é só pesquisas?", a: "Não. É pesquisa, design, testes e tradução para engenharia, tudo com foco no utilizador." },
            { q: "UI/UX trabalha com dados?", a: "Sim. A melhor experiência é construída com base em feedback real, métricas e testes de usabilidade." }
        ]
    },
    {
        id: "cloud",
        role: "Cloud Engineer",
        icon: Cloud,
        color: "sky",
        description: "Especialista em arquiteturas em nuvem, automação de infraestrutura e deployments escaláveis em AWS/GCP/Azure.",
        responsibilities: [
            "Desenhar e operar infraestruturas seguras e escaláveis na nuvem",
            "Automatizar deploys e monitorar ambientes de produção",
            "Garantir alta disponibilidade, recuperação de desastres e otimização de custos",
            "Integrar serviços de rede, armazenamento e processamento distribuído",
            "Colaborar com DevOps e desenvolvimento para entrega contínua",
            "Definir governança, compliance e modelos de acesso na nuvem"
        ],
        prerequisites: {
            knowledge: ["Noções de redes e sistemas", "Conceitos de virtualização", "Bases em Linux", "Modelos de arquitetura em nuvem"],
            softSkills: ["Raciocínio analítico", "Mente de automação", "Visão de segurança", "Capacidade de negociação de custos"],
            complementary: ["Fundamentos de DevOps", "Arquitetura de software distribuído", "Noções de containers"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de nuvem e serviços básicos",
                description: "Entender os blocos de construção da nuvem e a diferença entre IaaS, PaaS e SaaS.",
                items: [
                    "Introdução à cloud: AWS, Azure, GCP e principais serviços",
                    "Máquinas virtuais e storage: EC2, Compute Engine, S3 e Blob Storage",
                    "Rede na nuvem: VPC, subnets, roteamento, firewalls e balanceadores",
                    "Provisionamento básico: criar instâncias, buckets e regras de segurança",
                    "IAM: permissões, roles e políticas básicas",
                    "Monitorização inicial: CloudWatch, Stackdriver e logs básicos",
                    "Modelos de responsabilidade compartilhada: o que a cloud faz e o que você deve proteger"
                ]
            },
            intermediate: {
                title: "Infraestrutura como código e automação",
                description: "Criar, versionar e manter infraestrutura usando código e pipelines automáticos.",
                items: [
                    "IaC com Terraform: providers, recursos, módulos e state remoto",
                    "Serverless e functions: AWS Lambda, Azure Functions ou Cloud Functions",
                    "CI/CD para infra: pipelines com GitHub Actions, GitLab CI ou Azure DevOps",
                    "Segurança de cloud prática: IAM granular, secrets e políticas de rede",
                    "Armazenamento gerenciado: RDS, Cloud SQL, Firestore e Cosmos DB",
                    "Redes avançadas: VPN, peering entre contas e balanceadores de carga",
                    "Automação de backups e restore: snapshots, lifecycle policies e versionamento"
                ]
            },
            advanced: {
                title: "Arquitetura cloud em escala e FinOps",
                description: "Projetar sistemas resilientes, autoscaláveis e economicamente eficientes.",
                items: [
                    "Arquitetura multi-region: tolerância a falhas e latência global",
                    "Kubernetes na nuvem: EKS, GKE ou AKS e deploy de clusters gerenciados",
                    "Observabilidade completa: métricas, tracing distribuído e dashboards",
                    "Segurança avançada: policies, encryption at rest e in transit, WAF",
                    "FinOps: otimização de custos, spot instances, rightsizing e budgets",
                    "Disaster recovery e backup: planos de recovery, replication e snapshots",
                    "Governança de cloud: tagging, políticas de compliance e auditoria"
                ]
            }
        },
        tools: {
            languages: ["YAML", "HCL", "Python / Bash"],
            frameworks: ["Terraform", "Pulumi", "Serverless Framework"],
            tools: ["AWS / GCP / Azure", "Docker", "Kubernetes", "GitHub Actions", "Vault", "Grafana"]
        },
        faq: [
            { q: "Cloud Engineer e DevOps são a mesma coisa?", a: "Não exatamente. Cloud Engineer foca na arquitetura e serviços em nuvem, enquanto DevOps foca em automação e cultura de entrega." },
            { q: "Preciso saber codificar para ser um Cloud Engineer?", a: "Sim, especialmente para IaC, automações e integrações de serviços de nuvem." },
            { q: "Cloud é só AWS?", a: "Não. Muitas empresas usam AWS, GCP, Azure ou estratégias multi-cloud." },
            { q: "Cloud também exige segurança?", a: "Sim. Segurança, identidade e governance são pilares críticos em qualquer arquitetura de nuvem." }
        ]
    },
    {
        id: "security",
        role: "Cybersecurity Engineer",
        icon: Shield,
        color: "red",
        description: "Protege sistemas, aplicações e dados contra ataques maliciosos e garante conformidade de segurança.",
        responsibilities: [
            "Avaliar vulnerabilidades e estabelecer controles de segurança",
            "Implementar defesa em profundidade e políticas de acesso",
            "Monitorar e responder a incidentes de segurança",
            "Integrar segurança em pipelines DevSecOps",
            "Educar as equipas sobre práticas seguras de desenvolvimento",
            "Construir programas de governança e compliance de segurança"
        ],
        prerequisites: {
            knowledge: ["Redes e protocolos de comunicação", "Sistemas operacionais", "Conceitos de criptografia", "Fundamentos de desenvolvimento seguro"],
            softSkills: ["Mentalidade de risco", "Atenção extrema a detalhes", "Comunicação clara em incidentes"],
            complementary: ["Conhecimento de compliance e regulamentação", "Análise de logs e eventos", "Noções de segurança em cloud"]
        },
        stages: {
            beginner: {
                title: "Segurança básica e fundamentos de ataque",
                description: "Conhecer as principais ameaças e aprender a proteger aplicações e redes básicas.",
                items: [
                    "OWASP Top 10 e ameaças web mais comuns",
                    "Criptografia básica: hashes, certificados e TLS",
                    "Autenticação e autorização: JWT, cookies seguros e MFA",
                    "Segurança de redes: firewalls, VPNs e segmentação de rede",
                    "Análise de logs básicos e deteção de anomalias",
                    "Boas práticas de senha, armazenamento seguro e políticas de acesso"
                ]
            },
            intermediate: {
                title: "Segurança aplicacional e pipelines DevSecOps",
                description: "Integrar práticas de segurança ao ciclo de vida do software e reduzir riscos em produção.",
                items: [
                    "Testes de segurança em APIs e aplicações web",
                    "Hardening de sistemas Linux e containers",
                    "Ferramentas SAST/DAST e análise estática de código",
                    "Resposta a incidentes: playbooks, triagem e comunicação interna",
                    "Gestão de vulnerabilidades e patching rápido",
                    "Implementação de políticas de least privilege e controle de acesso"
                ]
            },
            advanced: {
                title: "Arquitetura segura, resposta a incidentes e compliance",
                description: "Garantir segurança de alta confiança, operacionalizar a deteção de ataques e defender ambientes críticos.",
                items: [
                    "Zero Trust Architecture e segmentação de rede avançada",
                    "Implementação de SIEM e monitorização avançada de segurança",
                    "Controle de ativação de rate limits (Rastreio de endpoints e frequência de bloqueio)",
                    "DevSecOps completo: automação de scans, pipelines e chaos security",
                    "Threat modeling e análise de risco contínua",
                    "Painel de controle de ataques: identificação de tipo, autor (IP) e geolocalização",
                    "Recuperação de incidentes e forense digital básica",
                    "Compliance e standards: ISO 27001, GDPR e PCI-DSS"
                ]
            }
        },
        tools: {
            languages: ["Python", "Bash", "YAML"],
            frameworks: ["Splunk", "ELK", "OSQuery"],
            tools: ["Wireshark", "Nmap", "Burp Suite", "OWASP ZAP", "Snyk"]
        },
        faq: [
            { q: "Preciso saber programação para Cybersecurity?", a: "Sim. Entender scripts, automação e análise de exploits é essencial." },
            { q: "Todo mundo nesta área é hacker?", a: "Não. A maior parte do trabalho é prevenção, monitorização e resposta a ameaças." },
            { q: "Security é só para empresas grandes?", a: "Não. Pequenas empresas também precisam de proteção, e profissionais de segurança são cada vez mais valorizados." },
            { q: "O que é DevSecOps?", a: "É integrar segurança no ciclo contínuo de desenvolvimento e entrega, automatizando análise de riscos e policies." }
        ]
    }
];
