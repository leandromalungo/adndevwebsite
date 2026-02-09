export type Subscription = {
    id: string;
    userId: string;
    userName: string;
    email: string;
    plan: "basic" | "pro" | "enterprise";
    status: "active" | "canceled" | "expired";
    startDate: string;
    endDate: string;
    amount: string;
};

const subscriptions: Subscription[] = [
    {
        id: "sub_1",
        userId: "1",
        userName: "João Silva",
        email: "joao.silva@example.com",
        plan: "pro",
        status: "active",
        startDate: "2023-01-01",
        endDate: "2024-01-01",
        amount: "R$ 49,90",
    },
    {
        id: "sub_2",
        userId: "2",
        userName: "Maria Santos",
        email: "maria.santos@example.com",
        plan: "basic",
        status: "expired",
        startDate: "2022-05-01",
        endDate: "2023-05-01",
        amount: "R$ 29,90",
    },
    {
        id: "sub_3",
        userId: "5",
        userName: "Carlos Pereira",
        email: "carlos.pereira@example.com",
        plan: "enterprise",
        status: "active",
        startDate: "2023-06-01",
        endDate: "2024-06-01",
        amount: "R$ 199,90",
    },
];

export async function getSubscriptions(): Promise<Subscription[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return subscriptions;
}

export async function toggleSubscriptionStatus(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Simulated toggle
}
