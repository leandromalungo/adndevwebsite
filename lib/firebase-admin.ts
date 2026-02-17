import admin from "firebase-admin";

let adminAuthInstance: admin.auth.Auth | null = null;
let adminDbInstance: admin.firestore.Firestore | null = null;

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

function getAdminAuth() {
  if (adminAuthInstance) return adminAuthInstance;
  initializeAdmin();
  adminAuthInstance = admin.auth();
  return adminAuthInstance;
}

function getAdminDb() {
  if (adminDbInstance) return adminDbInstance;
  initializeAdmin();
  adminDbInstance = admin.firestore();
  return adminDbInstance;
}

export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_target, prop) {
    const auth = getAdminAuth();
    const value = (auth as any)[prop];
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    const db = getAdminDb();
    const value = (db as any)[prop];
    return typeof value === "function" ? value.bind(db) : value;
  },
});
