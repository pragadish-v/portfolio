import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

/* ── Small form primitives ─────────────────────────────────── */

function Field({ label, hint, error, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

/** JSON editor with live validation: pragmatic admin editing without a form framework. */
function JsonEditor({ value, onChange }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [err, setErr] = useState('');

  useEffect(() => {
    try {
      const parsed = JSON.parse(text);
      setErr('');
      onChange(parsed);
    } catch (e) {
      setErr(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div className="field">
      <label>Content (JSON)</label>
      <textarea className="tall" value={text} onChange={(e) => setText(e.target.value)}
        spellCheck="false" />
      {err && <span className="field-error">Invalid JSON: {err}</span>}
    </div>
  );
}

/* ── Generic collection manager ────────────────────────────── */

const COLLECTION_META = {
  projects: {
    label: 'Projects',
    titleKey: 'title',
    subKey: (r) => r.tagline || r.category || '',
    blank: { title: '', tagline: '', description: '', problem: '', stack: [], features: [], category: 'software', status: 'Built', highlight: false, order: 0, githubUrl: '', liveUrl: '', imageUrl: '' },
  },
  skills: {
    label: 'Skills',
    titleKey: 'group',
    subKey: (r) => (r.items || []).map((i) => i.name).join(', '),
    blank: { group: '', items: [], order: 0 },
  },
  experience: {
    label: 'Experience',
    titleKey: 'role',
    subKey: (r) => `${r.org || ''} ${r.period || ''}`.trim(),
    blank: { org: '', role: '', period: '', location: 'Remote', description: '', highlights: [], current: false, order: 0 },
  },
  certifications: {
    label: 'Certifications',
    titleKey: 'title',
    subKey: (r) => [r.issuer, r.date].filter(Boolean).join(' · '),
    blank: { title: '', issuer: '', date: '', url: '', order: 0 },
  },
};

function CollectionManager({ collection }) {
  const meta = COLLECTION_META[collection];
  const { toast } = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | {row?} for create/edit
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api(`/${collection}`).then((r) => r.data);
      setRows(data);
    } catch (e) {
      toast(`Failed to load ${meta.label}: ${e.message}`, 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const save = async () => {
    setBusy(true);
    try {
      if (editing.row?.id) {
        await api(`/${collection}/${editing.row.id}`, { method: 'PUT', body: editing.draft });
        toast(`${meta.label} updated.`, 'ok');
      } else {
        await api(`/${collection}`, { method: 'POST', body: editing.draft });
        toast(`${meta.label.replace(/s$/, '')} created.`, 'ok');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast(e.message, 'err');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete "${row[meta.titleKey]}"? This cannot be undone.`)) return;
    try {
      await api(`/${collection}/${row.id}`, { method: 'DELETE' });
      toast('Deleted.', 'ok');
      load();
    } catch (e) {
      toast(e.message, 'err');
    }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <h2 style={{ fontSize: '1.1rem' }}>{meta.label} <span className="hint">({rows.length})</span></h2>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing({ draft: meta.blank })}>
          + Add {meta.label.replace(/s$/, '')}
        </button>
      </div>

      {loading ? (
        <div className="state-box"><div className="big">Loading…</div></div>
      ) : rows.length === 0 ? (
        <div className="state-box">
          <div className="big">Nothing here yet</div>
          <p className="hint">Use “+ Add” to create your first entry.</p>
        </div>
      ) : (
        <div className="admin-list">
          {rows.map((row) => (
            <div className="admin-row" key={row.id}>
              <div>
                <div className="r-title">{row[meta.titleKey]}</div>
                <div className="r-sub">{meta.subKey(row)}</div>
              </div>
              <div className="r-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing({ row, draft: row })}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(row)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="modal-overlay" onClick={() => !busy && setEditing(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{editing.row ? `Edit ${meta.label.replace(/s$/, '')}` : `New ${meta.label.replace(/s$/, '')}`}</h3>
              <button className="modal-close" onClick={() => setEditing(null)} aria-label="Close">×</button>
            </div>
            <div className="admin-form">
              <Field label={`${meta.titleKey} (required)`}>
                <input value={editing.draft[meta.titleKey] || ''}
                  onChange={(e) => setEditing({ ...editing, draft: { ...editing.draft, [meta.titleKey]: e.target.value } })} />
              </Field>
              <JsonEditor value={editing.draft} onChange={(draft) => setEditing((cur) => (cur ? { ...cur, draft } : cur))} />
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(null)} disabled={busy}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={save} disabled={busy}>
                  {busy ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Messages manager ──────────────────────────────────────── */

function MessagesManager() {
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setMessages(await api('/messages').then((r) => r.data));
    } catch (e) {
      toast(`Failed to load messages: ${e.message}`, 'err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = async (m) => {
    try {
      await api(`/messages/${m.id}/read`, { method: 'PATCH' });
      load();
    } catch (e) {
      toast(e.message, 'err');
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Delete message from "${m.name}"?`)) return;
    try {
      await api(`/messages/${m.id}`, { method: 'DELETE' });
      toast('Message deleted.', 'ok');
      load();
    } catch (e) {
      toast(e.message, 'err');
    }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <h2 style={{ fontSize: '1.1rem' }}>
          Messages <span className="hint">({messages.filter((m) => !m.read).length} unread)</span>
        </h2>
      </div>
      {loading ? (
        <div className="state-box"><div className="big">Loading…</div></div>
      ) : messages.length === 0 ? (
        <div className="state-box">
          <div className="big">Inbox zero</div>
          <p className="hint">Contact-form messages will appear here.</p>
        </div>
      ) : (
        <div className="admin-list">
          {messages.map((m) => (
            <div className="admin-row" key={m.id} style={{ alignItems: 'flex-start' }}>
              <div>
                <div className="r-title">
                  {!m.read && <span className="unread-dot" aria-label="unread" />}
                  {m.subject || 'New message'}
                </div>
                <div className="r-sub">{m.name} · {m.email} · {new Date(m.createdAt).toLocaleString()}</div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-2)', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{m.message}</p>
              </div>
              <div className="r-actions">
                {!m.read && <button className="btn btn-ghost btn-sm" onClick={() => markRead(m)}>Mark read</button>}
                <button className="btn btn-danger btn-sm" onClick={() => remove(m)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Login gate & page shell ───────────────────────────────── */

function LoginGate() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(username, password);
      toast('Welcome back!', 'ok');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-card">
      <h1>Admin Login</h1>
      <p className="sub">Manage portfolio content and messages.</p>
      <form className="admin-form" onSubmit={submit}>
        <Field label="Username">
          <input value={username} onChange={(e) => setUsername(e.target.value)}
            autoComplete="username" autoFocus />
        </Field>
        <Field label="Password" error={error}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" />
        </Field>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="hint">Sessions use an httpOnly JWT cookie. Nothing sensitive is stored in the browser.</p>
      </form>
    </div>
  );
}

const TABS = [
  { key: 'messages', label: 'Messages' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'certifications', label: 'Certifications' },
];

export default function Admin() {
  const { status, user, logout } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState('messages');

  const header = useMemo(() => (
    <div className="admin-toolbar" style={{ marginBottom: '1.6rem' }}>
      <div>
        <h1 style={{ fontSize: '1.35rem' }}>Dashboard</h1>
        <p className="hint">Signed in as <strong>{user?.username}</strong></p>
      </div>
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <Link to="/" className="btn btn-ghost btn-sm">← View site</Link>
        <button className="btn btn-danger btn-sm" onClick={async () => { await logout(); toast('Logged out.', 'info'); }}>
          Log out
        </button>
      </div>
    </div>
  ), [user, logout, toast]);

  if (status === 'checking') {
    return (
      <div className="admin-wrap container">
        <div className="state-box"><div className="big">Checking session…</div></div>
      </div>
    );
  }

  if (status !== 'authed') {
    return (
      <div className="admin-wrap container">
        <LoginGate />
      </div>
    );
  }

  return (
    <div className="admin-wrap container">
      {header}
      <div className="admin-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key}
            className={`admin-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'messages' ? <MessagesManager /> : <CollectionManager collection={tab} key={tab} />}
    </div>
  );
}
