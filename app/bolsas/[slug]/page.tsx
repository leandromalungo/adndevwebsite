import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";
import ScholarshipDetails from "@/components/bolsas/ScholarshipDetails";
import { authOptions } from "@/lib/auth";
import { bolsas } from "@/data/bolsas";
import type { ScholarshipItem } from "@/data/types";

interface ScholarshipDetailPageProps {
  params: {
    slug: string;
  };
}

async function getScholarshipData(id: string): Promise<ScholarshipItem | null> {
  // 1. Procurar no array estático
  const staticScholarship = bolsas.find((item) => item.id === id);
  if (staticScholarship) return staticScholarship;

  // 2. Procurar na API (dados do banco de dados)
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/public/scholarships`, {
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = await res.json();
    const scholarships = Array.isArray(data?.scholarships) ? data.scholarships : [];
    return scholarships.find((item: ScholarshipItem) => item.id === id) || null;
  } catch {
    return null;
  }
}

export default async function ScholarshipDetailPage({ params }: ScholarshipDetailPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/?auth=login");
  }

  const scholarship = await getScholarshipData(params.slug);
  if (!scholarship) {
    notFound();
  }

  // Verifica se a bolsa está expirada
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let isExpired = false;
  if (scholarship.deadline) {
    let targetDate;
    const ymdMatch = scholarship.deadline.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const dmyMatch = scholarship.deadline.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ymdMatch) {
      const [, year, month, day] = ymdMatch.map(Number);
      targetDate = new Date(year, month - 1, day);
    } else if (dmyMatch) {
      const [, day, month, year] = dmyMatch.map(Number);
      targetDate = new Date(year, month - 1, day);
    } else {
      targetDate = new Date(scholarship.deadline);
    }
    if (!isNaN(targetDate.getTime())) {
      targetDate.setHours(0, 0, 0, 0);
      isExpired = targetDate.getTime() < today.getTime();
    }
  }
  if (isExpired) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ScholarshipDetails item={scholarship} />
      </main>
      <Footer />
    </>
  );
}
