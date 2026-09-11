import { Link } from 'react-router-dom';
import { GithubLogo, LinkedinLogo, FileText } from '@phosphor-icons/react';
import { PROFILE, isPlaceholder } from '../data/profile.js';

export function SocialLinks({ className = '' }) {
  const items = [
    { label: 'GitHub', href: PROFILE.github, icon: <GithubLogo size={15} weight="fill" /> },
    { label: 'LinkedIn', href: PROFILE.linkedin, icon: <LinkedinLogo size={15} weight="fill" /> },
    { label: 'Resume', href: PROFILE.resume, icon: <FileText size={15} weight="fill" /> },
  ];

  return (
    <div className={`hero-socials ${className}`}>
      {items.map((s) =>
        isPlaceholder(s.href) ? (
          <span key={s.label} className="social-link" style={{ opacity: 0.5, cursor: 'default' }}
            title="Add this link before going live">
            {s.icon}
            {s.label}
          </span>
        ) : (
          <a key={s.label} className="social-link" href={s.href} target="_blank"
            rel="noreferrer noopener">
            {s.icon}
            {s.label}
          </a>
        )
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <h4>Pragadish V</h4>
            <p>{PROFILE.role}</p>
            <p style={{ marginTop: '0.6rem', maxWidth: '34ch' }}>
              Building software that solves real problems, one project at a time.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick links</h4>
            <Link to="/#about">About</Link>
            <Link to="/#projects">Projects</Link>
            <Link to="/#experience">Experience</Link>
            <Link to="/#contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <SocialLinks />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Pragadish V. All rights reserved.</span>
          <span>Built with React, Node.js and MongoDB</span>
        </div>
      </div>
    </footer>
  );
}
