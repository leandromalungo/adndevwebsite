export type Post = {
    id: string;
    title: string;
    subject: string;
    type: "article" | "tutorial" | "news";
    country: string;
    status: "published" | "draft" | "archived";
    author: string;
    createdAt: string;
};

const posts: Post[] = [
    {
        id: "1",
        title: "Introdução ao Next.js 13",
        subject: "Desenvolvimento Web",
        type: "tutorial",
        country: "Brasil",
        status: "published",
        author: "Carlos Pereira",
        createdAt: "2023-06-10",
    },
    {
        id: "2",
        title: "O Futuro da IA em África",
        subject: "Inteligência Artificial",
        type: "article",
        country: "Angola",
        status: "published",
        author: "Pedro Alves",
        createdAt: "2023-06-12",
    },
    {
        id: "3",
        title: "Novidades do React 19",
        subject: "Front-end",
        type: "news",
        country: "Portugal",
        status: "draft",
        author: "Maria Santos",
        createdAt: "2023-06-15",
    },
];

export async function getPosts(): Promise<Post[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return posts;
}

export async function deletePost(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulated delete
}
