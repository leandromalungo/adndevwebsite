"use client";

/**
 * FOOTER COMPONENT
*/

import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Rodapé Inferior - Informação de copyright, políticas legais e contacto oficial */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">ADN Developer</span>
            </div>
            <span>©2025-2026</span>
            <Link href="/politicas-de-privacidade" className="hover:text-violet-700 transition-colors">
              Políticas de Privacidade
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/termos-de-uso" className="hover:text-violet-700 transition-colors">
              Termos de Uso
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-500">
            <a href="mailto:geral.adndeveloper@gmail.com" className="hover:text-violet-700 transition-colors">
              adndeveloper@gmail.com
            </a>
          </div>
          {/* Sobre e Disclaimer - Nota legal sobre a natureza informativa da plataforma e links sociais */}
          <div>
            {/* Nossas Redes Socias */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/adn.developer.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-violet-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/adndeveloper/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/adn-developer/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-violet-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@adn_developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
