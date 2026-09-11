import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';

const SERVICES = [
  'Websites for local businesses: fast, clean, mobile-first',
  'Custom business software (billing, inventory, records)',
  "Practical digital solutions: what the business needs, nothing it doesn't",
];

export default function Business() {
  return (
    <Section
      id="business"
      title="Building beyond code: Pragadish Web Solutions."
      subtitle="I don't only study technology. I turn it into useful products for real businesses."
    >
      <div className="pws-grid">
        <Reveal>
          <p style={{ color: 'var(--text-2)', marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--text-1)' }}>PWS</strong> is my small software venture,
            started with one conviction: small businesses around me deserve software that actually
            fits how they work, not bloated tools they'll never open twice.
          </p>
          <p style={{ color: 'var(--text-2)' }}>
            Running PWS has taught me the parts of software no course covers: talking to clients,
            scoping honestly, shipping on time and standing behind what I deliver. Every engagement
            makes me a better engineer.
          </p>
          <div className="pws-services">
            {SERVICES.map((s) => (
              <div className="pws-service" key={s}>{s}</div>
            ))}
          </div>
        </Reveal>

        <Reveal className="pws-card" delay={120}>
          <div className="pws-logo">
            <span className="box" aria-hidden="true">P</span>
            Pragadish Web Solutions
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
            Website & software development for small businesses.
          </p>
          <div style={{ marginTop: '1.1rem', padding: '0.9rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)' }}>
            <span className="status-pill">Proof of work</span>
            <p style={{ marginTop: '0.6rem', color: 'var(--text-2)', fontSize: '0.92rem' }}>
              <strong style={{ color: 'var(--text-1)' }}>SmartBill Pro</strong> is a billing &
              inventory platform built for a real retail shop, now handling its day-to-day sales.
              That's the PWS standard: software a business can bet its day on.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
