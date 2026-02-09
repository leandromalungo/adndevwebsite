"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/app/database/ClientRepository";
import { ClientType } from "@/lib/clientType";

type PayPalCurrency = "USD" | "EUR";

const SubscriptionForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createClient = useClientStore((state) => state.createNewClient);

  const [clienteData, setClienteData] = useState<ClientType>({
    id: "",
    name: "",
    telegram: "",
    email: "",
    country: "Angola",
    alerts: [],
    paymentForm: "paypal",
    comprovative: null as any,
    subscriptionON: true,
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paypalCurrency, setPaypalCurrency] = useState<PayPalCurrency>("USD");

  // Seleciona Multicaixa automaticamente se o país for Angola
  useEffect(() => {
    if (clienteData.country === "Angola") {
      setClienteData((prev) => ({...prev, paymentForm: "transfer"}));
    } else {
      setClienteData((prev) => ({...prev, paymentForm: "paypal"}));
    }
  }, [clienteData.country]);

  const toggleAlert = (value: string) => {
    setClienteData((prev) => ({
      ...prev,
      alerts: prev.alerts.includes(value)
        ? prev.alerts.filter((a) => a !== value)
        : [...prev.alerts, value],
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    // Aceitar apenas PDF
    if (file && file.type !== "application/pdf") {
      alert("Apenas arquivos PDF são permitidos para o comprovante.");
      e.target.value = ""; // limpa o input
      setClienteData((prev) => ({...prev, comprovative: null as any}));
      return;
    }
    setClienteData((prev) => ({...prev, comprovative: file as any}));
  };

  const validate = () => {
    if (!clienteData.name.trim() || !clienteData.email.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return false;
    }

    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return false;
    }

    if (clienteData.paymentForm === "transfer" && !clienteData.comprovative) {
      alert("Envie o comprovante da transferência em PDF.");
      return false;
    }

    if (clienteData.alerts.length === 0) {
      alert("Selecione pelo menos um tipo de alerta.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    
    try {
      // Se PayPal, salvar dados e redirecionar para pagamento
      if (clienteData.paymentForm === "paypal") {
        const paymentData = {
          ...clienteData,
          password,
          paypalCurrency
        };
        sessionStorage.setItem("clienteData", JSON.stringify(paymentData));
        router.push("/payment");
        return;
      }

      // Para outros métodos, criar cliente direto
      const formData = { 
        ...clienteData, 
        createdAt: new Date(),
        updatedAt: new Date()
      };  

      await createClient(formData);
      router.push("/assinatura/sucesso");
    }
    catch (error) {
      console.error("Erro ao criar cliente:", error);
      alert("Ocorreu um erro ao processar sua assinatura. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Nome completo</span>
          <input
            value={clienteData.name}
            onChange={(e) => setClienteData({...clienteData, name: e.target.value})}
            required
            className="px-3 py-2 border rounded"
            placeholder="Digite seu nome completo"
          />
        </label>

        {/* Telegram */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Contacto (Telegram)</span>
          <input
            value={clienteData.telegram}
            onChange={(e) => setClienteData({...clienteData, telegram: e.target.value})}
            className="px-3 py-2 border rounded"
            placeholder="seu @usuario"
          />
        </label>

        {/* País */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Escolha o seu país</span>
          <select
            value={clienteData.country}
            onChange={(e) => setClienteData({...clienteData, country: e.target.value})}
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
            value={clienteData.email}
            onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
            required
            className="px-3 py-2 border rounded"
            placeholder="seu@email.com"
          />
        </label>

        {/* Senha */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="px-3 py-2 border rounded"
            placeholder="Digite sua senha"
          />
        </label>

        {/* Confirmar Senha */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Confirmar senha</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="px-3 py-2 border rounded"
            placeholder="Digite a senha novamente"
          />
        </label>
      </div>

      {/* Alertas */}
      <section className="mt-4">
        <h4 className="font-semibold mb-2">
          Que tipos de alertas deseja receber?
        </h4>
        <div className="flex flex-wrap gap-3">
          {[
            { id: "events", label: "Eventos" },
            { id: "community", label: "Comunidade" },
            { id: "gamedev", label: "Game Development" },
            { id: "wtm", label: "Mulheres na T.I" },
            { id: "roadmaps", label: "Cursos" },
            { id: "bolsas", label: "Bolsas de estudo" },
            { id: "startups", label: "Startups" },
          ].map((item) => (
            <label
              key={item.id}
              className="inline-flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={clienteData.alerts.includes(item.id)}
                onChange={() => toggleAlert(item.id)}
                className="h-4 w-4"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Pagamento */}
      <section className="mt-6">
        <h4 className="font-semibold mb-2">Método de pagamento</h4>
        
        {/* Multicaixa Express apenas para Angola */}
        {clienteData.country === "Angola" && (
          <>
            <label className="flex items-center gap-3 mb-2">
              <input
                type="radio"
                name="payment"
                checked={clienteData.paymentForm === "transfer"}
                onChange={() => setClienteData({...clienteData, paymentForm: "transfer"})}
              />
              <img src="/images/payments/express.png" alt="Transferência bancária" className="h-6 w-6 object-contain" />
              <div>Transferência bancária (envie o comprovante abaixo)</div>
            </label>
          </>
        )}

        {clienteData.paymentForm === "transfer" && (
          <div className="mt-3">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Carregar comprovante</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile}
              />
              {clienteData.comprovative && (
                <span className="text-xs text-gray-600 mt-1">
                  Arquivo: {clienteData.comprovative.name}
                </span>
              )}
            </label>
          </div>
        )}
        
        {/* PayPal */}
        <label className="flex items-center gap-3 mt-4">
          <input
            type="radio"
            name="payment"
            checked={clienteData.paymentForm === "paypal"}
            onChange={() => setClienteData({...clienteData, paymentForm: "paypal"})}
          />
          <img
            src="/images/payments/paypol.jpg"
            alt="PayPal"
            className="h-6 w-6"
          />
          <span>PayPal</span>
        </label>

        {clienteData.paymentForm === "paypal" && (
          <div className="ml-6 mt-2 space-y-1 text-sm">
{/*             <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={paypalCurrency === "USD"}
                onChange={() => setPaypalCurrency("USD")}
              />
              <span>2 USD (Dolares)</span>
            </label> */}

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={paypalCurrency === "EUR"}
                onChange={() => setPaypalCurrency("EUR")}
              />
              <span>2 EUR (Euro)</span>
            </label>
          </div>
        )}
      </section>

      {/* Botões */}
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
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
  );
};

export default SubscriptionForm;
