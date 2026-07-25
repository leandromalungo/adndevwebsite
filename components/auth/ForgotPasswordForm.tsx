'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { requestPasswordResetAction } from '@/app/actions/password-reset';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await requestPasswordResetAction(email);
    setMessage(result.message || 'Se existir uma conta para este email, enviaremos um link para redefinição de senha.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl text-center font-bold text-gray-900">Esqueci a senha</h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Informe seu email para receber um link de redefinição.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
              placeholder="Digite seu email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 py-2.5 font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar'}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-gray-700">{message}</p> : null}

        <div className="mt-6 text-sm text-center">
          <Link href="/?auth=login" className="text-violet-700 hover:underline">
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
