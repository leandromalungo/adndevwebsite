"use client";

/**
 * Navbar: componente de navegação global do site.
 * 
 * FRONTEND: Apenas exibe dados e envia requisições.
 * BACKEND (NextAuth): Valida toda autenticação.
 * BACKEND (Cloud Functions): Valida e persiste dados do perfil.
 * 
 * - Exibe logotipo, links de navegação e menu do usuário
 * - Gerencia estado local para UI (menu móvel, dropdowns, modals)
 * - Lê dados de sessão do backend via NextAuth
 * - Foto do Google é exibida no ícone de perfil quando disponível
 */
import { Menu, X, User, CreditCard, Loader2, CheckCircle2, AlertTriangle, Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

// ───────────── Dados de áreas de TI ─────────────
const IT_AREAS: Record<string, string[]> = {
  "Desenvolvimento de Software": [
    "Desenvolvedor Front-end", "Desenvolvedor Back-end", "Desenvolvedor Full Stack",
    "Desenvolvedor Mobile", "Desenvolvedor Desktop", "Desenvolvedor de Jogos",
    "Engenheiro de Software", "Software Architect", "QA Engineer", "Test Automation Engineer",
  ],
  "Cibersegurança": [
    "Analista de Segurança", "Pentester (Ethical Hacker)", "Security Engineer",
    "SOC Analyst", "Especialista em Resposta a Incidentes", "Analista Forense Digital",
    "GRC (Governança, Risco e Compliance)", "Security Architect", "Red Team", "Blue Team",
  ],
  "Redes e Infraestrutura": [
    "Administrador de Redes", "Network Engineer", "Técnico de Redes",
    "Especialista em Firewall", "Engenheiro de Infraestrutura", "NOC Analyst",
    "Administrador de Sistemas", "DevOps Engineer",
  ],
  "Cloud Computing": [
    "Cloud Engineer", "Cloud Architect", "Cloud Administrator", "DevOps Cloud",
    "Site Reliability Engineer (SRE)", "Especialista AWS", "Especialista Azure", "Especialista Google Cloud",
  ],
  "Ciência de Dados e Inteligência Artificial": [
    "Data Analyst", "Data Scientist", "Machine Learning Engineer", "AI Engineer",
    "Data Engineer", "BI Analyst", "Especialista em Big Data",
  ],
  "Suporte Técnico e Help Desk": [
    "Técnico de Suporte", "Help Desk Nível 1", "Help Desk Nível 2",
    "Help Desk Nível 3", "Field Support", "Técnico de Hardware",
  ],
  "Gestão e Governança de TI": [
    "IT Manager", "CIO", "CTO", "Product Manager", "Project Manager",
    "Scrum Master", "IT Auditor", "Analista de Processos",
  ],
  "UX/UI e Design Digital": [
    "UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer",
  ],
  "Banco de Dados": [
    "DBA", "Database Engineer", "Database Administrator", "Especialista SQL", "Especialista NoSQL",
  ],
  "Automação e RPA": [
    "RPA Developer", "Automation Engineer", "QA Automation", "Especialista em Processos Automatizados",
  ],
  "Blockchain e Web3": [
    "Blockchain Developer", "Smart Contract Developer", "Web3 Developer", "Especialista em Criptografia",
  ],
  "IoT (Internet das Coisas)": [
    "IoT Engineer", "Embedded Systems Developer", "Firmware Developer", "Especialista em Sistemas Embarcados",
  ],
};

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoggedIn = status === "authenticated";

  // Estados locais do componente
  const [openMenu, setOpenMenu] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  // Dados do perfil (preenchidos pela sessão / backend)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("Angola");
  const [telegram, setTelegram] = useState("");
  const [itArea, setItArea] = useState("");
  const [itRole, setItRole] = useState("");
  // Notificações — todas a false por defeito.
  // Apenas são marcadas após o backend (getProfile) confirmar as escolhas do utilizador.
  const [notificacoes, setNotificacoes] = useState<Record<string, boolean>>({
    Eventos: false,
    Comunidade: false,
    "Mulheres na T.I": false,
    Cursos: false,
    "Bolsas de estudo": false,
    Startups: false,
    "Inteligência Artificial": false,
  });

  // Estados de save
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Estados do carregamento do perfil do backend
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  // Foto de perfil: Google OAuth ou URL do Firestore
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Estados de assinatura inline
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [subLoading, setSubLoading] = useState(false);
  const [subChecked, setSubChecked] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Painel de login
  const [loginModal, setLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Preenche nome e email da sessão NextAuth (dados básicos do Google)
  // Inicializa foto de perfil a partir da sessão NextAuth (Google OAuth)
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      // Usa a foto do Google OAuth se disponível
      if ((user as any)?.image) {
        setProfilePhoto((user as any).image);
      }
    }
  }, [user]);

  // Carrega perfil completo do backend quando o dropdown é aberto pela primeira vez
  // TODA a lógica de leitura de dados está no backend — o frontend apenas ouve
  useEffect(() => {
    if (userDropdown && isLoggedIn && !profileLoaded && !profileLoading) {
      setProfileLoading(true);
      import("@/lib/cloud-functions-client").then(({ getProfile }) => {
        getProfile()
          .then((res) => {
            if (res.success && res.profile) {
              const p = res.profile;
              if (p.name) setName(p.name);
              if (p.email) setEmail(p.email);
              if (p.country) setPais(p.country);
              if (p.telegram) setTelegram(p.telegram);
              if (p.itArea) setItArea(p.itArea);
              if (p.itRole) setItRole(p.itRole);
              // Foto do backend substitui se existir (pode ser foto personalizada)
              if (p.photoURL) setProfilePhoto(p.photoURL);
              // Mapeia o array de alerts do backend para o Record de notificações
              if (Array.isArray(p.alerts) && p.alerts.length > 0) {
                const ALERT_LABELS: Record<string, string> = {
                  events: "Eventos",
                  community: "Comunidade",
                  wtm: "Mulheres na T.I",
                  roadmaps: "Cursos",
                  bolsas: "Bolsas de estudo",
                  startups: "Startups",
                  ia: "Inteligência Artificial",
                };
                setNotificacoes(prev => {
                  const updated = { ...prev };
                  // Reset all to false first
                  Object.keys(updated).forEach(k => { updated[k] = false; });
                  // Enable only the ones returned by backend
                  p.alerts.forEach((alertId: string) => {
                    const label = ALERT_LABELS[alertId];
                    if (label && label in updated) updated[label] = true;
                  });
                  return updated;
                });
              }
              setProfileLoaded(true);
            }
          })
          .catch(() => {
            // Erro silencioso — mantém os dados da sessão NextAuth
          })
          .finally(() => {
            setProfileLoading(false);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDropdown, isLoggedIn]);

  // Fechar dropdown ao clicar fora
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

  const closeMobileMenu = () => setOpenMenu(false);

  const handleNotifChange = (key: string) => {
    setNotificacoes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  /**
   * Salva o perfil via Cloud Function `updateProfile`
   * BACKEND valida e persiste — frontend apenas exibe feedback
   */
  const handleSave = async () => {
    setSaveLoading(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      // Converte o Record de notificações de label para IDs do backend
      const ALERT_IDS: Record<string, string> = {
        "Eventos": "events",
        "Comunidade": "community",
        "Mulheres na T.I": "wtm",
        "Cursos": "roadmaps",
        "Bolsas de estudo": "bolsas",
        "Startups": "startups",
        "Inteligência Artificial": "ia",
      };
      const alertIds = Object.entries(notificacoes)
        .filter(([, active]) => active)
        .map(([label]) => ALERT_IDS[label])
        .filter(Boolean);

      const { updateProfile } = await import("@/lib/cloud-functions-client");
      const result = await updateProfile({
        name: name.trim(),
        telegram: telegram.trim(),
        country: pais,
        itArea,
        itRole,
        alerts: alertIds,
      });
      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(result.message || "Erro ao salvar. Tente novamente.");
        setTimeout(() => setSaveError(""), 3000);
      }
    } catch (err: any) {
      // Mostra mensagem amigável — nunca expõe detalhes internos
      setSaveError("Não foi possível salvar. Verifique a sua conexão.");
      setTimeout(() => setSaveError(""), 3000);
    } finally {
      setSaveLoading(false);
    }
  };

  /**
   * Verifica assinatura via Cloud Function
   */
  const handleCheckSubscription = async () => {
    setSubLoading(true);
    setSubChecked(false);
    try {
      const { getSubscriptionStatus } = await import("@/lib/cloud-functions-client");
      const res = await getSubscriptionStatus();
      if (res.success && res.subscription) {
        setSubStatus(res.subscription.status);
      } else {
        setSubStatus("none");
      }
    } catch {
      setSubStatus("error");
    } finally {
      setSubLoading(false);
      setSubChecked(true);
    }
  };

  const handleLogout = async () => {
    try {
      if (typeof signOut === "function") {
        await signOut({ redirect: false });
      }
      setOpenMenu(false);
      setUserDropdown(false);
    } catch (error) {
      console.error("Falha ao desligar sessão.", error);
    }
  };

  const [deleteLoading, setDeleteLoading] = useState(false);

  /**
   * Elimina a conta do utilizador via Cloud Function.
   * BACKEND: valida identidade e elimina dados. Frontend apenas envia o pedido.
   */
  const confirmDelete = async () => {
    if (confirmText.toUpperCase() !== "SIM") {
      setDeleteMessage("Você deve digitar 'SIM' para continuar.");
      setTimeout(() => setDeleteMessage(""), 3000);
      return;
    }
    const sanitizedEmailInput = emailInput.trim().toLowerCase();
    if (!sanitizedEmailInput || sanitizedEmailInput !== (user?.email || "").toLowerCase()) {
      setDeleteMessage("Email incorrecto.");
      setTimeout(() => setDeleteMessage(""), 3000);
      return;
    }
    setDeleteLoading(true);
    setDeleteMessage("");
    try {
      const { deleteAccountOnPaymentFailure } = await import("@/lib/cloud-functions-client");
      await deleteAccountOnPaymentFailure();
      setDeleteMessage("Conta eliminada. A encerrar sessão...");
      setTimeout(async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
      }, 1500);
    } catch (err: any) {
      setDeleteMessage("Erro ao eliminar conta. Tente novamente.");
      setTimeout(() => setDeleteMessage(""), 4000);
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Login com email/password via NextAuth
   * BACKEND: Valida credenciais e cria sessão.
   */
  const handleLogin = async () => {
    setLoginError("");
    if (!loginEmail || !loginSenha) {
      setLoginError("Preencha todos os campos.");
      setTimeout(() => setLoginError(""), 3000);
      return;
    }
    setLoginLoading(true);
    try {
      const result = await signIn("credentials", {
        email: loginEmail,
        password: loginSenha,
        redirect: false,
      });
      if (result?.error) {
        setLoginError("Email ou senha incorrectos.");
        setTimeout(() => setLoginError(""), 4000);
      } else if (result?.ok) {
        setLoginModal(false);
        setLoginEmail("");
        setLoginSenha("");
      }
    } catch {
      setLoginError("Erro ao fazer login. Tente novamente.");
      setTimeout(() => setLoginError(""), 4000);
    } finally {
      setLoginLoading(false);
    }
  };

  // Trava o scroll quando o modal de login está aberto
  useEffect(() => {
    document.body.style.overflow = loginModal ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [loginModal]);

  // ─── Helpers de cor / texto do estado de assinatura ───
  const subStatusColor = () => {
    switch (subStatus) {
      case "active": return "text-green-600";
      case "pending": return "text-yellow-500";
      case "none": return "text-gray-500";
      default: return "text-red-500";
    }
  };
  const subStatusLabel = () => {
    switch (subStatus) {
      case "active": return "✅ Ativa";
      case "pending": return "⏳ Pendente de pagamento";
      case "none": return "Sem assinatura";
      default: return "Erro ao verificar";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="focus:outline-none focus:ring-0 focus-visible:outline-none">
          <Image
            src="/logoNavbar.png"
            alt="ADN Developer Logo"
            width={60}
            height={40}
            className="cursor-pointer object-contain"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-bold">
          <NavLink label="Eventos" href="/events" loading={loadingLink === "/events"} onClick={() => setLoadingLink("/events")} />
          <NavLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => setLoadingLink("/community")} />
          <NavLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => setLoadingLink("/wtm")} />
          <NavLink label="Cursos" href="/cursos" loading={loadingLink === "/cursos"} onClick={() => setLoadingLink("/cursos")} />
          <NavLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => setLoadingLink("/bolsas")} />
          <NavLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => setLoadingLink("/startups")} />
          <NavLink label="Inteligência Artificial" href="/ia" loading={loadingLink === "/ia"} onClick={() => setLoadingLink("/ia")} />
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Botão de perfil — foto do utilizador ou ícone padrão */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setLoginModal(true);
              } else {
                setUserDropdown(!userDropdown);
              }
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
            aria-label="Perfil do utilizador"
          >
            {isLoggedIn && profilePhoto ? (
              <img
                src={profilePhoto}
                alt={user?.name || "Foto de perfil"}
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                referrerPolicy="no-referrer"
                onError={() => setProfilePhoto(null)}
              />
            ) : (
              <User className={`w-6 h-6 ${isLoggedIn ? "text-blue-600" : "text-gray-600"}`} />
            )}
          </button>

          {/* Dropdown do utilizador */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-12 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 transition-all duration-300 transform origin-top-right
              ${userDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            {/* Cabeçalho do perfil */}
            <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100 flex items-center gap-3">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={user?.name || "Foto de perfil"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                  onError={() => setProfilePhoto(null)}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{user?.name || "Utilizador"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Botão Configurações de Perfil */}
            <button
              onClick={() => setConfigOpen(!configOpen)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left w-full font-medium flex items-center justify-between"
            >
              <span>Configurações do Perfil</span>
              <span className="text-gray-400 text-xs">{configOpen ? "▲" : "▼"}</span>
            </button>

            {/* Painel de Configurações */}
            {configOpen && (
              <div className="border-t border-gray-100 max-h-[60vh] overflow-y-auto">
                {profileLoading ? (
                  <div className="flex items-center justify-center py-8 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span className="text-sm">A carregar perfil...</span>
                  </div>
                ) : (
                  <div className="px-4 py-3 space-y-3">

                    {/* Nome */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nome</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
                        placeholder="Nome completo"
                        maxLength={100}
                      />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full border border-gray-100 px-2 py-1.5 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      />
                    </div>

                    {/* País */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">País</label>
                      <select
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
                      >
                        <option>Angola</option>
                        <option>Portugal</option>
                        <option>Brasil</option>
                        <option>Mozambique</option>
                        <option>Cabo Verde</option>
                        <option>Guiné-Bissau</option>
                      </select>
                    </div>

                    {/* Telegram */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Telegram</label>
                      <input
                        type="text"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
                        placeholder="@seuusuario"
                        maxLength={50}
                      />
                    </div>

                    {/* Área de TI */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Área de atuação</label>
                      <select
                        value={itArea}
                        onChange={(e) => { setItArea(e.target.value); setItRole(""); }}
                        className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition"
                      >
                        <option value="">Selecione uma área</option>
                        {Object.keys(IT_AREAS).map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    {/* Função dentro da área */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Função</label>
                      <select
                        value={itRole}
                        onChange={(e) => setItRole(e.target.value)}
                        disabled={!itArea}
                        className="w-full border border-gray-200 px-2 py-1.5 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{itArea ? "Selecione uma função" : "Escolha a área primeiro"}</option>
                        {itArea && IT_AREAS[itArea].map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    {/* Notificações */}
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Notificações</span>
                      <div className="space-y-1">
                        {Object.keys(notificacoes).map((key) => (
                          <label key={key} className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificacoes[key]}
                              onChange={() => handleNotifChange(key)}
                              className="rounded"
                            />
                            {key}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Feedback de save */}
                    {saveSuccess && (
                      <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Perfil actualizado!
                      </div>
                    )}
                    {saveError && (
                      <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" /> {saveError}
                      </div>
                    )}

                    {/* Botão Salvar */}
                    <button
                      onClick={handleSave}
                      disabled={saveLoading}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
                    >
                      {saveLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      {saveLoading ? "A salvar..." : "Salvar perfil"}
                    </button>

                    {/* Separador */}
                    <div className="border-t border-gray-100 pt-2">
                      <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Assinatura</span>

                      {/* Verificar Assinatura */}
                      <button
                        onClick={handleCheckSubscription}
                        disabled={subLoading}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        {subLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                        {subLoading ? "A verificar..." : "Verificar Assinatura"}
                      </button>

                      {/* Resultado inline */}
                      {subChecked && (
                        <div className="mt-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                          <p className={`text-xs font-bold ${subStatusColor()}`}>{subStatusLabel()}</p>
                          {subStatus === "none" && (
                            <Link
                              href="/assinatura"
                              onClick={() => setUserDropdown(false)}
                              className="mt-1.5 block text-center text-xs text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-2"
                            >
                              Assinar agora
                            </Link>
                          )}
                          {subStatus === "pending" && (
                            <p className="text-xs text-gray-500 mt-1">Aguarda confirmação do pagamento.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Eliminar conta */}
                    <button
                      className="w-full text-left text-red-500 hover:text-red-700 font-medium text-xs"
                      onClick={() => setDeleteModal(true)}
                    >
                      Eliminar conta
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sair da conta */}
            <div className="border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left w-full font-medium"
              >
                Sair da conta
              </button>
            </div>
          </div>

          {/* Botão mobile */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition"
          >
            {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${openMenu ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 space-y-2 font-bold">
          <MobileLink label="Eventos" href="/events" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Comunidades" href="/community" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Mulheres na T.I" href="/wtm" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Cursos" href="/cursos" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Bolsas de estudo" href="/bolsas" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Startups" href="/startups" onClick={() => { closeMobileMenu(); }} />
          <MobileLink label="Inteligência Artificial" href="/ia" onClick={() => { closeMobileMenu(); }} />
        </div>
      </div>

      {/* Modal de login */}
      {loginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-[700px] h-[500px] flex shadow-lg relative">
            {/* Lado da Imagem */}
            <div className="hidden md:flex md:w-1/2 relative bg-gray-200">
              <Image src="/api/images/login-bg" alt="Login Image" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end text-white">
                <h2 className="text-3xl font-bold mb-1">Bem-vindo de Volta!</h2>
                <p className="text-sm">Acesse conteúdos exclusivos e fique por dentro das últimas tendências em tecnologia.</p>
              </div>
            </div>

            {/* Lado do Formulário */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-3">
              <h2 className="font-bold text-2xl text-gray-800 uppercase mb-1">Entre com sua conta</h2>
              <p className="text-gray-600 text-sm mb-2">
                Entre com sua conta de assinante para teres acesso aos seus artigos premium, tutoriais e novidades em tecnologia.
              </p>

              <div className="flex flex-col mb-2">
                <span className="text-gray-600 text-sm mb-1 uppercase font-bold text-[10px]">Email</span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
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
                  onChange={(e) => { setLoginSenha(e.target.value); setLoginError(""); }}
                  className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Digite sua senha"
                  maxLength={100}
                />
              </div>

              {loginError && <p className="text-xs text-red-600 mb-2 font-medium">{loginError}</p>}

              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-bold mb-2 flex items-center justify-center gap-2"
              >
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-3 text-xs text-gray-400 font-bold uppercase">ou</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full bg-white border border-gray-300 text-gray-800 py-2.5 rounded-lg hover:bg-gray-50 transition font-bold mb-4 flex items-center justify-center gap-2 shadow-sm"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                Entrar com Google
              </button>

              <button onClick={() => setLoginModal(false)} className="w-full text-gray-500 hover:text-gray-900 text-sm font-medium">
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-[320px] space-y-4 shadow-2xl">
            <h2 className="font-bold text-lg">Eliminar conta</h2>
            {!emailInput ? (
              <>
                <p className="text-sm text-gray-600">
                  Esta ação é <strong>irreversível</strong>. Digite <strong>SIM</strong> para continuar.
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
                      : setDeleteMessage("Você deve digitar 'SIM' para continuar.")
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
                  disabled={deleteLoading}
                />
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="w-full bg-red-600 text-white py-2 rounded font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {deleteLoading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> A eliminar...</>
                    : "Confirmar Exclusão"}
                </button>
              </>
            )}
            {deleteMessage && (
              <p className={`text-xs font-bold ${deleteMessage.startsWith("Conta eliminada") ? "text-green-600" : "text-red-600"}`}>
                {deleteMessage}
              </p>
            )}
            {!deleteLoading && (
              <button
                onClick={() => { setDeleteModal(false); setDeleteMessage(""); setConfirmText(""); setEmailInput(""); }}
                className="w-full text-gray-500 hover:text-gray-900 font-medium text-sm"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* Componentes auxiliares */
const NavLink = ({
  label, href, loading, onClick,
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
    {label} {loading && <Loader2 className="w-3 h-3 animate-spin" />}
  </Link>
);

const MobileLink = ({
  label, href, onClick,
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
