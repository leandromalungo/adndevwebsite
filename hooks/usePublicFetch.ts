"use client";

import { useEffect, useState } from "react";

export function usePublicFetch<T>(url: string, listKey: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    fetch(url, { cache: "no-store" })
      .then((res) => res.json())
      .then((payload) => {
        const list = payload?.[listKey];
        setData(Array.isArray(list) ? list : []);
      })
      .catch(() => {
        setData([]);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, listKey]);

  return { data, isLoading, error };
}