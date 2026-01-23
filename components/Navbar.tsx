"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logos/logo-cafe.png";

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loadingLink, setLoadingLink] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-10 h-10 cursor-pointer" />
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-bold">
          <NavLink label="Eventos" href="/events" loading={loadingLink === "/events"} onClick={() => setLoadingLink("/events")} />
          <NavLink label="Competições" href="/comp" loading={loadingLink === "/comp"} onClick={() => setLoadingLink("/comp")} />
          <NavLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => setLoadingLink("/community")} />
          <NavLink label="Mentes brilhantes" href="/mind" loading={loadingLink === "/mind"} onClick={() => setLoadingLink("/mind")} />
          <NavLink label="GameDev" href="/gamedev" loading={loadingLink === "/gamedev"} onClick={() => setLoadingLink("/gamedev")} />
          <NavLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => setLoadingLink("/wtm")} />
          <NavLink label="Road Maps" href="/roadmaps" loading={loadingLink === "/roadmaps"} onClick={() => setLoadingLink("/roadmaps")} />
          <NavLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => setLoadingLink("/bolsas")} />
          <NavLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => setLoadingLink("/startups")} />
          <NavLink label="Store" href="/store" loading={loadingLink === "/store"} onClick={() => setLoadingLink("/store")} />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/quiz">
            <button className="px-5 py-2 text-[13px] font-bold text-gray-50 bg-[#2e405c] rounded-xl hover:bg-[#243146] transition">
              Qual área é para mim?
            </button>
          </Link>

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
          <MobileLink label="Competições" href="/comp" loading={loadingLink === "/comp"} onClick={() => { setLoadingLink("/comp"); closeMobileMenu(); }} />
          <MobileLink label="Comunidades" href="/community" loading={loadingLink === "/community"} onClick={() => { setLoadingLink("/community"); closeMobileMenu(); }} />
          <MobileLink label="Mentes brilhantes" href="/mind" loading={loadingLink === "/mind"} onClick={() => { setLoadingLink("/mind"); closeMobileMenu(); }} /> 
          <MobileLink label="GameDev" href="/gamedev" loading={loadingLink === "/gamedev"} onClick={() => { setLoadingLink("/gamedev"); closeMobileMenu(); }} />
          <MobileLink label="Mulheres na T.I" href="/wtm" loading={loadingLink === "/wtm"} onClick={() => { setLoadingLink("/wtm"); closeMobileMenu(); }} />
          <MobileLink label="Road Maps" href="/roadmaps" loading={loadingLink === "/roadmaps"} onClick={() => { setLoadingLink("/roadmaps"); closeMobileMenu(); }} />
          <MobileLink label="Bolsas de estudo" href="/bolsas" loading={loadingLink === "/bolsas"} onClick={() => { setLoadingLink("/bolsas"); closeMobileMenu(); }} />
          <MobileLink label="Startups" href="/startups" loading={loadingLink === "/startups"} onClick={() => { setLoadingLink("/startups"); closeMobileMenu(); }} /> 
          <MobileLink label="Store" href="/store" loading={loadingLink === "/store"} onClick={() => { setLoadingLink("/store"); closeMobileMenu(); }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * COMPONENTES AUXILIARES
 */

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
    className="flex items-center gap-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition"
  >
    {label}
    {loading && <Loader />}
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
    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
  >
    {label}
    {loading && <Loader />}
  </Link>
);

const Loader = () => (
  <span className="inline-block w-3 h-3 border-[2px] border-gray-400 border-t-transparent rounded-full animate-spin" />
);
