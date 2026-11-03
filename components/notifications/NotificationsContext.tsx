"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import type {
  PlatformNotification,
  NotificationPreferences,
} from "@/lib/notifications-service";

const DEFAULT_PREFS: NotificationPreferences = {
  eventos: true,
  bolsas: true,
  comunidades: true,
  cursos: true,
  startups: true,
  plataforma: true,
  emailDigest: false,
};

interface NotificationsContextType {
  notifications: PlatformNotification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  isLoading: boolean;
  isSavingPrefs: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  updatePreferences: (newPrefs: Partial<NotificationPreferences>) => Promise<boolean>;
  refreshNotifications: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;

  const [notifications, setNotifications] = useState<PlatformNotification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState<boolean>(false);

  // Busca notificações e preferências do utilizador autenticado
  const fetchAll = useCallback(async () => {
    if (!isLoggedIn) {
      setNotifications([]);
      setPreferences(DEFAULT_PREFS);
      return;
    }

    setIsLoading(true);
    try {
      const [notifsRes, prefsRes] = await Promise.allSettled([
        fetch("/api/notifications", { headers: { Accept: "application/json" } }),
        fetch("/api/notifications/preferences", { headers: { Accept: "application/json" } }),
      ]);

      if (notifsRes.status === "fulfilled" && notifsRes.value.ok) {
        const notifsData = await notifsRes.value.json();
        if (Array.isArray(notifsData.notifications)) {
          setNotifications(notifsData.notifications);
        }
      }

      if (prefsRes.status === "fulfilled" && prefsRes.value.ok) {
        const prefsData = await prefsRes.value.json();
        if (prefsData.preferences) {
          setPreferences((prev) => ({ ...prev, ...prefsData.preferences }));
        }
      }
    } catch {
      // Falha silenciosa
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAll();
    } else {
      setNotifications([]);
      setPreferences(DEFAULT_PREFS);
    }
  }, [isLoggedIn, fetchAll]);

  const markAsRead = useCallback(async (id: string) => {
    if (!id) return;
    // Atualização otimista
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAsRead", id }),
      });
    } catch {
      // Reverter se necessário
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    // Atualização otimista
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllAsRead" }),
      });
    } catch {
      // Falha silenciosa
    }
  }, []);

  const updatePreferences = useCallback(
    async (newPrefs: Partial<NotificationPreferences>): Promise<boolean> => {
      setIsSavingPrefs(true);
      const next = { ...preferences, ...newPrefs };
      setPreferences(next);

      try {
        const res = await fetch("/api/notifications/preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ preferences: next }),
        });

        if (res.ok) {
          // Atualiza lista de notificações para refletir as novas preferências
          await fetchAll();
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        setIsSavingPrefs(false);
      }
    },
    [preferences, fetchAll]
  );

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      preferences,
      isLoading,
      isSavingPrefs,
      markAsRead,
      markAllAsRead,
      updatePreferences,
      refreshNotifications: fetchAll,
    }),
    [
      notifications,
      unreadCount,
      preferences,
      isLoading,
      isSavingPrefs,
      markAsRead,
      markAllAsRead,
      updatePreferences,
      fetchAll,
    ]
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications deve ser utilizado dentro de um NotificationsProvider.");
  }
  return context;
}
