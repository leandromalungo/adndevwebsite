/**
 * EXEMPLO: Como Integrar Email Verification no seu Componente de Signup
 * 
 * Este arquivo mostra como modificar seu componente de signup
 * para redirecionar para a página de verificação pendente após o registo.
 */

'use client';

import { useState } from 'react';
import { registerUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    try {
      // Chamar server action de registo
      const result = await registerUser(formData);

      if (result.success) {
        // ✅ NOVO: Se requer verificação de email
        if (result.requiresEmailVerification) {
          const email = formData.get('email') as string;
          // Redirecionar para página de verificação pendente
          router.push(
            `/auth/verificacao-pendente?email=${encodeURIComponent(email)}`
          );
          return;
        }

        // Se não requer (possível no futuro), redirecionar para login
        router.push('/auth/login?registered=true');
      } else {
        setError(result.error || 'Erro ao registar');
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Nome de usuário"
        required
        className="w-full px-4 py-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 border rounded"
      />

      {/* Outros campos... */}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'A registar...' : 'Registar'}
      </Button>
    </form>
  );
}

/**
 * IMPORTANTE:
 * 
 * 1. O componente PendingEmailVerification pode ser usado em qualquer lugar
 * 2. Ele inclui opção de reenviar email
 * 3. Mostra instruções claras ao utilizador
 * 4. Redireciona para login após verificação (em app/verificar-email/page.tsx)
 */
