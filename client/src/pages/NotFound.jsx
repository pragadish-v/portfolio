import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{
      minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center',
      paddingTop: 'calc(var(--nav-h) + 2rem)',
    }}>
      <div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', fontWeight: 700 }}>
          This page hasn't been <span style={{ color: 'var(--accent)' }}>built yet.</span>
        </h1>
        <p style={{ color: 'var(--text-2)', margin: '1rem 0 1.8rem' }}>
          The route you followed doesn't exist, but my projects do.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
