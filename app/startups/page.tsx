import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStartupFeed } from "@/lib/startup-service";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { StartupFeed } from "@/components/startups/StartupFeed";

export const metadata: Metadata = {
  title: "Startups Lusófonas – Diretório & Comunidade de Inovação da CPLP",
  description:
    "Descubra as startups mais inovadoras de Angola, Brasil, Portugal, Moçambique e toda a lusofonia estilo Product Hunt. Conecte-se com fundadores e apoie o ecossistema.",
  openGraph: {
    title: "Startups Lusófonas – Diretório de Inovação",
    description:
      "Descubra as startups mais inovadoras de Angola, Brasil, Portugal, Moçambique e toda a lusofonia. Siga novidades e comente com os fundadores.",
    url: "https://adndeveloper.com/startups",
    siteName: "ADN Developer",
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startups Lusófonas – ADN Developer",
    description: "Conheça as startups de tecnologia e inovação em destaque na lusofonia.",
  },
};

export default async function StartupsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || (session?.user as any)?.email || null;
  const initialData = await getStartupFeed({ userId });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Startups Lusófonas",
    description:
      "Diretório e comunidade de startups e inovação nos países de língua portuguesa.",
    url: "https://adndeveloper.com/startups",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: initialData.items.map((startup, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Organization",
          name: startup.name,
          description: startup.tagline,
          url: startup.website_url || `https://adndeveloper.com/startups/${startup.slug}`,
          foundingDate: String(startup.founded_year),
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="pt-[57px] flex-1">
        <StartupFeed
          initialData={initialData}
          isLoggedIn={Boolean(session?.user)}
          currentUser={session?.user}
        />
      </div>

      <Footer />
    </div>
  );
}
