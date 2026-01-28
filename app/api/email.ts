import { API_RESEND } from '@/lib/constants';
import { Resend } from 'resend';

const resend = new Resend(API_RESEND);

export async function POST(request: Request) {
  try {
    const { email, subject, html } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'seu-email@seu-dominio.com',
      to: email,
      subject: subject,
      html: html,
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: 'Erro ao enviar email' }, { status: 500 });
  }
}