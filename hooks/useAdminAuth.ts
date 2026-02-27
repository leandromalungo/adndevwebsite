/**
 * useAdminAuth Hook
 * 
 * FRONTEND: Apenas verifica role do usuário da sessão.
 * BACKEND (NextAuth): Valida credenciais e role de admin.
 * 
 * Hook para gerenciar estado de autenticação de administradores.
 * Redireciona automaticamente usuários não autenticados ou sem permissão.
 */

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface AdminUser {
    email: string;
    name: string;
}

/**
 * Hook para gerenciar sessão de admin e proteger rotas restritas.
 * 
 * FRONTEND: Apenas lê dados da sessão - backend valida tudo.
 * 
 * @returns {Object} Estado de autenticação e métodos de controle.
 * @property {AdminUser|null} user - Usuário admin autenticado.
 * @property {boolean} loading - Estado de carregamento da verificação.
 * @property {Function} logout - Função para encerrar sessão.
 */
export function useAdminAuth() {
    // BACKEND: NextAuth gerencia sessão - frontend apenas lê
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const loading = status === "loading";

    // Mapeia dados da sessão para formato esperado
    const user: AdminUser | null = session?.user ? {
        email: session.user.email ?? "",
        name: session.user.name ?? "",
    } : null;

    useEffect(() => {
        // Skip check on login page to avoid recursion
        if (pathname === "/cd1afa520f/login") {
            return;
        }

        // Aguarda carregamento da sessão
        if (loading) {
            return;
        }

        // FRONTEND: Verifica se usuário está autenticado e tem role admin
        // BACKEND já validou - frontend apenas lê
        if (!session || session.user.role !== "admin") {
            router.push("/cd1afa520f/login");
        }
    }, [session, loading, pathname, router]);

    /**
     * BACKEND: NextAuth invalida sessão no servidor.
     * Frontend apenas chama a função e redireciona.
     */
    const logout = async () => {
        const { signOut } = await import("next-auth/react");
        await signOut({ redirect: false });
        router.push("/cd1afa520f/login");
    };

    /**
     * BACKEND: Revalida sessão chamando NextAuth.
     * Frontend apenas dispara a revalidação.
     */
    const checkAuth = async () => {
        // NextAuth automaticamente revalida sessão
        // Não é necessário fazer nada aqui
    };

    return { user, loading, logout, checkAuth };
}
