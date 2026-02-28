"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-xl text-center border border-red-100">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-2">Ops! algo correu mal.</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Ocorreu um erro inesperado na aplicação. 
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <RefreshCcw className="w-4 h-4" />
            Tentar Novamente
          </button>
          
          <a
            href="/"
            className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </a>
        </div>
      
      </div>
    </div>
  );
}
