"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/api") || pathname.startsWith("/admin")) {
      return;
    }

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "page_view",
        route: pathname,
      }),
      keepalive: true,
    }).catch(() => {
      // Silencia falha de telemetria no cliente.
    });
  }, [pathname]);

  return null;
}
