import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // 'checking' avoids flashing the login form on refresh while /me resolves.
  const [status, setStatus] = useState('checking');
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .me()
      .then((data) => {
        if (!alive) return;
        setUser(data);
        setStatus('authed');
      })
      .catch(() => {
        if (!alive) return;
        setUser(null);
        setStatus('guest');
      });
    return () => {
      alive = false;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await api.login(username, password);
    setUser(data);
    setStatus('authed');
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setStatus('guest');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
