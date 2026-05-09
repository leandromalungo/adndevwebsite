'use server';

import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendPasswordResetEmail } from '@/lib/resend';
import { consumePasswordResetToken, createPasswordResetToken } from '@/lib/email-verification';
import { passwordResetRequestRateLimit } from '@/lib/rate-limit';
import { cleanupExpiredTokensIfDue } from '@/lib/maintenance';

const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(128, 'Máximo 128 caracteres')
    .regex(/[A-Z]/, 'Mínimo 1 letra MAIÚSCULA')
    .regex(/[a-z]/, 'Mínimo 1 letra minúscula')
    .regex(/[0-9]/, 'Mínimo 1 número'),
});

const GENERIC_RESET_MESSAGE = 'Se existir uma conta para este email, enviaremos um link para redefinição de senha.';

export async function requestPasswordResetAction(email: string) {
  try {
    await cleanupExpiredTokensIfDue();

    const normalizedEmail = email.trim().toLowerCase();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const rateLimitKey = `${normalizedEmail}:${ip}`;

    const limit = await passwordResetRequestRateLimit.limit(rateLimitKey);
    if (!limit.success) {
      return { success: true, message: GENERIC_RESET_MESSAGE };
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (!user) {
      return { success: true, message: GENERIC_RESET_MESSAGE };
    }

    const { data: latestToken } = await supabaseAdmin
      .from('password_reset_tokens')
      .select('created_at')
      .eq('email', normalizedEmail)
      .is('used_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestToken?.created_at) {
      const createdAtMs = new Date(latestToken.created_at).getTime();
      const elapsedMs = Date.now() - createdAtMs;
      const cooldownMs = 60 * 1000;
      if (elapsedMs < cooldownMs) {
        return { success: true, message: GENERIC_RESET_MESSAGE };
      }
    }

    const tokenData = await createPasswordResetToken(normalizedEmail);
    if (!tokenData) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Falha ao criar token de redefinição para:', normalizedEmail);
      }
      return { success: true, message: GENERIC_RESET_MESSAGE };
    }

    const { success: emailSent, error: emailError } = await sendPasswordResetEmail(normalizedEmail, tokenData);
    
    if (!emailSent && process.env.NODE_ENV === 'development') {
      console.error('Falha no envio do e-mail de reset:', emailError);
    }

    return { success: true, message: GENERIC_RESET_MESSAGE };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado em requestPasswordResetAction:', error);
    }
    return { success: true, message: GENERIC_RESET_MESSAGE };
  }
}

export async function resetPasswordAction(code: string, newPassword: string) {
  try {
    const parsed = ResetPasswordSchema.safeParse({ password: newPassword });
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || 'Senha inválida' };
    }

    const consumeResult = await consumePasswordResetToken(code);
    if (!consumeResult.success || !consumeResult.email) {
      return { success: false, error: 'Token inválido ou expirado' };
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const { error } = await supabaseAdmin
      .from('users')
      .update({ password: passwordHash })
      .eq('email', consumeResult.email);

    if (error) {
      return { success: false, error: 'Não foi possível redefinir a senha' };
    }

    return { success: true, message: 'Senha redefinida com sucesso' };
  } catch {
    return { success: false, error: 'Erro inesperado ao redefinir senha' };
  }
}
