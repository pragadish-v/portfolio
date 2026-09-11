import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { Certificate, GraduationCap, Trophy } from '@phosphor-icons/react';
import { useContent } from '../context/ContentContext';

export default function Achievements() {
  const { certifications, loading } = useContent();

  const isPlaceholder = (v) => !v || /^\[.+\]$/.test(String(v).trim());

  return (
    <Section
      id="achievements"
      title="Milestones on the way up."
      subtitle="Verified credentials and checkpoints only. New ones get added as they're earned."
    >
      {loading ? (
        <div className="state-box"><div className="big">Loading certifications…</div></div>
      ) : (
        <>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <Reveal className="card cert-card" key={cert.id || cert.title}>
                <Certificate size={20} weight="duotone" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <span className="c-title">{cert.title}</span>
                <span className="c-meta">
                  {[cert.issuer, cert.date].filter(Boolean).join(', ')}
                </span>
                {cert.url && !isPlaceholder(cert.url) && (
                  <a className="c-link" href={cert.url} target="_blank" rel="noreferrer noopener">
                    View certificate
                  </a>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="learning-strip" style={{ marginTop: '1.4rem' }}>
              <span className="hint" style={{ alignSelf: 'center' }}>Next targets:</span>
              <span className="learn-chip"><GraduationCap size={15} weight="duotone" style={{ color: 'var(--accent)' }} aria-hidden="true" /> Placement-ready DSA</span>
              <span className="learn-chip"><Trophy size={15} weight="duotone" style={{ color: 'var(--accent)' }} aria-hidden="true" /> First hackathon</span>
              <span className="learn-chip"><Certificate size={15} weight="duotone" style={{ color: 'var(--accent)' }} aria-hidden="true" /> More verified credentials</span>
            </div>
          </Reveal>
        </>
      )}
    </Section>
  );
}
