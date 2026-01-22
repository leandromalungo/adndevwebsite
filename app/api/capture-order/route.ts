import { PAYPAL_API_BASE_URL, PAYPAL_APP_SECRET, PAYPAL_CLIENT_ID } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { orderID } = await req.json();
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
  });

  const captureData = await res.json();

  return NextResponse.json(captureData);
}
