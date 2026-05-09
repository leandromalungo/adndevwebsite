import 'server-only';
import { Resend } from 'resend';
import { trackEvent } from "@/lib/analytics";

const apiKey = process.env.RESEND_API_KEY;

export const resend = new Resend(apiKey);
export const SENDER_EMAIL = 'geral@adndeveloper.com';

function getAppBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!envUrl) return 'https://adndeveloper.com';
  return envUrl.replace(/\/+$/, '');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

function isSafeImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function sendVerificationEmail(
  email: string,
  verificationTokenData: { token: string; oneTimeCode: string },
  userName?: string | null,
  userImage?: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const appBaseUrl = getAppBaseUrl();
    // Usar o UUID one-time code na URL, não o token raw
    const verificationUrl = `${appBaseUrl}/verificar-email?code=${encodeURIComponent(verificationTokenData.oneTimeCode)}`;

    const safeUserName = userName ? escapeHtml(userName) : '';
    const safeUserImage = userImage && isSafeImageUrl(userImage) ? userImage : '';

    const userImageHtml = safeUserImage
      ? `<img src="${safeUserImage}" alt="${safeUserName}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 2px solid #007bff;">`
      : '';
    const userNameHtml = safeUserName
      ? `<p style="color: #333; font-size: 14px; margin: 10px 0 0 0;"><strong>${safeUserName}</strong></p>`
      : '';

    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Verifique seu email - ADN Developer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0;">ADN Developer</h1>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              ${userImageHtml}
              ${userNameHtml}
            </div>
            
            <h2 style="color: #333; margin-top: 0;">Bem-vindo!</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Obrigado por se registar na ADN Developer. Para completar o seu registo, 
              clique no botão abaixo para verificar seu email.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-size: 16px; 
                        font-weight: bold; display: inline-block;">
                Verificar Email
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
              Ou copie este link no seu navegador:
              <br/>
              <a href="${verificationUrl}" style="color: #007bff; text-decoration: none; word-break: break-all;">
                ${verificationUrl}
              </a>
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
              Este link expira em 24 horas.
              <br/>
              Se você não se registou na ADN Developer, ignore este email.
            </p>
          </div>
        </div>
      `,
    });

    if (response.error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao enviar email:', response.error);
      }
      return { success: false, error: 'Erro ao enviar email' };
    }

    await trackEvent({
      eventType: "email_sent",
      userEmail: email,
      metadata: { template: "verification" },
    });

    return { success: true };
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado ao enviar email.');
    }
    return { success: false, error: 'Erro ao enviar email' };
  }
}


export async function sendPasswordResetEmail(
  email: string,
  resetTokenData: { token: string; oneTimeCode: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const appBaseUrl = getAppBaseUrl();
    // Usar o UUID one-time code na URL, não o token raw
    const resetUrl = `${appBaseUrl}/redefinir-password?code=${encodeURIComponent(resetTokenData.oneTimeCode)}`;

    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Redefinir Password - ADN Developer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin: 0;">ADN Developer</h1>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Redefinir Password</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Recebemos um pedido para redefinir a password da sua conta. 
              Clique no botão abaixo para criar uma nova password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #dc3545; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-size: 16px; 
                        font-weight: bold; display: inline-block;">
                Redefinir Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
              Este link expira em 1 hora.
              <br/>
              Se você não solicitou isso, ignore este email.
            </p>
          </div>
        </div>
      `,
    });

    if (response.error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao enviar email de reset:', response.error);
      }
      return { success: false, error: 'Erro ao enviar email' };
    }

    await trackEvent({
      eventType: "email_sent",
      userEmail: email,
      metadata: { template: "password_reset" },
    });

    return { success: true };
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro inesperado ao enviar email de reset:', error);
    }
    return { success: false, error: 'Erro ao enviar email' };
  }
}
