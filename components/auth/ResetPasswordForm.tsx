'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { resetPasswordAction } from '@/app/actions/password-reset';

interface ResetPasswordFormProps {
  code: string;
}

export default function ResetPasswordForm({ code }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result = await resetPasswordAction(code, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Não foi possível redefinir a senha.');
      return;
    }

    setSuccess(result.message || 'Senha redefinida com sucesso.');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Redefinir senha</h1>
        <p className="mt-2 text-sm text-gray-600">
          Defina uma nova senha para sua conta.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 text-xs font-semibold uppercase text-gray-600">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-700"
              placeholder="Confirme a nova senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 py-2.5 font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Redefinir senha'}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        {success ? <p className="mt-4 text-sm text-green-600">{success}</p> : null}

        <div className="mt-6 text-sm">
          <Link href="/?auth=login" className="text-violet-700 hover:underline">
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
