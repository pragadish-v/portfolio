/**
 * Generic CRUD controller factory.
 *
 * Each content collection (projects, skills, experience,
 * certifications) gets identical, validated read/write behaviour.
 * Public GETs are open; writes require the auth middleware, which is
 * applied at the router level.
 */
const store = require('../db/store');
const { asyncHandler } = require('../middleware');

const MAX_STRING = 4000;

/** Small sanitiser: trims strings, caps length, passes arrays through. */
function sanitize(input, allowedFields) {
  const out = {};
  for (const key of allowedFields) {
    if (!(key in input)) continue;
    const value = input[key];
    if (typeof value === 'string') {
      out[key] = value.trim().slice(0, MAX_STRING);
    } else if (Array.isArray(value)) {
      out[key] = value
        .map((v) => (typeof v === 'string' ? v.trim().slice(0, 500) : v))
        .slice(0, 100);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      out[key] = value;
    } else if (value && typeof value === 'object') {
      // Nested objects (e.g. skill group items): shallow-clean strings.
      const clean = {};
      for (const [k, v] of Object.entries(value)) {
        if (typeof v === 'string') clean[k] = v.trim().slice(0, 500);
        else if (Array.isArray(v)) clean[k] = v.slice(0, 200);
        else clean[k] = v;
      }
      out[key] = clean;
    }
  }
  return out;
}

function crudController(collection, allowedFields, requiredFields = []) {
  return {
    /** GET /api/<collection>: public. */
    list: asyncHandler(async (req, res) => {
      const rows = await store.list(collection);
      res.json({ data: rows });
    }),

    /** GET /api/<collection>/:id: public. */
    getOne: asyncHandler(async (req, res) => {
      const row = await store.get(collection, req.params.id);
      if (!row) return res.status(404).json({ error: 'Not found.' });
      res.json({ data: row });
    }),

    /** POST /api/<collection>: admin only. */
    create: asyncHandler(async (req, res) => {
      const body = req.body || {};
      const missing = requiredFields.filter((f) => !String(body[f] || '').trim());
      if (missing.length) {
        return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
      }
      const created = await store.create(collection, sanitize(body, allowedFields));
      res.status(201).json({ data: created });
    }),

    /** PUT /api/<collection>/:id: admin only. */
    update: asyncHandler(async (req, res) => {
      const updates = sanitize(req.body || {}, allowedFields);
      if (!Object.keys(updates).length) {
        return res.status(400).json({ error: 'No valid fields to update.' });
      }
      const updated = await store.update(collection, req.params.id, updates);
      if (!updated) return res.status(404).json({ error: 'Not found.' });
      res.json({ data: updated });
    }),

    /** DELETE /api/<collection>/:id: admin only. */
    remove: asyncHandler(async (req, res) => {
      const removed = await store.remove(collection, req.params.id);
      if (!removed) return res.status(404).json({ error: 'Not found.' });
      res.json({ data: { id: req.params.id, deleted: true } });
    }),
  };
}

module.exports = { crudController, sanitize };
