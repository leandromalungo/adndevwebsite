'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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
        alert('Email enviado com sucesso!');
        setEmail('');
        setSubject('');
        setMessage('');
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Assunto"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Email'}
      </Button>
    </form>
  );
};

export default EmailForm;