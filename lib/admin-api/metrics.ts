import { callCloudFunction } from "../cloud-functions-client";

interface MetricsGlobal {
    totalMRR: number;
    totalSubscribers: number;
    churnRate: number;
    arpu: number;
    lifetimeRevenue: number;
}

/**
 * Busca métricas SaaS via Cloud Function
 */
export async function getSaaSMetrics(): Promise<MetricsGlobal> {
    return callCloudFunction<MetricsGlobal>("getAdminMetrics", "GET", undefined, true);
}

/**
 * A atualização de métricas agora é feita automaticamente no backend (via webhooks ou cron)
 * ou via uma Cloud Function específica se necessário.
 * Removemos a lógica de transação direta do frontend por segurança.
 */
export async function updateSaaSMetrics(
    action: "activation" | "cancellation" | "payment",
    amount: number = 0
) {
    console.log(`[AdminAPI] Metrics update requested: ${action} for ${amount}. Implementation moved to backend.`);
}

