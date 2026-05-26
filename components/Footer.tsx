"use client";

/**
 * FOOTER COMPONENT
*/

import { Facebook, Linkedin, Youtube, Instagram, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grelha Principal do Rodapé - Categorias de Recursos e Oportunidades */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8 mb-12">
          {/* Secção de Cursos Gratuitos - Links para as principais plataformas de E-learning */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Cursos gratuitos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Cursera
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Class Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  edX
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Khan Academy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Alura
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  freeCodeCamp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Codecademy
                </a>
              </li>
            </ul>
          </div>

          {/* Secção de Certificações - Recursos recomendados para formação técnica contínua */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Certificações gratuitas
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  LinkedIn Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Microsoft Learn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  AWS Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Google Cloud
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Udemy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Rankhank
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Udacity
                </a>
              </li>
            </ul>
          </div>

          {/* Secção de Bolsas de Estudo - Listagem de oportunidades disponíveis por região geográfica */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Bolsas de estudo
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Angola
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Brasil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Cabo Verde
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Moçambique
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Portugal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  São Tomé e Príncipe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Guiné bissau
                </a>
              </li>
            </ul>
          </div>

          {/* Secção de Comunidades - Grupos e ecossistemas de troca de conhecimento na lusofonia */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              COMUNIDADES
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  GDG Luanda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Open Source Angola
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Elas no Code
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-700 transition-colors text-sm"
                >
                  Comunidade de Devs de Angola
                </a>
              </li>
            </ul>
          </div>

          {/* Sobre e Disclaimer - Nota legal sobre a natureza informativa da plataforma e links sociais */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              Como funciona?
            </h3>
            <p className="text-gray-600 text-[12px] mb-4 leading-relaxed">
              Este site não possui parceria oficial com os eventos, cursos, comunidades, projectos, bolsas
              e entidades aqui divulgadas. Fornecemos informações sobre o sector tecnologia  e muito mais na lusofonia.
              Os alertas e mais são servições de organização  baseadas em informações públicas com devida menção e sem alteração
              de conteúdo. Para qualquer esclarecimento, entre em contacto connosco.
            </p>
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
              <a
                href="https://www.youtube.com/@adn_developer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>



        {/* Rodapé Inferior - Informação de copyright, políticas legais e contacto oficial */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
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
              geral.adndeveloper@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
