import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Community } from "@/data/types";

const ALLOWED_COUNTRIES = new Set([
  "Angola",
  "Brasil",
  "Moçambique",
  "Portugal",
  "São Tomé e Príncipe",
  "Guiné-Bissau",
  "Cabo Verde",
  "Timor-Leste",
]);

type AdminCommunityRow = {
  id: number;
  name: string;
  description: string;
  country: string;
  category: string | null;
  location: string | null;
  link: string | null;
  logo_url: string | null;
};

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("admin_communities")
      .select("id, name, description, country, category, location, link, logo_url")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const mapped: Community[] = ((data as AdminCommunityRow[] | null) ?? []).map((row) => ({
      id: `admin-community-${row.id}`,
      name: row.name,
      location: row.location || "Online",
      country: ALLOWED_COUNTRIES.has(row.country) ? (row.country as Community["country"]) : "Angola",
      description: row.description,
      members: 0,
      type: "Comunidade",
      category: row.category || "Comunidade Dev",
      tags: [row.category || "Comunidade"],
      link: row.link || "#",
      logoUrl: row.logo_url || "/logoNavbar.png",
      imageSource: "ADN Admin",
    }));

    return NextResponse.json({ communities: mapped });
  } catch {
    return NextResponse.json({ communities: [] });
  }
}
