/**
 * useGoogleSignup Hook
 *
 * Encapsula a ação de todos os botões "Assinar / Subscrever" do site.
 *
 * Lógica:
 * - Utilizador NÃO autenticado → disparo signIn("google") para verificar email
 * - Utilizador JÁ autenticado  → não faz nada (botão Assinar só existe no modal do perfil)
 *
 * Uso:
 *   const { triggerGoogleSignup, loading } = useGoogleSignup();
 *   <button onClick={triggerGoogleSignup}>Assinar</button>
 */

"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export function useGoogleSignup() {
    const { status } = useSession();
    const [loading, setLoading] = useState(false);

    const triggerGoogleSignup = async () => {
        if (loading) return;
        setLoading(true);
        try {
            // Sempre usa Google OAuth — o Google verifica se o email é verdadeiro
            await signIn("google", { callbackUrl: "/" });
        } finally {
            // signIn redireciona, mas setLoading(false) evita estados soltos se cancelar
            setLoading(false);
        }
    };

    return { triggerGoogleSignup, loading, isAuthenticated: status === "authenticated" };
}
