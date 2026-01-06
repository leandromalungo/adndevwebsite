
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
    { id: 'dev-1', title: 'Server Performance Stats', description: 'Write a script to analyse basic server performance stats.', difficulty: 'Junior', tag: 'CLI', startedCount: '5,157 Started' },
    { id: 'dev-2', title: 'Log Archive Tool', description: 'Build a tool to archive logs from the CLI with the date and time.', difficulty: 'Junior', tag: 'CLI', startedCount: '1,577 Started' },
    { id: 'dev-3', title: 'Nginx Log Analyser', description: 'Write a simple tool to analyze logs from the command line.', difficulty: 'Junior', tag: 'CLI', startedCount: '580 Started' },
    { id: 'dev-4', title: 'GitHub Pages Deployment', description: 'Write a simple GitHub Actions workflow to deploy a static website.', difficulty: 'Junior', tag: 'CI / CD', startedCount: '591 Started' },
    { id: 'dev-5', title: 'Dockerize a Legacy App', description: 'Containerize an old PHP or Java application and run it with Compose.', difficulty: 'Pleno', tag: 'Docker', startedCount: '2,310 Started' },
    { id: 'dev-6', title: 'Kubernetes Cluster Setup', description: 'Provision a production-grade K8s cluster on AWS using Terraform.', difficulty: 'Senior', tag: 'K8s', startedCount: '890 Started' },
  ],
  'Frontend': [
    { id: 'fe-1', title: 'Personal Portfolio', description: 'Build a responsive personal website using HTML, CSS and JS.', difficulty: 'Junior', tag: 'Web', startedCount: '15,200 Started' },
    { id: 'fe-2', title: 'Weather Dashboard', description: 'Fetch and display real-time weather data from an external API.', difficulty: 'Junior', tag: 'API', startedCount: '8,430 Started' },
    { id: 'fe-3', title: 'E-commerce UI Prototype', description: 'Create a complex store interface with filtering and cart logic.', difficulty: 'Pleno', tag: 'React', startedCount: '4,100 Started' },
    { id: 'fe-4', title: 'Custom Component Library', description: 'Build and document a set of reusable UI components with Storybook.', difficulty: 'Senior', tag: 'Design System', startedCount: '1,200 Started' },
  ],
  'Backend': [
    { id: 'be-1', title: 'Task Management API', description: 'Build a RESTful API for tasks with CRUD operations.', difficulty: 'Junior', tag: 'Node.js', startedCount: '12,100 Started' },
    { id: 'be-2', title: 'URL Shortener', description: 'Create a service that converts long URLs into short, unique aliases.', difficulty: 'Junior', tag: 'Redis', startedCount: '7,500 Started' },
    { id: 'be-3', title: 'Real-time Chat Engine', description: 'Implement a chat server using WebSockets for instant messaging.', difficulty: 'Pleno', tag: 'Socket.io', startedCount: '3,800 Started' },
    { id: 'be-4', title: 'Distributed Microservices', description: 'Build a system of services communicating via gRPC or Message Queues.', difficulty: 'Senior', tag: 'Architecture', startedCount: '950 Started' },
  ],
  'Python': [
    { id: 'py-1', title: 'Web Scraper', description: 'Extract data from multiple web pages and save it to a CSV file.', difficulty: 'Junior', tag: 'Scripting', startedCount: '9,200 Started' },
    { id: 'py-2', title: 'Number Guessing Game', description: 'A classic command-line game with difficulty levels.', difficulty: 'Junior', tag: 'CLI', startedCount: '18,400 Started' },
    { id: 'py-3', title: 'Data Analysis with Pandas', description: 'Analyse a large dataset and generate visual insights.', difficulty: 'Pleno', tag: 'Data Science', startedCount: '4,600 Started' },
    { id: 'py-4', title: 'Django Blog Platform', description: 'Build a full-featured blog with auth, comments and admin panel.', difficulty: 'Pleno', tag: 'Web', startedCount: '3,100 Started' },
  ],
  'SQL': [
    { id: 'sql-1', title: 'Library Management DB', description: 'Design a schema for books, authors and rentals.', difficulty: 'Junior', tag: 'Design', startedCount: '6,400 Started' },
    { id: 'sql-2', title: 'Analytics Dashboard Queries', description: 'Write complex SQL joins to report business KPIs.', difficulty: 'Pleno', tag: 'Analytics', startedCount: '2,900 Started' },
    { id: 'sql-3', title: 'Database Optimization Task', description: 'Identify slow queries and implement indexing strategies.', difficulty: 'Senior', tag: 'Performance', startedCount: '1,100 Started' },
  ],
  'AI Engineer': [
    { id: 'ai-1', title: 'Sentiment Analysis Bot', description: 'Classify text reviews as positive or negative using ML.', difficulty: 'Junior', tag: 'ML', startedCount: '4,200 Started' },
    { id: 'ai-2', title: 'RAG-based Chatbot', description: 'Build a bot that answers questions based on your own documents.', difficulty: 'Pleno', tag: 'LLM', startedCount: '2,100 Started' },
    { id: 'ai-3', title: 'Image Recognition App', description: 'Identify objects in real-time images using computer vision.', difficulty: 'Senior', tag: 'Vision', startedCount: '700 Started' },
  ],
  'default': [
    { id: 'd1', title: 'Core Concepts Project', description: 'A project designed to reinforce the fundamental principles of this track.', difficulty: 'Junior', tag: 'Fundamentals', startedCount: '1,400 Started' },
    { id: 'd2', title: 'Pleno Challenge', description: 'Take your skills to the next level with this integrated scenario.', difficulty: 'Pleno', tag: 'Challenge', startedCount: '800 Started' },
    { id: 'd3', title: 'Senior Capstone', description: 'Design and implement a complex solution following industry best practices.', difficulty: 'Senior', tag: 'Capstone', startedCount: '300 Started' },
  ]
};
