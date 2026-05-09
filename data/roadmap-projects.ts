import { ProjectItem } from "./study-plans";

export type ProjectMap = Record<string, { junior: ProjectItem[]; pleno: ProjectItem[]; senior: ProjectItem[] }>;

export const ROADMAP_PROJECTS: ProjectMap = {
  frontend: {
    junior: [
      { title: "Vídeo: wbNFh45pceI", description: "https://youtu.be/wbNFh45pceI?si=fG9BwvItjA5pdsCT", techStack: ["YouTube"] },
      { title: "Vídeo: wmM1Y0FTiz8", description: "https://youtu.be/wmM1Y0FTiz8?si=IkEaVrRD_gYjtA_a", techStack: ["YouTube"] },
      { title: "Vídeo: Ab-kGzlCCWI", description: "https://youtu.be/Ab-kGzlCCWI?si=yqKavKeyI2FJQpgs", techStack: ["YouTube"] }
    ],
    pleno: [
      { title: "Vídeo: XXW2KVs8cUQ", description: "https://youtu.be/XXW2KVs8cUQ?si=wmJuqkIW-xKkOU9X", techStack: ["YouTube"] },
      { title: "Vídeo: S-trXOddXMQ", description: "https://youtu.be/S-trXOddXMQ?si=xTNSjEgEE1MvQg2y", techStack: ["YouTube"] },
      { title: "Vídeo: p9NiJ-yj2cQ", description: "https://youtu.be/p9NiJ-yj2cQ?si=-AwYPBp3i2UzLZAi", techStack: ["YouTube"] }
    ],
    senior: [
      { title: "Vídeo: tHbrjCtNx7Q", description: "https://youtu.be/tHbrjCtNx7Q?si=z268CgGdFnFD0rUo", techStack: ["YouTube"] },
      { title: "Vídeo: L6SAAyLwIRE", description: "https://youtu.be/L6SAAyLwIRE?si=P_Fgdw4pmctmLvIT", techStack: ["YouTube"] },
      { title: "Vídeo: JT_aaIEhH2Y", description: "https://youtu.be/JT_aaIEhH2Y?si=s709CpnHaefHGfGg", techStack: ["YouTube"] }
    ]
  },
  backend: {
    junior: [
      { title: "API de Gestão de Tarefas (CRUD)", description: "Uma API REST simples com operações de Criar, Ler, Atualizar e Apagar tarefas, com persistência na base de dados.", techStack: ["Node.js", "Express", "SQLite"] },
      { title: "Autenticação por JWT", description: "Sistema de login e registo seguro utilizando hashing de palavras-passe e tokens JWT.", techStack: ["Express", "Bcrypt", "JWT"] },
      { title: "Web Scraper", description: "Um script que recolhe dados de uma página pública, os formata e guarda em formato JSON ou CSV.", techStack: ["Python", "BeautifulSoup", "Requests"] },
      { title: "Encurtador de URLs", description: "Crie um serviço estilo Bitly, mapeando links longos para strings curtas únicas com persistência em DB.", techStack: ["Node.js", "Express", "MongoDB"] },
      { title: "API de Livraria", description: "Catálogo de livros com rotas de pesquisa, filtragem por gênero, autor e limite de paginação (limit/offset).", techStack: ["Python", "Flask", "PostgreSQL"] },
      { title: "Bot de Discord / Telegram", description: "Programe um bot simples que responda a certos comandos, pesquise dados online ou conte piadas.", techStack: ["Node.js", "Telegraf/Discord.js"] },
      { title: "Registo e Upload de Ficheiros", description: "API que aceite upload de ficheiros de imagem via Multer, grave-os no disco e retorne o link público.", techStack: ["Express", "Multer", "Node.js"] },
      { title: "CLI de Gestão Financeira", description: "Criar uma aplicação executada unicamente por terminal via linhas de comandos para adicionar receitas/despesas.", techStack: ["Python", "Argparse", "CSV"] },
      { title: "Integração a APIs Terceiras", description: "Construa um endpoint que consuma a API do GitHub e retorne um perfil formatado num JSON próprio.", techStack: ["Node.js", "Axios"] }
    ],
    pleno: [
      { title: "API de E-Commerce com Pagamentos", description: "Sistema backend para loja virtual com carrinhos, gestão de inventário e webhook de pagamentos.", techStack: ["NestJS", "PostgreSQL", "TypeORM"] },
      { title: "Serviço de Chat em Tempo Real", description: "Implementação de um servidor de WebSockets para permitir salas de chat em tempo real.", techStack: ["Node.js", "Socket.io", "Redis"] },
      { title: "Microserviço de Notificações", description: "Um serviço desacoplado que consome mensagens de uma fila e envia emails ou SMS.", techStack: ["Go", "RabbitMQ", "SendGrid"] },
      { title: "Plataforma de Reservas / Agendamentos", description: "Sistema com validação de janelas de tempo, garantindo que não há double-booking na base de dados.", techStack: ["Java/Spring Boot", "MySQL", "Hibernate"] },
      { title: "Motor de Busca com Elatiscsearch", description: "Implementar um endpoint que faça pesquisas full-text extremamente rápidas sincronizando a base primária com Elastic.", techStack: ["Node.js", "Elasticsearch", "Postgres"] },
      { title: "Rate Limiting e Cache em API Node", description: "Proteger rotas contra abuso (Rate Limiter) e usar Redis para guardar respostas de queries pesadas por 5 min.", techStack: ["Express", "Redis", "Rate-limiter-flexible"] },
      { title: "Sistema de Subscrição Recorrente (Cron)", description: "Serviço que todos os dias à meia noite verifica faturas pendentes, tenta cobrança e suspende contas.", techStack: ["Node.js", "Node-Cron", "Stripe"] },
      { title: "Serviço Multitenant", description: "API onde cada cliente empresarial tem fluxos de dados separados logicamente no mesmo banco de dados ou schemas diferentes.", techStack: ["NestJS", "PostgreSQL"] },
      { title: "Mapeamento Bi-Direcional GraphQL", description: "Criar uma API GraphQL completa que resolva consultas recursivas e complexas sem instigar N+1 Query Problems.", techStack: ["Apollo Server", "Prisma", "Dataloader"] }
    ],
    senior: [
      { title: "Arquitetura Distribuída Serverless", description: "Desenvolvimento de funções independentes na cloud que escalam automaticamente.", techStack: ["AWS Lambda", "API Gateway", "DynamoDB"] },
      { title: "API GraphQL com Cache Avançado", description: "API complexa que junta várias fontes de dados e implementa estratégias agressivas de caching.", techStack: ["Apollo Server", "GraphQL", "Redis", "PostgreSQL"] },
      { title: "Sistema Baseado em Event Sourcing", description: "Backend para sistema bancário focado na imutabilidade das transações (CQRS e Event Sourcing).", techStack: ["Java/Spring Boot", "Kafka", "PostgreSQL"] },
      { title: "Sistema de Filas Resiliente Multistage", description: "RabbitMQ/Kafka para processar processamentos pesados de imagens com retries infinitos paralelos usando Backoff Exponencial.", techStack: ["Go", "Kafka", "Docker Multi-node"] },
      { title: "API de Alta Disponibilidade (gRPC)", description: "Construção de microserviços comunicando fortemente tipados via Protobufs e gRPC em vez de REST para ganhar performance e reduzir overhead.", techStack: ["Go/Rust", "gRPC", "Protobuf"] },
      { title: "Plataforma Real-Time de Brokerage", description: "Matching engine de lances de compra e venda em tempo de memória para simular uma pequena corretora (Stock Exchange).", techStack: ["C++ / Rust", "Redis", "WebSockets"] },
      { title: "Base de Dados Federada (GraphQL Mesh)", description: "Crie um super-graph agindo como gateway central para 4 microserviços diferentes (REST, GraphQL, gRPC).", techStack: ["Node.js", "GraphQL Mesh", "Apollo Router"] },
      { title: "Sistema Anti-Fraude com Processamento em Streaming", description: "Utilize Apache Flink ou Spark Streaming para analisar milhares de transacções num log em milissegundos sinalizando fraude.", techStack: ["Apache Flink", "Python", "Kafka"] },
      { title: "Arquitetura Hexagonal Extremamente Polida", description: "Construa um monolito em Clean Code completo usando portos/adaptadores que torne a base de dados completamente substituível por ficheiro de texto em 5 min.", techStack: ["NestJS", "DDD", "Clean Architecture"] }
    ]
  },
  fullstack: {
    junior: [
      { title: "Clone Simples do Twitter", description: "App permitindo registo, publicação de tweets e timeline com feed global.", techStack: ["React", "Node.js", "MongoDB"] },
      { title: "App de Gestão Financeira", description: "Permite adicionar receitas, despesas e mostra um balanço mensal com gráficos.", techStack: ["Vue.js", "Express", "PostgreSQL"] },
      { title: "Sistema de Votação em Tempo Real", description: "Criação de enquetes onde os votos são atualizados instantaneamente em todos os clientes.", techStack: ["Next.js", "Socket.io", "Express"] },
      { title: "Calculadora de Calorias", description: "Utilizador insere alimentos, calcula as calorias diárias e o estado é salvo na sua conta com login simples.", techStack: ["React", "Firebase"] },
      { title: "Livro de Receitas Online", description: "Feed de receitas vindas do servidor onde o front end apenas lista e o admin pode adicionar/apagar no DB.", techStack: ["Svelte", "Node.js", "SQLite"] },
      { title: "App de Reservas de Restaurante (V1)", description: "UI para escolher hora e mesa, conectada a uma API local verificando choques de reserva.", techStack: ["HTML/JS/CSS", "PHP", "MySQL"] },
      { title: "App de Diário Pessoal", description: "Diário criptografado antes de ir para a base dados. Cria registo diário de pensamentos. ", techStack: ["React", "Node.js", "Postgres"] },
      { title: "Forum de Discussão Base", description: "Fórum de categorias e posts com comentários. Utilizar session baseada em cookies HTTP-Only.", techStack: ["Next.js", "Prisma", "SQLite"] },
      { title: "Portfólio com CMS Próprio", description: "Portfólio dinâmico onde adiciona projetos numa secção administrativa secreta bloqueada por password.", techStack: ["React", "Express", "MongoDB"] }
    ],
    pleno: [
      { title: "Plataforma de SaaS Simples", description: "Aplicação multi-tenant com gestão de subscrições, autenticação forte e dashboard.", techStack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"] },
      { title: "App de Delivery de Comida", description: "Apps e painéis para restaurantes, clientes e entregadores, gerindo pedidos e tracking de estado.", techStack: ["React Native", "React", "Node.js", "PostgreSQL"] },
      { title: "Clone do Trello", description: "Gestão de projeto visual com quadros, listas e cartões arrastáveis (Drag & Drop), sincronizado com BD.", techStack: ["React", "Redux", "NestJS", "MongoDB"] },
      { title: "E-Commerce Monolítico Completo", description: "Catálogo, carrinho persistente, Wishlist, Reviews com rate, checkout bancário e painel de logística de entrega.", techStack: ["Next.js", "PostgreSQL", "Tailwind"] },
      { title: "Gestão HR de Férias Corporativas", description: "App p/ submissão de aviso prévio de férias, envio de emails para gerentes avaliarem, e gráficos de ausências.", techStack: ["Vue", "Laravel", "MySQL"] },
      { title: "Plataforma E-learning Multimédia", description: "App estilo udemy com progresso de estudante, aulas de vídeo, quizzes, geração de PDFs por curso finalizado.", techStack: ["React", "Django", "PostgreSQL", "AWS S3"] },
      { title: "Google Drive Clone", description: "Interface visual de pastas de sistema. Upload drag-and-drop de pastas com barra de progresso e partilha via Link.", techStack: ["React", "Node.js (Streams)", "MongoDB"] },
      { title: "Sistema de Ticketing (Jira Simples)", description: "Sincronização entre roles de Administrador, Técnico e Cliente com atualizações de ticket com notificações push.", techStack: ["Angular", "Spring Boot", "MySQL"] },
      { title: "Sistema Imobiliário PWA", description: "Classificados de imóveis com mapa interativo contendo alfinetes dos locais. Funciona offline (Lendo última cache).", techStack: ["Next.js", "Leaflet", "PostGIS"] }
    ],
    senior: [
      { title: "Infraestrutura Kubernetes Fullstack", description: "Desenvolvimento e deploy da aplicação modularizada num cluster Kubernetes com pipeline de CI/CD completa.", techStack: ["Docker", "Kubernetes", "Next.js", "Go"] },
      { title: "Plataforma de Video Streaming", description: "Processamento e entrega de vídeos com otimização, CDN e interface de navegação estilo Netflix.", techStack: ["React", "AWS S3", "AWS MediaConvert", "Node.js"] },
      { title: "Motor de Busca com IA", description: "Aplicação que permite pesquisar numa vasta base de documentos utilizando vetores e LLMs.", techStack: ["Python", "FastAPI", "Next.js", "Pinecone", "OpenAI API"] },
      { title: "IDE na Nuvem Completa (Cloud Code Editor)", description: "Construção de um editor visual baseado na web (estilo VS Code online) com execução em Dockers dinâmicos no host.", techStack: ["React", "Monaco Editor", "Node.js", "Docker API"] },
      { title: "Sistema de Video Conferência (WebRTC Mesh)", description: "Zoom Web Clone baseado num servidor Signaling escalável via WebSockets unindo p2p os clientes numa grid de vídeo com partilha de ecrã.", techStack: ["React", "WebRTC", "Socket.io", "Redis"] },
      { title: "E-commerce Headless Distribuído", description: "Arquitetura Jamstack com painel admin Sanity/Contentful gerindo frontends com Gatsby/Next e integrações Shopify Storefront API com serverless.", techStack: ["React", "Sanity", "Shopify GraphQL", "AWS Lambda"] },
      { title: "Arquitetura Fullstack Event-Driven (EDA)", description: "Três microserviços Front-end interligados que geram comandos. Backend recebe pedidos sem ligação assíncrona, atualizando UI apenas com EventStreams.", techStack: ["Next.js", "Kafka", "NestJS", "SSE"] },
      { title: "Motor Multiplayer Em Tempo Real", description: "Construção de lógica de estado autoritativo interpolada ao cliente, resolvendo jitter base em Tick-rates em 60hz entre Node e PhaserJS.", techStack: ["PhaserJS", "NodeJS / C++ addons", "UDP/WebSockets"] },
      { title: "App Multi-Região Global Cloud", description: "Plataforma baseada no conceito Edge, servindo do servidor mais próximo globalmente da AWS CloudFront gerindo réplicas de bases distribuídas planetárias (CockroachDB/Fauna).", techStack: ["React", "Edge Functions", "FaunaDB"] }
    ]
  },
  mobile: {
    junior: [
      { title: "Conversor de Moedas", description: "Um app simples que acessa uma API de câmbio para converter valores entre moedas em tempo real.", techStack: ["React Native", "Fetch API"] },
      { title: "App de Receitas", description: "Lista de receitas puxadas de um JSON local, com navegação entre a lista e a página de detalhes.", techStack: ["Flutter", "Navegação nativa"] },
      { title: "App Lista de Compras (Offline)", description: "App com armazenamento local para não depender da internet.", techStack: ["React Native", "AsyncStorage"] },
      { title: "Quiz de Trivias App", description: "Perguntas de múltipla escolha com temporizador circular animado. Resulta num Score screen.", techStack: ["Kotlin", "Android Views"] },
      { title: "Player de PodCasts Simples", description: "Um leitor que consome RSS feed de um Podcast público, reproduzindo/Pausando MP3 com slider.", techStack: ["Swift", "AVFoundation"] },
      { title: "Climatempo com Geolocalizador Simples", description: "Lê o GPS e retorna Clima de acordo com o latitude. Reage visualmente entre Sol, Chuva e Noite.", techStack: ["Flutter", "Geolocator"] },
      { title: "Calculadora de IMC Interativa", description: "Formulários e sliders nativos, dando estado do Peso (Normal, Obesidade) num chart colorido.", techStack: ["React Native", "UI/UX Simples"] },
      { title: "Pokedex API List", description: "Lista em Grid Infinita de Pokémon usando a PokéAPI. Foco na navegação de tabs e Flatlist performática.", techStack: ["Flutter", "HTTP", "Infinity Scroll"] },
      { title: "Gerador Aleatório de Cor / Design", description: "Tela inteira muda cor no tap e salva histórico em base local. Foca os conceitos de estado básicos.", techStack: ["React Native", "States"] }
    ],
    pleno: [
      { title: "App de Clima com Geolocalização Avançada", description: "Permissão de GPS contínua, guardando métricas de viagens.", techStack: ["React Native", "Geolocalização", "OpenWeather API"] },
      { title: "App E-commerce Mobile", description: "App completa com listagem, carrinho, integração de pagamentos e login social.", techStack: ["Flutter", "Firebase", "Stripe API"] },
      { title: "Clone do Instagram UI", description: "Foco intenso em animações fluidas, stories horizontais e feed virtualizado de alta performance.", techStack: ["React Native", "Reanimated", "FlatList"] },
      { title: "Aplicativo de Chat Push-focused", description: "Mensageria estilo WhatsApp incluindo leitura de estado enviado, entregue e Firebase Cloud Messaging Push Notices no BG.", techStack: ["Kotlin", "FCM", "Firebase Realtime"] },
      { title: "Tinder Clone Swipe Mechanics", description: "UI complexa baseada em gestos e pan responder, recriando as animações de cartões da Tinder perfeitamente.", techStack: ["React Native", "GestureHandler", "Reanimated"] },
      { title: "Health Tracker Híbrido", description: "Acede aos senssores nativos do telefone como contador de passos, persistindo curvas gráficas usando sqlite para registo histórico.", techStack: ["Flutter", "Pedometer Lib", "SQLite"] },
      { title: "App de Viagens (Maps Poligonal)", description: "Google Maps embutido desenhando rotas de polígonos sobre ruas e calculando Distâncias entre ponto A/B via Google Directions API.", techStack: ["React Native", "React Native Maps"] },
      { title: "Scanner OCR de Faturas Nativo", description: "Usa a Câmera nativamente, tira uma foto, utiliza IA MLKit para tentar extrair os valores e Totais duma fatura e insere no formulário auto-completado.", techStack: ["Swift", "VisionKit"] },
      { title: "Delivery Tracking Clone (UberEats)", description: "Simulação do mapa de delivery em tempo real animando a transição do icon do motoboy do ponto de início ao cliente fluentemente.", techStack: ["Flutter", "Google Maps", "WebSockets"] }
    ],
    senior: [
      { title: "App de Chat Offline-First com Filas", description: "Mensagens sincronizadas assim que volta a rede, usando BD local resiliente como WatermelonDB.", techStack: ["React Native", "WatermelonDB", "WebSockets"] },
      { title: "Módulo Nativo Bruto", description: "Criação de código Swift/Kotlin para aceder a hardware específico não disponível nas APIs React Native/Flutter.", techStack: ["Kotlin/Swift", "JNI/Bridges React Native"] },
      { title: "App de Streaming com PiP", description: "App de vídeo com funcionalidades avançadas como Picture in Picture, Cast para TV e background audio.", techStack: ["Flutter", "ExoPlayer/AVPlayer", "Background Tasks"] },
      { title: "Super App Plataforma", description: "Uma App mãe que através de Feature Flagging carrega dinamicamente \"Mini Apps\" baixados on the fly da cloud burlando o size limits da Store baseada em Modularização Profunda.", techStack: ["SwiftUI / Kotlin Compose", "Dynamic Feature Modules"] },
      { title: "Animação Computacional Avançada de 60fps (Skia)", description: "Usar o Canvas/Skia engine do React Native/Flutter para renderizar de gráficos pesadíssimos sem tocar a camada UI do SO nativo batendo os 60 FPS estritas.", techStack: ["React Native", "React Native Skia", "Reanimated"] },
      { title: "Carteira Criptográfica Nativa Descentralizada", description: "Proteção ultra-segura nativa. Gerir keys via Secure Enclave / Keystore, integração Biometrica obrigatória para autorizar transações na blockchain e Web3.", techStack: ["Flutter", "Web3Dart", "Biometrics"] },
      { title: "Pipeline Custom CICD p/ iOS/Android", description: "Construção de uma infraestrutura em Fastlane pura que trata de TestFlight, Beta Tracks, e Geração Auto. de Screenshots na PlayStore do Build numa máquina Mac Mini externa.", techStack: ["Fastlane", "Ruby", "Github Actions"] },
      { title: "Game Engine Num Wrapper", description: "Adicionar uma secção gráfica desenvolvida inteiramente com C++ e Vulkan/Metal encapsulada num wrap nativo iOS para um mini-jogo interno imersivo.", techStack: ["C++", "Metal", "JNI"] },
      { title: "Reconhecimento Em Tempo Real e AR", description: "Construa um Try-On de E-commerce. Renderização ARKit projetando móveis sobre o chão lido pela Lidar da câmara via AR.", techStack: ["Swift", "ARKit", "RealityKit"] }
    ]
  },
  devops: {
    junior: [
      { title: "Dockerizar uma Aplicação", description: "Pega numa app Fullstack (Node+React) existente e cria Dockerfiles otimizados e o docker-compose.", techStack: ["Docker", "Docker Compose"] },
      { title: "Pipeline Simples de CI", description: "Criação de uma action do GitHub para correr lints e testes em cada novo Pull Request.", techStack: ["GitHub Actions", "Shell Script"] },
      { title: "Automação com Bash e Cron", description: "Script simples em linux que faz backup de uma BD e envia para cloud via FTP a cada noite.", techStack: ["Bash", "Linux", "Cronjob"] },
      { title: "Hostear Static WebNum VPC Privado", description: "Servir uma Landing Page Nginx escondida duma VPC, conectando-a a internet por Elastic IPs num servidor Ubuntu base.", techStack: ["AWS EC2", "VPC", "Nginx"] },
      { title: "Notificador Slack na Pipeline", description: "Integrar Webhooks do Slack p/ reportar à Taskbar os Builds falhados e Boms feitos da Pipeline do GitLab ou GH Action.", techStack: ["GitLab CI", "Slack API", "Bash"] },
      { title: "Setup Local LAMP vs LEMP Stack", description: "Automatize num Vagrant/Bash a criação dum setup para devs de forma rápida subindo PHP, Nginx/Apache MySQL em instantes via uma linha.", techStack: ["Vagrant", "Ansible Básico"] },
      { title: "Rotatividade de Logs Simplificada", description: "Gerir uma máquina linux cujos logs crescem infinitamente utilizando e agendando o Logrotate.", techStack: ["Linux SysAdmin", "Logrotate"] },
      { title: "Criação de SSL Automático Certbot", description: "Habilitar e provisionar certificados Let's Encrypt de graça com script automático Cron para Auto-Renew no Crontab Nginx.", techStack: ["Certbot", "Nginx", "Linux"] },
      { title: "Registo e Criação User via Script", description: "Um shellscript pedindo parâmetros e automatiza criações de users linux configurando a pasta Home/Permissões root SSH keys para eles subirem chaves remotamente via rsync.", techStack: ["Shell Scripting"] }
    ],
    pleno: [
      { title: "Infra as Code na AWS via Terraform", description: "Levantar VPC, Subredes, EC2 e RDS apenas com código Terraform, sem usar a consola AWS.", techStack: ["Terraform", "AWS CLI"] },
      { title: "Stack Completa de CI/CD", description: "Passar código desde um merge do Git até Deploy seguro, passando por scanners de segurança de container e ambiente de homologação.", techStack: ["GitLab CI/CD", "SonarQube", "Ansible"] },
      { title: "Observabilidade Centralizada Elk/Prometheus", description: "Instalar agentes num servidor que extraiam logs e métricas de sistema para um painel visual.", techStack: ["Prometheus", "Grafana", "Node Exporter"] },
      { title: "GitOps num Docker Swarm Stack", description: "Cria um swarm de Dockers balanceados rodando um container. Adiciona auto-healing sem k8s ainda, apenas orquestrando Swarm CLI ou Traefik Proxy Dinâmico.", techStack: ["Docker Swarm", "Traefik"] },
      { title: "Terraform Cloud Workspaces Estruturados", description: "Estruturar workspaces num projeto Terraform Multi-Ambiente: Dev usa t2.micro DB / Prod usa x-Large RDS separados via variaveis seguidas do plano DRY.", techStack: ["HCL (Terrraform)", "AWS RDS", "IAM Roles"] },
      { title: "Ansible Configuration Mgmt Master", description: "Use o Ansible Tower ou Playbooks locais para ir num pulo a 5 máquinas centOS da empresa provisionando todo um ecossistema Java de uma vez e sem toques em ssh manual.", techStack: ["Ansible", "YAML Playbooks"] },
      { title: "Canary Deployment com NGINX Dinâmico", description: "Escrever roteamento custom que dirija 10% do tráfego p/ v2 e 90% p/ v1 da sua API de forma manual e segura via Load Balancing weights.", techStack: ["Nginx", "Linux Load Balancing"] },
      { title: "Pipeline Backup e Restauro Cloud", description: "Terraform num Bucket com um workflow serverless rodando em Lambda python que arquiva DB Snaps de retenção 30 dias na camada IA do Amazon.", techStack: ["AWS Lambda", "S3 Lifecycle", "Python"] },
      { title: "Serviço Elastic Kubernetes (EKS Básico)", description: "Provisione um Cluster k8s em cloud gerida e faça Deploy via Helm dum wordpress completo com Persistent Volumes ligados à nuvem.", techStack: ["Helm", "EKS / AKS", "Kubectl"] }
    ],
    senior: [
      { title: "Arquitetura Kubernetes Multizona HA", description: "Montar cluster altamente disponível em K8s rodando microserviços, Ingress Controllers e Cert-Manager.", techStack: ["Kubernetes", "Helm", "Istio"] },
      { title: "GitOps Absoluto com ArgoCD", description: "Qualquer mudança em produção é feita baseada em merges num repositório Git, o Argo sincroniza.", techStack: ["ArgoCD", "Kubernetes", "Git"] },
      { title: "Pipeline de DevSecOps Avançada", description: "Auditorias estritas e auto-reparadoras, incluindo Dynamic Testing (DAST) em deployments e compliance.", techStack: ["Trivy", "OWASP ZAP", "Terraform Cloud"] },
      { title: "Service Mesh Distribuida Segura", description: "Integrar Consul ou Istio no Cluster para injectar Sidecards em cada pod de forma a tráfego MTLS nativo e resiliência via Circuit Breaker interno.", techStack: ["Service Mesh", "Istio/Linkerd", "mTLS"] },
      { title: "Chaos Engineering Game Day", description: "Ferramenta para propositalmente matar nós em produção da base (Gremlin / Chaos Monkey) certificando recuperação e alertando PagerDuty corretamente via Datadog.", techStack: ["Datadog", "Chaos Mesh", "PagerDuty"] },
      { title: "Estratégia FinOps Cloud", description: "Otimização absoluta: Escreva código que varre EC2 desligadas e escala Nodes baseados em Sposts Requests de forma preventiva reduzindo $ gastos mensal.", techStack: ["AWS Cost Explorer", "Python", "Kubernetes Autoscaler"] },
      { title: "Arquitetura 100% Imutável BGP Networking", description: "Implementação via IaC de redes avançadas, peering VPN cross-regional BGP c/ AWS Transit Gateway multi contas isolando blast radius total.", techStack: ["Transit Gateway", "Terraform", "VPN IPsec"] },
      { title: "Gerir Múltiplas Plataformas Cross-Cloud", description: "Deploy de API em Azure, DB na GCP e CDN da AWS unidas através do Terraform para evitar o conceito Vendor Lockin corporativo da agência.", techStack: ["Azure DevOps", "Multi-Cloud Mgmt", "Terraform"] },
      { title: "Criar Operador Kubernetes (CRD)", description: "Programe em Go o seu próprio controlador Kubernetes Extendendo K8s com Custom Resource Definitions do operador que instancie infra custom da empresa num pod manifesto.", techStack: ["K8s Operators", "Go", "Operator SDK"] }
    ]
  },
  datascience: {
    junior: [
      { title: "Previsão de Salários (Regressão Linear)", description: "Criação de um modelo de regressão linear para estimar salários baseados em anos de experiência a partir da BD do Kaggle.", techStack: ["Python", "Scikit-Learn", "Pandas"] },
      { title: "Análise Exploratória Dataset E-Commerce", description: "Limpeza de dados, tratamento de nulos e criação de dashboards em Jupyter com gráficos para obter insights de vendas.", techStack: ["Python", "Seaborn", "Jupyter"] },
      { title: "Segmentação de Clientes supermercado", description: "Utilização do K-Means (Unsupervised Learning) para dividir os clientes por grupo comportamental.", techStack: ["Scikit-Learn", "Matplotlib"] },
      { title: "Web Scraper p/ Dataset Próprio", description: "Utilize Requests e BeautifulSoup para arrancar uma tabela não formatada da net para compilar num Pandas limpo em CSV analítico.", techStack: ["BeautifulSoup", "Pandas"] },
      { title: "Visualização PowerBI p/ Negócios", description: "Dashboard puramente estatístico via drag-and-drop modelando factos e dimensões dum Excel do Supermercado sujo ao máximo p/ Relatórios gerenciais.", techStack: ["PowerBI", "DAX", "PowerQuery"] },
      { title: "Painel Dinâmico Simples via Streamlit", description: "Passe o seu modelo regressão / explorativo via código e crie 3 linhas em Streamlit num site que partilhar a terceiros de fora online com base em clicks simples.", techStack: ["Streamlit", "Python"] },
      { title: "Trincheira de Limpeza NLP", description: "Pegue dados de tweets, limpe RegEx as '@', URLS e emojis normalizando as stop words da Língua para um gráfico de Barra palavras mais usadas diárias.", techStack: ["RegEx", "NLTK", "Matplotlib"] },
      { title: "Classificar Pinguins e Flores", description: "Os datasets famosos Palmer Penguins e Iris. Treine randomForest/Decision Tree e extraia Confusion Matrix para medir a sua acuracidade básica iniciante.", techStack: ["Scikit-learn", "Decision Trees"] },
      { title: "Query e Sumário com SQL Estatístico", description: "Puxe do PostgreSQL dados pesados. Converta em Histograma. Faça ROLLUPS transacionais gerando relatórios de agregações temporais de DB puras no ar.", techStack: ["PostgreSQL", "SQL Window Functions"] }
    ],
    pleno: [
      { title: "Churn de Telecomunicações Avançado", description: "Prever probabilidade de um cliente cancelar serviço usando Gradient Boosting (XGBoost ou LightGBM).", techStack: ["Python", "XGBoost", "SMOTE"] },
      { title: "Simples Sistema de Recomendação", description: "Criação de filtros colaborativos para recomendar conteúdo aos utilizadores (Semelhante à Netflix inicial).", techStack: ["Surprise Lib", "Pandas", "Scikit-Learn"] },
      { title: "Análise de Sentimentos NLP (TF-IDF)", description: "Extrair comentários do Twitter, vetorizar as palavras (TF-IDF) e prever positividade ou negatividade emocional.", techStack: ["NLTK", "Spacy", "Scikit-Learn"] },
      { title: "Deploy Prático MVP FastAPI", description: "Projetar a infraestrutura básica onde o seu Scikit-Learn vai parar na web encasupulando Inference Predict atrás de FastApi num .pkl", techStack: ["Pickle/Joblib", "FastAPI"] },
      { title: "Pipeline ETL c/ Apache Airflow Simples", description: "Crie um Grafo Direcional Assíncrono (DAG). Agende para que baixe 1 excel dia sim/não insira DB e de seguida despolete notificação Python se erro.", techStack: ["Airflow", "Python Scripts"] },
      { title: "Engenharia de Features Fina", description: "Pega no Dataset Titanic, porém use WoE binário e técnicas avançadas de substituição sem média ou mediana burra (KNN Imputer). Submeta Score alto a Kaggle.", techStack: ["Feature Engineering", "KNNImputer"] },
      { title: "Séries Temporais ARIMA", description: "Prever o nível de stock de loja no mês que vem utilizando StatsModels auto ARIMA sobre o dataset retrospectivo dos últimos 10 anos.", techStack: ["StatsModels", "ARIMA", "Pandas"] },
      { title: "A/B Testing Robusto p/ Marketing", description: "Conduza cálculos do P-value estatísticos no rigor do t-test num set onde 5% utilizadores receberam a UX verde vs UX roxa e decida qual converteu veridicamentE sem adjetos via Python Scipy.", techStack: ["Scipy", "Estatítica Clássica"] },
      { title: "Reconhecedor Dígitos Manuscritos CNN", description: "Dataset MNIST. Monte rede convolucional miniatura 3 camadas com Keras/TensorFlow. Faça UI Paint brush simples onde vc pinta o input a preto.", techStack: ["TensorFlow", "JS Paint API"] }
    ],
    senior: [
      { title: "Redes Neurais Multicamada / Visão", description: "Identificação de tipo de doenças a partir de Raio-X pulmonar usando PyTorch", techStack: ["PyTorch", "CNNs", "Torchvision"] },
      { title: "Deploy Contínuo MLOps", description: "Estutura onde o modelo é monitorado em produção Mflow, inferência por FastAPI Dockerizado e sistema avisa sob de Data Drift temporal.", techStack: ["MLflow", "FastAPI", "Docker"] },
      { title: "Finetuning de LLM open-source (LoRA)", description: "Refinar um modelo LLaMA-3 open-source base nos dados confidenciais específicos empresariais via Hugging face.", techStack: ["Hugging Face", "PyTorch", "PEFT"] },
      { title: "Pipeline de Big Data Terabytes (PySpark)", description: "Migração duma DB colossal paralisando instâncias Amazon EMR Spark a mapear Map-Reduce filtrando dados JSON Pedaçados em Cloud Storage AWS p/ Parquet Analytics.", techStack: ["PySpark", "AWS EMR", "Parquet"] },
      { title: "Arquitetura RealTime Analytics Pub/Sub", description: "Painel Dash de telemetria lendo fluxo infidável via Google Pub/Sub consumido c/ Apache Beam/DataFlow escrevendo Data Warehouse de BigQuery p/ ML inferir sob streaming windowed.", techStack: ["GCP DataFlow", "Apache Beam", "BigQuery"] },
      { title: "RL Models (Reinforcement Learning)", description: "Implementar agente que treina a si próprio com o Gym Engine aprendendo mecânicas num SuperMario ou a balancear portfólios no mercado financeiro via recompensas em Q-Learning.", techStack: ["OpenAI Gym", "PyTorch", "RL"] },
      { title: "Computer Vision Tracker em Vídeo Bruto", description: "OpenCV junto com YoloV8 tracking objetos numa passadeira. Countar carros em movimento traçando caixas que retêm IDs persistidos fotograma sim fotograma não.", techStack: ["YoloV8", "OpenCV", "ByteTrack"] },
      { title: "Sistemas RAG Avançados (Vector DBs)", description: "Aplicação avançada AI. Injete documentação de PDFs técnicos no PineCone vector db e crie o seu Q&A LangChain chatbot que puxa passagens cirurgicas de cota para embasar respostas RAG seguras no GPT.", techStack: ["LangChain", "PineCone", "OpenAI"] },
      { title: "AutoML Próprio Custom", description: "Código mestre pipeline que devora os datasets submetidos cruzando hiperparâmetros GridSearch via Optuna debaixo de pano, cuspindo o champion model gerando relatórios PDF automaticos via reports de precisão e roc curves", techStack: ["Optuna", "Sklearn Pipelines"] }
    ]
  },
  uiux: {
    junior: [
      { title: "Redesign de Landing Page Existente", description: "Pega numa página de um serviço público com má UX e propõe um redesign puro usando AutoLayout no Figma.", techStack: ["Figma", "Design Visual Sólido"] },
      { title: "Fluxo de Login Mobile com Onboarding", description: "Wireframing completo e passo a passo UI para um App (Registo, Confirmação de Email, Perfil).", techStack: ["Figma", "Prototipagem"] },
      { title: "Mini Design System Básico", description: "Criação de Variáveis (Cores, Tipografia, Espaçamentos) e botões Base (Hover, Active, Disabled).", techStack: ["Figma Variables", "Componentes"] },
      { title: "Clone de Tela Principal da App AppStore", description: "Estudar sombras de maçã iOS, gradients minimalistas focados em Typography Hierarchy e tentar recriar pixeis visuais fiéis.", techStack: ["Figma UI Patterns", "iOS Guidelines"] },
      { title: "Componentes Interativos Hover States", description: "Fazer Variant Sets em Figma em que o utilizador simula navegação no cursor Hover sobre Toggle e switches para treinar component states.", techStack: ["Figma Interactive Components"] },
      { title: "Análise Heurística de uma App Diária", description: "Pegue no ecrã de um banco como o BAI e crie um documento assinalando com caneta vermelha 10 leis de Nielsen violadas para apresentação.", techStack: ["UX Research", "Neilson Heuristics", "PDF Report"] },
      { title: "Mapeamento Arquitetura Info (Card Sorting)", description: "Utilize uma app free Miro. Pegue em 50 categorias de um grande E-commerce e refaça a árvore estrutural num Sitemap bem formatado e lógico pra humanos", techStack: ["Miro/Whimsical", "Information Architecture"] },
      { title: "Wireframes Low-Fidelity p/ Blog", description: "Desenhe layouts rápidos em ecrã Web apenas em traços brancos, cinzentos para aprovar o posicionamento de uma revista blog noticioso antes de colorar.", techStack: ["Balsamiq", "Figma Low-Fi"] },
      { title: "Portfolio Pessoal no Notion/Framer", description: "Estruture o seu CV de Design online sem programar, focando apenas no bom gosto das margens, da disposição dos cases em NoCode Builders visuais.", techStack: ["Framer", "Notion", "Layout Design"] }
    ],
    pleno: [
      { title: "Case Study App Bancário End-to-End", description: "Pesquisa (Personas, Benchmarking), Jornada de Usuário do fluxo de Transferência e Mockups Alta Fidelidade culminados como apresentação Medium.", techStack: ["Figma", "Research", "FigJam/Miro"] },
      { title: "Dashboards Complexos SaaS B2B", description: "Focar em Hierarquia de dados densos, Gráficos organizados e manipulação de Filters Massivos na Experiência Web administrativa de uma corporação.", techStack: ["Figma AutoLayout Avançado", "Tabelas e Grids"] },
      { title: "Micro-Animações Custom c/ Prototipagem", description: "Navegação rica entre ecrãs, estados de carregamento criativos interactivos usando Smart Animates puros imitando fluxos nativos do iPhone a dedo e swiping horizontal da nav bar", techStack: ["Figma Smart Animate", "Prototipagem Alta Fidelidade"] },
      { title: "Teste de Usabilidade Real em Protótipo", description: "Convide 5 pessoas conhecidas sem contexto. Dê instrução 'Compre um sapato neste protótipo que desenhei' e grave com Google Meet monitorizando pausas erradas e dead-clicks refazendo interface baseado nisto.", techStack: ["User Testing", "Maze / Hotjar"] },
      { title: "UX Writing Guideline de uma App de Fitness", description: "Refazer uma app fitness focando unicamente na linguagem dos modais. Tons de encorajamento em vez de 'Erro 404', 'Você perdeu!' e criar o guia do tom de voz.", techStack: ["UX Writing", "Content Strategy"] },
      { title: "Acessibilidade Universal Color Blind Tooling", description: "Teste a palete que construiu ao Figma num plugin ColorBlind, adicione Focus states lógicos Keyboard, verifique rácios WCAG do texto vs bg (>=4.5:1) nas tabelas inteiras SaaS gerando doc de auditoria formal.", techStack: ["Figma Plugins", "WCAG 2.1"] },
      { title: "Design System Escalonado Component Level 2", description: "Elaborar de forma genérica Dropdowns auto dimensionais, Inputs c/ auto prefixos e ícones trocáveis via instâncias e Props Booleanos c/ Tokens JSON p/ devs consumirem via Git.", techStack: ["Figma Properties", "Design Tokens"] },
      { title: "Landing Page High-Converting StartUp Mística", description: "Construa secções focadas com prova social no local certo, formulário curto Above the Fold testando A/B design para reter o olhar numa Call-To-Action chamativa com gradients Lottie Files.", techStack: ["CRO (Conversion Rate Optimization)", "Lottie Files"] },
      { title: "Service Blueprint de uma Cadeia de Hoteis", description: "Mapeamento em matriz não só da jornada cliente mobile num quarto, mas a linha de invisibilidade do staff na Backstage limpando quartos interconectados via App do funcionário simultaneamente.", techStack: ["Service Design", "Blueprint Mapping"] }
    ],
    senior: [
      { title: "Design System Enterprise / DesignOps", description: "Obras Maciças. Escalar bibliotecas de design a serem consumidas por 10 equipas externas com forte versionamento do figma (branching) e governança.", techStack: ["Figma Enterprise", "Tokens.studio", "Branching"] },
      { title: "Auditoria Rigorosa WCAG / Heurísticas Escala Global", description: "Analisar uma grande plataforma internacional com centenas de views sob uma base extrema multi cultural (RTL Arabico e LTR Latino) com leitura de software adaptativa", techStack: ["WCAG 2.2 Padrões Mestre", "Globalização e Acessibilidade"] },
      { title: "Estratégia UX Focada ao CRO A/B-Testing Analytics", description: "Reformular um fluxo colapsante de Carrinho Drop-off baseando-se em métricas de HeatMaps simulados Analytics puros; Proposta Orientada a ROI para diretores C-Level defendendo lucro da empresa perante as decisões artísticas.", techStack: ["Design Strategy", "Data-Driven Design", "Mixpanel"] },
      { title: "Design de Sistemas AR/VR Visuais UI Spatial", description: "Como mapear UI botões nos Apple Vision Pro. Criar protótipos focando no Field of View humano ergonomico tridimensional e como e quando interfaces se sobreclicam com interações de olhar tracking.", techStack: ["Spatial Design", "VisionOS Guidelines", "Figma 3D Tools"] },
      { title: "Gerir Handoff Massivo via Storybook/DevOps", description: "Integração viva: O vosso Figma emite um novo publish, Github webhook dispara código CSS, Tailwind Theme e compila Design Tokens brancos via API sem developers tocarem a config de paletes garantindo fidelidade de Single Source of truth absurda.", techStack: ["DesignOps Automation", "Style Dictionary", "Figma Rest API"] },
      { title: "Estratégia Gamification Complexa e Hook Model", description: "Desenvolver a engenharia reversa psicológica num Duolingo / Habit Tracker duma app cliente onde a dopamina é servida nos painéis sob UX Rewards invisiveis e Retenção é triplicada nos 30 dias de uso da feature engenhada estrategicamente para voltar amanhã (Hooks).", techStack: ["Engajamento", "Hook Model", "Behavioral Design"] },
      { title: "Design de Voz VUI de Interfaces Invisíveis (Alexa)", description: "Projetar interações sem toque. Guiões ramificados de fallback via voz onde um utente tenta pagar na App do Carro apenas usando fala. Onde a máquina prevê erros na pronuncia local de slang do mercado e tem fallback graciosos em áudio sem ecrãs.", techStack: ["VUI Strategy", "Dialogue Flow", "Ergonomia Cognitiva"] },
      { title: "Modelagem Preditiva de UX Em Múltiplas Plataformas Simultanêas", description: "Como a app se comporta no Apple Watch, continua no TV app sem fio e acaba no iPhone. A jornada Unificada de handoffs inter-device e a prototipagem destas interfaces hibridas como Ecosystem Designer principal do projeto IoT complexo de casa inteligente (Sensores).", techStack: ["Ecosystem Mapping", "Omnichannel Journey", "IoT Wearables Prototyping"] },
      { title: "Liderança Ágil, Facilitação Design Sprint Completo", description: "Orquestrar dores de negócio 5 dias inteiros com stakeholders (CTO, CEO, Atendimento), mapear Crazy 8s, conduzir votações silenciosas e culminar num Protótipo Valido testado e aceite por board sem abrir um IDE de código uma unica vez de todo.", techStack: ["Design Sprint Facilitation", "Agile Leadership", "Executive Management"] }
    ]
  },
  cloud: {
    junior: [
      { title: "Deploy de Site Estático na Nuvem", description: "Hospede um site estático em um bucket público e configure CDN básica para entrega rápida.", techStack: ["AWS S3", "CloudFront"] },
      { title: "VPC Simples com EC2", description: "Crie uma VPC com subnets públicas/privadas e lance uma instância EC2 acessível por SSH com regras de security groups.", techStack: ["AWS VPC", "EC2", "IAM"] },
      { title: "Função Serverless com API Gateway", description: "Implemente uma função Lambda acionada por uma API Gateway para servir respostas JSON.", techStack: ["AWS Lambda", "API Gateway", "Serverless"] },
      { title: "IaC Básico com Terraform", description: "Versione infraestrutura simples com Terraform: instâncias, bucket e policies em código.", techStack: ["Terraform", "AWS CLI"] },
      { title: "Monitorização de Métricas Cloud", description: "Configure alarmes e dashboards de CPU, memória e latência usando CloudWatch ou equivalente.", techStack: ["CloudWatch", "Grafana"] },
      { title: "Gestão de IAM e Permissões", description: "Crie políticas least-privilege, users e roles, e teste acessos restritos de forma segura.", techStack: ["IAM", "AWS CLI"] }
    ],
    pleno: [
      { title: "Aplicação Web em ECS / Cloud Run", description: "Deploy de um serviço web contêinerizado com balanceamento de carga e autoscaling.", techStack: ["AWS ECS", "Docker", "Load Balancer"] },
      { title: "Pipeline IaC com Terraform", description: "Crie um workflow que provisiona infraestrutura automaticamente ao mergear no repositório.", techStack: ["Terraform", "GitHub Actions"] },
      { title: "Arquitetura com RDS e S3", description: "Implemente um backend completo usando storage de objetos e banco de dados relacional em nuvem.", techStack: ["RDS", "S3", "IAM"] },
      { title: "Rede Híbrida com VPC Peering", description: "Conecte duas VPCs segregadas e valide comunicação segura entre elas.", techStack: ["VPC Peering", "Route Tables"] },
      { title: "DR e replicação cross-region", description: "Configure replicação entre regiões e teste failover simples para alta disponibilidade.", techStack: ["S3 Replication", "Route 53"] },
      { title: "Serverless Event-Driven App", description: "Crie um pipeline que dispara funções via eventos de upload e processa dados em lote.", techStack: ["S3", "Lambda", "EventBridge"] },
      { title: "Orçamento de custos em nuvem", description: "Configure alertas de orçamento na nuvem para não ultrapassar limites mensais.", techStack: ["AWS Budgets", "Cost Explorer"] }
    ],
    senior: [
      { title: "Multi-região de Alta Disponibilidade", description: "Projete e execute uma arquitetura resiliente distribuída em várias regiões.", techStack: ["Route 53", "EKS", "CloudFront"] },
      { title: "GitOps em Kubernetes", description: "Utilize Argo CD ou Flux para sincronizar estado do Git com o cluster Kubernetes.", techStack: ["Argo CD", "Kubernetes", "Terraform"] },
      { title: "Central de Observabilidade", description: "Construa dashboards e tracing distribuído para toda a infraestrutura.", techStack: ["Grafana", "Prometheus", "Jaeger"] },
      { title: "Arquitetura de dados em streaming", description: "Implemente ingestão de eventos e processamento quase em tempo real na nuvem.", techStack: ["Kinesis", "Lambda", "S3"] },
      { title: "Segurança cloud com WAF e políticas", description: "Adicione regras de web application firewall e políticas de rede para proteger serviços.", techStack: ["WAF", "Security Groups", "IAM"] },
      { title: "FinOps e otimização de custos", description: "Rastreie custos, identifique desperdícios e automatize ações de redução de despesas.", techStack: ["Cost Explorer", "Lambda", "Terraform"] },
      { title: "Failover multi-cloud", description: "Configure réplicas e rotas para manter serviços ativos mesmo se uma cloud falhar.", techStack: ["Terraform", "DNS Failover", "Multi-Cloud"] }
    ]
  },
  security: {
    junior: [
      { title: "Scan OWASP Básico", description: "Execute um scanner OWASP ZAP em uma aplicação web e corrija as vulnerabilidades encontradas.", techStack: ["OWASP ZAP", "Web App"] },
      { title: "Hardenização de Servidor", description: "Aplique configurações seguras em um servidor Linux e bloqueie portas desnecessárias.", techStack: ["Linux", "SSH", "Firewall"] },
      { title: "Autenticação Segura com MFA", description: "Implemente login com JWT, cookies seguros e autenticação multifator.", techStack: ["JWT", "MFA", "Node.js"] },
      { title: "Análise de Tráfego com Wireshark", description: "Capture e analise pacotes HTTP/S para entender o comportamento de rede de uma aplicação.", techStack: ["Wireshark", "TCP/IP"] },
      { title: "Proteção de Dados em Repouso", description: "Crie um fluxo de armazenamento criptografado de dados sensíveis no banco de dados.", techStack: ["AES", "PostgreSQL"] },
      { title: "Políticas de Acesso Least Privilege", description: "Defina roles e permissões que garantam o mínimo acesso necessário aos recursos.", techStack: ["IAM", "RBAC"] }
    ],
    pleno: [
      { title: "Pipeline SAST/DAST", description: "Adicione análise estática e dinâmica ao pipeline de CI/CD para identificar problemas de segurança antes do deploy.", techStack: ["Snyk", "OWASP ZAP", "GitHub Actions"] },
      { title: "Threat Modeling STRIDE", description: "Mapeie ameaças e defina contramedidas usando o modelo STRIDE em uma aplicação real.", techStack: ["Threat Modeling", "Data Flow Diagrams"] },
      { title: "Playbook de Resposta a Incidentes", description: "Documente um processo de detecção, análise e mitigação de incidentes de segurança.", techStack: ["Incident Response", "Runbooks"] },
      { title: "SIEM Simples", description: "Configure um sistema de logs centralizado para detectar atividades suspeitas e gerar alertas.", techStack: ["ELK", "Splunk", "SIEM"] },
      { title: "Hardenização de Kubernetes", description: "Aplique políticas de segurança e escaneie imagens para um cluster Kubernetes protegido.", techStack: ["Kubernetes", "Trivy", "OPA"] },
      { title: "Scanner de Vulnerabilidades de Container", description: "Automatize a análise de imagens Docker e bloqueie builds inseguros.", techStack: ["Trivy", "Clair", "Docker"] },
      { title: "API Gateway Seguro", description: "Construir proxy de APIs com políticas de autenticação e controle de acesso.", techStack: ["API Gateway", "JWT", "RBAC"] }
    ],
    senior: [
      { title: "Zero Trust Network", description: "Projete segmentação de rede e políticas de identidade para um ambiente sem confiança implícita.", techStack: ["Zero Trust", "mTLS", "Network Segmentation"] },
      { title: "SIEM Corporativo e Correlation", description: "Implemente ingestão de logs, correlação de eventos e alertas de detecção avançada.", techStack: ["Splunk", "ELK", "SIEM"] },
      { title: "mTLS em Service Mesh", description: "Implemente criptografia serviço a serviço em um cluster com Istio ou Linkerd.", techStack: ["Istio", "mTLS", "Kubernetes"] },
      { title: "Simulação Red/Blue Team", description: "Conduza um exercício de ataque e defesa para validar as respostas e controles internos.", techStack: ["Penetration Testing", "Blue Team"] },
      { title: "Compliance Automation", description: "Automatize auditorias de GDPR/PCI e gere relatórios de conformidade.", techStack: ["Compliance", "Audit Scripts"] },
      { title: "Gestão de Segredos com Vault", description: "Implemente um cofre de segredos e integre em pipelines e aplicações em produção.", techStack: ["HashiCorp Vault", "Kubernetes Secrets"] },
      { title: "Chaos Security Tests", description: "Crie testes que simulam ataques e falhas de segurança para validar resiliência do sistema.", techStack: ["Chaos Engineering", "Security Testing"] }
    ]
  }
};
