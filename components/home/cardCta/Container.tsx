'use client';

import { CTACardsGrid } from '@/components/home/cardCta/card';

export function CTACardsContainer() {
  const ctaCardsData = [
    {
      label: 'Compartilhe seu trabalho',
      title: 'Envie seu site para obter visibilidade e reconhecimento.',
      buttonText: 'Enviar site',
      backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      label: 'Seja um membro',
      title: 'Tenha acesso a recursos exclusivos para profissionais.',
      buttonText: 'Seja profissional',
      backgroundImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
  ];

  return <CTACardsGrid cards={ctaCardsData} />;
}