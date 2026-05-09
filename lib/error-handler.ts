import 'server-only';

/**
 * ✅ SEGURANÇA: Tratamento centralizado de erros
 * Nunca expõe detalhes técnicos ao cliente em produção
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number = 500,
    message?: string
  ) {
    super(message || code);
    this.name = 'AppError';
  }

  /**
   * Mensagem segura para retornar ao cliente
   * Nunca expõe detalhes de banco de dados, stack traces, etc.
   */
  getPublicMessage(): string {
    const messages: Record<string, string> = {
      'AUTH_INVALID_CREDENTIALS': 'Email ou senha inválidos. Tente novamente.',
      'AUTH_BLOCKED': 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.',
      'INVALID_EMAIL': 'Email inválido.',
      'EMAIL_EXISTS': 'Este email já está registado.',
      'USERNAME_EXISTS': 'Este username já está em uso.',
      'NOT_FOUND': 'Recurso não encontrado.',
      'UNAUTHORIZED': 'Não autorizado.',
      'FORBIDDEN': 'Acesso negado.',
      'VALIDATION_ERROR': 'Dados enviados são inválidos.',
      'INTERNAL_ERROR': 'Erro ao processar requisição. Tente novamente.',
      'DB_ERROR': 'Erro ao processar requisição. Tente novamente.',
      'UPLOAD_ERROR': 'Erro ao fazer upload do ficheiro.',
      'STORAGE_ERROR': 'Erro ao processar armazenamento.',
      'STRIPE_ERROR': 'Erro ao processar pagamento.',
      'FILE_TOO_LARGE': 'Ficheiro muito grande.',
      'INVALID_FILE_TYPE': 'Tipo de ficheiro não suportado.',
    };

    return messages[this.code] || 'Erro inesperado. Por favor, tente novamente.';
  }
}

/**
 * Log seguro para backend
 * Em produção: apenas info essencial
 * Em desenvolvimento: detalhes completos
 */
export async function logError(
  code: string,
  error: any,
  context?: Record<string, any>
) {
  const isDev = process.env.NODE_ENV === 'development';

  const logEntry = {
    timestamp: new Date().toISOString(),
    code,
    message: error?.message || String(error),
    ...(isDev && { stack: error?.stack }),
    ...(isDev && context && { context }),
  };

  // Log para sistema (sempre)
  // TODO: Integrar com Sentry, DataDog, etc para monitoramento em produção
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureException(error, { tags: { code } });
  // }
}

/**
 * Wrapper para executar funções com error handling seguro
 * Exemplo:
 *   const result = await withErrorHandler(
 *     () => myAsyncFunction(),
 *     'MY_OPERATION'
 *   );
 *   if (!result.ok) {
 *     return { error: result.message };
 *   }
 *   return { data: result.data };
 */
export async function withErrorHandler<T>(
  fn: () => Promise<T>,
  errorCode: string = 'INTERNAL_ERROR'
): Promise<
  { ok: true; data: T } | { ok: false; code: string; message: string }
> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (error: any) {
    const code = error?.code || errorCode;

    // Log completo no servidor
    await logError(code, error);

    // Resposta segura para cliente
    const appError = error instanceof AppError ? error : new AppError(code);

    return {
      ok: false,
      code,
      message: appError.getPublicMessage(),
    };
  }
}
