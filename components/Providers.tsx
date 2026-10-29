"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Suppress THREE.Clock deprecation warning from @shadergradient/react
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.("THREE.Clock") || args[0]?.includes?.("THREE.Timer")) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <SessionProvider>
      <PageViewTracker />
      {children}
    </SessionProvider>
  );
}
