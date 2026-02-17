// components/admin/StatsCard.tsx
// Card de estatísticas reutilizável para o dashboard

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  loading?: boolean;
}

const variantStyles = {
  default: "text-foreground",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  destructive: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
};

const variantBgStyles = {
  default: "bg-muted",
  success: "bg-green-100 dark:bg-green-950",
  warning: "bg-yellow-100 dark:bg-yellow-950",
  destructive: "bg-red-100 dark:bg-red-950",
  info: "bg-blue-100 dark:bg-blue-950",
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  variant = "default",
  loading = false,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={cn(
            "rounded-full p-2",
            variantBgStyles[variant]
          )}
        >
          <Icon className={cn("h-4 w-4", variantStyles[variant])} />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
