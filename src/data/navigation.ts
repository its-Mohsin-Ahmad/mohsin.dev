export interface NavItem {
  name: string;
  path: string;
  number: string;
}

export const navItems: NavItem[] = [
  { name: 'Home', path: '/', number: '01' },
  { name: 'About', path: '/about', number: '02' },
  { name: 'Projects', path: '/projects', number: '03' },
  { name: 'Skills', path: '/skills', number: '04' },
  { name: 'Contact', path: '/contact', number: '05' },
];

export const contactInfo = {
  name: 'Mohsin Ahmad',
  role: 'Software Engineering Student | Frontend Web Developer',
  institution: 'Islamia College Peshawar',
  cgpa: '3.95 / 4.00',
  session: '2025 – 2029',
  semester: '3rd Semester',
  tagline: 'Motivated Software Engineering student and Frontend Developer crafting modern, responsive web experiences with clean code and interactive motion.',
  aboutBio:
    'Motivated Software Engineering student at Islamia College Peshawar with a strong academic record (CGPA 3.95/4.00) and an active focus on frontend web development, software engineering, and business intelligence. Skilled in HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, React, and modern web architectures. Eager to apply technical knowledge, creativity, and problem-solving abilities to practical, high-impact projects.',
  whatsapp: {
    display: '03305205409',
    intl: '+92 330 5205409',
    url: 'https://wa.me/923305205409?text=Hello%20Mohsin%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.'
  },
  email: {
    address: 'mohsinahmad0347@gmail.com',
    url: 'mailto:mohsinahmad0347@gmail.com'
  },
  cvUrl: '/assets/cv/Mohsin-Ahmad-CV.pdf',
  github: 'https://github.com/mohsinahmad0347-maker',
  linkedin: 'https://www.linkedin.com/in/mohsin-ahmad%C2%AE-92356b403/',
  facebook: 'https://facebook.com/profile.php?id=61586514629344',
  experience: {
    excel: '1 year in MS Excel & Business Intelligence',
    frontend: '8 months in Frontend Development',
    summary:
      'Currently focused on learning and building skills through academic study and personal projects to gain practical experience in web development and software engineering.'
  },
  biTools: ['Microsoft Excel', 'Microsoft Power BI', 'Dashboard Development'],
  devTools: ['Git', 'GitHub', 'Visual Studio Code'],
  languages: ['English', 'Urdu', 'Pashto'],
  softSkills: [
    'Problem-Solving',
    'Analytical Thinking',
    'Quick Learning',
    'Creativity',
    'Attention to Detail',
    'Teamwork and Collaboration',
    'Self-Directed Learning',
    'Communication'
  ],
  availableForHire: true
};
