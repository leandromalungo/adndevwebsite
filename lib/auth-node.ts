import { adminAuth } from "./firebase-admin";
import { decryptAdminSession } from "./auth-edge"; // Re-usa a lógica Edge

// Re-exporta tudo do auth-edge para compatibilidade
export * from "./auth-edge";

/**
 * Valida o token de admin para acesso (Versão Node.js completa).
 * Tenta decrypt JWE (novo padrão) e fallback para Firebase (se necessário).
 */
export async function validateAdminToken(token: string): Promise<boolean> {
  // 1. Tenta Descriptografar JWE (Padrão Rígido)
  const payload = await decryptAdminSession(token);

  if (payload && payload.role === "admin") {
    return true;
  }

  // 2. Fallback: Firebase ID Token (Legado/Transição)
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    if (decodedToken.admin === true || decodedToken.role === "admin") {
      return true;
    }
  } catch {
    // Ignora erro
  }

  return false;
}
