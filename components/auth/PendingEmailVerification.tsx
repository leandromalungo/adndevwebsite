'use client';

import { useState } from 'react';
import { resendVerificationEmailAction } from '@/app/actions/send-verification-email';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface PendingEmailVerificationProps {
  email: string;
}

export default function PendingEmailVerification({
  email,
}: PendingEmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);

  const [resendMessage, setResendMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage(null);

    const result = await resendVerificationEmailAction(email);

    setResendMessage({
      type: result.success ? 'success' : 'error',
      text: result.success
        ? result.message || 'Email reenviado com sucesso!'
        : result.error || 'Erro ao reenviar email',
    });

    setIsResending(false);
  };

  return (
    <>
      {/* Removemos o w-screen h-screen flex padrão e usamos posições fixas/absolutas para garantir tela cheia */}
      < main className="fixed inset-0 w-screen h-screen flex flex-row bg-gray-50 overflow-hidden z-50" >

        {/* LADO ESQUERDO */}
        <section className="hidden lg:block relative w-1/2 h-full select-none">
          <img
            src="/email-verification.png"
            alt="Verificação de email"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* OVERLAY EM DEGRADÊ: Começa escuro embaixo para dar leitura ao texto e fica 100% transparente no topo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent z-10" />

          {/* CONTEÚDO (Textos por cima do overlay) */}
          <div className="absolute inset-0 flex flex-col justify-end h-full p-16 z-20">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Segurança e confiança para sua conta
              </h1>

              <p className="text-lg text-gray-200 mt-5 leading-relaxed">
                Verifique o seu email para continuar acessando todos os recursos da
                plataforma com segurança.
              </p>
            </div>
          </div>
        </section>

        {/* LADO DIREITO (Centraliza o conteúdo e herda o fundo do main) */}
        <section className="w-full lg:w-1/2 h-full flex items-center justify-center bg-gray-50 px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">

            {/* Transformado em div sem fundo branco, sem sombra e sem bordas */}
            <div className="w-full p-0 bg-transparent">

              {/* Logo / Ícone da Empresa */}
              <div className="flex justify-center mb-8">
                <img
                  src="/logoNavbar.png" // Substitua pelo caminho correto do seu logo (ex: /logo.png)
                  alt="Logo Adn Developer"
                  className="h-14 w-auto object-contain" // Controla a altura de forma proporcional
                />
              </div>

              {/* Título */}
              <h2 className="text-3xl font-bold text-center text-gray-900">
                Verifique seu email
              </h2>

              {/* Texto */}
              <p className="text-gray-500 text-center mt-3">
                Enviámos um link de verificação para:
              </p>

              <p className="text-center text-sm font-semibold text-gray-800 mt-2 mb-8 break-all min-h-[20px]">
                {email || "seu-email@provedor.com"}
              </p>

              {/* Passos (UI Melhorado estilo Stepper/Timeline) */}
              <div className="bg-white/40 border border-gray-200/50 rounded-lg p-6 space-y-4 mb-8 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Próximos passos:
                </p>

                <div className="space-y-4">
                  {/* Passo 1 */}
                  <div className="flex items-center gap-4 text-left group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-bold text-xs shrink-0 border border-violet-200/50">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Abra sua caixa de entrada</p>
                      <p className="text-xs text-gray-500">Procure pelo e-mail de confirmação que enviamos.</p>
                    </div>
                  </div>

                  {/* Passo 2 */}
                  <div className="flex items-center gap-4 text-left group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-bold text-xs shrink-0 border border-violet-200/50">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Clique no link de verificação</p>
                      <p className="text-xs text-gray-500">Isso validará sua conta de forma totalmente segura.</p>
                    </div>
                  </div>

                  {/* Passo 3 */}
                  <div className="flex items-center gap-4 text-left group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-bold text-xs shrink-0 border border-violet-200/50">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Volte e faça login na plataforma</p>
                      <p className="text-xs text-gray-500">Sua conta estará pronta para uso imediato.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {resendMessage && (
                <div
                  className={`flex gap-3 items-start p-4 rounded-xl mb-5 text-sm ${resendMessage.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                    }`}
                >
                  {resendMessage.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mt-0.5" />
                  )}
                  <span>{resendMessage.text}</span>
                </div>
              )}

              {/* Botões lado a lado */}
              <div className="flex flex-row gap-4 w-full mt-6">

                <Button
                  onClick={handleResend}
                  disabled={isResending}
                  variant="outline"
                  className="flex-1 h-12 border-violet-600 hover:bg-violet-600 text-violet-600 hover:text-white transition-all bg-white shadow-lg"
                >
                  {isResending ? "A reenviar..." : "Reenviar email"}
                </Button>

                <Link href="/?auth=login" className="flex-1">
                  <Button className="w-full h-12 bg-violet-600 hover:bg-violet-400 rounded-lg text-white shadow-lg">
                    Voltar ao login
                  </Button>
                </Link>

              </div>

              {/* Rodapé */}
              <p className="text-xs text-gray-400 text-center mt-6">
                Pode demorar alguns minutos. Verifique também a pasta de spam.
              </p>
            </div>

          </div>
        </section>
      </main >
    </>
  );
}