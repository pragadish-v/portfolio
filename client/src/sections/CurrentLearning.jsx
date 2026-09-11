import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { Code, Brain, FileCode, Globe, Gear, Target } from '@phosphor-icons/react';

const CURRENT = [
  { label: 'Java: deepening OOP & collections', icon: <Code size={15} weight="bold" /> },
  { label: 'DSA on LeetCode, daily practice', icon: <Brain size={15} weight="bold" /> },
  { label: 'Python: scripting & problem solving', icon: <FileCode size={15} weight="bold" /> },
  { label: 'Full-stack: MERN patterns', icon: <Globe size={15} weight="bold" /> },
  { label: 'Software engineering fundamentals', icon: <Gear size={15} weight="bold" /> },
  { label: 'Placement preparation', icon: <Target size={15} weight="bold" /> },
];

export default function CurrentLearning() {
  return (
    <Section
      id="learning"
      title="What I'm working on right now."
      subtitle="This page is a living document. As skills move from 'learning' to 'building with', this list changes."
    >
      <Reveal className="learning-strip">
        {CURRENT.map((c) => (
          <span className="learn-chip" key={c.label}>
            <span style={{ color: 'var(--accent)', display: 'inline-flex' }} aria-hidden="true">
              {c.icon}
            </span>
            {c.label}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
