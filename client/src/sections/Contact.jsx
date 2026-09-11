import { useState } from 'react';
import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import { SocialLinks } from '../components/Footer.jsx';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { PROFILE, isPlaceholder } from '../data/profile.js';
import { sendMessage } from '../services/api';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const [serverError, setServerError] = useState('');

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      er.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 10) {
      er.message = 'Message should be at least 10 characters.';
    }
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus('sending');
    setServerError('');
    try {
      await sendMessage(form);
      setStatus('ok');
      setForm(INITIAL);
    } catch (err) {
      setStatus('err');
      setServerError(err.fields ? Object.values(err.fields)[0] : err.message);
    }
  };

  return (
    <Section
      id="contact"
      title="Let's build something."
      subtitle="Internship opportunity, freelance project, or just a technical conversation. My inbox is open."
      alt
    >
      <div className="contact-grid">
        <Reveal className="contact-info">
          <p>
            Prefer email? Reach me directly at{' '}
            {isPlaceholder(PROFILE.email) ? (
              <strong>[YOUR EMAIL]</strong>
            ) : (
              <a href={`mailto:${PROFILE.email}`} style={{ color: 'var(--accent)' }}>
                {PROFILE.email}
              </a>
            )}
            . Otherwise, the form reaches me fastest: every message lands in my dashboard and I
            reply to serious enquiries within a day.
          </p>
          <div className="contact-socials">
            <SocialLinks />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="form-grid" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Name <span className="req">*</span></label>
              <input id="c-name" type="text" value={form.name} onChange={set('name')}
                aria-invalid={!!errors.name} placeholder="Your name" autoComplete="name" />
              <span className="field-error">{errors.name || ''}</span>
            </div>

            <div className="field">
              <label htmlFor="c-email">Email <span className="req">*</span></label>
              <input id="c-email" type="email" value={form.email} onChange={set('email')}
                aria-invalid={!!errors.email} placeholder="you@example.com" autoComplete="email" />
              <span className="field-error">{errors.email || ''}</span>
            </div>

            <div className="field full">
              <label htmlFor="c-subject">Subject</label>
              <input id="c-subject" type="text" value={form.subject} onChange={set('subject')}
                placeholder="Internship / project / hello" />
            </div>

            <div className="field full">
              <label htmlFor="c-message">Message <span className="req">*</span></label>
              <textarea id="c-message" value={form.message} onChange={set('message')}
                aria-invalid={!!errors.message} placeholder="Tell me what you have in mind…" />
              <span className="field-error">{errors.message || ''}</span>
            </div>

            <div className="full" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? (<><span className="spinner" aria-hidden="true" /> Sending…</>) : 'Send Message'}
              </button>
              {status === 'ok' && (
                <span className="form-status ok" role="status">
                  <CheckCircle size={15} weight="fill" aria-hidden="true" /> Message sent. I'll get back to you soon!
                </span>
              )}
              {status === 'err' && (
                <span className="form-status err" role="alert">
                  <WarningCircle size={15} weight="fill" aria-hidden="true" /> {serverError || 'Something went wrong. Try again.'}
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
