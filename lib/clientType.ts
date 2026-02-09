export type ClientType = {
    id: string;
    name: string;
    email: string;
    country: string;
    alerts: string [];
    subscriptionON: boolean;
    paymentForm: PaymentMethod;
    telegram: string;
    comprovative: File;
    comprovativePaypal?: any[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type PaymentMethod = "paypal" | "transfer" | "reference";