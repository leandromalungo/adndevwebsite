/**
 * Backend de Cloud Functions do Firebase
 *
 * Este ficheiro contém toda a lógica de backend para:
 * - Autenticação de utilizadores (Email/Password)
 * - Autenticação de administradores (JWE)
 * - Autenticação Google OAuth
 * - Sessões de pagamento Stripe
 * - Webhooks do Stripe
 *
 * O Frontend comunica APENAS através destas funções.
 * Todas as validações ocorrem AQUI, no backend.
 */

import { setGlobalOptions } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import cors from "cors";

import { generateRequestId } from './tracing';
import {
  auth,
  db,
  stripe,
  redis,
  ratelimit,
  adminRatelimit
} from "./config";
import {
  getIp,
  getUserAgent,
  isValidContentType,
  logSecurityAction,
  sendResponse,
  createJWTToken,
  verifyJWTToken,
  verifyFirebaseIdToken
} from "./helpers";
import {
  sanitizeEmail,
  sanitizeText,
  generateFingerprint,
  isStrongPassword,
} from "./security";

// Define as opções globais para todas as funções
setGlobalOptions({ maxInstances: 10 });

/**
 * Verifica a palavra-passe usando a API REST de Autenticação do Firebase
 */
async function verifyFirebasePassword(
  email: string,
  password: string,
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Invalid credentials");
  }

  const data = await response.json();
  return data.idToken;
}

// ==================== CORS MIDDLEWARE ====================

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com").split(",")
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

// ==================== ADMIN FUNCTIONS ====================
export * from "./admin";


// ==================== AUTHENTICATION FUNCTIONS ====================

/**
 * LOGIN DE UTILIZADOR - Autenticação por Email/Password
 * O backend valida todas as credenciais e retorna um JWT
 */
export const signinUser = onRequest(async (req: Request, res: Response) => {
  await corsMiddleware(req, res, async () => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
      // Verificação de limite de taxa (Rate Limit)
      const { success } = await ratelimit.limit(ip + ":signin_user");
      if (!success) {
        return sendResponse(res, 429, {
          error: "Muitas tentativas de login. Aguarde 15 minutos.",
        }, requestId);
      }

      if (req.method !== "POST") {
        return sendResponse(res, 405, { error: "Method not allowed" }, requestId);
      }

      // Validate Content-Type
      if (!isValidContentType(req)) {
        return sendResponse(res, 415, { error: "Content-Type must be application/json" }, requestId);
      }

      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        await logSecurityAction({
          email: email || "unknown",
          action: "USER_LOGIN_ATTEMPT",
          entity: "UserAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: "Missing credentials" },
          requestId,
        });
        return sendResponse(res, 400, {
          error: "Email e senha são obrigatórios",
        }, requestId);
      }

      // Sanitize input
      const sanitizedEmail = sanitizeEmail(email);
      if (!sanitizedEmail) {
        await logSecurityAction({
          email,
          action: "USER_LOGIN_ATTEMPT",
          entity: "UserAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: "Invalid email format" },
          requestId,
        });
        return sendResponse(res, 400, { error: "Email inválido" }, requestId);
      }

      // Verify password with Firebase
      let idToken: string;
      try {
        idToken = await verifyFirebasePassword(sanitizedEmail, password);
      } catch (error: any) {
        await logSecurityAction({
          email: sanitizedEmail,
          action: "USER_LOGIN_ATTEMPT",
          entity: "UserAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: error.message },
          requestId,
        });
        return sendResponse(res, 401, { error: "Credenciais inválidas" }, requestId);
      }

      // Verify ID token
      const decodedToken = await verifyFirebaseIdToken(idToken);
      const userRecord = await auth.getUser(decodedToken.uid);
      const customClaims = userRecord.customClaims || {};

      // Garante que o utilizador NÃO é um administrador
      if (customClaims.admin === true || customClaims.role === "admin") {
        await logSecurityAction({
          userId: userRecord.uid,
          email: sanitizedEmail,
          action: "USER_LOGIN_ATTEMPT",
          entity: "UserAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: "User is admin" },
          requestId,
        });
        return sendResponse(res, 403, {
          error: "Use o painel de administrador para fazer login",
        }, requestId);
      }

      // Generate fingerprint
      const fingerprint = await generateFingerprint(userAgent, ip);

      // Create JWT token
      const token = createJWTToken({
        uid: userRecord.uid,
        email: sanitizedEmail,
        name: userRecord.displayName || sanitizedEmail,
        role: "user",
        fingerprint,
        iat: Math.floor(Date.now() / 1000),
      });

      // Store session in Redis
      await redis.setex(
        `session:${userRecord.uid}`,
        30 * 24 * 60 * 60, // 30 days
        JSON.stringify({
          token,
          uid: userRecord.uid,
          email: sanitizedEmail,
          fingerprint,
          createdAt: new Date().toISOString(),
        }),
      );

      await logSecurityAction({
        userId: userRecord.uid,
        email: sanitizedEmail,
        action: "USER_LOGIN_SUCCESS",
        entity: "UserAuth",
        ip,
        userAgent,
        status: "success",
        details: { fingerprint },
        requestId,
      });

      sendResponse(res, 200, {
        success: true,
        token,
        user: {
          id: userRecord.uid,
          email: sanitizedEmail,
          name: userRecord.displayName || sanitizedEmail,
          role: "user",
        },
      }, requestId);
    } catch (error: any) {
      console.error("[signinUser] Error:", error);
      sendResponse(res, 500, { error: "Internal server error" }, requestId);
    }
  });
});


/**
 * LOGIN DE ADMINISTRADOR - Autenticação Email/Password para Admins
 * Valida a role de administrador através de custom claims
 */
export const signinAdmin = onRequest(async (req: Request, res: Response) => {
  await corsMiddleware(req, res, async () => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
      // Verificação de Rate Limit - mais rigorosa para admins (3 tentativas por 15 min)
      const { success } = await adminRatelimit.limit(ip + ":signin_admin");
      if (!success) {
        return sendResponse(res, 429, {
          error: "Muitas tentativas de login admin. Aguarde 15 minutos.",
        }, requestId);
      }

      if (req.method !== "POST") {
        return sendResponse(res, 405, { error: "Method not allowed" }, requestId);
      }

      // Validate Content-Type
      if (!isValidContentType(req)) {
        return sendResponse(res, 415, { error: "Content-Type must be application/json" }, requestId);
      }

      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        await logSecurityAction({
          email: email || "unknown",
          action: "ADMIN_LOGIN_ATTEMPT",
          entity: "AdminAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: "Missing credentials" },
          requestId,
        });
        return sendResponse(res, 400, {
          error: "Email e senha são obrigatórios",
        }, requestId);
      }

      // Sanitize input
      const sanitizedEmail = sanitizeEmail(email);
      if (!sanitizedEmail) {
        return sendResponse(res, 400, { error: "Email inválido" }, requestId);
      }

      // Verify password with Firebase
      let idToken: string;
      try {
        idToken = await verifyFirebasePassword(sanitizedEmail, password);
      } catch (error: any) {
        await logSecurityAction({
          email: sanitizedEmail,
          action: "ADMIN_LOGIN_ATTEMPT",
          entity: "AdminAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: error.message },
          requestId,
        });
        return sendResponse(res, 401, { error: "Credenciais inválidas" }, requestId);
      }

      // Verify ID token
      const decodedToken = await verifyFirebaseIdToken(idToken);
      const userRecord = await auth.getUser(decodedToken.uid);
      const customClaims = userRecord.customClaims || {};

      // Valida se o utilizador tem permissões de administrador
      if (customClaims.admin !== true && customClaims.role !== "admin") {
        await logSecurityAction({
          userId: userRecord.uid,
          email: sanitizedEmail,
          action: "ADMIN_LOGIN_ATTEMPT",
          entity: "AdminAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: "Not admin" },
          requestId,
        });
        return sendResponse(res, 403, {
          error: "Acesso negado. Usuário não é administrador.",
        }, requestId);
      }

      // Generate fingerprint
      const fingerprint = await generateFingerprint(userAgent, ip);

      // Create JWT token
      const token = createJWTToken({
        uid: userRecord.uid,
        email: sanitizedEmail,
        name: userRecord.displayName || sanitizedEmail,
        role: "admin",
        fingerprint,
        iat: Math.floor(Date.now() / 1000),
      });

      // Store session in Redis
      await redis.setex(
        `session:${userRecord.uid}`,
        30 * 24 * 60 * 60, // 30 days
        JSON.stringify({
          token,
          uid: userRecord.uid,
          email: sanitizedEmail,
          role: "admin",
          fingerprint,
          createdAt: new Date().toISOString(),
        }),
      );

      await logSecurityAction({
        userId: userRecord.uid,
        email: sanitizedEmail,
        action: "ADMIN_LOGIN_SUCCESS",
        entity: "AdminAuth",
        ip,
        userAgent,
        status: "success",
        details: { fingerprint },
        requestId,
      });

      sendResponse(res, 200, {
        success: true,
        token,
        user: {
          id: userRecord.uid,
          email: sanitizedEmail,
          name: userRecord.displayName || sanitizedEmail,
          role: "admin",
        },
      }, requestId);
    } catch (error: any) {
      console.error("[signinAdmin] Error:", error);
      sendResponse(res, 500, { error: "Internal server error" }, requestId);
    }
  });
});

/**
 * REGISTO DE UTILIZADOR - Criar uma nova conta
 * Registo por email/password com validações de segurança
 */
export const signupUser = onRequest(async (req: Request, res: Response) => {
  await corsMiddleware(req, res, async () => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
      // Rate limit check
      const { success } = await ratelimit.limit(ip + ":signup_user");
      if (!success) {
        return sendResponse(res, 429, {
          error: "Muitas tentativas de cadastro. Aguarde 1 hora.",
        }, requestId);
      }

      if (req.method !== "POST") {
        return sendResponse(res, 405, { error: "Method not allowed" }, requestId);
      }

      // Validate Content-Type
      if (!isValidContentType(req)) {
        return sendResponse(res, 415, { error: "Content-Type must be application/json" }, requestId);
      }

      const { email, password, name } = req.body;

      // Validate input
      if (!email || !password) {
        return sendResponse(res, 400, {
          error: "Email e senha são obrigatórios",
        }, requestId);
      }

      // Sanitize input
      const sanitizedEmail = sanitizeEmail(email);
      const sanitizedName = sanitizeText(name || email);

      if (!sanitizedEmail) {
        return sendResponse(res, 400, { error: "Email inválido" }, requestId);
      }

      // Valida a força da palavra-passe
      if (!isStrongPassword(password)) {
        return sendResponse(res, 400, {
          error:
            "Senha deve ter no mínimo 8 caracteres, com letras maiúsculas, minúsculas e números",
        }, requestId);
      }

      // Cria o utilizador no Firebase Auth
      let userRecord;
      try {
        userRecord = await auth.createUser({
          email: sanitizedEmail,
          password: password,
          displayName: sanitizedName,
        });

        // Define a role padrão como 'user'
        await auth.setCustomUserClaims(userRecord.uid, {
          role: "user",
          admin: false,
        });
      } catch (error: any) {
        await logSecurityAction({
          email: sanitizedEmail,
          action: "USER_SIGNUP_ATTEMPT",
          entity: "UserAuth",
          ip,
          userAgent,
          status: "failure",
          details: { reason: error.message },
          requestId,
        });
        return sendResponse(res, 400, {
          error: error.message.includes("already exists")
            ? "Email já cadastrado"
            : "Erro ao criar conta",
        }, requestId);
      }

      // Cria o documento do utilizador no Firestore
      await db.collection("users").doc(userRecord.uid).set({
        email: sanitizedEmail,
        name: sanitizedName,
        role: "user",
        createdAt: new Date(),
        lastLogin: null,
        status: "active",
      });

      await logSecurityAction({
        userId: userRecord.uid,
        email: sanitizedEmail,
        action: "USER_SIGNUP_SUCCESS",
        entity: "UserAuth",
        ip,
        userAgent,
        status: "success",
        details: { name: sanitizedName },
        requestId,
      });

      sendResponse(res, 201, {
        success: true,
        user: {
          id: userRecord.uid,
          email: sanitizedEmail,
          name: sanitizedName,
          role: "user",
        },
      }, requestId);
    } catch (error: any) {
      console.error("[signupUser] Error:", error);
      sendResponse(res, 500, { error: "Internal server error" }, requestId);
    }
  });
});

/**
 * REGISTO/LOGIN COM GOOGLE - Autenticação OAuth
 * Gere a verificação de token do Google e criação/atualização de perfil
 */
export const signupWithGoogle = onRequest(
  async (req: Request, res: Response) => {
    await corsMiddleware(req, res, async () => {
      const ip = getIp(req);
      const userAgent = getUserAgent(req);
      const requestId = generateRequestId();

      try {
        // Rate limit check
        const { success } = await ratelimit.limit(ip + ":signup_google");
        if (!success) {
          return sendResponse(res, 429, {
            error: "Muitas tentativas. Aguarde 15 minutos.",
          }, requestId);
        }

        if (req.method !== "POST") {
          return sendResponse(res, 405, { error: "Method not allowed" }, requestId);
        }

        // Validate Content-Type
        if (!isValidContentType(req)) {
          return sendResponse(res, 415, { error: "Content-Type must be application/json" }, requestId);
        }

        const { googleIdToken } = req.body;

        if (!googleIdToken) {
          return sendResponse(res, 400, {
            error: "Google token é obrigatório",
          }, requestId);
        }

        // Verifica a validade do ID Token do Google
        let decodedToken;
        try {
          decodedToken = await auth.verifyIdToken(googleIdToken);
        } catch (error: any) {
          await logSecurityAction({
            action: "GOOGLE_AUTH_ATTEMPT",
            entity: "GoogleAuth",
            ip,
            userAgent,
            status: "failure",
            details: { reason: "Invalid Google token" },
            requestId,
          });
          return sendResponse(res, 401, { error: "Token Google inválido" }, requestId);
        }

        const email = decodedToken.email;
        const name = decodedToken.name || email;
        const photoURL = decodedToken.picture;

        if (!email) {
          return sendResponse(res, 400, {
            error: "Email não encontrado no token",
          }, requestId);
        }

        // Verifica se o utilizador já existe no sistema
        let userRecord;
        try {
          userRecord = await auth.getUserByEmail(email);
        } catch (error) {
          // Utilizador não existe, vamos criar um novo
          try {
            userRecord = await auth.createUser({
              email,
              displayName: name,
              photoURL,
            });

            // Set custom claim for role
            await auth.setCustomUserClaims(userRecord.uid, {
              role: "user",
              admin: false,
            });

            // Create user document in Firestore
            await db.collection("users").doc(userRecord.uid).set({
              email,
              name,
              photoURL,
              role: "user",
              googleAuth: true,
              createdAt: new Date(),
              lastLogin: new Date(),
              status: "active",
            });
          } catch (createError: any) {
            console.error(
              "[signupWithGoogle] Error creating user:",
              createError,
            );
            return sendResponse(res, 400, { error: "Erro ao criar conta" }, requestId);
          }
        }

        // Atualiza a data do último login no Firestore
        await db
          .collection("users")
          .doc(userRecord.uid)
          .update({
            lastLogin: new Date(),
          })
          .catch(async () => {
            // Se o documento não existir (caso raro), cria-o
            await db.collection("users").doc(userRecord.uid).set({
              email,
              name,
              role: "user",
              googleAuth: true,
              createdAt: new Date(),
              lastLogin: new Date(),
              status: "active",
            });
          });

        // Generate fingerprint
        const fingerprint = await generateFingerprint(userAgent, ip);

        // Create JWT token
        const token = createJWTToken({
          uid: userRecord.uid,
          email,
          name: userRecord.displayName || name,
          role: "user",
          fingerprint,
          iat: Math.floor(Date.now() / 1000),
        });

        // Store session in Redis
        await redis.setex(
          `session:${userRecord.uid}`,
          30 * 24 * 60 * 60,
          JSON.stringify({
            token,
            uid: userRecord.uid,
            email,
            fingerprint,
            createdAt: new Date().toISOString(),
          }),
        );

        await logSecurityAction({
          userId: userRecord.uid,
          email,
          action: "GOOGLE_AUTH_SUCCESS",
          entity: "GoogleAuth",
          ip,
          userAgent,
          status: "success",
          details: { fingerprint },
          requestId,
        });

        sendResponse(res, 200, {
          success: true,
          token,
          user: {
            id: userRecord.uid,
            email,
            name: userRecord.displayName || name,
            role: "user",
            isNewUser: !userRecord.metadata.creationTime,
          },
        }, requestId);
      } catch (error: any) {
        console.error("[signupWithGoogle] Error:", error);
        sendResponse(res, 500, { error: "Internal server error" }, requestId);
      }
    });
  },
);

/**
 * OBTÉM SESSÃO - Verifica o token de sessão e retorna o utilizador
 */
export const getSession = onRequest(async (req: Request, res: Response) => {
  await corsMiddleware(req, res, async () => {
    try {
      if (req.method !== "GET" && req.method !== "POST") {
        return sendResponse(res, 405, { error: "Method not allowed" });
      }

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendResponse(res, 401, { error: "No authorization header" });
      }

      const token = authHeader.substring(7);

      // Verify JWT token
      let decoded;
      try {
        decoded = verifyJWTToken(token);
      } catch (error) {
        return sendResponse(res, 401, { error: "Invalid token" });
      }

      // Get user from Firebase
      const userRecord = await auth.getUser(decoded.uid);

      sendResponse(res, 200, {
        success: true,
        user: {
          id: userRecord.uid,
          email: userRecord.email,
          name: userRecord.displayName,
          role: decoded.role,
        },
      });
    } catch (error: any) {
      console.error("[getSession] Error:", error);
      sendResponse(res, 500, { error: "Internal server error" });
    }
  });
});

/**
 * TERMINAR SESSÃO - Remove a sessão ativa
 */
export const signout = onRequest(async (req: Request, res: Response) => {
  await corsMiddleware(req, res, async () => {
    try {
      if (req.method !== "POST") {
        return sendResponse(res, 405, { error: "Method not allowed" });
      }

      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendResponse(res, 401, { error: "No authorization header" });
      }

      const token = authHeader.substring(7);

      // Verify JWT token
      let decoded;
      try {
        decoded = verifyJWTToken(token);
      } catch (error) {
        return sendResponse(res, 401, { error: "Invalid token" });
      }

      // Remove a sessão do Redis
      await redis.del(`session:${decoded.uid}`);

      const ip = getIp(req);
      const userAgent = getUserAgent(req);

      await logSecurityAction({
        userId: decoded.uid,
        email: decoded.email,
        action: "USER_SIGNOUT",
        entity: "UserAuth",
        ip,
        userAgent,
        status: "success",
      });

      sendResponse(res, 200, {
        success: true,
        message: "Sessão encerrada",
      });
    } catch (error: any) {
      console.error("[signout] Error:", error);
      sendResponse(res, 500, { error: "Internal server error" });
    }
  });
});

// ==================== STRIPE FUNCTIONS ====================

/**
 * CRIAR SESSÃO DE CHECKOUT - Inicia o processo de pagamento com Stripe
 * Valida o utilizador e cria a sessão de subscrição
 */
export const createCheckoutSession = onRequest(
  async (req: Request, res: Response) => {
    await corsMiddleware(req, res, async () => {
      const ip = getIp(req);
      const userAgent = getUserAgent(req);

      try {
        // Rate limit check
        const { success } = await ratelimit.limit(ip + ":checkout");
        if (!success) {
          return sendResponse(res, 429, {
            error: "Muitas tentativas. Aguarde 1 hora.",
          });
        }

        if (req.method !== "POST") {
          return sendResponse(res, 405, { error: "Method not allowed" });
        }

        // Verifica a autenticação
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return sendResponse(res, 401, { error: "No authorization header" });
        }

        const token = authHeader.substring(7);
        let decoded;
        try {
          decoded = verifyJWTToken(token);
        } catch (error) {
          return sendResponse(res, 401, { error: "Invalid token" });
        }

        const { priceId, billingCycle } = req.body;

        if (!priceId) {
          return sendResponse(res, 400, { error: "priceId é obrigatório" });
        }

        // Validate price ID format (basic Stripe format check)
        if (!priceId.match(/^price_[a-zA-Z0-9]+$/)) {
          return sendResponse(res, 400, { error: "priceId inválido" });
        }

        const userRecord = await auth.getUser(decoded.uid);
        const userEmail = userRecord.email!;

        // Obtém ou cria o cliente no Stripe
        let customerId: string;
        const userDoc = await db.collection("users").doc(decoded.uid).get();
        const userData = userDoc.data();

        if (userData?.stripeCustomerId) {
          customerId = userData.stripeCustomerId;
        } else {
          const customer = await stripe.customers.create({
            email: userEmail,
            metadata: {
              firebaseUid: decoded.uid,
              firstName: userRecord.displayName || "User",
            },
          });
          customerId = customer.id;

          // Store customer ID
          await db.collection("users").doc(decoded.uid).update({
            stripeCustomerId: customerId,
          });
        }

        // Cria a sessão de checkout no Stripe
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura/sucesso?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura`,
          metadata: {
            firebaseUid: decoded.uid,
            billingCycle: billingCycle || "monthly",
          },
        });

        await logSecurityAction({
          userId: decoded.uid,
          email: userEmail,
          action: "CHECKOUT_SESSION_CREATED",
          entity: "Stripe",
          ip,
          userAgent,
          status: "success",
          details: { sessionId: session.id, priceId },
        });

        sendResponse(res, 200, {
          success: true,
          sessionId: session.id,
          url: session.url,
        });
      } catch (error: any) {
        console.error("[createCheckoutSession] Error:", error);

        await logSecurityAction({
          action: "CHECKOUT_SESSION_ERROR",
          entity: "Stripe",
          ip,
          userAgent,
          status: "failure",
          details: { error: error.message },
        });

        sendResponse(res, 500, { error: "Erro ao criar sessão de pagamento" });
      }
    });
  },
);

/**
 * WEBHOOK DO STRIPE - Gere eventos enviados pelo Stripe
 * O backend recebe notificações diretamente do Stripe (ex: pagamento concluído)
 * Atualiza o Firestore com base nos eventos recebidos
 */
export const stripeWebhook = onRequest(async (req: Request, res: Response) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const signature = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      res.status(400).json({ error: "Missing configuration" });
      return;
    }

    let event;

    try {
      const body = (req as any).rawBody as Buffer;
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
      console.error(
        "[Stripe Webhook] Signature verification failed:",
        error.message,
      );
      res.status(400).json({ error: "Webhook signature verification failed" });
      return;
    }

    const ip = getIp(req);

    // Regista todos os eventos de webhook para auditoria
    await logSecurityAction({
      action: `STRIPE_WEBHOOK_${event.type}`,
      entity: "Stripe",
      ip,
      userAgent: "Stripe",
      status: "success",
      details: { eventId: event.id },
    });

    // Gere os diferentes tipos de eventos
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const firebaseUid = session.metadata?.firebaseUid;

        if (firebaseUid) {
          // Atualiza a subscrição do utilizador no Firestore
          await db
            .collection("users")
            .doc(firebaseUid)
            .update({
              subscription: {
                customerId: session.customer,
                subscriptionId: session.subscription,
                status: "active",
                currency: session.currency,
                billingCycle: session.metadata?.billingCycle || "monthly",
                startedAt: new Date(session.created * 1000),
                updatedAt: new Date(),
              },
              isActive: true,
            });

          console.log(
            `[Stripe] Subscription activated for user ${firebaseUid}`,
          );
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as any;
        const firebaseUid = subscription.metadata?.firebaseUid;

        if (firebaseUid) {
          await db
            .collection("users")
            .doc(firebaseUid)
            .update({
              subscription: {
                status: subscription.status,
                updatedAt: new Date(),
              },
            });

          console.log(`[Stripe] Subscription updated for user ${firebaseUid}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as any;
        const firebaseUid = subscription.metadata?.firebaseUid;

        if (firebaseUid) {
          await db
            .collection("users")
            .doc(firebaseUid)
            .update({
              subscription: {
                status: "cancelled",
                cancelledAt: new Date(),
                updatedAt: new Date(),
              },
              isActive: false,
            });

          console.log(
            `[Stripe] Subscription cancelled for user ${firebaseUid}`,
          );
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        const customerId = invoice.customer;

        // Procura o utilizador pelo ID de cliente do Stripe e atualiza o registo de pagamento
        const usersSnapshot = await db
          .collection("users")
          .where("subscription.customerId", "==", customerId)
          .limit(1)
          .get();

        if (!usersSnapshot.empty) {
          const userId = usersSnapshot.docs[0].id;
          await db
            .collection("users")
            .doc(userId)
            .update({
              lastPaymentDate: new Date(invoice.created * 1000),
              lastPaymentStatus: "succeeded",
            });

          console.log(`[Stripe] Payment succeeded for user ${userId}`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const customerId = invoice.customer;

        // Procura o utilizador pelo ID de cliente do Stripe e atualiza o registo de pagamento (falha)
        const usersSnapshot = await db
          .collection("users")
          .where("subscription.customerId", "==", customerId)
          .limit(1)
          .get();

        if (!usersSnapshot.empty) {
          const userId = usersSnapshot.docs[0].id;
          await db.collection("users").doc(userId).update({
            lastPaymentStatus: "failed",
            lastPaymentError: invoice.attempt_count,
          });

          console.log(`[Stripe] Payment failed for user ${userId}`);
        }
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    // Retorna sucesso ao Stripe para confirmar receção
    res.json({ received: true });
  } catch (error: any) {
    console.error("[Stripe Webhook] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
