import { Request, Response } from "express";
import { auth, db } from "./config";
import { SECURITY_HEADERS } from "./security";
import jwt from "jsonwebtoken";

/**
 * Obtém o endereço IP do pedido original, considerando proxies
 */
export function getIp(req: Request): string {
    return (
        (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
        req.socket?.remoteAddress ||
        "127.0.0.1"
    );
}

/**
 * Obtém o User Agent do browser ou cliente que fez o pedido
 */
export function getUserAgent(req: Request): string {
    return (req.headers["user-agent"] as string) || "unknown";
}

/**
 * Valida se o Content-Type é application/json para pedidos POST/PUT
 */
export function isValidContentType(req: Request): boolean {
    if (req.method !== "POST" && req.method !== "PUT") return true;
    const ct = (req.headers["content-type"] as string) || "";
    return ct.includes("application/json");
}

/**
 * Regista uma ação de segurança na coleção 'security_logs' do Firestore
 * Usado para auditoria e deteção de anomalias.
 */
export async function logSecurityAction(data: {
    userId?: string;
    email?: string;
    action: string;
    entity: string;
    ip: string;
    userAgent: string;
    details?: any;
    status: "success" | "failure";
    requestId?: string;
}) {
    try {
        await db.collection("security_logs").add({
            ...data,
            timestamp: new Date(),
            environment: process.env.NODE_ENV,
        });
    } catch (error) {
        console.error("[Security Log] Erro ao gravar log:", error);
    }
}

/**
 * Envia uma resposta HTTP padronizada com headers de segurança e ID do pedido
 */
export function sendResponse(
    res: Response,
    status: number,
    data: any,
    requestId?: string,
) {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    res.setHeader("Content-Type", "application/json");
    if (requestId) {
        res.setHeader("X-Request-ID", requestId);
    }
    res.status(status).json(data);
}

/**
 * Verifica e descodifica um ID Token do Firebase
 */
export async function verifyFirebaseIdToken(token: string) {
    try {
        return await auth.verifyIdToken(token);
    } catch (error) {
        console.error("[verifyFirebaseIdToken] Erro na validação:", error);
        throw error;
    }
}

/**
 * Cria um token JWT para gestão interna de sessões
 */
export function createJWTToken(payload: any): string {
    return jwt.sign(payload, process.env.NEXTAUTH_SECRET || "fallback_secret", {
        expiresIn: "30d",
    });
}

/**
 * Verifica e descodifica um token JWT gerado pelo sistema
 */
export function verifyJWTToken(token: string): any {
    try {
        return jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback_secret");
    } catch (error) {
        console.error("[verifyJWTToken] Erro na verificação:", error);
        throw error;
    }
}
