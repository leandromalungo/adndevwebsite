"use client";
/**
 * Navbar: Componente de navegação global que inclui gestão de autenticação, menus e perfil de utilizador.
 */
import {
  Menu,
  X,
  Search,
  User as UserIcon,
  Loader2,
  CreditCard,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Users, LogOut, Calendar, Map, GraduationCap, Rocket, Code
} from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { registerUser } from "@/app/actions/auth";
import { UserLoginSchema, UserRegistrationSchema } from "@/lib/schemas";

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
    className="block px-3 py-2 text-base font-semibold text-gray-700 rounded-lg hover:text-violet-700 hover:bg-violet-50 transition-colors"
  >
    {label}
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

  const [openMenu, setOpenMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = loginModal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loginModal]);

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
                  <img src="/logoNavbar.png" alt="Logo Adn Developer" className="h-14 w-auto object-contain" />
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

      {/* Welcome Modal */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="max-w-lg bg-white px-0 py-0 overflow-hidden">
          <div className="relative h-48 w-full">
            <img src="/welcome.jpg" alt="Bem-vindo" className="h-full w-full object-cover" />
          </div>
          <DialogHeader className="p-6 text-center">
            <DialogTitle>
              {welcomeMode === 'register' ? 'Conta criada com sucesso!' : `Bem-vindo${user?.name ? `, ${user.name}` : ''}!`}
            </DialogTitle>
            <DialogDescription>
              {welcomeMode === 'register' ? 'Sua conta foi criada. Não esqueça de preencher o perfil.' : 'Sessão iniciada com sucesso.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 px-6 pb-6 pt-2">
            <Link href="/profile" onClick={() => setShowWelcomeDialog(false)} className="w-full rounded-md bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 text-center">
              Ir para meu perfil
            </Link>
            <DialogClose className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Fechar
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Suspense fallback={null}>
        <AuthQueryHandler isLoggedIn={isLoggedIn} setLoginModal={setLoginModal} setIsRegistering={setIsRegistering} />
      </Suspense>

      {/* =============================================================
         Estrutura Principal do Header (Layout Baseado na Imagem)
         ============================================================= */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md text-gray-900 border-b border-gray-200/90 shadow-xs">
        <nav className="flex items-center justify-between px-3 sm:px-6 py-2.5 max-w-7xl mx-auto w-full gap-2 sm:gap-4">

          {/* 1. Ponta da Esquerda: Logotipo + Links Desktop */}
          <div className="flex items-center gap-5 xl:gap-7 shrink-0">
            <Link href="/" className="focus:outline-none flex items-center shrink-0" aria-label="Página Inicial">
              <Image
                src="/logoNavbar.png"
                alt="ADN Developer"
                width={130}
                height={38}
                className="h-7 sm:h-8 md:h-9 w-auto cursor-pointer object-contain"
                priority
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Links Desktop */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-5 font-semibold text-xs 2xl:text-sm">
              <Link href="/" className="text-gray-700 hover:text-violet-700 transition-colors">
                Explorar
              </Link>

              <Link href="/events" className="text-gray-700 hover:text-violet-700 transition-colors">
                Eventos
              </Link>

              <Link href="/bolsas" className="text-gray-700 hover:text-violet-700 transition-colors">
                Bolsas
              </Link>

              <Link href="/community" className="text-gray-700 hover:text-violet-700 transition-colors">
                Comunidades
              </Link>

              <Link href="/startups" className="text-gray-700 hover:text-violet-700 transition-colors">
                Startups
              </Link>

              <Link href="/roadmaps" className="text-gray-700 hover:text-violet-700 transition-colors">
                Roadmaps
              </Link>

              <Link href="/sobre" className="text-gray-700 hover:text-violet-700 transition-colors">
                Sobre
              </Link>
            </div>
          </div>

          {/* 2. Meio: Input de Pesquisa ("igualzinho a este da imagem", bem ajustado ao meio) */}
          <div className="flex-1 flex justify-center items-center min-w-0 max-w-[210px] min-[390px]:max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full flex items-center bg-white border border-gray-200/90 hover:border-gray-300 focus-within:border-gray-400 rounded-full h-9 sm:h-10 pl-3 sm:pl-3.5 pr-1 py-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 shrink-0" strokeWidth={1.9} />
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Buscar eventos..."
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-500 outline-none border-none focus:ring-0 p-0"
                />
              </div>
              <button
                type="submit"
                aria-label="Buscar eventos"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#18181b] hover:bg-black text-white flex items-center justify-center shrink-0 ml-1.5 transition-transform active:scale-95 focus:outline-none"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.2} />
              </button>
            </form>
          </div>

          {/* 3. Ponta da Direita: Perfil / Ações de Login + Botão Hambúrguer (2 linhas) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    setLoginModal(true);
                  } else {
                    setUserDropdown(!userDropdown);
                  }
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm font-semibold rounded-lg text-gray-700 hover:text-violet-700 hover:bg-gray-100/70 transition focus:outline-none"
                aria-label="Perfil"
              >
                {isLoggedIn && profilePhoto ? (
                  <img src={profilePhoto} alt="Foto" className="w-7 h-7 rounded-full object-cover border border-gray-300 shadow-xs" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="w-5 h-5 text-gray-700" />
                    <span className="hidden sm:inline text-xs font-semibold text-gray-700">{isLoggedIn ? "Conta" : "Entrar"}</span>
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

                    <button type="button" onClick={handleCopyShareLink} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors flex items-center gap-2.5">
                      <LinkIcon className="w-4 h-4 text-violet-600" />
                      <span>{shareLinkCopied ? "✓ Copiado!" : "Partilhar perfil"}</span>
                    </button>

                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <Users className="w-4 h-4 text-violet-600" />
                      <span>Contribuidores</span>
                    </Link>

                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                      <CreditCard className="w-4 h-4 text-violet-600" />
                      <span>Painel de assinatura</span>
                    </Link>

                    {/* Zona de Perigo / Sair */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Terminar sessão</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

            {/* Botão Hambúrguer (com duas linhas ao invés de três linhas) */}
            <button
              type="button"
              onClick={() => setOpenMenu(!openMenu)}
              className="p-1.5 sm:p-2 text-gray-700 hover:text-gray-950 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none flex items-center justify-center"
              aria-label={openMenu ? "Fechar menu" : "Abrir menu"}
            >
              {openMenu ? (
                <X className="w-5 h-5 text-gray-800" />
              ) : (
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
              )}
            </button>
          </div>
        </nav>

        {/* Menu Expandido Mobile */}
        {openMenu && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md shadow-xl z-[45] border-b border-gray-200 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto">

              {/* Links Principais Rápidos */}
              <div className="space-y-1.5">
                <MobileLink label="Explorar Oportunidades" href="/" onClick={closeMobileMenu} />
                <MobileLink label="Eventos & Meetups" href="/events" onClick={closeMobileMenu} />
                <MobileLink label="Bolsas de Estudo" href="/bolsas" onClick={closeMobileMenu} />
                <MobileLink label="Comunidades Tech" href="/community" onClick={closeMobileMenu} />
                <MobileLink label="Startups & Inovação" href="/startups" onClick={closeMobileMenu} />
                <MobileLink label="Roadmaps de Carreira" href="/roadmaps" onClick={closeMobileMenu} />
                <MobileLink label="Sobre Nós" href="/sobre" onClick={closeMobileMenu} />
              </div>

              {/* Divisor sutil */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-3">
                  Explorar Categorias
                </p>

                {/* Grid de Subcategorias para Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    href="/community"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <Users className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-sm font-medium">Comunidades</span>
                  </Link>

                  <Link
                    href="/events"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <Calendar className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-sm font-medium">Eventos</span>
                  </Link>

                  <Link
                    href="/roadmaps"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <Map className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-sm font-medium">RoadMaps</span>
                  </Link>

                  <Link
                    href="/bolsas"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <GraduationCap className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-sm font-medium">Formações</span>
                  </Link>

                  <Link
                    href="/startups"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition"
                  >
                    <Rocket className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="text-sm font-medium">Para Startups</span>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
