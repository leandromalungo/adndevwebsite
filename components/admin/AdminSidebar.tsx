"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  LogOut,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Postagens", href: "/admin/posts", icon: FileText },
    { name: "Usuários", href: "/admin/users", icon: Users },
    { name: "Assinaturas", href: "/admin/subscriptions", icon: CreditCard },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-bold tracking-tight text-primary">
            Painel 
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
    
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
