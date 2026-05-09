import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Event } from "@/data/types";

type AdminEventRow = {
  id: number;
  title: string;
  description: string;
  date_label: string | null;
  location: string | null;
  country: string;
  category: string | null;
  organizer: string | null;
  link: string | null;
  image_url: string | null;
};

function parseDateLabel(dateLabel: string | null): { day: string; month: string } {
  if (!dateLabel) return { day: "--", month: "Nov" };
  try {
    const date = new Date(dateLabel);
    if (isNaN(date.getTime())) return { day: "--", month: "Nov" };
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("pt-PT", { month: "short" }).toUpperCase();
    return { day, month };
  } catch {
    return { day: "--", month: "Nov" };
  }
}

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("admin_events")
      .select("id, title, description, date_label, location, country, category, organizer, link, image_url")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const mapped: Event[] = ((data as AdminEventRow[] | null) ?? []).map((row) => {
      const { day, month } = parseDateLabel(row.date_label);
      return {
        id: `admin-event-${row.id}`,
        title: row.title,
        description: row.description,
        date: row.date_label || "Data a anunciar",
        timeRange: "Horario a anunciar",
        location: row.location || "Local a anunciar",
        country: row.country,
        state: row.location || "Online",
        category: row.category || "Evento",
        organizer: row.organizer || "Organizador",
        organizerLogo: "/logoNavbar.png",
        imageUrl: row.image_url || "/images-events.webp",
        isOnline: false,
        isFree: true,
        tags: [row.category || "Evento"],
        day,
        month,
        link: row.link || "#",
      };
    });

    return NextResponse.json({ events: mapped });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
