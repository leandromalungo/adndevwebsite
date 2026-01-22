/* import { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_BASE_URL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

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

    // Capturar o pedido no PayPal
    const captureResponse = await fetch(
      `${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await captureResponse.json();

    if (result.status === 'COMPLETED') {
      return Response.json({ 
        success: true, 
        message: 'Pagamento realizado com sucesso',
        data: result 
      });
    } else {
      console.error('PayPal capture error:', result);
      return Response.json(
        { error: 'Pagamento não foi concluído' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Erro ao capturar pedido:', error);
    return Response.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
 */