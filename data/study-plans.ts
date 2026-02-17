
import {
    Code,
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

export interface StudyPlan {
    id: string;
    role: string;
    icon: any;
    description: string;
    responsibilities: string[];
    prerequisites: {
        knowledge: string[];
        softSkills: string[];
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
}

export const STUDY_PLANS: StudyPlan[] = [
    {
        id: "frontend",
        role: "Frontend Engineer",
        icon: Layout,
        description: "Responsável pela parte visual e interativa de aplicações web, garantindo experiência do usuário e performance.",
        responsibilities: [
            "Desenvolver interfaces responsivas e acessíveis",
            "Integrar com APIs e serviços backend",
            "Otimizar performance de renderização",
            "Garantir compatibilidade entre navegadores"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação básica", "Inglês técnico (leitura)"],
            softSkills: ["Atenção aos detalhes", "Criatividade", "Empatia com usuário"]
        },
        stages: {
            beginner: {
                title: "Fundamentos Técnicos",
                description: "A base da web que todo profissional deve dominar.",
                items: [
                    "HTML5 Semântico: Estrutura, SEO, Acessibilidade (ARIA)",
                    "CSS3 Moderno: Flexbox, Grid, Variáveis, Media Queries",
                    "JavaScript (ES6+): DOM, Eventos, Promises, Async/Await, ES Modules",
                    "Git e GitHub: Comandos básicos, Flow de trabalho",
                    "HTTP e APIs: Verbos, Status Codes, JSON, Fetch API"
                ]
            },
            intermediate: {
                title: "Desenvolvimento Moderno",
                description: "Ferramentas e frameworks utilizados no mercado.",
                items: [
                    "React.js / Vue.js / Angular: Componentização, Hooks, Estado",
                    "TypeScript: Tipagem estática, Interfaces, Generics",
                    "Estilização: Tailwind CSS, Styled Components, CSS Modules",
                    "Gerenciamento de Estado: Redux, Zustand, Context API",
                    "Next.js / Nuxt: SSR, SSG, Routing"
                ]
            },
            advanced: {
                title: "Especialização e Arquitetura",
                description: "Performance, escala e qualidade de código.",
                items: [
                    "Performance Web: Core Web Vitals, Code Splitting, Lazy Loading",
                    "Testes: Jest, React Testing Library, Cypress, Playwright",
                    "Arquitetura Frontend: Micro-frontends, Atomic Design",
                    "CI/CD para Frontend: Vercel, Netlify, GitHub Actions",
                    "Segurança no Frontend: XSS, CSRF, CSP"
                ]
            }
        },
        tools: {
            languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
            frameworks: ["React", "Next.js", "Vue.js", "Angular"],
            tools: ["VS Code", "Figma", "Webpack/Vite", "Git"]
        }
    },
    {
        id: "backend",
        role: "Backend Engineer",
        icon: Server,
        description: "Responsável pela lógica de negócio, banco de dados, APIs e infraestrutura que suportam aplicações.",
        responsibilities: [
            "Desenvolver e manter APIs RESTful e GraphQL",
            "Modelar e gerenciar bancos de dados",
            "Garantir segurança e escalabilidade do servidor",
            "Implementar regras de negócio complexas"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação sólida", "Matemática discreta básica"],
            softSkills: ["Resolução de problemas", "Pensamento analítico", "Organização"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Servidor",
                description: "Conceitos essenciais para backend.",
                items: [
                    "Linguagem de Servidor: Python, Node.js, Java, Go ou C#",
                    "Protocolo HTTP/HTTPS: Headers, Cookies, Sessões",
                    "Banco de Dados Relacional (SQL): PostgreSQL ou MySQL (CRUD, Joins)",
                    "Estruturas de Dados e Algoritmos básicos",
                    "Git e Versionamento"
                ]
            },
            intermediate: {
                title: "Construção de APIs e Serviços",
                description: "Criando aplicações robustas.",
                items: [
                    "APIs RESTful: Padrões, Autenticação (JWT, OAuth)",
                    "Banco de Dados NoSQL: MongoDB, Redis",
                    "ORMs: Prisma, TypeORM, Hibernate, Sequelize",
                    "Docker e Containerização básica",
                    "Testes Unitários e de Integração"
                ]
            },
            advanced: {
                title: "Escalabilidade e Arquitetura",
                description: "Sistemas distribuídos e alta performance.",
                items: [
                    "Arquitetura de Microsserviços vs Monolito",
                    "Mensageria e Eventos: RabbitMQ, Kafka",
                    "Cloud Computing: AWS/Azure/GCP (EC2, Lambda, S3)",
                    "GraphQL e gRPC",
                    "CI/CD e DevOps básico",
                    "Caching avançado e Otimização de Queries"
                ]
            }
        },
        tools: {
            languages: ["Node.js", "Python", "Java", "Go", "C#"],
            frameworks: ["Express", "NestJS", "Django", "Spring Boot", ".NET"],
            tools: ["Docker", "Postman", "Insomnia", "DBeaver"]
        }
    },
    {
        id: "fullstack",
        role: "Fullstack Developer",
        icon: Globe,
        description: "Híbrido que domina tanto o frontend quanto o backend, capaz de entregar features completas.",
        responsibilities: [
            "Desenvolver features de ponta a ponta",
            "Entender e integrar todas as camadas da aplicação",
            "Prototipar e implementar MVPs rapidamente",
            "Gerenciar deploy e infraestrutura básica"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação avançada", "Visão sistêmica"],
            softSkills: ["Flexibilidade", "Autonomia", "Gestão de tempo"]
        },
        stages: {
            beginner: {
                title: "Fundamentos Web Completos",
                description: "Dominando as duas pontas em nível básico.",
                items: [
                    "HTML/CSS/JS + Uma linguagem de Backend (ex: Node.js)",
                    "Comunicação Cliente-Servidor",
                    "Modelagem de Dados básica",
                    "Git e GitHub"
                ]
            },
            intermediate: {
                title: "Desenvolvimento Integrado",
                description: "Conectando o sistema.",
                items: [
                    "Stack JS: MERN (Mongo, Express, React, Node) ou Next.js Fullstack",
                    "Autenticação completa (Front + Back)",
                    "Gerenciamento de Estado Global e Cache (React Query)",
                    "Deploy em PaaS (Vercel, Heroku, Railway)",
                    "Bancos de dados SQL e NoSQL"
                ]
            },
            advanced: {
                title: "Arquitetura e DevOps",
                description: "Profissional completo e independente.",
                items: [
                    "Serverless Computing (AWS Lambda, Vercel Functions)",
                    "Arquitetura Limpa (Clean Architecture)",
                    "Monorepos (Turborepo, Nx)",
                    "Tratamento de erros e Logging distribuído",
                    "WebSockets e comunicação em tempo real"
                ]
            }
        },
        tools: {
            languages: ["TypeScript", "JavaScript", "Python/Java (Opcional)"],
            frameworks: ["Next.js", "React", "Node.js", "Tailwind"],
            tools: ["VS Code", "Docker", "Figma", "Postman"]
        }
    },
    {
        id: "mobile",
        role: "Mobile Developer",
        icon: Smartphone,
        description: "Especialista em criar aplicativos para dispositivos móveis (iOS e Android).",
        responsibilities: [
            "Desenvolver apps nativos ou multiplataforma",
            "Gerenciar publicação nas lojas (App Store, Play Store)",
            "Otimizar uso de bateria e recursos do dispositivo",
            "Implementar recursos nativos (Câmera, GPS, Bluetooth)"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação", "Conceitos de UI para toque"],
            softSkills: ["Atenção a design", "Paciência", "Detalhismo"]
        },
        stages: {
            beginner: {
                title: "Fundamentos Mobile",
                description: "Primeiros passos no desenvolvimento mobile.",
                items: [
                    "Lógica com Kotlin, Swift ou Dart",
                    "Estrutura de um App móvel",
                    "Layouts e Views básicas",
                    "Navegação entre telas"
                ]
            },
            intermediate: {
                title: "Desenvolvimento de Apps",
                description: "Criando apps úteis e conectados.",
                items: [
                    "React Native ou Flutter (Multiplataforma)",
                    "Consumo de APIs REST",
                    "Armazenamento local (AsyncStorage, SQLite)",
                    "Gerenciamento de Estado",
                    "Publicação Beta (TestFlight)"
                ]
            },
            advanced: {
                title: "Performance e Nativo",
                description: "Apps complexos e otimizados.",
                items: [
                    "Bridges e Módulos Nativos",
                    "Animações complexas (Reanimated)",
                    "CI/CD para Mobile (Fastlane)",
                    "Testes E2E (Detox, Maestro)",
                    "Deep Linking e Notificações Push"
                ]
            }
        },
        tools: {
            languages: ["JavaScript/TypeScript", "Dart", "Swift", "Kotlin"],
            frameworks: ["React Native", "Flutter", "Expo", "SwiftUI"],
            tools: ["Xcode", "Android Studio", "Simulator/Emulator"]
        }
    },
    {
        id: "devops",
        role: "DevOps Engineer",
        icon: Terminal,
        description: "Une desenvolvimento e operações para otimizar entregas e garantir estabilidade.",
        responsibilities: [
            "Criar pipelines de CI/CD",
            "Gerenciar infraestrutura como código (IaC)",
            "Monitorar saúde dos sistemas",
            "Automatizar tarefas repetitivas"
        ],
        prerequisites: {
            knowledge: ["Sistemas Operacionais (Linux)", "Redes básico"],
            softSkills: ["Comunicação", "Resiliência", "Automação mental"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Ops",
                description: "Dominando o ambiente.",
                items: [
                    "Linux (Comandos, Permissões, SSH)",
                    "Shell Scripting (Bash)",
                    "Git avançado",
                    "Redes: DNS, HTTP, TCP/IP, Firewalls"
                ]
            },
            intermediate: {
                title: "Containerização e CI/CD",
                description: "Padronizando entregas.",
                items: [
                    "Docker e Docker Compose",
                    "Web Servers (Nginx, Apache)",
                    "Pipelines CI/CD (GitHub Actions, GitLab CI, Jenkins)",
                    "Cloud Básico (AWS/Azure/GCP)"
                ]
            },
            advanced: {
                title: "Orquestração e IaC",
                description: "Infraestrutura escalável e gerenciável.",
                items: [
                    "Kubernetes (K8s) e Helm",
                    "Terraform (Infra as Code) ou Ansible",
                    "Observabilidade (Prometheus, Grafana, ELK)",
                    "Segurança em DevOps (DevSecOps)",
                    "GitOps (ArgoCD)"
                ]
            }
        },
        tools: {
            languages: ["Bash", "Python", "Go", "YAML"],
            frameworks: ["Docker", "Kubernetes", "Terraform", "Ansible"],
            tools: ["AWS", "GitHub Actions", "Grafana", "Jenkins"]
        }
    },
    {
        id: "datascience",
        role: "Data Scientist",
        icon: Brain,
        description: "Analisa dados complexos para extrair insights e construir modelos preditivos.",
        responsibilities: [
            "Limpeza e análise exploratória de dados",
            "Construção e treino de modelos de Machine Learning",
            "Visualização de dados para stakeholders",
            "Estatística aplicada"
        ],
        prerequisites: {
            knowledge: ["Matemática (Estatística, Álgebra Linear, Cálculo)", "Lógica"],
            softSkills: ["Curiosidade", "Storytelling", "Pensamento crítico"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Dados",
                description: "Ferramentas básicas de análise.",
                items: [
                    "Python para Dados (Sintaxe)",
                    "Numpy e Pandas (Manipulação)",
                    "Matplotlib e Seaborn (Visualização)",
                    "SQL Básico para consultas",
                    "Estatística Descritiva e Probabilidade"
                ]
            },
            intermediate: {
                title: "Machine Learning",
                description: "Criando modelos preditivos.",
                items: [
                    "Scikit-Learn (Regressão, Classificação, Clustering)",
                    "Feature Engineering",
                    "Avaliação de Modelos (Acurácia, Recall, Precision)",
                    "SQL Avançado (Window Functions)",
                    "Jupyter Notebooks e Ambientes"
                ]
            },
            advanced: {
                title: "Deep Learning e Big Data",
                description: "IA Avançada e grandes volumes.",
                items: [
                    "Deep Learning (TensorFlow, PyTorch)",
                    "NLP (Processamento de Linguagem Natural)",
                    "Big Data (Spark, Hadoop) - Visão geral",
                    "MLOps (Deploy de modelos, MLflow)",
                    "Cloud para Data Science (SageMaker, Vertex AI)"
                ]
            }
        },
        tools: {
            languages: ["Python", "R", "SQL"],
            frameworks: ["Pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
            tools: ["Jupyter", "Colab", "Tableau/PowerBI", "Anaconda"]
        }
    },
    {
        id: "uiux",
        role: "UI/UX Designer",
        icon: PenTool,
        description: "Projeta interfaces e experiências de usuário intuitivas e esteticamente agradáveis.",
        responsibilities: [
            "Pesquisa com usuários e definição de personas",
            "Criação de Wireframes e Protótipos",
            "Design de Interface (UI) e Design System",
            "Testes de usabilidade"
        ],
        prerequisites: {
            knowledge: ["Princípios de Design", "Empatia"],
            softSkills: ["Comunicação visual", "Empatia", "Colaboração"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Design",
                description: "Teoria e ferramentas básicas.",
                items: [
                    "Ferramentas: Figma (Básico)",
                    "Teoria das Cores, Tipografia, Espaçamento",
                    "Heurísticas de Usabilidade (Nielsen)",
                    "Design Responsivo e Grids",
                    "Wireframing (Baixa fidelidade)"
                ]
            },
            intermediate: {
                title: "Prototipagem e UI",
                description: "Interfaces profissionais.",
                items: [
                    "Figma Avançado (Auto Layout, Components, Variants)",
                    "Prototipagem Interativa e Microinterações",
                    "Design Systems e Style Guides",
                    "Acessibilidade (WCAG)",
                    "Fluxos de Usuário (User Flows)"
                ]
            },
            advanced: {
                title: "UX Research e Estratégia",
                description: "Experiência baseada em dados.",
                items: [
                    "UX Research (Entrevistas, Testes A/B)",
                    "Mapeamento de Jornada do Usuário",
                    "Service Design",
                    "Design Ops e Handoff para desenvolvedores",
                    "Métricas de UX (NPS, SUS)"
                ]
            }
        },
        tools: {
            languages: ["HTML/CSS (Básico - Desejável)"],
            frameworks: ["Material Design", "Human Interface Guidelines"],
            tools: ["Figma", "Adobe XD", "Sketch", "Miro", "Notion"]
        }
    },
    {
        id: "gamedev",
        role: "Game Developer",
        icon: Gamepad2,
        description: "Cria jogos eletrônicos para diversas plataformas, programando mecânicas e interações.",
        responsibilities: [
            "Implementar mecânicas de gameplay",
            "Programar física e IA de jogos",
            "Otimizar assets gráficos e áudio",
            "Level Design básico (scripting)"
        ],
        prerequisites: {
            knowledge: ["Matemática (Trigonometria, Vetores)", "Lógica"],
            softSkills: ["Criatividade", "Resolução de problemas", "Paixão por jogos"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Jogos",
                description: "Primeiros passos na engine.",
                items: [
                    "Lógica de Programação (C# ou C++)",
                    "Introdução à Engine (Unity ou Unreal)",
                    "Game Loop e Estados do Jogo",
                    "Manipulação de Objetos 2D/3D (Transform, Collider)",
                    "Inputs do Jogador"
                ]
            },
            intermediate: {
                title: "Desenvolvimento de Jogos",
                description: "Criando jogos completos.",
                items: [
                    "Programação Orientada a Objetos para Jogos",
                    "Animação e Controladores",
                    "UI para Jogos (Menus, HUD)",
                    "Física e Raycasting",
                    "Sistemas de Save/Load"
                ]
            },
            advanced: {
                title: "Game Engineering",
                description: "Jogos complexos e performance.",
                items: [
                    "Design Patterns para Jogos (Observer, Singleton, State)",
                    "Inteligência Artificial (NavMesh, Behavior Trees)",
                    "Multiplayer e Networking (Netcode)",
                    "Shaders e Computação Gráfica básica",
                    "Otimização de Performance (Memory Management)"
                ]
            }
        },
        tools: {
            languages: ["C#", "C++", "Lua"],
            frameworks: ["Unity", "Unreal Engine", "Godot"],
            tools: ["Visual Studio", "Blender", "Photoshop/Aseprite"]
        }
    },
    {
        id: "cloud",
        role: "Cloud Engineer",
        icon: Cloud,
        description: "Projeta e gerencia infraestrutura em nuvem, garantindo disponibilidade, segurança e custos otimizados.",
        responsibilities: [
            "Arquitetar soluções em nuvem (AWS/Azure)",
            "Migrar sistemas legados para a nuvem",
            "Gerenciar segurança e acesso (IAM)",
            "Otimizar custos (FinOps)"
        ],
        prerequisites: {
            knowledge: ["Redes", "Sistemas Operacionais", "Virtualização"],
            softSkills: ["Planejamento", "Análise de risco", "Aprendizado contínuo"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Nuvem",
                description: "Entendendo a computação em nuvem.",
                items: [
                    "Conceitos de Cloud (IaaS, PaaS, SaaS)",
                    "Redes em Nuvem (VPC, Subnets, DNS)",
                    "Compute (EC2, VMs)",
                    "Storage (S3, Blob Storage)",
                    "Linux Básico"
                ]
            },
            intermediate: {
                title: "Arquitetura e Serviços",
                description: "Construindo soluções robustas.",
                items: [
                    "Banco de Dados Gerenciados (RDS, DynamoDB)",
                    "Serverless (Lambda, Functions)",
                    "Load Balancers e Auto Scaling",
                    "Segurança e IAM (Identity and Access Management)",
                    "CLI das Clouds"
                ]
            },
            advanced: {
                title: "Engenharia de Nuvem Avançada",
                description: "Escala global e automação.",
                items: [
                    "Infraestrutura como Código (Terraform, CloudFormation)",
                    "Arquiteturas Híbridas e Multi-Cloud",
                    "Containers em Nuvem (EKS, AKS, ECS)",
                    "Monitoramento e Logging Avançado (CloudWatch)",
                    "Disaster Recovery e Alta Disponibilidade"
                ]
            }
        },
        tools: {
            languages: ["Python", "HCL (Terraform)", "YAML"],
            frameworks: ["AWS CDK", "Pulumi"],
            tools: ["AWS Console", "Azure Portal", "Terraform", "Docker"]
        }
    },
    {
        id: "cybersecurity",
        role: "Cybersecurity Analyst",
        icon: Shield,
        description: "Protege sistemas, redes e dados contra ataques cibernéticos e acessos não autorizados.",
        responsibilities: [
            "Monitorar redes em busca de ameaças",
            "Realizar testes de vulnerabilidade (Pentest)",
            "Responder a incidentes de segurança",
            "Implementar políticas de segurança"
        ],
        prerequisites: {
            knowledge: ["Redes TCP/IP", "Sistemas Operacionais", "Hardware"],
            softSkills: ["Ética", "Curiosidade investigativa", "Trabalho sob pressão"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Segurança",
                description: "Bases da segurança da informação.",
                items: [
                    "Redes e Protocolos (TCP/IP, OSI, DNS, HTTP)",
                    "Linux e linha de comando",
                    "Conceitos de Segurança (CIA Triad: Confidencialidade, Integridade, Disponibilidade)",
                    "Tipos de Malware e Ataques básicos (Phishing)",
                    "Criptografia básica"
                ]
            },
            intermediate: {
                title: "Segurança Ofensiva e Defensiva",
                description: "Identificando e mitigando falhas.",
                items: [
                    "Vulnerabilidades Web (OWASP Top 10)",
                    "Ferramentas de Pentest (Nmap, Burp Suite, Metasploit basics)",
                    "Análise de Logs e Monitoramento (SIEM)",
                    "Hardening de Sistemas (Windows/Linux)",
                    "Firewalls e VPNs"
                ]
            },
            advanced: {
                title: "Engenharia de Segurança",
                description: "Proteção avançada.",
                items: [
                    "Engenharia Reversa e Análise de Malware",
                    "Exploit Development básico",
                    "Segurança em Nuvem e Containers",
                    "DevSecOps (Integração com esteira de desenvolvimento)",
                    "Forense Digital e Resposta a Incidentes"
                ]
            }
        },
        tools: {
            languages: ["Python", "Bash", "C (Leitura)"],
            frameworks: ["Metasploit", "OWASP ZAP"],
            tools: ["Kali Linux", "Wireshark", "Burp Suite", "Nmap"]
        }
    },
    {
        id: "qa",
        role: "QA Engineer",
        icon: Search,
        description: "Garante a qualidade do software através de processos de teste manuais e automatizados.",
        responsibilities: [
            "Planejar casos de teste",
            "Executar testes manuais e exploratórios",
            "Automatizar testes de UI e API",
            "Reportar e acompanhar bugs"
        ],
        prerequisites: {
            knowledge: ["Lógica de programação básica", "Atenção a detalhes"],
            softSkills: ["Pensamento crítico", "Comunicação clara", "Ceticismo saudável"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de QA",
                description: "Conceitos de qualidade.",
                items: [
                    "Ciclo de Vida de Desenvolvimento (SDLC)",
                    "Tipos de Teste (Funcional, Regressão, Fumaça)",
                    "Escrita de Casos de Teste e Cenários (BDD/Gherkin)",
                    "Report de Bugs (Jira/Trello)",
                    "Testes Manuais Web e Mobile"
                ]
            },
            intermediate: {
                title: "Automação de Testes",
                description: "Escalando a qualidade.",
                items: [
                    "Lógica de Programação para Automação (Java, JS ou Python)",
                    "Automação Web: Selenium ou Cypress",
                    "Testes de API: Postman/Newman, RestAssured",
                    "Versionamento de código (Git)",
                    "Padrões como Page Objects"
                ]
            },
            advanced: {
                title: "QA Ops e Performance",
                description: "Qualidade contínua.",
                items: [
                    "Integração Contínua (CI) com Testes",
                    "Testes de Performance (k6, JMeter)",
                    "Testes Mobile Automatizados (Appium)",
                    "Testes Visuais (Percy, Applitools)",
                    "Estratégia de Testes em Microsserviços"
                ]
            }
        },
        tools: {
            languages: ["Java", "JavaScript", "Python"],
            frameworks: ["Cypress", "Selenium", "Playwright", "Jest"],
            tools: ["Postman", "Jira", "k6"]
        }
    },
    {
        id: "product-manager",
        role: "Product Manager",
        icon: Briefcase,
        description: "Define a visão, estratégia e roadmap de um produto, alinhando necessidades do usuário e objetivos de negócio.",
        responsibilities: [
            "Definir requisitos e priorizar backlog",
            "Analisar métricas de produto",
            "Conduzir discovery e pesquisa",
            "Colaborar com engenharia e design"
        ],
        prerequisites: {
            knowledge: ["Negócios básico", "Entendimento técnico superficial"],
            softSkills: ["Liderança por influência", "Comunicação estratégica", "Visão de negócio"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Produto",
                description: "O papel do PM.",
                items: [
                    "Ciclo de Vida do Produto",
                    "Metodologias Ágeis (Scrum, Kanban)",
                    "Escrita de User Stories e Critérios de Aceite",
                    "Priorização (RICE, MOSCOW)",
                    "Análise de Concorrentes"
                ]
            },
            intermediate: {
                title: "Gestão e Métricas",
                description: "Tomada de decisão baseada em dados.",
                items: [
                    "Métricas de Produto (KPIs, OKRs, North Star)",
                    "Análise de Dados (Mixpanel, Amplitude, Google Analytics)",
                    "Product Discovery e Validação",
                    "Roadmap de Produto",
                    "Comunicação com Stakeholders"
                ]
            },
            advanced: {
                title: "Estratégia de Produto",
                description: "Visão de longo prazo.",
                items: [
                    "Estratégia de Go-to-Market",
                    "Growth Hacking e Experimentação",
                    "Gestão de Portfólio de Produtos",
                    "Liderança de Produtos Técnicos",
                    "Monetização e Pricing"
                ]
            }
        },
        tools: {
            languages: ["SQL (Desejável)"],
            frameworks: ["Scrum", "Kanban", "Lean"],
            tools: ["Jira", "Notion", "Miro", "Amplitude"]
        }
    },
    {
        id: "network",
        role: "Network Engineer",
        icon: Wifi,
        description: "Projeta, implementa e gerencia redes de computadores garantindo conectividade e segurança.",
        responsibilities: [
            "Configurar roteadores, switches e firewalls",
            "Monitorar performance e tráfego de rede",
            "Resolver problemas de conectividade",
            "Implementar VPNs e segurança de rede"
        ],
        prerequisites: {
            knowledge: ["Física básica (sinais)", "Sistemas Operacionais"],
            softSkills: ["Resolução de problemas sob pressão", "Trabalho em equipe"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Redes",
                description: "A base da comunicação.",
                items: [
                    "Modelo OSI e TCP/IP",
                    "Endereçamento IP (IPv4, IPv6, Subnetting)",
                    "Protocolos Básicos (DHCP, DNS, ARP, ICMP)",
                    "Cabeamento Estruturado e Hardware de Rede",
                    "Configuração básica de Switches e Roteadores (Cisco IOS basics)"
                ]
            },
            intermediate: {
                title: "Administração de Redes",
                description: "Gerenciamento profissional.",
                items: [
                    "Roteamento (OSPF, BGP, EIGRP)",
                    "VLANs e Trunking",
                    "Firewalls e VPNs (Site-to-Site, Client-to-Site)",
                    "Redes Sem Fio (Wi-Fi, WPA2/3)",
                    "Monitoramento (SNMP, NetFlow)"
                ]
            },
            advanced: {
                title: "Engenharia e Automação",
                description: "Redes modernas e SDN.",
                items: [
                    "Software Defined Networking (SDN)",
                    "Automação de Redes (Python, Ansible)",
                    "Redes em Nuvem (AWS VPC, Azure VNet)",
                    "Segurança de Rede Avançada (IPS/IDS)",
                    "Arquitetura de Data Center (Spine-Leaf)"
                ]
            },
        },
        tools: {
            languages: ["Python", "Bash"],
            frameworks: ["Ansible", "Cisco IOS"],
            tools: ["Wireshark", "Packet Tracer", "GNS3", "SolarWinds"]
        }
    },
    {
        id: "software-architect",
        role: "Software Architect",
        icon: Layers,
        description: "Define o design de alto nível e os padrões técnicos de sistemas complexos.",
        responsibilities: [
            "Tomar decisões técnicas de longo prazo",
            "Definir padrões de código e arquitetura",
            "Avaliar novas tecnologias e trade-offs",
            "Mentorizar desenvolvedores seniores"
        ],
        prerequisites: {
            knowledge: ["Experiência extensa em desenvolvimento", "Padrões de Projeto"],
            softSkills: ["Liderança", "Negociação", "Visão holística"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Arquitetura",
                description: "Pensando além do código.",
                items: [
                    "SOLID, DRY, KISS, YAGNI",
                    "Design Patterns (GoF)",
                    "Diagramação (UML, C4 Model)",
                    "Clean Code e Refatoração",
                    "Revisão de Código e Mentoria"
                ]
            },
            intermediate: {
                title: "Padrões Arquiteturais",
                description: "Estruturando sistemas.",
                items: [
                    "Monolito vs Microsserviços",
                    "Arquitetura Hexagonal (Ports & Adapters)",
                    "Event-Driven Architecture",
                    "API Gateway e Service Mesh",
                    "Estratégias de Banco de Dados (Sharding, Replication)"
                ]
            },
            advanced: {
                title: "Arquitetura Corporativa",
                description: "Sistemas de missão crítica.",
                items: [
                    "Domain-Driven Design (DDD)",
                    "System Design para Alta Disponibilidade",
                    "Estratégias de Migração de Legado",
                    "Governança de TI e Compliance",
                    "Cloud Native Architecture"
                ]
            },
        },
        tools: {
            languages: ["Agnóstico (Conhecimento em várias)"],
            frameworks: ["Spring Cloud", "Kubernetes"],
            tools: ["Draw.io", "Lucidchart", "Structurizr", "Jira"]
        }
    },
    {
        id: "ai-engineer",
        role: "AI Engineer",
        icon: Brain,
        description: "Desenvolve e implementa soluções baseadas em Inteligência Artificial e Modelos de Linguagem.",
        responsibilities: [
            "Implementar modelos de ML em produção",
            "Trabalhar com LLMs e Engenharia de Prompt",
            "Otimizar pipelines de dados para IA",
            "Integrar serviços de IA em aplicações"
        ],
        prerequisites: {
            knowledge: ["Python avançado", "APIs REST"],
            softSkills: ["Inovação", "Adaptação rápida", "Ética em IA"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de IA",
                description: "Básico de ML e APIs.",
                items: [
                    "Python para IA (NumPy, Pandas)",
                    "Consumo de APIs de IA (OpenAI, Anthropic)",
                    "Conceitos de NLP e Visão Computacional",
                    "Bibliotecas básicas (Scikit-learn)"
                ]
            },
            intermediate: {
                title: "LLMs e GenAI",
                description: "Trabalhando com IA Generativa.",
                items: [
                    "Prompt Engineering Avançado",
                    "Frameworks de LLM (LangChain, LlamaIndex)",
                    "Vector Databases (Pinecone, ChromaDB)",
                    "RAG (Retrieval-Augmented Generation)",
                    "Fine-tuning básico"
                ]
            },
            advanced: {
                title: "AI Ops e Escala",
                description: "IA em produção.",
                items: [
                    "Deploy de Modelos (ONNX, TorchServe)",
                    "Otimização de Inferência (Quantization)",
                    "Agentes Autônomos",
                    "Avaliação de Modelos (LLM Evaluation)",
                    "Ética, Segurança e Compliance em IA"
                ]
            },
        },
        tools: {
            languages: ["Python", "TypeScript"],
            frameworks: ["LangChain", "Hugging Face", "PyTorch", "TensorFlow"],
            tools: ["OpenAI API", "Hugging Face Hub", "Jupyter", "Docker"]
        }
    },
    {
        id: "data-analyst",
        role: "Data Analyst",
        icon: BarChart,
        description: "Transforma dados brutos em insights acionáveis para o negócio.",
        responsibilities: [
            "Criar dashboards e relatórios",
            "Analisar tendências e padrões",
            "Responder perguntas de negócio com dados",
            "Garantir integridade dos dados"
        ],
        prerequisites: {
            knowledge: ["Estatística básica", "Excel avançado"],
            softSkills: ["Curiosidade", "Comunicação de dados", "Detalhismo"]
        },
        stages: {
            beginner: {
                title: "Análise Básica",
                description: "Extraindo informações.",
                items: [
                    "Excel Avançado / Google Sheets",
                    "SQL Básico (Select, Where, Group By)",
                    "Estatística Descritiva",
                    "Visualização de Dados básica"
                ]
            },
            intermediate: {
                title: "BI e Visualização",
                description: "Histórias com dados.",
                items: [
                    "SQL Intermediário (Joins, Subqueries)",
                    "Ferramentas de BI (Power BI, Tableau, Looker)",
                    "Limpeza de Dados (Data Cleaning)",
                    "Python para Análise (Pandas básico)"
                ]
            },
            advanced: {
                title: "Analytics Avançado",
                description: "Análise profunda.",
                items: [
                    "SQL Avançado (Window Functions, CTEs)",
                    "Python/R para Estatística",
                    "Testes A/B e Experimentação",
                    "Modelagem de Dados (Star Schema)",
                    "Automação de Relatórios"
                ]
            },
        },
        tools: {
            languages: ["SQL", "Python", "R"],
            frameworks: ["Pandas", "Matplotlib"],
            tools: ["PowerBI", "Tableau", "Excel", "Metabase"]
        }
    },
    {
        id: "data-engineer",
        role: "Data Engineer",
        icon: Database,
        description: "Constrói e mantém a infraestrutura (pipelines) para coleta, armazenamento e processamento de dados.",
        responsibilities: [
            "Criar pipelines ETL/ELT",
            "Gerenciar Data Lakes e Data Warehouses",
            "Garantir qualidade e fluxo de dados",
            "Otimizar performance de queries"
        ],
        prerequisites: {
            knowledge: ["SQL Avançado", "Programação (Python/Java)"],
            softSkills: ["Organização", "Resolução de problemas estruturais"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Dados",
                description: "Bases de engenharia.",
                items: [
                    "SQL Avançado e Modelagem de Dados",
                    "Python para Scripting",
                    "Linux e Shell Scripting",
                    "Conceitos de ETL (Extract, Transform, Load)"
                ]
            },
            intermediate: {
                title: "Pipelines e Big Data",
                description: "Movendo grandes volumes.",
                items: [
                    "Ferramentas de ETL/Orquestração (Airflow, Prefect)",
                    "Big Data Frameworks (Spark, Hadoop básico)",
                    "Data Warehousing (Redshift, BigQuery, Snowflake)",
                    "NoSQL (Mongo, Cassandra)"
                ]
            },
            advanced: {
                title: "Arquitetura de Dados",
                description: "Escala e Streaming.",
                items: [
                    "Streaming de Dados (Kafka, Kinesis)",
                    "Data Lakes e Lakehouses (Databricks, Delta Lake)",
                    "Data Governance e Qualidade",
                    "CI/CD para Dados",
                    "Arquitetura Lambda/Kappa"
                ]
            },
        },
        tools: {
            languages: ["Python", "Scala", "SQL", "Java"],
            frameworks: ["Apache Spark", "Airflow", "dbt"],
            tools: ["AWS Glue", "Snowflake", "Databricks", "Docker"]
        }
    },
    {
        id: "engineering-manager",
        role: "Engineering Manager",
        icon: Users,
        description: "Lidera equipes de engenharia, focando no desenvolvimento das pessoas e na entrega eficiente de software.",
        responsibilities: [
            "Gerenciar carreira e performance do time (1:1s)",
            "Desbloquear o time e facilitar entregas",
            "Recrutamento e contratação (Hiring)",
            "Alinhar estratégia técnica com negócio"
        ],
        prerequisites: {
            knowledge: ["Experiência prévia como Engenheiro Sênior", "Processos Ágeis"],
            softSkills: ["Empatia", "Comunicação executiva", "Mentoria"]
        },
        stages: {
            beginner: {
                title: "Liderança Técnica",
                description: "Transição de Dev para Lead.",
                items: [
                    "Tech Lead vs EM",
                    "Condução de 1:1s efetivas",
                    "Code Review e Mentoria Técnica",
                    "Delegação eficaz",
                    "Gestão de Conflitos básica"
                ]
            },
            intermediate: {
                title: "Gestão de Time",
                description: "Construindo times de alta performance.",
                items: [
                    "Feedback Estruturado (SBI, CNV)",
                    "Processos de Engenharia (Onboarding, Incidentes)",
                    "Gestão de Performance e PDI",
                    "Hiring e Entrevistas Técnicas",
                    "Cultura de Engenharia"
                ]
            },
            advanced: {
                title: "Liderança Organizacional",
                description: "Escalando a engenharia.",
                items: [
                    "Planejamento Estratégico e OKRs",
                    "Gestão de Mudança (Change Management)",
                    "Orçamento e Headcount",
                    "Desenvolvimento de Lideranças",
                    "Arquitetura Organizacional (Team Topologies)"
                ]
            },
        },
        tools: {
            languages: ["Não aplicável (foco em pessoas)"],
            frameworks: ["Scrum", "Management 3.0"],
            tools: ["Jira", "Linear", "Lattice", "Google Meet/Zoom"]
        }
    },
    {
        id: "devrel",
        role: "DevRel Engineer",
        icon: Megaphone,
        description: "Constrói relacionamento com a comunidade de desenvolvedores, criando conteúdo e coletando feedback.",
        responsibilities: [
            "Criar conteúdo técnico (artigos, vídeos, palestras)",
            "Engajar com a comunidade (fóruns, eventos)",
            "Coletar feedback para o time de produto",
            "Criar exemplos de código e documentação"
        ],
        prerequisites: {
            knowledge: ["Desenvolvimento de software", "Criação de conteúdo"],
            softSkills: ["Comunicação pública", "Carisma", "Ensino"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de DevRel",
                description: "O que é Developer Relations.",
                items: [
                    "Os 3 pilares: Conteúdo, Comunidade, Produto",
                    "Escrita Técnica (Technical Writing)",
                    "Public Speaking básico",
                    "Redes Sociais para Devs (Twitter/X, LinkedIn)",
                    "Participação em Comunidades"
                ]
            },
            intermediate: {
                title: "Criação e Engajamento",
                description: "Produzindo impacto.",
                items: [
                    "Produção de Vídeo e Streaming",
                    "Organização de Meetups e Eventos",
                    "Gestão de Comunidade (Discord, Slack)",
                    "Demos e SDKs",
                    "Métricas de Comunidade"
                ]
            },
            advanced: {
                title: "Estratégia de DevRel",
                description: "Liderando a conversa.",
                items: [
                    "Estratégia de Conteúdo Global",
                    "Programa de Embaixadores/Champions",
                    "Developer Experience (DX)",
                    "Palestras em Grandes Conferências",
                    "Influência no Roadmap de Produto"
                ]
            },
        },
        tools: {
            languages: ["JavaScript", "Python", "Go (Populares)"],
            frameworks: ["Hugo/Gatsby (Blogs)", "OBS Studio"],
            tools: ["Discord", "Notion", "Canva", "StreamYard"]
        }
    },
    {
        id: "tech-writer",
        role: "Technical Writer",
        icon: FileText,
        description: "Transforma informações técnicas complexas em documentação clara e acessível.",
        responsibilities: [
            "Escrever documentação de API e manuais",
            "Criar tutoriais e guias de uso",
            "Manter a base de conhecimento atualizada",
            "Revisar textos de interface (UX Writing)"
        ],
        prerequisites: {
            knowledge: ["Gramática impecável", "Tecnologia básica"],
            softSkills: ["Clareza", "Didática", "Organização"]
        },
        stages: {
            beginner: {
                title: "Fundamentos de Escrita",
                description: "Escrevendo para devs.",
                items: [
                    "Markdown e Ferramentas de Doc",
                    "Estrutura de Documentação (Reference, Guide, Conceptual)",
                    "Inglês Técnico",
                    "Git para Documentação",
                    "Style Guides (Google, Microsoft)"
                ]
            },
            intermediate: {
                title: "Docs as Code",
                description: "Documentação moderna.",
                items: [
                    "Static Site Generators (Docusaurus, GitBook)",
                    "Documentação de APIs (OpenAPI/Swagger)",
                    "Arquitetura da Informação",
                    "Diagramação (Mermaid, Draw.io)",
                    "Revisão técnica"
                ]
            },
            advanced: {
                title: "Estratégia de Conteúdo",
                description: "Gestão do conhecimento.",
                items: [
                    "Developer Portals",
                    "Internacionalização (i18n)",
                    "Testes de Documentação",
                    "Métricas de Documentação",
                    "Liderança de Projetos de Conteúdo"
                ]
            },
        },
        tools: {
            languages: ["Markdown", "XML", "HTML"],
            frameworks: ["Docusaurus", "Sphinx", "Jekyll"],
            tools: ["VS Code", "GitHub", "Grammarly"]
        }
    }
];
