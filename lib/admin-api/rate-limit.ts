import { callCloudFunction } from "../cloud-functions-client";

/**
 * Camada 1: Rate Limiting Persistente via Cloud Function
 */
export async function checkRateLimit(
    ip: string,
    action: "login" | "api" | "user_login" | "subscription"
): Promise<{ allowed: boolean; remaining: number }> {
    try {
        const response = await callCloudFunction<{ allowed: boolean; remaining: number }>(
            "checkRateLimit",
            "POST",
            { ip, action },
            false // No auth needed for pure rate limit check if calling from API routes
        );
        return response;
    } catch (error) {
        console.error("[RateLimit] Failed to check limit:", error);
        // Fallback: permitimos para não bloquear o sistema em caso de erro na função
        return { allowed: true, remaining: 1 };
    }
}
