import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Políticas de Privacidade</h1>
          <p className="text-gray-500 mb-8">Última atualização: {new Date().getFullYear()}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introdução</h2>
              <p>
                A sua privacidade é uma prioridade para nós. É política do <strong>ADN Developer</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no nosso site e outros meios digitais. Esta política descreve como colectamos, usamos, protegemos e compartilhamos suas informações, em conformidade com as leis de protecção de dados aplicáveis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Coleta de Informações</h2>
              <p>
                Coletamos informações pessoais e públicas para diferentes fins:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li><strong>Dados Fornecidos por Si:</strong> Nome, email, telefone e dados de pagamento (processados de forma segura por terceiros) para gestão de conta e assinaturas.</li>
                <li><strong>Dados de Fontes Públicas:</strong> Coletamos informações públicas sobre eventos, bolsas e cursos disponíveis na internet. Estas informações são usadas apenas para fins informativos e de divulgação na nossa plataforma.</li>
                <li><strong>Dados Automáticos:</strong> Informações técnicas como endereço IP, tipo de navegador e dados de uso para fins de segurança, análise de desempenho e melhoria da experiência.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Uso das Informações e Base Legal</h2>
              <p>
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Fornecer, operar e manter o nosso site;</li>
                <li>Melhorar, personalizar e expandir os nossos serviços de curadoria;</li>
                <li>Compreender e analisar como você utiliza o nosso site;</li>
                <li>Desenvolver novos produtos, serviços, recursos e funcionalidades;</li>
                <li>Comunicar consigo para fins de serviço ao cliente e atualizações;</li>
                <li>Processar transacções seguras e prevenir fraudes.</li>
              </ul>
              <p className="mt-4">
                <strong>Uso de Dados Públicos:</strong> O uso de dados de entidades terceiras baseia-se no legítimo interesse de promover o acesso à informação e educação, sem prejuízo aos direitos dos titulares originais.
              </p>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Isenção de Responsabilidade e Afiliação</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-gray-700">
                  <strong>Este site não possui parceria oficial com os eventos, cursos, comunidades, projectos, bolsas e entidades aqui divulgadas.</strong>
                </p>
                <p className="mt-2 text-gray-600">
                  Fornecemos informações sobre o sector de tecnologia e muito mais na lusofonia com o objetivo de disseminar conhecimento. Os alertas e divulgações são serviços de organização baseados em informações públicas, com devida menção e sem alteração de conteúdo.
                </p>
                <p className="mt-2 text-gray-600">
                  Não nos apropriamos de marcas de terceiros. Se representar uma entidade e desejar a remoção ou rectificação de informações, por favor contacte-nos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Segurança e Protecção de Dados</h2>
              <p>
                Adotamos medidas de segurança robustas, alinhadas com padrões internacionais, para proteger os dados contra acesso não autorizado, alteração ou destruição. Seguimos leis de protecção de dados nacionais e internacionais para garantir a integridade da nossa plataforma e dos dados dos usuários.
              </p>
              <p className="mt-2 text-red-600 font-medium">
                Qualquer tentativa de violação de segurança, ataque à infraestrutura ou uso indevido da plataforma será passível de acção legal e pedido de indemnização.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Cookies e Tecnologias de Rastreio</h2>
              <p>
                Utilizamos cookies para melhorar a funcionalidade do site e a sua experiência. Você pode optar por desativar os cookies nas configurações do navegador, embora isso possa limitar certas funcionalidades.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Seus Direitos</h2>
              <p>
                Você tem o direito de aceder, corrigir, actualizar ou solicitar a exclusão dos seus dados pessoais. Para exercer estes direitos, entre em contacto através do email <a href="mailto:geral@adndeveloper.com" className="text-blue-600 hover:underline">geral@adndeveloper.com</a>.
              </p>
            </section>

            <section className="pt-4 border-t border-gray-200">
              <p>
                Esta política é efetiva a partir de <strong>Fevereiro de {new Date().getFullYear()}</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
