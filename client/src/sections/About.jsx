import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { PROFILE } from '../data/profile.js';

export default function About() {
  return (
    <Section
      id="about"
      title="Learning in public, building for real."
      alt
    >
      <div className="about-grid">
        <Reveal className="about-story">
          <p>
            Most students wait for a job to start building software. I decided not to. I'm{' '}
            <strong>{PROFILE.name}</strong>, a {PROFILE.year} Computer Science student at{' '}
            <strong>{PROFILE.college}</strong>, and my best learning happens when something real is
            on the line: a shop that needs billing, a customer who needs a website, a concept that
            deserves to exist.
          </p>
          <p>
            That's why my favourite projects aren't assignments: <strong>SmartBill Pro</strong> runs
            billing and inventory for an actual retail shop, and through{' '}
            <strong>Pragadish Web Solutions</strong> I build web products for small businesses. Between
            courses and clients, I'm sharpening <strong>DSA</strong>, <strong>Java</strong> and
            full-stack fundamentals for software placements.
          </p>
          <p>
            I'm not an expert yet. I'm the kind of developer you <em>want</em> to bet on: one who
            ships, asks good questions, and treats every project like it has users.
          </p>
        </Reveal>

        <Reveal className="about-facts" delay={120}>
          <div className="fact-row"><span className="k">Currently</span><span className="v">{PROFILE.year}, CSE</span></div>
          <div className="fact-row"><span className="k">College</span><span className="v">{PROFILE.college}</span></div>
          <div className="fact-row"><span className="k">Focus</span><span className="v">Full-stack · DSA · Java</span></div>
          <div className="fact-row"><span className="k">Building</span><span className="v">Pragadish Web Solutions</span></div>
          <div className="fact-row"><span className="k">Based in</span><span className="v">{PROFILE.location}</span></div>
          <div className="fact-row"><span className="k">Open to</span><span className="v">Internships & freelance</span></div>
        </Reveal>
      </div>
    </Section>
  );
}
