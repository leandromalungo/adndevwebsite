"use client";
/**
 * Navbar: Componente de navegação global que inclui gestão de autenticação, menus e perfil de utilizador.
 */
import { X, Search, Bell, User as UserIcon, Loader2, Heart, Info, Eye, EyeOff, Link as LinkIcon, Users, LogOut, Map, Rocket, Code, Compass, ChevronRight, Sliders, CheckCheck, Trophy } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { HeaderSearch } from "@/components/navigation/HeaderSearch";
import { registerUser } from "@/app/actions/auth";
import { UserLoginSchema, UserRegistrationSchema } from "@/lib/schemas";
import { useFavorites } from "@/components/favorites/FavoritesContext";
import { useNotifications } from "@/components/notifications/NotificationsContext";

/* =============================================================
   Componentes Auxiliares - Blocos reutilizáveis para links e handlers de autenticação
   ============================================================= */

function AuthQueryHandler({ setLoginModal, setIsRegistering, isLoggedIn }: any) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const authType = searchParams.get("auth");
    if (authType === "login" && !isLoggedIn) {
      setLoginModal(true);
      setIsRegistering(false);
    } else if (authType === "register" && !isLoggedIn) {
      setLoginModal(true);
      setIsRegistering(true);
    }
  }, [searchParams, isLoggedIn, setLoginModal, setIsRegistering]);

  return null;
}

const MobileNavLink = ({
  label,
  href,
  icon: Icon,
  isActive,
  badge,
  onClick,
}: {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  badge?: string;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
      isActive
        ? "bg-violet-50 text-violet-800 font-bold border border-violet-200/80 shadow-2xs"
        : "text-gray-700 hover:text-violet-700 hover:bg-gray-100/70"
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      {Icon && (
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors ${
            isActive
              ? "bg-violet-700 text-white shadow-xs"
              : "bg-gray-100 text-gray-600 group-hover:bg-violet-100 group-hover:text-violet-700"
          }`}
        >
          <Icon className="w-4 h-4" />
        </span>
      )}
      <span className="truncate">{label}</span>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      {badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
          {badge}
        </span>
      )}
      <ChevronRight
        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
          isActive ? "text-violet-700" : "text-gray-400 group-hover:text-violet-600"
        }`}
      />
    </div>
  </Link>
);

/* =============================================================
   Componente Principal Navbar - Gere o estado do menu, dropdowns e fluxos de login/registo
   ============================================================= */

const Navbar = () => {
  return <NavbarContent />;
};

const NavbarContent = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const { favoritesCount } = useFavorites();
  const { unreadCount, notifications, markAllAsRead, markAsRead } = useNotifications();

  const [openMenu, setOpenMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = headerSearch.trim();
    if (query) {
      router.push(`/events?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/events");
    }
  };

  // Novos estados para o funcionamento do Dropdown de Categorias
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Estado do painel de Login/Registo e controlo de modais
  const prevIsLoggedIn = useRef(false);
  const welcomeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const welcomeFromAction = useRef<'none' | 'login' | 'register'>('none');
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [welcomeMode, setWelcomeMode] = useState<'none' | 'login' | 'register'>('none');

  const [loginModal, setLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginNome, setLoginNome] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  // Sincronização de dados da sessão
  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
      setProfilePhoto(session.user.image || null);
    } else {
      setEmail("");
      setProfilePhoto(null);
    }
  }, [session]);

  const openWelcomeDialog = (mode: 'login' | 'register') => {
    if (welcomeTimerRef.current) {
      clearTimeout(welcomeTimerRef.current);
    }

    welcomeFromAction.current = mode;
    setWelcomeMode(mode);
    setShowWelcomeDialog(true);

    welcomeTimerRef.current = setTimeout(() => {
      setShowWelcomeDialog(false);
      setWelcomeMode('none');
      welcomeFromAction.current = 'none';
    }, 4000);
  };

  useEffect(() => {
    const isLoggedInNow = !!session;
    prevIsLoggedIn.current = isLoggedInNow;
  }, [session, pathname]);

  useEffect(() => {
    if (pathname !== '/' && showWelcomeDialog) {
      setShowWelcomeDialog(false);
    }
  }, [pathname, showWelcomeDialog]);

  useEffect(() => {
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    if (searchParams.get('verified') === 'true') {
      setLoginModal(true);
      setIsRegistering(false);
      setLoginSuccess('Email verificado com sucesso! Agora pode fazer login.');
      setLoginError('');
      window.history.replaceState({}, document.title, window.location.pathname);
      const timer = setTimeout(() => setLoginSuccess(''), 5000);
      return () => clearTimeout(timer);
    }

    const errorParam = searchParams.get('error');
    if (errorParam) {
      setLoginModal(true);
      setIsRegistering(false);
      setLoginError(`${decodeURIComponent(errorParam)}`);
      setLoginSuccess('');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Fecha os dropdowns (Utilizador e Categorias) ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => setOpenMenu(false);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    await signOut({ callbackUrl: "/" });
    setOpenMenu(false);
    setUserDropdown(false);
  };

  const handleCopyShareLink = async () => {
    if (!user?.id || typeof window === "undefined") return;

    try {
      const username = (user as any)?.username || user?.name;
      if (!username) {
        alert("Por favor, configure um nome de utilizador no seu perfil antes de partilhar.");
        return;
      }
      const shareLink = `${window.location.origin}/u/${encodeURIComponent(username.replace(/\s+/g, "").toLowerCase())}`;
      await navigator.clipboard.writeText(shareLink);
      setShareLinkCopied(true);
      setTimeout(() => setShareLinkCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
      alert("Erro ao copiar link para a área de transferência.");
    }
  };

  const handleLogin = async () => {
    const emailStr = loginEmail.trim();
    const passwordStr = loginSenha.trim();

    if (!emailStr || !passwordStr) {
      setLoginError("Preencha todos os campos.");
      return;
    }

    const validation = UserLoginSchema.safeParse({ email: emailStr, password: passwordStr });
    if (!validation.success) {
      setLoginError(validation.error.errors[0].message);
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: emailStr,
      password: passwordStr,
    });

    setLoginLoading(false);

    if (res?.error) {
      setLoginError(res.error);
    } else {
      setLoginModal(false);
      setLoginEmail("");
      setLoginSenha("");
      setIsRegistering(false);
    }
  };

  const handleRegister = async () => {
    const name = loginNome.trim();
    const emailStr = loginEmail.trim();
    const passwordStr = loginSenha.trim();

    if (!emailStr || !passwordStr || !name) {
      setLoginError("Preencha todos os campos.");
      return;
    }

    const validation = UserRegistrationSchema.safeParse({ name, email: emailStr, password: passwordStr });
    if (!validation.success) {
      setLoginError(validation.error.errors[0].message);
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", emailStr);
    formData.append("password", passwordStr);

    const result = await registerUser(formData);

    if (result.error) {
      setLoginLoading(false);
      setLoginError(result.error);
    } else if (result.requiresEmailVerification) {
      setLoginLoading(false);
      setLoginModal(false);
      router.push(`/verificacao-pendente?email=${encodeURIComponent(emailStr)}`);
    } else {
      const res = await signIn("credentials", {
        redirect: false,
        email: emailStr,
        password: passwordStr,
      });

      setLoginLoading(false);

      if (res?.error) {
        setLoginError(res.error);
      } else {
        setLoginModal(false);
        setLoginEmail("");
        setLoginSenha("");
        setLoginNome("");
        setIsRegistering(false);
        if (pathname === '/' && typeof window !== 'undefined') {
          localStorage.setItem('welcomeShown', 'true');
          openWelcomeDialog('register');
        }
      }
    }
  };

  // Bloquear rolagem do corpo quando modal de login ou menu lateral móvel estiver aberto
  useEffect(() => {
    if (loginModal || openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loginModal, openMenu]);

  // Fechar menu mobile e dropdowns automaticamente quando a rota mudar
  useEffect(() => {
    setOpenMenu(false);
    setUserDropdown(false);
    setNotificationsOpen(false);
  }, [pathname]);

  // Fechar menu lateral ao pressionar a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(false);
        setUserDropdown(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fechar menu lateral automaticamente se a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col text-gray-800">
      {/* Login Modal */}
      {loginModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md overflow-y-auto">
          <div className="min-h-dvh flex items-center justify-center px-3 py-4 sm:px-4 sm:py-8">
            <div className="relative mx-auto flex w-full max-w-[750px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 md:h-auto md:min-h-[580px] md:max-h-[90vh] md:flex-row max-h-[calc(100dvh-2rem)]">
              <button
                type="button"
                onClick={() => setLoginModal(false)}
                className="absolute top-4 right-4 z-50 rounded-full bg-gray-100/80 p-2 text-gray-800 transition-colors hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative hidden bg-gray-200 md:flex md:w-1/2">
                <Image src="/images-login.jpg" alt="Login Image" fill className="object-cover" />
                <div className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                  <h2 className="mb-1 text-3xl font-bold">{isRegistering ? "Junte-se a Nós!" : "Bem-vindo!"}</h2>
                  <p className="text-sm">Ao hub que une as sector tecnológico lusofóno, acesse a sua conta e disfrute dos recursos disponíveis.</p>
                </div>
              </div>

              <div className="w-full overflow-y-auto p-5 sm:p-8 md:w-1/2 md:flex md:flex-col md:justify-center">
                <div className="flex justify-center mb-2">
                  <img src="/logo.png" alt="Logo Adn Developer" className="h-14 w-auto object-contain" />
                </div>

                <h2 className="mb-1 mt-2 text-2xl text-center font-bold uppercase text-gray-800">
                  {isRegistering ? "Crie uma conta" : "Inicie sessão"}
                </h2>
                <p className="mb-6 text-sm text-center text-gray-600">
                  {isRegistering
                    ? "Para acessar recursos exclusivos, personalizar seu perfil e participar da nossa comunidade."
                    : "Acesse sua conta para explorar nossos conteúdos exclusivos, personalizar seu perfil e participar da nossa comunidade."}
                </p>

                <div className="space-y-4">
                  <div className="space-y-3">
                    {isRegistering && (
                      <div className="flex flex-col">
                        <span className="mb-1 text-[10px] font-bold uppercase text-gray-600">Nome de usuario</span>
                        <input
                          type="text"
                          value={loginNome}
                          onChange={(e) => setLoginNome(e.target.value.replace(/\s+/g, "").toLowerCase())}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-16 text-sm outline-none focus:border-violet-700"
                          placeholder="Digite seu nome de usuario"
                          maxLength={100}
                        />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="mb-1 text-[10px] font-bold uppercase text-gray-600">Email</span>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 pr-16 text-sm outline-none focus:border-violet-700"
                        placeholder="Digite seu email"
                      />
                    </div>

                    <div className="flex flex-col relative">
                      <span className="mb-1 text-[10px] font-bold uppercase text-gray-600">Senha</span>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? "text" : "password"}
                          value={loginSenha}
                          onChange={(e) => setLoginSenha(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => {
                            setTimeout(() => setIsPasswordFocused(false), 200);
                          }}
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm outline-none focus:border-violet-700"
                          placeholder="Digite sua senha"
                        />
                        {(isPasswordFocused || loginSenha.length > 0) && (
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {loginSuccess && <p className="mb-2 text-xs font-medium text-green-600">{loginSuccess}</p>}
                  {loginError && <p className="mb-2 text-xs font-medium text-red-600">{loginError}</p>}

                  {!isRegistering && (
                    <div className="text-right -mt-1">
                      <Link href="/esqueci-password" onClick={() => setLoginModal(false)} className="text-xs text-violet-700 hover:underline">
                        Esqueci minha senha
                      </Link>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={isRegistering ? handleRegister : handleLogin}
                    disabled={loginLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 py-2.5 font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isRegistering ? "Criar Conta" : "Iniciar Sessão"}
                  </button>

                  <div className="flex flex-col items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(!isRegistering);
                        setLoginError("");
                        setLoginSuccess("");
                      }}
                      className="text-center text-sm font-medium"
                    >
                      {isRegistering ? (
                        <span className="text-gray-800">
                          Se já tens uma conta, <span className="text-violet-700 hover:underline">clique aqui</span>
                        </span>
                      ) : (
                        <span className="text-gray-800">
                          Para criar uma conta, <span className="text-violet-700 hover:underline">clique aqui</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =============================================================
         Estrutura Principal do Header (Layout Baseado na Imagem)
         ============================================================= */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md text-gray-900 border-b border-gray-200/90 shadow-xs">
        <nav className="flex items-center justify-between px-3 sm:px-6 py-2.5 max-w-7xl mx-auto w-full gap-2 sm:gap-4">

          {/* 1. Ponta da Esquerda: Logotipo + Links Desktop */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <Link href="/" className="focus:outline-none flex items-center shrink-0" aria-label="Página Inicial">
              <Image
                src="/logo.png"
                alt="ADN Developer"
                width={130}
                height={38}
                className="h-7 sm:h-8 md:h-9 w-auto cursor-pointer object-contain"
                priority
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Links Desktop - Apenas visíveis em telas maiores (desktop) */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 font-semibold text-xs xl:text-sm">
              <Link
                href="/startups"
                className={`transition-colors ${pathname.startsWith("/startups") ? "text-violet-700 font-bold" : "text-gray-700 hover:text-violet-700"}`}
              >
                Startups Lusofonas 
              </Link>
              <Link
                href="/roadmaps"
                className={`transition-colors ${pathname.startsWith("/roadmaps") ? "text-violet-700 font-bold" : "text-gray-700 hover:text-violet-700"}`}
              >
                RoadMaps
              </Link>
              <Link
                href="/ranking"
                className={`transition-colors ${pathname.toLowerCase().startsWith("/ranking") ? "text-violet-700 font-bold" : "text-gray-700 hover:text-violet-700"}`}
              >
                Ranking
              </Link>
             
            </div>
          </div>

          {/* 2. Meio: Input de Pesquisa ("igualzinho a este da imagem", com feedback em tempo real e busca segura no banco) */}
          <div className="flex-1 flex justify-center items-center min-w-0 max-w-[210px] min-[390px]:max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
            <HeaderSearch />
          </div>

          {/* 3. Ponta da Direita: Perfil / Ações de Login + Botão Hambúrguer (exclusivo para telas menores) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            
            {/* Sessão dos favoritos */}
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  setLoginModal(true);
                } else {
                  router.push("/favoritos");
                }
              }}
              className={`relative flex h-9 w-9 items-center justify-center sm:w-10 rounded-full transition-colors cursor-pointer ${
                pathname === "/favoritos"
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-rose-600 hover:bg-rose-50/60"
              }`}
              aria-label="Ver itens favoritos"
              title={isLoggedIn ? "Os meus favoritos" : "Inicie sessão para ver favoritos"}
            >
              <Heart
                className={`h-[18px] w-[18px] sm:h-5 sm:w-5 transition-transform ${
                  pathname === "/favoritos" || (isLoggedIn && favoritesCount > 0)
                    ? "text-rose-600"
                    : "text-gray-600"
                } ${pathname === "/favoritos" ? "fill-current" : ""}`}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              {isLoggedIn && favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </button>
            
            
            <div ref={notificationsRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    setLoginModal(true);
                  } else {
                    setNotificationsOpen((open) => !open);
                    setUserDropdown(false);
                  }
                }}
                className={`relative flex h-9 w-9 items-center justify-center sm:w-10 rounded-full transition-colors cursor-pointer ${
                  notificationsOpen || pathname.startsWith("/notificacoes")
                    ? "text-violet-700 bg-violet-50"
                    : "text-gray-600 hover:border-violet-200 hover:text-violet-700 hover:bg-gray-100/70"
                }`}
                aria-label="Notificações"
                aria-expanded={notificationsOpen}
                aria-controls="header-notifications"
                title={isLoggedIn ? "Notificações" : "Inicie sessão para ver notificações"}
              >
                <Bell className="h-[16px] w-[16px] sm:h-5 sm:w-5" strokeWidth={1.8} aria-hidden="true" />
                {isLoggedIn && unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-violet-700 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-75">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown de Pré-visualização de Notificações */}
              {notificationsOpen && isLoggedIn && (
                <div
                  id="header-notifications"
                  className="absolute right-0 top-full z-[60] mt-3 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150 origin-top-right"
                  role="status"
                >
                  {/* Cabeçalho */}
                  <div className="p-3.5 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">Notificações</span>
                      {unreadCount > 0 && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                          {unreadCount} novas
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        className="text-[11px] font-semibold text-violet-700 hover:text-violet-900 transition flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Marcar lidas</span>
                      </button>
                    )}
                  </div>

                  {/* Lista de Pré-visualização */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2">
                          <Bell className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">Ainda não tem notificações nas categorias ativas.</p>
                      </div>
                    ) : (
                      notifications.slice(0, 4).map((notif) => (
                        <Link
                          key={notif.id}
                          href={notif.link || "/notificacoes"}
                          onClick={() => {
                            setNotificationsOpen(false);
                            if (!notif.isRead) markAsRead(notif.id);
                          }}
                          className={`p-3.5 block transition-colors ${
                            notif.isRead ? "hover:bg-gray-50" : "bg-violet-50/40 hover:bg-violet-50/70"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-900 line-clamp-1">
                              {notif.title}
                            </span>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>

                  {/* Rodapé com atalho para a Central e para a Sessão de Escolha de Preferências */}
                  <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href="/notificacoes"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-violet-700 hover:text-violet-900 transition flex items-center gap-1"
                    >
                      <span>Ver todas</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/notificacoes?tab=preferencias"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-600 hover:text-violet-700 transition flex items-center gap-1"
                    >
                      <Sliders className="w-3 h-3 text-violet-600" />
                      <span>Preferências</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  if (!isLoggedIn) {
                    setLoginModal(true);
                  } else {
                    setUserDropdown(!userDropdown);
                  }
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm font-semibold rounded-lg text-gray-700 hover:text-violet-700 hover:bg-gray-100/70 transition focus:outline-none cursor-pointer"
                aria-label="Perfil"
              >
                {isLoggedIn && profilePhoto ? (
                  <img src={profilePhoto} alt="Foto" className="w-7 h-7 rounded-full object-cover border border-gray-300 shadow-xs" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="w-5 h-5 text-gray-700" />
                    <span className="hidden sm:inline text-xs font-semibold text-gray-700">{isLoggedIn ? "Conta" : "Iniciar Sessão"}</span>
                    <svg className="w-3 h-3 text-gray-500 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Menu Dropdown do Usuário Autenticado */}
              <div ref={dropdownRef} className="absolute right-0 top-full mt-2">
              {userDropdown && (
                <div className="w-80 max-w-[calc(100vw-2rem)] bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right max-[402px]:fixed max-[402px]:top-24 max-[402px]:left-1/2 max-[402px]:-translate-x-1/2">

                  {/* Cabeçalho do Dropdown */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Foto" className="w-10 h-10 rounded-full object-cover border-2 border-violet-200 shadow-xs" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-violet-700" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{(user as any)?.username || user?.name || "Utilizador"}</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>
                  </div>

                  {/* Links de Opções */}
                  <div className="py-2">
                    <Link href="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <UserIcon className="w-4 h-4 text-violet-600" />
                      <span>O meu perfil</span>
                    </Link>

                    <Link href="/favoritos" onClick={() => setUserDropdown(false)} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span>Os meus favoritos</span>
                      </div>
                      {favoritesCount > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          {favoritesCount}
                        </span>
                      )}
                    </Link>

                    <Link href="/notificacoes" onClick={() => setUserDropdown(false)} className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Bell className="w-4 h-4 text-violet-600" />
                        <span>Notificações</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700">
                          {unreadCount}
                        </span>
                      )}
                    </Link>

                    <Link href="/notificacoes?tab=preferencias" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <Sliders className="w-4 h-4 text-violet-600" />
                      <span>Preferências de alertas</span>
                    </Link>

                    <button type="button" onClick={handleCopyShareLink} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-2.5 cursor-pointer">
                      <LinkIcon className="w-4 h-4 text-violet-600" />
                      <span>{shareLinkCopied ? "Copiado!" : "Partilhar o link do perfil"}</span>
                    </button>

                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <Users className="w-4 h-4 text-violet-600" />
                      <span>Contribuidores</span>
                    </Link>

                    {/* Zona de Perigo / Sair */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        <span>Terminar sessão</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

            {/* Botão Hambúrguer - EXCLUSIVO PARA TELAS MENORES (lg:hidden, nunca visível em telas maiores) */}
            <button
              type="button"
              onClick={() => setOpenMenu(!openMenu)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-gray-950 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
              aria-label={openMenu ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              <svg
                className="w-5 h-5 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="8.5" x2="20" y2="8.5" />
                <line x1="4" y1="15.5" x2="20" y2="15.5" />
              </svg>
            </button>
          </div>   
           
        </nav>
      </header>

      {/* =============================================================
          MENU LATERAL (DRAWER) DIREITO - FORA DO HEADER (VIEWPORT REAL)
         ============================================================= */}
      {/* 1. Backdrop escuro com blur cobrindo a viewport inteira */}
      <div className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
          openMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* 2. Gaveta lateral direita com animação de slide-in suave e altura total da tela */}
      <aside
        className={`fixed inset-y-0 right-0 z-[100] w-[86vw] max-w-sm sm:max-w-md h-dvh min-h-dvh bg-white text-gray-900 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-gray-200 lg:hidden ${
          openMenu ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        style={{ backgroundColor: "#ffffff" }}
        aria-label="Menu de navegação móvel"
        aria-hidden={!openMenu}
      >
        {/* Topo do Drawer: Logo + Botão Fechar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 focus:outline-none"
          >
            <Image
              src="/logo.png"
              alt="ADN Developer"
              width={125}
              height={36}
              className="h-7 sm:h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Fechar menu lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com rolagem independente e fundo branco opaco */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5 bg-white">
          {/* Card de Usuário / Sessão no Mobile */}
          {isLoggedIn ? (
            <div className="p-3.5 rounded bg-violet-50 border border-violet-100 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Foto"
                    className="w-10 h-10 rounded-full object-cover border-2 border-violet-300 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                    onError={() => setProfilePhoto(null)}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-violet-200 text-violet-800 flex items-center justify-center font-bold text-sm shrink-0">
                    {((user as any)?.username || user?.name || "U").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {(user as any)?.username || user?.name || "Utilizador"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={closeMobileMenu}
                className="px-3 py-1.5 rounded bg-violet-700 text-white text-xs font-semibold hover:bg-violet-800 transition shrink-0"
              >
                Perfil
              </Link>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-violet-600" />
                <p className="text-xs font-bold uppercase tracking-wider text-violet-800">
                  Comunidade Lusófona
                </p>
              </div>
              <p className="text-xs text-gray-600 mb-3.5 leading-relaxed">
                Inicie sessão para pesquisar, aceder aos detalhes das oportunidades e conectar-se.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setLoginModal(true);
                }}
                className="w-full py-2.5 px-4 rounded bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <UserIcon className="w-4 h-4" />
                <span>Entrar ou Criar Conta</span>
              </button>
            </div>
          )}

          {/* Links Principais de Navegação */}
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Navegação
            </p>

            <MobileNavLink
              label="Startups & Inovação"
              href="/startups"
              icon={Rocket}
              isActive={pathname.startsWith("/startups")}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Formações & Roadmaps"
              href="/roadmaps"
              icon={Map}
              isActive={pathname.startsWith("/roadmaps")}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Ranking de Tecnologias"
              href="/ranking"
              icon={Trophy}
              isActive={pathname.toLowerCase().startsWith("/ranking")}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Os Meus Favoritos"
              href="/favoritos"
              icon={Heart}
              isActive={pathname.startsWith("/favoritos")}
              badge={favoritesCount > 0 ? String(favoritesCount) : undefined}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Notificações & Alertas"
              href="/notificacoes"
              icon={Bell}
              isActive={pathname.startsWith("/notificacoes")}
              badge={unreadCount > 0 ? String(unreadCount) : undefined}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Pesquisar Conteúdo"
              href="/pesquisa"
              icon={Search}
              isActive={pathname.startsWith("/pesquisa")}
              onClick={closeMobileMenu}
            />

            <MobileNavLink
              label="Sobre Nós"
              href="/sobre"
              icon={Info}
              isActive={pathname.startsWith("/sobre")}
              onClick={closeMobileMenu}
            />
          </div>

          {/* Ações de perfil adicionais se autenticado */}
          {isLoggedIn && (
            <div className="pt-3 border-t border-gray-100 space-y-1">
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-violet-700 hover:bg-gray-100/70 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-600 shrink-0">
                    <LinkIcon className="w-4 h-4" />
                  </span>
                  <span>{shareLinkCopied ? "✓ Link copiado!" : "Partilhar perfil"}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
              >
                <span className="flex items-center justify-center w-8 h-8 text-red-600 shrink-0">
                  <LogOut className="w-4 h-4" />
                </span>
                <span>Terminar sessão</span>
              </button>
            </div>
          )}
        </div>

        {/* Rodapé do Drawer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <Link
              href="/termos-de-uso"
              onClick={closeMobileMenu}
              className="hover:text-violet-700 transition"
            >
              Termos de Uso
            </Link>
            <span>•</span>
            <Link
              href="/politicas-de-privacidade"
              onClick={closeMobileMenu}
              className="hover:text-violet-700 transition"
            >
              Privacidade
            </Link>
          </div>
          <p className="text-[11px] text-gray-400 text-center">
            ADN Developer &copy; {new Date().getFullYear()} • Lusofonia Tech
          </p>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
