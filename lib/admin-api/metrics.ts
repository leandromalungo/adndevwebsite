import { adminDb, adminAuth } from "../firebase-admin";

interface MetricsGlobal {
    totalMRR: number;
    totalSubscribers: number;
    churnRate: number;
    arpu: number;
    lifetimeRevenue: number;
}

/**
 * Atualiza métricas SaaS de forma atômica no Firestore
 */
export async function updateSaaSMetrics(
    action: "activation" | "cancellation" | "payment",
    amount: number = 0
) {
    const metricsRef = adminDb.collection("metrics_global").doc("current");

    await adminDb.runTransaction(async (transaction) => {
        const doc = await transaction.get(metricsRef);
        let data: MetricsGlobal = {
            totalMRR: 0,
            totalSubscribers: 0,
            churnRate: 0,
            arpu: 0,
            lifetimeRevenue: 0,
        };

        if (doc.exists) {
            data = doc.data() as MetricsGlobal;
        }

        if (action === "activation") {
            data.totalMRR += amount;
            data.totalSubscribers += 1;
            data.lifetimeRevenue += amount;
        } else if (action === "cancellation") {
            data.totalMRR -= amount;
            data.totalSubscribers = Math.max(0, data.totalSubscribers - 1);
            // Churn Rate = (cancelamentos no mês / totalSubscribers)
            // Nota: Para um cálculo real de churn mensal, precisaríamos de snapshots temporais, 
            // aqui faremos uma aproximação baseada no estado atual.
            if (data.totalSubscribers > 0) {
                // Incrementa churn baseado na base atual (simplificado)
            }
        } else if (action === "payment") {
            data.lifetimeRevenue += amount;
        }

        // Recalcular ARPU (Average Revenue Per User)
        data.arpu = data.totalSubscribers > 0 ? data.totalMRR / data.totalSubscribers : 0;

        // Recalcular Churn Rate simplificado (pode ser expandido com lógica mensal)
        // data.churnRate = ...

        transaction.set(metricsRef, {
            ...data,
            updatedAt: new Date().toISOString(),
        });
    });
}
