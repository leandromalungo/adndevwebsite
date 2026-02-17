/**
 * User Registration API Endpoint
 * 
 * Backend-only user creation.
 * Frontend sends user data - backend validates and creates user in Firebase.
 * NO validation happens in frontend.
 */

import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { sanitizeText, sanitizeEmail, isSafeString } from "@/lib/security";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// ==============================
// Redis Rate Limit (ADICIONADO)
// ==============================

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests por minuto por IP
});

/**
 * POST /api/auth/signup
 */
export async function POST(request: NextRequest) {
    try {

        // ==============================
        // RATE LIMIT (ADICIONADO)
        // ==============================

        const ip =
          request.headers.get("x-forwarded-for")?.split(",")[0] ||
          "unknown";

        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                { message: "Muitas requisições. Tente novamente mais tarde." },
                { status: 429 }
            );
        }

        // ==============================
        // RESTANTE DO SEU CÓDIGO (INALTERADO)
        // ==============================

        const body = await request.json();
        const { email, password, name, country, telegram, alerts } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const sanitizedEmail = sanitizeEmail(email);
        const sanitizedName = sanitizeText(name || "");
        const sanitizedTelegram = sanitizeText(telegram || "");

        if (!sanitizedEmail) {
            return NextResponse.json(
                { message: "Email inválido" },
                { status: 400 }
            );
        }

        if (
            (sanitizedName && !isSafeString(sanitizedName)) ||
            (sanitizedTelegram && !isSafeString(sanitizedTelegram))
        ) {
            return NextResponse.json(
                { message: "Conteúdo inválido detectado" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "A senha deve ter no mínimo 8 caracteres" },
                { status: 400 }
            );
        }

        const userRecord = await adminAuth.createUser({
            email: sanitizedEmail,
            password: password, // Firebase faz hash automaticamente
            displayName: sanitizedName || sanitizedEmail,
        });

        if (adminDb) {
            await adminDb.collection("users").doc(userRecord.uid).set({
                email: sanitizedEmail,
                name: sanitizedName,
                country: country || "Angola",
                telegram: sanitizedTelegram,
                alerts: alerts || [],
                createdAt: new Date().toISOString(),
            });
        }

        return NextResponse.json(
            {
                message: "Usuário criado com sucesso",
                userId: userRecord.uid,
            },
            { status: 201 }
        );

    } catch (error: any) {

        // Logging seguro (sem expor payload)
        console.error("[Signup Error]:", error.code || error.message);

        if (error.code === "auth/email-already-exists") {
            return NextResponse.json(
                { message: "Este email já está cadastrado" },
                { status: 409 }
            );
        }

        if (error.code === "auth/invalid-email") {
            return NextResponse.json(
                { message: "Email inválido" },
                { status: 400 }
            );
        }

        if (error.code === "auth/weak-password") {
            return NextResponse.json(
                { message: "Senha muito fraca" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Erro ao criar usuário. Tente novamente." },
            { status: 500 }
        );
    }
}