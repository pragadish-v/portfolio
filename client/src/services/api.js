/**
 * API client: single place that knows about the backend.
 *
 * - Dev: same-origin '/api' via the Vite proxy.
 * - Prod: VITE_API_URL (e.g. https://portfolio-api.onrender.com).
 */
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const API_BASE_URL = `${BASE}/api`;

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const err = new Error(payload?.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.fields = payload?.fields;
    throw err;
  }
  return payload;
}

export const getProjects = () => api('/projects').then((r) => r.data);
export const getSkills = () => api('/skills').then((r) => r.data);
export const getExperience = () => api('/experience').then((r) => r.data);
export const getCertifications = () => api('/certifications').then((r) => r.data);
export const sendMessage = (payload) => api('/contact', { method: 'POST', body: payload });
export const login = (username, password) => api('/auth/login', { method: 'POST', body: { username, password } });
export const logout = () => api('/auth/logout', { method: 'POST' });
export const me = () => api('/auth/me').then((r) => r.data);
