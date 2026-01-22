
import { RoadmapItem, Project } from '@/data/types';

export const ROLE_ROADMAPS: RoadmapItem[] = [
  { id: 'role-1', title: 'Frontend' },
  { id: 'role-2', title: 'Backend' },
  { id: 'role-3', title: 'Full Stack' },
  { id: 'role-4', title: 'DevOps' },
  { id: 'role-5', title: 'DevSecOps', isNew: true },
  { id: 'role-27', title: 'Site Reliability Engineer (SRE)', isNew: true },
  { id: 'role-6', title: 'Data Analyst' },
  { id: 'role-7', title: 'AI Engineer' },
  { id: 'role-17', title: 'Cyber Security' },
  { id: 'role-18', title: 'UX Design' },
];

export const SKILL_ROADMAPS: RoadmapItem[] = [
  { id: 'skill-1', title: 'SQL' },
  { id: 'skill-3', title: 'React' },
  { id: 'skill-4', title: 'Vue' },
  { id: 'skill-7', title: 'TypeScript' },
  { id: 'skill-8', title: 'Node.js' },
  { id: 'skill-9', title: 'Python' },
  { id: 'skill-27', title: 'Docker' },
  { id: 'skill-26', title: 'Kubernetes' },
  { id: 'skill-18', title: 'Go Roadmap' },
  { id: 'skill-37', title: 'Next.js' },
];

export const PROJECT_IDEAS: RoadmapItem[] = [
  { id: 'project-1', title: 'Frontend' },
  { id: 'project-2', title: 'Backend' },
  { id: 'project-3', title: 'DevOps' },
];

export const BEST_PRACTICES: RoadmapItem[] = [
  { id: 'practice-2', title: 'API Security' },
  { id: 'practice-6', title: 'Testing & QA', isNew: true },
  { id: 'practice-7', title: 'Clean Code' },
];

export const MOCK_PROJECTS: Record<string, Project[]> = {
  'DevOps': [
    { id: 'dev-1', title: 'Server Performance Stats', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Junior' },
    { id: 'dev-2', title: 'Log Archive Tool', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.nd time.', difficulty: 'Junior' },
    { id: 'dev-3', title: 'Nginx Log Analyser', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis..', difficulty: 'Junior' },
    { id: 'dev-4', title: 'GitHub Pages Deployment', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis. website.', difficulty: 'Junior' },
    { id: 'dev-5', title: 'Dockerize a Legacy App', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.th Compose.', difficulty: 'Pleno' },
    { id: 'dev-6', title: 'Kubernetes Cluster Setup', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.raform.', difficulty: 'Senior' },
  ],
  'Frontend': [
    { id: 'fe-1', title: 'Portfolio Pessoal', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Junior' },
    { id: 'fe-2', title: 'Weather Dashboard', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Junior' },
    { id: 'fe-3', title: 'E-commerce UI Prototype', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Pleno' },
    { id: 'fe-4', title: 'Custom Component Library', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.torybook.', difficulty: 'Senior' },
  ],
  'Backend': [
    { id: 'be-1', title: 'Task Management API', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Junior' },
    { id: 'be-2', title: 'URL Shortener', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.ue aliases.', difficulty: 'Junior' },
    { id: 'be-3', title: 'Real-time Chat Engine', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.aging.', difficulty: 'Pleno' },
    { id: 'be-4', title: 'Distributed Microservices', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.age Queues.', difficulty: 'Senior' },
  ],
  'Python': [
    { id: 'py-1', title: 'Web Scraper', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis. file.', difficulty: 'Junior' },
    { id: 'py-2', title: 'Number Guessing Game', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.ficulty:', difficulty:'Junior' },
    { id: 'py-3', title: 'Data Analysis with Pandas', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Pleno' },
    { id: 'py-4', title: 'Django Blog Platform', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.panel.', difficulty: 'Pleno'},
  ],
  'SQL': [
    { id: 'sql-1', title: 'Library Management DB', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.lty:', difficulty:'Junior' },
    { id: 'sql-2', title: 'Analytics Dashboard Queries', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.ulty:', difficulty: 'Pleno' },
    { id: 'sql-3', title: 'Database Optimization Task', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Senior' },
  ],
  'AI Engineer': [
    { id: 'ai-1', title: 'Sentiment Analysis Bot', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.', difficulty: 'Junior'},
    { id: 'ai-2', title: 'RAG-based Chatbot', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.ments.', difficulty: 'Pleno'},
    { id: 'ai-3', title: 'Image Recognition App', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.n.', difficulty: 'Senior'},
  ],
  'default': [
    { id: 'd1', title: 'Core Concepts Project', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.s of this track.', difficulty: 'Junior' },
    { id: 'd2', title: 'Pleno Challenge', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.cenario.', difficulty: 'Pleno' },
    { id: 'd3', title: 'Senior Capstone', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolorum delectus eaque libero earum rerum soluta laborum, nemo fugiat perferendis.y best practices.', difficulty: 'Senior' },
  ]
};
