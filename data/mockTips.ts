
export interface Tip {
    id: string;
    slug: string;
    title: string;
    date?: string;
    image?: string;
    readTime?: string;
}

export const MOCK_TIPS: Tip[] = [
    {
        id: "1",
        slug: "como-criar-curriculum-vitae-ideal",
        title: "Como criar um curriculum vitae ideal para T.I.",
        date: "10 Fev 2026",
        image: "/logoNavbar.png",
        readTime: "5 min de leitura"
    },
    {
        id: "2",
        slug: "importancia-projetos-pessoais",
        title: "A importância dos projetos pessoais no portfólio",
        date: "12 Fev 2026",
        image: "/images/tips/projetos-pessoais.jpg",
        readTime: "4 min de leitura"
    },
    {
        id: "3",
        slug: "linkedin-para-desenvolvedores",
        title: "Otimizando seu LinkedIn para vagas remotas",
        date: "14 Fev 2026",
        image: "/images/tips/linkedin-dev.jpg",
        readTime: "6 min de leitura"
    },
    {
        id: "4",
        slug: "soft-skills-que-todo-dev-precisa",
        title: "Soft Skills que todo Dev Senior domina",
        date: "16 Fev 2026",
        image: "/images/tips/soft-skills.jpg",
        readTime: "5 min de leitura"
    }
];
