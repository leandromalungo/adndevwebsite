/* import { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_BASE_URL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!PAYPAL_CLIENT_ID || !PAYPAL_APP_SECRET) {
      return Response.json(
        { error: 'PayPal credentials not configured' },
        { status: 500 }
      );
    }

    // Gerar token de acesso do PayPal
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString('base64');
    
    const tokenResponse = await fetch(`${PAYPAL_API_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error('PayPal token error:', tokenData);
      return Response.json(
        { error: 'Failed to get PayPal access token' },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    // Criar pedido no PayPal
    const orderResponse = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '10.00',
            },
            description: 'Pagamento de inscrição',
          },
        ],
        payer: {
          email_address: email,
        },
      }),
    });

    const order = await orderResponse.json();

    if (!order.id) {
      console.error('PayPal order error:', order);
      throw new Error('Falha ao criar pedido no PayPal');
    }

    return Response.json({ id: order.id });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return Response.json(
      { error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}
 */