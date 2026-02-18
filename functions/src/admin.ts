import { onRequest } from "firebase-functions/v2/https";
import { Request, Response } from "express";
import { db, adminRatelimit, ratelimit } from "./config";
import {
    getIp,
    getUserAgent,
    isValidContentType,
    sendResponse,
    logSecurityAction,
    verifyJWTToken
} from "./helpers";
import { generateRequestId } from "./tracing";

/**
 * Utilitário tipo middleware para verificar se o utilizador tem a role de administrador
 */
async function verifyAdmin(req: Request, requestId: string): Promise<{ authorized: boolean; decoded?: any }> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { authorized: false };
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = verifyJWTToken(token);

        if (decoded.role !== "admin") {
            return { authorized: false };
        }

        return { authorized: true, decoded };
    } catch (error) {
        return { authorized: false };
    }
}

/**
 * OBTÉM UTILIZADORES ADMIN
 * Lista todos os utilizadores registados no sistema (Apenas para Admin)
 */
export const getAdminUsers = onRequest(async (req: Request, res: Response) => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
        // Limitador de taxa
        const { success } = await adminRatelimit.limit(ip + ":admin_users");
        if (!success) {
            return sendResponse(res, 429, { error: "Muitas tentativas." }, requestId);
        }

        // Verifica permissões de Admin
        const { authorized } = await verifyAdmin(req, requestId);
        if (!authorized) {
            await logSecurityAction({
                action: "ADMIN_UNAUTHORIZED_ACCESS",
                entity: "AdminUI",
                ip,
                userAgent,
                status: "failure",
                requestId,
            });
            return sendResponse(res, 403, { error: "Acesso negado." }, requestId);
        }

        // Procura utilizadores no Firestore
        const usersSnapshot = await db.collection("users").get();
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        sendResponse(res, 200, users, requestId);
    } catch (error: any) {
        console.error("[getAdminUsers] Erro:", error);
        sendResponse(res, 500, { error: "Erro interno do servidor" }, requestId);
    }
});

/**
 * ATUALIZA ESTADO DO UTILIZADOR ADMIN
 * Permite banir, ativar ou suspender utilizadores
 */
export const updateAdminUserStatus = onRequest(async (req: Request, res: Response) => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
        if (req.method !== "POST") {
            return sendResponse(res, 405, { error: "Método não permitido" }, requestId);
        }

        if (!isValidContentType(req)) {
            return sendResponse(res, 415, { error: "Content-Type deve ser application/json" }, requestId);
        }

        // Verifica permissões de Admin
        const { authorized, decoded } = await verifyAdmin(req, requestId);
        if (!authorized) {
            return sendResponse(res, 403, { error: "Acesso negado." }, requestId);
        }

        const { userId, status } = req.body;
        if (!userId || !status) {
            return sendResponse(res, 400, { error: "userId e status são obrigatórios" }, requestId);
        }

        // Atualiza no Firestore
        await db.collection("users").doc(userId).update({ status });

        // Regista a ação de auditoria
        await logSecurityAction({
            userId: decoded?.uid,
            action: "ADMIN_UPDATE_USER_STATUS",
            entity: "AdminUI",
            ip,
            userAgent,
            status: "success",
            details: { targetUserId: userId, newStatus: status },
            requestId,
        });

        sendResponse(res, 200, { success: true }, requestId);
    } catch (error: any) {
        console.error("[updateAdminUserStatus] Erro:", error);
        sendResponse(res, 500, { error: "Erro interno do servidor" }, requestId);
    }
});

/**
 * OBTÉM MÉTRICAS ADMIN
 * Retorna dados globais do SaaS (MRR, Subscritores, etc.)
 */
export const getAdminMetrics = onRequest(async (req: Request, res: Response) => {
    const requestId = generateRequestId();

    try {
        // Verifica permissões de Admin
        const { authorized } = await verifyAdmin(req, requestId);
        if (!authorized) {
            return sendResponse(res, 403, { error: "Acesso negado." }, requestId);
        }

        const metricsDoc = await db.collection("metrics_global").doc("current").get();
        const data = metricsDoc.exists ? metricsDoc.data() : {
            totalMRR: 0,
            totalSubscribers: 0,
            churnRate: 0,
            arpu: 0,
            lifetimeRevenue: 0,
        };

        sendResponse(res, 200, data, requestId);
    } catch (error: any) {
        console.error("[getAdminMetrics] Erro:", error);
        sendResponse(res, 500, { error: "Erro interno do servidor" }, requestId);
    }
});

/**
 * VERIFICA LIMITE DE TAXA (RATE LIMIT)
 * Endpoint interno usado por rotas de API para verificar limites de IP
 */
export const checkRateLimit = onRequest(async (req: Request, res: Response) => {
    const requestId = generateRequestId();

    try {
        if (req.method !== "POST") {
            return sendResponse(res, 405, { error: "Método não permitido" }, requestId);
        }

        const { ip, action } = req.body;
        if (!ip || !action) {
            return sendResponse(res, 400, { error: "ip e action são obrigatórios" }, requestId);
        }

        const limiter = (action === "login" || action === "signin_admin") ? adminRatelimit : ratelimit;
        const { success, remaining, reset } = await limiter.limit(`${ip}:${action}`);

        sendResponse(res, 200, {
            allowed: success,
            remaining,
            reset
        }, requestId);
    } catch (error: any) {
        console.error("[checkRateLimit] Erro:", error);
        sendResponse(res, 500, { error: "Erro interno do servidor" }, requestId);
    }
});

/**
 * REGISTA AÇÃO DE ADMIN
 * Endpoint para registar logs de auditoria originados no frontend Admin
 */
export const logAdminAction = onRequest(async (req: Request, res: Response) => {
    const ip = getIp(req);
    const userAgent = getUserAgent(req);
    const requestId = generateRequestId();

    try {
        if (req.method !== "POST") {
            return sendResponse(res, 405, { error: "Método não permitido" }, requestId);
        }

        const { authorized, decoded } = await verifyAdmin(req, requestId);
        if (!authorized) {
            return sendResponse(res, 403, { error: "Acesso negado." }, requestId);
        }

        const { action, entity, details } = req.body;
        if (!action || !entity) {
            return sendResponse(res, 400, { error: "action e entity são obrigatórios" }, requestId);
        }

        await logSecurityAction({
            userId: decoded?.uid,
            action,
            entity,
            details,
            ip,
            userAgent,
            status: "success",
            requestId,
        });

        sendResponse(res, 200, { success: true }, requestId);
    } catch (error: any) {
        console.error("[logAdminAction] Erro:", error);
        sendResponse(res, 500, { error: "Erro interno do servidor" }, requestId);
    }
});
