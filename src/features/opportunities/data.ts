import {Opportunity} from './types';

export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    organization: 'Kabul Tech Community',
    category: 'Internship',
    location: 'Kabul',
    type: 'Remote',
    deadline: '2026-07-20',
    description: 'Beginner friendly internship for React developers.',
    requirements: ['HTML', 'CSS', 'React'],
    applyLink: '#',
    tags: ['React', 'Frontend']
  },
  {
    id: '2',
    title: 'Remote UI Designer',
    organization: 'Global Studio',
    category: 'Remote',
    location: 'Online',
    type: 'Remote',
    deadline: '2026-08-01',
    description: 'Work remotely as UI designer.',
    requirements: ['Figma', 'UI Design'],
    applyLink: '#',
    tags: ['Design', 'Figma']
  }
];