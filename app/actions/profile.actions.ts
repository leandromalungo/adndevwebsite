"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath, revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { randomBytes } from "crypto";
import { profileShareRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

/**
 * Sanitiza mensagens de erro para não expor dados sensíveis em produção
 */
function sanitizeErrorMessage(operation: string): string {
  return `Erro ao ${operation}`;
}

// ==========================================================================
// SCHEMAS ZOD (Validação de Payload)
// ==========================================================================
// Estes esquemas garantem que os dados recebidos do frontend sigam regras estritas
// de formato e tamanho, prevenindo ataques de payload e inconsistências na DB.
const MAX_FILE_SIZE = 900 * 1024; // 900KB

const NameSchema = z.string().trim().min(2, "Nome curto demais.").max(100, "Nome longo demais.");
const BioSchema = z.string().trim().max(400, "Bio pode ter no máximo 400 caracteres.");
const UsernameSchema = z.string().trim()
  .min(3, "Username muito curto (mínimo 3 caracteres).")
  .max(50, "Username muito longo (máximo 50 caracteres).")
  .regex(/^[a-zA-Z0-9._]+$/, "Username só pode conter letras, números, pontos e underscores (sem espaços).")
  .optional()
  .or(z.literal("")); 

const ProfileInfoSchema = z.object({
  country: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  whatsapp: z.string().max(50).optional(),
  telegram: z.string().max(50).optional(),
  it_area: z.string().max(100).optional(),
  it_role: z.string().max(100).optional(),
  username: UsernameSchema,
  bio: z.string().max(1000).optional()
});

const SocialLinkSchema = z.object({
  platform: z.string().max(50),
  url: z.string().max(500),
  username: z.string().max(100)
});

const ExperienceSchema = z.object({
  role: z.string().max(100),
  company: z.string().max(100),
  date: z.string().max(100).optional(),
  end_date: z.string().max(100).optional(),
  duration: z.string().max(100).optional(),
  period: z.string().max(100).optional(),
  description: z.string().max(250).optional()
}).strict();

const ProjectSchema = z.object({
  identifier: z.string().max(100).optional(),
  date: z.string().max(100).optional(),
  name: z.string().max(100).optional(),
  description: z.string().max(100).optional(),
  url: z.string().max(500).optional()
}).strict();

const ExtraInfoSchema = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(100).optional()
}).strict();

const CertificationSchema = z.object({
  name: z.string().min(1).max(100),
  issuer: z.string().max(100).optional(),
  issue_date: z.string().max(100).optional(),
  expiry_date: z.string().max(100).optional()
}).strict();

const SkillSchema = z.string()
  .trim()
  .min(2, "Skill muito curto")
  .max(100, "Skill muito longo")
  .regex(/^[^<>]*$/, "Caracteres '<' ou '>' não permitidos por segurança.");

// ==========================================================================
// Auxiliar de Segurança (Validação de Sessão)
// ==========================================================================

/**
 * Obtém o userId autenticado da sessão atual.
 * Lança um erro se o utilizador não estiver autenticado ou se o
 * userId fornecido não coincidir com a sessão (previne falsificação de identidade/spoofing).
 */
async function getValidatedUserId(claimedUserId: string): Promise<string> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Não autenticado.");
  if (session.user.id !== claimedUserId) {
    throw new Error("Acesso não autorizado.");
  }
  return session.user.id;
}

// Helper: invalidate the profile server cache (RSC + unstable_cache tag)
function invalidate() {
  revalidatePath("/profile");
  revalidateTag("profile-data", "default");
}

function generatePublicShareToken() {
  return randomBytes(18).toString("base64url");
}

const AVATARS_BUCKET = "avatars";
/** MIME que o perfil aceita; deve estar alinhado com o bucket no Supabase. */
const BUCKET_PROFILE_MIMES = ["image/jpeg", "image/jpg", "image/png"] as const;

type DetectedImage = {
  mime: "image/jpeg" | "image/png";
  ext: "jpg" | "png";
};

function detectImageMimeType(bytes: Uint8Array): DetectedImage | null {
  if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { mime: "image/png", ext: "png" };
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  return null;
}

/**
 * Se o bucket tiver `allowed_mime_types` definido, o Storage rejeita outros tipos.
 * Isto adiciona JPEG/PNG à lista (mantém `public` e tipos já permitidos).
 */
async function ensureAvatarsBucketAcceptsProfileImages(): Promise<void> {
  const { data: bucket, error } = await supabaseAdmin.storage.getBucket(AVATARS_BUCKET);
  if (error || !bucket) return;

  const current = bucket.allowed_mime_types;
  if (current == null) return;

  const missing = BUCKET_PROFILE_MIMES.filter((t) => !current.includes(t));
  if (missing.length === 0) return;

  const merged = current.length === 0 ? [...missing] : [...current, ...missing];
  const { error: updErr } = await supabaseAdmin.storage.updateBucket(AVATARS_BUCKET, {
    public: bucket.public,
    allowedMimeTypes: merged,
  });
  if (updErr) {
    console.warn("[storage] Não foi possível atualizar tipos MIME permitidos do bucket de avatares");
  }
}

// ==========================================
// PROFILE BASE INFO
// ==========================================

/**
 * Garante que um utilizador tem um token de compartilhamento válido
 * Se não existir ou estiver expirado, gera um novo
 */
async function ensureShareToken(userId: string): Promise<void> {
  const { data: existing, error: readError } = await supabaseAdmin
    .from("user_profiles")
    .select("public_share_token, public_share_token_expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (readError) {
    console.warn("Aviso: Não foi possível validar token de compartilhamento");
    return;
  }

  // Se o token existe e não expirou, não precisa fazer nada
  if (existing?.public_share_token) {
    const expiresAt = existing.public_share_token_expires_at ? new Date(existing.public_share_token_expires_at) : null;
    if (!expiresAt || expiresAt > new Date()) {
      return; // Token ainda válido
    }
  }

  // Gerar novo token com 90 dias de expiração
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 90);

  const token = generatePublicShareToken();
  const { error } = await supabaseAdmin
    .from("user_profiles")
    .upsert(
      {
        user_id: userId,
        public_share_token: token,
        public_share_token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) {
    console.warn("Aviso: Não foi possível criar token de compartilhamento automático");
  }
}

export async function updateProfileInfo(userId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = ProfileInfoSchema.parse(data);
  
  // Garantir que existe um token de compartilhamento
  await ensureShareToken(userId);
  
  const { error } = await supabaseAdmin
    .from("user_profiles")
    .upsert({ user_id: userId, ...validData, updated_at: new Date() }, { onConflict: "user_id" });
  if (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw new Error(sanitizeErrorMessage('executar operação'));
  }
  invalidate();
}

export async function updateProfileBio(userId: string, bio: string) {
  const validBio = BioSchema.parse(bio);
  return updateProfileInfo(userId, { bio: validBio });
}

export async function updateUserName(userId: string, name: string) {
  await getValidatedUserId(userId);
  const validName = NameSchema.parse(name);
  const { error } = await supabaseAdmin.from("users").update({ name: validName }).eq("id", userId);
  if (error) throw new Error("Erro ao atualizar nome do utilizador");
  invalidate();
}

export async function updateProfilePhoto(userId: string, formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("Nenhum ficheiro enviado.");

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ficheiro muito grande (máx. 900KB).");
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const detectedImage = detectImageMimeType(bytes);

  if (!detectedImage) {
    throw new Error("Formato de ficheiro inválido. Use apenas .jpg ou .png.");
  }

  await getValidatedUserId(userId);

  // 1. Obter imagem atual para remoção posterior
  const { data: userData } = await supabaseAdmin
    .from("users")
    .select("image")
    .eq("id", userId)
    .single();

  const oldImageFullUrl = userData?.image;

  // 2. Preparar novo ficheiro com nome seguro e tipo verificado
  const fileName = `${userId}-${Date.now()}-${randomBytes(6).toString("hex")}.${detectedImage.ext}`;

  await ensureAvatarsBucketAcceptsProfileImages();

  // 3. Upload para Supabase Storage (bucket: avatars)
  const { error: uploadError } = await supabaseAdmin.storage
    .from(AVATARS_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: detectedImage.mime,
    });

  if (uploadError) {
    const hint =
      /mime type/i.test(uploadError.message)
        ? " Confirme no Supabase → Storage → avatars → tipos MIME permitidos (image/jpeg, image/png) ou deixe em branco para aceitar todos."
        : "";
    throw new Error(`Erro no upload: ${uploadError.message}.${hint}`);
  }

  // 4. Obter URL pública
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from(AVATARS_BUCKET)
    .getPublicUrl(fileName);

  // 5. Atualizar tabela de utilizadores
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({ image: publicUrl })
    .eq("id", userId);

  if (updateError) {
    // Tentar limpar o ficheiro carregado em caso de erro na DB
    await supabaseAdmin.storage.from(AVATARS_BUCKET).remove([fileName]);
    throw new Error(`Erro ao atualizar perfil: ${updateError.message}`);
  }

  // 6. Eliminar foto antiga do storage (apenas URLs do bucket avatars)
  if (oldImageFullUrl?.includes("/storage/v1/object/public/avatars/")) {
    try {
      const pathToDelete = oldImageFullUrl
        .split("/storage/v1/object/public/avatars/")[1]
        ?.split("?")[0];
      if (pathToDelete) {
        await supabaseAdmin.storage.from(AVATARS_BUCKET).remove([pathToDelete]);
      }
    } catch (err) {
      console.warn("Aviso: Não foi possível eliminar a foto.");
    }
  }

  invalidate();
  return { success: true, url: publicUrl };
}

export async function getOrCreatePublicProfileShareToken(userId: string, expirationDays: number = 30) {
  await getValidatedUserId(userId);

  const { data: existing, error: readError } = await supabaseAdmin
    .from("user_profiles")
    .select("public_share_token, public_share_token_expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (readError) {
    throw new Error("Erro ao obter link público do perfil.");
  }

  // Se o token existe e não expirou, retorna
  if (existing?.public_share_token) {
    const expiresAt = existing.public_share_token_expires_at ? new Date(existing.public_share_token_expires_at) : null;
    if (!expiresAt || expiresAt > new Date()) {
      return existing.public_share_token;
    }
  }

  // Gerar novo token com expiração
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expirationDays);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const token = generatePublicShareToken();
    const { error } = await supabaseAdmin
      .from("user_profiles")
      .upsert(
        {
          user_id: userId,
          public_share_token: token,
          public_share_token_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (!error) {
      return token;
    }
  }

  throw new Error("Não foi possível gerar um link público seguro.");
}

export async function updateProfileShareTokenExpiration(userId: string, expirationDays: number) {
  await getValidatedUserId(userId);

  if (expirationDays < 1 || expirationDays > 365) {
    throw new Error("Dias de expiração devem estar entre 1 e 365.");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expirationDays);

  const { error } = await supabaseAdmin
    .from("user_profiles")
    .update({
      public_share_token_expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) {
    throw new Error("Erro ao atualizar expiração do link.");
  }

  invalidate();
}

export async function getProfileShareTokenInfo(userId: string) {
  await getValidatedUserId(userId);

  const { data, error } = await supabaseAdmin
    .from("user_profiles")
    .select("public_share_token, public_share_token_expires_at")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error("Erro ao obter informações do link compartilhado.");
  }

  return data;
}

/**
 * Garante que um utilizador tem um token de compartilhamento válido
 * Chamada automaticamente quando o utilizador acede ao seu perfil
 * Não lança erros - apenas cria o token se necessário
 */
export async function ensureUserShareToken(userId: string): Promise<void> {
  try {
    // (útil para garantir que o token existe mesmo para acessos antigos)
    const { data: existing, error: readError } = await supabaseAdmin
      .from("user_profiles")
      .select("public_share_token, public_share_token_expires_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (readError) {
      console.warn(`[ensureUserShareToken] Não foi possível obter perfil para ${userId}`);
      return;
    }

    // Se o token existe e não expirou, não precisa fazer nada
    if (existing && existing.public_share_token) {
      const expiresAt = existing.public_share_token_expires_at ? new Date(existing.public_share_token_expires_at) : null;
      if (!expiresAt || expiresAt > new Date()) {
        return; // Token ainda válido
      }
    }

    // Gerar novo token com 90 dias de expiração (Upsert garante criação se o perfil não existir)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90);

    const token = generatePublicShareToken();
    const { error } = await supabaseAdmin
      .from("user_profiles")
      .upsert(
        {
          user_id: userId,
          public_share_token: token,
          public_share_token_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (error) {
      console.warn(`[ensureUserShareToken] Não foi possível garantir token para ${userId}:`, error);
    }
  } catch (err) {
    console.warn("[ensureUserShareToken] Erro inesperado:", err);
    // Não lança erro - apenas loga aviso
  }
}

export async function shareProfileByEmail(userId: string, recipientEmail: string, shareLink: string) {
  await getValidatedUserId(userId);

  // Proteção contra Spam (Rate Limiting)
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  const { success } = await profileShareRateLimit.limit(`${userId}:${ip}`);
  
  if (!success) throw new Error("Limite de partilhas atingido. Tente novamente mais tarde.");

  // Validar email
  if (!recipientEmail.includes("@") || recipientEmail.length > 255) {
    throw new Error("Email inválido.");
  }

  // Validar shareLink
  if (!shareLink.startsWith("http") || shareLink.length > 500) {
    throw new Error("Link inválido.");
  }

  // Registar a partilha
  const { error: insertError } = await supabaseAdmin
    .from("profile_email_shares")
    .insert({
      user_id: userId,
      recipient_email: recipientEmail.toLowerCase(),
      share_link: shareLink,
    });

  if (insertError && !insertError.message.includes("duplicate")) {
    throw new Error("Erro ao registar partilha por email.");
  }

  // Enviar email (se tiver serviço de email configurable)
  // Usar Resend ou outro serviço
  try {
    const userResult = await supabaseAdmin
      .from("users")
      .select("name, email")
      .eq("id", userId)
      .single();

    if (userResult.data) {
      // Aqui você pode integrar com Resend ou outro serviço
      console.log(`Email de partilha enviado para ${recipientEmail} pelo utilizador ${userResult.data.name}`);
    }
  } catch (err) {
    console.warn("Aviso: Não foi possível enviar o email de notificação.");
  }

  return { success: true, message: "Link compartilhado com sucesso." };
}

export async function getProfileEmailShares(userId: string) {
  await getValidatedUserId(userId);

  const { data, error } = await supabaseAdmin
    .from("profile_email_shares")
    .select("*")
    .eq("user_id", userId)
    .order("shared_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error("Erro ao obter histórico de partilhas.");
  }

  return data || [];
}

// ==========================================================================
// LINKS SOCIAIS
// ==========================================================================
export async function addSocialLink(userId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = SocialLinkSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_social_links")
    .insert([{ user_id: userId, ...validData }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function updateSocialLink(userId: string, linkId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = SocialLinkSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_social_links")
    .update(validData)
    .eq("id", linkId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function deleteSocialLink(userId: string, linkId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_social_links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

// ==========================================
// SKILLS
// ==========================================
export async function addSkill(userId: string, type: string, skillName: string) {
  await getValidatedUserId(userId);
  const validSkill = SkillSchema.parse(skillName);
  const { error } = await supabaseAdmin
    .from("user_skills")
    .insert([{ user_id: userId, type, name: validSkill }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function deleteSkill(userId: string, skillId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_skills")
    .delete()
    .eq("id", skillId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

// ==========================================
// EXPERIENCES
// ==========================================
export async function addExperience(userId: string, data: any) {
  await getValidatedUserId(userId);
  const parsed = ExperienceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Dados de experiência inválidos.");
  }
  const validData = parsed.data;
  const { error } = await supabaseAdmin
    .from("user_experiences")
    .insert([{ user_id: userId, ...validData }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function updateExperience(userId: string, experienceId: string, data: any) {
  await getValidatedUserId(userId);
  const parsed = ExperienceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Dados de experiência inválidos.");
  }
  const validData = parsed.data;
  const { error } = await supabaseAdmin
    .from("user_experiences")
    .update(validData)
    .eq("id", experienceId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function deleteExperience(userId: string, experienceId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_experiences")
    .delete()
    .eq("id", experienceId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

// ==========================================================================
// CERTIFICAÇÕES
// ==========================================================================
export async function addCertification(userId: string, data: any) {
  await getValidatedUserId(userId);
  // Suporta tanto uma string simples (apenas título) quanto um objeto completo
  const payload = typeof data === 'string' ? { name: data } : data;
  const validData = CertificationSchema.parse(payload);
  const { error } = await supabaseAdmin
    .from("user_certifications")
    .insert([{ user_id: userId, ...validData }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function updateCertification(userId: string, certId: string, data: any) {
  await getValidatedUserId(userId);
  const payload = typeof data === 'string' ? { name: data } : data;
  const validData = CertificationSchema.parse(payload);
  const { error } = await supabaseAdmin
    .from("user_certifications")
    .update(validData)
    .eq("id", certId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function deleteCertification(userId: string, certId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_certifications")
    .delete()
    .eq("id", certId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

// ==========================================
// EXTRA INFO
// ==========================================
export async function addExtraInfo(userId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = ExtraInfoSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_extra_info")
    .insert([{ user_id: userId, ...validData }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function updateExtraInfo(userId: string, infoId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = ExtraInfoSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_extra_info")
    .update(validData)
    .eq("id", infoId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function deleteExtraInfo(userId: string, infoId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_extra_info")
    .delete()
    .eq("id", infoId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

// ==========================================
// PROJECTS
// ==========================================
export async function addProject(userId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = ProjectSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_projects")
    .insert([{ user_id: userId, ...validData }]);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}

export async function updateProject(userId: string, projectId: string, data: any) {
  await getValidatedUserId(userId);
  const validData = ProjectSchema.parse(data);
  const { error } = await supabaseAdmin
    .from("user_projects")
    .update(validData)
    .eq("id", projectId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));

  invalidate();
}

export async function deleteProject(userId: string, projectId: string) {
  await getValidatedUserId(userId);
  const { error } = await supabaseAdmin
    .from("user_projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", userId);
  if (error) throw new Error(sanitizeErrorMessage('executar operação'));
  invalidate();
}
