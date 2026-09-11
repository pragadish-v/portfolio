import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { useContent } from '../context/ContentContext';

const LEVEL_LABEL = {
  comfortable: 'Comfortable',
  learning: 'Learning',
  familiar: 'Familiar',
  building: 'Building with',
};

function SkeletonSkills() {
  return (
    <div className="skills-grid" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div className="skeleton-card" key={i} style={{ height: 220 }}>
          <div className="skeleton skeleton-line w40" />
          <div className="skeleton skeleton-line w90" />
          <div className="skeleton skeleton-line w60" />
          <div className="skeleton skeleton-line w90" />
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const { skills, loading } = useContent();

  return (
    <Section
      id="skills"
      title="The toolkit, honestly labelled."
      subtitle="No inflated expert claims: each technology is tagged with where I actually am with it. 'Building with' means there's real shipped work behind it."
    >
      {loading ? (
        <SkeletonSkills />
      ) : (
        <div className="skills-grid">
          {skills.map((group, gi) => (
            <Reveal key={group.id || group.group} className="card card-lift skill-card" delay={(gi % 4) * 80}>
              <h3>{group.group}</h3>
              <div className="skill-rows">
                {(group.items || []).map((item) => (
                  <div className="skill-row" key={item.name}>
                    <span className="name">{item.name}</span>
                    <span className={`level-badge level-${item.level}`}>
                      {LEVEL_LABEL[item.level] || item.level}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
