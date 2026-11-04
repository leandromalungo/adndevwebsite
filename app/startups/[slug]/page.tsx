import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStartupBySlug } from "@/lib/startup-service";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import { StartupDetailClient } from "./StartupDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStartupBySlug(slug, null);

  if (!data?.startup) {
    return {
      title: "Startup não encontrada | ADN Developer",
      description: "A startup solicitada não foi encontrada no diretório lusófono.",
    };
  }

  const { startup } = data;
  return {
    title: `${startup.name} – ${startup.tagline} | Startups Lusófonas`,
    description: startup.description.slice(0, 160),
    openGraph: {
      title: `${startup.name} – Startups Lusófonas`,
      description: startup.tagline,
      url: `https://adndeveloper.com/startups/${startup.slug}`,
      siteName: "ADN Developer",
      type: "website",
      images: startup.cover_url || startup.logo_url ? [startup.cover_url || startup.logo_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${startup.name} | ADN Developer`,
      description: startup.tagline,
    },
  };
}

export default async function StartupDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || (session?.user as any)?.email || null;

  const data = await getStartupBySlug(slug, userId);
  if (!data) {
    notFound();
  }

  const { startup } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: startup.name,
    description: startup.description,
    url: startup.website_url || `https://adndeveloper.com/startups/${startup.slug}`,
    logo: startup.logo_url,
    foundingDate: String(startup.founded_year),
    address: {
      "@type": "PostalAddress",
      addressCountry: startup.country_code,
    },
    founders: startup.founders.map((f) => ({
      "@type": "Person",
      name: f.name,
      jobTitle: f.role,
    })),
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="pt-[57px] flex-1">
        <StartupDetailClient
          initialData={data}
          isLoggedIn={Boolean(session?.user)}
          currentUser={session?.user}
        />
      </div>

      <Footer />
    </div>
  );
}
