import type { Metadata } from "next";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { FavoritesView } from "@/components/favorites/FavoritesView";

export const metadata: Metadata = {
  title: "Os Meus Favoritos | ADN Developer",
  description:
    "Aceda aos seus eventos, bolsas de estudo e oportunidades guardados como favoritos no ecossistema tech da lusofonia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-gray-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 pb-16">
        <FavoritesView />
      </main>
      <Footer />
    </div>
  );
}
