import 'server-only';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/admin';
import crypto from 'crypto';
import { randomUUID } from 'crypto';

export const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
export const PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 1;

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateOneTimeCode(): string {
  return randomUUID();
}

function hashVerificationToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function hashPasswordResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createEmailVerificationToken(email: string): Promise<{ token: string; oneTimeCode: string } | null> {
  try {
    const rawToken = generateVerificationToken();
    const tokenHash = hashVerificationToken(rawToken);
    const oneTimeCode = generateOneTimeCode();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + VERIFICATION_TOKEN_EXPIRY_HOURS);

    const { error } = await supabaseAdmin
      .from('email_verification_tokens')
      .insert({
        email,
        token: tokenHash,
        one_time_code: oneTimeCode,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao criar token de verificação:', error);
      }
      return null;
    }

    return { token: rawToken, oneTimeCode };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado ao criar token.');
    }
    return null;
  }
}

export async function verifyEmailToken(oneTimeCode: string): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    const nowIso = new Date().toISOString();

    // Consumo atômico do código one-time
    const { data: consumedToken, error: consumeError } = await supabaseAdmin
      .from('email_verification_tokens')
      .update({ used_at: nowIso })
      .eq('one_time_code', oneTimeCode)
      .is('used_at', null)
      .gt('expires_at', nowIso)
      .select('email')
      .maybeSingle();

    if (consumeError || !consumedToken) {
      return { success: false, error: 'Link inválido ou expirado' };
    }

    const { error: userError } = await supabaseAdmin
      .from('users')
      .update({ email_verified_at: new Date().toISOString() })
      .eq('email', consumedToken.email);

    if (userError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao marcar email como verificado:', userError);
      }
      return { success: false, error: 'Erro ao verificar email' };
    }

    return { success: true, email: consumedToken.email };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao verificar token.');
    }
    return { success: false, error: 'Erro inesperado' };
  }
}

export async function createPasswordResetToken(email: string): Promise<{ token: string; oneTimeCode: string } | null> {
  try {
    const rawToken = generateVerificationToken();
    const tokenHash = hashPasswordResetToken(rawToken);
    const oneTimeCode = generateOneTimeCode();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + PASSWORD_RESET_TOKEN_EXPIRY_HOURS);

    await supabaseAdmin
      .from('password_reset_tokens')
      .delete()
      .eq('email', email)
      .is('used_at', null);

    const { error } = await supabaseAdmin
      .from('password_reset_tokens')
      .insert({
        email,
        token: tokenHash,
        one_time_code: oneTimeCode,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao criar token de redefinição.');
      }
      return null;
    }

    return { token: rawToken, oneTimeCode };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado ao criar token de redefinição.');
    }
    return null;
  }
}

export async function consumePasswordResetToken(oneTimeCode: string): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    const nowIso = new Date().toISOString();

    const { data: consumedToken, error } = await supabaseAdmin
      .from('password_reset_tokens')
      .update({ used_at: nowIso })
      .eq('one_time_code', oneTimeCode)
      .is('used_at', null)
      .gt('expires_at', nowIso)
      .select('email')
      .maybeSingle();

    if (error || !consumedToken) {
      return { success: false, error: 'Link inválido ou expirado' };
    }

    return { success: true, email: consumedToken.email };
  } catch {
    return { success: false, error: 'Erro inesperado' };
  }
}

export async function cleanupExpiredTokens(): Promise<number> {
  try {
    const { count: countBefore } = await supabaseAdmin
      .from('email_verification_tokens')
      .select('id', { count: 'exact', head: true })
      .lt('expires_at', new Date().toISOString());

    const { error } = await supabaseAdmin
      .from('email_verification_tokens')
      .delete()
      .lt('expires_at', new Date().toISOString());

    await supabaseAdmin
      .from('password_reset_tokens')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error during cleanup:', error);
      }
      return 0;
    }

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const { data: unverifiedUsers } = await supabaseAdmin
      .from('users')
      .select('id')
      .is('email_verified_at', null)
      .lt('created_at', twentyFourHoursAgo.toISOString());

    if (unverifiedUsers && unverifiedUsers.length > 0) {
      const userIds = unverifiedUsers.map(u => u.id);

      await supabaseAdmin
        .from('user_profiles')
        .delete()
        .in('user_id', userIds);

      await supabaseAdmin
        .from('users')
        .delete()
        .in('id', userIds);
    }

    return countBefore ?? 0;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Cleanup error.');
    }
    return 0;
  }
}

export async function isEmailVerified(email: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('email_verified_at')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return false;
    return !!data.email_verified_at;
  } catch (error) {
    return false;
  }
}
