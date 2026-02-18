import admin from "firebase-admin";

/**
 * Instâncias singleton para evitar múltiplas inicializações em desenvolvimento
 */
let adminAuthInstance: admin.auth.Auth | null = null;
let adminDbInstance: admin.firestore.Firestore | null = null;

/**
 * Inicializa o SDK Admin do Firebase utilizando variáveis de ambiente
 */
function initializeAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
}

/**
 * Obtém a instância do Firebase Auth Admin
 */
function getAdminAuth() {
  if (adminAuthInstance) return adminAuthInstance;
  initializeAdmin();
  adminAuthInstance = admin.auth();
  return adminAuthInstance;
}

/**
 * Obtém a instância do Firestore Admin
 */
function getAdminDb() {
  if (adminDbInstance) return adminDbInstance;
  initializeAdmin();
  adminDbInstance = admin.firestore();
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
