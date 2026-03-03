'use client';

import { CTACardsGrid } from '@/components/home/cardCta/card';

export function CTACardsContainer() {
  const ctaCardsData = [
    {
      label: 'Esteja a par do universo ao seu redor',
      title: 'Receba as últimas notícias e tendências do mercado de tecnologia diretamente no seu telefone.',
      buttonText: 'Assinar newsletter',
      backgroundImage: '/test1.jpg',
    },
    {
      label: 'Recursos exclusivos para profissionais',
      title: 'Acesse recursos exclusivos para profissionais da área de tecnologia.',
      buttonText: 'Entrar no canal',
      backgroundImage: '/teste2.png',
    },
    {
      label: 'Meets ao vivo',
      title: 'Participe de nossos encontros ao vivo para aprender e se conectar com outros profissionais.',
      buttonText: 'Entrar no meet',
      backgroundImage: '/teste3.jpg',
    },
    {
      label: 'Community Channel',
      title: 'Participe do nosso canal no Whatsapp onde compartilhamos diversas oportunidades',
      buttonText: 'Entrar no canal',
      backgroundImage: '/teste4.jpg',
    }
  ];

  return <CTACardsGrid cards={ctaCardsData} />;
}