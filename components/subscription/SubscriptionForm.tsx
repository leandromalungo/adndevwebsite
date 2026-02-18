"use client";

/**
 * Subscription Checkout Form.
 * 
 * FRONTEND: Apenas envia dados para o backend - SEM validação de autenticação.
 * BACKEND: Valida dados, cria usuário e gerencia autenticação via NextAuth.
 * 
 * Suporta múltiplos métodos de pagamento baseados em geolocalização.
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sanitizeText, sanitizeEmail, isSafeString } from "@/lib/security";
import { db } from "@/lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { signIn, getSession } from "next-auth/react";
import { Landmark, CreditCard, Loader2, Eye, EyeOff } from "lucide-react";

type PaymentMethod = "paypal" | "transfer";

interface ReferenceData {
  entityNumber: string;
  referenceNumber: string;
  amount: number;
}

/**
 * Subscription Checkout Form.
 * 
 * FRONTEND: Apenas coleta dados e envia para backend.
 * BACKEND: Cria usuário, autentica e processa pagamento.
 * 
 * @component
 */
const SubscriptionForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Angola");
  const [telegramError, setTelegramError] = useState("");
  const [formError, setFormError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [alerts, setAlerts] = useState<string[]>([]);
  // Maps UI selection to internal payment provider logic
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");

  const [loading, setLoading] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const [refData, setRefData] = useState<ReferenceData | null>(null);
  const [subId, setSubId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending");

  // Tempo de escuta de atualização de estados
  useEffect(() => {
    if (!subId || !db) return;

    const unsub = onSnapshot(doc(db, "subscriptions", subId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.status === "active") {
          setStatus("active");
          // Auto-close modal on success
          if (showRefModal) {
            setTimeout(() => {
              setShowRefModal(false);
              router.push("/perfil?success=true");
            }, 2000);
          }
        }
      }
    });

    return () => unsub();
  }, [subId, db, showRefModal, router]);

  // Geo-location based payment method pre-selection
  useEffect(() => {
    if (country === "Angola") {
      setPaymentMethod("transfer");
    } else {
      setPaymentMethod("paypal");
    }
  }, [country]);

  const toggleAlert = (value: string) => {
    setAlerts((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value],
    );
  };

  const showError = (msg: string) => {
    setFormError(msg);
    setTimeout(() => setFormError(""), 3000);
  };

  /**
   * Validates form inputs before submission.
   * Checks for empty fields, secure string content, email format, and password strength.
   *
   * @returns {boolean} True if validation passes, false otherwise.
   */
  const validate = () => {
    // Basic fields check
    if (!name.trim() || !email.trim()) {
      showError("Preencha todos os campos obrigatórios.");
      return false;
    }

    // Security validation - Detects XSS/Injection attempts
    if ((name && !isSafeString(name)) || (telegram && !isSafeString(telegram))) {
      showError("Conteúdo inválido detectado nos campos.");
      return false;
    }

    // Telegram handle validation
    if (telegram.trim() && !telegram.startsWith("@")) {
      setTelegramError("O contacto deve começar com @ (Ex: @seuusuario)");
      setTimeout(() => setTelegramError(""), 3000);
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Por favor, insira um email válido.");
      return false;
    }

    if (password.length < 8) {
      showError("A senha deve ter no mínimo 8 caracteres.");
      return false;
    }

    if (password !== confirmPassword) {
      showError("As senhas não coincidem.");
      return false;
    }

    if (alerts.length === 0) {
      showError("Selecione pelo menos um tipo de alerta.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Sanitize inputs (frontend básico - backend valida tudo)
      const sName = sanitizeText(name);
      const sTelegram = sanitizeText(telegram);
      const sEmail = sanitizeEmail(email);

      if (!sEmail) {
        throw new Error("Email inválido.");
      }

      // STEP 1: Try to create user via Cloud Functions
      try {
        const { signupUser } = await import("@/lib/cloud-functions-client");
        await signupUser(sEmail, password, sName);
      } catch (signupError: any) {
        // User might already exist - this is okay, we'll try to login
        if (!signupError.message?.includes("already exists") && !signupError.message?.includes("já cadastrado")) {
          throw signupError;
        }
      }

      // STEP 2: Login via NextAuth to create session
      const loginResult = await signIn("credentials", {
        email: sEmail,
        password: password,
        redirect: false,
      });

      if (loginResult?.error) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      }

      // STEP 3: Get current session
      const session = await getSession();
      if (!session?.user) {
        throw new Error("Sessão não criada. Tente novamente.");
      }

      // Prepare payload for payment
      const payload = {
        name: sName,
        telegram: sTelegram,
        email: sEmail,
        country,
        alerts,
        plan: "premium"
      };

      // STEP 4: Process payment
      if (paymentMethod === "paypal") {
        // Stripe Logic - Call Cloud Function
        try {
          const { createCheckoutSession } = await import("@/lib/cloud-functions-client");
          const response = await createCheckoutSession("price_monthly", "monthly");
          
          if (response?.url) {
            setSubId(response.sessionId);
            window.location.href = response.url;
          } else {
            throw new Error("Não foi possível iniciar o checkout.");
          }
        } catch (error: any) {
          if (error.message?.includes("429")) {
            throw new Error("Muitas tentativas. Aguarde.");
          }
          throw error;
        }
      } else {
        // Reference payment method
        const res = await fetch("/api/create-ref", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.status === 404) throw new Error("Integração Multicaixa indisponível no momento.");
        if (res.status === 429) throw new Error(data.message || "Muitas tentativas. Aguarde.");

        if (data.referenceNumber) {
          setSubId(data.subscriptionId);
          setRefData(data);
          setShowRefModal(true);
        } else {
          throw new Error(data.message || "Não foi possível gerar a referência.");
        }
      }

    } catch (err: any) {
      // Generic error handling - backend handles details
      let userFriendlyMessage = "Ocorreu um erro inesperado. Por favor, tente novamente.";

      if (err.message.includes("Email inválido")) {
        userFriendlyMessage = "Email inválido.";
      } else if (err.message.includes("senha")) {
        userFriendlyMessage = err.message;
      } else if (err.message.includes("Conta existente")) {
        userFriendlyMessage = err.message;
      }

      showError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow" >

         {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Nome completo</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="px-3 py-2 border rounded"
              placeholder="Digite seu nome completo"
            />
          </label>

          {/* Telegram */}
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Contacto (Telegram)</span>
            <input
              value={telegram}
              onChange={(e) => {
                setTelegram(e.target.value);
                setTelegramError("");
              }}
              maxLength={50}
              className={`px-3 py-2 border rounded transition-colors ${telegramError ? "border-red-500 bg-red-50" : ""}`}
              placeholder="seu @usuario"
            />
            {telegramError && (
              <span className="text-[10px] text-red-500 font-bold mt-1 ml-1 animate-pulse">
                {telegramError}
              </span>
            )}
          </label>

          {/* País */}
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Escolha o seu país</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option>Angola</option>
              <option>Portugal</option>
              <option>Brasil</option>
              <option>Mozambique</option>
              <option>Cabo Verde</option>
              <option>Guiné-Bissau</option>
              <option>São Tomé e Príncipe</option>
            </select>
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={254}
              className="px-3 py-2 border rounded"
              placeholder="seu@email.com"
            />
          </label>

          {/* Senha */}
          <label className="flex flex-col relative w-full">
            <span className="text-sm font-medium mb-1">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="px-3 py-2 border rounded w-full pr-10"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {/* Confirmar Senha */}
          <label className="flex flex-col relative w-full">
            <span className="text-sm font-medium mb-1">Confirmar senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="px-3 py-2 border rounded w-full pr-10"
                placeholder="Digite a senha novamente"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
        </div>

        {/* Tipos de alertas */}
        <section className="mt-4">
          <h4 className="font-semibold mb-2">
            Que tipos de alertas deseja receber?
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "events", label: "Eventos" },
              { id: "community", label: "Comunidade" },
              { id: "wtm", label: "Mulheres na T.I" },
              { id: "roadmaps", label: "Cursos" },
              { id: "bolsas", label: "Bolsas de estudo" },
              { id: "startups", label: "Startups" },
            ].map((item) => (
              <label key={item.id} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={alerts.includes(item.id)}
                  onChange={() => toggleAlert(item.id)}
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Método pagamento */}
        <section className="mt-6 border-t border-gray-100 pt-6">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            Método de pagamento
          </h4>

          <div className="space-y-3">
            {/* Referencia - Disponível apenas para Angola */}
            {country === "Angola" && (
              <label className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "transfer" ? "border-indigo-600 bg-indigo-50" : "border-gray-100 hover:bg-gray-50"}`}>
                <input
                  type="radio"
                  name="payment"
                  className="mt-3 flex-shrink-0"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                />
                <img
                  src="/images.png"
                  alt="Multicaixa"
                  className="h-10 w-10 rounded-lg object-contain bg-white p-1 border border-gray-100"
                />
                <div>
                  <span className="font-bold text-sm block text-gray-900">Referência</span>
                  <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                    Pague via ATM, Multicaixa Express ou Internet Banking. Liberação automática.
                  </p>
                </div>
              </label>
            )}

            {/* Stripe / Cartão */}
            <label className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "paypal" ? "border-indigo-600 bg-indigo-50" : "border-gray-100 hover:bg-gray-50"}`}>
              <input
                type="radio"
                name="payment"
                className="mt-3 flex-shrink-0"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <img
                src="/stripe-logo-sq.jpg"
                alt="Cartão/Stripe"
                className="h-10 w-10 rounded-lg object-contain bg-white p-1 border border-gray-100"
              />
              <div>
                <span className="font-bold text-sm block text-gray-900">Stripe</span>
                <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                  Cartões, PayPal, Google Pay, Apple Pay, Revolut Pay. Processamento imediato e seguro.
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* Erro Geral do Formulário */}
        {formError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-red-600 text-sm font-bold text-center">
              {formError}
            </p>
          </div>
        )}

        {/* Botões */}
        <div className="mt-6 flex gap-3">
          <button  type="submit" disabled={loading}
                    className={`px-4 py-2 rounded bg-indigo-600 text-white font-semibold 
                              hover:bg-indigo-700 transition flex items-center gap-2 ${
                                    loading ? "opacity-60 cursor-not-allowed" : "" }`}  >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Processando..." : "Confirmar Assinatura"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded border"
          >
            Voltar
          </button>
        </div>
      </form>

      {/* MODAL DE REFERÊNCIA (Indispensável para a lógica de 'transfer') */}
      {showRefModal && refData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-indigo-600 p-8 text-center text-white relative">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black">Pronto!</h2>
              <p className="text-sm opacity-80 font-medium">Sua referência foi gerada com sucesso</p>
            </div>

            <div className="p-8 space-y-6">
              {status === "active" ? (
                <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Pagamento Confirmado!</h3>
                  <p className="text-sm text-gray-500">Sua assinatura já está ativa. Redirecionando...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Entidade</span>
                      <span className="font-mono font-black text-xl text-indigo-600 tracking-tighter">{refData.entityNumber}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Referência</span>
                      <span className="font-mono font-black text-xl text-indigo-600 tracking-tighter">{refData.referenceNumber.match(/.{1,3}/g)?.join(' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Valor</span>
                      <span className="font-black text-xl text-gray-900 tracking-tight">{refData.amount.toLocaleString()} AKZ</span>
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                    <h4 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Próximos Passos</h4>
                    <ul className="text-[11px] text-indigo-900/70 space-y-2 font-medium">
                      <li className="flex gap-2"><span>1.</span> Pague via ATM ou Express</li>
                      <li className="flex gap-2"><span>2.</span> Selecione Pagamentos por Referência</li>
                      <li className="flex gap-2"><span>3.</span> O acesso será liberado automaticamente</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => router.push("/perfil")} 
                    className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition shadow-lg active:scale-95"
                  >
                    Entendi, Ver meu Perfil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionForm;
