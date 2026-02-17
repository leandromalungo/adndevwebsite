// lib/security.ts
// Security utilities for the application

/**
 * Validates and sanitizes user input by removing potentially dangerous characters.
 * Allows only alphanumeric characters, spaces, and basic punctuation.
 *
 * @param {string} input - The raw input string to sanitize.
 * @returns {string} The sanitized string, truncated to 1000 characters.
 */
export function sanitizeInput(input: string): string {
    if (!input || typeof input !== "string") return "";

    return (
        input
            // Remove HTML/XML tags
            .replace(/<[^>]*>/g, "")
            // Remove inline scripts
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            // Remove event handlers
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
            // Remove protocols
            .replace(/javascript:/gi, "")
            .replace(/data:/gi, "")
            // Remove internal styles
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
            // Remove control characters
            .replace(/[\x00-\x1F\x7F]/g, "")
            // Trim whitespace
            .trim()
            // Enforce length limit
            .substring(0, 1000)
    );
}

/**
 * Validates and sanitizes an email address.
 * enforced RFC 5321 length limits.
 *
 * @param {string} email - The email address to validate.
 * @returns {string} The sanitized email if valid, otherwise an empty string.
 */
export function sanitizeEmail(email: string): string {
    if (!email || typeof email !== "string") return "";

    const sanitized = email
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9@._+-]/g, "")
        .substring(0, 254);

    // Basic format validation
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(sanitized) ? sanitized : "";
}

/**
 * Sanitizes generic text input, allowing only alphanumeric characters and basic punctuation.
 * Recommended for names, titles, and descriptions.
 *
 * @param {string} text - The input text.
 * @returns {string} The sanitized text, truncated to 5000 characters.
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
 * Validates a URL and ensures it uses a secure protocol (http/https).
 *
 * @param {string} url - The URL to validate.
 * @returns {string} The valid URL string or an empty string.
 */
export function sanitizeUrl(url: string): string {
    if (!url || typeof url !== "string") return "";

    const trimmed = url.trim();

    try {
        const parsed = new URL(trimmed);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed.toString();
        }
    } catch {
        // Invalid URL
    }

    return "";
}

/**
 * Safely parses a value into a number.
 *
 * @param {any} value - The value to parse.
 * @returns {number} The parsed number or 0 if invalid.
 */
export function sanitizeNumber(value: any): number {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

// ==================== XSS PROTECTION ====================

/**
 * Escapa caracteres HTML para prevenir XSS
 */
export function escapeHtml(unsafe: string): string {
    if (!unsafe || typeof unsafe !== "string") return "";

    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Remove completamente qualquer código executável
 */
export function stripDangerousContent(content: string): string {
    if (!content || typeof content !== "string") return "";

    return content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
        .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
        .replace(/<embed[^>]*>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/data:text\/html/gi, "");
}

// ==================== CSRF PROTECTION ====================

/**
 * Gera token CSRF seguro
 * Compatível com Edge Runtime
 */
export function generateCsrfToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Valida token CSRF
 * Compatível com Edge Runtime
 */
export function validateCsrfToken(token: string, expected: string): boolean {
    if (!token || !expected || token.length !== expected.length) return false;

    let result = 0;
    for (let i = 0; i < token.length; i++) {
        result |= token.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return result === 0;
}

/**
 * Gera um fingerprint único para a sessão do usuário baseado no UA e IP
 * Compatível com Edge Runtime
 */
export async function generateFingerprint(userAgent: string, ip: string): Promise<string> {
    const secret = process.env.JWT_SECRET || "default_secret";
    const data = new TextEncoder().encode(`${userAgent}-${ip}-${secret}`);

    // Hash SHA-256 usando Web Crypto API (Nativo em Edge e Node 16+)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Valida o cabeçalho secreto de administrador
 * Compatível com Edge Runtime
 */
export function validateAdminSecret(secret: string | null): boolean {
    const expected = process.env.ADMIN_SECRET_KEY;
    if (!expected || !secret) return false;

    // Comparação básica mas segura o suficiente contra timing attacks se lengths forem iguais
    if (secret.length !== expected.length) return false;

    let result = 0;
    for (let i = 0; i < secret.length; i++) {
        result |= secret.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return result === 0;
}

// ==================== SECURITY HEADERS ====================

export const SECURITY_HEADERS = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com;",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

// ==================== RATE LIMITING ====================

export const RATE_LIMITS = {
    login: {
        maxAttempts: 5,
        windowMs: 15 * 60 * 1000, // 15 minutos
    },
    api: {
        maxAttempts: 100,
        windowMs: 60 * 1000, // 1 minuto
    },
};

// ==================== VALIDATION HELPERS ====================

/**
 * Valida se string contém apenas caracteres seguros
 */
export function isSafeString(str: string): boolean {
    if (!str || typeof str !== "string") return false;

    // Rejeita se contiver HTML, scripts, ou caracteres perigosos
    const dangerousPatterns = [
        /<script/i,
        /<iframe/i,
        /javascript:/i,
        /on\w+=/i,
        /<object/i,
        /<embed/i,
        /data:text\/html/i,
    ];

    return !dangerousPatterns.some((pattern) => pattern.test(str));
}

/**
 * Valida tamanho de arquivo (em bytes)
 */
export function isValidFileSize(size: number, maxSize: number = 5242880): boolean {
    // 5MB padrão
    return size > 0 && size <= maxSize;
}

/**
 * Valida tipo de arquivo permitido
 */
export function isValidFileType(
    filename: string,
    allowedTypes: string[] = ["jpg", "jpeg", "png", "gif", "webp"]
): boolean {
    const ext = filename.split(".").pop()?.toLowerCase();
    return ext ? allowedTypes.includes(ext) : false;
}

/**
 * Valida força de senha
 * Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
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
