'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

    // --- REFERÊNCIA DO VÍDEO ---
    const videoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.log("Erro ao rodar vídeo:", err));
      }
    }, []);
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject,
          html: `<p>${message}</p>`,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Erro ao enviar email');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar email');
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Navbar />
          {/* SEÇÃO HERÓI */}
      <section className="relative w-full h-screen overflow-hidden bg-zinc-900">
        {/* FUNDO DE VÍDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Caminho correto do vídeo na pasta public/videos */}
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>

        {/* OVERLAY / GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
    
    <div className="relative h-full z-10 flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="icon-dark-32x32.png" alt="Your Company" className="mx-auto h-10 w-auto" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Deixa aqui o teu email para estares atento ás novidades!</h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {showSuccess && (
      <div className="flex items-start sm:items-center p-4 mb-4 text-sm text-green-800 rounded-base bg-green-100 border border-green-300" role="alert">
        <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
        <p><span className="font-medium me-1">Sucesso!</span> Email enviado com sucesso.</p>
      </div>
    )}
    <form onSubmit={handleSubmit} className="space-y-6">
    <div>
    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
    <div className="mt-2">
      <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
    </div>
    </div>
    
    <div className="flex items-center">
    <input 
      checked={notifications} 
      onChange={(e) => setNotifications(e.target.checked)}
      id="checked-checkbox" 
      type="checkbox" 
      value="" 
      className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" 
    />
    <label htmlFor="checked-checkbox" className="select-none text-gray-400 ms-2 text-sm font-medium text-heading">Recebo todas as notificações</label>
    </div>
    <div>
    <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
    </div>
    </form>

    </div>
    </div>
    </section>
    <Footer/>
  </>
  );
};

export default EmailForm;


