import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * Inicialização do Firebase Client-Side
 * Este código apenas deve ser executado no navegador.
 */
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Garante que não inicializamos o app múltiplas vezes
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// Exporta instâncias para uso em componentes e hooks
export { auth as auth, db as db };

/**
 * Retorna a instância de Autenticação, lançando erro se não estiver inicializada
 */
export const getAuthInstance = () => {
  if (!auth) throw new Error("Firebase Auth não inicializado. Verifique se está a correr no cliente.");
  return auth;
};

/**
 * Retorna a instância do Firestore, lançando erro se não estiver inicializada
 */
export const getDbInstance = () => {
  if (!db) throw new Error("Firestore não inicializado. Verifique se está a correr no cliente.");
  return db;
};
