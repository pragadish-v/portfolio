import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { useContent } from '../context/ContentContext';

export default function Experience() {
  const { experience, loading } = useContent();

  return (
    <Section
      id="experience"
      title="Where I've built so far."
    >
      {loading ? (
        <div className="state-box"><div className="big">Loading experience…</div></div>
      ) : (
        <div className="timeline">
          {experience.map((exp, i) => (
            <Reveal className="tl-item" key={exp.id || exp.org} delay={i * 100}>
              <div className="tl-when">{exp.period}</div>
              <div className="tl-body">
                <h3>{exp.role}</h3>
                <div className="org">{exp.org}{exp.location ? ` · ${exp.location}` : ''}</div>
                {exp.description && <p>{exp.description}</p>}
                {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                  <ul>
                    {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
