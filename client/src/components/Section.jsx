import Reveal from './Reveal.jsx';

/**
 * Section shell keeping every block visually consistent:
 * eyebrow (// mono label), title, optional subtitle, then children.
 */
export default function Section({ id, eyebrow, title, subtitle, alt = false, children }) {
  return (
    <section id={id} className={alt ? 'section section-alt' : 'section'} aria-label={title}>
      <div className="container">
        <Reveal className="section-head">
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-sub">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
