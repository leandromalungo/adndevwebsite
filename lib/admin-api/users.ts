export type User = {
    id: string;
    name: string;
    email: string;
    country: string;
    status: "active" | "banned" | "pending";
    joinDate: string;
    role: "admin" | "user" | "editor";
};

const users: User[] = [
    {
        id: "1",
        name: "João Silva",
        email: "joao.silva@example.com",
        country: "Brasil",
        status: "active",
        joinDate: "2023-01-15",
        role: "user",
    },
    {
        id: "2",
        name: "Maria Santos",
        email: "maria.santos@example.com",
        country: "Portugal",
        status: "active",
        joinDate: "2023-02-20",
        role: "editor",
    },
    {
        id: "3",
        name: "Pedro Alves",
        email: "pedro.alves@example.com",
        country: "Angola",
        status: "banned",
        joinDate: "2023-03-10",
        role: "user",
    },
    {
        id: "4",
        name: "Ana Costa",
        email: "ana.costa@example.com",
        country: "Moçambique",
        status: "pending",
        joinDate: "2023-04-05",
        role: "user",
    },
    {
        id: "5",
        name: "Carlos Pereira",
        email: "carlos.pereira@example.com",
        country: "Brasil",
        status: "active",
        joinDate: "2023-05-12",
        role: "admin",
    },
];

export async function getUsers(): Promise<User[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return users;
}

export async function getUserById(id: string): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return users.find((user) => user.id === id);
}

export async function updateUserStatus(id: string, status: User["status"]): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = users.find((u) => u.id === id);
    if (user) {
        user.status = status;
    }
    return user;
}
