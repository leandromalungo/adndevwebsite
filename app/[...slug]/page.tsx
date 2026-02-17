import { notFound, redirect } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function CatchAllPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const fullPath = params.slug.join("/");
  
  let routeDoc;
  
  try {
    // 1. Validar no Firestore se este "slug" existe como uma rota dinâmica autorizada
    const routeRef = adminDb.collection("dynamic_routes").doc(fullPath.replace(/\//g, "_"));
    routeDoc = await routeRef.get();
  } catch (error) {
    console.error("[INTERNAL] Catch-all Validation Error:", error);
    // Em caso de erro técnico, não vaza detalhes, apenas dá 404 ou erro genérico
    return notFound();
  }

  if (!routeDoc.exists) {
    // Se não existir, retorna 404 padrão (fora do try/catch para evitar log de erro interno)
    return notFound();
  }

  const routeData = routeDoc.data();

  // 2. Verificação de Permissão / Autorização
  if (routeData?.isPrivate) {
    redirect("/#login");
  }

  // 3. Renderização Segura
  if (routeData?.externalUrl) {
    redirect(routeData.externalUrl);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{routeData?.title || "Recurso Encontrado"}</h1>
        <div className="prose lg:prose-xl">
           <p>{routeData?.description || "Este conteúdo foi validado pelo backend de forma segura."}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
