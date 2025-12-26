import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Rss, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Browse by subject */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Tecnologia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Negócios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Saúde
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Educação
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Cultura
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Mundo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Economia
                </a>
              </li>
            </ul>
          </div>

          {/* Browse by provider */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Parceiros
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  LinkedIn Learning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Microsoft Learn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  AWS Training
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Google Cloud
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Udemy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Coursera
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Udacity
                </a>
              </li>
            </ul>
          </div>

          {/* Browse by university */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Universidades
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Harvard University
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  MIT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Stanford
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Oxford
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  University of Michigan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Georgia Tech
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Purdue
                </a>
              </li>
            </ul>
          </div>

          {/* Browse by institution */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Instituições
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  ONU
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  FMI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Banco Mundial
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  OMS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Linux Foundation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  IBM Education
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Salesforce
                </a>
              </li>
            </ul>
          </div>

          {/* Rankings */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
              Rankings
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Melhores do Ano
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Mais Lidos de Sempre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Cursos Gratuitos Populares
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Edições de Colecionador
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Top 100 Artigos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Guias de Carreira
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
                >
                  Anuário the news
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Secondary Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pt-8 border-t border-gray-200">
          {/* The Report */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="italic">A voz do desenvolvedor</span>
              <Rss className="w-4 h-4 text-blue-400" />
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  O novo normal da tecnologia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Relatório semestral de mercado
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Educação 5.0: O futuro
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Guia de certificações gratuitas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Como o mercado se adaptou
                </a>
              </li>
            </ul>
          </div>

          {/* Free Certificates & Courses */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              Certificados & Cursos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  450+ Certificados Google
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  10000+ Cursos das Big Techs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Cursos Gratuitos Ivy League
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Formação em Escrita Online
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                >
                  Especialização em IA
                </a>
              </li>
            </ul>
          </div>

          {/* About Branding */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">
              Sobre nós
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              the news agrega o melhor conteúdo do mercado para ajudar você a
              começar o seu dia bem informado, onde quer que você esteja.
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
            <div className="mt-2 w-48 relative">
              <label
                htmlFor="language"
                className="text-gray-600 text-sm block mb-1 rounded-lg"
              >
                Selecionar Idioma:
              </label>
              <div className="relative">
                <select
                  name="language"
                  id="language"
                  className="peer block w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 focus:border-blue-500 focus:outline-none appearance-none"
                >
                  <option value="pt" className="bg-black text-white rounded-lg">
                    Português
                  </option>
                  <option value="en" className="bg-black text-white rounded-lg">
                    English
                  </option>
                  <option value="fr" className="bg-black text-white rounded-lg">
                    Français
                  </option>
                  <option value="kb" className="bg-black text-white rounded-lg">
                    Kinbundu
                  </option>
                  <option value="kk" className="bg-black text-white rounded-lg">
                    Kikongo
                  </option>
                  <option value="lg" className="bg-black text-white rounded-lg">
                    Lingala
                  </option>
                </select>
                {/* Ícone de seta para baixo com animação */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    className="w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out peer-focus:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <style jsx>{`
                select option {
                  background-color: black !important;
                  color: white !important;
                  border-radius: 0.5rem !important;
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700">ADN Developer</span>
            </div>
            <span>© 2025 - 2026</span>
            <a href="#" className="hover:text-gray-900">
              Política de Privacidade
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
