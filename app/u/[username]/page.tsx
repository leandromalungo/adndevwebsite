import Navbar from "@/components/auth/Navbar";
import ProfileSidebar from "@/components/auth/profile/ProfileSidebar";
import ProfileContent from "@/components/auth/profile/ProfileContent";
import { getProfileByUsername } from "@/lib/server-only/profile-cache";
import { notFound } from "next/navigation";

interface PublicProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

/**
 * Perfil público por URL (/u/[username]): sempre só leitura.
 * Edição fica apenas em /profile (autenticado). Assim o link partilhado
 * nunca expõe UI de edição, mesmo para o dono do perfil.
 */
export default async function PublicProfilePage(props: PublicProfilePageProps) {
  const params = await props.params;
  const { username } = params;

  const initialData = await getProfileByUsername(username);

  if (!initialData) {
    notFound();
  }

  const profileOwnerId = initialData.profile.user_id;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:sticky md:top-24 md:self-start">
            <ProfileSidebar initialData={initialData} userId={profileOwnerId} isReadOnly />
          </div>
          <ProfileContent initialData={initialData} userId={profileOwnerId} isReadOnly />
        </div>
      </main>
    </div>
  );
}
