/**
 * Default portfolio content (demo values filled in).
 *
 * Seeds the database on first run and mirrors client/src/services/content.js.
 * Project links, dates and certificates are realistic demo values chosen to
 * fit the profile; Pragadish should swap in his real URLs/dates via the
 * Admin dashboard (or this file) before publishing.
 */
module.exports = {
  projects: [
    {
      title: 'SmartBill Pro',
      tagline: 'Billing & inventory platform for a real retail business',
      description:
        'A full-stack billing and inventory management system built for a real mobile/electronics shop. It replaces manual registers and spreadsheets with one workflow: stock in, stock out, POS billing, customers, pending payments and after-sales service, all in a single application.',
      problem:
        'The shop was running billing, stock and customer due-tracking on paper. Records were inconsistent, warranty and repair history lived in notebooks, and end-of-day totals took forever to reconcile.',
      stack: ['React', 'Node.js', 'Express', 'SQLite'],
      features: [
        'POS billing with product search and receipt preview & printing',
        'Inventory management with categories and low-stock visibility',
        'Customer management with pending-payment tracking',
        'Sales dashboard with day/period analytics',
        'Service/repair job tracking with warranty records',
        'WhatsApp bill sharing for customers',
        'Settings for shop profile, tax and receipt options',
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
      title: 'TeddyWish 3D',
      tagline: 'Premium interactive 3D birthday experience',
      description:
        'An interactive birthday web experience built with React Three Fiber. Instead of a static greeting card, it walks the recipient through personalised 3D scenes: a teddy, a cake, a blow-out-the-candles microphone interaction, a fun quiz and an interactive ending, with content customised per customer.',
      problem:
        'Generic e-greetings feel disposable. The goal was a product a customer would happily pay for: a personalised, cinematic web experience that feels crafted, not templated.',
      stack: ['React', 'Vite', 'Three.js', 'React Three Fiber', 'Drei', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
      features: [
        'Interactive 3D scenes (teddy, cake, candles) built with R3F + Drei',
        'Microphone "blow the candles" interaction',
        'Personalised per-customer content and messaging',
        'Playful quiz with an interactive YES/NO ending scene',
        'Backend for customer-specific content and media via Cloudinary',
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
      title: 'SkillGap AI',
      tagline: 'Find the gap between what you know and what roles need',
      description:
        'A Java/OOP-oriented tool that helps learners map their current skills against a target role and see what to learn next. Built around clean object-oriented design: skills, roadmaps and gap reports are modelled as first-class domain objects.',
      problem:
        'Students often know pieces of many technologies but can\'t see the actual gap to a job-ready profile. SkillGap turns that vague feeling into a concrete, prioritised list.',
      stack: ['Java', 'OOP'],
      features: [
        'Skill inventory and target-role comparison',
        'Gap report showing what to learn next, in order',
        'Object-oriented design with clear domain modelling',
      ],
      category: 'software',
      status: 'In development',
      highlight: false,
      order: 3,
      githubUrl: 'https://github.com/pragadish-v/skillgap-ai',
      liveUrl: '',
      imageUrl: '',
    },
    {
      title: 'Habit Tracker',
      tagline: 'Track habits, streaks and daily progress',
      description:
        'A straightforward habit-tracking app: define habits, check them off daily, and see streaks and consistency over time. Built to practise full-stack CRUD flows with clean state handling.',
      problem:
        'Consistency is hard to see. A simple visual record of "did I do it today?" makes habits stick.',
      stack: ['JavaScript', 'HTML', 'CSS'],
      features: ['Daily habit check-offs', 'Streak and consistency view', 'Simple, distraction-free UI'],
      category: 'software',
      status: 'Built',
      highlight: false,
      order: 4,
      githubUrl: 'https://github.com/pragadish-v/habit-tracker',
      liveUrl: '',
      imageUrl: '',
    },
    {
      title: 'Mini-Git',
      tagline: 'A miniature version-control system, built to learn Git deeply',
      description:
        'A learning project that re-implements core Git concepts from scratch (commits, staging, snapshots and history) to understand what version control actually does under the hood.',
      problem:
        'Most developers use Git daily without knowing how it works. Building a miniature version proved the concepts: content addressing, commit graphs and diffs.',
      stack: ['Python'],
      features: ['Init, add and commit workflows', 'Commit history and snapshots', 'Hands-on exploration of VCS internals'],
      category: 'learning',
      status: 'Built',
      highlight: false,
      order: 5,
      githubUrl: 'https://github.com/pragadish-v/mini-git',
      liveUrl: '',
      imageUrl: '',
    },
    {
      title: 'Movie Recommender',
      tagline: 'Personalised movie suggestions',
      description:
        'A recommendation-oriented application that suggests movies based on a user\'s preferences. Kept deliberately simple and honest about scope, a focused exploration of recommendation thinking.',
      problem:
        'Choice paralysis is real. A focused recommender shows how preference data can drive useful suggestions.',
      stack: ['Python'],
      features: ['Preference-based movie suggestions', 'Clean separation of data and logic'],
      category: 'software',
      status: 'Built',
      highlight: false,
      order: 6,
      githubUrl: 'https://github.com/pragadish-v/movie-recommender',
      liveUrl: '',
      imageUrl: '',
    },
  ],

  skills: [
    {
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
      group: 'Tools & CS Fundamentals',
      order: 4,
      items: [
        { name: 'Git & GitHub', level: 'comfortable' },
        { name: 'VS Code', level: 'comfortable' },
        { name: 'OOP', level: 'comfortable' },
        { name: 'Computer Networks', level: 'familiar' },
      ],
    },
  ],

  experience: [
    {
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
  ],

  certifications: [
    {
      title: 'CodeAlpha Internship Certificate',
      issuer: 'CodeAlpha',
      date: 'Aug 2025',
      url: 'https://www.codealpha.in/certificate/pragadish-v',
      order: 1,
    },
    {
      title: 'Java (Basic) Certification',
      issuer: 'HackerRank',
      date: 'Mar 2025',
      url: 'https://www.hackerrank.com/certificate/pragadish-v-java',
      order: 2,
    },
    {
      title: 'Python (Basic) Certification',
      issuer: 'HackerRank',
      date: 'May 2025',
      url: 'https://www.hackerrank.com/certificate/pragadish-v-python',
      order: 3,
    },
  ],
};
