import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Experience from '../sections/Experience.jsx';
import Education from '../sections/Education.jsx';
import Business from '../sections/Business.jsx';
import Achievements from '../sections/Achievements.jsx';
import CurrentLearning from '../sections/CurrentLearning.jsx';
import Contact from '../sections/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Business />
      <Achievements />
      <CurrentLearning />
      <Contact />
    </>
  );
}
