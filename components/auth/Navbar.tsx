"use client";
/**
 * Navbar: Componente de navegação global que inclui gestão de autenticação, menus e perfil de utilizador.
 */
import {
  Menu,
  X,
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
    className="block px-3 py-2 text-base font-medium text-gray-300 rounded-lg hover:text-white hover:bg-gray-800 transition-colors"
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
      <header className="fixed top-0 w-full z-50 bg-[#111111] text-white">
        <nav className="grid grid-cols-3 items-center px-6 py-2 max-w-7xl mx-auto w-full">

          {/* 1. Bloco da Esquerda: Links Desktop */}
          <div className="hidden lg:flex items-center gap-5 font-semibold text-sm">
            <Link href="/" className="text-gray-300 hover:text-violet-400 transition-colors">
              Explorar
            </Link>

            <Link href="/events" className="text-gray-300 hover:text-violet-400 transition-colors">
              Eventos
            </Link>

            <Link href="/bolsas" className="text-gray-300 hover:text-violet-400 transition-colors">
              Bolsas
            </Link>

            <Link href="/community" className="text-gray-300 hover:text-violet-400 transition-colors">
              Comunidades
            </Link>

            <Link href="/startups" className="text-gray-300 hover:text-violet-400 transition-colors">
              Startups
            </Link>

            <Link href="/roadmaps" className="text-gray-300 hover:text-violet-400 transition-colors">
              Roadmaps
            </Link>

            <Link href="/sobre" className="text-gray-300 hover:text-violet-400 transition-colors">
              Sobre
            </Link>
          </div>

          {/* Botão Hambúrguer Mobile (Esquerda) */}
          <div className="flex lg:hidden items-center">
            <button type="button" onClick={() => setOpenMenu(!openMenu)} className="p-2 text-gray-300 hover:text-white">
              {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* 2. Bloco do Meio: Logotipo Centralizado */}
          <div className="flex justify-center justify-self-center">
            <Link href="/" className="focus:outline-none" aria-label="Página Inicial">
              <Image
                src="/logoNavbar.png"
                alt="Logo"
                width={90}
                height={40}
                className="w-auto h-7 cursor-pointer object-contain"
                priority
              />
            </Link>
          </div>

          {/* 3. Bloco da Direita: Perfil / Ações de Login */}
          <div className="flex items-center justify-end gap-4 relative">
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  setLoginModal(true);
                } else {
                  setUserDropdown(!userDropdown);
                }
              }}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition focus:outline-none"
              aria-label="Perfil"
            >
              {isLoggedIn && profilePhoto ? (
                <img src={profilePhoto} alt="Foto" className="w-6 h-6 rounded-full object-cover border border-gray-600" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
              ) : (
                <div className="flex items-center gap-1">
                  <UserIcon className="w-5 h-5" />
                  <svg className="w-3 h-3 opacity-70 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </button>

            {/* Menu Dropdown do Usuário Autenticado */}
            <div ref={dropdownRef} className="absolute right-0 top-full mt-2">
              {userDropdown && (
                <div className="w-80 max-w-[calc(100vw-2rem)] bg-[#1a1a1a] text-gray-200 border border-gray-800 shadow-2xl rounded-b-lg overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right max-[402px]:fixed max-[402px]:top-24 max-[402px]:left-1/2 max-[402px]:-translate-x-1/2">

                  {/* Cabeçalho do Dropdown */}
                  <div className="px-4 py-3 bg-[#222222] border-b border-gray-800 flex items-center gap-3">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Foto" className="w-10 h-10 rounded-full object-cover border-2 border-gray-700 shadow-sm" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-violet-950/50 border border-violet-800/50 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-violet-400" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{(user as any)?.username || user?.name || "Utilizador"}</p>
                      <p className="text-xs text-gray-400 truncate">{email}</p>
                    </div>
                  </div>

                  {/* Links de Opções */}
                  <div className="py-2">
                    <Link href="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-violet-700/20 hover:text-white transition-colors">
                      <UserIcon className="w-4 h-4 text-violet-500" />
                      <span>O meu perfil</span>
                    </Link>

                    <button type="button" onClick={handleCopyShareLink} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-violet-700/20 hover:text-white transition-colors flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-violet-500" />
                      <span>{shareLinkCopied ? "✓ Copiado!" : "Partilhar perfil"}</span>
                    </button>

                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-violet-700/20 hover:text-white transition-colors">
                      <Users className="w-4 h-4 text-violet-500" />
                      <span>Contribuidores</span>
                    </Link>

                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-violet-700/20 hover:text-white transition-colors">
                      <CreditCard className="w-4 h-4 text-violet-500" />
                      <span>Painel de assinatura</span>
                    </Link>

                    {/* Zona de Perigo / Sair */}
                    <div className="border-t border-gray-800 mt-2 pt-2">
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Terminar sessão</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Menu Expandido Mobile */}
        {openMenu && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#111111]/95 backdrop-blur-md shadow-2xl z-[45] border-b border-gray-800 animate-in slide-in-from-top duration-300">
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
              <div className="border-t border-gray-800/60 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 px-3">
                  Explorar Categorias
                </p>

                {/* Grid de Subcategorias para Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    href="/community"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800/40 text-gray-300 hover:text-white transition"
                  >
                    <Users className="w-4 h-4 text-violet-500 shrink-0" />
                    <span className="text-sm font-medium">Comunidades</span>
                  </Link>

                  <Link
                    href="/events"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800/40 text-gray-300 hover:text-white transition"
                  >
                    <Calendar className="w-4 h-4 text-violet-500 shrink-0" />
                    <span className="text-sm font-medium">Eventos</span>
                  </Link>

                  <Link
                    href="/roadmaps"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800/40 text-gray-300 hover:text-white transition"
                  >
                    <Map className="w-4 h-4 text-violet-500 shrink-0" />
                    <span className="text-sm font-medium">RoadMaps</span>
                  </Link>

                  <Link
                    href="/bolsas"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800/40 text-gray-300 hover:text-white transition"
                  >
                    <GraduationCap className="w-4 h-4 text-violet-500 shrink-0" />
                    <span className="text-sm font-medium">Formações</span>
                  </Link>

                  <Link
                    href="/startups"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-gray-800/40 text-gray-300 hover:text-white transition"
                  >
                    <Rocket className="w-4 h-4 text-violet-500 shrink-0" />
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
