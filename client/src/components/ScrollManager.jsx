import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll manager for hash links (/#projects etc.).
 *
 * HashRouter consumes the hash for routing, so the browser never scrolls
 * on its own. Strategy: smooth-scroll first; then verify arrival and, if
 * the animation stalled (embedded webviews can throttle smooth scrolling),
 * jump instantly. Net effect: smooth in normal browsers, always-correct
 * position everywhere.
 */
const SETTLE_MS = 700;
const TOLERANCE = 120;

function scrollToTarget(el) {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });

  setTimeout(() => {
    const distance = Math.abs(el.getBoundingClientRect().top);
    if (distance > TOLERANCE) {
      // Reserve room for the fixed navbar (html has scroll-padding-top,
      // but a forced jump needs the offset applied manually).
      const navOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'instant' });
    }
  }, SETTLE_MS);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) scrollToTarget(el);
      });
      return () => cancelAnimationFrame(id);
    }
    scrollToTop();
  }, [pathname, hash]);

  return null;
}
