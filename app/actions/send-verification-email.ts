'use server';

import { sendVerificationEmail } from '@/lib/resend';
import { createEmailVerificationToken, isEmailVerified } from '@/lib/email-verification';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { headers } from 'next/headers';
import { emailVerificationResendRateLimit, emailVerificationSendRateLimit } from '@/lib/rate-limit';
import { cleanupExpiredTokensIfDue } from '@/lib/maintenance';

export async function sendVerificationEmailAction(email: string) {
  try {
    await cleanupExpiredTokensIfDue();
    const normalizedEmail = email.trim().toLowerCase();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const rateLimitKey = `${normalizedEmail}:${ip}`;

    const sendLimit = await emailVerificationSendRateLimit.limit(rateLimitKey);
    if (!sendLimit.success) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um link será enviado em breve.',
      };
    }

    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, email_verified_at, name, image')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (!existingUser) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um link será enviado em breve.',
      };
    }

    if (existingUser.email_verified_at) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um link será enviado em breve.',
      };
    }

    const { data: latestToken } = await supabaseAdmin
      .from('email_verification_tokens')
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
        return {
          success: true,
          message: 'Aguarde um instante antes de solicitar um novo link.',
        };
      }
    }

    const tokenData = await createEmailVerificationToken(normalizedEmail);
    if (!tokenData) {
      return { error: 'Erro ao processar solicitação' };
    }
    const { success, error: sendError } = await sendVerificationEmail(
      normalizedEmail,
      tokenData,
      existingUser.name,
      existingUser.image
    );
    
    if (!success) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um link será enviado em breve.',
      };
    }

    return {
      success: true,
      message: 'Se existir uma conta pendente para este email, um link será enviado em breve.',
    };
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao enviar email de verificação.');
    }
    return { error: 'Erro inesperado ao enviar email' };
  }
}

export async function resendVerificationEmailAction(email: string) {
  try {
    await cleanupExpiredTokensIfDue();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const normalizedEmail = email.trim().toLowerCase();
    const rateLimitKey = `${normalizedEmail}:${ip}`;

    const resendLimit = await emailVerificationResendRateLimit.limit(rateLimitKey);
    if (!resendLimit.success) {
      return {
        error: 'Muitas tentativas de reenvio. Tente novamente em alguns minutos.',
      };
    }

    const isVerified = await isEmailVerified(normalizedEmail);
    if (isVerified) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um novo link foi enviado.',
      };
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('name, image')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (!user) {
      return {
        success: true,
        message: 'Se existir uma conta pendente para este email, um novo link foi enviado.',
      };
    }

    await supabaseAdmin
      .from('email_verification_tokens')
      .delete()
      .eq('email', normalizedEmail)
      .is('used_at', null);

    const tokenData = await createEmailVerificationToken(normalizedEmail);
    if (!tokenData) {
      return { error: 'Erro ao processar solicitação' };
    }
    const { success, error: sendError } = await sendVerificationEmail(
      normalizedEmail,
      tokenData,
      user?.name,
      user?.image
    );
    
    if (!success) {
      return { error: 'Erro ao enviar email' };
    }

    return { 
      success: true, 
      message: 'Email de verificação reenviado. Verifique sua caixa de entrada e spam.' 
    };
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao reenviar email.');
    }
    return { error: 'Erro inesperado ao reenviar email' };
  }
}
