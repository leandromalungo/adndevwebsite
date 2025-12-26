
import { Edition, Category } from '../../data/types';

export const CATEGORIES: Category[] = [
  "DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SABADO",
];

const DEFAULT_AUTHOR = {
  author: "the news editor",
  authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=editor",
  tags: ["newsletter", "morning", "daily"],
  reactions: 124,
  commentsCount: 18,
  readTime: "5",
};

export const MOCK_EDITIONS: Edition[] = [
  {
    id: "1",
    title: "19/12/2025",
    date: "Dec 19, 2025",
    displayDate: "19/12/2025",
    relativeTime: "11 hours ago",
    imageUrl: "https://picsum.photos/seed/police/800/400",
    ...DEFAULT_AUTHOR,
    tags: ["POLÍTICA", "ECONOMIA", "BRASIL"],
    topComments: [
      {
        author: "Marcos Silva",
        authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos",
        text: "Incrível como o mercado reagiu hoje!",
        timeAgo: "2h ago"
      }
    ]
  },
  {
    id: "2",
    title: "NIGHT #114",
    date: "Dec 18, 2025",
    displayDate: "18/12/2025",
    relativeTime: "23 hours ago",
    imageUrl: "https://picsum.photos/seed/crowd/800/400",
    category: "DOMINGO",
    hasLogo: true,
    author: "the night crew",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=night",
    tags: ["TECH", "ENTRETENIMENTO"],
    reactions: 89,
    commentsCount: 12,
    readTime: "3",
  },
  {
    id: "3",
    title: "18/12/2025",
    date: "Dec 18, 2025",
    displayDate: "18/12/2025",
    relativeTime: "Dec 18, 2025",
    imageUrl: "https://picsum.photos/seed/puzzle/800/400",
    ...DEFAULT_AUTHOR,
    tags: ["NEGÓCIOS", "CARREIRA"],
    reactions: 210,
    commentsCount: 45,
    readTime: "6",
  },
  {
    id: "4",
    title: "NIGHT #113",
    date: "Dec 17, 2025",
    displayDate: "17/12/2025",
    relativeTime: "Dec 17, 2025",
    imageUrl: "https://picsum.photos/seed/goalkeeper/800/400",
    category: "DOMINGO",
    hasLogo: true,
    author: "the night crew",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=night",
    tags: ["ESPORTES", "TECNOLOGIA"],
    reactions: 56,
    commentsCount: 8,
    readTime: "4",
  },
  {
    id: "5",
    title: "17/12/2025",
    date: "Dec 17, 2025",
    displayDate: "17/12/2025",
    relativeTime: "Dec 17, 2025",
    imageUrl: "https://picsum.photos/seed/building/800/400",
    ...DEFAULT_AUTHOR,
    tags: ["MUNDO", "SOCIEDADE"],
    reactions: 342,
    commentsCount: 67,
    readTime: "7",
  },
  {
    id: "6",
    title: "NIGHT #112",
    date: "Dec 16, 2025",
    displayDate: "16/12/2025",
    relativeTime: "Dec 16, 2025",
    imageUrl: "https://picsum.photos/seed/suit/800/400",
    category: "DOMINGO",
    hasLogo: true,
    author: "the night crew",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=night",
    tags: ["MODA", "ESTILO"],
    reactions: 120,
    commentsCount: 22,
    readTime: "4",
  }
];
