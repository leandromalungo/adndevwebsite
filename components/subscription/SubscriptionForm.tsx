"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type PaymentMethod = "paypal" | "transfer";

const SubscriptionForm: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Angola");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alerts, setAlerts] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("paypal");

  const [bankReceipt, setBankReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleAlert = (value: string) => {
    setAlerts((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setBankReceipt(file);
  };

  const validate = () => {
    if (!name.trim() || !email.trim()) {
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

    if (paymentMethod === "transfer" && !bankReceipt) {
      alert("Envie o comprovante da transferência.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Simulação de envio
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    router.push("/assinatura/sucesso");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2 border rounded"
            placeholder="Digite seu nome completo"
          />
        </label>

        {/* Telegram */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">
            Contacto (Telegram)
          </span>
          <input
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="@seuusuario"
          />
        </label>

        {/* País */}
        <label className="flex flex-col">
          <span className="text-sm font-medium mb-1">
            Escolha o seu país
          </span>
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
          <span className="text-sm font-medium mb-1">
            Confirmar senha
          </span>
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
                checked={alerts.includes(item.id)}
                onChange={() => toggleAlert(item.id)}
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Pagamento */}
      <section className="mt-6">
        <h4 className="font-semibold mb-2">Método de pagamento</h4>

        <label className="flex items-center gap-3 mb-3">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          <img
            src="/images/payments/paypol.jpg"
            alt="PayPal"
            className="h-6 w-6"
          />
          <span>PayPal</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "transfer"}
            onChange={() => setPaymentMethod("transfer")}
          />
          <img
            src="/images/payments/express.png"
            alt="Transferência bancária"
            className="h-6 w-6"
          />
          <span>Transferência bancária</span>
        </label>

        {paymentMethod === "transfer" && (
          <div className="mt-3">
            <label className="flex flex-col">
              <span className="text-sm mb-1">
                Carregar comprovante
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFile}
              />
              {bankReceipt && (
                <span className="text-xs text-gray-600 mt-1">
                  Arquivo: {bankReceipt.name}
                </span>
              )}
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
