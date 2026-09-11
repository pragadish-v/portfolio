import { useEffect } from 'react';
import { GithubLogo, ArrowSquareOut, X } from '@phosphor-icons/react';
import { isPlaceholder } from './ProjectCard.jsx';

/** Controlled details modal: parent owns open/close state. Escape closes. */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const githubOk = !isPlaceholder(project.githubUrl);
  const liveOk = !isPlaceholder(project.liveUrl);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h3>{project.title}</h3>
            {project.tagline && <p className="project-tagline">{project.tagline}</p>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close details">
            <X size={14} weight="bold" />
          </button>
        </div>

        {project.imageUrl && (
          <div className="project-cover" style={{ marginBottom: '0.9rem' }}>
            <img src={project.imageUrl} alt={`${project.title} interface`} />
          </div>
        )}

        {project.status && <span className="status-pill">{project.status}</span>}

        <p className="project-desc" style={{ marginTop: '0.9rem' }}>{project.description}</p>

        {project.problem && (
          <>
            <p className="p-label">Problem it solves</p>
            <p className="project-desc">{project.problem}</p>
          </>
        )}

        {Array.isArray(project.features) && project.features.length > 0 && (
          <>
            <p className="p-label">Key features</p>
            <ul className="project-feats">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </>
        )}

        <p className="p-label">Tech stack</p>
        <div className="project-stack">
          {(project.stack || []).map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>

        {(githubOk || liveOk) && (
          <div className="project-actions" style={{ marginTop: '1.4rem' }}>
            {githubOk && (
              <a className="link-btn" href={project.githubUrl} target="_blank" rel="noreferrer noopener">
                <GithubLogo size={15} weight="fill" /> GitHub repo
              </a>
            )}
            {liveOk && (
              <a className="link-btn primary" href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                <ArrowSquareOut size={15} weight="bold" /> Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
