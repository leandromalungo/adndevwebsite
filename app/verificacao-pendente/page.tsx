import PendingEmailVerification from '@/components/auth/PendingEmailVerification';
import { Suspense } from 'react';

export default async function PendingVerificationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { email } = await searchParams;

  // Se os dados mínimos não vierem, renderiza estado de fallback
  if (!email || typeof email !== 'string') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Email inválido</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Não foi possível identificar o email para verificação.
          </p>
          <a
            href="/"
            className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-violet-600 text-white text-sm sm:text-base rounded hover:bg-violet-700 transition-colors"
          >
            Voltar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">A carregar...</p>
        </div>
      }>
        <PendingEmailVerification email={decodeURIComponent(email)} />
      </Suspense>
    </div>
  );
}
