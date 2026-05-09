/**
 * MOCK_TIPS
 * Lista de dicas/artigos usados no sitemap e na página /dicas.
 */

export interface MockTip {
    id: string;
    slug: string;
    title: string;
    description?: string;
    date?: string;
    category?: string;
    author?: string;
    imageUrl?: string;
}

export const MOCK_TIPS: MockTip[] = [
    {
        id: "tip-1",
        slug: "como-comecar-programar-do-zero",
        title: "Como começar a programar do zero",
        description:
            "Um guia completo para quem quer entrar no mundo da programação sem experiência anterior.",
        date: "10 Fev 2026",
        category: "Carreira",
        author: "ADN Developer",
    },
    {
        id: "tip-2",
        slug: "melhores-linguagens-para-iniciantes",
        title: "As melhores linguagens de programação para iniciantes em 2025",
        description:
            "Saiba quais linguagens são mais recomendadas para quem está começando na área de tecnologia.",
        date: "05 Jan 2026",
        category: "Aprendizado",
        author: "ADN Developer",
    },
    {
        id: "tip-3",
        slug: "git-e-github-para-iniciantes",
        title: "Git e GitHub: o guia para iniciantes",
        description:
            "Aprenda os comandos essenciais do Git e como colaborar em projetos no GitHub.",
        date: "20 Dez 2025",
        category: "Ferramentas",
        author: "ADN Developer",
    },
    {
        id: "tip-4",
        slug: "como-montar-portfolio-dev",
        title: "Como montar um portfolio de desenvolvedor que impressiona",
        description:
            "Dicas práticas para criar um portfolio que destaque as suas habilidades e conquiste empregos.",
        date: "15 Nov 2025",
        category: "Carreira",
        author: "ADN Developer",
    },
    {
        id: "tip-5",
        slug: "fundamentos-css-que-todo-dev-deve-saber",
        title: "Fundamentos de CSS que todo desenvolvedor deve saber",
        description:
            "Os conceitos essenciais de CSS para criar layouts modernos e responsivos.",
        date: "02 Out 2025",
        category: "Frontend",
        author: "ADN Developer",
    },
];
