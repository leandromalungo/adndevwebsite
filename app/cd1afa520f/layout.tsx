// app/cd1afa520f/layout.tsx
// Layout principal do painel administrativo

"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();

  // Não aplica layout na página de login
  if (pathname === "/cd1afa520f/login") {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  // Mostra loading enquanto verifica autenticação (evita flash)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderiza nada (o hook já redireciona)
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AdminSidebar onLogout={logout} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <AdminHeader userName={user?.name || user?.email} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
