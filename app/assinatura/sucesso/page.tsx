"use client";

import Link from "next/link";

const SuccessPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Obrigado pela sua assinatura!</h2>
        <p className="text-gray-600 mb-4">Recebemos a sua informação e estamos a analizando, receberá uma mensagem de confirmação por e-mail.</p>

        <Link href="/" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Voltar ao início</Link>
      </div>
    </main>
  );
};

export default SuccessPage;
