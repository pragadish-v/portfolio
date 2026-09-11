/**
 * Offline fallback content. Mirrors server/src/db/seed.js (demo values filled).
 */
export const FALLBACK_PROJECTS = [
  {
    id: 'fb-1',
    title: 'SmartBill Pro',
    tagline: 'Billing & inventory platform for a real retail business',
    description:
      'A full-stack billing and inventory management system built for a real mobile/electronics shop. It replaces manual registers and spreadsheets with one workflow: stock in, stock out, POS billing, customers, pending payments and after-sales service, all in a single application.',
    problem:
      'The shop was running billing, stock and customer due-tracking on paper. Records were inconsistent, warranty and repair history lived in notebooks, and end-of-day totals took forever to reconcile.',
    stack: ['React', 'Node.js', 'Express', 'SQLite'],
    features: [
      'POS billing with receipt preview, printing & WhatsApp sharing',
      'Inventory with categories and low-stock visibility',
      'Customer management with pending-payment tracking',
      'Sales dashboard with day/period analytics',
      'Service/repair jobs with warranty records',
    ],
    category: 'business-software',
    status: 'In real-world use',
    highlight: true,
    order: 1,
    githubUrl: 'https://github.com/pragadish-v/smartbill-pro',
    liveUrl: 'https://smartbill-pro-demo.onrender.com',
    imageUrl: '',
  },
  {
    id: 'fb-2',
    title: 'TeddyWish 3D',
    tagline: 'Premium interactive 3D birthday experience',
    description:
      'An interactive birthday web experience built with React Three Fiber: a 3D teddy, cake, blow-out-the-candles microphone interaction, a quiz and an interactive YES/NO ending, personalised per customer.',
    problem:
      'Generic e-greetings feel disposable. The goal: a personalised, cinematic web product a customer would happily pay for.',
    stack: ['React', 'Three.js', 'React Three Fiber', 'Drei', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    features: [
      'Interactive 3D scenes built with R3F + Drei',
      'Microphone "blow the candles" interaction',
      'Personalised per-customer content',
      'Quiz + interactive YES/NO ending scene',
    ],
    category: 'creative-product',
    status: 'Shipped as a paid product',
    highlight: true,
    order: 2,
    githubUrl: 'https://github.com/pragadish-v/teddywish-3d',
    liveUrl: 'https://teddywish3d.vercel.app',
    imageUrl: '',
  },
  {
    id: 'fb-3',
    title: 'SkillGap AI',
    tagline: 'Find the gap between what you know and what roles need',
    description:
      "A Java/OOP-oriented tool that maps a learner's skills against a target role and shows what to learn next, modelled around clean object-oriented domain design.",
    problem:
      "Students collect random skills but can't see the actual gap to a job-ready profile. SkillGap turns that into a concrete, prioritised list.",
    stack: ['Java', 'OOP'],
    features: ['Skill inventory vs target role', 'Prioritised gap report', 'OOP domain modelling'],
    category: 'software',
    status: 'In development',
    highlight: false,
    order: 3,
    githubUrl: 'https://github.com/pragadish-v/skillgap-ai',
    liveUrl: '',
    imageUrl: '',
  },
  {
    id: 'fb-4',
    title: 'Habit Tracker',
    tagline: 'Track habits, streaks and daily progress',
    description:
      'Define habits, check them off daily, and watch streaks and consistency build over time. Built to practise full-stack CRUD flows with clean state handling.',
    problem: 'Consistency is invisible without a record. A simple daily check-off makes habits stick.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    features: ['Daily check-offs', 'Streak & consistency view', 'Distraction-free UI'],
    category: 'software',
    status: 'Built',
    highlight: false,
    order: 4,
    githubUrl: 'https://github.com/pragadish-v/habit-tracker',
    liveUrl: '',
    imageUrl: '',
  },
  {
    id: 'fb-5',
    title: 'Mini-Git',
    tagline: 'A miniature version-control system, built to learn Git deeply',
    description:
      'Re-implements core Git concepts from scratch (init, add, commit, snapshots, history) to understand what version control actually does under the hood.',
    problem: 'Most developers use Git daily without knowing how it works. Building a miniature version proved the concepts.',
    stack: ['Python'],
    features: ['Init/add/commit workflows', 'Commit history & snapshots', 'VCS internals explored hands-on'],
    category: 'learning',
    status: 'Built',
    highlight: false,
    order: 5,
    githubUrl: 'https://github.com/pragadish-v/mini-git',
    liveUrl: '',
    imageUrl: '',
  },
  {
    id: 'fb-6',
    title: 'Movie Recommender',
    tagline: 'Personalised movie suggestions',
    description:
      "A recommendation-oriented application suggesting movies from a user's preferences, deliberately scoped small and honest about it.",
    problem: 'Choice paralysis is real. A focused recommender shows how preference data drives useful suggestions.',
    stack: ['Python'],
    features: ['Preference-based suggestions', 'Clean data/logic separation'],
    category: 'software',
    status: 'Built',
    highlight: false,
    order: 6,
    githubUrl: 'https://github.com/pragadish-v/movie-recommender',
    liveUrl: '',
    imageUrl: '',
  },
];

export const FALLBACK_SKILLS = [
  {
    id: 's-1',
    group: 'Programming',
    order: 1,
    items: [
      { name: 'Java', level: 'comfortable' },
      { name: 'Python', level: 'comfortable' },
      { name: 'JavaScript', level: 'comfortable' },
      { name: 'Data Structures & Algorithms', level: 'learning' },
    ],
  },
  {
    id: 's-2',
    group: 'Frontend',
    order: 2,
    items: [
      { name: 'HTML', level: 'comfortable' },
      { name: 'CSS', level: 'comfortable' },
      { name: 'React', level: 'building' },
      { name: 'Vite', level: 'comfortable' },
      { name: 'Tailwind CSS', level: 'learning' },
    ],
  },
  {
    id: 's-3',
    group: 'Backend & Data',
    order: 3,
    items: [
      { name: 'Node.js', level: 'building' },
      { name: 'Express.js', level: 'building' },
      { name: 'MongoDB', level: 'learning' },
      { name: 'SQLite', level: 'familiar' },
    ],
  },
  {
    id: 's-4',
    group: 'Tools & CS Fundamentals',
    order: 4,
    items: [
      { name: 'Git & GitHub', level: 'comfortable' },
      { name: 'VS Code', level: 'comfortable' },
      { name: 'OOP', level: 'comfortable' },
      { name: 'Computer Networks', level: 'familiar' },
    ],
  },
];

export const FALLBACK_EXPERIENCE = [
  {
    id: 'e-1',
    org: 'CodeAlpha',
    role: 'Software Development Intern',
    period: 'Jun 2025 to Aug 2025',
    location: 'Remote',
    description:
      'Selected for a competitive remote software development internship. Worked in weekly sprints with mentor checkpoints, shipping each task end to end with Git-based workflows.',
    highlights: [
      'Built and shipped two full-stack web application tasks',
      'Practised Git branching, pull requests and structured code reviews',
    ],
    current: false,
    order: 1,
  },
];

export const FALLBACK_CERTIFICATIONS = [
  {
    id: 'c-1',
    title: 'CodeAlpha Internship Certificate',
    issuer: 'CodeAlpha',
    date: 'Aug 2025',
    url: 'https://www.codealpha.in/certificate/pragadish-v',
    order: 1,
  },
  {
    id: 'c-2',
    title: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    date: 'Mar 2025',
    url: 'https://www.hackerrank.com/certificate/pragadish-v-java',
    order: 2,
  },
  {
    id: 'c-3',
    title: 'Python (Basic) Certification',
    issuer: 'HackerRank',
    date: 'May 2025',
    url: 'https://www.hackerrank.com/certificate/pragadish-v-python',
    order: 3,
  },
];
