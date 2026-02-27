// app/cd1afa520f/layout.tsx
// Layout principal do painel administrativo

"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";
  const pathname = usePathname();
  const router = useRouter();

  // Redireciona para login se a sessão foi resolvida mas não é admin
  useEffect(() => {
    if (!loading && pathname !== "/cd1afa520f/login") {
      if (!user || (user as any).role !== "admin") {
        router.replace("/cd1afa520f/login");
      }
    }
  }, [loading, user, pathname, router]);

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

  // Enquanto aguarda redirecionamento (sessão resolvida mas sem permissão)
  if (!user || (user as any).role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AdminSidebar onLogout={() => { import("next-auth/react").then(m => m.signOut()); }} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
        <AdminHeader userName={user?.name || user?.email || ""} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
