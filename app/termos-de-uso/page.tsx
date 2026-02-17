import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link"; // Import Link component

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
          <p className="text-gray-500 mb-8">Última atualização: {new Date().getFullYear()}</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o site <strong>ADN Developer</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Natureza dos Serviços e Isenção de Afiliação</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-blue-900 mb-2">Importante: Isenção de Responsabilidade</h3>
                <p className="text-blue-800 mb-3">
                  <strong>Este site não possui parceria, vínculo oficial ou afiliação direta com os eventos, cursos, comunidades, projectos, bolsas e entidades aqui divulgadas, exceto quando explicitamente indicado.</strong>
                </p>
                <p className="text-blue-800 mb-3">
                  Nós actuamos como uma plataforma independente de divulgação e organização de informações. Todos os dados, imagens e logótipos presentes no site são utilizados estritamente para fins <strong>informativos e de identificação</strong> (Fair Use / Uso Justo), com o objectivo de facilitar o acesso ao conhecimento e oportunidades no sector tecnológico da lusofonia.
                </p>
                <p className="text-blue-800">
                  As informações são colectadas de fontes públicas oficiais e fidedignas. Não realizamos alterações no conteúdo substancial, nem nos apropriamos de marcas registadas de terceiros.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Serviços Pagos e Curadoria</h2>
              <p>
                Alguns serviços oferecidos pelo ADN Developer, como alertas personalizados e relatórios exclusivos, podem ser pagos. O valor cobrado refere-se estritamente ao <strong>serviço de curadoria, pesquisa, organização, análise e entrega conveniente</strong> dessas informações, fruto de um trabalho árduo e dedicado da nossa equipa.
              </p>
              <p className="mt-2">
                O pagamento não confere propriedade sobre os dados públicos organizados, mas sim sobre o acesso à nossa plataforma de organização e aos recursos exclusivos de notificação e gestão que desenvolvemos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriedade Intelectual e Marcas</h2>
              <p>
                Respeitamos rigorosamente os direitos de propriedade intelectual. Todas as marcas comerciais, logótipos e nomes de serviços exibidos neste site são propriedade dos seus respectivos titulares. O uso destes sinais distintivos serve apenas para descrever e identificar os produtos e serviços associados, sem qualquer intenção de infringir direitos de marca ou sugerir endosso indevido.
              </p>
              <p className="mt-2">
                O ADN Developer detém os direitos sobre o design, layout, código-fonte, banco de dados organizado e conteúdo original produzido pela nossa equipa editorial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Política de Remoção de Conteúdo (Takedown)</h2>
              <p>
                Se você é detentor de direitos autorais ou representante legal de uma marca e acredita que o uso de sua propriedade intelectual em nosso site infringe seus direitos ou deseja simplesmente que sua entidade não conste em nossa base de dados, por favor, entre em contacto connosco imediatamente através do email <a href="mailto:geral@adndeveloper.com" className="text-blue-600 hover:underline">geral@adndeveloper.com</a>.
              </p>
              <p className="mt-2">
                Comprometemo-nos a analisar e, se aplicável, remover o conteúdo ou ajustar as informações em questão no prazo mais breve possível, respeitando a vontade dos titulares.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Protecção de Dados e Segurança</h2>
              <p>
                O ADN Developer adopta medidas técnicas e organizativas adequadas para proteger a segurança da plataforma e os dados dos seus utilizadores, em conformidade com as leis de protecção de dados nacionais e internacionais aplicáveis (como o RGPD/GDPR e a Lei de Protecção de Dados Pessoais de Angola e do Brasil).
              </p>
              <p className="mt-2">
                Utilizamos as informações públicas recolhidas com base no legítimo interesse de informar a comunidade tecnológica, sempre salvaguardando os direitos fundamentais dos titulares. Qualquer tentativa de ataque cibernético, raspagem de dados não autorizada (scraping) ou violação da nossa infraestrutura será tratada com o máximo rigor legal, sujeita a indemnização por perdas e danos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
              <p>
                Em nenhuma circunstância o ADN Developer será responsável por danos directos, indirectos, incidentais, especiais ou consequentes resultantes do uso ou da incapacidade de usar o nosso site. Embora nos esforcemos para manter as informações actualizadas e precisas, não garantimos a exactidão, integridade ou actualidade dos dados provenientes de terceiros (datas de eventos, valores de bolsas, etc.). Recomendamos sempre a verificação final nos canais oficiais das entidades divulgadas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Uso de Licença</h2>
              <p>
                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ADN Developer, apenas para visualização transitória pessoal e não comercial. Esta licença não permite:
              </p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Modificar ou copiar os materiais para uso comercial;</li>
                <li>Tentar descompilar ou fazer engenharia reversa de qualquer software;</li>
                <li>Remover quaisquer direitos autorais ou outras notações de propriedade;</li>
                <li>Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor sem autorização prévia.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modificações e Lei Aplicável</h2>
              <p>
                O ADN Developer pode revisar estes termos de serviço a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão actual desses termos.
              </p>
              <p className="mt-2">
                Estes termos e condições são regidos e interpretados de acordo com as leis em vigor, e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais competentes.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
