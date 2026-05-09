import { verifyEmailToken } from '@/lib/email-verification';
import { redirect } from 'next/navigation';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code } = await searchParams;

  // Se o identificador estiver ausente, redireciona para login
  if (!code || typeof code !== 'string') {
    redirect('/?auth=login&error=Link%20de%20verifica%C3%A7%C3%A3o%20inv%C3%A1lido');
  }

  // Valida o identificador recebido (código one-time)
  const result = await verifyEmailToken(code);

  if (!result.success) {
    // Não expor detalhes de erro na URL em produção
    redirect('/?auth=login&error=Link%20inv%C3%A1lido%20ou%20expirado');
  }

  // Se sucesso, redirecionar para login com mensagem
  redirect('/?auth=login&verified=true');
}
