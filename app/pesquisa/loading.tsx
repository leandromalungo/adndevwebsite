import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";

export default function PesquisaLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />

      <main className="flex-1 w-full pt-16 sm:pt-20">
        <div className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
            <div className="h-9 w-72 bg-gray-200 rounded-xl" />
            <div className="h-4 w-96 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CardGridSkeleton count={8} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
