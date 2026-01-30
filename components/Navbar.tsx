"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setOpenMenu(false);
  };

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

        <div className="flex items-center gap-3">
     

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
          <MobileLink label="Eventos" href="/events" loading={loadingLink === "/events"} onClick={() => { setLoadingLink("/events"); closeMobileMenu(); }} />
          <MobileLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => { setLoadingLink("/community"); closeMobileMenu(); }} />
          <MobileLink label="GameDev" href="/gamedev" loading={loadingLink === "/gamedev"} onClick={() => { setLoadingLink("/gamedev"); closeMobileMenu(); }} />
          <MobileLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => { setLoadingLink("/wtm"); closeMobileMenu(); }} />
          <MobileLink label="Cursos" href="/cursos" loading={loadingLink === "/cursos"} onClick={() => { setLoadingLink("/cursos"); closeMobileMenu(); }} />
          <MobileLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => { setLoadingLink("/bolsas"); closeMobileMenu(); }} />
          <MobileLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => { setLoadingLink("/startups"); closeMobileMenu(); }} /> 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * COMPONENTES AUXILIARES
 */

const NavLink = ({ label, href, loading, onClick }: {
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
    {label}
    {loading && <Loader />}
  </Link>
);

const MobileLink = ({ label, href, loading, onClick }: {
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
    {label}
    {loading && <Loader />}
  </Link>
);

const Loader = () => (
  <span className="inline-block w-3 h-3 border-[2px] border-gray-400 border-t-transparent rounded-full animate-spin" />
);
