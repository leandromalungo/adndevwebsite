import { GameItem } from '@/data/types';

export const HERO_GAMES: GameItem[] = [
  {
    id: 'h1',
    title: 'Economias Épicas',
    description: 'Economize até 80% em jogos imperdíveis e descubra novas aventuras.',
    releaseDate: '22 DE JANEIRO A 5 DE FEVEREIRO',
    promoText: 'Economize agora',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'h2',
    title: 'Fall Guys Crown Jam',
    description: 'Junte-se à diversão rítmica no mais novo evento do Fall Guys.',
    releaseDate: 'DISPONÍVEL AGORA',
    promoText: 'Jogue grátis',
    imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'h3',
    title: 'Deserto Carmesim',
    description: 'Faça a pré-compra de Crimson Desert e ganhe o traje Kliff no Fortnite no lançamento.',
    releaseDate: '19 DE MARÇO DE 2026',
    promoText: 'Reserve agora',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop',
    heroImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
  }
];

export const DISCOVER_GAMES: GameItem[] = [
  {
    id: 'd1',
    title: 'Odisseia Cúbica',
    subtitle: 'Jogo Base',
    price: 'R$ 73,99',
    promoText: 'Já disponível na Epic',
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  },
  {
    id: 'd2',
    title: 'BrokenLore: DEIXAR DE SEGUIR',
    subtitle: 'Jogo Base',
    price: 'R$ 52,99',
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  },
  {
    id: 'd3',
    title: 'Bult: Simulador de Caça',
    subtitle: 'Jogo Base',
    price: 'R$ 26,99',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  },
  {
    id: 'd4',
    title: 'Vá dormir',
    subtitle: 'Jogo Base',
    price: 'R$ 18,89',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  },
  {
    id: 'd5',
    title: 'A Árvore Prometida de Alden',
    subtitle: 'Jogo Base',
    price: 'R$ 10,69',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  },
  {
    id: 'd6',
    title: 'Floresta extinta',
    subtitle: 'Jogo Base',
    price: 'R$ 39,99',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=400&auto=format&fit=crop',
    heroImageUrl: '',
  }
];

export const FORTNITE_FEATURES = [
  {
    id: 'f1',
    title: 'Esta semana no Fortnite',
    description: 'Confira as últimas novidades do Fortnite, do clássico Battle Royale ao Blitz e ao Delulu. Sempre tem algo novo no Fortnite!',
    buttonText: 'Descubra agora',
    imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=800&auto=format&fit=crop',
    external: false
  },
  {
    id: 'f2',
    title: 'Fortnite',
    description: 'O gerente regional e o assistente do gerente regional da Dunder Mifflin acabaram de registrar o ponto.',
    buttonText: 'Veja na loja',
    imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=800&auto=format&fit=crop',
    external: true
  },
  {
    id: 'f3',
    title: 'Fortnite',
    description: 'Os outros itens do pacote Psyonic Ink já estão disponíveis na loja!',
    buttonText: 'Veja na loja',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    external: true
  }
];

export interface ChartItem {
  id: string;
  title: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  tag?: string;
  imageUrl: string;
  status?: string;
  hasCrown?: boolean;
}

export const TOP_CHARTS = {
  maisVendidos: [
    { id: 'mv1', title: 'Invasores ARC', price: 'R$ 171,80', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop' },
    { id: 'mv2', title: 'EA SPORTS FC™ 26 Edição Padrão', price: 'R$ 299', tag: 'Teste disponível', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=150&auto=format&fit=crop' },
    { id: 'mv3', title: 'Dead by Daylight', price: 'R$ 69,99', imageUrl: 'https://images.unsplash.com/photo-1605898399789-197933c51ed1?q=80&w=150&auto=format&fit=crop' },
    { id: 'mv4', title: 'Grand Theft Auto V Aprimorado', price: 'R$ 149,90', imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=150&auto=format&fit=crop' },
    { id: 'mv5', title: 'Mount & Blade II: Bannerlord', price: 'R$ 99,99', oldPrice: 'R$ 199,99', discount: '-50%', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=150&auto=format&fit=crop' },
  ],
  maisTocados: [
    { id: 'mt1', title: 'Fortnite', status: 'Livre', imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=150&auto=format&fit=crop' },
    { id: 'mt2', title: 'Rocket League®', status: 'Livre', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=150&auto=format&fit=crop' },
    { id: 'mt3', title: 'Grand Theft Auto V Aprimorado', price: 'R$ 149,90', imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=150&auto=format&fit=crop' },
    { id: 'mt4', title: 'Genshin Impact', status: 'Livre', imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=150&auto=format&fit=crop' },
    { id: 'mt5', title: 'Arknights: Endfield', status: 'Livre', imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=150&auto=format&fit=crop' },
  ],
  listaDesejos: [
    { id: 'ld1', title: 'Marés de Aniquilação', status: 'Em breve', imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=150&auto=format&fit=crop' },
    { id: 'ld2', title: 'MONGIL: MERGULHO ESTELAR', status: 'Em breve', tag: 'Primeira execução', hasCrown: true, imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=150&auto=format&fit=crop' },
    { id: 'ld3', title: 'Sem palavras', status: 'Em breve', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=150&auto=format&fit=crop' },
    { id: 'ld4', title: 'Subnautica 2', status: 'Em breve', imageUrl: 'https://images.unsplash.com/photo-1551103756-84af0af5a24e?q=80&w=150&auto=format&fit=crop' },
    { id: 'ld5', title: 'Parque Jurássico: Sobrevivência', status: 'Em breve', imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=150&auto=format&fit=crop' },
  ]
};

export const POPULAR_NEWS = [
  { id: 'n1', time: '20 horas e 31 minutos', title: 'Nintendo Direct: Tudo Anunciado - O Filme do Super Mario Galaxy', comments: 0 },
  { id: 'n2', time: '6 dias, 17 horas', title: "'Muito obrigado a todos': Rockstar Games parece ter realizado o dese...", comments: 0 },
  { id: 'n3', time: '4 dias, 19 horas', title: 'Crimson Desert tem data de lançamento confirmada para març...', comments: 0 },
  { id: 'n4', time: '3 dias, 22 horas', title: 'A Ubisoft afirma que o remake de Prince of Persia: The Sands of Tim...', comments: 0 },
  { id: 'n5', time: '4 dias, 22 horas', title: 'Criador de mod de realidade virtual para Cyberpunk 2077 que sofreu...', comments: 1 },
];

export const LATEST_NEWS_FEED = [
  {
    id: 'ln1',
    title: 'Nintendo Direct: Tudo Anunciado - O Filme do Super Mario Galaxy',
    description: '20 horas e 31 minutos - Yoshi! Birdo! E um dinossauro!',
    imageUrl: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=400&auto=format&fit=crop',
    tag: 'O FILME DO SUPER MARIO GALAXY',
    author: 'TOM PHILLIPS',
    hasComments: false
  },
  {
    id: 'ln2',
    title: 'Evento do 40º aniversário de Dragon Ball: Tudo revelado',
    description: '1 dia, 1 hora - Duas novas séries de anime para TV, um novo jogo e um novo DLC "gigantesco".',
    imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400&auto=format&fit=crop',
    tag: 'IDADE 1000',
    author: 'VERITY TOWNSEND',
    hasComments: false
  },
  {
    id: 'ln3',
    title: 'Processo alega que a Hasbro enganou investidores em relação às vendas do controverso conjunto de aniversário de Magic: the Gathering.',
    description: '2 dias e 11 horas - "Funcionários da Wizards viram fotos de coleções comemorativas de Magic descartadas em um aterro sanitário no Texas."',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop',
    tag: 'MAGIC: THE GATHERING [1996]',
    author: 'REBECA VALENTINE',
    hasComments: false
  },
  {
    id: 'ln4',
    title: "'Por favor, tentem ser amigáveis com os outros hóspedes' – Jogadores do Arc Raiders bombardeiam o Hotel Stella Montis da vida real com avaliações de 5 estrelas",
    description: '2 dias e 11 horas - Não se esqueça do seu kit de equipamentos gratuito!',
    imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=400&auto=format&fit=crop',
    tag: 'INVASORES DO ARCO',
    author: 'MICHAEL CRIPE',
    hasComments: false
  }
];

export const MAGAZINE_FEATURES = [
  { id: 'mf1', text: 'Impresso + Digital (10 edições/ano)' },
  { id: 'mf2', text: 'Funcionalidades exclusivas da Web' },
  { id: 'mf3', text: 'Menos anúncios' },
  { id: 'mf4', text: '5% apoia o St. Jude.' },
  { id: 'mf5', text: 'Mais de 360 revistas arquivadas' }
];

export const WEEKLY_HIGHLIGHTS = [
  {
    id: 'wh1',
    category: 'NOTÍCIAS',
    title: 'A Ubisoft cancela o remake de Prince of Persia e outros 5 jogos como parte de uma grande reestruturação organizacional.',
    description: 'O estúdio também está adiando sete projetos ainda não anunciados que estavam em desenvolvimento.',
    author: 'Marcus Stewart',
    date: '21 de janeiro de 2026',
    time: '11h51',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wh2',
    category: 'XBOX DEVELOPER DIRECT',
    title: 'A nova fábula finalmente chega no outono deste ano.',
    description: 'A Microsoft e a desenvolvedora Playground Games detalharam o que esperar do novo título da franquia Fable.',
    author: 'Kyle Hilliard',
    date: '22 de janeiro de 2026',
    time: '13h24',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wh3',
    category: 'NOTÍCIAS',
    title: 'Chloe Price retorna em Life is Strange: Reunion em março.',
    description: 'Esta sequência direta de Life is Strange: Double Exposure reúne Max e sua melhor amiga, uma das favoritas dos fãs.',
    author: 'Marcus Stewart',
    date: '20 de janeiro de 2026',
    time: '12h00',
    imageUrl: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wh4',
    category: 'NOTÍCIAS',
    title: "Rockstar North 'aberta e em funcionamento' após bombeiros responderem a uma explosão relatada na sala de caldeiras.",
    description: 'Uma aparente explosão ocorreu na madrugada de segunda-feira no estúdio localizado em Edimburgo.',
    author: 'Marcus Stewart',
    date: '19 de janeiro de 2026',
    time: '12h40',
    imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wh5',
    category: 'NOTÍCIAS',
    title: 'O ex-presidente da Nintendo of America, Doug Bowser, entra para o conselho da Hasbro semanas após sua aposentadoria.',
    description: 'Carla Vernón, CEO da The Honest Company, Inc., também está se juntando ao conselho administrativo da Hasbro.',
    author: 'Charles Harte',
    date: '20 de janeiro de 2026',
    time: '09h55',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wh6',
    category: 'NOTÍCIAS',
    title: 'A maratona começa no início de março.',
    description: 'O aguardado jogo de tiro com elementos de extração da Bungie finalmente ganhou uma nova data de lançamento.',
    author: 'Marcus Stewart',
    date: '19 de janeiro de 2026',
    time: '11h53',
    imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=600&auto=format&fit=crop'
  }
];

export interface GOGPreservationItem {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  discount: string;
  imageUrl: string;
}

export const GOG_PRESERVATION_GAMES: GOGPreservationItem[] = [
  {
    id: 'gog1',
    title: 'Sopro de Fogo IV',
    price: '$ 4,99',
    oldPrice: '$ 9,99',
    discount: '-50%',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog2',
    title: 'Heróis de Poder e Magia® 3: Completo',
    price: '$ 4,99',
    oldPrice: '$ 9,99',
    discount: '-50%',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog3',
    title: 'Fallout: New Vegas Ultimate Edition',
    price: '$ 9,99',
    oldPrice: '$ 19,99',
    discount: '-50%',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog4',
    title: 'Total War: MEDIEVAL II – Edição Definitiva',
    price: '$ 4,99',
    oldPrice: '$ 24,99',
    discount: '-80%',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog5',
    title: 'The Witcher 2: Assassins of Kings Enhanced Edition',
    price: '$ 2,99',
    oldPrice: '$ 19,99',
    discount: '-85%',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog6',
    title: 'Fallout',
    price: '$ 4,99',
    oldPrice: '$ 9,99',
    discount: '-50%',
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gog7',
    title: 'SWAT 4: Edição Ouro',
    price: '$ 4,99',
    oldPrice: '$ 9,99',
    discount: '-50%',
    imageUrl: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=600&auto=format&fit=crop'
  }
];

// Fallback para o componente antigo se necessário
export const GAMES_DATA = HERO_GAMES;