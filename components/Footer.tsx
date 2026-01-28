"use client";

/**
 * COMPONENTE FOOTER
 * 
 * Rodapé principal do aplicativo.
 * Exibe:
 * - Informações da empresa
 * - Links rápidos
 * - Redes sociais
 * - Contato
 */

import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Rss, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Primeiro Grid Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Browse by subject */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
            Cursos gratuitos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-600 transition-colors text-sm"
                >
                  Cursera
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Class Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  edX
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Khan Academy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Alura
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  freeCodeCamp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Codecademy
                </a>
              </li>
            </ul>
          </div>

          {/* Certificações */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Certificações gratuitas
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  LinkedIn Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Microsoft Learn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  AWS Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Google Cloud
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Udemy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Rankhank
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Udacity
                </a>
              </li>
            </ul>
          </div>

          {/* Univerisidades */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Bolsas de estudo
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Angola
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                   Brasil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Cabo Verde
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Moçambique
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Portugal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  são Tomé e príncipe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Guiné bissau
                </a>
              </li>
            </ul>
          </div>

          {/* Comunidades */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              COMUNIDADES
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  GDG Luanda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Open Source Angola
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Elas no Code
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                  Comunidade de Devs de Angola
                </a>
              </li>
            </ul>
          </div>

          {/* About Branding */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              O que fazemos?
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Fornecemos as melhores informações sobre tecnologia, certificaçõe, sendo assim o maior repositorio de assuntos tecnologico para a lusofonia.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-rose-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">ADN Developer</span>
            </div>
            <span>© 2025 - 2026</span>
            <a href="#" className="hover:text-gray-900">
              Políticas de Privacidade
            </a>
            <a href="" className="hover:text-gray-900">
              adn@developer.com
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900">
              Trabalhe conosco
            </a>
            <a href="#" className="hover:text-gray-900">
              Anuncie
            </a>
            <a href="#" className="hover:text-gray-900">
              Central de Ajuda
            </a>
            <a href="#" className="hover:text-gray-900">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
