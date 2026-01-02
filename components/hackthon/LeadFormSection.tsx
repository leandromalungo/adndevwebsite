
import React from 'react';

/**
 * LeadFormSection Component
 * 
 * A high-fidelity lead generation form matching the design in the screenshot.
 * Features:
 * - Rounded container with subtle shadow.
 * - Icon-integrated typography.
 * - Profile avatar stack in text.
 * - Inline form inputs and country code selector.
 */
export const LeadFormSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-12 px-4">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 flex flex-col items-center text-center">
        
        {/* Header Section */}
        <div className="mb-10 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 flex flex-wrap justify-center items-center gap-x-3 leading-tight">
            Qual é o melhor
            <span className="inline-block">
              <img 
                src="https://img.icons8.com/pixels/64/graduation-cap.png" 
                alt="graduation cap" 
                className="w-12 h-12 md:w-16 md:h-16 -mt-2"
              />
            </span>
            caminho para você seguir?
          </h2>
          
          <div className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed inline-block">
            Insira suas informações de
            <div className="inline-flex -space-x-2 mx-2 align-middle">
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" alt="avatar" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="avatar" />
              <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop" alt="avatar" />
            </div>
            contato, responda algumas perguntas rápidas e descubra como começar sua carreira no mundo da tecnologia neste ano.
          </div>
        </div>

        {/* Form Section */}
        <form className="w-full flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Nome e sobrenome" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-[#f9fafb]"
            />
          </div>
          
          <div className="flex-1">
            <input 
              type="email" 
              placeholder="Seu email" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-[#f9fafb]"
            />
          </div>

          <div className="flex flex-1 gap-2">
            <div className="relative group w-32">
              <select className="w-full appearance-none px-4 py-4 rounded-xl border border-gray-200 text-gray-700 bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-black transition-all cursor-pointer">
                <option value="+244">AO +244</option>
                <option value="+55">BR +55</option>
                <option value="+351">PT +351</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <input 
              type="tel" 
              placeholder="Número de telefone" 
              className="flex-grow px-6 py-4 rounded-xl border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-[#f9fafb]"
            />
          </div>

          <button 
            type="submit" 
            className="px-12 py-4 bg-[#212121] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg active:scale-95 whitespace-nowrap lg:min-w-[180px]"
          >
            Continuar
          </button>
        </form>

        {/* Legal Disclaimer */}
        <p className="mt-8 text-[10px] md:text-xs text-gray-400 max-w-5xl leading-tight">
          Ao clicar no botão 'Continuar', você fornece o seu consentimento para entrarmos em contato com você por telefone, e-mail, mensagem de texto ou comunicações via WhatsApp. Podem ser aplicadas tarifas de dados e mensagens. Para mais informações sobre o tratamento de dados pessoais, consulte a nossa <a href="#" className="underline">Política de Privacidade</a>.
        </p>
      </div>
    </section>
  );
};
