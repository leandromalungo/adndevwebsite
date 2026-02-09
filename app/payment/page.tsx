'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import  {  PayPalScriptProvider ,  PayPalButtons, usePayPalScriptReducer  }  from  "@paypal/react-paypal-js" ;
import { PAYPAL_CLIENT_ID } from '@/lib/constants';
import { useClientStore } from '@/app/database/ClientRepository';
import { ClientType } from '@/lib/clientType';


const PaypalLoadingSpinner = () => {
    const [ { isPending, isRejected} ] = usePayPalScriptReducer();
    if(isPending)
     return <div className="spinner" />;
    if(isRejected)
     return <div>Error loading PayPal script</div>;
    return null;
};

const PaymentPaypal = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [clienteData, setClienteData] = useState<ClientType | null>(null);
  const [loading, setLoading] = useState(false);
  const createClient = useClientStore((state) => state.createNewClient);

  // Recuperar dados do cliente do sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("clienteData");
    if (saved) {
      setClienteData(JSON.parse(saved));
    } else {
      router.push("/subscribe");
    }
  }, [router]);

  // Função que chama a API para criar a ordem
  const createOrder = async () => {
    const res = await fetch("/api/create-order", { method: "POST" ,
      body: JSON.stringify({ amount: 2.00 }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.id; // retorna o orderID
  };

  // Função que chama a API para capturar a ordem
  const onApprove = async (data: { orderID: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/capture-order", {
        method: "POST",
        body: JSON.stringify({ orderID: data.orderID }),
        headers: { "Content-Type": "application/json" },
      });
      const captureData = await res.json();
      console.log("Pagamento capturado:", captureData);
      
      // Criar cliente após pagamento bem-sucedido
      if (clienteData) {
        const formData = { 
          ...clienteData, 
          createdAt: new Date(),
          updatedAt: new Date(),
          comprovativePaypal: captureData,
        };
        await createClient(formData);
        
        // Limpar dados do sessionStorage
        sessionStorage.removeItem("clienteData");
        
        // Redirecionar para página de sucesso
        router.push("/assinatura/sucesso");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar o pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const onError = (err: any) => {
    console.error("Erro no PayPal:", err);
    alert("Ocorreu um erro no pagamento. Tente novamente.");
  };

  if (!clienteData) {
    return (
      <>
        <Navbar />
        <section className="relative w-full h-screen overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
          <div className="relative h-full z-10 flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="text-white">Carregando...</div>
          </div>
        </section>
        <Footer/>
      </>
    );
  }

  return (
  <>
    <Navbar />

    <section className="relative w-full h-screen overflow-hidden bg-zinc-900">
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
    <div className="relative h-full z-10 flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Fazer Pagamento Via Paypal</h2>
    </div>
      {/*Button Payment */}
     { paymentMethod === "Paypal" && (
      <div className="mt-6">
        <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
            <PaypalLoadingSpinner />
            <PayPalButtons 
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              disabled={loading}
            />
        </PayPalScriptProvider>
    </div>
  )} 
    </div>
    </section>
    <Footer/>
  </>
  );
};

export default PaymentPaypal;


