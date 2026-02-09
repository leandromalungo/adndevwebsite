"use client";

// Navbar: componente de navegação global do site.
// - Exibe o logotipo, links de navegação (desktop e mobile) e o menu do usuário.
// - Gerencia estado local para o menu móvel, dropdown de usuário, modal de exclusão e formulários de configuração.
// - Inclui utilitários de simulação (mockUser) para desenvolvimento local.
import { Menu, X, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

// Tipos e dados de exemplo para o usuário (usados apenas em desenvolvimento):
type EstadoAssinatura = "activo" | "pendente" | "desativada";
type Notificacoes = Record<string, boolean>;
interface UserType {
  nome: string;
  email: string;
  pais: string;
  telegram: string;
  notificacoes: Notificacoes;
  estadoAssinatura: EstadoAssinatura;
  senha: string;
}

const mockUser: UserType = {
  nome: "Leandro Malungo",
  email: "leandro@example.com",
  pais: "Angola",
  telegram: "@leandro",
  notificacoes: {
    Eventos: true,
    Comunidade: true,
    "Game Development": false,
    "Mulheres na T.I": true,
    Cursos: false,
    "Bolsas de estudo": true,
    Startups: true,
  },
  estadoAssinatura: "activo",
  senha: "123456",
};

const Navbar = () => {
  // Estados locais do componente
  const [openMenu, setOpenMenu] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [user, setUser] = useState<UserType>(mockUser);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Novos estados para o painel de login
  const [loginModal, setLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // flag usuário logado

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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "text-green-600";
      case "pendente":
        return "text-yellow-500";
      case "desativada":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleUserChange = (field: string, value: any) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleNotifChange = (key: string) => {
    setUser((prev) => ({
      ...prev,
      notificacoes: { ...prev.notificacoes, [key]: !prev.notificacoes[key] },
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    console.log("Salvando alterações:", user);
    setUnsavedChanges(false);
  };

  const handleLogout = () => {
    console.log("Usuário saiu da conta");
    setIsLoggedIn(false); // ao sair, precisa logar de novo
    setUserDropdown(false);
  };

  const handleDelete = () => {
    setDeleteMessage("");
    setConfirmText("");
    setEmailInput("");
    setSenhaInput("");
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (confirmText.toUpperCase() !== "SIM") {
      setDeleteMessage("Você deve digitar 'SIM' para continuar.");
      return;
    }
    if (emailInput !== user.email || senhaInput !== user.senha) {
      setDeleteMessage("Senha incorreta.");
      return;
    }
    setDeleteMessage("Conta eliminada!");
    setTimeout(() => {
      setDeleteModal(false);
      console.log("Conta deletada");
    }, 1500);
  };

  // Novo: função de login
  const handleLogin = () => {
    if (loginEmail === user.email && loginSenha === user.senha) {
      setIsLoggedIn(true);
      setLoginModal(false);
      setUserDropdown(true);
      setLoginError("");
      setLoginEmail("");
      setLoginSenha("");
    } else {
      setLoginError("Email ou senha incorretos.");
    }
  };

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
            label="GameDev"
            href="/gamedev"
            loading={loadingLink === "/gamedev"}
            onClick={() => setLoadingLink("/gamedev")}
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
                setLoginModal(true); // abre modal de login se não estiver logado
              } else {
                setUserDropdown(!userDropdown); // senão abre dropdown
              }
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dropdown do usuário */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-12 w-64 bg-white border border-gray-200 shadow-lg rounded-lg py-2 flex flex-col z-50 transition-all duration-300 transform origin-top-right
              ${userDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="px-4 py-2 text-sm font-medium text-gray-700">
              Assinatura:{" "}
              <span className={getEstadoColor(user.estadoAssinatura)}>
                {user.estadoAssinatura}
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
                  value={user.nome}
                  onChange={(e) => handleUserChange("nome", e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Nome do usuário"
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleUserChange("email", e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Email do usuário"
                />
                <select
                  value={user.pais}
                  onChange={(e) => handleUserChange("pais", e.target.value)}
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
                  value={user.telegram}
                  onChange={(e) => handleUserChange("telegram", e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Telegram"
                />
                <div className="space-y-1">
                  <span className="font-medium">Notificações:</span>
                  {Object.keys(user.notificacoes).map((key) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={user.notificacoes[key]}
                        onChange={() => handleNotifChange(key)}
                      />
                      {key}
                    </label>
                  ))}
                </div>

                <button
                  className="w-full text-left text-red-600 hover:text-red-800 font-medium"
                  onClick={handleDelete}
                >
                  Eliminar conta
                </button>

                {unsavedChanges && (
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
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
            loading={loadingLink === "/events"}
            onClick={() => {
              setLoadingLink("/events");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="Comunidades"
            href="/community"
            loading={loadingLink === "/community"}
            onClick={() => {
              setLoadingLink("/community");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="GameDev"
            href="/gamedev"
            loading={loadingLink === "/gamedev"}
            onClick={() => {
              setLoadingLink("/gamedev");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="Mulheres na T.I"
            href="/wtm"
            loading={loadingLink === "/wtm"}
            onClick={() => {
              setLoadingLink("/wtm");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="Cursos"
            href="/cursos"
            loading={loadingLink === "/cursos"}
            onClick={() => {
              setLoadingLink("/cursos");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="Bolsas de estudo"
            href="/bolsas"
            loading={loadingLink === "/bolsas"}
            onClick={() => {
              setLoadingLink("/bolsas");
              closeMobileMenu();
            }}
          />
          <MobileLink
            label="Startups"
            href="/startups"
            loading={loadingLink === "/startups"}
            onClick={() => {
              setLoadingLink("/startups");
              closeMobileMenu();
            }}
          />
        </div>
      </div>

      {/* Modal de login */}
      {loginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden w-[700px] max-w-full h-[500px] flex shadow-lg">
            {/* Lado da Imagem */}
            <div className="hidden md:flex md:w-1/2 relative bg-gray-200">
              <img
                src="/8de2ab7c6c83961fde16e26aa1286d28.jpg"
                alt="Login Image"
                className="h-full w-full object-cover"
              />
              {/* Overlay com gradiente/fumê na parte inferior */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end items-start">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Bem-vindo de Volta!
                </h2>
                <p className="text-white text-sm">
                  Acesse conteúdos exclusivos e fique por dentro das últimas
                  tendências em tecnologia.
                </p>
              </div>
            </div>

            {/* Lado do Formulário */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
              {/* Logo no topo */}
              <div className="flex justify-center md:justify-start">
                <img
                  src="/images/45ef5adaa5da9ae7455ece2cb482ab64.png"
                  alt="Logo da Plataforma"
                  className="h-16 w-auto"
                />
              </div>

              <h2 className="font-bold text-2xl text-gray-800 mb-1 uppercase">Entre com sua conta</h2>

              {/* Parágrafo acima do formulário */}
              <p className="text-gray-600 text-sm mb-2">
                Entre com sua de conta de assinaante para teres acesso aos seus artigos premium, tutoriais e
                novidades em tecnologia e muito mais.
              </p>

              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Email</span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu email"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Senha</span>
                <input
                  type="password"
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua senha"
                />
              </div>

              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
              >
                Entrar
              </button>

              <button
                onClick={() => setLoginModal(false)}
                className="w-full text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[320px] space-y-4">
            <h2 className="font-bold text-lg">Confirmar exclusão da conta</h2>
            {!emailInput ? (
              <>
                <p>
                  Tem certeza que deseja eliminar sua conta? Digite{" "}
                  <strong>SIM</strong> para continuar.
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Digite SIM"
                />
                <button
                  onClick={() =>
                    confirmText.toUpperCase() === "SIM"
                      ? setEmailInput(user.email)
                      : setDeleteMessage(
                          "Você deve digitar 'SIM' para continuar.",
                        )
                  }
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Confirmar
                </button>
              </>
            ) : (
              <>
                <p>Digite seu email e senha para confirmar a exclusão:</p>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={senhaInput}
                  onChange={(e) => setSenhaInput(e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Senha"
                />
                <button
                  onClick={confirmDelete}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Confirmar
                </button>
              </>
            )}
            {deleteMessage && (
              <p className="text-sm text-red-600">{deleteMessage}</p>
            )}
            <button
              onClick={() => setDeleteModal(false)}
              className="w-full text-gray-700 hover:text-gray-900 font-medium"
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
    {label} {loading && <Loader />}
  </Link>
);

const MobileLink = ({
  label,
  href,
  loading,
  onClick,
}: {
  label: string;
  href: string;
  loading?: boolean;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-0 focus-visible:outline-none"
  >
    {label} {loading && <Loader />}
  </Link>
);

const Loader = () => (
  <span className="inline-block w-3 h-3 border-[2px] border-gray-400 border-t-transparent rounded-full animate-spin" />
);
