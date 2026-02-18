import { callCloudFunction } from "../cloud-functions-client";

/**
 * Camada 1: Controlo de Taxa (Rate Limiting) Persistente via Cloud Function
 * Verifica se um endereço IP excedeu o limite de pedidos para uma determinada ação.
 * 
 * @param ip Endereço IP do utilizador
 * @param action Tipo de ação (login, api, user_login, subscription)
 * @returns Promessa com o estado de permissão e pedidos restantes
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
            false // Não é necessária autenticação para verificação de rate limit em rotas de API públicas
        );
        return response;
    } catch (error) {
        console.error("[RateLimit] Erro ao verificar limite:", error);
        // Fallback: permitimos para não bloquear o sistema em caso de falha técnica na função
        return { allowed: true, remaining: 1 };
    }
}
