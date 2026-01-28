import { create } from "domain";
import { PAYPAL_API_BASE_URL } from "./constants";

const base = PAYPAL_API_BASE_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {
    createOrder: async function createOrder(amount: number) {
        return amount;
    },
    createPayment: async function createPayment(orderId: string) {
        return orderId;
    }  
};