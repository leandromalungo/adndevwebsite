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

/**
 * POST /api/auth/signup
 * 
 * Creates a new user in Firebase.
 * Frontend sends raw data - backend validates everything.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, name, country, telegram, alerts } = body;

        // Backend validation - frontend sends raw data
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        // Sanitize inputs (backend security)
        const sanitizedEmail = sanitizeEmail(email);
        const sanitizedName = sanitizeText(name || "");
        const sanitizedTelegram = sanitizeText(telegram || "");

        if (!sanitizedEmail) {
            return NextResponse.json(
                { message: "Email inválido" },
                { status: 400 }
            );
        }

        // Security check
        if (
            (sanitizedName && !isSafeString(sanitizedName)) ||
            (sanitizedTelegram && !isSafeString(sanitizedTelegram))
        ) {
            return NextResponse.json(
                { message: "Conteúdo inválido detectado" },
                { status: 400 }
            );
        }

        // Password validation (backend only)
        if (password.length < 8) {
            return NextResponse.json(
                { message: "A senha deve ter no mínimo 8 caracteres" },
                { status: 400 }
            );
        }

        // Create user in Firebase (backend only)
        const userRecord = await adminAuth.createUser({
            email: sanitizedEmail,
            password: password,
            displayName: sanitizedName || sanitizedEmail,
        });

        // Store additional user data in Firestore (optional)
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

        // Return success - frontend will then call signIn
        return NextResponse.json(
            {
                message: "Usuário criado com sucesso",
                userId: userRecord.uid,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("[Signup Error]:", error.message);

        // Handle Firebase errors
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

        // Generic error - don't expose details
        return NextResponse.json(
            { message: "Erro ao criar usuário. Tente novamente." },
            { status: 500 }
        );
    }
}
