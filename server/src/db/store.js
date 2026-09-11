/**
 * Unified data-store abstraction.
 *
 * - If MONGODB_URI is set  -> Mongoose (MongoDB Atlas).
 * - Otherwise              -> JSON file store (server/data/db.json).
 *
 * Both backends expose the exact same async API, so controllers never
 * need to know which one is active. This makes local development
 * zero-setup while keeping MongoDB as the production database.
 */
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const config = require('../config');

let mongoose = null;
try {
  mongoose = require('mongoose');
} catch {
  /* mongoose not installed: file store will be used */
}

/* (mongoose stays null if the package is not installed) */

let usingMongo = false;
let fileStorePath = path.join(__dirname, '..', '..', 'data', 'db.json');
let cache = null;

const COLLECTIONS = ['users', 'projects', 'skills', 'experience', 'certifications', 'messages'];

const uid = () => crypto.randomBytes(12).toString('hex');

/* ── File store helpers ─────────────────────────────────────── */

async function readDb() {
  if (cache) return cache;
  try {
    cache = JSON.parse(await fs.readFile(fileStorePath, 'utf8'));
  } catch {
    cache = {};
  }
  for (const c of COLLECTIONS) if (!Array.isArray(cache[c])) cache[c] = [];
  return cache;
}

async function writeDb() {
  await fs.mkdir(path.dirname(fileStorePath), {
    recursive: true,
  });
  await fs.writeFile(fileStorePath, JSON.stringify(cache ?? {}, null, 2));
}

/* ── MongoDB models (lazy-built) ────────────────────────────── */

let models = null;
function getModels() {
  if (models) return models;
  const { Schema, model } = mongoose;

  const Project = model(
    'Project',
    new Schema(
      {
        title: { type: String, required: true, trim: true, maxlength: 120 },
        tagline: { type: String, trim: true, maxlength: 160 },
        description: { type: String, required: true },
        problem: { type: String },
        stack: [String],
        features: [String],
        category: { type: String, default: 'software' },
        status: { type: String, default: 'built' },
        highlight: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        githubUrl: { type: String, default: '' },
        liveUrl: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
      },
      { timestamps: true }
    )
  );

  const Skill = model(
    'Skill',
    new Schema(
      {
        group: { type: String, required: true, trim: true },
        items: [
          {
            name: { type: String, required: true },
            level: { type: String, enum: ['comfortable', 'learning', 'familiar', 'building'], default: 'comfortable' },
          },
        ],
        order: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

  const Experience = model(
    'Experience',
    new Schema(
      {
        org: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        period: { type: String, default: '[DATE]' },
        location: { type: String, default: 'Chennai, India' },
        description: { type: String, default: '' },
        highlights: [String],
        current: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

  const Certification = model(
    'Certification',
    new Schema(
      {
        title: { type: String, required: true, trim: true },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        url: { type: String, default: '' },
        order: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  );

  const Message = model(
    'Message',
    new Schema(
      {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
        subject: { type: String, trim: true, maxlength: 150 },
        message: { type: String, required: true, maxlength: 4000 },
        read: { type: Boolean, default: false },
      },
      { timestamps: true }
    )
  );

  const User = model(
    'User',
    new Schema(
      {
        username: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

  models = { Project, Skill, Experience, Certification, Message, User };
  return models;
}

/* ── Mongo adapter: same interface as the file store ───────── */

function mongoAdapter() {
  const m = getModels();
  const lean = (q) => q.lean({ virtuals: false });
  const normalize = (doc) => (doc && doc._id ? { ...doc, id: String(doc._id) } : doc);

  return {
    async list(collection, filter = {}) {
      const docs = await lean(m[collection].find(filter).sort({ order: 1, createdAt: -1 }));
      return docs.map(normalize);
    },
    async get(collection, id) {
      if (!m[collection].isValidObjectId(id)) return null;
      return normalize(await lean(m[collection].findById(id)));
    },
    async create(collection, data) {
      const doc = await m[collection].create(data);
      return { ...doc.toObject(), id: String(doc._id) };
    },
    async update(collection, id, data) {
      if (!m[collection].isValidObjectId(id)) return null;
      const doc = await m[collection].findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
      return normalize(doc);
    },
    async remove(collection, id) {
      if (!m[collection].isValidObjectId(id)) return null;
      return normalize(await lean(m[collection].findByIdAndDelete(id)));
    },
    async findOne(collection, filter) {
      return normalize(await lean(m[collection].findOne(filter)));
    },
    async countMessages() {
      return m.Message.countDocuments({});
    },
  };
}

/* ── File-store adapter (same interface) ────────────────────── */

function fileAdapter() {
  return {
    async list(collection, filter = {}) {
      const db = await readDb();
      let rows = [...db[collection]];
      for (const [k, v] of Object.entries(filter)) rows = rows.filter((r) => r[k] === v);
      rows.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
      return rows;
    },
    async get(collection, id) {
      const db = await readDb();
      return db[collection].find((r) => r.id === id) || null;
    },
    async create(collection, data) {
      const db = await readDb();
      const doc = { id: uid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...data };
      db[collection].push(doc);
      await writeDb();
      return doc;
    },
    async update(collection, id, data) {
      const db = await readDb();
      const idx = db[collection].findIndex((r) => r.id === id);
      if (idx === -1) return null;
      db[collection][idx] = { ...db[collection][idx], ...data, updatedAt: new Date().toISOString() };
      await writeDb();
      return db[collection][idx];
    },
    async remove(collection, id) {
      const db = await readDb();
      const idx = db[collection].findIndex((r) => r.id === id);
      if (idx === -1) return null;
      const [removed] = db[collection].splice(idx, 1);
      await writeDb();
      return removed || null;
    },
    async findOne(collection, filter) {
      const db = await readDb();
      return db[collection].find((r) => Object.entries(filter).every(([k, v]) => r[k] === v)) || null;
    },
    async countMessages() {
      const db = await readDb();
      return db.messages.length;
    },
  };
}

/* ── Public API ─────────────────────────────────────────────── */

let adapter = null;

async function connect() {
  if (mongoose && config.mongoUri) {
    try {
      await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 8000 });
      usingMongo = true;
      adapter = mongoAdapter();
      console.log('[db] Connected to MongoDB');
      return { mode: 'mongo' };
    } catch (err) {
      console.error('[db] MongoDB connection failed, falling back to file store:', err.message);
    }
  }
  usingMongo = false;
  adapter = fileAdapter();
  await readDb(); // ensure the file exists
  console.log(`[db] Using file store at ${fileStorePath}`);
  return { mode: 'file' };
}

const store = {
  connect,
  get mode() {
    return usingMongo ? 'mongo' : 'file';
  },
  get adapter() {
    if (!adapter) throw new Error('Database not connected. Call connect() first.');
    return adapter;
  },
  async list(collection, filter) {
    return adapter.list(collection, filter);
  },
  async get(collection, id) {
    return adapter.get(collection, id);
  },
  async create(collection, data) {
    return adapter.create(collection, data);
  },
  async update(collection, id, data) {
    return adapter.update(collection, id, data);
  },
  async remove(collection, id) {
    return adapter.remove(collection, id);
  },
  async findOne(collection, filter) {
    return adapter.findOne(collection, filter);
  },
  async countMessages() {
    return adapter.countMessages();
  },
  uid,
};

module.exports = store;
