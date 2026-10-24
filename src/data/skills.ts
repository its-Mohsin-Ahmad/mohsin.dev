export interface Skill {
  id: string;
  number: string;
  name: string;
  description: string;
  category: 'frontend' | 'styling' | 'backend';
  iconColor: string;
  badge: string;
  progress: number;
}

export const skillsData: Skill[] = [
  {
    id: 'html',
    number: '01',
    name: 'HTML',
    description: 'Semantic structure for accessible web pages.',
    category: 'frontend',
    iconColor: '#E44D26',
    badge: 'HTML5',
    progress: 95
  },
  {
    id: 'css',
    number: '02',
    name: 'CSS',
    description: 'Styling, layouts, responsive interfaces, and visual effects.',
    category: 'styling',
    iconColor: '#264DE4',
    badge: 'CSS3',
    progress: 90
  },
  {
    id: 'javascript',
    number: '03',
    name: 'JavaScript',
    description: 'Dynamic behavior, application logic, and interactive features.',
    category: 'frontend',
    iconColor: '#F7DF1E',
    badge: 'ES6+',
    progress: 88
  },
  {
    id: 'bootstrap',
    number: '04',
    name: 'Bootstrap',
    description: 'Responsive layouts and reusable interface components.',
    category: 'styling',
    iconColor: '#7952B3',
    badge: 'V5',
    progress: 85
  },
  {
    id: 'tailwind',
    number: '05',
    name: 'Tailwind CSS',
    description: 'Utility-first styling for flexible, custom interfaces.',
    category: 'styling',
    iconColor: '#06B6D4',
    badge: 'CSS',
    progress: 90
  },
  {
    id: 'react',
    number: '06',
    name: 'React',
    description: 'Reusable components and interactive user interfaces.',
    category: 'frontend',
    iconColor: '#61DAFB',
    badge: 'Library',
    progress: 88
  },
  {
    id: 'firebase',
    number: '07',
    name: 'Firebase',
    description: 'Backend services such as authentication, data storage, and hosting where configured.',
    category: 'backend',
    iconColor: '#FFCA28',
    badge: 'BaaS',
    progress: 80
  },
  {
    id: 'supabase',
    number: '08',
    name: 'Supabase',
    description: 'Backend services built around PostgreSQL, with database and authentication capabilities.',
    category: 'backend',
    iconColor: '#3ECF8E',
    badge: 'SQL / BaaS',
    progress: 78
  }
];
