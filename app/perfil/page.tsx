 "use client";

/**
 * Perfil Page
 * 
 * FRONTEND: Apenas exibe dados da sessão.
 * BACKEND (NextAuth): Gerencia autenticação e sessão.
 * 
 * Mostra informações do usuário e status da assinatura.
 */

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { Loader2, CreditCard, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

import { Suspense } from "react";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // BACKEND: NextAuth gerencia sessão - frontend apenas lê
  const { data: session, status } = useSession();
  
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [portalError, setPortalError] = useState("");

  useEffect(() => {
    if (searchParams.get("success") === "true") {
        setShowSuccess(true);
        // Limpar URL após 5 segundos
        setTimeout(() => setShowSuccess(false), 5000);
    }

    // BACKEND: Verifica autenticação via NextAuth
    if (status === "loading") {
      return; // Aguarda carregamento da sessão
    }

    if (status === "unauthenticated") {
      // Não autenticado - redireciona
      router.push("/?login=true");
      return;
    }

    if (!session?.user?.id) {
      return;
    }

    // Buscar assinatura em tempo real
    const q = query(
      collection(db!, "subscriptions"), 
      where("userId", "==", session.user.id)
    );
    
    const unsubSub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Prioriza ativa, depois pending, depois qualquer outra
        const subs = snapshot.docs.map(d => d.data());
        const active = subs.find(s => s.status === "active");
        const pending = subs.find(s => s.status === "pending");
        setSubscription(active || pending || subs[0]);
      }
      setLoading(false);
    });

    return () => unsubSub();
  }, [router, searchParams, session, status]);

  /**
   * FRONTEND: Apenas chama API do portal.
   * BACKEND: Valida sessão e cria portal session.
   */
  const handlePortal = async () => {
    setPortalLoading(true);
    setPortalError(""); // Clear previous errors
    try {
      // BACKEND: NextAuth valida sessão automaticamente
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Generic error - never show API error message
        setPortalError("Não foi possível abrir o portal. Tente novamente.");
      }
    } catch (error) {
      // Generic error - no details exposed
      setPortalError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
            
            {showSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-green-800">Pagamento Confirmado!</h3>
                        <p className="text-sm text-green-700">Sua assinatura foi ativada com sucesso. Aproveite todos os benefícios.</p>
                    </div>
                </div>
            )}

            {/* Error Notification */}
            {portalError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4 animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-red-800">Erro</h3>
                        <p className="text-sm text-red-700">{portalError}</p>
                    </div>
                    <button 
                        onClick={() => setPortalError("")}
                        className="text-red-400 hover:text-red-600 transition"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
                    <p className="text-gray-500">{session?.user?.email}</p>
                </div>
                <div className="text-xs px-3 py-1 bg-gray-100 rounded-full font-mono text-gray-500 truncate max-w-[200px]">
                    UID: {session?.user?.id}
                </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    Assinatura ADN Premium
                </h2>

                {!subscription ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Seja Premium</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Tenha acesso ilimitado a cursos, mentorias e eventos exclusivos da comunidade.
                        </p>
                        <button 
                            onClick={() => router.push("/assinatura")}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                        >
                            Assinar Agora
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50/50">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${subscription.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {subscription.status === 'active' ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status da Assinatura</p>
                                <p className={`text-2xl font-black ${subscription.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {subscription.status === 'active' ? 'ATIVA' : subscription.status.toUpperCase()}
                                </p>
                                {subscription.status === 'pending' && (
                                    <p className="text-sm text-gray-500 mt-1">Aguardando confirmação do pagamento...</p>
                                )}
                            </div>
                            {subscription.status !== 'active' && subscription.status !== 'pending' && (
                                <button 
                                    onClick={() => router.push("/assinatura")}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                                >
                                    Reativar
                                </button>
                            )}
                        </div>

                        {subscription.status === 'active' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Plano Atual</p>
                                    <p className="font-bold text-lg text-gray-900 capitalize">{subscription.plan || "Premium"}</p>
                                </div>
                                <div className="p-5 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Próxima Cobrança</p>
                                    <p className="font-bold text-lg text-gray-900">
                                        {subscription.currentPeriodEnd 
                                            ? new Date(subscription.currentPeriodEnd).toLocaleDateString() 
                                            : "Gerenciado pelo Stripe"}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="font-bold text-gray-900">Gerenciamento de Cobrança</h4>
                                <p className="text-sm text-gray-500">Atualize seu cartão ou cancele a qualquer momento.</p>
                            </div>
                            <button
                                onClick={handlePortal}
                                disabled={portalLoading}
                                className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
                            >
                                {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Abrir Portal Stripe"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </main>
    </>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>}>
      <ProfileContent />
    </Suspense>
  );
}
