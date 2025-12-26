
import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Obrigado! Inscrição realizada para: ${email}`);
      setEmail('');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border-t border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 mb-2">receba o the news</h3>
        <p className="text-gray-600 font-medium">junte-se a mais de 2 milhões de pessoas bem informadas.</p>
      </div>

      {/* Subscription Input Form */}
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-xl"
      >
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 border-2 border-[#4991ad] rounded-2xl bg-white shadow-sm transition-all focus-within:ring-4 focus-within:ring-blue-50">
          <div className="flex flex-1 items-center min-w-0">
            <div className="pl-4 pr-2 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-[#4991ad]" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coloque seu melhor e-mail"
              className="w-full py-3 text-base outline-none text-gray-800 placeholder:text-gray-400 font-medium bg-transparent"
            />
          </div>
          <button 
            type="submit"
            className="mt-2 sm:mt-0 px-8 py-3 bg-[#4991ad] text-gray-100 font-bold rounded-xl hover:bg-[#4991ad] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            inscreva-se
          </button>
        </div>
      </form>
      
      <p className="mt-6 text-[11px] text-gray-400 uppercase tracking-widest font-bold">
        grátis. todos os dias. direto no seu e-mail.
      </p>
    </section>
  );
};

export default Newsletter;
