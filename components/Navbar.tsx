"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logos/logo-cafe.png";

/**
 * COMPONENTE NAVBAR
 * 
 * Barra de navegação principal do aplicativo.
 * Responsável por:
 * - Exibir logo da empresa
 * - Navegação entre páginas (desktop e mobile)
 * - Botão CTA "Qual área é para mim?"
 * - Menu responsivo com hamburger menu
 */

const Navbar: React.FC = () => {
  // Estado para controlar abertura/fechamento do menu mobile
  const [openMenu, setOpenMenu] = useState(false);

  // Função para fechar menu mobile
  const closeMobileMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
            <Image src={logo} alt="Logo" className="w-10 h-10 cursor-pointer" />
        </Link>

        {/* Links Desktop - Visível apenas em telas médias ou maiores */}
        <div className="hidden lg:flex items-center gap-6 font-bold">
          <NavLink label="Notícias" href="/newsTech" />
          <NavLink label="Road Maps" href="/roadmaps" />
          <NavLink label="Eventos" href="/events" />
          <NavLink label="Competições" href="/comp" />
          <NavLink label="Comunidades" href="/community" />
          <NavLink label="Mulheres na T.I" href="/wtm" />
          <NavLink label="Bolsas de estudo" href="/bolsas" />
          <NavLink label="Mentes Brilhantes" href="/startups" />
          <NavLink label="Store" href="/startups" />
        </div>

        {/* Ações - Botão CTA e Menu Mobile */}
        <div className="flex items-center gap-3">
          {/* Botão CTA principal */}
          <Link href="/quiz">
            <button className="px-5 py-2 text-[13px] font-bold text-gray-50 bg-[#2e405c] rounded-xl hover:bg-[#243146] transition">
              Qual área é para mim?
            </button>
          </Link>

          {/* Botão Menu Mobile - Visível apenas em mobile */}
          <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition" >
            {openMenu ? ( <X className="w-6 h-6" /> ) 
            : 
            ( <Menu className="w-6 h-6" /> )
            }
          </button>
        </div>
      </div>

      {/* MENU MOBILE - Aparece apenas em telas pequenas */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${ openMenu ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0" }`} >
        <div className="px-6 pb-6 space-y-2 font-bold">
          <MobileLink label="Notícias" href="/newsTech" onClick={closeMobileMenu} />
          <MobileLink label="Road Maps" href="/roadmaps" onClick={closeMobileMenu} />
          <MobileLink label="Eventos" href="/events" onClick={closeMobileMenu} />
          <MobileLink label="Competições" href="/comp" onClick={closeMobileMenu} />
          <MobileLink label="Comunidades" href="/community" onClick={closeMobileMenu} />
          <MobileLink label="Mulheres na T.I" href="/wtm" onClick={closeMobileMenu} />
          <MobileLink label="Bolsas de estudo" href="/bolsas" onClick={closeMobileMenu} />
          <MobileLink label="Guia Startup" href="/startups" onClick={closeMobileMenu} />
          <MobileLink label="Mentes brilhantes" href="/startups" onClick={closeMobileMenu} />
          <MobileLink label="Store" href="/startups" onClick={closeMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * COMPONENTES AUXILIARES DA NAVBAR
 * ================================
 */

/**
 * NavLink - Link de navegação para desktop
 * @param {string} label - Texto do link
 * @param {string} href - URL de destino
 * @param {function} onClick - Callback ao clicar
 */
const NavLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <Link href={href} onClick={onClick} className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition" >{label}</Link>
);

const MobileDropdown: React.FC<{
  title: string;
  onItemClick: () => void;
  children: React.ReactNode;
}> = ({ title, onItemClick, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="space-y-1 bg-gray-50 rounded-lg mt-1">{children}</div>
      </div>
    </div>
  );
};

const MobileLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) => (
  <Link href={href} onClick={onClick} className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">{label}</Link>
);
