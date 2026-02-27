import admin from "firebase-admin";

/**
 * Instâncias singleton para evitar múltiplas inicializações em desenvolvimento
 */
let adminAuthInstance: admin.auth.Auth | null = null;
let adminDbInstance: admin.firestore.Firestore | null = null;

/**
 * Inicializa o SDK Admin do Firebase utilizando variáveis de ambiente.
 * No ambiente local, caso as variáveis de servidor (sem NEXT_PUBLIC_) não estejam definidas,
 * tenta usar as variáveis públicas como fallback para permitir o desenvolvimento básico.
 */
function initializeAdmin() {
  if (!admin.apps.length) {
    // Tenta obter as variáveis de servidor ou fallback para as públicas
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL; // Nunca usar NEXT_PUBLIC_ para credenciais
    // O privateKey é crítico — nunca deve existir em variáveis públicas
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId) {
      console.error("[Firebase Admin] ERRO CRÍTICO: FIREBASE_PROJECT_ID não definido.");
      return;
    }

    // 🔥 IMPORTANTE: O Firestore Admin às vezes falha ao detectar o Project ID 
    // se não estiver explicitamente no ambiente global (GCLOUD_PROJECT)
    process.env.GCLOUD_PROJECT = projectId;

    try {
      // Se tivermos as credenciais completas, usamos cert. 
      // Caso contrário, em dev local, algumas funções podem falhar mas o app não quebra no init.
      // Só tenta applicationDefault se não tivermos chaves explícitas mas estivermos em ambiente que suporte (ex: Vercel/Cloud)
      // No dev local, se não houver chaves, inicializamos apenas com ProjectID para evitar erro de credenciais no init
      const credential = (clientEmail && privateKey)
        ? admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        })
        : (process.env.GOOGLE_APPLICATION_CREDENTIALS ? admin.credential.applicationDefault() : undefined);

      admin.initializeApp({
        projectId,
        ...(credential ? { credential } : {}),
      });
      console.log(`[Firebase Admin] SDK Inicializado para o projeto: ${projectId}`);
    } catch (error: any) {
      console.warn("[Firebase Admin] Falha na inicialização segura:", error.message);

      // Fallback final: Se falhar, tentamos inicializar apenas com o ID se possível (limitado)
      try {
        admin.initializeApp({ projectId });
        console.log("[Firebase Admin] Inicializado em modo limitado (apenas Project ID).");
      } catch (e) {
        console.error("[Firebase Admin] Erro fatal ao tentar inicializar:", (e as Error).message);
      }
    }
  }
}

/**
 * Obtém a instância do Firebase Auth Admin (Lazy Loading)
 */
function getAdminAuth() {
  if (adminAuthInstance) return adminAuthInstance;
  initializeAdmin();
  try {
    adminAuthInstance = admin.auth();
  } catch (e) {
    console.error("[Firebase Admin] Não foi possível obter Auth Admin.");
  }
  return adminAuthInstance;
}

/**
 * Obtém a instância do Firestore Admin (Lazy Loading)
 */
function getAdminDb() {
  if (adminDbInstance) return adminDbInstance;
  initializeAdmin();
  try {
    adminDbInstance = admin.firestore();
  } catch (e) {
    console.error("[Firebase Admin] Não foi possível obter Firestore Admin.");
  }
  return adminDbInstance;
}

/**
 * Proxy para exportar o auth de forma lazy e segura
 */
export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_target, prop) {
    const auth = getAdminAuth();
    const value = (auth as any)[prop];
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

/**
 * Proxy para exportar o db de forma lazy e segura
 */
export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    const db = getAdminDb();
    const value = (db as any)[prop];
    return typeof value === "function" ? value.bind(db) : value;
  },
});
