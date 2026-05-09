'use client';

import { CTACardsGrid } from '@/components/home/cardCta/card';

export function CTACardsContainer() {
  const ctaCardsData = [
    {
      label: 'Esteja a par do universo ao seu redor',
      title: 'Receba as últimas notícias e tendências do mercado de tecnologia diretamente no seu telefone.',
      buttonText: 'Assinar newsletter',
      backgroundImage: '/card1.jpg',
      href: 'https://newsletter.adndeveloper.com',
    },
    {
      label: 'Estude connosco',
      title: 'Participe de uma consultoria de orientação profissional personalizada para impulsionar sua carreira em tecnologia.',
      buttonText: 'Agendar consultoria',
      backgroundImage: '/card2.jpg',
      href: 'https://discord.gg/adndeveloper',
    },
    {
      label: 'Meets ao vivo',
      title: 'Participe de nossos encontros ao vivo para aprender e se conectar com outros profissionais.',
      buttonText: 'Entrar no meet',
      backgroundImage: '/card3.jpg',
      href: 'https://meet.google.com/adn-developer',
    },
    {
      label: 'Community Channel',
      title: 'Participe do nosso canal no Whatsapp onde compartilhamos diversas oportunidades',
      buttonText: 'Entrar no canal',
      backgroundImage: '/card4.jpg',
      href: 'https://whatsapp.com/channel/0029Vb7bFUr5PO0shlTmDN1T',
    }
  ];

  return <CTACardsGrid cards={ctaCardsData} />;
}