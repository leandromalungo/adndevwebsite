import type { Event } from '@/data/types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'RDU: Greeting Card and Holiday Celebration! (ages 9-17)',
    description: 'Design it, animate it, share it.',
    date: 'December 20, 2025',
    timeRange: '4:00 PM - 9:00 PM WAT',
    location: 'Cherry Bldg, 715 Barbour Dr, Raleigh, NC 27603, USA',
    country: 'Angola', 
    organizer: 'BGC Programs Team Admins',
    organizerLogo: 'https://picsum.photos/40/40?random=1',
    imageUrl: 'https://picsum.photos/600/400?random=101',
    isOnline: false,
    isFree: true,
    day: '20',
    month: 'Dec',
    tags: ['Ages 13-18', 'Ages 7-13', 'In Person', 'Technical Workshop']
  },
  {
    id: '2',
    title: 'Santa\'s AI Workshop: Design Your Dream Product (Ages 14-18)',
    description: 'Explore AI tools and design concepts.',
    date: 'December 19, 2025',
    timeRange: '12:00 AM - 2:00 AM WAT',
    location: 'Online event',
    country: 'Online',
    organizer: 'BGC Programs Team Admins',
    organizerLogo: 'https://picsum.photos/40/40?random=2',
    imageUrl: 'https://picsum.photos/600/400?random=102',
    isOnline: true,
    isFree: false,
    day: '19',
    month: 'Dec',
    tags: ['Ages 13-18', 'Technical Workshop', 'Virtual']
  },
  {
    id: '3',
    title: 'Code Your Winter Holiday Game in Scratch (Ages 10-13)',
    description: 'Learn game mechanics with Scratch.',
    date: 'December 17, 2025',
    timeRange: '12:00 AM - 2:00 AM WAT',
    location: 'Online event',
    country: 'Online',
    organizer: 'BGC Programs Team Admins',
    organizerLogo: 'https://picsum.photos/40/40?random=3',
    imageUrl: 'https://picsum.photos/600/400?random=103',
    isOnline: true,
    isFree: false,
    day: '17',
    month: 'Dec',
    tags: ['Ages 13-18', 'Technical Workshop', 'Virtual']
  },
  {
    id: '4',
    title: 'CHICAGO: Holiday Greeting Cards in Scratch',
    description: 'Code your cheer.',
    date: 'December 13, 2025',
    timeRange: '8:00 PM - 10:00 PM WAT',
    location: '6343 S Halsted St, Chicago, IL 60621, USA',
    country: 'Brasil', // Presencial em país lusófono
    organizer: 'BGC Programs Team Admins',
    organizerLogo: 'https://picsum.photos/40/40?random=4',
    imageUrl: 'https://picsum.photos/600/400?random=104',
    isOnline: false,
    isFree: true,
    day: '13',
    month: 'Dec',
    tags: ['In Person', 'Technical Workshop']
  },
  {
    id: '5',
    title: 'HOLIDAY GREETING CARDS IN SCRATCH (AGE 10-13) <HOUSTON>',
    description: 'Code your cheer.',
    date: 'December 13, 2025',
    timeRange: '4:00 PM - 7:00 PM WAT',
    location: 'Houston, TX',
    country: 'Portugal', // Presencial em país lusófono
    organizer: 'BGC Programs Team Admins',
    organizerLogo: 'https://picsum.photos/40/40?random=5',
    imageUrl: 'https://picsum.photos/600/400?random=105',
    isOnline: false,
    isFree: true,
    day: '13',
    month: 'Dec',
    tags: ['In Person', 'Technical Workshop']
  }
];
