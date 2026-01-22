import { PAYPAL_API_BASE_URL, PAYPAL_APP_SECRET, PAYPAL_CLIENT_ID } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString("base64");

  try {
    const res = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro ao criar ordem PayPal:", text);
      return NextResponse.json({ error: text }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Erro no create-order:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
