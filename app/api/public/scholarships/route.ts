import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type AdminScholarshipRow = {
  id: number;
  title: string;
  description: string;
  country: string | null;
  level: string | null;
  deadline: string | null;
  link: string;
  image_url: string | null;
};

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from("admin_scholarships")
      .select("id, title, description, country, level, deadline, link, image_url")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    const cards = ((data as AdminScholarshipRow[] | null) ?? []).map((row) => ({
      id: `admin-scholarship-${row.id}`,
      image: row.image_url || "/images-bolsas.webp",
      title: row.title,
      description: `${row.description}${row.country ? ` Pais: ${row.country}.` : ""}${row.level ? ` Nivel: ${row.level}.` : ""}${row.deadline ? ` Prazo: ${row.deadline}.` : ""}`,
      href: row.link,
      buttonLabel: "Inscrever",
    }));

    return NextResponse.json({ scholarships: cards });
  } catch {
    return NextResponse.json({ scholarships: [] });
  }
}
