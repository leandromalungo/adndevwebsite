import { getDiscoveryItemById, DiscoveryItem, getAllDiscoveryItems } from "@/lib/discovery-data";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function fetchOpportunity(id: string): Promise<DiscoveryItem | null> {
  if (!id) return null;
  const decodedId = decodeURIComponent(id).trim();

  // 1. Procurar em todos os dados consolidados (eventos, bolsas, comunidades, startups)
  const item = getDiscoveryItemById(decodedId);
  if (item) return item;

  // 2. Tentar consulta no Supabase para eventos criados dinamicamente no painel administrativo
  if (isSupabaseConfigured()) {
    try {
      const rawNumId = decodedId.replace(/^(admin-event-|db-event-|event-)/, "");
      const numId = parseInt(rawNumId, 10);
      if (!isNaN(numId)) {
        const { data } = await supabaseAdmin
          .from("admin_events")
          .select("id, title, description, date_label, location, country, category, organizer, link, image_url")
          .eq("id", numId)
          .eq("is_published", true)
          .maybeSingle();

        if (data) {
          return {
            id: `db-event-${data.id}`,
            title: data.title,
            description: data.description,
            fullDescription: data.description,
            category: "eventos",
            categoryLabel: data.category || "Evento",
            country: data.country || "Angola",
            location: data.location || "Online",
            format: data.location?.toLowerCase().includes("online") ? "online" : "presencial",
            isFree: true,
            isExpired: false,
            dateOrDeadline: data.date_label || "A anunciar",
            organizer: data.organizer || "Comunidade Tech",
            imageUrl: data.image_url || "/images-events.webp",
            link: data.link || "#",
            isExternalLink: Boolean(data.link && data.link.startsWith("http")),
            tags: ["Evento", data.country || "Angola"].filter(Boolean),
          };
        }
      }
    } catch {
      // Ignorar erros de rede/banco
    }
  }

  return null;
}

export async function getAllOpportunityIds(): Promise<{ id: string }[]> {
  const items = getAllDiscoveryItems();
  return items.map((it) => ({ id: it.id }));
}
