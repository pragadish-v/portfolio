import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';
import {
  FALLBACK_PROJECTS,
  FALLBACK_SKILLS,
  FALLBACK_EXPERIENCE,
  FALLBACK_CERTIFICATIONS,
} from '../services/content';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({
    projects: [],
    skills: [],
    experience: [],
    certifications: [],
    loading: true,
    error: null,
    source: 'api',
  });

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const [projects, skills, experience, certifications] = await Promise.all([
          api.getProjects(),
          api.getSkills(),
          api.getExperience(),
          api.getCertifications(),
        ]);
        if (!alive) return;
        setState({
          projects, skills, experience, certifications,
          loading: false,
          error: null,
          source: 'api',
        });
      } catch (err) {
        if (!alive) return;
        setState({
          projects: FALLBACK_PROJECTS,
          skills: FALLBACK_SKILLS,
          experience: FALLBACK_EXPERIENCE,
          certifications: FALLBACK_CERTIFICATIONS,
          loading: false,
          error: err.message,
          source: 'fallback',
        });
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
