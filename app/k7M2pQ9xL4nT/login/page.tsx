"use client";

import { FormEvent, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { adminPath } from "@/lib/admin-routes";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (isBlocked) {
      setLoading(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError("Preencha os campos para continuar.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: normalizedEmail,
      password: normalizedPassword,
      redirect: false,
    });

    if (result?.error) {
      const lowered = result.error.toLowerCase();
      if (lowered.includes("tentativas") || lowered.includes("bloquead")) {
        setIsBlocked(true);
        setError("Demasiadas tentativas de login. Notificamos a alguem de direito sobre essas tentativas.");
        setLoading(false);
        return;
      }

      // Evita revelar detalhes sensiveis do motivo de falha.
      setError("Credenciais invalidas ou acesso nao autorizado.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/auth/session");
    const session = await response.json();

    if (!session?.user?.isAdmin) {
      await signOut({ redirect: false });
      setError("Credenciais invalidas ou acesso nao autorizado.");
      setLoading(false);
      return;
    }

    router.push(adminPath("/dashboard"));
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f8f9] text-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgba(124,58,237,0.35)]">
        <div className="mb-6">
          <h1 className="mt-3 text-2xl sm:text-2xl text-gray-900 text-center uppercase">Inicie sessão</h1>
          <p className="text-sm text-gray-600 mt-1 text-center">Para acessar o painel</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-700"
              required
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="nome@exemplo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-700"
              required
              autoComplete="current-password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              minLength={8}
              placeholder="Digite sua senha"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-xs font-medium text-red-700">{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || isBlocked}
            className="mt-1 flex w-full items-center justify-center rounded-lg bg-violet-700 py-2.5 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Processando..." : isBlocked ? "Acesso bloqueado" : "Entrar no painel"}
          </button>
        </form>
      </div>
    </main>
  );
}
