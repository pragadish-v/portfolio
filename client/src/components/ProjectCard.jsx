import { GithubLogo, ArrowSquareOut, Info } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal.js';

const PLACEHOLDER_RE = /^\[.+\]$/;

export function isPlaceholder(url) {
  return !url || PLACEHOLDER_RE.test(url.trim());
}

export function SkeletonProjectGrid() {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton-line w40" />
          <div className="skeleton skeleton-line tall" />
          <div className="skeleton skeleton-line w90" />
          <div className="skeleton skeleton-line w60" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectCard({ project, onOpen }) {
  const ref = useReveal();
  const githubOk = !isPlaceholder(project.githubUrl);
  const liveOk = !isPlaceholder(project.liveUrl);

  return (
    <article ref={ref} className="reveal card card-lift project-card">
      {project.imageUrl && (
        <div className="project-cover">
          <img src={project.imageUrl} alt={`${project.title} interface`} loading="lazy" />
        </div>
      )}

      <div className="project-top">
        <div>
          <h3>{project.title}</h3>
          {project.tagline && <p className="project-tagline">{project.tagline}</p>}
        </div>
        {project.status && <span className="status-pill">{project.status}</span>}
      </div>

      <p className="project-desc">{project.description}</p>

      {Array.isArray(project.features) && project.features.length > 0 && (
        <ul className="project-feats">
          {project.features.slice(0, 4).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      {Array.isArray(project.stack) && project.stack.length > 0 && (
        <div className="project-stack">
          {project.stack.map((tech) => (
            <span className="chip" key={tech}>{tech}</span>
          ))}
        </div>
      )}

      <div className="project-actions">
        <button type="button" className="link-btn primary" onClick={onOpen}>
          <Info size={15} weight="bold" /> Details
        </button>
        {githubOk ? (
          <a className="link-btn" href={project.githubUrl} target="_blank" rel="noreferrer noopener">
            <GithubLogo size={15} weight="fill" /> GitHub
          </a>
        ) : (
          <span className="link-btn" style={{ opacity: 0.55, cursor: 'default' }} title="Link coming soon">
            <GithubLogo size={15} weight="fill" /> GitHub
          </span>
        )}
        {liveOk ? (
          <a className="link-btn" href={project.liveUrl} target="_blank" rel="noreferrer noopener">
            <ArrowSquareOut size={15} weight="bold" /> Live Demo
          </a>
        ) : (
          <span className="link-btn" style={{ opacity: 0.55, cursor: 'default' }} title="Link coming soon">
            <ArrowSquareOut size={15} weight="bold" /> Live Demo
          </span>
        )}
      </div>
    </article>
  );
}
