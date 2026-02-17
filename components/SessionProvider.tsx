/**
 * SessionProvider Wrapper
 * 
 * Wraps the entire app with NextAuth SessionProvider.
 * This allows all components to access session data via useSession().
 * 
 * FRONTEND: Apenas fornece contexto de sessão.
 * BACKEND: NextAuth gerencia toda a autenticação.
 */

"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function SessionProvider({ children }: Props) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
