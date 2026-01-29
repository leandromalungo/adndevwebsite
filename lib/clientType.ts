export type ClientType = {
    id: string;
    name: string;
    email: string;
    country: string;
    alerts: string [];
    subscriptionON: boolean;
    paymentForm: string;
    comprovative: File;
    createdAt?: Date;
    updatedAt?: Date;
}