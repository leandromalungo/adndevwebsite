export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  downloadUrl: string;
  fileSize: string;
  pages: number;
  level: "junior" | "pleno" | "senior";
  roadmapId: string;
  type: "pdf" | "ebook" | "guide" | "cheatsheet";
  author?: string;
}

export const STUDY_MATERIALS: StudyMaterial[] = [
  // Frontend - Júnior
  {
    id: "fe-junior-pdf-1",
    title: "Guia Completo de HTML5",
    description: "Apostila completa sobre HTML5 semântico, formulários e acessibilidade.",
    downloadUrl: "/materials/html5-guide.pdf",
    fileSize: "2.4 MB",
    pages: 45,
    level: "junior",
    roadmapId: "frontend",
    type: "guide",
    author: "ADN Developer"
  },
  {
    id: "fe-junior-pdf-2",
    title: "CSS3 Master Class",
    description: "Ebook completo sobre CSS3, Flexbox, Grid e animações modernas.",
    downloadUrl: "/materials/css3-master.pdf",
    fileSize: "3.8 MB",
    pages: 78,
    level: "junior",
    roadmapId: "frontend",
    type: "ebook",
    author: "Web Design Academy"
  },
  {
    id: "fe-junior-pdf-3",
    title: "JavaScript Fundamentals",
    description: "Apostila essencial sobre conceitos fundamentais de JavaScript.",
    downloadUrl: "/materials/js-fundamentals.pdf",
    fileSize: "1.9 MB",
    pages: 52,
    level: "junior",
    roadmapId: "frontend",
    type: "guide",
    author: "JS Masters"
  },
  {
    id: "fe-junior-pdf-4",
    title: "Cheat Sheet - HTML & CSS",
    description: "Folha de referência rápida com propriedades essenciais.",
    downloadUrl: "/materials/html-css-cheat.pdf",
    fileSize: "0.8 MB",
    pages: 12,
    level: "junior",
    roadmapId: "frontend",
    type: "cheatsheet",
    author: "Dev Quick Reference"
  },

  // Frontend - Pleno
  {
    id: "fe-pleno-pdf-1",
    title: "React.js - Do Zero ao Profissional",
    description: "Ebook completo sobre React, hooks, context e melhores práticas.",
    downloadUrl: "/materials/react-complete.pdf",
    fileSize: "5.2 MB",
    pages: 124,
    level: "pleno",
    roadmapId: "frontend",
    type: "ebook",
    author: "React Academy"
  },
  {
    id: "fe-pleno-pdf-2",
    title: "Next.js 14 - Guia Avançado",
    description: "Apostila sobre SSR, SSG, API Routes e otimização de performance.",
    downloadUrl: "/materials/nextjs-advanced.pdf",
    fileSize: "4.1 MB",
    pages: 89,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "Next.js Experts"
  },
  {
    id: "fe-pleno-pdf-3",
    title: "TypeScript para React",
    description: "Guia completo de TypeScript aplicado ao desenvolvimento React.",
    downloadUrl: "/materials/ts-react.pdf",
    fileSize: "3.5 MB",
    pages: 67,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "TypeScript Pro"
  },
  {
    id: "fe-pleno-pdf-4",
    title: "Testing React - Jest & RTL",
    description: "Apostila sobre testes unitários e de integração em React.",
    downloadUrl: "/materials/react-testing.pdf",
    fileSize: "2.7 MB",
    pages: 43,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "Testing Library"
  },

  // Frontend - Sênior
  {
    id: "fe-senior-pdf-1",
    title: "Arquitetura Frontend Escalável",
    description: "Ebook sobre design de sistemas frontend grandes e complexos.",
    downloadUrl: "/materials/frontend-architecture.pdf",
    fileSize: "6.8 MB",
    pages: 156,
    level: "senior",
    roadmapId: "frontend",
    type: "ebook",
    author: "Architecture Masters"
  },
  {
    id: "fe-senior-pdf-2",
    title: "Performance Web - Core Web Vitals",
    description: "Guia avançado de otimização de performance e métricas web.",
    downloadUrl: "/materials/web-performance.pdf",
    fileSize: "4.9 MB",
    pages: 98,
    level: "senior",
    roadmapId: "frontend",
    type: "guide",
    author: "Google Web Dev"
  },
  {
    id: "fe-senior-pdf-3",
    title: "Acessibilidade Web (WCAG 2.1)",
    description: "Apostila completa sobre acessibilidade web e compliance.",
    downloadUrl: "/materials/web-accessibility.pdf",
    fileSize: "5.4 MB",
    pages: 112,
    level: "senior",
    roadmapId: "frontend",
    type: "guide",
    author: "A11y Experts"
  },
  {
    id: "fe-senior-pdf-4",
    title: "Microfrontends - Arquitetura Moderna",
    description: "Ebook sobre microfrontends, module federation e deploy independente.",
    downloadUrl: "/materials/microfrontends.pdf",
    fileSize: "4.2 MB",
    pages: 84,
    level: "senior",
    roadmapId: "frontend",
    type: "ebook",
    author: "Microservices Pro"
  },

  // Backend - Júnior
  {
    id: "be-junior-pdf-1",
    title: "Node.js Fundamentals",
    description: "Apostila completa sobre Node.js, módulos e APIs básicas.",
    downloadUrl: "/materials/nodejs-fundamentals.pdf",
    fileSize: "2.8 MB",
    pages: 56,
    level: "junior",
    roadmapId: "backend",
    type: "guide",
    author: "Node School"
  },
  {
    id: "be-junior-pdf-2",
    title: "Express.js - APIs REST",
    description: "Guia prático para criar APIs REST com Express.js.",
    downloadUrl: "/materials/express-rest.pdf",
    fileSize: "3.2 MB",
    pages: 68,
    level: "junior",
    roadmapId: "backend",
    type: "guide",
    author: "Express Academy"
  },
  {
    id: "be-junior-pdf-3",
    title: "MongoDB Essentials",
    description: "Ebook sobre MongoDB, queries e operações CRUD.",
    downloadUrl: "/materials/mongodb-essentials.pdf",
    fileSize: "2.5 MB",
    pages: 49,
    level: "junior",
    roadmapId: "backend",
    type: "ebook",
    author: "MongoDB University"
  },
  {
    id: "be-junior-pdf-4",
    title: "Autenticação JWT",
    description: "Cheat sheet sobre implementação de autenticação JWT.",
    downloadUrl: "/materials/jwt-auth.pdf",
    fileSize: "1.1 MB",
    pages: 18,
    level: "junior",
    roadmapId: "backend",
    type: "cheatsheet",
    author: "Auth Masters"
  },

  // Backend - Pleno
  {
    id: "be-pleno-pdf-1",
    title: "Design de Banco de Dados",
    description: "Apostila sobre modelagem de dados, normalização e otimização.",
    downloadUrl: "/materials/database-design.pdf",
    fileSize: "4.7 MB",
    pages: 92,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "DB Design Pro"
  },
  {
    id: "be-pleno-pdf-2",
    title: "Microservices Architecture",
    description: "Ebook completo sobre arquitetura de microserviços.",
    downloadUrl: "/materials/microservices.pdf",
    fileSize: "5.8 MB",
    pages: 134,
    level: "pleno",
    roadmapId: "backend",
    type: "ebook",
    author: "Microservices Academy"
  },
  {
    id: "be-pleno-pdf-3",
    title: "Docker & Kubernetes",
    description: "Guia prático de containerização e orquestração.",
    downloadUrl: "/materials/docker-k8s.pdf",
    fileSize: "6.1 MB",
    pages: 145,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "Container Experts"
  },
  {
    id: "be-pleno-pdf-4",
    title: "Message Queues - RabbitMQ",
    description: "Apostila sobre sistemas de mensageria e padrões assíncronos.",
    downloadUrl: "/materials/rabbitmq-guide.pdf",
    fileSize: "3.9 MB",
    pages: 76,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "Message Queue Pro"
  },

  // Backend - Sênior
  {
    id: "be-senior-pdf-1",
    title: "System Design - Escalabilidade",
    description: "Ebook sobre design de sistemas distribuídos e escaláveis.",
    downloadUrl: "/materials/system-design.pdf",
    fileSize: "7.2 MB",
    pages: 178,
    level: "senior",
    roadmapId: "backend",
    type: "ebook",
    author: "System Architects"
  },
  {
    id: "be-senior-pdf-2",
    title: "Distributed Systems",
    description: "Apostila avançada sobre sistemas distribuídos e consistência.",
    downloadUrl: "/materials/distributed-systems.pdf",
    fileSize: "5.6 MB",
    pages: 123,
    level: "senior",
    roadmapId: "backend",
    type: "guide",
    author: "Distributed Computing"
  },
  {
    id: "be-senior-pdf-3",
    title: "Security Best Practices",
    description: "Guia completo de segurança OWASP e hardening de sistemas.",
    downloadUrl: "/materials/security-owasp.pdf",
    fileSize: "6.4 MB",
    pages: 156,
    level: "senior",
    roadmapId: "backend",
    type: "guide",
    author: "OWASP Foundation"
  },
  {
    id: "be-senior-pdf-4",
    title: "Cloud Architecture - AWS/Azure",
    description: "Ebook sobre arquitetura em nuvem e infraestrutura como código.",
    thumbnail: "/images/pdf-thumbnails/cloud-architecture.jpg",
    downloadUrl: "/materials/cloud-architecture.pdf",
    fileSize: "8.1 MB",
    pages: 192,
    level: "senior",
    roadmapId: "backend",
    type: "ebook",
    author: "Cloud Architects"
  },

  // Frontend - Pleno
  {
    id: "fe-pleno-pdf-1",
    title: "React.js - Do Zero ao Profissional",
    description: "Ebook completo sobre React, hooks, context e melhores práticas.",
    thumbnail: "/images/pdf-thumbnails/react-complete.jpg",
    downloadUrl: "/materials/react-complete.pdf",
    fileSize: "5.2 MB",
    pages: 124,
    level: "pleno",
    roadmapId: "frontend",
    type: "ebook",
    author: "React Academy"
  },
  {
    id: "fe-pleno-pdf-2",
    title: "Next.js 14 - Guia Avançado",
    description: "Apostila sobre SSR, SSG, API Routes e otimização de performance.",
    thumbnail: "/images/pdf-thumbnails/nextjs-advanced.jpg",
    downloadUrl: "/materials/nextjs-advanced.pdf",
    fileSize: "4.1 MB",
    pages: 89,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "Next.js Experts"
  },
  {
    id: "fe-pleno-pdf-3",
    title: "TypeScript para React",
    description: "Guia completo de TypeScript aplicado ao desenvolvimento React.",
    thumbnail: "/images/pdf-thumbnails/ts-react.jpg",
    downloadUrl: "/materials/ts-react.pdf",
    fileSize: "3.5 MB",
    pages: 67,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "TypeScript Pro"
  },
  {
    id: "fe-pleno-pdf-4",
    title: "Testing React - Jest & RTL",
    description: "Apostila sobre testes unitários e de integração em React.",
    thumbnail: "/images/pdf-thumbnails/react-testing.jpg",
    downloadUrl: "/materials/react-testing.pdf",
    fileSize: "2.7 MB",
    pages: 43,
    level: "pleno",
    roadmapId: "frontend",
    type: "guide",
    author: "Testing Library"
  },

  // Frontend - Sênior
  {
    id: "fe-senior-pdf-1",
    title: "Arquitetura Frontend Escalável",
    description: "Ebook sobre design de sistemas frontend grandes e complexos.",
    thumbnail: "/images/pdf-thumbnails/frontend-architecture.jpg",
    downloadUrl: "/materials/frontend-architecture.pdf",
    fileSize: "6.8 MB",
    pages: 156,
    level: "senior",
    roadmapId: "frontend",
    type: "ebook",
    author: "Architecture Masters"
  },
  {
    id: "fe-senior-pdf-2",
    title: "Performance Web - Core Web Vitals",
    description: "Guia avançado de otimização de performance e métricas web.",
    thumbnail: "/images/pdf-thumbnails/web-performance.jpg",
    downloadUrl: "/materials/web-performance.pdf",
    fileSize: "4.9 MB",
    pages: 98,
    level: "senior",
    roadmapId: "frontend",
    type: "guide",
    author: "Google Web Dev"
  },
  {
    id: "fe-senior-pdf-3",
    title: "Acessibilidade Web (WCAG 2.1)",
    description: "Apostila completa sobre acessibilidade web e compliance.",
    thumbnail: "/images/pdf-thumbnails/web-accessibility.jpg",
    downloadUrl: "/materials/web-accessibility.pdf",
    fileSize: "5.4 MB",
    pages: 112,
    level: "senior",
    roadmapId: "frontend",
    type: "guide",
    author: "A11y Experts"
  },
  {
    id: "fe-senior-pdf-4",
    title: "Microfrontends - Arquitetura Moderna",
    description: "Ebook sobre microfrontends, module federation e deploy independente.",
    thumbnail: "/images/pdf-thumbnails/microfrontends.jpg",
    downloadUrl: "/materials/microfrontends.pdf",
    fileSize: "4.2 MB",
    pages: 84,
    level: "senior",
    roadmapId: "frontend",
    type: "ebook",
    author: "Microservices Pro"
  },

  // Backend - Júnior
  {
    id: "be-junior-pdf-1",
    title: "Node.js Fundamentals",
    description: "Apostila completa sobre Node.js, módulos e APIs básicas.",
    thumbnail: "/images/pdf-thumbnails/nodejs-fundamentals.jpg",
    downloadUrl: "/materials/nodejs-fundamentals.pdf",
    fileSize: "2.8 MB",
    pages: 56,
    level: "junior",
    roadmapId: "backend",
    type: "guide",
    author: "Node School"
  },
  {
    id: "be-junior-pdf-2",
    title: "Express.js - APIs REST",
    description: "Guia prático para criar APIs REST com Express.js.",
    thumbnail: "/images/pdf-thumbnails/express-rest.jpg",
    downloadUrl: "/materials/express-rest.pdf",
    fileSize: "3.2 MB",
    pages: 68,
    level: "junior",
    roadmapId: "backend",
    type: "guide",
    author: "Express Academy"
  },
  {
    id: "be-junior-pdf-3",
    title: "MongoDB Essentials",
    description: "Ebook sobre MongoDB, queries e operações CRUD.",
    thumbnail: "/images/pdf-thumbnails/mongodb-essentials.jpg",
    downloadUrl: "/materials/mongodb-essentials.pdf",
    fileSize: "2.5 MB",
    pages: 49,
    level: "junior",
    roadmapId: "backend",
    type: "ebook",
    author: "MongoDB University"
  },
  {
    id: "be-junior-pdf-4",
    title: "Autenticação JWT",
    description: "Cheat sheet sobre implementação de autenticação JWT.",
    thumbnail: "/images/pdf-thumbnails/jwt-auth.jpg",
    downloadUrl: "/materials/jwt-auth.pdf",
    fileSize: "1.1 MB",
    pages: 18,
    level: "junior",
    roadmapId: "backend",
    type: "cheatsheet",
    author: "Auth Masters"
  },

  // Backend - Pleno
  {
    id: "be-pleno-pdf-1",
    title: "Design de Banco de Dados",
    description: "Apostila sobre modelagem de dados, normalização e otimização.",
    thumbnail: "/images/pdf-thumbnails/database-design.jpg",
    downloadUrl: "/materials/database-design.pdf",
    fileSize: "4.7 MB",
    pages: 92,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "DB Design Pro"
  },
  {
    id: "be-pleno-pdf-2",
    title: "Microservices Architecture",
    description: "Ebook completo sobre arquitetura de microserviços.",
    thumbnail: "/images/pdf-thumbnails/microservices.jpg",
    downloadUrl: "/materials/microservices.pdf",
    fileSize: "5.8 MB",
    pages: 134,
    level: "pleno",
    roadmapId: "backend",
    type: "ebook",
    author: "Microservices Academy"
  },
  {
    id: "be-pleno-pdf-3",
    title: "Docker & Kubernetes",
    description: "Guia prático de containerização e orquestração.",
    thumbnail: "/images/pdf-thumbnails/docker-k8s.jpg",
    downloadUrl: "/materials/docker-k8s.pdf",
    fileSize: "6.1 MB",
    pages: 145,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "Container Experts"
  },
  {
    id: "be-pleno-pdf-4",
    title: "Message Queues - RabbitMQ",
    description: "Apostila sobre sistemas de mensageria e padrões assíncronos.",
    thumbnail: "/images/pdf-thumbnails/rabbitmq-guide.jpg",
    downloadUrl: "/materials/rabbitmq-guide.pdf",
    fileSize: "3.9 MB",
    pages: 76,
    level: "pleno",
    roadmapId: "backend",
    type: "guide",
    author: "Message Queue Pro"
  },

  // Backend - Sênior
  {
    id: "be-senior-pdf-1",
    title: "System Design - Escalabilidade",
    description: "Ebook sobre design de sistemas distribuídos e escaláveis.",
    thumbnail: "/images/pdf-thumbnails/system-design.jpg",
    downloadUrl: "/materials/system-design.pdf",
    fileSize: "7.2 MB",
    pages: 178,
    level: "senior",
    roadmapId: "backend",
    type: "ebook",
    author: "System Architects"
  },
  {
    id: "be-senior-pdf-2",
    title: "Distributed Systems",
    description: "Apostila avançada sobre sistemas distribuídos e consistência.",
    thumbnail: "/images/pdf-thumbnails/distributed-systems.jpg",
    downloadUrl: "/materials/distributed-systems.pdf",
    fileSize: "5.6 MB",
    pages: 123,
    level: "senior",
    roadmapId: "backend",
    type: "guide",
    author: "Distributed Computing"
  },
  {
    id: "be-senior-pdf-3",
    title: "Security Best Practices",
    description: "Guia completo de segurança OWASP e hardening de sistemas.",
    thumbnail: "/images/pdf-thumbnails/security-owasp.jpg",
    downloadUrl: "/materials/security-owasp.pdf",
    fileSize: "6.4 MB",
    pages: 156,
    level: "senior",
    roadmapId: "backend",
    type: "guide",
    author: "OWASP Foundation"
  },
  {
    id: "be-senior-pdf-4",
    title: "Cloud Architecture - AWS/Azure",
    description: "Ebook sobre arquitetura em nuvem e infraestrutura como código.",
    thumbnail: "/images/pdf-thumbnails/cloud-architecture.jpg",
    downloadUrl: "/materials/cloud-architecture.pdf",
    fileSize: "8.1 MB",
    pages: 192,
    level: "senior",
    roadmapId: "backend",
    type: "ebook",
    author: "Cloud Architects"
  },

  // Fullstack
  {
    id: "fs-junior-pdf-1",
    title: "Guia Fullstack Inicial",
    description: "Manual prático para construir sua primeira aplicação completa.",
    thumbnail: "/images/pdf-thumbnails/fullstack-beginner.jpg",
    downloadUrl: "/materials/fullstack-beginner.pdf",
    fileSize: "3.5 MB",
    pages: 60,
    level: "junior",
    roadmapId: "fullstack",
    type: "guide",
    author: "Stack Fusion"
  },
  {
    id: "fs-pleno-pdf-1",
    title: "Next.js e APIs Completas",
    description: "Ebook sobre integração entre frontend e backend usando Next.js.",
    thumbnail: "/images/pdf-thumbnails/nextjs-fullstack.jpg",
    downloadUrl: "/materials/nextjs-fullstack.pdf",
    fileSize: "4.2 MB",
    pages: 78,
    level: "pleno",
    roadmapId: "fullstack",
    type: "ebook",
    author: "Fullstack Academy"
  },
  {
    id: "fs-senior-pdf-1",
    title: "Arquitetura Fullstack Escalável",
    description: "Guia avançado de monorepos, deploys e microserviços fullstack.",
    thumbnail: "/images/pdf-thumbnails/fullstack-architecture.jpg",
    downloadUrl: "/materials/fullstack-architecture.pdf",
    fileSize: "5.8 MB",
    pages: 112,
    level: "senior",
    roadmapId: "fullstack",
    type: "ebook",
    author: "DevOps++"
  },

  // Mobile
  {
    id: "mo-junior-pdf-1",
    title: "React Native Essentials",
    description: "Guia passo a passo para criar apps móveis com React Native.",
    thumbnail: "/images/pdf-thumbnails/react-native-essentials.jpg",
    downloadUrl: "/materials/react-native-essentials.pdf",
    fileSize: "3.1 MB",
    pages: 55,
    level: "junior",
    roadmapId: "mobile",
    type: "guide",
    author: "Mobile Lab"
  },
  {
    id: "mo-pleno-pdf-1",
    title: "Animações Mobile Avançadas",
    description: "Ebook sobre animações e interações em apps móveis.",
    thumbnail: "/images/pdf-thumbnails/mobile-animations.jpg",
    downloadUrl: "/materials/mobile-animations.pdf",
    fileSize: "3.9 MB",
    pages: 65,
    level: "pleno",
    roadmapId: "mobile",
    type: "guide",
    author: "Mobile Dev School"
  },
  {
    id: "mo-senior-pdf-1",
    title: "Deploy Mobile e App Stores",
    description: "Manual de publicação, code signing e revisão em lojas.",
    thumbnail: "/images/pdf-thumbnails/mobile-deploy.jpg",
    downloadUrl: "/materials/mobile-deploy.pdf",
    fileSize: "4.5 MB",
    pages: 84,
    level: "senior",
    roadmapId: "mobile",
    type: "guide",
    author: "App Mastery"
  },

  // DevOps
  {
    id: "dv-junior-pdf-1",
    title: "Docker para Iniciantes",
    description: "Guia prático de containers e imagens Docker.",
    thumbnail: "/images/pdf-thumbnails/docker-basics.jpg",
    downloadUrl: "/materials/docker-basics.pdf",
    fileSize: "3.7 MB",
    pages: 58,
    level: "junior",
    roadmapId: "devops",
    type: "guide",
    author: "Infra School"
  },
  {
    id: "dv-pleno-pdf-1",
    title: "Kubernetes Básico",
    description: "Ebook sobre conceitos e deploys em Kubernetes.",
    thumbnail: "/images/pdf-thumbnails/kubernetes-basic.jpg",
    downloadUrl: "/materials/kubernetes-basic.pdf",
    fileSize: "4.6 MB",
    pages: 72,
    level: "pleno",
    roadmapId: "devops",
    type: "guide",
    author: "Cloud Native"
  },
  {
    id: "dv-senior-pdf-1",
    title: "GitOps e Observabilidade",
    description: "Manual de GitOps, Argo CD e monitorização de produção.",
    thumbnail: "/images/pdf-thumbnails/gitops-observability.jpg",
    downloadUrl: "/materials/gitops-observability.pdf",
    fileSize: "5.1 MB",
    pages: 90,
    level: "senior",
    roadmapId: "devops",
    type: "ebook",
    author: "DevOps Academy"
  },

  // Data Science
  {
    id: "ds-junior-pdf-1",
    title: "Python para Ciência de Dados",
    description: "Guia com exemplos práticos de análise e visualização.",
    thumbnail: "/images/pdf-thumbnails/python-data-science.jpg",
    downloadUrl: "/materials/python-data-science.pdf",
    fileSize: "3.3 MB",
    pages: 66,
    level: "junior",
    roadmapId: "datascience",
    type: "guide",
    author: "Data School"
  },
  {
    id: "ds-pleno-pdf-1",
    title: "Machine Learning com Scikit-Learn",
    description: "Ebook com algoritmos clássicos de ML e validação.",
    thumbnail: "/images/pdf-thumbnails/scikit-learn-guide.jpg",
    downloadUrl: "/materials/scikit-learn-guide.pdf",
    fileSize: "4.0 MB",
    pages: 80,
    level: "pleno",
    roadmapId: "datascience",
    type: "ebook",
    author: "ML Academy"
  },
  {
    id: "ds-senior-pdf-1",
    title: "Deep Learning com PyTorch",
    description: "Guia avançado sobre redes neurais e treinamento em PyTorch.",
    thumbnail: "/images/pdf-thumbnails/pytorch-deep-learning.jpg",
    downloadUrl: "/materials/pytorch-deep-learning.pdf",
    fileSize: "5.6 MB",
    pages: 110,
    level: "senior",
    roadmapId: "datascience",
    type: "ebook",
    author: "Deep Learning Brasil"
  },

  // UI/UX
  {
    id: "ux-junior-pdf-1",
    title: "Figma Essentials",
    description: "Guia inicial para dominar design de interfaces no Figma.",
    thumbnail: "/images/pdf-thumbnails/figma-essentials.jpg",
    downloadUrl: "/materials/figma-essentials.pdf",
    fileSize: "3.2 MB",
    pages: 54,
    level: "junior",
    roadmapId: "uiux",
    type: "guide",
    author: "Design Lab"
  },
  {
    id: "ux-pleno-pdf-1",
    title: "UX Research Prático",
    description: "Ebook sobre pesquisa de usuários e validação de hipóteses.",
    thumbnail: "/images/pdf-thumbnails/ux-research.jpg",
    downloadUrl: "/materials/ux-research.pdf",
    fileSize: "3.9 MB",
    pages: 68,
    level: "pleno",
    roadmapId: "uiux",
    type: "guide",
    author: "UX Academy"
  },
  {
    id: "ux-senior-pdf-1",
    title: "Design System Avançado",
    description: "Guia de componentes e sistemas visuais escaláveis.",
    thumbnail: "/images/pdf-thumbnails/design-system.jpg",
    downloadUrl: "/materials/design-system.pdf",
    fileSize: "4.8 MB",
    pages: 92,
    level: "senior",
    roadmapId: "uiux",
    type: "ebook",
    author: "Design Systems"
  },

  // Cloud
  {
    id: "cl-junior-pdf-1",
    title: "AWS Fundamentals",
    description: "Guia de conceitos básicos de arquitetura em nuvem.",
    thumbnail: "/images/pdf-thumbnails/aws-fundamentals.jpg",
    downloadUrl: "/materials/aws-fundamentals.pdf",
    fileSize: "4.0 MB",
    pages: 74,
    level: "junior",
    roadmapId: "cloud",
    type: "guide",
    author: "Cloud Basics"
  },
  {
    id: "cl-pleno-pdf-1",
    title: "Terraform na Prática",
    description: "Manual de IaC para criar recursos na nuvem com Terraform.",
    thumbnail: "/images/pdf-thumbnails/terraform-practice.jpg",
    downloadUrl: "/materials/terraform-practice.pdf",
    fileSize: "4.7 MB",
    pages: 88,
    level: "pleno",
    roadmapId: "cloud",
    type: "ebook",
    author: "Terraform Academy"
  },
  {
    id: "cl-senior-pdf-1",
    title: "Arquitetura Cloud Escalável",
    description: "Guia avançado de multi-region e otimização na nuvem.",
    thumbnail: "/images/pdf-thumbnails/cloud-architecture-advanced.jpg",
    downloadUrl: "/materials/cloud-architecture-advanced.pdf",
    fileSize: "5.3 MB",
    pages: 102,
    level: "senior",
    roadmapId: "cloud",
    type: "ebook",
    author: "Cloud Native Academy"
  },

  // Security
  {
    id: "se-junior-pdf-1",
    title: "OWASP Top 10 Guide",
    description: "Introdução prática às vulnerabilidades mais comuns na web.",
    thumbnail: "/images/pdf-thumbnails/owasp-top10.jpg",
    downloadUrl: "/materials/owasp-top10.pdf",
    fileSize: "3.6 MB",
    pages: 64,
    level: "junior",
    roadmapId: "security",
    type: "guide",
    author: "Security First"
  },
  {
    id: "se-pleno-pdf-1",
    title: "DevSecOps Handbook",
    description: "Guia para incorporar segurança nos pipelines de CI/CD.",
    thumbnail: "/images/pdf-thumbnails/devsecops-handbook.jpg",
    downloadUrl: "/materials/devsecops-handbook.pdf",
    fileSize: "4.5 MB",
    pages: 86,
    level: "pleno",
    roadmapId: "security",
    type: "ebook",
    author: "SecOps Academy"
  },
  {
    id: "se-senior-pdf-1",
    title: "Resposta a Incidentes",
    description: "Manual sobre análise forense e resposta a ataques reais.",
    thumbnail: "/images/pdf-thumbnails/incident-response.jpg",
    downloadUrl: "/materials/incident-response.pdf",
    fileSize: "5.0 MB",
    pages: 98,
    level: "senior",
    roadmapId: "security",
    type: "ebook",
    author: "Cybersecurity Pro"
  }
];

export function getMaterialsByRoadmapAndLevel(roadmapId: string, level: "junior" | "pleno" | "senior") {
  return STUDY_MATERIALS.filter(material => material.roadmapId === roadmapId && material.level === level);
}

export function getMaterialTypeLabel(type: StudyMaterial["type"]) {
  const labels = {
    pdf: "PDF",
    ebook: "E-book",
    guide: "Guia",
    cheatsheet: "Cheat Sheet"
  };
  return labels[type];
}

export function getMaterialTypeColor(type: StudyMaterial["type"]) {
  const colors = {
    pdf: "bg-red-100 text-red-700",
    ebook: "bg-blue-100 text-blue-700",
    guide: "bg-green-100 text-green-700",
    cheatsheet: "bg-purple-100 text-purple-700"
  };
  return colors[type];
}