/**
 * Cliente de API para Cloud Functions
 *
 * Utilitários para chamar as Firebase Cloud Functions a partir do frontend.
 * Inclui automaticamente o token JWT da sessão do NextAuth.
 */

import { getSession as getNextAuthSession } from "next-auth/react";

/**
 * Obtém a URL das Cloud Functions a partir das variáveis de ambiente
 */
const CLOUD_FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_URL ||
  "https://us-central1-adndev-5a2b0.cloudfunctions.net";

/**
 * Função genérica para chamar Cloud Functions com autenticação
 * @param functionName Nome da função a chamar
 * @param method Método HTTP (GET ou POST)
 * @param body Corpo do pedido (para POST)
 * @param includeAuth Se deve incluir o token de autorização
 */
export async function callCloudFunction<T = any>(
  functionName: string,
  method: "GET" | "POST" = "POST",
  body?: any,
  includeAuth: boolean = true,
): Promise<T> {
  const url = `${CLOUD_FUNCTIONS_URL}/${functionName}`;
  const requestId = crypto.randomUUID();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Request-ID": requestId,
    },
  };

  // Adiciona o token de autenticação se necessário
  if (includeAuth) {
    const session = await getNextAuthSession();
    if (session && (session as any).token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${(session as any).token}`,
      };
    }
  }

  // Adiciona o corpo para pedidos POST
  if (method === "POST" && body) {
    options.body = JSON.stringify(body);
  }

  // Define um tempo limite (Timeout) de 30 segundos (acomoda Cold Starts pesados)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  options.signal = controller.signal;

  try {
    const response = await fetch(url, options);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `Erro HTTP ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      // Timeout — não expõe URL ou dados internos
      throw new Error("O servidor está a demorar mais que o esperado a responder (Timeout). Verifique a sua ligação ou tente novamente.");
    }

    // Erros de validação (4xx) — relança directamente para o UI sem logar
    // Erros de rede inesperados — loga apenas o identificador, não a mensagem
    if (error.message === "Failed to fetch") {
      throw new Error("Não foi possível conectar ao servidor (CORS ou Backend offline). Verifique se as Cloud Functions estão a correr no Emulador ou se já foram deployadas na Produção.");
    }

    if (!error.message?.startsWith("Erro HTTP 5")) {
      throw error;
    }

    // Só loga erros de servidor (500+) com o mínimo de informação
    console.error(`[CF] Erro interno em ${functionName} [${requestId}]`);
    throw new Error("Erro interno do servidor. Por favor, tente novamente.");
  }
}

// ==================== Funções de Autenticação ====================

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "user";
  };
}

/**
 * Inicia sessão como utilizador comum
 */
export async function signinUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return callCloudFunction<AuthResponse>(
    "signinUser",
    "POST",
    {
      email,
      password,
    },
    false,
  );
}

/**
 * Inicia sessão como administrador
 */
export async function signinAdmin(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return callCloudFunction<AuthResponse>(
    "signinAdmin",
    "POST",
    {
      email,
      password,
    },
    false,
  );
}

/**
 * Remove a conta de utilizador se o pagamento inicial falhar (Rollback)
 */
export async function deleteAccountOnPaymentFailure(): Promise<{ success: boolean; message: string }> {
  return callCloudFunction<{ success: boolean; message: string }>(
    "deleteAccountOnPaymentFailure",
    "POST",
    undefined,
    true, // Usa o JWT do NextAuth para autorização no Backend
  );
}

/**
 * Regista um novo utilizador
 */
export async function signupUser(
  email: string,
  password: string,
  name: string,
): Promise<AuthResponse> {
  return callCloudFunction<AuthResponse>(
    "signupUser",
    "POST",
    {
      email,
      password,
      name,
    },
    false,
  );
}

/**
 * Autentica com um token do Google OAuth
 */
export async function signupWithGoogle(
  googleIdToken: string,
): Promise<AuthResponse> {
  return callCloudFunction<AuthResponse>(
    "signupWithGoogle",
    "POST",
    {
      googleIdToken,
    },
    false,
  );
}

/**
 * Obtém os dados da sessão atual
 */
export async function getSession() {
  return callCloudFunction("getSession", "GET", undefined, true);
}

/**
 * Verifica o estado da subscrição do utilizador autenticado
 * Usado para polling em substituição do onSnapshot do Firestore
 * (o onSnapshot requer Firebase Client Auth; o NextAuth usa JWT)
 */
export async function getSubscriptionStatus(): Promise<{
  success: boolean;
  isActive: boolean;
  subscription: {
    status: string;
    priceId?: string;
    currency?: string;
    amount?: number;
    billingCycle?: string;
  } | null;
}> {
  return callCloudFunction("getSubscriptionStatus", "GET", undefined, true);
}

/**
 * Encerra a sessão do utilizador
 */
export async function signout(): Promise<{
  success: boolean;
  message: string;
}> {
  return callCloudFunction("signout", "POST", {}, true);
}

// ==================== Funções do Stripe ====================

export interface CheckoutSession {
  success: boolean;
  sessionId: string;
  url: string;
}

/**
 * Cria uma sessão de checkout para subscrição
 */
export async function createCheckoutSession(
  priceId: string,
  billingCycle: "monthly" | "yearly" = "monthly",
): Promise<CheckoutSession> {
  return callCloudFunction<CheckoutSession>(
    "createCheckoutSession",
    "POST",
    {
      priceId,
      billingCycle,
    },
    true,
  );
}

export interface SubmitSubscriptionResponse {
  success: boolean;
  method: "stripe" | "multicaixa";
  sessionId?: string;
  url?: string;
  refData?: any;
  subscriptionId?: string;
}

/**
 * Atomic flow for creating user and initializing payment.
 */
export async function submitSubscription(
  payload: any
): Promise<SubmitSubscriptionResponse> {
  return callCloudFunction<SubmitSubscriptionResponse>(
    "submitSubscription",
    "POST",
    payload,
    false, // No auth token required, as this handles signup
  );
}

// ==================== Listeners de Webhook (Simulados/Frontend) ====================

/**
 * Subscreve atualizações de subscrição
 * Usado para ouvir mudanças no estado do pagamento em tempo real
 */
export function onSubscriptionUpdate(
  userId: string,
  callback: (status: string) => void,
) {
  // Configuração de listener do Firestore
  // Será ativado quando o webhook do Stripe atualizar a subscrição do utilizador
  console.log(`[CloudFunctions] Subscrevendo atualizações para o utilizador: ${userId}`);
}


