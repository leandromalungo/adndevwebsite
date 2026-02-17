
import { Code2, Server, Database, Shield, Layout, Smartphone, Cloud, Cpu, Lock, PenTool, Radio, Component, Globe, HardDrive, Terminal } from 'lucide-react';

export type Difficulty = 'Junior' | 'Pleno' | 'Senior';

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    demoUrl?: string;
    repoUrl?: string;
    difficulty: Difficulty;
    area: string; // This should match a sub-area slug or title
}

export interface SubArea {
    title: string;
    slug: string;
    description: string;
    icon?: any;
}

export interface ProjectCategory {
    title: string;
    description: string;
    icon: any;
    areas: SubArea[];
}

export const MOCK_PROJECTS: Project[] = [
    // WEB DEV -> JUNIOR
    {
        id: 'web-jr-1',
        title: 'Landing Page Responsiva',
        description: 'Crie uma landing page de produto com HTML, CSS e um pouco de JavaScript para interatividade básica. Foque em responsividade e semântica.',
        techStack: ['HTML5', 'CSS3', 'JavaScript'],
        imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Junior',
        area: 'desenvolvimento-web'
    },
    {
        id: 'web-jr-2',
        title: 'To-Do List App',
        description: 'Um clássico para aprender manipulação de DOM e estado local. Permita adicionar, remover e marcar tarefas como concluídas.',
        techStack: ['React', 'CSS Modules'],
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Junior',
        area: 'desenvolvimento-web'
    },

    // WEB DEV -> PLENO
    {
        id: 'web-pl-1',
        title: 'E-commerce Full Stack',
        description: 'Desenvolva uma loja virtual completa. Front-end com Next.js, Back-end com Node.js/Express e Banco de dados PostgreSQL.',
        techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Pleno',
        area: 'desenvolvimento-web'
    },

    // DATA SCIENCE -> JUNIOR
    {
        id: 'ds-jr-1',
        title: 'Análise Exploratória do Titanic',
        description: 'O "Hello World" da ciência de dados. Analise o dataset do Titanic para entender correlações e visualizar dados.',
        techStack: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
        imageUrl: 'https://images.unsplash.com/photo-1518182170546-0766be6f5a56?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Junior',
        area: 'ciencia-de-dados'
    },

    // MOBILE -> SENIOR
    {
        id: 'mob-sr-1',
        title: 'App de Rede Social',
        description: 'Clone de Instagram/Twitter com feed infinito, upload de mídia, chat em tempo real e notificações push.',
        techStack: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
        imageUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Senior',
        area: 'desenvolvimento-mobile'
    },

    // DEVOPS -> PLENO
    {
        id: 'ops-pl-1',
        title: 'Pipeline CI/CD Automatizado',
        description: 'Crie uma pipeline completa que roda testes, faz build de imagem Docker e deploy automático na AWS ECS.',
        techStack: ['GitHub Actions', 'Docker', 'AWS', 'Terraform'],
        imageUrl: 'https://images.unsplash.com/photo-1667372393119-3866372c9492?q=80&w=800&auto=format&fit=crop',
        difficulty: 'Pleno',
        area: 'devops'
    }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
    {
        title: 'Desenvolvimento de Software',
        description: 'Criação de programas, sistemas e aplicativos.',
        icon: Code2,
        areas: [
            { title: 'Desenvolvimento Web', slug: 'desenvolvimento-web', description: 'Front-end, Back-end e Full Stack.' },
            { title: 'Desenvolvimento Mobile', slug: 'desenvolvimento-mobile', description: 'Android (Kotlin/Java) e iOS (Swift).' },
            { title: 'Desenvolvimento Desktop', slug: 'desenvolvimento-desktop', description: 'Aplicações para Windows, Mac e Linux.' },
            { title: 'Engenharia de Software', slug: 'engenharia-de-software', description: 'Princípios e práticas de engenharia.' },
            { title: 'Desenvolvimento de Jogos', slug: 'desenvolvimento-jogos', description: 'Unity, Unreal e Game Design.' },
            { title: 'Low-code / No-code', slug: 'low-code', description: 'Desenvolvimento visual e rápido.' },
        ]
    },
    {
        title: 'Dados & IA',
        description: 'Trabalho com dados para gerar insights e automação.',
        icon: Database,
        areas: [
            { title: 'Análise de Dados', slug: 'analise-de-dados', description: 'Interpretação e visualização de dados.' },
            { title: 'Ciência de Dados', slug: 'ciencia-de-dados', description: 'Modelagem estatística e preditiva.' },
            { title: 'Engenharia de Dados', slug: 'engenharia-de-dados', description: 'Pipelines e arquitetura de dados.' },
            { title: 'Machine Learning', slug: 'machine-learning', description: 'Algoritmos que aprendem com dados.' },
            { title: 'Inteligência Artificial', slug: 'inteligencia-artificial', description: 'Redes neurais e sistemas cognitivos.' },
            { title: 'Big Data', slug: 'big-data', description: 'Processamento de grandes volumes de dados.' },
            { title: 'Business Intelligence', slug: 'business-intelligence', description: 'Estratégia de negócios baseada em dados.' },
        ]
    },
    {
        title: 'Infraestrutura & Redes',
        description: 'Base técnica que mantém sistemas funcionando.',
        icon: Server,
        areas: [
            { title: 'Administração de Redes', slug: 'administracao-redes', description: 'Conectividade e protocolos.' },
            { title: 'SysAdmin', slug: 'sysadmin', description: 'Gestão de servidores Windows/Linux.' },
            { title: 'Cloud Computing', slug: 'cloud-computing', description: 'AWS, Azure, GCP e arquitetura nuvem.' },
            { title: 'Virtualização', slug: 'virtualizacao', description: 'Docker, VMs e containers.' },
            { title: 'DevOps', slug: 'devops', description: 'Integração entre desenvolvimento e operações.' },
            { title: 'SRE', slug: 'sre', description: 'Confiabilidade e escalabilidade de sites.' },
        ]
    },
    {
        title: 'Segurança da Informação',
        description: 'Proteção de sistemas, dados e redes.',
        icon: Shield,
        areas: [
            { title: 'Cibersegurança', slug: 'ciberseguranca', description: 'Defesa contra ameaças digitais.' },
            { title: 'Pentest', slug: 'pentest', description: 'Testes de invasão controlados.' },
            { title: 'Análise de Vulnerabilidades', slug: 'vulnerabilidades', description: 'Identificação de falhas de segurança.' },
            { title: 'Governança e Compliance', slug: 'governanca-seguranca', description: 'LGPD, ISO 27001 e normas.' },
            { title: 'Forense Digital', slug: 'forense-digital', description: 'Investigação de crimes cibernéticos.' },
            { title: 'SOC', slug: 'soc', description: 'Monitoramento e resposta a incidentes.' },
        ]
    },
    {
        title: 'Suporte & Operações',
        description: 'Garantia de funcionamento de usuários e sistemas.',
        icon: HardDrive,
        areas: [
            { title: 'Suporte Técnico', slug: 'suporte-tecnico', description: 'Help Desk e atendimento ao usuário.' },
            { title: 'Service Desk', slug: 'service-desk', description: 'Gestão centralizada de serviços.' },
            { title: 'Analista de Sistemas', slug: 'analista-sistemas', description: 'Manutenção e implantação de sistemas.' },
            { title: 'Gestão de Incidentes', slug: 'gestao-incidentes', description: 'Resolução rápida de problemas.' },
            { title: 'ITIL', slug: 'itil', description: 'Boas práticas em serviços de TI.' },
        ]
    },
    {
        title: 'Banco de Dados',
        description: 'Gestão e organização de dados.',
        icon: Database,
        areas: [
            { title: 'DBA', slug: 'dba', description: 'Administração de bancos de dados.' },
            { title: 'Modelagem de Dados', slug: 'modelagem-dados', description: 'Estruturação lógica de dados.' },
            { title: 'SQL / NoSQL', slug: 'sql-nosql', description: 'Linguagens de consulta e tipos de bancos.' },
            { title: 'Data Warehousing', slug: 'data-warehousing', description: 'Armazenamento para análise histórica.' },
        ]
    },
    {
        title: 'Gestão & Governança',
        description: 'Planejamento e gerenciamento de TI.',
        icon: Layout,
        areas: [
            { title: 'Gestão de Projetos', slug: 'gestao-projetos', description: 'Scrum, Agile, PMP.' },
            { title: 'Product Owner', slug: 'product-owner', description: 'Definição de visão e produto.' },
            { title: 'Governança de TI', slug: 'governanca-ti', description: 'Alinhamento de TI com negócio.' },
            { title: 'Arquitetura de Software', slug: 'arquitetura-software', description: 'Decisões estruturais de sistemas.' },
        ]
    },
    {
        title: 'UX/UI & Design',
        description: 'Foco na experiência do usuário.',
        icon: PenTool,
        areas: [
            { title: 'UX Design', slug: 'ux-design', description: 'Experiência e usabilidade.' },
            { title: 'UI Design', slug: 'ui-design', description: 'Interfaces visuais.' },
            { title: 'Design de Produto', slug: 'design-produto', description: 'Visão holística do produto digital.' },
            { title: 'Pesquisa com Usuários', slug: 'ux-research', description: 'Entrevistas e testes.' },
        ]
    },
    {
        title: 'Hardware & IoT',
        description: 'Parte física da tecnologia.',
        icon: Cpu,
        areas: [
            { title: 'Hardware', slug: 'hardware', description: 'Montagem e manutenção.' },
            { title: 'IoT', slug: 'iot', description: 'Internet das Coisas e sensores.' },
            { title: 'Sistemas Embarcados', slug: 'sistemas-embarcados', description: 'Arduino, ESP32 e microcontroladores.' },
            { title: 'Robótica', slug: 'robotica', description: 'Automação e robôs.' },
        ]
    },
    {
        title: 'Blockchain & Inovação',
        description: 'Tecnologias emergentes.',
        icon: Lock,
        areas: [
            { title: 'Blockchain', slug: 'blockchain', description: 'Descentralização e cripto.' },
            { title: 'Web3', slug: 'web3', description: 'Nova geração da internet.' },
            { title: 'Realidade Virtual', slug: 'vr-ar', description: 'Metaverso e imersão.' },
            { title: 'Computação Quântica', slug: 'computacao-quantica', description: 'Futuro do processamento.' },
        ]
    }
];

export const getAllAreas = () => {
    return PROJECT_CATEGORIES.flatMap(cat => cat.areas);
};
