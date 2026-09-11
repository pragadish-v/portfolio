import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, Sun, Moon } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#business', label: 'Business' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname, hash } = useLocation();

  // Scroll-aware backdrop via an IntersectionObserver sentinel at the top of
  // the page (no scroll-event listener, no per-frame work).
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:12px;width:1px;pointer-events:none;';
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  const isActive = (href) => {
    const [, targetHash] = href.split('#');
    return pathname === '/' && hash === `#${targetHash}`;
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/#home" className="nav-logo" aria-label="Pragadish V, home">
            pragadish<span style={{ color: 'var(--accent)' }}>.dev</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={isActive(l.href) ? 'active' : ''}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark / light theme"
              title="Toggle theme">
              {theme === 'dark' ? <Sun size={17} weight="fill" /> : <Moon size={17} weight="fill" />}
            </button>
            <Link to="/#contact" className="btn btn-primary btn-sm nav-cta">Contact</Link>
            <button
              className={`nav-burger ${open ? 'open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open
                ? <X size={18} weight="bold" />
                : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link key={l.href} to={l.href} className={isActive(l.href) ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
