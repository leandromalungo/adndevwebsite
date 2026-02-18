import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import Stripe from "stripe";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Valida variáveis de ambiente críticas no arranque
(function validateEnv() {
    const required = [
        "NEXTAUTH_SECRET",
        "STRIPE_SECRET_KEY",
        "UPSTASH_REDIS_REST_URL",
        "UPSTASH_REDIS_REST_TOKEN",
    ];
    const missing = required.filter((k) => !process.env[k]);
    if (missing.length > 0) {
        const msg = `[ARRANQUE] Faltam variáveis de ambiente obrigatórias: ${missing.join(", ")}`;
        console.error(msg);
        if (process.env.NODE_ENV === "production") {
            throw new Error(msg);
        }
    }
})();

// Inicialização do Firebase Admin
initializeApp();
export const auth = getAuth();
export const db = getFirestore();

// Inicialização do Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-06-20" as any,
});

// Inicialização do Redis (Upstash)
export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Limitador de taxa geral — 10 pedidos/min por IP
export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
});

// Limitador de taxa mais rigoroso para Admin — 3 pedidos/15min por IP
export const adminRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "15 m"),
});
