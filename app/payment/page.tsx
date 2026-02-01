'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import  {  PayPalScriptProvider ,  PayPalButtons, usePayPalScriptReducer  }  from  "@paypal/react-paypal-js" ;
import { PAYPAL_CLIENT_ID } from '@/lib/constants';


const PaypalLoadingSpinner = () => {
    const [ { isPending, isRejected} ] = usePayPalScriptReducer();
    if(isPending)
     return <div className="spinner" />;
    if(isRejected)
     return <div>Error loading PayPal script</div>;
    return null;
};

const PaymentPaypal = () => {

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

    // Função que chama a API para criar a ordem
    //O valor do pagamento está fixo em 10.00
  const createOrder = async () => {
    const res = await fetch("/api/create-order", { method: "POST" ,
      body: JSON.stringify({ amount: 4.00 }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data.id; // retorna o orderID
  };

  // Função que chama a API para capturar a ordem
  const onApprove = async (data: { orderID: string }) => {
    const res = await fetch("/api/capture-order", {
      method: "POST",
      body: JSON.stringify({ orderID: data.orderID }),
      headers: { "Content-Type": "application/json" },
    });
    const captureData = await res.json();
    console.log("Pagamento capturado:", captureData);
    // Aqui podes redirecionar ou mostrar confirmação
    
  };


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


