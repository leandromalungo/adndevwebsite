
import { Question, CareerType, CareerInfo } from '@/data/types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "O que mais te atrai em um novo projeto?",
    description: "Escolha a atividade que faz seus olhos brilharem logo de cara.",
    options: [
      { id: '1a', text: "Criar interfaces visuais bonitas e interativas", weights: { [CareerType.FRONTEND]: 3, [CareerType.UX_UI]: 2 } },
      { id: '1b', text: "Construir a lógica complexa e APIs robustas", weights: { [CareerType.BACKEND]: 3 } },
      { id: '1c', text: "Extrair insights valiosos de grandes conjuntos de dados", weights: { [CareerType.DATA_IA]: 3 } },
      { id: '1d', text: "Entender as dores do usuário e definir a visão do produto", weights: { [CareerType.PRODUCT]: 3, [CareerType.UX_UI]: 1 } }
    ]
  },
  {
    id: 2,
    title: "Como você prefere resolver um problema difícil?",
    description: "Sua abordagem diz muito sobre sua mentalidade técnica.",
    options: [
      { id: '2a', text: "Testando diferentes componentes visuais até ficar perfeito", weights: { [CareerType.FRONTEND]: 2, [CareerType.UX_UI]: 2 } },
      { id: '2b', text: "Analisando logs, performance e fluxos de dados no servidor", weights: { [CareerType.BACKEND]: 3 } },
      { id: '2c', text: "Usando estatística e algoritmos para encontrar padrões", weights: { [CareerType.DATA_IA]: 3 } },
      { id: '2d', text: "Conversando com stakeholders para priorizar o que importa", weights: { [CareerType.PRODUCT]: 3 } }
    ]
  },
  {
    id: 3,
    title: "Qual dessas ferramentas você tem mais curiosidade de dominar?",
    description: "Ferramentas são extensões das nossas habilidades.",
    options: [
      { id: '3a', text: "Figma e Adobe XD para prototipagem", weights: { [CareerType.UX_UI]: 3, [CareerType.FRONTEND]: 1 } },
      { id: '3b', text: "Docker, Kubernetes e bancos de dados SQL/NoSQL", weights: { [CareerType.BACKEND]: 3 } },
      { id: '3c', text: "Python, Pandas e bibliotecas de Machine Learning", weights: { [CareerType.DATA_IA]: 3 } },
      { id: '3d', text: "Roadmaps, Jira e métricas de negócio (KPIs)", weights: { [CareerType.PRODUCT]: 3 } }
    ]
  },
  {
    id: 4,
    title: "O que é 'qualidade' para você em software?",
    description: "Cada carreira foca em um aspecto diferente da excelência.",
    options: [
      { id: '4a', text: "Uma experiência fluida, rápida e sem erros visuais", weights: { [CareerType.FRONTEND]: 3, [CareerType.UX_UI]: 2 } },
      { id: '4b', text: "Um código escalável, seguro e que nunca cai", weights: { [CareerType.BACKEND]: 3 } },
      { id: '4c', text: "Previsões precisas e dados que geram valor real", weights: { [CareerType.DATA_IA]: 3 } },
      { id: '4d', text: "Um produto que resolve o problema certo para o usuário", weights: { [CareerType.PRODUCT]: 3 } }
    ]
  },
  {
    id: 5,
    title: "Em uma reunião de equipe, você costuma ser quem...",
    description: "O papel social também define sua carreira ideal.",
    options: [
      { id: '5a', text: "Questiona se a animação X faz sentido para o usuário", weights: { [CareerType.UX_UI]: 3, [CareerType.FRONTEND]: 1 } },
      { id: '5b', text: "Analisa a viabilidade técnica e custo de infraestrutura", weights: { [CareerType.BACKEND]: 3 } },
      { id: '5c', text: "Traz evidências baseadas em dados históricos", weights: { [CareerType.DATA_IA]: 3 } },
      { id: '5d', text: "Negocia prazos e alinha as expectativas do cliente", weights: { [CareerType.PRODUCT]: 3 } }
    ]
  },
  {
    id: 6,
    title: "Como você lida com a estética vs. funcionalidade?",
    description: "Equilíbrio é a chave, mas para onde você pende?",
    options: [
      { id: '6a', text: "A estética é a porta de entrada, deve ser impecável", weights: { [CareerType.UX_UI]: 3, [CareerType.FRONTEND]: 2 } },
      { id: '6b', text: "Funcionalidade e lógica interna são o que realmente importam", weights: { [CareerType.BACKEND]: 3, [CareerType.DATA_IA]: 1 } },
      { id: '6c', text: "A estética deve ser funcional e baseada em dados de uso", weights: { [CareerType.PRODUCT]: 2, [CareerType.FRONTEND]: 1 } },
      { id: '6d', text: "Não me importo com a estética, desde que o modelo acerte", weights: { [CareerType.DATA_IA]: 3 } }
    ]
  }
];

export const CAREER_DETAILS: Record<CareerType, CareerInfo> = {
  [CareerType.FRONTEND]: {
    type: CareerType.FRONTEND,
    title: "Desenvolvedor(a) Front-end",
    description: "Você é a ponte entre o design e a funcionalidade. Sua paixão é criar experiências visuais incríveis, garantindo que tudo o que o usuário vê e toca seja fluido, responsivo e intuitivo.",
    color: "from-blue-400 to-cyan-500",
    skills: ["React/Vue/Angular", "CSS Moderno & Tailwind", "JavaScript/TypeScript", "Performance Web"]
  },
  [CareerType.BACKEND]: {
    type: CareerType.BACKEND,
    title: "Desenvolvedor(a) Back-end",
    description: "Você é o mestre dos bastidores. Adora lidar com servidores, lógica complexa, segurança e bancos de dados. Sua prioridade é construir sistemas robustos que aguentem milhões de acessos.",
    color: "from-slate-600 to-slate-900",
    skills: ["Node.js/Python/Go", "Bancos de Dados SQL/NoSQL", "Cloud & Docker", "Arquitetura de APIs"]
  },
  [CareerType.DATA_IA]: {
    type: CareerType.DATA_IA,
    title: "Especialista em Dados & IA",
    description: "Você fala a língua dos números. Sua mente analítica busca padrões em montanhas de dados para prever o futuro ou automatizar decisões complexas através de inteligência artificial.",
    color: "from-purple-500 to-indigo-600",
    skills: ["Python & R", "Machine Learning", "Big Data (Spark/Hadoop)", "Estatística & SQL"]
  },
  [CareerType.PRODUCT]: {
    type: CareerType.PRODUCT,
    title: "Product Manager (Produto)",
    description: "Você é o estrategista. Entende tanto de negócios quanto de tecnologia e usuários. Seu objetivo é garantir que o time esteja construindo a coisa certa, na hora certa, para o público certo.",
    color: "from-emerald-500 to-teal-600",
    skills: ["Gestão Ágil (Scrum/Kanban)", "Análise de Métricas", "Discovery de Produto", "Comunicação Estratégica"]
  },
  [CareerType.UX_UI]: {
    type: CareerType.UX_UI,
    title: "Designer de UX/UI",
    description: "Você é o defensor do usuário. Sua missão é entender profundamente as necessidades humanas para desenhar interfaces que não sejam apenas bonitas, mas fáceis de usar e acessíveis.",
    color: "from-pink-500 to-rose-600",
    skills: ["Figma / Design Systems", "User Research", "Prototipagem de Alta Fidelidade", "Psicologia Cognitiva"]
  }
};
