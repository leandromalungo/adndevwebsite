"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 scale-150 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
              <CheckCircle className="text-green-600 w-12 h-12" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Obrigado pela Confiança!</h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Sua intenção de assinatura foi registrada com sucesso.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Próximos Passos</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                Finalize o pagamento caso tenha escolhido Referência.
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                Aguarde alguns minutos para a ativação do sistema.
              </li>
              <li className="flex gap-2">
                <span className="w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                Acesse seu conteúdo premium no painel.
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="group w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition shadow-xl flex items-center justify-center gap-2"
          >
            Ir para o Início
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
