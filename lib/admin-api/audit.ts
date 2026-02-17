import { adminDb } from "../firebase-admin";

/**
 * Interface para log de auditoria do admin
 */
export interface AuditLogEntry {
    adminEmail: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: any;
    ip: string;
    userAgent: string;
    timestamp: Date;
}

/**
 * Registra uma ação administrativa ou de usuário no Firestore para auditoria
 * Camada 5 de Segurança
 */
export async function logSecurityAction(entry: Omit<AuditLogEntry, "timestamp">) {
    try {
        const collectionName = entry.adminEmail.includes("@") ? "security_audit_logs" : "admin_audit_logs";
        await adminDb.collection(collectionName).add({
            ...entry,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error("[INTERNAL] Failed to log admin action:", error);
        // Em um sistema real, poderíamos disparar um alerta aqui
    }
}
