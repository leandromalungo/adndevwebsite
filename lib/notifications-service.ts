import 'server-only';
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAllDiscoveryItems } from "@/lib/discovery-data";

export interface NotificationPreferences {
  eventos: boolean;
  bolsas: boolean;
  comunidades: boolean;
  cursos: boolean;
  startups: boolean;
  plataforma: boolean;
  emailDigest?: boolean;
}

export interface PlatformNotification {
  id: string;
  userId: string;
  category: "eventos" | "bolsas" | "comunidades" | "cursos" | "startups" | "plataforma";
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  eventos: true,
  bolsas: true,
  comunidades: true,
  cursos: true,
  startups: true,
  plataforma: true,
  emailDigest: false,
};

// Armazenamento em memória resiliente como fallback (para dev ou se a tabela ainda não foi criada no Supabase)
const memoryPreferencesStore = new Map<string, NotificationPreferences>();
const memoryNotificationsStore = new Map<string, PlatformNotification[]>();

/**
 * Carrega as preferências de notificação do utilizador.
 */
export async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  if (!userId) return DEFAULT_NOTIFICATION_PREFERENCES;

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("user_notification_preferences")
        .select("preferences")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data?.preferences) {
        return {
          ...DEFAULT_NOTIFICATION_PREFERENCES,
          ...data.preferences,
        };
      }
    } catch {
      // Falha silenciosa com fallback seguro
    }
  }

  const stored = memoryPreferencesStore.get(userId);
  return stored || { ...DEFAULT_NOTIFICATION_PREFERENCES };
}

/**
 * Atualiza com segurança as preferências de notificação do utilizador.
 */
export async function updateUserNotificationPreferences(
  userId: string,
  newPrefs: Partial<NotificationPreferences>
): Promise<NotificationPreferences> {
  if (!userId) {
    throw new Error("Utilizador não autenticado.");
  }

  const current = await getUserNotificationPreferences(userId);
  const updated: NotificationPreferences = {
    ...current,
    ...newPrefs,
  };

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseAdmin
        .from("user_notification_preferences")
        .upsert(
          {
            user_id: userId,
            preferences: updated,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (!error) {
        memoryPreferencesStore.set(userId, updated);
        return updated;
      }
    } catch {
      // Prossegue para fallback seguro
    }
  }

  memoryPreferencesStore.set(userId, updated);
  return updated;
}

/**
 * Gera notificações iniciais contextuais baseadas nos conteúdos ativos da plataforma,
 * respeitando estritamente os tipos de conteúdo que o utilizador escolheu receber.
 */
function generateContextualNotifications(userId: string, prefs: NotificationPreferences): PlatformNotification[] {
  const allItems = getAllDiscoveryItems();
  const notifications: PlatformNotification[] = [];

  // Notificação padrão de boas-vindas da plataforma (se plataforma estiver ativa)
  if (prefs.plataforma) {
    notifications.push({
      id: `notif-welcome-${userId.slice(0, 8)}`,
      userId,
      category: "plataforma",
      title: "Bem-vindo à ADN Developer!",
      message: "Personalize as suas preferências de alertas para receber novidades sobre tecnologia na lusofonia.",
      link: "/notificacoes?tab=preferencias",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    });
  }

  // Notificações de Eventos & Hackathons
  if (prefs.eventos) {
    const eventItem = allItems.find((i) => i.category === "eventos" || i.category === "hackathons");
    if (eventItem) {
      notifications.push({
        id: `notif-ev-${eventItem.id}`,
        userId,
        category: "eventos",
        title: `Novo Evento: ${eventItem.title}`,
        message: `${eventItem.organizer || "Comunidade"} publicou um novo evento ${eventItem.format === "online" ? "online" : "presencial"}.`,
        link: `/oportunidades/${encodeURIComponent(eventItem.id)}`,
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      });
    }
  }

  // Notificações de Bolsas de Estudo
  if (prefs.bolsas) {
    const bolsaItem = allItems.find((i) => i.category === "bolsas" || i.category === "intercambio");
    if (bolsaItem) {
      notifications.push({
        id: `notif-bolsa-${bolsaItem.id}`,
        userId,
        category: "bolsas",
        title: `Oportunidade de Bolsa: ${bolsaItem.title}`,
        message: `Prazo de candidatura aberto para ${bolsaItem.country || "estudantes lusófonos"}.`,
        link: `/oportunidades/${encodeURIComponent(bolsaItem.id)}`,
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      });
    }
  }

  // Notificações de Comunidades
  if (prefs.comunidades) {
    const commItem = allItems.find((i) => i.category === "comunidades");
    if (commItem) {
      notifications.push({
        id: `notif-comm-${commItem.id}`,
        userId,
        category: "comunidades",
        title: `Comunidade em destaque: ${commItem.title}`,
        message: `Junte-se à rede de programadores e partilhe conhecimento.`,
        link: `/oportunidades/${encodeURIComponent(commItem.id)}`,
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      });
    }
  }

  // Notificações de Startups
  if (prefs.startups) {
    const startupItem = allItems.find((i) => i.category === "startups");
    if (startupItem) {
      notifications.push({
        id: `notif-startup-${startupItem.id}`,
        userId,
        category: "startups",
        title: `Ecossistema Startup: ${startupItem.title}`,
        message: `Novo programa de apoio ao empreendedorismo tecnológico na lusofonia.`,
        link: `/oportunidades/${encodeURIComponent(startupItem.id)}`,
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      });
    }
  }

  // Notificações de Cursos & Roadmaps
  if (prefs.cursos) {
    const cursoItem = allItems.find((i) => i.category === "cursos");
    if (cursoItem) {
      notifications.push({
        id: `notif-curso-${cursoItem.id}`,
        userId,
        category: "cursos",
        title: `Capacitação: ${cursoItem.title}`,
        message: `Guia prático e formação disponível para acelerar a tua carreira tech.`,
        link: `/oportunidades/${encodeURIComponent(cursoItem.id)}`,
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      });
    }
  }

  return notifications;
}

/**
 * Obtém a lista de notificações para o utilizador, filtrando estritamente pelas preferências ativas.
 */
export async function getUserNotifications(userId: string): Promise<PlatformNotification[]> {
  if (!userId) return [];

  const prefs = await getUserNotificationPreferences(userId);

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("user_notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && Array.isArray(data) && data.length > 0) {
        // Filtra de acordo com as preferências atuais
        return data
          .map((row: any): PlatformNotification => ({
            id: String(row.id),
            userId: String(row.user_id),
            category: (row.category as PlatformNotification["category"]) || "plataforma",
            title: String(row.title || ""),
            message: String(row.message || ""),
            link: String(row.link || ""),
            isRead: Boolean(row.is_read),
            createdAt: String(row.created_at || new Date().toISOString()),
          }))
          .filter((n) => prefs[n.category] !== false);
      }
    } catch {
      // Fallback
    }
  }

  // Fallback em memória
  let userNotifs = memoryNotificationsStore.get(userId);
  if (!userNotifs || userNotifs.length === 0) {
    userNotifs = generateContextualNotifications(userId, prefs);
    memoryNotificationsStore.set(userId, userNotifs);
  }

  // Retorna apenas notificações cujas preferências estejam ativadas
  return userNotifs.filter((n) => prefs[n.category] !== false);
}

/**
 * Marca uma notificação como lida de forma segura.
 */
export async function markNotificationAsRead(userId: string, notificationId: string): Promise<boolean> {
  if (!userId || !notificationId) return false;

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin
        .from("user_notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("id", notificationId);
    } catch {
      // Fallback
    }
  }

  const list = memoryNotificationsStore.get(userId);
  if (list) {
    const item = list.find((n) => n.id === notificationId);
    if (item) item.isRead = true;
  }

  return true;
}

/**
 * Marca todas as notificações do utilizador como lidas.
 */
export async function markAllNotificationsAsRead(userId: string): Promise<boolean> {
  if (!userId) return false;

  if (isSupabaseConfigured()) {
    try {
      await supabaseAdmin
        .from("user_notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);
    } catch {
      // Fallback
    }
  }

  const list = memoryNotificationsStore.get(userId);
  if (list) {
    list.forEach((n) => {
      n.isRead = true;
    });
  }

  return true;
}
