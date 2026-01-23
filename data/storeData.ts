import { Product, Service } from './types';

/**
 * Produtos próprios da comunidade - merchandise oficial
 * Todos os produtos são marcados com isOwn: true
 */
export const OWN_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pack de Stickers Neon (10 unidades)",
    price: 5.00,
    platform: "Decoração",
    category: "Stickers",
    condition: "Novo",
    rating: 5,
    image: "/images/store/1.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'CV', 'GW', 'GQ', 'ST', 'BR'],
    isOwn: true,
    description: "Pack de 10 stickers neon com designs exclusivos e brilho fluorescente"
  },
  {
    id: 2,
    name: "Cantil Térmico Alumínio 500ml",
    price: 12.50,
    platform: "Utilitários",
    category: "Items",
    condition: "Novo",
    rating: 5,
    image: "/images/store/2.jpg",
    availableCountries: ['PT', 'MZ', 'ST', 'AO'],
    isOwn: true,
    description: "Cantil térmico em alumínio premium com isolamento duplo, mantém bebidas quentes ou frias"
  },
  {
    id: 3,
    name: "Chávena Cerâmica 'Loading...'",
    price: 8.99,
    platform: "Cozinha",
    category: "Items",
    condition: "Novo",
    rating: 4,
    image: "/images/store/3.jpg",
    availableCountries: ['PT', 'BR', 'AO'],
    isOwn: true,
    description: "Chávena de cerâmica com design tech 'Loading...' perfeita para programadores"
  },
  {
    id: 4,
    name: "T-shirt Retro Console Edition",
    price: 21.99,
    platform: "Unisex",
    category: "T-shirts",
    condition: "Novo",
    rating: 5,
    image: "/images/store/4.jpg",
    availableCountries: ['PT', 'CV', 'ST', 'BR'],
    isOwn: true,
    description: "T-shirt 100% algodão com design retro console dos anos 80"
  },
  {
    id: 8,
    name: "Tapete de Rato XL Premium",
    price: 25.00,
    platform: "Setup",
    category: "Outro",
    condition: "Novo",
    rating: 5,
    image: "/images/store/8.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'CV', 'GW', 'GQ', 'ST', 'BR'],
    isOwn: true,
    description: "Tapete de rato XL (900x400mm) com base antiderrapante e borda reforçada"
  },
];

/**
 * Produtos recomendados de parceiros - marketplace externo
 * Todos os produtos são marcados com isOwn: false e têm URL externa
 */
export const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 16,
    name: "Teclado Mecânico RGB",
    price: 79.99,
    platform: "Setup",
    category: "Outro",
    condition: "Novo",
    rating: 5,
    image: "/images/store/11.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'BR'],
    isOwn: false,
    externalStore: 'aliexpress',
    externalUrl: 'https://aliexpress.com/wholesale?catId=0&SearchText=mechanical+keyboard+rgb',
    description: "Teclado mecânico com switches RGB e iluminação personalizável"
  },
  {
    id: 17,
    name: "Webcam 1080p USB",
    price: 45.50,
    platform: "Setup",
    category: "Items",
    condition: "Novo",
    rating: 4,
    image: "/images/store/12.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ'],
    isOwn: false,
    externalStore: 'amazon',
    externalUrl: 'https://amazon.com/s?k=1080p+webcam+usb',
    description: "Webcam Full HD 1080p com foco automático e correção de luz"
  },
  {
    id: 18,
    name: "Monitor 24\" IPS Full HD",
    price: 189.99,
    platform: "Setup",
    category: "Outro",
    condition: "Novo",
    rating: 5,
    image: "/images/store/13.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'CV', 'ST', 'BR'],
    isOwn: false,
    externalStore: 'amazon',
    externalUrl: 'https://amazon.com/s?k=24+inch+ips+monitor+1080p',
    description: "Monitor 24 polegadas IPS Full HD com ajuste de altura e suporte VESA"
  },
  {
    id: 19,
    name: "Headset Wireless Gamer",
    price: 89.99,
    platform: "Setup",
    category: "Outro",
    condition: "Novo",
    rating: 5,
    image: "/images/store/14.jpg",
    availableCountries: ['PT', 'BR', 'AO'],
    isOwn: false,
    externalStore: 'mercadopago',
    externalUrl: 'https://www.mercadolivre.com.br/headset-gamer-wireless',
    description: "Headset sem fio profissional com som surround 7.1 e bateria de 20h"
  },
  {
    id: 20,
    name: "Mouse Óptico 3200DPI",
    price: 34.99,
    platform: "Setup",
    category: "Outro",
    condition: "Novo",
    rating: 4,
    image: "/images/store/15.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'BR'],
    isOwn: false,
    externalStore: 'aliexpress',
    externalUrl: 'https://aliexpress.com/wholesale?catId=0&SearchText=optical+mouse+3200dpi',
    description: "Mouse óptico com sensor 3200 DPI configurável e design ergonômico"
  },
  {
    id: 21,
    name: "Suporte Ergonômico para Laptop",
    price: 24.50,
    platform: "Lifestyle",
    category: "Outro",
    condition: "Novo",
    rating: 4,
    image: "/images/store/1.jpg",
    availableCountries: ['PT', 'AO', 'MZ', 'BR'],
    isOwn: false,
    externalStore: 'aliexpress',
    externalUrl: 'https://aliexpress.com/wholesale?catId=0&SearchText=laptop+stand+ergonomic',
    description: "Suporte ergonômico ajustável para laptop com dissipação de calor"
  },
];

/**
 * Serviços oferecidos pela comunidade
 * Consultoria, treinamento, mentoria e code review
 */
export const SERVICES: Service[] = [
  {
    id: 'ser-1',
    name: "Consultoria Técnica",
    description: "Orientação especializada para escolher a melhor tech stack, arquitetura e tecnologias para seu projeto específico",
    icon: "fa-chart-line",
    price: "Sob consulta",
    duration: "1h",
    category: "Consultoria",
    tags: ['Tech', 'Arquitetura', 'Strategy'],
    image: "/images/store/1.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ']
  },
  {
    id: 'ser-2',
    name: "Treinamento Corporativo",
    description: "Programas de treinamento customizados para equipes de desenvolvimento com foco em boas práticas e novas tecnologias",
    icon: "fa-graduation-cap",
    price: "Sob consulta",
    duration: "Variável (1-5 dias)",
    category: "Treinamento",
    tags: ['Educação', 'Corporativo', 'Team'],
    image: "/images/store/2.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ']
  },
  {
    id: 'ser-3',
    name: "Code Review Profissional",
    description: "Análise profissional do seu código com recomendações detalhadas de melhoria, segurança e performance",
    icon: "fa-code",
    price: "€50/hora",
    duration: "Variável",
    category: "Desenvolvimento",
    tags: ['Qualidade', 'Desenvolvimento', 'Review'],
    image: "/images/store/3.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ', 'CV']
  },
  {
    id: 'ser-4',
    name: "Mentoria 1-on-1",
    description: "Sessões de mentoria personalizada com profissionais experientes da indústria tech para desenvolvimento de carreira",
    icon: "fa-handshake",
    price: "€30/hora",
    duration: "1h",
    category: "Mentoria",
    tags: ['Desenvolvimento', 'Carreira', 'Growth'],
    image: "/images/store/4.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ', 'CV', 'ST']
  },
  {
    id: 'ser-5',
    name: "Design de Merchandise Customizado",
    description: "Criação de designs exclusivos para merchandise corporativo ou eventos da sua comunidade tech",
    icon: "fa-palette",
    price: "Sob consulta",
    duration: "2-3 semanas",
    category: "Design",
    tags: ['Design', 'Merchandise', 'Branding'],
    image: "/images/store/5.jpg",
    availableCountries: ['PT', 'BR', 'AO', 'MZ', 'CV']
  },
];

/**
 * Categorias de produtos disponíveis para filtro
 */
export const PRODUCT_CATEGORIES = [
  'T-shirts',
  'Chapéus',
  'Stickers',
  'Items',
  'Setup',
  'Outro'
];

/**
 * Categorias de serviços
 */
export const SERVICE_CATEGORIES = [
  'Consultoria',
  'Treinamento',
  'Desenvolvimento',
  'Mentoria',
  'Design'
];

/**
 * Marketplace externos suportados
 */
export const EXTERNAL_MARKETPLACES = [
  { id: 'aliexpress', name: 'AliExpress', icon: 'fa-shopping-cart', color: 'bg-red-500' },
  { id: 'amazon', name: 'Amazon', icon: 'fa-amazon', color: 'bg-amber-500' },
  { id: 'mercadopago', name: 'Mercado Livre', icon: 'fa-shopping-bag', color: 'bg-yellow-500' },
  { id: 'other', name: 'Outro', icon: 'fa-link', color: 'bg-gray-500' }
];
