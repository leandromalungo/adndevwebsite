import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/images/logo-cafe.png";

/* -------------------- NAVBAR -------------------- */

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openAreas, setOpenAreas] = useState(false);
  const [openComunidades, setOpenComunidades] = useState(false);

  const closeMobileMenu = () => {
    setOpenMenu(false);
    setOpenAreas(false);
    setOpenComunidades(false);
  };

  const closeDropdowns = () => {
    setOpenAreas(false);
    setOpenComunidades(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" onClick={closeDropdowns}>
            <Image src={logo} alt="Logo" className="w-10 h-10 cursor-pointer" />
        </Link>

        {/* Links Desktop */}
        <div className="hidden lg:flex items-center gap-6 font-bold">
          <Dropdown
            title="Áreas dentro da T.I"
            open={openAreas}
            setOpen={setOpenAreas}
            onLinkClick={closeDropdowns}
          >
            <Link
              href="/areas/web-development"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Web Development
            </Link>
            <Link
              href="/areas/data-science"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Data Science
            </Link>
            <Link
              href="/areas/cybersecurity"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Cybersecurity
            </Link>
            <Link
              href="/areas/cloud-computing"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Cloud Computing
            </Link>
            <Link
              href="/areas/devops"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              DevOps
            </Link>
            <Link
              href="/areas/mobile-development"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Mobile Development
            </Link>
            <Link
              href="/areas/ai-ml"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              AI & Machine Learning
            </Link>
            <Link
              href="/areas/software-engineering"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Software Engineering
            </Link>
            <Link
              href="/areas/others"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Outras áreas
            </Link>
          </Dropdown>

          <NavLink label="Cursos" href="/cursos" onClick={closeDropdowns} />
          <NavLink label="Ranking" href="/ranking" onClick={closeDropdowns} />
          <NavLink
            label="Competições"
            href="/competicoes"
            onClick={closeDropdowns}
          />

          <Dropdown
            title="Comunidades"
            open={openComunidades}
            setOpen={setOpenComunidades}
            onLinkClick={closeDropdowns}
          >
            <Link
              href="/games"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Game Developers
            </Link>
            <Link
              href="/comunidades/javascript"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Comunidade JavaScript
            </Link>
            <Link
              href="/comunidades/cyber-security"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Comunidades de Cyber Security
            </Link>
            <Link
              href="/comunidades/others"
              onClick={closeDropdowns}
              className="block px-4 py-3 text-sm hover:bg-white/10 transition"
            >
              Outras comunidades
            </Link>
          </Dropdown>

          <NavLink label="Eventos" href="/eventos" onClick={closeDropdowns} />
          <NavLink
            label="Bolsas de estudos"
            href="/bolsas"
            onClick={closeDropdowns}
          />
          <NavLink label="Startups" href="/startups" onClick={closeDropdowns} />
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link href="/howknow">
            <button className="px-5 py-2 text-[13px] font-bold text-gray-50 bg-[#224c54] rounded-xl hover:bg-[#2d646f] transition">
              Qual área é para mim?
            </button>
          </Link>

          {/* Botão Mobile */}
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

      {/* -------------------- MENU MOBILE -------------------- */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          openMenu ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-2 font-bold">
          <MobileDropdown
            title="Áreas dentro da T.I"
            onItemClick={closeMobileMenu}
          >
            <Link
              href="/areas/web-development"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Web Development
            </Link>
            <Link
              href="/areas/data-science"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Data Science
            </Link>
            <Link
              href="/areas/cybersecurity"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Cybersecurity
            </Link>
            <Link
              href="/areas/cloud-computing"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Cloud Computing
            </Link>
            <Link
              href="/areas/devops"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              DevOps
            </Link>
            <Link
              href="/areas/mobile-development"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Mobile Development
            </Link>
            <Link
              href="/areas/ai-ml"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              AI & Machine Learning
            </Link>
            <Link
              href="/areas/software-engineering"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Software Engineering
            </Link>
            <Link
              href="/areas/others"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Outras áreas
            </Link>
          </MobileDropdown>

          <MobileLink label="Cursos" href="/cursos" onClick={closeMobileMenu} />
          <MobileLink
            label="Ranking"
            href="/ranking"
            onClick={closeMobileMenu}
          />
          <MobileLink
            label="Competições"
            href="/competicoes"
            onClick={closeMobileMenu}
          />

          <MobileDropdown title="Comunidades" onItemClick={closeMobileMenu}>
            <Link
              href="/games"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Game Developers
            </Link>
            <Link
              href="/comunidades/javascript"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Comunidade JavaScript
            </Link>
            <Link
              href="/comunidades/cyber-security"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Comunidades de Cyber Security
            </Link>
            <Link
              href="/comunidades/others"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-200"
            >
              Outras comunidades
            </Link>
          </MobileDropdown>

          <MobileLink
            label="Eventos"
            href="/eventos"
            onClick={closeMobileMenu}
          />
          <MobileLink
            label="Bolsas de estudos"
            href="/bolsas"
            onClick={closeMobileMenu}
          />
          <MobileLink
            label="Startups"
            href="/startups"
            onClick={closeMobileMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/* -------------------- COMPONENTES -------------------- */

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
    className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition"
  >
    {label}
  </Link>
);

interface DropdownProps {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLinkClick?: () => void;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  open,
  setOpen,
  onLinkClick,
  children,
}) => {
  const [display, setDisplay] = useState(open);

  React.useEffect(() => {
    if (open) setDisplay(true);
    else {
      const timeout = setTimeout(() => setDisplay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition">
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {display && (
        <div
          className={`absolute top-full left-0 pt-3 z-50 transition-all duration-300 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="w-56 bg-black text-white rounded-xl shadow-lg overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

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
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
  <Link
    href={href}
    onClick={onClick}
    className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
  >
    {label}
  </Link>
);
