import { callCloudFunction } from "../cloud-functions-client";

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
 * Registra uma ação administrativa no backend via Cloud Function
 */
export async function logSecurityAction(entry: Omit<AuditLogEntry, "timestamp">) {
    return callCloudFunction("logAdminAction", "POST", entry, true);
}
