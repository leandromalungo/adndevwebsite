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
  Check, 
  Users, LogOut } from "lucide-react";
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

const NavLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-violet-700 transition-colors focus:outline-none focus:ring-0"
  >
    {label}
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
    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:text-violet-700 hover:bg-gray-50 transition-colors"
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
  const router = useRouter(); // Router para redirecionamento de fluxos de autenticação

  const [openMenu, setOpenMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

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
  const [loginSuccess, setLoginSuccess] = useState(""); // ✅ NOVO: Para mensagens de sucesso
  const [loginLoading, setLoginLoading] = useState(false);


  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  // Sincronização de dados da sessão - Atualiza o email e foto de perfil quando a sessão muda
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

  // Feedback de boas-vindas ao usuário automaticamente se login ocorrer via provedores
  useEffect(() => {
    const isLoggedInNow = !!session;

    prevIsLoggedIn.current = isLoggedInNow;
  }, [session, pathname]);

  // Fecha o modal de boas-vindas se o usuário navegar para fora da página inicial
  useEffect(() => {
    if (pathname !== '/' && showWelcomeDialog) {
      setShowWelcomeDialog(false);
    }
  }, [pathname, showWelcomeDialog]);

  // Verifica parâmetros de retorno de autenticação
  useEffect(() => {
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    
    // Mostra feedback de sucesso no fluxo de confirmação de conta
    if (searchParams.get('verified') === 'true') {
      setLoginModal(true);
      setIsRegistering(false);
      setLoginSuccess('Email verificado com sucesso! Agora pode fazer login.');
      setLoginError('');
      
      // Limpar o parâmetro da URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Limpar mensagem após 5 segundos
      const timer = setTimeout(() => setLoginSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
    
    // Se houve erro na verificação
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setLoginModal(true);
      setIsRegistering(false);
      setLoginError(`${decodeURIComponent(errorParam)}`);
      setLoginSuccess('');
      
      // Limpar o parâmetro da URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Fecha os dropdowns (Utilizador e GitHub) ao clicar fora deles ou em eventos de toque
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
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
      // Obter o username da sessão. 
      const username = (user as any)?.username || user?.name;

      if (!username) {
        alert("Por favor, configure um nome de utilizador no seu perfil antes de partilhar.");
        return;
      }
      
      // Construir o link de compartilhamento com o username
      const shareLink = `${window.location.origin}/u/${encodeURIComponent(username.replace(/\s+/g, "").toLowerCase())}`;
      
      // Copiar para clipboard
      await navigator.clipboard.writeText(shareLink);
      
      // Mostrar feedback
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
      // Se requer confirmação, redireciona para a etapa pendente
      setLoginLoading(false);
      setLoginModal(false);
      // Corrigido: Usar /verificacao-pendente (não /auth/verificacao-pendente)
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
    <div className="w-full flex flex-col">
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
                <h2 className="mb-1 mt-6 text-2xl text-center font-bold uppercase text-gray-800">
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
                          className="w-full rounded border border-gray-300 px-3 py-2 pr-12 text-sm outline-none focus:border-violet-700 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden"
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
                      <Link
                        href="/esqueci-password"
                        onClick={() => setLoginModal(false)}
                        className="text-xs text-violet-700 hover:underline"
                      >
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

     {/* Modal de boas-vindas após login ou registo bem-sucedido */}

      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="max-w-lg bg-white px-0 py-0 overflow-hidden">
          <div className="relative h-48 w-full">
            <img
              src="/welcome.jpg"
              alt="Bem-vindo à ADN Developer"
              className="h-full w-full object-cover"
            />
          </div>
          <DialogHeader className="p-6 text-center">
            <DialogTitle>
              {welcomeMode === 'register'
                ? 'Conta criada com sucesso!'
                : `Bem-vindo${user?.name ? `, ${user.name}` : ''}!`}
            </DialogTitle>
            <DialogDescription>
              {welcomeMode === 'register'
                ? 'Sua conta foi criada. Não esqueça de preencher o perfil com suas informações.'
                : 'Sessao iniciada com sucesso.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 px-6 pb-6 pt-2">
            <Link
              href="/profile"
              onClick={() => setShowWelcomeDialog(false)}
              className="w-full rounded-md bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600 text-center"
            >
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

      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="focus:outline-none" aria-label="Página Inicial">
            <Image src="/logoNavbar.png" alt="ADN Developer Logo" width={60} height={40} className="w-auto h-auto cursor-pointer object-contain" priority />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 font-bold">
            <NavLink label="Eventos" href="/events" />
            <NavLink label="Comunidades" href="/community" />
            <NavLink label="Bolsas de estudo" href="/bolsas" />
            <NavLink label="RoadMaps" href="/roadmaps" />
            <NavLink label="Startups" href="/startups" />
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Profile Button */}
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  setLoginModal(true);
                } else {
                  setUserDropdown(!userDropdown);
                }
              }}
              className="w-8 h-8 rounded-full hover:bg-gray-100 transition border border-gray-200 focus:outline-none flex items-center justify-center p-0"
              aria-label="Perfil"
            >
              {isLoggedIn && profilePhoto ? (
                <img src={profilePhoto} alt="Foto" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
              ) : (
                <UserIcon className={`w-5 h-5 ${isLoggedIn ? "text-violet-700" : "text-gray-600"}`} />
              )}
            </button>

            {/* User Dropdown */}
            <div ref={dropdownRef} className="relative">
              {userDropdown && (
                <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right max-[402px]:fixed max-[402px]:top-24 max-[402px]:left-1/2 max-[402px]:-translate-x-1/2">
                  <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-violet-100 border-b border-gray-100 flex items-center gap-3">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Foto" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" onError={() => setProfilePhoto(null)} />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-violet-700" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{(user as any)?.username || user?.name || "Utilizador"}</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link href="/profile" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition">
                      <UserIcon className="w-4 h-4" />
                      <span>O meu perfil</span>
                    </Link>
                    
                    <button
                      type="button"
                      onClick={handleCopyShareLink}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition flex items-center gap-2"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>{shareLinkCopied ? "✓ Copiado!" : "Partilhar perfil"}</span>
                    </button>
                    
                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition">
                      <Users className="w-4 h-4" />
                      <span>Contribuidores</span>
                    </Link>
                    <Link href="/" onClick={() => setUserDropdown(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition">
                      <CreditCard className="w-4 h-4" />
                      <span>Painel de assinatura</span>
                    </Link>


                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:text-red-200 transition">
                        <LogOut className="w-4 h-4" />
                        <span>Terminar sessão</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button type="button" onClick={() => setOpenMenu(!openMenu)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition">
              {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {openMenu && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-[45] border-b border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-4 space-y-2 font-bold max-h-[70vh] overflow-y-auto">
              <MobileLink label="Eventos" href="/events" onClick={closeMobileMenu} />
              <MobileLink label="Comunidades" href="/community" onClick={closeMobileMenu} />
              <MobileLink label="Bolsas de estudo" href="/bolsas" onClick={closeMobileMenu} />
              <MobileLink label="RoadMaps" href="/roadmaps" onClick={closeMobileMenu} />
              <MobileLink label="Startups" href="/startups" onClick={closeMobileMenu} />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
