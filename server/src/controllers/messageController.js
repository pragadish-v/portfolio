const store = require('../db/store');
const { asyncHandler } = require('../middleware');
const { sanitize } = require('./crud');

const MESSAGE_FIELDS = ['name', 'email', 'subject', 'message'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** POST /api/contact: public endpoint, validated and rate-limited. */
const sendMessage = asyncHandler(async (req, res) => {
  const input = sanitize(req.body || {}, MESSAGE_FIELDS);
  const errors = {};

  if (!input.name) errors.name = 'Name is required.';
  if (!input.email || !EMAIL_RE.test(input.email)) errors.email = 'A valid email is required.';
  if (!input.message || input.message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }
  if (input.message && input.message.length > 4000) {
    errors.message = 'Message is too long (max 4000 characters).';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'Please fix the highlighted fields.', fields: errors });
  }

  const saved = await store.create('messages', {
    ...input,
    subject: input.subject || 'New portfolio message',
    read: false,
  });

  res.status(201).json({
    data: { id: saved.id, ok: true },
    message: 'Message received. Pragadish will get back to you soon!',
  });
});

/** GET /api/messages: admin only. */
const listMessages = asyncHandler(async (req, res) => {
  const rows = await store.list('messages');
  res.json({ data: rows });
});

/** PATCH /api/messages/:id/read: admin only. */
const markRead = asyncHandler(async (req, res) => {
  const updated = await store.update('messages', req.params.id, { read: true });
  if (!updated) return res.status(404).json({ error: 'Not found.' });
  res.json({ data: updated });
});

/** DELETE /api/messages/:id: admin only. */
const removeMessage = asyncHandler(async (req, res) => {
  const removed = await store.remove('messages', req.params.id);
  if (!removed) return res.status(404).json({ error: 'Not found.' });
  res.json({ data: { id: req.params.id, deleted: true } });
});

module.exports = { sendMessage, listMessages, markRead, removeMessage };
