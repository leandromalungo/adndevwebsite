"use client";

/**
 * Navbar: componente de navegação global do site.
 * 
 * FRONTEND: Apenas exibe dados e envia requisições.
 * BACKEND (NextAuth): Valida toda autenticação.
 * 
 * - Exibe logotipo, links de navegação e menu do usuário
 * - Gerencia estado local para UI (menu móvel, dropdowns, modals)
 * - Lê dados de sessão do backend via NextAuth
 */
import { Menu, X, User, AlertCircle, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { sanitizeText, sanitizeEmail, isSafeString } from "@/lib/security";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Navbar = () => {
  // BACKEND: NextAuth gerencia autenticação - frontend apenas lê sessão
  const { user, isLoggedIn, logout } = useAuth();
  
  // Estados locais do componente
  const [openMenu, setOpenMenu] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  
  // Dados do usuário (preenchidos pelo Firebase)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("Angola");
  const [telegram, setTelegram] = useState("");
  const [notificacoes, setNotificacoes] = useState<Record<string, boolean>>({
    Eventos: true,
    Comunidade: true,
    "Game Development": false,
    "Mulheres na T.I": true,
    Cursos: false,
    "Bolsas de estudo": true,
    Startups: true,
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Novos estados para o painel de login
  const [loginModal, setLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Estado da assinatura real
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Escuta assinatura em tempo real
  useEffect(() => {
    if (!user || !db) {
      setSubscription(null);
      return;
    }
    const q = query(collection(db, "subscriptions"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setSubscription(snapshot.docs[0].data());
      } else {
        setSubscription(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const closeMobileMenu = () => setOpenMenu(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdown(false);
        setConfigOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getEstadoColor = (estado?: string) => {
    switch (estado) {
      case "active":
        return "text-green-600";
      case "pending":
        return "text-yellow-500";
      case "canceled":
      case "expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getDisplayStatus = (estado?: string) => {
    switch (estado) {
      case "active": return "activo";
      case "pending": return "pendente";
      default: return "desativada";
    }
  };

  const handleNotifChange = (key: string) => {
    setNotificacoes(prev => ({ ...prev, [key]: !prev[key] }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    const sanitizedName = sanitizeText(name);
    const sanitizedTelegram = sanitizeText(telegram);

    if (!isSafeString(sanitizedName) || !isSafeString(sanitizedTelegram)) {
      alert("Conteúdo inválido detectado.");
      return;
    }
    // Nota: Em produção, salvaria no Firestore
    alert("Alterações salvas (Simulado)");
    setUnsavedChanges(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Falha silenciosa ou erro genérico
    } finally {
      setUserDropdown(false);
    }
  };

  const confirmDelete = () => {
    if (confirmText.toUpperCase() !== "SIM") {
      setDeleteMessage("Você deve digitar 'SIM' para continuar.");
      setTimeout(() => setDeleteMessage(""), 3000);
      return;
    }
    
    const sanitizedEmailInput = sanitizeEmail(emailInput);
    if (!sanitizedEmailInput || sanitizedEmailInput !== (user?.email || "")) {
      setDeleteMessage("Email incorrecto.");
      setTimeout(() => setDeleteMessage(""), 3000);
      return;
    }

    setDeleteMessage("Solicitação de exclusão enviada.");
    setTimeout(() => {
      setDeleteModal(false);
      setDeleteMessage("");
    }, 1500);
  };

  /**
   * FRONTEND: Apenas envia credenciais para o backend.
   * BACKEND (NextAuth): Valida credenciais e cria sessão.
   */
  const handleLogin = async () => {
    setLoginError("");

    // Validação mínima apenas para UX - backend valida tudo
    if (!loginEmail || !loginSenha) {
      setLoginError("Preencha todos os campos.");
      setTimeout(() => setLoginError(""), 3000);
      return;
    }

    setLoginLoading(true);
    try {
      // BACKEND: NextAuth valida credenciais
      // Frontend apenas envia email/password - SEM validação
      const result = await signIn("credentials", {
        email: loginEmail,
        password: loginSenha,
        redirect: false,
      });

      if (result?.error) {
        // Backend retornou erro
        setLoginError("Email ou senha incorrectos.");
        setTimeout(() => setLoginError(""), 4000);
      } else if (result?.ok) {
        // Login bem-sucedido - backend validou tudo
        setLoginModal(false);
        setLoginEmail("");
        setLoginSenha("");
      }
    } catch (error: any) {
      // Erro de rede ou outro erro inesperado
      setLoginError("Erro ao fazer login. Tente novamente.");
      setTimeout(() => setLoginError(""), 4000);
    } finally {
      setLoginLoading(false);
    }
  };

  // Trava o scroll quando o modal de login está aberto
  useEffect(() => {
    if (loginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loginModal]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="focus:outline-none focus:ring-0 focus-visible:outline-none"
        >
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            className="cursor-pointer object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-bold">
          <NavLink
            label="Eventos"
            href="/events"
            loading={loadingLink === "/events"}
            onClick={() => setLoadingLink("/events")}
          />
          <NavLink
            label="Comunidades"
            href="/community"
            loading={loadingLink === "/community"}
            onClick={() => setLoadingLink("/community")}
          />
          <NavLink
            label="Mulheres na T.I"
            href="/wtm"
            loading={loadingLink === "/wtm"}
            onClick={() => setLoadingLink("/wtm")}
          />
          <NavLink
            label="Cursos"
            href="/cursos"
            loading={loadingLink === "/cursos"}
            onClick={() => setLoadingLink("/cursos")}
          />
          <NavLink
            label="Bolsas de estudo"
            href="/bolsas"
            loading={loadingLink === "/bolsas"}
            onClick={() => setLoadingLink("/bolsas")}
          />
          <NavLink
            label="Startups"
            href="/startups"
            loading={loadingLink === "/startups"}
            onClick={() => setLoadingLink("/startups")}
          />
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Botão do usuário */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setLoginModal(true);
              } else {
                setUserDropdown(!userDropdown);
              }
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
          >
            <User className={`w-6 h-6 ${isLoggedIn ? "text-blue-600" : "text-gray-600"}`} />
          </button>

          {/* Dropdown do usuário */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-12 w-64 bg-white border border-gray-200 shadow-lg rounded-lg py-2 flex flex-col z-50 transition-all duration-300 transform origin-top-right
              ${userDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="px-4 py-2 text-sm font-medium text-gray-700">
              Assinatura:{" "}
              <span className={getEstadoColor(subscription?.status)}>
                {getDisplayStatus(subscription?.status)}
              </span>
            </div>

            <button
              onClick={() => setConfigOpen(!configOpen)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full font-medium"
            >
              Configurações
            </button>

            {configOpen && (
              <div className="px-4 py-2 space-y-2 text-sm text-gray-700 border-t border-gray-200">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setUnsavedChanges(true); }}
                  className="w-full border p-1 rounded outline-none"
                  placeholder="Nome do usuário"
                  maxLength={100}
                />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full border p-1 rounded bg-gray-50 text-gray-400"
                  placeholder="Email"
                />
                <select
                  value={pais}
                  onChange={(e) => { setPais(e.target.value); setUnsavedChanges(true); }}
                  className="w-full border p-1 rounded"
                >
                  <option value="Angola">Angola</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Cabo Verde">Cabo Verde</option>
                  <option value="Guine Bissau">Guiné Bissau</option>
                </select>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => { setTelegram(e.target.value); setUnsavedChanges(true); }}
                  className="w-full border p-1 rounded outline-none"
                  placeholder="Telegram"
                  maxLength={50}
                />
                <div className="space-y-1">
                  <span className="font-medium text-[11px] uppercase text-gray-400">Notificações:</span>
                  {Object.keys(notificacoes).map((key) => (
                    <label key={key} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={notificacoes[key]}
                        onChange={() => handleNotifChange(key)}
                      />
                      {key}
                    </label>
                  ))}
                </div>

                <button
                  className="w-full text-left text-red-600 hover:text-red-800 font-medium text-xs mt-2"
                  onClick={() => setDeleteModal(true)}
                >
                  Eliminar conta
                </button>

                {unsavedChanges && (
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium text-xs"
                  >
                    Salvar
                  </button>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full font-medium"
            >
              Sair da conta
            </button>
          </div>

          {/* Botão mobile */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {openMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${openMenu ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 space-y-2 font-bold">
          <MobileLink
            label="Eventos"
            href="/events"
            onClick={() => { closeMobileMenu(); }}
          />
          <MobileLink
            label="Comunidades"
            href="/community"
            onClick={() => { closeMobileMenu(); }}
          />
          <MobileLink
            label="Mulheres na T.I"
            href="/wtm"
            onClick={() => { closeMobileMenu(); }}
          />
          <MobileLink
            label="Cursos"
            href="/cursos"
            onClick={() => { closeMobileMenu(); }}
          />
          <MobileLink
            label="Bolsas de estudo"
            href="/bolsas"
            onClick={() => { closeMobileMenu(); }}
          />
          <MobileLink
            label="Startups"
            href="/startups"
            onClick={() => { closeMobileMenu(); }}
          />
        </div>
      </div>

      {/* Modal de login */}
      {loginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-[700px] h-[500px] flex shadow-lg relative">
            {/* Lado da Imagem */}
            <div className="hidden md:flex md:w-1/2 relative bg-gray-200">
              <Image
                src="/8de2ab7c6c83961fde16e26aa1286d28.jpg"
                alt="Login Image"
                fill
                className="object-cover"
              />
              {/* Overlay com gradiente/fumê na parte inferior */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end items-start text-white">
                <h2 className="text-3xl font-bold mb-1">
                  Bem-vindo de Volta!
                </h2>
                <p className="text-sm">
                  Acesse conteúdos exclusivos e fique por dentro das últimas
                  tendências em tecnologia.
                </p>
              </div>
            </div>

            {/* Lado do Formulário */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-3">
              {/* Logo no topo */}
              <div className="flex justify-center md:justify-start mb-2">
                <Image
                  src="/images/logo_login.png"
                  alt="Logo da Plataforma"
                  width={200}
                  height={56}
                  className="h-14 w-auto object-contain"
                />
              </div>

              <h2 className="font-bold text-2xl text-gray-800 uppercase mb-1">
                Entre com sua conta
              </h2>

              {/* Parágrafo acima do formulário */}
              <p className="text-gray-600 text-sm mb-2">
                Entre com sua conta de assinante para teres acesso aos seus
                artigos premium, tutoriais e novidades em tecnologia.
              </p>

              <div className="flex flex-col mb-2">
                <span className="text-gray-600 text-sm mb-1 uppercase font-bold text-[10px]">Email</span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Digite seu email"
                  maxLength={254}
                />
              </div>

              <div className="flex flex-col mb-2">
                <span className="text-gray-600 text-sm mb-1 uppercase font-bold text-[10px]">Senha</span>
                <input
                  type="password"
                  value={loginSenha}
                  onChange={(e) => {
                    setLoginSenha(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Digite sua senha"
                  maxLength={100}
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-600 mb-2 font-medium">{loginError}</p>
              )}

              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-bold mb-2 flex items-center justify-center gap-2"
              >
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
              </button>

              <button
                onClick={() => setLoginModal(false)}
                className="w-full text-gray-500 hover:text-gray-900 text-sm font-medium"
              >
                Sair
              </button>

              {/* Call-to-action para criar conta */}
              <p className="text-gray-600 text-xs mb-0 text-center md:text-left">
                Não tens uma conta?{" "}
                <Link
                  href="/assinatura"
                  className="text-purple-600 hover:text-purple-800 font-bold"
                >
                  Clique aqui
                </Link>{" "}
                para assinar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-[320px] space-y-4 shadow-2xl">
            <h2 className="font-bold text-lg">Confirmar exclusão da conta</h2>
            {!emailInput ? (
              <>
                <p className="text-sm text-gray-600">
                  Tem certeza que deseja eliminar sua conta? Digite{" "}
                  <strong>SIM</strong> para continuar.
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full border p-2 rounded outline-none"
                  placeholder="Digite SIM"
                />
                <button
                  onClick={() =>
                    confirmText.toUpperCase() === "SIM"
                      ? setEmailInput(user?.email || "")
                      : setDeleteMessage(
                          "Você deve digitar 'SIM' para continuar.",
                        )
                  }
                  className="w-full bg-red-600 text-white py-2 rounded font-bold"
                >
                  Avançar
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-500">Confirme o email ({user?.email}):</p>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Email"
                />
                <button
                  onClick={confirmDelete}
                  className="w-full bg-red-600 text-white py-2 rounded font-bold"
                >
                  Confirmar Exclusão
                </button>
              </>
            )}
            {deleteMessage && (
              <p className="text-xs text-red-600 font-bold">{deleteMessage}</p>
            )}
            <button
              onClick={() => setDeleteModal(false)}
              className="w-full text-gray-500 hover:text-gray-900 font-medium text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* Componentes auxiliares */
const NavLink = ({
  label,
  href,
  loading,
  onClick,
}: {
  label: string;
  href: string;
  loading?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
  >
    {label} {loading && <Loader2 className="w-3 h-3 animate-spin"/>}
  </Link>
);

const MobileLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
  >
    {label}
  </Link>
);
