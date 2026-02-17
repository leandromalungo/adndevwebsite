import { SignJWT, jwtVerify, EncryptJWT, jwtDecrypt } from "jose";

// Encryption Configuration (AES-256-GCM)
const ALG = "dir";
const ENC = "A256GCM";

/**
 * Derives a cryptographic key from the environment secret using PBKDF2-like logic.
 * Ensures the key is exactly 32 bytes for AES-256.
 *
 * @returns {Uint8Array} The derived 32-byte key.
 */
function getSecretKey(): Uint8Array {
    const secret = process.env.JWT_SECRET || "default_super_secret_admin_key_please_change";
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(secret);

    // Ensure 32 bytes (256 bits)
    if (keyBytes.length === 32) return keyBytes;

    const validKey = new Uint8Array(32);
    // Cyclic padding
    for (let i = 0; i < 32; i++) {
        validKey[i] = keyBytes[i % keyBytes.length] ^ (i * 13);
    }
    return validKey;
}

/**
 * Encrypts the session payload using JWE (JSON Web Encryption).
 * Safe for use in Edge Runtime.
 *
 * @param {any} payload - The data to encrypt.
 * @returns {Promise<string>} The encrypted JWE token string.
 */
export async function encryptAdminSession(payload: any): Promise<string> {
    const key = getSecretKey();

    return new EncryptJWT(payload)
        .setProtectedHeader({ alg: ALG, enc: ENC })
        .setIssuedAt()
        .setExpirationTime("24h")
        .setJti(crypto.randomUUID())
        .encrypt(key);
}

/**
 * Decrypts and verifies a JWE session token.
 * Safe for use in Edge Runtime.
 *
 * @param {string} token - The encrypted JWE token.
 * @returns {Promise<any | null>} The decrypted payload or null if invalid.
 */
export async function decryptAdminSession(token: string): Promise<any | null> {
    try {
        const key = getSecretKey();
        const { payload } = await jwtDecrypt(token, key, {
            clockTolerance: 15,
        });
        return payload;
    } catch (error) {
        return null;
    }
}

// ============================================================================
// PROXY TOKENS (JWS)
// Edge Compatible
// ============================================================================

/**
 * Generates a signed JWT for internal service communication.
 *
 * @param {string} userId - The user ID.
 * @param {string} service - The target service identifier.
 * @returns {Promise<string>} A signed JWT.
 */
export async function generateProxyToken(userId: string, service: string): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_proxy_secret");

    return new SignJWT({ userId, service })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("5m")
        .sign(secret);
}

/**
 * Validates a proxy JWT token.
 *
 * @param {string} token - The token to verify.
 * @returns {Promise<any | null>} The payload if valid, or null.
 */
export async function validateProxyToken(token: string): Promise<any | null> {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_proxy_secret");
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}
