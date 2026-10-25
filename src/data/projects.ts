export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  liveUrl: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'be-careful',
    number: '01',
    title: 'BE CAREFUL',
    subtitle: 'Safety & Security Platform',
    category: 'SAFETY & SECURITY',
    description: 'An interactive modern web platform centered around cybersecurity awareness, secure protocols, and threat defense education.',
    liveUrl: 'https://its-mohsin-ahmad.github.io/Be-careful/',
    image: `${import.meta.env.BASE_URL}assets/projects/be-careful.png`,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    featured: true
  },
  {
    id: 'srms',
    number: '02',
    title: 'SRMS',
    subtitle: 'Student Record Management System',
    category: 'EDUCATION PLATFORM',
    description: 'A comprehensive academic dashboard for educational institutions to manage student results, grading records, and performance analytics.',
    liveUrl: 'https://srms-jet.vercel.app/',
    image: `${import.meta.env.BASE_URL}assets/projects/srms.png`,
    tags: ['React', 'Dashboard UI', 'Data Analytics', 'State Management'],
    featured: true
  },
  {
    id: 'gta',
    number: '03',
    title: 'GTA',
    subtitle: 'Premium Supercar Rental Service',
    category: 'CAR RENTAL',
    description: 'A dark, luxury-oriented automotive rental showcase featuring dynamic fleet filtering, vehicle specs, and booking workflows.',
    liveUrl: 'https://gta-rental-car.vercal.app/',
    image: `${import.meta.env.BASE_URL}assets/projects/grand-thief-autos.png`,
    tags: ['JavaScript', 'Tailwind CSS', 'Interactive UI', 'E-commerce'],
    featured: true
  },
  {
    id: 'luna',
    number: '04',
    title: 'LUNA',
    subtitle: 'Minimalist Brand Landing Page',
    category: 'BRAND / LANDING PAGE',
    description: 'An atmospheric brand landing experience utilizing celestial aesthetic, typography, and fluid responsive layouts.',
    liveUrl: 'https://its-mohsin-ahmad.github.io/LUNA/',
    image: `${import.meta.env.BASE_URL}assets/projects/luna.png`,
    tags: ['Web Design', 'Typography', 'CSS Grid', 'Minimalism'],
    featured: false
  },
  {
    id: 'infinity',
    number: '05',
    title: 'INFINITY',
    subtitle: 'Digital Experience / Beyond Limits',
    category: 'DIGITAL EXPERIENCE',
    description: 'An immersive digital concept exploring infinite motion loops, glowing cosmic gradients, and interactive web elements.',
    liveUrl: 'https://its-mohsin-ahmad.github.io/infinity/',
    image: `${import.meta.env.BASE_URL}assets/projects/infinity.png`,
    tags: ['Creative Development', 'Canvas', 'GSAP Motion', 'WebGL Look'],
    featured: false
  },
  {
    id: 'victoria',
    number: '06',
    title: 'VICTORIA',
    subtitle: 'High Fashion & Luxury Lifestyle',
    category: 'LUXURY & FASHION',
    description: 'An editorial fashion portfolio highlighting haute couture collections with smooth transitions, refined typography, and gallery grids.',
    liveUrl: 'https://victoria-nine.vercel.app/',
    image: `${import.meta.env.BASE_URL}assets/projects/vectoria.png`,
    tags: ['Fashion UI', 'Lookbook', 'CSS Motion', 'Editorial Design'],
    featured: false
  },
  {
    id: 'time-to-fly',
    number: '07',
    title: 'TIME TO FLY',
    subtitle: 'Global Travel & Flight Booking',
    category: 'TRAVEL & BOOKING',
    description: 'A modern flight discovery and vacation booking interface connecting wanderlust travelers to global destinations with ease.',
    liveUrl: 'https://its-mohsin-ahmad.github.io/time-to-fly',
    image: `${import.meta.env.BASE_URL}assets/projects/time-to-fly.png`,
    tags: ['Booking Flow', 'Responsive Design', 'Interactive UI', 'Travel'],
    featured: false
  }
];
