import Link from "next/link";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Compass } from "lucide-react";

export default function OpportunityNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 mx-auto flex items-center justify-center mb-5 shadow-xs">
            <Compass className="w-8 h-8 text-violet-700" />
          </div>

          <span className="text-xs font-bold text-violet-700 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
            Erro 404
          </span>

          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3 mb-2">
            Oportunidade não encontrada
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            A oportunidade que procura pode ter sido encerrada, removida ou o link pode estar incorreto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-xs transition"
            >
              <Search className="w-4 h-4" />
              <span>Explorar Oportunidades</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Página Inicial</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
