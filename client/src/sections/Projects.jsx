import { useState } from 'react';
import Section from '../components/Section.jsx';
import ProjectCard, { SkeletonProjectGrid } from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { useContent } from '../context/ContentContext';

export default function Projects() {
  const { projects, loading, error, source } = useContent();
  const [openId, setOpenId] = useState(null);
  const openProject = projects.find((p) => p.id === openId);

  return (
    <Section
      id="projects"
      title="Projects that met real users."
      subtitle="From a billing system running in a real shop to a paid 3D web product. These were built to be used, not just submitted."
    >
      {loading ? (
        <SkeletonProjectGrid />
      ) : projects.length === 0 ? (
        <div className="state-box">
          <div className="big">No projects published yet</div>
          <p className="hint">Check back soon. New work is always in progress.</p>
        </div>
      ) : (
        <>
          {error && source === 'fallback' && (
            <p className="hint" style={{ marginBottom: '1rem' }}>
              Live API unreachable. Showing cached content.
            </p>
          )}
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id || p.title} project={p} onOpen={() => setOpenId(p.id)} />
            ))}
          </div>
          {openProject && (
            <ProjectModal project={openProject} onClose={() => setOpenId(null)} />
          )}
        </>
      )}
    </Section>
  );
}
