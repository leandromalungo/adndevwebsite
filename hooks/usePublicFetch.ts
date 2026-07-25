"use client";

import { useEffect, useState } from "react";

export function usePublicFetch<T>(url: string, listKey: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(false);
    setErrorMessage("");

    fetch(url, { cache: "no-store" })
      .then(async (res) => {
        const payload = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(payload?.error || "Falha ao carregar dados");
        }

        const list = payload?.[listKey];
        if (!active) return;
        setData(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        if (!active) return;
        setData([]);
        setError(true);
        setErrorMessage(err instanceof Error ? err.message : "Falha ao carregar dados");
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [url, listKey]);

  return { data, isLoading, error, errorMessage };
}