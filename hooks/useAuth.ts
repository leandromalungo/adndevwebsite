/**
 * useAuth Hook
 * 
 * FRONTEND: Apenas obtém dados de sessão do backend.
 * BACKEND (NextAuth): Valida e gerencia toda a autenticação.
 * 
 * Este hook é um wrapper em volta do useSession do NextAuth.
 * Mantém a mesma interface para compatibilidade com componentes existentes.
 */

"use client";

import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export function useAuth() {
    // BACKEND: NextAuth gerencia sessão - frontend apenas lê
    const { data: session, status } = useSession();

    const loading = status === "loading";
    const isLoggedIn = status === "authenticated";

    // Mapeia dados da sessão para formato compatível
    const user = session?.user ? {
        uid: session.user.id,
        email: session.user.email,
        displayName: session.user.name,
    } : null;

    /**
     * BACKEND: NextAuth invalida sessão no servidor.
     * Frontend apenas chama a função - sem lógica.
     */
    const logout = async () => {
        await nextAuthSignOut({ redirect: false });
    };

    return { user, loading, logout, isLoggedIn };
}
