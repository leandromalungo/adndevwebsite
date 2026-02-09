"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClientStore } from "@/app/database/ClientRepository";
import { ClientType } from "@/lib/clientType";

const SubscriptionForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createClient = useClientStore((state) => state.createNewClient);
  const getAllClients = useClientStore((state) => state.fetchAllClients);

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


  const toggleAlert = (value: string) => {
    setClienteData((prev) => ({
      ...prev,
      alerts: prev.alerts.includes(value)
        ? prev.alerts.filter((a) => a !== value)
        : [...prev.alerts, value],
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setClienteData((prev) => ({
      ...prev,
      comprovative: f as any,
    }));
  };

  const validate = () => {
    if (!clienteData.name.trim() || !clienteData.email.trim()) return false;
    if (clienteData.paymentForm === "transfer" && !clienteData.comprovative) return false;
    if (clienteData.paymentForm === "reference" && !clienteData.telegram.trim()) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return alert("Por favor preencha os campos necessários.");
    setLoading(true);
    
    try {
      // Se PayPal, salvar dados e redirecionar para pagamento
      if (clienteData.paymentForm === "paypal") {
        sessionStorage.setItem("clienteData", JSON.stringify(clienteData));
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
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Nome completo</span>
          <input
            value={clienteData.name}
            onChange={(e) => setClienteData({...clienteData, name: e.target.value})}
            required
            className="px-3 py-2 border rounded"
            placeholder="Digite seu nome"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">Contacto (Telegram)</span>
          <input
            value={clienteData.telegram}
            onChange={(e) => setClienteData({...clienteData, telegram: e.target.value})}
            className="px-3 py-2 border rounded"
            placeholder="Digite o @seuusuario"
          />
        </label>

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

        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">E-mail</span>
          <input
            type="email"
            value={clienteData.email}
            onChange={(e) => setClienteData({...clienteData, email: e.target.value})}
            required
            className="px-3 py-2 border rounded"
            placeholder="seu@exemplo.com"
          />
        </label>
      </div>

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
            { id: "mind", label: "Mentes Brilhantes" },
          ].map((t) => (
            <label key={t.id} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={clienteData.alerts.includes(t.id)}
                onChange={() => toggleAlert(t.id)}
                className="h-4 w-4"
              />
              <span className="text-sm">{t.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h4 className="font-semibold mb-2">Método de pagamento</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={clienteData.paymentForm === "paypal"}
              onChange={() => setClienteData({...clienteData, paymentForm: "paypal"})}
            />
            <img src="/images/payments/paypol.jpg" alt="PayPal" className="h-6 w-6 object-contain" />
            <span>PayPal</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={clienteData.paymentForm === "transfer"}
              onChange={() => setClienteData({...clienteData, paymentForm: "transfer"})}
            />
            <img src="/images/payments/express.png" alt="Transferência bancária" className="h-6 w-6 object-contain" />
            <div>Transferência bancária (envie o comprovante abaixo)</div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              checked={clienteData.paymentForm === "reference"}
              onChange={() => setClienteData({...clienteData, paymentForm: "reference"})}
            />
            <img src="/images/payments/reference.jpg" alt="Pagamento por referência" className="h-6 w-6 object-contain" />
            <div>Pagamento por referência</div>
          </label>
        </div>

        {clienteData.paymentForm === "transfer" && (
          <div className="mt-3">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Carregar comprovante</span>
              <input
                type="file"
                accept="image/*,application/pdf"
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

        {clienteData.paymentForm === "reference" && (
          <div className="mt-3">
            <label className="flex flex-col">
              <span className="text-sm mb-1">Código de referência</span>
              <input
                value={clienteData.telegram}
                onChange={(e) => setClienteData({...clienteData, telegram: e.target.value})}
                className="px-3 py-2 border rounded"
                placeholder="Ex: REF-12345"
              />
            </label>
          </div>
        )}
      </section>

      <div className="mt-6 flex items-center gap-3">
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
