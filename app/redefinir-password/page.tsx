import Link from 'next/link';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { code } = await searchParams;

  if (!code || typeof code !== 'string') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">Link inválido</h1>
          <p className="mt-2 text-sm text-gray-600">
            O link de redefinição está inválido ou incompleto.
          </p>
          <Link href="/esqueci-password" className="mt-4 inline-block text-sm text-violet-700 hover:underline">
            Tentar de novo
          </Link>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm code={code} />;
}
