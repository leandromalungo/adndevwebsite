import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { DiscoveryHub } from "@/components/discovery/DiscoveryHub";
import { CardGridSkeleton } from "@/components/cards/CardSkeleton";

export const metadata: Metadata = {
  title: "ADN Developer | Centro de Descoberta Tecnológica Lusófona",
  description:
    "Descubra eventos, hackathons, bolsas de estudo, cursos gratuitos, comunidades e oportunidades tecnológicas em Angola, Portugal, Brasil e no mundo lusófono.",
  openGraph: {
    title: "ADN Developer | Centro de Descoberta Tecnológica Lusófona",
    description:
      "Descubra eventos, hackathons, bolsas de estudo, cursos gratuitos e comunidades tech no ecossistema lusófono.",
    url: "https://adndeveloper.com",
    siteName: "ADN Developer",
    locale: "pt_BR",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] selection:bg-violet-200">
      <Navbar />
      <div className="flex-1 w-full">
        <Suspense
          fallback={
            <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-44 w-full animate-pulse bg-gray-200 rounded-2xl mb-8" />
              <CardGridSkeleton count={8} />
            </div>
          }
        >
          <DiscoveryHub />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
