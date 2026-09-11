import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { GraduationCap } from '@phosphor-icons/react';
import { PROFILE } from '../data/profile.js';

export default function Education() {
  return (
    <Section id="education" title="Foundations first." alt>
      <div className="timeline">
        <Reveal className="tl-item">
          <div className="tl-when">{PROFILE.year}</div>
          <div className="tl-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <GraduationCap size={22} weight="duotone" style={{ color: 'var(--accent)' }} aria-hidden="true" />
              <h3>{PROFILE.degree}</h3>
            </div>
            <div className="org">{PROFILE.college}</div>
            <p>
              Core coursework running alongside constant project work: data structures, algorithms,
              object-oriented programming, computer networks and software engineering. Expected to
              graduate in 2028, with every semester paired with something real shipped outside the
              classroom.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
