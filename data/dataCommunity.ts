import { Community } from './types';

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'AfterData',
    location: 'Maringá, PR',
    country: 'Brasil',
    description: 'Estamos buscando em toda a comunidade profissionais e entusiastas de Data Science par...',
    members: 60,
    type: 'Meetup',
    category: 'Dados',
    tags: ['Data Engineering', 'Data Analysis', 'Data Science', 'Deep Learning', 'Redes Industriais'],
    link: 'https://meetup.com/afterdata',
    imageSource: 'Unsplash / AfterData'
  },
  {
    id: '2',
    name: 'Agilidade.org',
    location: 'Remota',
    country: 'Portugal',
    description: 'O objetivo do "Slack de Agilidade" é promover o ágil para falantes do Português. ...',
    members: 6000,
    type: 'Slack',
    category: 'Agile',
    tags: ['DevOps', 'Kanban', 'Scrum', 'Startups', 'UX'],
    link: 'https://agilidade.org',
    imageSource: 'Pexels / Agilidade'
  },
  {
    id: '3',
    name: 'All Saints Bay',
    location: 'Salvador, BA',
    country: 'Brasil',
    description: 'Uma comunidade com foco em desenvolver ecossistema inovador e fomentar o empreendedor...',
    members: 200,
    type: '',
    category: 'Ecossistema',
    tags: ['Startups', 'Scrum', 'Kanban', 'Data Science', 'Deep Learning']
  },
  {
    id: '4',
    name: 'Android Dev BR',
    location: 'Remota',
    country: 'Brasil',
    description: 'Somos uma comunidade brasileira, focada em conteúdo em português, para troca de exper...',
    members: 8200,
    type: 'Slack',
    category: 'Desenvolvimento de software',
    tags: ['Android', 'Kotlin']
  },

  //Addd community aqui desta forma,{content},
];
