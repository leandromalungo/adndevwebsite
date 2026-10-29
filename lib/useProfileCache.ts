"use client";

import { useEffect, useCallback } from "react";

const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

interface CacheEntry {
  data: any;
  savedAt: number;
}

function getCacheKey(userId: string) {
  return `profile_cache_${userId}`;
}

export function useProfileCache(userId: string | undefined) {
  /**
   * Lê do sessionStorage. Retorna null se:
   * - userId não estiver definido
   * - a cache não existir
   * - a cache tiver expirado (mais antiga que o TTL)
   * 
   * NOTA: Usar sessionStorage em vez de localStorage para maior segurança.
   * sessionStorage é limpo quando o separador do browser fecha, enquanto o localStorage persiste.
   */
  const read = useCallback((): any | null => {
    if (!userId || typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(getCacheKey(userId));
      if (!raw) return null;
      const entry: CacheEntry = JSON.parse(raw);
      const age = Date.now() - entry.savedAt;
      if (age > CACHE_TTL_MS) {
        sessionStorage.removeItem(getCacheKey(userId));
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  }, [userId]);

  /**
   * Write data to sessionStorage with current timestamp.
   */
  const write = useCallback(
    (data: any) => {
      if (!userId || typeof window === "undefined") return;
      const entry: CacheEntry = { data, savedAt: Date.now() };
      sessionStorage.setItem(getCacheKey(userId), JSON.stringify(entry));
    },
    [userId]
  );

  /**
   * Invalidate (delete) the cache entry — call this after every successful save.
   */
  const invalidate = useCallback(() => {
    if (!userId || typeof window === "undefined") return;
    sessionStorage.removeItem(getCacheKey(userId));
  }, [userId]);

  return { read, write, invalidate };
}
