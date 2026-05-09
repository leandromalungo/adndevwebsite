'use client';

import { useState } from 'react';
import { resendVerificationEmailAction } from '@/app/actions/send-verification-email';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface PendingEmailVerificationProps {
  email: string;
}

export default function PendingEmailVerification({ email }: PendingEmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage(null);

    const result = await resendVerificationEmailAction(email);

    setResendMessage({
      type: result.success ? 'success' : 'error',
      text:
        result.success
          ? result.message || 'Email reenviado com sucesso!'
          : result.error || 'Erro ao reenviar email',
    });

    setIsResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-6 text-center shadow-md border-0 rounded-2xl">

        {/* Ícone */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <Mail className="w-6 h-6 text-yellow-600" />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-900">
          Verifique seu email
        </h2>

        {/* Subtexto */}
        <p className="text-sm text-gray-500 mt-1">
          Enviámos um link para:
        </p>

        <p className="text-sm font-medium text-gray-800 mb-4 break-all">
          {email}
        </p>

        {/* Instruções */}
        <div className="text-xs text-gray-500 bg-gray-100 rounded-lg p-3 mb-4 text-left">
          <p>1. Abra seu email</p>
          <p>2. Clique no link de verificação</p>
          <p>3. Volte e faça login</p>
        </div>

        {/* Feedback */}
        {resendMessage && (
          <div
            className={`flex items-start gap-2 text-xs p-3 rounded-lg mb-4 ${
              resendMessage.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {resendMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 mt-0.5" />
            )}
            <span>{resendMessage.text}</span>
          </div>
        )}

        {/* Botões */}
        <div className="space-y-2">
          <Button
            onClick={handleResend}
            disabled={isResending}
            variant="outline"
            className="w-full text-sm"
          >
            {isResending ? 'A reenviar...' : 'Reenviar email'}
          </Button>

          <Link href="/?auth=login">
            <Button className="w-full text-sm">
              Voltar ao login
            </Button>
          </Link>
        </div>

        {/* Rodapé */}
        <p className="text-[11px] text-gray-400 mt-4">
          Pode demorar alguns minutos. Verifique o spam.
        </p>

      </Card>
    </div>
  );
}