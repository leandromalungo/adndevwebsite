// app/cd1afa520f/login/page.tsx
// Página de acesso ao painel de gestão
// SEGURANÇA: Frontend apenas envia dados ao backend — ZERO validação local
// Toda a autenticação ocorre via Cloud Function (signinAdmin)

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hpRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Animação de entrada após mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Se já autenticado como admin, redireciona para o painel (sem expor a rota no console)
  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role === "admin") {
      router.replace("/cd1afa520f");
    }
  }, [session, status, router]);

  /**
   * SUBMISSÃO DO FORMULÁRIO
   * O frontend NÃO valida credenciais — apenas envia ao backend.
   * Toda a lógica de autenticação ocorre na Cloud Function signinAdmin.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Anti-bot: honeypot preenchido = bot detectado
    if (hpRef.current?.value) {
      // Simula loading sem fazer nada — confunde bots
      setLoading(true);
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
      return;
    }

    // Verificação mínima de campos vazios — apenas UX, backend valida tudo
    if (!formData.email || !formData.password) {
      setErrorMsg("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // BACKEND: NextAuth → Cloud Function signinAdmin valida credentials e role
      // FRONTEND: apenas envia dados — sem lógica de autenticação aqui
      const result = await signIn("admin-credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // Mensagem genérica — não revela se email existe ou qual o erro real
        setErrorMsg("Acesso negado. Verifique as credenciais.");
      } else if (result?.ok) {
        router.replace("/cd1afa520f");
      } else {
        setErrorMsg("Erro ao processar o pedido. Tente novamente.");
      }
    } catch {
      // Erro de rede — mensagem genérica sem detalhes técnicos
      setErrorMsg("Erro de ligação. Verifique a sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-root">
      {/* Background com gradiente animado */}
      <div className="admin-login-bg">
        <div className="admin-login-bg-orb admin-login-bg-orb-1" />
        <div className="admin-login-bg-orb admin-login-bg-orb-2" />
        <div className="admin-login-bg-orb admin-login-bg-orb-3" />
      </div>

      {/* Card de Login */}
      <div className={`admin-login-card ${mounted ? "admin-login-card--visible" : ""}`}>
        {/* Linha decorativa no topo */}
        <div className="admin-login-card-accent" />

        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon-wrap">
            <ShieldCheck className="admin-login-icon" aria-hidden="true" />
          </div>
          <h1 className="admin-login-title">FAÇA LOGIN</h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>

          {/* Honeypot — invisível para humanos, bots preenchem automaticamente */}
          <input
            ref={hpRef}
            type="text"
            name="hp_field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          {/* Mensagem de erro */}
          {errorMsg && (
            <div className="admin-login-error" role="alert" aria-live="assertive">
              <Lock className="admin-login-error-icon" size={14} aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Campo: Email */}
          <div className="admin-login-field">
            <label htmlFor="adm-email" className="admin-login-label">
              Email
            </label>
            <div className="admin-login-input-wrap">
              <input
                id="adm-email"
                type="email"
                autoComplete="username"
                className="admin-login-input"
                placeholder="email@exemplo.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                  if (errorMsg) setErrorMsg("");
                }}
                disabled={loading}
                required
                maxLength={254}
              />
            </div>
          </div>

          {/* Campo: Senha */}
          <div className="admin-login-field">
            <label htmlFor="adm-password" className="admin-login-label">
              Senha
            </label>
            <div className="admin-login-input-wrap">
              <input
                id="adm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="admin-login-input admin-login-input--password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, password: e.target.value }));
                  if (errorMsg) setErrorMsg("");
                }}
                disabled={loading}
                required
                maxLength={128}
              />
              <button
                type="button"
                className="admin-login-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                tabIndex={0}
              >
                {showPassword
                  ? <EyeOff size={16} aria-hidden="true" />
                  : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Botão de submit */}
          <button
            type="submit"
            className={`admin-login-btn ${loading ? "admin-login-btn--loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="admin-login-spinner" aria-hidden="true" />
                <span>A verificar...</span>
              </>
            ) : (
              <>
                <Lock size={15} aria-hidden="true" />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        {/* Footer discreto */}
        <p className="admin-login-footer">
          Acesso monitorizado e registado
        </p>
      </div>

      {/* Estilos inline — auto-contidos na página */}
      <style>{`
        .admin-login-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          overflow: hidden;
          padding: 1.5rem;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }

        /* Orbs de fundo animadas */
        .admin-login-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .admin-login-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          animation: orbFloat 12s ease-in-out infinite;
        }
        .admin-login-bg-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
          top: -150px; left: -150px;
          animation-delay: 0s;
        }
        .admin-login-bg-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation-delay: -4s;
        }
        .admin-login-bg-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -8s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33%       { transform: scale(1.08) translate(20px, -20px); }
          66%       { transform: scale(0.95) translate(-15px, 15px); }
        }
        .admin-login-bg-orb-3 {
          animation-name: orbFloat3;
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-50%, -50%) scale(1.2); }
        }

        /* Card */
        .admin-login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(79,70,229,0.15),
            0 24px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
          padding: 2.5rem 2rem;
          opacity: 0;
          transform: translateY(24px) scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .admin-login-card--visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Accent line */
        .admin-login-card-accent {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #4f46e5, #7c3aed, #0ea5e9, transparent);
          border-radius: 4px;
        }

        /* Header */
        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .admin-login-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          box-shadow: 0 8px 24px rgba(79,70,229,0.4);
          margin-bottom: 1rem;
        }
        .admin-login-icon {
          width: 26px; height: 26px;
          color: #fff;
        }
        .admin-login-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 0.3rem;
          letter-spacing: -0.02em;
        }
        .admin-login-subtitle {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }

        /* Formulário */
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        /* Erro */
        .admin-login-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 0.9rem;
          border-radius: 10px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          font-size: 0.82rem;
        }
        .admin-login-error-icon {
          flex-shrink: 0;
          color: #f87171;
        }

        /* Campo */
        .admin-login-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .admin-login-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .admin-login-input-wrap {
          position: relative;
        }
        .admin-login-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1f5f9;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .admin-login-input::placeholder { color: #475569; }
        .admin-login-input:focus {
          border-color: rgba(79,70,229,0.6);
          box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
          background: rgba(255,255,255,0.07);
        }
        .admin-login-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .admin-login-input--password {
          padding-right: 2.8rem;
        }
        .admin-login-eye-btn {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          padding: 0.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .admin-login-eye-btn:hover { color: #94a3b8; }

        /* Input autofill override */
        .admin-login-input:-webkit-autofill,
        .admin-login-input:-webkit-autofill:hover,
        .admin-login-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #111827 inset;
          -webkit-text-fill-color: #f1f5f9;
          transition: background-color 5000s ease-in-out 0s;
        }

        /* Botão */
        .admin-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.8rem 1rem;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.4rem;
          box-shadow: 0 4px 16px rgba(79,70,229,0.35);
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          position: relative;
          overflow: hidden;
        }
        .admin-login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .admin-login-btn:hover:not(:disabled)::before { opacity: 1; }
        .admin-login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(79,70,229,0.45);
        }
        .admin-login-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(79,70,229,0.3);
        }
        .admin-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .admin-login-btn--loading {
          pointer-events: none;
        }

        /* Spinner */
        .admin-login-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .admin-login-footer {
          margin: 1.5rem 0 0;
          text-align: center;
          font-size: 0.72rem;
          color: #334155;
          letter-spacing: 0.02em;
        }

        /* Responsivo */
        @media (max-width: 480px) {
          .admin-login-card { padding: 2rem 1.25rem; }
          .admin-login-title { font-size: 1.2rem; }
        }
      `}</style>
    </div>
  );
}
