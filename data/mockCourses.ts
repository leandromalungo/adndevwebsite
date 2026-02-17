
import { Funcao } from '@/data/types';

export interface Course {
    id: string;
    title: string;
    provider: string; // e.g., Coursera, Udacity, YouTube
    platformLogo?: string; // URL for the provider's logo
    description: string;
    duration?: string;
    level?: 'Iniciante' | 'Intermediário' | 'Avançado';
    rating?: number;
    url: string;
    imageUrl?: string;
    tags: string[];
    area: string; // Should match the slug of the Funcao.titulo or the titulo itself
}

export const MOCK_COURSES: Course[] = [
    // Desenvolvedor Full Stack
    {
        id: 'fs-1',
        title: 'The Web Developer Bootcamp 2024',
        provider: 'Udemy',
        description: 'The only course you need to learn web development - HTML, CSS, JS, Node, and more!',
        duration: '64h',
        level: 'Iniciante',
        rating: 4.8,
        url: 'https://www.udemy.com/course/the-web-developer-bootcamp/',
        imageUrl: 'https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg',
        tags: ['Web Development', 'Full Stack', 'JavaScript'],
        area: 'Desenvolvedor Full Stack'
    },
    {
        id: 'fs-2',
        title: 'Full Stack Open 2024',
        provider: 'University of Helsinki',
        description: 'Deep dive into modern web development with React, Redux, Node.js, manufacturing, and GraphQL.',
        duration: '6h',
        level: 'Intermediário',
        rating: 5.0,
        url: 'https://fullstackopen.com/en/',
        imageUrl: 'https://fullstackopen.com/static/og-image.png', // Placeholder
        tags: ['React', 'Node.js', 'GraphQL'],
        area: 'Desenvolvedor Full Stack'
    },
    {
        id: 'fs-3',
        title: 'CS50\'s Web Programming with Python and JavaScript',
        provider: 'Harvard University (edX)',
        description: 'Dive into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap.',
        duration: '12h',
        level: 'Intermediário',
        rating: 4.9,
        url: 'https://cs50.harvard.edu/web/',
        imageUrl: 'https://prod-discovery.edx-cdn.org/media/course/image/127161b3-4696-418b-bd69-6330441400d7-628f52077e2d.small.png',
        tags: ['Python', 'Django', 'JavaScript', 'SQL'],
        area: 'Desenvolvedor Full Stack'
    },

    // Cientista de Dados
    {
        id: 'ds-1',
        title: 'IBM Data Science Professional Certificate',
        provider: 'Coursera',
        description: 'Kickstart your career in data science & ML. Build data science skills, learn Python & SQL, analyze & visualize data, build machine learning models.',
        duration: '5h',
        level: 'Iniciante',
        rating: 4.6,
        url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipcts31.cloudfront.net/13/2635a8286f455e88849b28b7e67e33/Professional-Certificate---Data-Science---600x600.png?auto=format%2Ccompress&dpr=1',
        tags: ['Data Science', 'Python', 'SQL'],
        area: 'Cientista de dados'
    },
    {
        id: 'ds-2',
        title: 'Machine Learning Specialization',
        provider: 'Coursera (Andrew Ng)',
        description: '#1 Machine Learning Specialization. Build ML models with NumPy & scikit-learn, build & train neural networks with TensorFlow & Keras.',
        duration: '2h',
        level: 'Iniciante',
        rating: 4.9,
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        imageUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipcts31.cloudfront.net/49/a1f599905c43d2975bed3c1664bf80/Specialization-logo.jpg?auto=format%2Ccompress&dpr=1',
        tags: ['Machine Learning', 'AI', 'Python'],
        area: 'Cientista de dados'
    },

    // Desenvolvedor Mobile
    {
        id: 'mob-1',
        title: 'Meta React Native Specialization',
        provider: 'Coursera',
        description: 'Launch Your Career as a React Native Developer. Build cross-platform mobile apps using React Native.',
        duration: '8h',
        level: 'Iniciante',
        rating: 4.7,
        url: 'https://www.coursera.org/specializations/meta-react-native',
        tags: ['React Native', 'Mobile Development', 'JavaScript'],
        area: 'Desenvolvedor Mobile'
    },

    // UX Designer
    {
        id: 'ux-1',
        title: 'Google UX Design Professional Certificate',
        provider: 'Coursera',
        description: 'This is your path to a career in UX design. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months.',
        duration: '6h',
        level: 'Iniciante',
        rating: 4.8,
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
        tags: ['UX Design', 'Figma', 'Prototyping'],
        area: 'UX Designer' // Note: This area wasn't in the original mock list, but adding for completeness if it appears
    }
];
