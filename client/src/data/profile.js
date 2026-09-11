/**
 * Personal identity. Demo values are filled in below and marked; before
 * publishing under his real identity, swap the email/GitHub/LinkedIn/resume
 * values for the real accounts (single source of truth in this file).
 */
export const PROFILE = {
  name: 'Pragadish V',
  firstName: 'Pragadish',
  role: 'Computer Science Student | Software & Full-Stack Developer | Builder',
  college: 'Easwari Engineering College',
  degree: 'B.E. Computer Science and Engineering',
  year: '2nd Year',
  location: 'Chennai, India',

  // Filled demo values (replace with real accounts before publishing)
  email: 'pragadish.v.dev@gmail.com',
  github: 'https://github.com/pragadish-v',
  linkedin: 'https://www.linkedin.com/in/pragadish-v',
  resume: '/Pragadish-V-Resume.pdf',
};

export const isPlaceholder = (v) => !v || /^\[.+\]$/.test(String(v).trim());
