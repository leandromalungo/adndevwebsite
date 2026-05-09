'use client';

import { FormEvent } from 'react';

interface DeletePublicationFormProps {
  id: number;
  type: 'event' | 'scholarship' | 'community';
  label: string;
  action: (formData: FormData) => Promise<void>;
}

export function DeletePublicationForm({
  id,
  type,
  label,
  action,
}: DeletePublicationFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const typeLabel =
      type === 'event'
        ? 'evento'
        : type === 'scholarship'
          ? 'bolsa'
          : 'comunidade';

    if (!confirm(`Tem certeza que deseja eliminar esta ${typeLabel}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} className="border-t border-gray-200 pt-2" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
      >
        Eliminar {type === 'event' ? 'Evento' : type === 'scholarship' ? 'Bolsa' : 'Comunidade'}
      </button>
    </form>
  );
}
