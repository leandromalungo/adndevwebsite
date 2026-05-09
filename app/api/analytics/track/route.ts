import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { trackEvent } from "@/lib/analytics";

const TrackSchema = z.object({
  eventType: z.enum(["page_view"]),
  route: z.string().max(200),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = TrackSchema.parse(body);
    const session = await getServerSession(authOptions);

    await trackEvent({
      eventType: parsed.eventType,
      route: parsed.route,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
