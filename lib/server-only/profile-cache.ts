"use server";

/**
 * 🔒 FICHEIRO PROTEGIDO - APENAS PARA SERVIDOR
 * 
 * Este ficheiro contém SUPABASE_SERVICE_ROLE_KEY
 * NUNCA deve ser importado em componentes "use client"
 * 
 * A directiva "use server" garante que isto NUNCA será incluído no bundle do cliente
 */

import { unstable_cache } from "next/cache";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

const getCachedProfileData = unstable_cache(
  async (userId: string) => {
    if (!isSupabaseConfigured()) return null;
    try {
      const [
        userResult,
        profileResult,
        { data: socialLinks },
        { data: skills },
        { data: experiences },
        { data: certifications },
        { data: extraInfo },
        { data: projects },
      ] = await Promise.all([
        supabaseAdmin.from("users").select("name, image").eq("id", userId).single(),
        supabaseAdmin.from("user_profiles").select("*").eq("user_id", userId).single(),
        supabaseAdmin.from("user_social_links").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
        supabaseAdmin.from("user_skills").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
        supabaseAdmin.from("user_experiences").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
        supabaseAdmin.from("user_certifications").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
        supabaseAdmin.from("user_extra_info").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
        supabaseAdmin.from("user_projects").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
      ]);

      // Log errors (PGRST116 = nenhuma linha encontrada, é esperado)
      if (userResult.error && userResult.error.code !== "PGRST116") {
        console.error(`[ProfileCache] User query error for ${userId}:`, userResult.error);
      }
      if (profileResult.error && profileResult.error.code !== "PGRST116") {
        console.error(`[ProfileCache] Profile query error for ${userId}:`, profileResult.error);
      }

      return {
        realName: userResult.data?.name ?? "",
        image: userResult.data?.image ?? null,
        profile: profileResult.data ?? {},
        socialLinks: socialLinks ?? [],
        skills: skills ?? [],
        experiences: experiences ?? [],
        certifications: certifications ?? [],
        extraInfo: extraInfo ?? [],
        projects: projects ?? [],
      };
    } catch (error) {
      console.error(`[ProfileCache] Unexpected error loading profile for user ${userId}:`, error);
      throw error;
    }
  },
  undefined,  // argumentos vazios
  {
    tags: ["profile-data"], // usado por revalidateTag nas ações
    revalidate: 3600,       // fallback: revalida após 1 hora
  }
);

export async function getProfileData(userId: string) {
  return getCachedProfileData(userId);
}

function toPublicProfile(profileData: NonNullable<Awaited<ReturnType<typeof getCachedProfileData>>>) {
  return {
    ...profileData,
    profile: {
      ...profileData.profile,
      phone: null,
      whatsapp: null,
      telegram: null,
    }
  };
}

export async function getProfileByUsername(username: string) {
  if (!isSupabaseConfigured()) return null;
  try {
    // 1. Decodificar e limpar o username (remover @ inicial se existir)
    const decodedUsername = decodeURIComponent(username);
    const cleanUsername = decodedUsername.replace(/^@/, "").toLowerCase();

    const { data, error } = await supabaseAdmin
      .from("user_profiles")
      .select("user_id")
      .eq("username", cleanUsername)
      .single();

    if (error) {
      console.warn(`[ProfileCache] Username not found: ${cleanUsername}`, {
        code: error.code,
        message: error.message,
      });
      return null;
    }

    if (!data) {
      console.warn(`[ProfileCache] No user_id for username: ${cleanUsername}`);
      return null;
    }

    const profileData = await getCachedProfileData(data.user_id);

    // 2. Filtrar dados sensíveis para a vista pública (segurança absoluta no servidor)
    return profileData ? toPublicProfile(profileData) : null;
  } catch (error) {
    console.error(`[ProfileCache] Unexpected error in getProfileByUsername:`, error);
    return null;
  }
}

export async function getProfileByShareToken(token: string) {
  if (!isSupabaseConfigured()) return null;
  try {
    // Validação básica: token não pode ser vazio ou undefined
    if (!token || typeof token !== 'string') {
      console.warn(`[ProfileCache] Invalid token type: ${typeof token}`);
      return null;
    }

    const cleanToken = token.trim();

    if (!/^[A-Za-z0-9_-]{16,120}$/.test(cleanToken)) {
      console.warn(`[ProfileCache] Token format invalid: ${cleanToken.substring(0, 10)}...`);
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from("user_profiles")
      .select("user_id, public_share_token_expires_at")
      .eq("public_share_token", cleanToken)
      .single();

    if (error) {
      console.error(`[ProfileCache] Supabase error fetching share token:`, {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      return null;
    }

    if (!data) {
      console.warn(`[ProfileCache] Share token not found: ${cleanToken.substring(0, 10)}...`);
      return null;
    }

    // Validar expiração do token
    if (data.public_share_token_expires_at) {
      const expiresAt = new Date(data.public_share_token_expires_at);
      if (expiresAt < new Date()) {
        console.warn(`[ProfileCache] Share token expired for user: ${data.user_id}`);
        return null; // Token expirado
      }
    }

    const profileData = await getCachedProfileData(data.user_id);
    if (!profileData) {
      console.warn(`[ProfileCache] No profile data found for user: ${data.user_id}`);
      return null;
    }

    return toPublicProfile(profileData);
  } catch (error) {
    console.error(`[ProfileCache] Unexpected error in getProfileByShareToken:`, error);
    return null;
  }
}
