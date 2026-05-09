/**
 * ⚠️ FICHEIRO DEPRECADO - NÃO USAR
 * 
 * 🔒 A função getProfileData foi movida para:
 *    @/lib/server-only/profile-cache
 * 
 * Razão: Proteger contra exposição de SUPABASE_SERVICE_ROLE_KEY
 * A nova localização com "use server" garante que nunca será incluída no bundle do cliente
 * 
 * ✅ Atualizar imports para:
 *    import { getProfileData } from "@/lib/server-only/profile-cache";
 */

// @deprecated Use @/lib/server-only/profile-cache instead
export { getProfileData } from "@/lib/server-only/profile-cache";
