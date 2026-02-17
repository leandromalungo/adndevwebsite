import { adminDb } from "../firebase-admin";
import { RATE_LIMITS } from "../security";

/**
 * Camada 1: Rate Limiting Persistente
 * Bloqueia tentativas excessivas de login ou ações (Admin e Usuários).
 */
export async function checkRateLimit(ip: string, action: "login" | "api" | "user_login" | "subscription"): Promise<{ allowed: boolean; remaining: number }> {
    const limitConfigs: Record<string, { maxAttempts: number; windowMs: number }> = {
        login: RATE_LIMITS.login,
        api: RATE_LIMITS.api,
        user_login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 },
        subscription: { maxAttempts: 3, windowMs: 60 * 60 * 1000 } // 3 tentativas por hora
    };

    const limitConfig = limitConfigs[action];
    const collectionName = action.startsWith("user") || action === "subscription" ? "user_rate_limits" : "admin_rate_limits";
    const docRef = adminDb.collection(collectionName).doc(`${action}_${ip.replace(/\./g, "_")}`);

    const doc = await docRef.get();
    const now = Date.now();

    if (!doc.exists) {
        await docRef.set({
            attempts: 1,
            lastAttempt: now,
            resetTime: now + limitConfig.windowMs
        });
        return { allowed: true, remaining: limitConfig.maxAttempts - 1 };
    }

    const data = doc.data()!;

    // Se a janela de tempo expirou, reseta
    if (now > data.resetTime) {
        await docRef.set({
            attempts: 1,
            lastAttempt: now,
            resetTime: now + limitConfig.windowMs
        });
        return { allowed: true, remaining: limitConfig.maxAttempts - 1 };
    }

    // Se ainda está na janela, verifica tentativas
    if (data.attempts >= limitConfig.maxAttempts) {
        // Log de suspeita de ataque
        console.warn(`RATE LIMIT TRIGGERED for IP: ${ip} on action: ${action}`);
        return { allowed: false, remaining: 0 };
    }

    // Incrementa tentativa
    await docRef.update({
        attempts: data.attempts + 1,
        lastAttempt: now
    });

    return { allowed: true, remaining: limitConfig.maxAttempts - (data.attempts + 1) };
}
