"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Star, Zap, Trophy, Code2, ChevronRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { STUDY_PLANS, StudyPlan } from "@/data/study-plans";
import { ROADMAP_PROJECTS } from "@/data/roadmap-projects";
import { VIDEO_LESSONS, getVideosByRoadmapAndLevel, type VideoLesson } from "@/data/video-lessons";
import { STUDY_MATERIALS, getMaterialsByRoadmapAndLevel, getMaterialTypeLabel, getMaterialTypeColor } from "@/data/study-materials";

/* ── Color palette ─────────────────────────────────────────── */
const CM: Record<string, { accent: string; abg: string; atxt: string; dark: string; ldash: string; bbg: string; btxt: string }> = {
  blue: { accent: "#3b82f6", abg: "#eff6ff", atxt: "#1d4ed8", dark: "#1e3a5f", ldash: "#93c5fd", bbg: "#dbeafe", btxt: "#1d4ed8" },
  emerald: { accent: "#10b981", abg: "#ecfdf5", atxt: "#065f46", dark: "#064e3b", ldash: "#6ee7b7", bbg: "#d1fae5", btxt: "#065f46" },
  violet: { accent: "#7c3aed", abg: "#f5f3ff", atxt: "#4c1d95", dark: "#2e1065", ldash: "#c4b5fd", bbg: "#ede9fe", btxt: "#4c1d95" },
  pink: { accent: "#ec4899", abg: "#fdf2f8", atxt: "#9d174d", dark: "#500724", ldash: "#f9a8d4", bbg: "#fce7f3", btxt: "#9d174d" },
  orange: { accent: "#f97316", abg: "#fff7ed", atxt: "#c2410c", dark: "#431407", ldash: "#fdba74", bbg: "#ffedd5", btxt: "#c2410c" },
  cyan: { accent: "#06b6d4", abg: "#ecfeff", atxt: "#0e7490", dark: "#083344", ldash: "#67e8f9", bbg: "#cffafe", btxt: "#0e7490" },
  fuchsia: { accent: "#d946ef", abg: "#fdf4ff", atxt: "#86198f", dark: "#4a044e", ldash: "#f0abfc", bbg: "#fae8ff", btxt: "#86198f" },
  red: { accent: "#ef4444", abg: "#fef2f2", atxt: "#991b1b", dark: "#450a0a", ldash: "#fca5a5", bbg: "#fee2e2", btxt: "#991b1b" },
  sky: { accent: "#0ea5e9", abg: "#f0f9ff", atxt: "#0369a1", dark: "#0c4a6e", ldash: "#7dd3fc", bbg: "#e0f2fe", btxt: "#0369a1" },
  rose: { accent: "#f43f5e", abg: "#fff1f2", atxt: "#9f1239", dark: "#4c0519", ldash: "#fda4af", bbg: "#ffe4e6", btxt: "#9f1239" },
  yellow: { accent: "#eab308", abg: "#fefce8", atxt: "#713f12", dark: "#422006", ldash: "#fde047", bbg: "#fef9c3", btxt: "#713f12" },
  amber: { accent: "#f59e0b", abg: "#fffbeb", atxt: "#92400e", dark: "#451a03", ldash: "#fcd34d", bbg: "#fef3c7", btxt: "#92400e" },
  teal: { accent: "#14b8a6", abg: "#f0fdfa", atxt: "#115e59", dark: "#042f2e", ldash: "#5eead4", bbg: "#ccfbf1", btxt: "#115e59" },
  indigo: { accent: "#6366f1", abg: "#eef2ff", atxt: "#3730a3", dark: "#1e1b4b", ldash: "#a5b4fc", bbg: "#e0e7ff", btxt: "#3730a3" },
  purple: { accent: "#a855f7", abg: "#faf5ff", atxt: "#6b21a8", dark: "#3b0764", ldash: "#d8b4fe", bbg: "#f3e8ff", btxt: "#6b21a8" },
  lime: { accent: "#84cc16", abg: "#f7fee7", atxt: "#365314", dark: "#1a2e05", ldash: "#bef264", bbg: "#ecfccb", btxt: "#365314" },
  slate: { accent: "#64748b", abg: "#f8fafc", atxt: "#334155", dark: "#0f172a", ldash: "#94a3b8", bbg: "#f1f5f9", btxt: "#334155" },
};
type C = (typeof CM)[string];

/* ── Helpers ───────────────────────────────────────────────── */
function splitLabel(item: string) {
  const i = item.indexOf(":");
  return i === -1 ? { label: item, detail: "" } : { label: item.slice(0, i).trim(), detail: item.slice(i + 1).trim() };
}

type TopicInfo = {
  title: string;
  description: string;
};

const TOPIC_DEFINITIONS: Record<string, string> = {
  /* === FRONTEND === */
  "Como a Web funciona": "Mostra como o browser pede páginas ao servidor e recebe HTML, CSS e JS pela internet.",
  "Arquitetura do browser": "Explica como o browser processa e mostra a página depois de baixar o código.",
  "HTML semântico": "Usar tags que descrevem o conteúdo, melhorando acessibilidade e SEO.",
  "Acessibilidade inicial": "Fazer o site funcionar bem para teclado, leitores de tela e pessoas com diferentes necessidades.",
  "CSS básico e avançado": "Controlar aparência, layout, cores e estilos de elementos na página.",
  "Layout responsivo": "Fazer a interface se ajustar corretamente em celulares, tablets e computadores.",
  "Fundamentos de tipografia, cores...": "Entender como escolher fontes, contrastes e espaços para uma leitura agradável.",
  "JavaScript básico": "Usar código para tornar a página interativa e responder aos dados do usuário.",
  "DOM e Eventos": "Alterar o conteúdo da página e reagir a cliques, rolagens ou outras ações do usuário.",
  "Assincronicidade": "Trabalhar com processos que acontecem depois, como buscar dados do servidor.",
  "Ferramentas do desenvolvedor": "Usar o painel do browser para inspecionar elementos, ver erros e debugar o app.",
  "Controle de versão": "Guardar o histórico do código e colaborar com Git em equipe.",
  "JavaScript moderno": "Aprender recursos atuais do JS que deixam o código mais claro e confiável.",
  "TypeScript": "Adicionar tipos ao JavaScript para evitar erros antes do app rodar.",
  "Componentes reutilizáveis": "Criar peças de interface que podem ser usadas várias vezes sem repetir código.",
  "Frameworks e bibliotecas": "Usar ferramentas que ajudam a construir aplicações web mais rápido.",
  "Gerenciamento de estado": "Manter os dados do aplicativo organizados enquanto a interface muda.",
  "Estilos em projetos": "Organizar o CSS em aplicações grandes para não perder controle dos estilos.",
  "Consumir APIs": "Pegar dados do servidor e mostrar na interface do usuário.",
  "Testes de frontend": "Verificar automaticamente se a interface e a lógica continuam funcionando.",
  "Performance prática": "Fazer o site carregar rápido e funcionar suave para o usuário.",
  "SEO técnico para SPAs": "Preparar a aplicação para ser bem encontrada pelos motores de busca.",
  "Segurança no frontend": "Proteger o site contra ataques comuns e manter dados seguros.",
  "Boas práticas de acessibilidade": "Garantir que todos possam usar a interface com facilidade.",
  "Experiência cross-browser": "Fazer o site funcionar bem em diferentes navegadores e dispositivos.",
  "Meta-frameworks e SSR/SSG": "Usar ferramentas que geram páginas no servidor para melhorar velocidade e SEO.",
  "Arquitetura de aplicações": "Organizar o código para que o aplicativo cresça sem ficar confuso.",
  "TypeScript avançado": "Usar tipos mais complexos para deixar o código ainda mais seguro.",
  "Performance a nível de aplicação": "Otimizar o aplicativo inteiro com métricas reais e carregamento inteligente.",
  "Progressive Web Apps (PWA)": "Fazer o site funcionar offline e parecer um app no celular.",
  "Gestão avançada de dados": "Manter informações sincronizadas e atualizadas com menos retrabalho.",
  "Microfrontends e deploy independente": "Dividir o app em partes menores que podem ser atualizadas separadamente.",
  "Internacionalização (i18n) e localização (l10n)": "Preparar seu app para diferentes idiomas e formatos regionais.",
  "Animações e motion design": "Adicionar movimento suave que melhora a experiência sem distrair.",
  "Observabilidade no frontend": "Monitorar erros e performance para corrigir problemas rapidamente.",
  "CI/CD para frontend": "Automatizar testes e deploy para publicar atualizações com segurança.",
  "Design systems e componentes acessíveis": "Criar componentes padrão que funcionam bem e são fáceis de usar.",
  "Comunicação em tempo real": "Enviar e receber dados instantaneamente, como chat e notificações ao vivo.",
  "Estratégias de release": "Liberar mudanças aos poucos e poder voltar atrás se aparecer um erro.",

  /* === BACKEND === */
  "Fundamentos de Internet": "Entender TCP/IP, DNS, portas e como computadores falam entre si na rede.",
  "Sistema Operativo e CLI": "Navegar e gerir o Linux profundo, processos, permissões e automaçõespor terminal.",
  "Linguagem Backend Base": "Python, Node.js, Go, Java ou C# - escolha uma e domine.",
  "Protocolo HTTP Explícito": "Entender verbos (GET, POST), status codes (200, 404, 500) e headers.",
  "Fundamentos de Bancos de Dados Relacionais": "Tabelas, chaves estrangeiras, normalização e modelagem de dados.",
  "Linguagem SQL Básica": "Escrever queries CRUD, JOINs e aggregações para ler e manipular dados.",
  "Princípios de APIs REST": "Endpoints baseados em recursos, padrões JSON, versionamento.",
  "Versionamento de Código Real": "Git branches, merge, rebase e resolução de conflitos avançada.",
  "Framework Principal de Web": "Express, Django, Spring Boot, FastAPI ou equivalente na sua linguagem.",
  "Segurança Aplicacional Web": "OWASP Top 10, SQL Injection, XSS, proteção contra ataques.",
  "Autenticação & Autorização": "JWT, OAuth 2.0, roles e permissões para controlar acesso.",
  "Interação com Bancos de Dados (ORMs)": "Usar Prisma, SQLAlchemy ou Entity Framework sem escrever SQL puro.",
  "Bancos de Dados NoSQL": "MongoDB, Redis, Firestore e quando cada um é a escolha certa.",
  "Conceitos ACID": "Atomicidade, Consistência, Isolamento, Durabilidade em transações.",
  "Otimizações Essenciais": "Índices em BD, caching com Redis, queries otimizadas.",
  "Containerização com Docker": "Dockerfile, imagens, containers, Docker Compose para ambientes.",
  "Design de Software": "SOLID, DRY, KISS - princípios para código robusto e mantenível.",
  "Testes de Backend": "Testes unitários, mocks, testes de integração de APIs.",
  "Design de Microserviços": "Serviços independentes, comunicação entre eles, API Gateways.",
  "Filas de Processamento": "RabbitMQ, Kafka, SQS/SNS para tarefas assíncronas pesadas.",
  "Arquitetura Baseada em Eventos": "Event sourcing, publicação-subscrição para sistemas desacoplados.",
  "Otimização de Bancos de Dados": "Particionamento (Sharding), replicação, read replicas.",
  "Escalabilidade e Load Balancing": "Nginx como proxy reverso, horizontal vs vertical scaling.",
  "Engenharia de Cloud": "AWS (EC2, RDS, S3), Google Cloud ou Azure para infraestrutura.",
  "Observabilidade e Monitoring": "Logs centralizados, métricas, alertas com Prometheus/Grafana.",
  "CI/CD Avançado": "Jenkins ou GitHub Actions para testar e deployar automaticamente.",
  "Kubernetes Básico": "Pods, Deployments, Services para orquestrar containers.",
  "Segurança Avançada": "Rate limiting, proteção DDoS, secrets seguros.",

  /* === FULL-STACK === */
  "Trindade Frontend": "HTML5, CSS3 e JavaScript manipulação de DOM essencial.",
  "Primeiros Passos Backend": "Servidor básico local, rotas simples, respostas JSON.",
  "Bases de Dados Iniciais": "Instalação de PostgreSQL/MySQL, criação de tabelas, operações básicas.",
  "O Fluxo Completo": "Fazer o frontend comunicar com backend que lê dados reais da BD.",
  "Princípios REST Simples": "Endpoints CRUD bem estruturados (GET, POST, PUT, DELETE).",
  "Gerenciadores de Pacotes": "NPM/Yarn no servidor e no cliente, gestão de dependências.",
  "Framework Frontend Profissional": "React com Hooks, Context API e padrões modernos.",
  "Autenticação Ponto-a-Ponto": "JWT ou sessions, implementação completa do login.",
  "Integração com ORMs": "Prisma ou TypeORM para abstrair SQL.",
  "Validação de Dados": "Zod ou Joi para validar dados no servidor e feedback no cliente.",
  "Estilização Avançada": "TailwindCSS e bibliotecas de componentes como shadcn/ui.",
  "Adoção de Tipagem": "TypeScript em front e back, tipos partilhados.",
  "Integração com Serviços Externos": "Stripe, SendGrid, AWS S3 para funcionalidades de negócio.",
  "Segurança Cruzada": "CORS, CSRF, headers de segurança.",
  "Gestão de Caching": "React Query para sincronização e cache de dados.",
  "Basic Deployments": "Render, Railway ou Vercel para colocar o app online.",
  "Frameworks Full-Stack Modernos": "Next.js ou Remix para juntar tudo elegantemente.",
  "Estratégias de Renderização": "SSR, SSG, ISR para diferentes tipos de conteúdo.",
  "Monorepos Modernos": "Turborepo para pacotes partilhados e coordenação.",
  "Docker Prático": "Dockerfile Multistage, Docker Compose com BD local.",
  "WebSockets e Tempo Real": "Socket.io ou Server-Sent Events para chat e notificações ao vivo.",
  "Serverless Architecture": "AWS Lambda ou Vercel Serverless Functions.",
  "Bancos de Dados Avançado": "Redis para cache de sessões e filas de trabalho.",
  "Pipelines CI/CD Robustos": "GitHub Actions para testar e deployar automaticamente.",
  "Otimizações Finais": "CDN, load balancing, monitorização ponta-a-ponta.",
  "Testes Integrados E2E": "Cypress ou Playwright para testar o app completo.",

  /* === MOBILE === */
  "Escolha de Base e Setup": "React Native, Flutter ou Nativo - configuração inicial e ambiente.",
  "Entender o Ciclo de Vida": "Estados de app: Background, Foreground, Active, Inactive.",
  "Construção da UI Base": "Views, Textos, Imagens, Layouts com Flexbox.",
  "Interatividade e Feedback Tátil": "Toques, gestos (swipe, pan), teclado virtual.",
  "Estilização Mobile": "Adaptação a diferentes tamanhos de tela, dark mode.",
  "Listas Desenháveis": "FlatList, RecyclerView para renderizar milhares de itens.",
  "Navegação Móvel": "Stacks, Tabs, Modais e Drawers entre telas.",
  "Integração com APIs": "Fetch e promises, loading states e spinners.",
  "Armazenamento Local": "AsyncStorage, SQLite para dados offline.",
  "Sincronização Offline": "Cache com fallback quando WiFi cai.",
  "Gestão de Estado": "Redux, Context API ou Zustand no mobile.",
  "Deep Linking": "Navegar profundamente no app a partir de URLs externas.",
  "Acesso Nativo (Sensores)": "Permissões, câmera, localização GPS.",
  "Animações a 60fps": "Reanimated (React Native), Lottie ou equivalentes.",
  "Performance de Renderização": "Identificar UI bloqueante, profiling.",
  "Testes em Mobile": "Jest, Detox ou Appium.",
  "Notificações Locais": "Agendadas pelo app, sem servidor.",
  "Código Nativo Cru": "Bridges para funcionalidades ausentes em JS.",
  "Push Notifications": "FCM para Android, APNs para iOS.",
  "Deep Linking Universal": "App Links / Universal Links.",
  "In-App Purchases": "RevenueCat, gestão de subscrições.",
  "Segurança Total": "Keychain, Keystore, proteção contra engenharia reversa.",
  "Integração Nativa": "Siri Shortcuts, Apple Watch, Widgets.",
  "CI/CD para Mobile": "Fastlane para automação de builds e deploy.",
  "Monitorização": "Sentry, Crashlytics, analytics sem bloquear UI.",
  "Over The Air Updates": "CodePush para atualizar sem revisão da store.",

  /* === DEVOPS === */
  "Gestão Avançada de Linux": "Processos, permissões, cronjobs, systemd.",
  "Shell Scripting": "Bash/Zsh para automação, Sed, Awk.",
  "Fundamentos de Redes": "DNS, TCP/UDP, subnets, NAT, VPN.",
  "Versionamento Avançado de Git": "Rebase, cherry-pick, resolução de conflitos.",
  "Linguagem de Automação": "Python para scripts de infraestrutura, Boto3.",
  "Servidores Web & Proxies": "Nginx e Apache, Virtual Hosts, SSL com Certbot.",
  "Monitorização Básica": "htop, netstat, df, systemctl status.",
  "Containerização Avançada": "Docker com imagens otimizadas, multi-stage builds.",
  "Docker Compose": "Orquestração local com volumes e redes.",
  "CI/CD Profissional": "GitHub Actions, GitLab CI ou Jenkins.",
  "Cloud Computing": "AWS (EC2, RDS, S3), Azure ou Google Cloud.",
  "Gestão de Secrets": "AWS Secrets Manager, Vault para configurações sensíveis.",
  "Web Servers Avançados": "Nginx com load balancing L7, caching, rate limiting.",
  "Infraestrutura Como Código (IaC)": "Terraform state, providers, modules.",
  "Gestão de Configuração": "Ansible playbooks, Puppet, Chef.",
  "Kubernetes Profundo": "Pods, Deployments, StatefulSets, Ingress Controllers.",
  "Helm Charts": "Criação e deployment de applications no K8s.",
  "GitOps": "ArgoCD ou FluxCD para sincronizar Git ao Kubernetes.",
  "Service Mesh": "Istio ou Linkerd para tráfego seguro entre microserviços.",
  "Observabilidade Completa": "Métricas (Prometheus), Logs (ELK), Traces (Jaeger).",
  "Dashboarding e Alertas": "Grafana, alertas via PagerDuty/Slack.",
  "DevSecOps": "SonarQube, Trivy, Snyk para segurança contínua.",
  "Engenharia do Caos": "Testar falhas intencionais de sistema.",
  "FinOps": "Otimizar custos de cloud, instâncias Spot.",

  /* === DATA SCIENCE === */
  "Python Numérico": "Ambientes virtuais, versões de pacotes.",
  "Estatística Descritiva": "Médias, variância, desvio padrão, distribuições.",
  "Álgebra Linear": "Vetores, matrizes, autovalores em contexto prático.",
  "NumPy Profundo": "Arrays multidimensionais, broadcasting.",
  "Pandas Rainha": "DataFrames, filtros, groupby, merge, limpeza de dados.",
  "Visualização Gráfica": "Matplotlib, Seaborn para explorar dados.",
  "SQL Prático": "Queries para extrair blocos de dados de bases.",
  "Data Cleaning": "Missing values, outliers, duplicados tratados.",
  "Scikit-Learn Base": "Algoritmos clássicos otimizados.",
  "Aprendizado Supervisionado": "Linear/Logistic Regression, Árvores, Random Forest.",
  "Aprendizado Não Supervisionado": "Clustering (K-Means, DBSCAN), PCA.",
  "Métricas de Avaliação": "Acurácia, Precisão, Recall, F1-Score, ROC/AUC.",
  "Engenharia de Features": "One Hot Encoding, Scaling, Normalization.",
  "Overfitting e Validação": "Cross-Validation, Regularização (Lasso, Ridge).",
  "Gradient Boosting": "XGBoost, LightGBM para competições.",
  "NLP Clássico": "NLTK, Spacy, Bag of Words, TF-IDF.",
  "Dashboarding Ágil": "Streamlit ou Dash para apresentar modelos.",
  "Fundamentos Deep Learning": "Camadas, Backpropagation, funções de ativação.",
  "PyTorch Profundo": "Tensores, Autograd, DataLoaders.",
  "CNNs": "Visão Computacional, processamento de imagens.",
  "RNNs/LSTMs": "Séries temporais, texto sequencial.",
  "Transformers": "BERT, GPT, finetuning de LLMs.",
  "MLOps Básicos": "Exportação de modelos, MLflow tracking.",
  "PySpark": "Big Data, clusters distribuídos, ETLs.",
  "Deploy em API": "FastAPI para expor modelos em produção.",
  "GPU Computing": "CUDA para hardware acelerado.",

  /* === UI/UX === */
  "Ferramenta Rainha": "Figma avançado: componentes, constraints, variáveis.",
  "UX Foundation": "UX vs UI, User-Centered Design, empatia.",
  "Princípios Visuais": "Alinhamento, contraste, repetição, proximidade.",
  "Domínio Tipográfico": "Serif vs Sans, hierarquia, line heights.",
  "Ciência da Cor": "Psicologia de cores, roda de cores, acessibilidade.",
  "Grids e Espaçamentos": "Sistema base-8/base-4 para layouts previsíveis.",
  "Arquitetura de Informação": "Sitemaps, hierarquia visual, padrões Z e F.",
  "Wireframing": "Sketches analógicos, Whimsical, Balsamiq.",
  "Auto Layout": "Figma componentes profundos com constraints.",
  "Prototipagem Táctil": "Fluxos, Smart Animate, scroll behaviours.",
  "Design Systems": "Variables/Tokens, estilos globais partilhados.",
  "UX Research Efetivo": "User Personas, JTBD, questionários.",
  "Avaliação Heurística": "10 Princípios de Usabilidade de Nielsen.",
  "Acessibilidade Universal": "Contraste de textos, simulação daltonismo, touch targets.",
  "User Journey": "Mapeamento emocional do fluxo A para B.",
  "Atomic Design": "Átomos, moléculas, organismos, templates.",
  "Variantes Complexas": "Figma component properties avançadas.",
  "Testes de Usabilidade": "Testes moderados com utilizadores reais.",
  "Micro-interações": "Lottie animations, easing, timing.",
  "WCAG 2.1 Compliance": "Nível AA para acessibilidade absoluta.",
  "Design Handoff": "Specs claros, Zeplin para comunicar com dev.",
  "Métricas UX": "SUS, NPS, task success rate, time-on-task.",
  "Design Operations": "Gestão de bibliotecas multi-equipa.",
  "UX Writing": "Microcópios, tons de voz únicos.",
  "Noções de Frontend": "Document flow, CSS Flexbox limitações.",
};

function getTopicInfo(item: string): TopicInfo {
  const { label, detail } = splitLabel(item);
  return {
    title: label,
    description: TOPIC_DEFINITIONS[label] ?? (detail ? `Este assunto inclui: ${detail}.` : "Clique para ver uma explicação simples deste conceito."),
  };
}

function dotColor(rank: number) {
  if (rank === 0) return "#22c55e";
  if (rank === 1) return "#facc15";
  return "#9ca3af";
}

/* ── Node box (yellow) ─────────────────────────────────────── */
function Node({ item, c, rank = 2 }: { item: string; c: C; rank?: number }) {
  const { label, detail } = splitLabel(item);
  return (
    <div className="group relative w-full text-left">
      <div
        style={{ background: "#fef9c3", color: "#713f12", borderColor: c.accent }}
        className="border rounded px-2.5 py-1.5 text-[11px] font-semibold flex items-start gap-1.5 hover:shadow-md transition-shadow cursor-pointer"
      >
        <span style={{ background: dotColor(rank) }} className="w-2 h-2 rounded-full shrink-0 mt-0.5" />
        <span className="leading-snug">{label}</span>
      </div>
      {detail && (
        <div className="pointer-events-none absolute bottom-full left-0 mb-1 z-50 hidden group-hover:block bg-zinc-800 text-white text-[10px] rounded p-2 shadow-xl w-52 whitespace-normal">
          {detail}
        </div>
      )}
    </div>
  );
}

/* ── Vertical connector ────────────────────────────────────── */
function VLine({ c, h = 28 }: { c: C; h?: number }) {
  return <div style={{ background: c.ldash, height: h }} className="w-px mx-auto opacity-70" />;
}

/* ── Phase Block ───────────────────────────────────────────── */
function Phase({
  stage, label, Icon, c, isLast,
}: {
  stage: { title: string; description: string; items: string[] };
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  c: C;
  isLast: boolean;
}) {
  const left = stage.items.filter((_, i) => i % 2 === 0);
  const right = stage.items.filter((_, i) => i % 2 !== 0);
  const total = stage.items.length;

  function rank(realIdx: number) {
    const r = realIdx / total;
    return r < 0.4 ? 0 : r < 0.75 ? 1 : 2;
  }

  /* Centro da fase */
  const Center = (
    <div className="flex flex-col items-center gap-1.5 py-2 w-full md:w-[200px] shrink-0">
      <div
        style={{ background: c.dark, color: "#fff" }}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded font-bold text-xs shadow-lg uppercase">
        {label}
      </div>
      <div
        style={{ background: c.abg, color: c.atxt, borderColor: c.accent }}
        className="w-full border rounded text-center px-2 py-1.5 text-[10px] font-bold leading-tight"
      >
        {stage.title}
      </div>
      <p className="text-center text-zinc-400 text-[9px] italic leading-tight px-1">{stage.description}</p>
    </div>
  );

  return (
    <>
      <VLine c={c} />

      {/* MOBILE: lista vertical simples */}
      <div className="md:hidden w-full">
        {Center}
        <div className="mt-3 flex flex-col gap-2 px-2">
          {stage.items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <Node item={item} c={c} rank={rank(i)} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: layout 3 colunas */}
      <div className="hidden md:grid items-center" style={{ gridTemplateColumns: "1fr 200px 1fr", gap: "0 16px" }}>
        {/* LEFT */}
        <div className="flex flex-col items-end gap-2">
          {left.map((item, i) => (
            <div key={i} className="flex items-center">
              <Node item={item} c={c} rank={rank(i * 2)} />
              <div style={{ borderColor: c.ldash, width: 24 }} className="border-t-2 border-dashed shrink-0" />
            </div>
          ))}
        </div>
        {Center}
        {/* RIGHT */}
        <div className="flex flex-col items-start gap-2">
          {right.map((item, i) => (
            <div key={i} className="flex items-center">
              <div style={{ borderColor: c.ldash, width: 24 }} className="border-t-2 border-dashed shrink-0" />
              <Node item={item} c={c} rank={rank(i * 2 + 1)} />
            </div>
          ))}
        </div>
      </div>

      {!isLast && <VLine c={c} />}
    </>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */

export default function StudyPlanDetailsPage() {
  const params = useParams();
  const planId = params?.planId as string;
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [projectLevel, setProjectLevel] = useState<"junior" | "pleno" | "senior">("junior");
  const [videoLevel, setVideoLevel] = useState<"junior" | "pleno" | "senior">("junior");
  const [videoCarouselIndex, setVideoCarouselIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [materialLevel, setMaterialLevel] = useState<"junior" | "pleno" | "senior">("junior");
  const [materialCarouselIndex, setMaterialCarouselIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLevelChange = (level: "junior" | "pleno" | "senior") => {
    setProjectLevel(level);
    setShowAllProjects(false);
  };

  const handleVideoLevelChange = (level: "junior" | "pleno" | "senior") => {
    setVideoLevel(level);
    setVideoCarouselIndex(0);
  };

  const handleMaterialLevelChange = (level: "junior" | "pleno" | "senior") => {
    setMaterialLevel(level);
    setMaterialCarouselIndex(0);
  };

  const handleVideoClick = (video: VideoLesson) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const getYouTubeEmbedId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };



  useEffect(() => {
    const found = STUDY_PLANS.find((p) => p.id === planId);
    if (found) setPlan(found);
  }, [planId]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!plan && typeof window !== "undefined") {
    if (!STUDY_PLANS.some((p) => p.id === planId)) return notFound();
  }

  if (!plan) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  const c = CM[plan.color] ?? CM.blue;
  const idx = STUDY_PLANS.findIndex((p) => p.id === plan.id);
  const related = [1, 2, 3].map((offset) => STUDY_PLANS[(idx + offset) % STUDY_PLANS.length]);

  const planProjects = ROADMAP_PROJECTS[plan.id as keyof typeof ROADMAP_PROJECTS];

  const phases = [
    { key: "beginner" as const, label: "Júnior", Icon: Star },
    { key: "intermediate" as const, label: "Pleno", Icon: Zap },
    { key: "advanced" as const, label: "Sénior", Icon: Trophy },
  ];



  const allTools = [
    ...plan.tools.languages.map((t) => ({ t, type: 0 })),
    ...plan.tools.frameworks.map((t) => ({ t, type: 1 })),
    ...plan.tools.tools.map((t) => ({ t, type: 2 })),
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-zinc-900">
        

        {/* ── HERO com imagem de fundo ─────────────────── */}
        <div className="relative w-full h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/images-cursos.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent z-10" />

          <div className="relative z-20 max-w-5xl mx-auto px-6 py-12 flex flex-col justify-center h-full">
            <Link href="/roadmaps">
              <Button variant="ghost" className="mb-6 text-zinc-100 hover:text-white pl-0 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
              <div
                style={{ backgroundColor: c.accent + "22", borderColor: c.accent }}
                className="p-4 rounded-xl border-2 shrink-0"
              >
                <plan.icon style={{ color: c.accent }} className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <p style={{ color: c.accent }} className="text-xs font-bold uppercase tracking-widest">Roadmap</p>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white">{plan.role}</h1>
                <p className="text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl leading-relaxed">{plan.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ / Description ──────────────────────────── */}
        <div className="bg-zinc-50 mt-4">
          <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-800 mb-3">{plan.role} – Guia de Carreira</h2>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {plan.description} Este roadmap foi criado para guiar qualquer pessoa interessada nesta área,
                desde o início até um nível sénior, cobrindo as principais tecnologias, ferramentas e competências
                exigidas pelo mercado angolano e internacional.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {(plan.faq || [
                {
                  q: `O que faz um ${plan.role}?`,
                  a: plan.responsibilities.slice(0, 2).join(". ") + ".",
                },
                {
                  q: `Quanto tempo leva para me tornar um ${plan.role}?`,
                  a: "Com dedicação diária de 2–4h, a maioria dos estudantes atinge um nível competitivo em 6 a 18 meses.",
                },
                {
                  q: "Devo aprender tudo neste roadmap?",
                  a: "Não necessariamente. Pontos verdes são recomendados, amarelos são alternativas, cinzentos são opcionais.",
                },
                {
                  q: `Esta carreira tem futuro em Angola?`,
                  a: `Sim — Angola está a crescer rapidamente no setor tech e profissionais de ${plan.role.toLowerCase()} são muito procurados.`,
                },
              ]).map((faq, i) => (
                <div key={i} style={{ borderLeftColor: c.accent }} className="border-l-4 pl-4">
                  <p className="text-sm font-bold text-zinc-700 mb-1">{faq.q}</p>
                  <p className="text-sm text-zinc-500">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Legend bar ─────────────────────────────────── */}
        <div className="border-b bg-zinc-50 px-6 py-3">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {[
                { bg: "#22c55e", label: "Recomendação Pessoal / Escolha Top" },
                { bg: "#facc15", label: "Opção Alternativa / Escolha Possível" },
                { bg: "#9ca3af", label: "Ordem não Estrita / Aprender quando puder" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-zinc-600">
                  <span style={{ background: item.bg }} className="w-2.5 h-2.5 rounded-full shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Diagram ────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-6 overflow-x-auto">
          <h1 className="text-center text-3xl font-bold text-zinc-800 mb-8 tracking-tight">{plan.role}</h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT: Prerequisites panel */}
            <div className="w-full md:w-56 shrink-0 space-y-2.5 pt-2">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Antes de começar</p>
              {plan.prerequisites.knowledge.map((k, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div style={{ background: "#fef9c3", borderColor: c.accent, color: "#713f12" }} className="border rounded px-2.5 py-1.5 text-[11px] font-semibold w-full">
                    {k}
                  </div>
                </div>
              ))}
              {plan.prerequisites.softSkills.map((s, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                  <div className="border border-zinc-200 rounded px-2.5 py-1.5 text-[11px] font-medium text-zinc-600 bg-zinc-50 w-full">
                    {s}
                  </div>
                </div>
              ))}

              {/* Complementary Recommendations */}
              {plan.prerequisites.complementary && plan.prerequisites.complementary.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-200">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Recomendações Complementares</p>
                  {plan.prerequisites.complementary.map((comp, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-2">
                      <div style={{ borderColor: c.ldash, backgroundColor: c.abg, color: c.atxt }} className="border rounded px-2.5 py-1.5 text-[11px] font-medium w-full leading-snug">
                        {comp}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Responsibilities */}
              <div className="mt-6 pt-4 border-t border-zinc-200">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Responsabilidades</p>
                {plan.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-1.5 mb-2">
                    <ChevronRight style={{ color: c.accent }} className="w-3 h-3 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-zinc-600 leading-snug">{r}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Main flowchart */}
            <div className="flex-1 flex flex-col items-center">
              {/* Root node */}
              <div style={{ background: c.dark, color: "#fff" }} className="flex items-center gap-2.5 px-7 py-3 rounded font-bold text-base shadow-xl">
                <plan.icon className="w-5 h-5" />
                {plan.role}
              </div>

              {/* Phase blocks */}
              {phases.map((ph, i) => (
                <Phase
                  key={ph.key}
                  stage={plan.stages[ph.key]}
                  label={ph.label}
                  Icon={ph.Icon}
                  c={c}
                  isLast={i === phases.length - 1}
                />
              ))}

              {/* End node */}
              <VLine c={c} />
              <VLine c={c} /> 
              
            </div>
          </div>



          {/* Tools and Projects Side by Side - Full Width */}
          <div className="mt-12 w-full border-t pt-12 flex flex-col lg:flex-row gap-16 lg:gap-12">
                
                {/* 1. Tools */}
                <div className="flex-1">
                  <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    Ferramentas &amp; Tecnologias
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                    {allTools.map(({ t, type }, i) => (
                      <div
                        key={i}
                        style={{ background: "#fef9c3", borderColor: c.accent, color: "#713f12" }}
                        className="border rounded px-2.5 py-1.5 text-[11px] font-semibold flex items-center gap-1.5"
                      >
                        <span
                          style={{ background: type === 0 ? "#22c55e" : type === 1 ? "#facc15" : "#9ca3af" }}
                          className="w-2 h-2 rounded-full shrink-0"
                        />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Practical Projects */}
                {planProjects && (
                  <div className="flex-1 relative xl:border-l xl:border-zinc-200 xl:pl-8">
                    {/* Header + Level Tabs in one line */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4 items-center">
                      <div className="text-center">
                        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-400 mb-1 font-bold uppercase">
                          Projectos Práticos
                        </h2>
                        <p className="text-xs text-zinc-500">
                          Desafios sugeridos para consolidar habilidades.
                        </p>
                      </div>

                      <div className="inline-flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 self-center justify-center">
                        <button
                          onClick={() => handleLevelChange("junior")}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                            projectLevel === "junior" 
                              ? "bg-white text-zinc-900 shadow-sm" 
                              : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                          }`}
                        >
                          Júnior
                        </button>
                        <button
                          onClick={() => handleLevelChange("pleno")}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                            projectLevel === "pleno" 
                              ? "bg-white text-zinc-900 shadow-sm" 
                              : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                          }`}
                        >
                          Pleno
                        </button>
                        <button
                          onClick={() => handleLevelChange("senior")}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                            projectLevel === "senior" 
                              ? "bg-white text-zinc-900 shadow-sm" 
                              : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
                          }`}>
                          Sénior
                        </button>
                      </div>
                    </div>

                    {/* Grid of Projects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(showAllProjects 
                        ? planProjects[projectLevel] 
                        : planProjects[projectLevel].slice(0, 4)
                      ).map((proj, idx) => (
                        <div 
                          key={idx} 
                          className="group relative flex items-center justify-between bg-[#101623] hover:bg-[#1a2336] rounded-xl px-5 py-4 border border-[#222f46] transition-colors cursor-pointer"
                        >
                          <span className="text-[14px] font-medium text-slate-300 group-hover:text-white truncate pr-3">
                            {proj.title}
                          </span>
                          <Bookmark className="w-[18px] h-[18px] text-slate-500 shrink-0 group-hover:text-blue-400 transition-colors" />

                          {/* Tooltip ao Hover */}
                          <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 hidden group-hover:flex flex-col bg-zinc-800 text-zinc-300 text-[11px] rounded-lg p-3.5 shadow-xl w-[280px] border border-zinc-700/60 leading-relaxed cursor-default">
                            {/* Setinha apontando para baixo */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-800 border-b border-r border-zinc-700/60 rotate-45" />
                            
                            <p className="font-bold text-white text-xs mb-1.5">{proj.title}</p>
                            <p className="mb-2.5">{proj.description}</p>
                            
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                              {proj.techStack.map((tech, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-zinc-900/50 border border-zinc-700 text-[9px] text-zinc-100 rounded-md font-semibold tracking-wide">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {planProjects[projectLevel].length > 4 && (
                      <div className="mt-6 flex justify-center">
                        <button 
                          onClick={() => setShowAllProjects(!showAllProjects)}
                          className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition-colors px-4 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm"
                        >
                          {showAllProjects ? "Ver menos projectos" : "Ver todos os projectos"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

          {/* Video Lessons Section */}
          <div className="mt-16 bg-zinc-50">
              <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-center mb-8 gap-4 text-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl text-zinc-800 mb-2 uppercase">Cursos recomendados</h2>
                    <p className="text-sm text-zinc-600">Selecione seu nível e assista aulas de especialistas</p>
                  </div>

                  {/* Filtro de Nível */}
                  <div className="inline-flex justify-center items-center bg-white p-0.5 rounded-lg border border-zinc-200 shadow-sm">
                    <button
                      onClick={() => handleVideoLevelChange("junior")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        videoLevel === "junior" 
                          ? "bg-zinc-900 text-white" 
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      Júnior
                    </button>
                    <button
                      onClick={() => handleVideoLevelChange("pleno")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        videoLevel === "pleno" 
                          ? "bg-zinc-900 text-white" 
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      Pleno
                    </button>
                    <button
                      onClick={() => handleVideoLevelChange("senior")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        videoLevel === "senior" 
                          ? "bg-zinc-900 text-white" 
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      Sénior
                    </button>
                  </div>
                </div>

                {/* Carousel de Vídeos */}
                {(() => {
                  const videos = getVideosByRoadmapAndLevel(planId, videoLevel);
                  if (!videos.length) return <p className="text-center text-zinc-600 py-8">Nenhum vídeo disponível para este nível.</p>;

                  const visibleVideos = isMobile ? 1 : 3;
                  const maxPages = Math.ceil(videos.length / visibleVideos);
                  const currentPage = Math.min(videoCarouselIndex, maxPages - 1);
                  const safeIndex = currentPage * visibleVideos;

                  return (
                    <div className="relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-hidden transition-all duration-500 ease-in-out">
                        {videos.slice(safeIndex, safeIndex + visibleVideos).map((video, idx) => (
                          <div
                            key={video.id}
                            onClick={() => handleVideoClick(video)}
                            className="group rounded overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                            style={{
                              animationDelay: `${idx * 50}ms`,
                              animationFillMode: 'both'
                            }}
                          >
                            <div className="relative h-0 pb-[56.25%] overflow-hidden bg-zinc-900">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent transition" />

                              <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                                <span className="rounded bg-white/30 px-3 py-0.5 text-[11px] font-semibold text-zinc-900">{video.duration}</span>
                                <span className="rounded bg-indigo-600/40 px-3 py-0.5 text-[11px] font-semibold text-white">Assistir</span>
                              </div>

                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-14 h-14 rounded-full bg-white/85 flex items-center justify-center shadow-lg">
                                  <svg className="w-6 h-6 text-zinc-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-zinc-50">
                              <p className="text-xs text-zinc-500 font-semibold mb-2">{video.channel || "Tech Channel"}</p>
                              <h3 className="text-sm uppercase text-zinc-900 line-clamp-2 group-hover:text-zinc-700 mb-1">
                                {video.title}
                              </h3>
                              <p className="text-xs text-zinc-600 line-clamp-2 group-hover:text-zinc-700">
                                {video.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Controles de Carousel */}
                      {videos.length > visibleVideos && (
                        <div className="flex items-center justify-between mt-6 sm:mt-8">
                          <button
                            onClick={() => setVideoCarouselIndex(Math.max(0, currentPage - 1))}
                            disabled={currentPage === 0}
                            className="p-2 sm:p-2.5 rounded-full border border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200 hover:shadow-md"
                            aria-label="Slide anterior"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                            </svg>
                          </button>

                          <div className="flex gap-1.5 sm:gap-2 items-center px-2">
                            {Array.from({ length: maxPages }).map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setVideoCarouselIndex(i)}
                                className={`rounded-full transition-all duration-400 ease-out ${
                                  currentPage === i 
                                    ? "bg-zinc-700 w-6 h-2 sm:w-8 sm:h-2.5" 
                                    : "bg-zinc-300 w-2 h-2 hover:bg-zinc-500"
                                }`}
                                aria-label={`Ir para slide ${i + 1}`}
                                aria-current={currentPage === i}
                              />
                            ))}
                          </div>

                          <button
                            onClick={() => setVideoCarouselIndex(Math.min(maxPages - 1, currentPage + 1))}
                            disabled={currentPage === maxPages - 1}
                            className="p-2 sm:p-2.5 rounded-full border border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200 hover:shadow-md"
                            aria-label="Próximo slide"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

          {/* Continue Learning */}
          <div className="mt-16 w-full text-center border-t border-zinc-100 pt-10">
            <p className="text-sm font-semibold text-zinc-600 mb-4 uppercase">Continua aprendendo com outras trilhas relacionadas</p>
            <div className="flex flex-wrap justify-center gap-3">
              {related.map((rp) => {
                const rc = CM[rp.color] ?? CM.blue;
                return (
                  <Link key={rp.id} href={`/roadmaps/plan/${rp.id}`}>
                    <div
                      style={{ background: rc.dark, color: "#fff" }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <rp.icon className="w-3.5 h-3.5" />
                      {rp.role}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {isVideoModalOpen && selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.35)]">
              <button
                type="button"
                onClick={closeVideoModal}
                className="absolute top-3 right-3 z-20 rounded-full bg-white p-2 text-zinc-700 shadow-sm hover:bg-zinc-100"
                aria-label="Fechar modal"
              >
                ✕
              </button>

              <div className="relative pb-[56.25%] h-0 bg-zinc-900">
                {getYouTubeEmbedId(selectedVideo.youtubeUrl) ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${getYouTubeEmbedId(selectedVideo.youtubeUrl)}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-red-600 font-semibold">
                    URL de vídeo inválida.
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2 leading-tight">{selectedVideo.title}</h3>
                <p className="text-sm text-zinc-500 mb-4">{selectedVideo.description}</p>
                <div className="flex items-center justify-between gap-2 border-y border-zinc-100 py-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Canal: {selectedVideo.channel || 'Tech Channel'}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Duração: {selectedVideo.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={closeVideoModal}
                  className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition"
                >
                  voltar ao roadmap
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
}
