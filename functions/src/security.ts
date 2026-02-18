/**
 * Utilitários de segurança para Cloud Functions
 * Espelha lib/security.ts mas adaptado para o ambiente de backend.
 */

/**
 * Sanitiza e valida o formato de um endereço de email
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== "string") return "";

  const sanitized = email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._+-]/g, "")
    .substring(0, 254);

  const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(sanitized) ? sanitized : "";
}

/**
 * Lógica genérica de limpeza de entrada para prevenir ataques básicos
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";

  return input
    .replace(/<[^>]*>/g, "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .substring(0, 1000);
}

/**
 * Sanitiza textos simples, removendo tags HTML e caracteres perigosos
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .substring(0, 5000);
}

/**
 * Gera um fingerprint único baseado no User Agent e IP do utilizador
 * Usado para validação adicional de sessão (Camada de Segurança).
 */
export async function generateFingerprint(
  userAgent: string,
  ip: string,
): Promise<string> {
  const secret = process.env.JWT_SECRET || "default_secret";
  const data = new TextEncoder().encode(`${userAgent}-${ip}-${secret}`);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verifica se uma palavra-passe cumpre os requisitos mínimos de força
 */
export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber
  );
}

/**
 * Headers de segurança recomendados para respostas HTTP
 */
export const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};
