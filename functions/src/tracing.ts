import crypto from "crypto";

/**
 * Gera um ID de pedido único para rastreabilidade (Tracing)
 * Usado para correlacionar logs do frontend com o backend.
 */
export function generateRequestId(): string {
    return crypto.randomUUID();
}
