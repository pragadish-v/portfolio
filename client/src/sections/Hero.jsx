import { Link } from 'react-router-dom';
import { PROFILE } from '../data/profile.js';
import { SocialLinks } from '../components/Footer.jsx';

/** Hero copy follows a hard budget: eyebrow, 2-line headline, <=20-word subtext, CTAs. */
export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
      </div>

      <div className="container hero-inner">
        <p className="hero-status anim-up d1">
          Available for internships & freelance
        </p>

        <h1 className="anim-up d2">
          Building software that <span className="accent">solves real problems.</span>
        </h1>

        <p className="hero-tagline anim-up d3">
          {PROFILE.name}, 2nd-year CSE student building products people actually use,
          from a shop's billing system to interactive 3D experiences.
        </p>

        <div className="hero-ctas anim-up d4">
          <Link to="/#projects" className="btn btn-primary">View Projects</Link>
          <Link to="/#contact" className="btn btn-ghost">Contact</Link>
        </div>

        <div className="anim-up d5">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
