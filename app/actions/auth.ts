"use server";

import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { UserRegistrationSchema } from "@/lib/schemas";
import { z } from "zod";
import { signUpRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { sendVerificationEmail } from "@/lib/resend";
import { createEmailVerificationToken } from "@/lib/email-verification";
import { trackEvent } from "@/lib/analytics";
import { cleanupExpiredTokensIfDue } from "@/lib/maintenance";
import { randomBytes } from "crypto";

export async function registerUser(formData: FormData) {
  try {
    await cleanupExpiredTokensIfDue();

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    // Rate limit for sign-up attempts
    const signUpLimit = await signUpRateLimit.limit(ip);
    if (!signUpLimit.success) {
      return { error: "Muitas tentativas de registo. Tente novamente em 2 minutos." };
    }

    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      telegram: formData.get("telegram")?.toString() || "",
      country: formData.get("country")?.toString() || "",
      it_area: formData.get("it_area")?.toString() || "",
      it_role: formData.get("it_role")?.toString() || "",
    };

    const validData = UserRegistrationSchema.parse(rawData);

    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", validData.email)
      .maybeSingle();

    if (existingUser) {
      return { error: "Não foi possível concluir o registo com os dados informados." };
    }

    // Validação extra no servidor: Garantir que o username segue o padrão sem espaços
    const sanitizedUsername = validData.name.replace(/\s+/g, "").toLowerCase();

    // Verificar se o username sanitizado já existe em user_profiles
    const { data: existingProfile } = await supabaseAdmin
      .from("user_profiles")
      .select("id")
      .eq("username", sanitizedUsername)
      .maybeSingle();

    if (existingProfile) {
      return { error: "Não foi possível concluir o registo com os dados informados." };
    }

    const hashedPassword = await bcrypt.hash(validData.password, 12);

    const { data: newUser, error: userError } = await supabaseAdmin
      .from("users")
      .insert([{
        name: sanitizedUsername, // Agora garantido pelo servidor
        email: validData.email,
        password: hashedPassword,
        email_verified_at: null, // Email ainda não verificado
        created_at: new Date().toISOString(),
      }])
      .select("id")
      .single();

    if (userError || !newUser) {
      console.error("Erro ao inserir novo utilizador na base de dados");
      return { error: "Erro ao registar utilizador." };
    }

    // 2. Gerar token de compartilhamento automático
    const token = randomBytes(18).toString("base64url");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90); // 90 dias por padrão

    // 3. Criar o perfil inicial em user_profiles com o username e token de compartilhamento
    const { error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .insert([{
        user_id: newUser.id,
        username: sanitizedUsername,
        public_share_token: token,
        public_share_token_expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }]);

    if (profileError) {
      console.error("Erro ao criar perfil inicial do utilizador");
      return { error: "Erro ao criar perfil de utilizador." };
    }

    await trackEvent({
      eventType: "signup_success",
      userId: newUser.id,
      userEmail: validData.email,
    });

    // 3. Disparar mensagem de confirmação de conta
    try {
      const verificationTokenData = await createEmailVerificationToken(validData.email);
      if (verificationTokenData) {
        const { success: emailSent } = await sendVerificationEmail(validData.email, verificationTokenData);
        
        if (!emailSent) {
          console.warn("⚠️ Email de verificação não foi enviado.");
          // Continuamos mesmo assim - o utilizador pode solicitar reenvio depois
        }
      }
    } catch (emailError) {
      console.error("❌ Erro ao enviar email de verificação:", emailError);
      // Não retornamos erro aqui - o utilizador já foi criado
    }

    return { 
      success: true,
      requiresEmailVerification: true,
      message: "Registo completo! Verifique seu email para confirmar a sua conta."
    };

  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: err.errors[0].message };
    }
    console.error("Erro inesperado durante o registo de utilizador");
    return { error: "Erro inesperado. Por favor, tente mais tarde." };
  }
}
