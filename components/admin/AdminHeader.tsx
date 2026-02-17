// components/admin/AdminHeader.tsx
// Header do painel administrativo com informações do usuário

"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  userName?: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ userName, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Page Title - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-foreground">
          Painel Administrativo
        </h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {userName || "Admin"}
          </p>
          <p className="text-xs text-muted-foreground">Administrador</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-sm font-semibold">
            {userName?.charAt(0).toUpperCase() || "A"}
          </span>
        </div>
      </div>
    </header>
  );
}
