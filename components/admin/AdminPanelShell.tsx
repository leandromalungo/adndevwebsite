 "use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { Activity, CircleUserRound, ChevronLeft, ChevronRight, Database, LayoutDashboard, Mail, Menu, Settings, ShieldCheck, ShieldAlert, Users, X } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { adminPath } from "@/lib/admin-routes";

type AdminPanelShellProps = {
  children: ReactNode;
  active: "dashboard" | "users" | "profiles" | "auth" | "emails" | "events" | "settings" | "content" | "security";
};

const navItems = [
  { key: "dashboard", label: "Dashboard", href: adminPath("/dashboard"), icon: LayoutDashboard },
  { key: "security", label: "Segurança", href: adminPath("/security"), icon: ShieldAlert },
  { key: "users", label: "Utilizadores", href: adminPath("/users"), icon: Users },
  { key: "profiles", label: "Perfis", href: adminPath("/profiles"), icon: CircleUserRound },
  { key: "auth", label: "Autenticação", href: adminPath("/auth"), icon: ShieldCheck },
  { key: "emails", label: "Emails", href: adminPath("/emails"), icon: Mail },
  { key: "events", label: "Eventos", href: adminPath("/events"), icon: Activity },
  { key: "content", label: "Publicações", href: adminPath("/content"), icon: Database },
  { key: "settings", label: "Configurações", href: adminPath("/settings"), icon: Settings },
  
] as const;

export function AdminPanelShell({ children, active }: AdminPanelShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f8f9] text-gray-900 touch-pan-y" style={{ touchAction: "pan-y" }}>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white p-4 transition-all duration-200 ${
          collapsed ? "w-20" : "w-72"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="mb-5 flex items-center">
            <div className="flex flex-1 items-center justify-start pl-1">
              {!collapsed ? (
                <Image src="/logoNavbar.png" alt="ADN" width={64} height={64} className="object-contain" />
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setCollapsed((prev) => !prev)}
              className="hidden rounded p-1 text-gray-500 transition duration-200 active:scale-95 hover:bg-gray-100 hover:text-gray-700 lg:block"
              aria-label={collapsed ? "Expandir menu lateral" : "Encolher menu lateral"}
              title={collapsed ? "Expandir" : "Encolher"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded p-1 text-gray-500 transition duration-200 active:scale-95 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
              aria-label="Fechar menu lateral"
              title="Fechar menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive = item.key === active;
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition duration-200 active:scale-95 ${
                    isActive
                      ? "bg-violet-100 text-violet-800"
                      : "text-gray-700 hover:bg-gray-100 hover:text-violet-700"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed ? item.label : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-4">
          <AdminLogoutButton collapsed={collapsed} />
        </div>
      </aside>

      {mobileMenuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Fechar menu"
        />
      ) : null}

      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 text-gray-600 transition duration-200 active:scale-95 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Abrir menu lateral"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-gray-700">Painel Admin</span>
          <div className="w-9" />
        </div>
      </div>

      <section
        className={`min-h-screen p-4 transition-all duration-200 md:p-6 ${collapsed ? "lg:ml-20" : "lg:ml-72"}`}
      >
        {children}
      </section>
    </div>
  );
}
