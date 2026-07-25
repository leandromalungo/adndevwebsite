/**
 * ✅ SESSION MANAGEMENT - Timeout e Expiração
 * 
 * Configurações para session timeout automático
 * e inatividade de utilizadores
 */

export const SESSION_CONFIG = {
  // Duração máxima de sessão: 24 horas
  MAX_AGE_HOURS: 24,
  MAX_AGE_SECONDS: 24 * 60 * 60,
  
  // Timeout de inatividade: 30 minutos
  INACTIVITY_TIMEOUT_MINUTES: 30,
  INACTIVITY_TIMEOUT_MS: 30 * 60 * 1000,
  
  // Refresh JWT a cada 1 hora (para manter session viva)
  UPDATE_AGE_HOURS: 1,
  UPDATE_AGE_SECONDS: 60 * 60,
};

/**
 * Validar se token/session expirou
 */
export function validateSessionExpiry(expiresAt: string | null | undefined): boolean {
  if (!expiresAt) return false;
  
  try {
    const expiresAtMs = new Date(expiresAt).getTime();
    const now = Date.now();
    
    return now < expiresAtMs;
  } catch {
    return false;
  }
}

/**
 * Calcular tempo até expiração
 */
export function getTimeToExpiry(expiresAt: string | null | undefined): number {
  if (!expiresAt) return 0;
  
  try {
    const expiresAtMs = new Date(expiresAt).getTime();
    const now = Date.now();
    const diff = expiresAtMs - now;
    
    return diff > 0 ? diff : 0;
  } catch {
    return 0;
  }
}

/**
 * Gerar novo expiry timestamp (24 horas a partir de agora)
 */
export function generateExpiryTimestamp(hoursFromNow: number = 24): string {
  const expiresAt = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
  return expiresAt.toISOString();
}

/**
 * Verificar se está próximo de expirar (últimos 5 minutos)
 */
export function isSessionExpiringSoon(expiresAt: string | null | undefined): boolean {
  const timeToExpiry = getTimeToExpiry(expiresAt);
  const fiveMinutesMs = 5 * 60 * 1000;
  
  return timeToExpiry > 0 && timeToExpiry < fiveMinutesMs;
}
