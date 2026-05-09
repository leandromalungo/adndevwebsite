import Navbar from "@/components/auth/Navbar";
import ProfileSidebar from "@/components/auth/profile/ProfileSidebar";
import ProfileContent from "@/components/auth/profile/ProfileContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProfileData } from "@/lib/server-only/profile-cache";
import { ensureUserShareToken } from "@/app/actions/profile.actions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const userId = session.user.id;
  
  // Garantir que o utilizador tem um token de compartilhamento
  // Isto cria automaticamente um token para utilizadores antigos que não o têm
  await ensureUserShareToken(userId);
  
  const initialData = await getProfileData(userId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:sticky md:top-24 md:self-start">
            <ProfileSidebar initialData={initialData} userId={userId} />
          </div>
          <ProfileContent initialData={initialData} userId={userId} />
        </div>
      </main>
    </div>
  );
}
