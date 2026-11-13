import { getDiscoveryItemById, DiscoveryItem, getAllDiscoveryItems } from "@/lib/discovery-data";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { COMPREHENSIVE_EVENTS } from "@/data/eventsDatabase";
import { bolsas } from "@/data/bolsas";
import { intercambio } from "@/data/intercambio";
import { cursos } from "@/data/cursos";
import { bootcamps } from "@/data/bootcamps";
import { certificacoes } from "@/data/certificacoes";
import { estagios } from "@/data/estagios";
import { mockCommunities } from "@/data/dataCommunity";

/**
 * Busca uma oportunidade por ID de forma robusta e resiliente,
 * verificando o catálogo consolidado, coleções específicas e tabelas do Supabase.
 */
export async function fetchOpportunity(id: string): Promise<DiscoveryItem | null> {
  if (!id) return null;
  const decodedId = decodeURIComponent(id).trim();

  // 1. Procurar em todos os dados consolidados (eventos, bolsas, comunidades, startups)
  const item = getDiscoveryItemById(decodedId);
  if (item) return item;

  // 2. Limpeza profunda de múltiplos prefixos para consulta direta
  const cleanId = decodedId
    .replace(/^(db-event-|db-scholarship-|db-comm-|admin-event-|admin-scholarship-|admin-community-|event-|scholarship-|community-|startup-)+/gi, "")
    .toLowerCase();

  // 3. Tentar encontrar diretamente nas listas estáticas originais
  // a) Eventos
  const matchedEvent = COMPREHENSIVE_EVENTS.find(
    (e) => e.id.toLowerCase() === cleanId || e.id.toLowerCase() === decodedId.toLowerCase()
  );
  if (matchedEvent) {
    return {
      id: `event-${matchedEvent.id}`,
      title: matchedEvent.title,
      description: matchedEvent.description,
      fullDescription: matchedEvent.description,
      category: matchedEvent.category?.toLowerCase().includes("hackathon") ? "hackathons" : "eventos",
      categoryLabel: matchedEvent.category || "Evento",
      country: matchedEvent.country || "Angola",
      location: matchedEvent.location || (matchedEvent.isOnline ? "Online" : undefined),
      format: matchedEvent.isOnline ? "online" : "presencial",
      isFree: matchedEvent.isFree !== false,
      isExpired: false,
      dateOrDeadline: matchedEvent.date,
      dateBadge: matchedEvent.day && matchedEvent.month ? { day: matchedEvent.day, month: matchedEvent.month } : undefined,
      organizer: matchedEvent.organizer || "ADN Developer",
      organizerLogo: matchedEvent.organizerLogo,
      imageUrl: matchedEvent.imageUrl || "/images-events.webp",
      link: matchedEvent.link || "#",
      isExternalLink: Boolean(matchedEvent.link && matchedEvent.link.startsWith("http")),
      tags: matchedEvent.tags || ["Evento"],
      timeRange: matchedEvent.timeRange,
      state: matchedEvent.state,
    };
  }

  // b) Bolsas, Cursos, Bootcamps, Certificações, Estágios e Intercâmbio
  const allBolsas = [
    ...bolsas,
    ...intercambio,
    ...cursos,
    ...bootcamps,
    ...certificacoes,
    ...estagios,
  ];
  const matchedBolsa = allBolsas.find(
    (b) => b.id.toLowerCase() === cleanId || b.id.toLowerCase() === decodedId.toLowerCase()
  );
  if (matchedBolsa) {
    const category =
      matchedBolsa.category === "intercambio"
        ? "intercambio"
        : matchedBolsa.category === "Estágios"
          ? "estagios"
          : matchedBolsa.category === "cursos" ||
              matchedBolsa.category === "bootcamps" ||
              matchedBolsa.category === "certificações"
            ? "cursos"
            : "bolsas";
    const categoryLabel =
      matchedBolsa.category === "intercambio"
        ? "Intercâmbio & Voluntariado"
        : matchedBolsa.category === "cursos"
          ? "Curso Gratuito"
          : matchedBolsa.category === "bootcamps"
            ? "Bootcamp Gratuito"
            : matchedBolsa.category === "certificações"
              ? "Certificação Gratuita"
              : matchedBolsa.category === "Estágios"
                ? "Estágio & Mentoria"
                : "Bolsa de Estudo";
    return {
      id: `scholarship-${matchedBolsa.id}`,
      title: matchedBolsa.title,
      description: matchedBolsa.description,
      fullDescription: matchedBolsa.fullDescription || matchedBolsa.description,
      category,
      categoryLabel,
      country: matchedBolsa.country || "Internacional",
      location: matchedBolsa.country || "Exterior",
      format:
        category === "cursos" ||
        category === "estagios" ||
        matchedBolsa.description?.toLowerCase().includes("online")
          ? "online"
          : "presencial",
      isFree: true,
      isExpired: false,
      dateOrDeadline: matchedBolsa.deadline ? `Prazo: ${matchedBolsa.deadline}` : undefined,
      organizer: matchedBolsa.institution || "Programa Internacional",
      imageUrl: matchedBolsa.image || "/images-bolsas.webp",
      link: matchedBolsa.href || "#",
      isExternalLink: Boolean(matchedBolsa.href && matchedBolsa.href.startsWith("http")),
      tags: [categoryLabel, matchedBolsa.country || "Internacional"].filter(Boolean),
      institution: matchedBolsa.institution,
      degreeLevels: matchedBolsa.degreeLevels,
      funding: matchedBolsa.funding,
      benefits: matchedBolsa.benefits,
      requirements: matchedBolsa.requirements,
      deadline: matchedBolsa.deadline,
    };
  }

  // c) Comunidades
  const matchedComm = mockCommunities.find(
    (c) => c.id.toLowerCase() === cleanId || c.id.toLowerCase() === decodedId.toLowerCase()
  );
  if (matchedComm) {
    return {
      id: `community-${matchedComm.id}`,
      title: matchedComm.name,
      description: matchedComm.description,
      fullDescription: matchedComm.description,
      category: "comunidades",
      categoryLabel: "Comunidade Tech",
      country: matchedComm.country || "Angola",
      location: matchedComm.location,
      format: matchedComm.location?.toLowerCase().includes("online") ? "online" : "presencial",
      isFree: true,
      isExpired: false,
      organizer: matchedComm.type || "Comunidade",
      organizerLogo: matchedComm.logoUrl,
      imageUrl: matchedComm.logoUrl || "/images-community.jpg",
      link: matchedComm.link || "#",
      isExternalLink: Boolean(matchedComm.link && matchedComm.link.startsWith("http")),
      tags: matchedComm.tags || ["Comunidade"],
      membersCount: matchedComm.members,
    };
  }

  // 4. Consulta no Supabase para itens dinâmicos do banco (admin_events, admin_scholarships, admin_communities)
  if (isSupabaseConfigured()) {
    try {
      // Extrair o número de ID mesmo que haja múltiplos prefixos (ex.: "db-event-admin-event-1" -> 1)
      const numMatch = decodedId.match(/\d+/);
      const numId = numMatch ? parseInt(numMatch[0], 10) : null;

      if (numId !== null && !isNaN(numId)) {
        const lowerId = decodedId.toLowerCase();

        // Tentar tabela de bolsas se o identificador indicar bolsa
        if (lowerId.includes("scholarship") || lowerId.includes("bolsa")) {
          const { data: scholarship } = await supabaseAdmin
            .from("admin_scholarships")
            .select("id, title, description, country, level, deadline, link, image_url")
            .eq("id", numId)
            .maybeSingle();

          if (scholarship) {
            return {
              id: `admin-scholarship-${scholarship.id}`,
              title: scholarship.title,
              description: scholarship.description,
              fullDescription: scholarship.description,
              category: "bolsas",
              categoryLabel: scholarship.level || "Bolsa de Estudo",
              country: scholarship.country || "Internacional",
              location: scholarship.country || "Exterior",
              format: "presencial",
              isFree: true,
              isExpired: false,
              dateOrDeadline: scholarship.deadline ? `Prazo: ${scholarship.deadline}` : undefined,
              organizer: "ADN Oportunidades",
              imageUrl: scholarship.image_url || "/images-bolsas.webp",
              link: scholarship.link || "#",
              isExternalLink: Boolean(scholarship.link && scholarship.link.startsWith("http")),
              tags: ["Bolsa", scholarship.country || "Internacional"].filter(Boolean),
              deadline: scholarship.deadline || undefined,
            };
          }
        }

        // Tentar tabela de comunidades se o identificador indicar comunidade
        if (lowerId.includes("comm") || lowerId.includes("comunidade")) {
          const { data: comm } = await supabaseAdmin
            .from("admin_communities")
            .select("id, name, description, country, category, location, link, logo_url")
            .eq("id", numId)
            .maybeSingle();

          if (comm) {
            return {
              id: `admin-community-${comm.id}`,
              title: comm.name,
              description: comm.description,
              fullDescription: comm.description,
              category: "comunidades",
              categoryLabel: comm.category || "Comunidade Tech",
              country: comm.country || "Angola",
              location: comm.location || "Online",
              format: comm.location?.toLowerCase().includes("online") ? "online" : "presencial",
              isFree: true,
              isExpired: false,
              organizer: "Comunidade",
              organizerLogo: comm.logo_url || undefined,
              imageUrl: comm.logo_url || "/images-community.jpg",
              link: comm.link || "#",
              isExternalLink: Boolean(comm.link && comm.link.startsWith("http")),
              tags: ["Comunidade", comm.country || "Angola"].filter(Boolean),
            };
          }
        }

        // Tentar tabela de eventos (padrão)
        const { data: eventData } = await supabaseAdmin
          .from("admin_events")
          .select("id, title, description, date_label, location, country, category, organizer, link, image_url")
          .eq("id", numId)
          .maybeSingle();

        if (eventData) {
          return {
            id: `admin-event-${eventData.id}`,
            title: eventData.title,
            description: eventData.description,
            fullDescription: eventData.description,
            category: "eventos",
            categoryLabel: eventData.category || "Evento",
            country: eventData.country || "Angola",
            location: eventData.location || "Online",
            format: eventData.location?.toLowerCase().includes("online") ? "online" : "presencial",
            isFree: true,
            isExpired: false,
            dateOrDeadline: eventData.date_label || "A anunciar",
            organizer: eventData.organizer || "Comunidade Tech",
            imageUrl: eventData.image_url || "/images-events.webp",
            link: eventData.link || "#",
            isExternalLink: Boolean(eventData.link && eventData.link.startsWith("http")),
            tags: ["Evento", eventData.country || "Angola"].filter(Boolean),
          };
        }

        // Fallback: se não encontrou em eventos, tentar bolsas e comunidades sem filtro de nome
        const [fallbackScholarship, fallbackComm] = await Promise.all([
          supabaseAdmin
            .from("admin_scholarships")
            .select("id, title, description, country, level, deadline, link, image_url")
            .eq("id", numId)
            .maybeSingle(),
          supabaseAdmin
            .from("admin_communities")
            .select("id, name, description, country, category, location, link, logo_url")
            .eq("id", numId)
            .maybeSingle(),
        ]);

        if (fallbackScholarship.data) {
          const s = fallbackScholarship.data;
          return {
            id: `admin-scholarship-${s.id}`,
            title: s.title,
            description: s.description,
            fullDescription: s.description,
            category: "bolsas",
            categoryLabel: s.level || "Bolsa de Estudo",
            country: s.country || "Internacional",
            location: s.country || "Exterior",
            format: "presencial",
            isFree: true,
            isExpired: false,
            dateOrDeadline: s.deadline ? `Prazo: ${s.deadline}` : undefined,
            organizer: "ADN Oportunidades",
            imageUrl: s.image_url || "/images-bolsas.webp",
            link: s.link || "#",
            isExternalLink: Boolean(s.link && s.link.startsWith("http")),
            tags: ["Bolsa", s.country || "Internacional"].filter(Boolean),
          };
        }

        if (fallbackComm.data) {
          const c = fallbackComm.data;
          return {
            id: `admin-community-${c.id}`,
            title: c.name,
            description: c.description,
            fullDescription: c.description,
            category: "comunidades",
            categoryLabel: c.category || "Comunidade Tech",
            country: c.country || "Angola",
            location: c.location || "Online",
            format: c.location?.toLowerCase().includes("online") ? "online" : "presencial",
            isFree: true,
            isExpired: false,
            organizer: "Comunidade",
            organizerLogo: c.logo_url || undefined,
            imageUrl: c.logo_url || "/images-community.jpg",
            link: c.link || "#",
            isExternalLink: Boolean(c.link && c.link.startsWith("http")),
            tags: ["Comunidade", c.country || "Angola"].filter(Boolean),
          };
        }
      }
    } catch {
      // Ignorar erros de rede/banco com segurança
    }
  }

  return null;
}

export async function getAllOpportunityIds(): Promise<{ id: string }[]> {
  const items = getAllDiscoveryItems();
  return items.map((it) => ({ id: it.id }));
}
