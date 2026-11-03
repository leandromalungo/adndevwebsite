import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { NotificationsView } from "@/components/notifications/NotificationsView";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Notificações & Preferências | ADN Developer",
  description:
    "Gere os seus alertas e personalize as categorias de conteúdo que deseja acompanhar no ecossistema tech lusófono.",
  robots: {
    index: false,
    follow: false,
  },
};

function NotificationsFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-violet-700 animate-spin mb-3" />
      <p className="text-xs text-gray-500 font-medium">A carregar notificações e preferências...</p>
    </div>
  );
}

export default function NotificacoesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-gray-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 pb-16">
        <Suspense fallback={<NotificationsFallback />}>
          <NotificationsView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
