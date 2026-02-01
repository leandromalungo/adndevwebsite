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
// - `UserType` descreve o shape do objeto de usuário usado pelo componente.
// - `mockUser` é um objeto simulado representando dados vindos do backend (nome, email, notificações, etc.).
// Estes são usados para preencher o dropdown e o modal de exclusão de conta.
type EstadoAssinatura = 'activo' | 'pendente' | 'desativada';
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
  estadoAssinatura: "activo", // "activo" | "pendente" | "desativada"
  senha: "123456", // senha simulada
};

const Navbar = () => {
  // Estados locais do componente:
  // - `openMenu`: controla a visibilidade do menu mobile.
  // - `loadingLink`: guarda a rota que está a carregar (para mostrar indicador de loading no link).
  // - `userDropdown`: abre/fecha o menu dropdown do usuário.
  // - `configOpen`: controla a área de configurações dentro do dropdown.
  // - `user`: objeto do usuário (pode ser substituído por dados vindos da API em produção).
  // - `unsavedChanges`: flag para indicar alterações não guardadas nas configurações.
  // - `deleteModal`: controla a exibição do modal de confirmação de exclusão de conta.
  // - `confirmText`, `emailInput`, `senhaInput`: inputs usados no fluxo de exclusão.
  // - `deleteMessage`: mensagem de erro/sucesso no processo de exclusão.
  // - `dropdownRef`: ref usada para detectar cliques fora do dropdown e assim fechá-lo.
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

  const closeMobileMenu = () => setOpenMenu(false);

  // Fecha o dropdown quando o usuário clica fora dele.
  // Este efeito adiciona um listener global para 'mousedown' e limpa na desmontagem.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
        setConfigOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Retorna classes de cor para o estado da assinatura (usado para destacar status no dropdown)
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo": return "text-green-600";
      case "pendente": return "text-yellow-500";
      case "desativada": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  // Atualiza um campo do objeto `user` e marca que há alterações não salvas.
  const handleUserChange = (field: string, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  // Alterna uma notificação específica (boolean) dentro do objeto `user.notificacoes`.
  // Usa uma cópia imutável do objeto anterior para manter previsibilidade.
  const handleNotifChange = (key: string) => {
    setUser(prev => ({
      ...prev,
      notificacoes: { ...prev.notificacoes, [key]: !prev.notificacoes[key] }
    }));
    setUnsavedChanges(true);
  };

  // Simula salvar as alterações (aqui você chamaria a API em produção).
  const handleSave = () => {
    console.log("Salvando alterações:", user);
    setUnsavedChanges(false);
  };

  // Simples placeholder para logout (substituir por lógica real em produção).
  const handleLogout = () => {
    console.log("Usuário saiu da conta");
  };

  // Inicia o fluxo de exclusão: limpa inputs e abre o modal.
  const handleDelete = () => {
    setDeleteMessage("");
    setConfirmText("");
    setEmailInput("");
    setSenhaInput("");
    setDeleteModal(true);
  };

  // Valida as entradas do modal e simula a eliminação da conta.
  // - Verifica se o usuário escreveu 'SIM' e se email/senha batem com os do mock.
  // - Em produção, aqui seria chamada à API de exclusão.
  const confirmDelete = () => {
    if (confirmText.toUpperCase() !== "SIM") {
      setDeleteMessage("Você deve digitar 'SIM' para continuar.");
      return;
    }
    if (emailInput !== user.email || senhaInput !== user.senha) {
      setDeleteMessage("Email ou senha incorretos.");
      return;
    }
    setDeleteMessage("Conta eliminada!");
    setTimeout(() => {
      setDeleteModal(false);
      console.log("Conta deletada");
      // Aqui você chamaria a API real de exclusão
    }, 1500);
  };
  // Retorno JSX do componente (estrutura principal):
  // - Topbar com logo e links (desktop)
  // - Botão e dropdown do usuário com configurações e ações (editar, logout, delete)
  // - Menu mobile (colapsável) para rotas principais
  // - Modal de confirmação de exclusão de conta
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="focus:outline-none focus:ring-0 focus-visible:outline-none">
          <Image src={logo} alt="Logo" width={60} height={60} className="cursor-pointer object-contain" priority />
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-bold">
          <NavLink label="Eventos" href="/events" loading={loadingLink === "/events"} onClick={() => setLoadingLink("/events")} />
          <NavLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => setLoadingLink("/community")} />
          <NavLink label="GameDev" href="/gamedev" loading={loadingLink === "/gamedev"} onClick={() => setLoadingLink("/gamedev")} /> 
          <NavLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => setLoadingLink("/wtm")} />
          <NavLink label="Cursos" href="/cursos" loading={loadingLink === "/cursos"} onClick={() => setLoadingLink("/cursos")} />
          <NavLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => setLoadingLink("/bolsas")} />
          <NavLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => setLoadingLink("/startups")} />  
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Botão do usuário que abre o dropdown */}
          <button
            onClick={() => setUserDropdown(!userDropdown)}
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dropdown do usuário: mostra estado da assinatura, configurações e logout */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-12 w-64 bg-white border border-gray-200 shadow-lg rounded-lg py-2 flex flex-col z-50 transition-all duration-300 transform origin-top-right
              ${userDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            {/* Estado da assinatura */}
            <div className="px-4 py-2 text-sm font-medium text-gray-700">
              Assinatura: <span className={getEstadoColor(user.estadoAssinatura)}>{user.estadoAssinatura}</span>
            </div>

            {/* Botão que alterna a área de configurações dentro do dropdown */}
            <button
              onClick={() => setConfigOpen(!configOpen)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full font-medium"
            >
              Configurações
            </button>

            {configOpen && (
              <div className="px-4 py-2 space-y-2 text-sm text-gray-700 border-t border-gray-200">
                {/* Campos editáveis: nome, email, país, telegram e notificações */}
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
                  {/* Lista de notificações (chaves dinamicamente do objeto `user.notificacoes`) */}
                  {Object.keys(user.notificacoes).map(key => (
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

                {/* Ação para iniciar fluxo de exclusão de conta */}
                <button
                  className="w-full text-left text-red-600 hover:text-red-800 font-medium"
                  onClick={handleDelete}
                >
                  Eliminar conta
                </button>

                {/* Botão de salvar aparece apenas quando há mudanças não salvas */}
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

            {/* Botão de logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left w-full font-medium"
            >
              Sair da conta
            </button>
          </div>

          {/* Botão mobile que abre/fecha o menu colapsável */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          openMenu ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-2 font-bold">
          {/* Links exibidos apenas no menu mobile */}
          <MobileLink label="Eventos" href="/events" loading={loadingLink === "/events"} onClick={() => { setLoadingLink("/events"); closeMobileMenu(); }} />
          <MobileLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => { setLoadingLink("/community"); closeMobileMenu(); }} />
          <MobileLink label="GameDev" href="/gamedev" loading={loadingLink === "/gamedev"} onClick={() => { setLoadingLink("/gamedev"); closeMobileMenu(); }} />
          <MobileLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => { setLoadingLink("/wtm"); closeMobileMenu(); }} />
          <MobileLink label="Cursos" href="/cursos" loading={loadingLink === "/cursos"} onClick={() => { setLoadingLink("/cursos"); closeMobileMenu(); }} />
          <MobileLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => { setLoadingLink("/bolsas"); closeMobileMenu(); }} />
          <MobileLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => { setLoadingLink("/startups"); closeMobileMenu(); }} /> 
        </div>
      </div>

      {/* Modal de exclusão */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[320px] space-y-4">
            <h2 className="font-bold text-lg">Confirmar exclusão da conta</h2>
            {!emailInput ? (
              <>
                <p>Tem certeza que deseja eliminar sua conta? Digite <strong>SIM</strong> para continuar.</p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full border p-1 rounded"
                  placeholder="Digite SIM"
                />
                <button
                  onClick={() => confirmText.toUpperCase() === "SIM" ? setEmailInput(user.email) : setDeleteMessage("Você deve digitar 'SIM' para continuar.")}
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
            {deleteMessage && <p className="text-sm text-red-600">{deleteMessage}</p>}
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

/* Componentes auxiliares: - NavLink: link para desktop com loading icon - MobileLink: link para mobile - Loader: indicador simples de loading */
const NavLink = ({ label, href, loading, onClick }: { label: string; href: string; loading?: boolean; onClick?: () => void }) => (
  <Link href={href} onClick={onClick} className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition focus:outline-none focus:ring-0 focus-visible:outline-none">
    {label} {loading && <Loader />}
  </Link>
);

const MobileLink = ({ label, href, loading, onClick }: { label: string; href: string; loading?: boolean; onClick: () => void }) => (
  <Link href={href} onClick={onClick} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-0 focus-visible:outline-none">
    {label} {loading && <Loader />}
  </Link>
);

const Loader = () => (
  <span className="inline-block w-3 h-3 border-[2px] border-gray-400 border-t-transparent rounded-full animate-spin" />
);
