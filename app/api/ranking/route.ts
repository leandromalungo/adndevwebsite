import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCommunityRanking } from "@/lib/ranking-service";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || (session?.user as any)?.email || null;

    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("categoria") || "todos";
    const countryCode = searchParams.get("pais") || "ALL";
    const searchQuery = searchParams.get("q") || "";
    const period = (searchParams.get("periodo") as "all" | "month" | "week" | "today") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "30", 10);

    const result = await getCommunityRanking({
      categorySlug,
      countryCode,
      searchQuery,
      period,
      page,
      limit,
      userId,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    console.error("Erro ao obter ranking de tecnologias:", error);
    return NextResponse.json(
      { error: "Erro interno ao carregar o ranking de tecnologias." },
      { status: 500 }
    );
  }
}
