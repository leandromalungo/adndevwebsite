"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { adminPath } from "@/lib/admin-routes";

type AdminLogoutButtonProps = {
  collapsed?: boolean;
};

export function AdminLogoutButton({ collapsed = false }: AdminLogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: adminPath("/login") })}
      className={`rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-red-600 ${
        collapsed ? "flex h-10 w-full items-center justify-center px-0 py-0" : "w-full px-3 py-2"
      }`}
      aria-label="Terminar sessao"
      title={collapsed ? "Terminar sessao" : undefined}
    >
      {collapsed ? <LogOut className="h-4 w-4" /> : "Terminar sessao"}
    </button>
  );
}
