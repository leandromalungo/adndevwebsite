import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Community } from "@/data/types";

export const dynamic = "force-dynamic";

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
  noStore();

  const isConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!isConfigured) {
    return NextResponse.json(
      {
        communities: [],
        error: "As variáveis do Supabase não estão configuradas. Defina NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 }
    );
  }

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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado ao carregar comunidades";
    return NextResponse.json({ communities: [], error: message }, { status: 500 });
  }
}
