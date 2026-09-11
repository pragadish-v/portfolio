/**
 * Server entry point.
 *
 * Boot order: config -> DB connect -> seed (first run only) -> routes.
 * Also serves the built client in production (single-service deploys)
 * while remaining a standalone API for Vercel/Render splits.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./src/config');
const store = require('./src/db/store');
const seed = require('./src/db/seed');
const routes = require('./src/routes');
const { errorHandler, notFound } = require('./src/middleware');

async function ensureAdminUser() {
  const existing = await store.findOne('users', { username: config.admin.username });
  if (existing) return;

  const bcrypt = require('bcryptjs');
  const password = config.admin.bootstrapPassword;
  if (!password || password === 'changeme') {
    console.warn(
      '[auth] ADMIN_PASSWORD not set - admin bootstrap SKIPPED. ' +
        'Set ADMIN_USERNAME + ADMIN_PASSWORD in server/.env and restart.'
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await store.create('users', { username: config.admin.username, passwordHash });
  console.log(`[auth] Bootstrap admin created: "${config.admin.username}"`);
}

async function seedIfEmpty() {
  const [projects, skills, experience, certifications] = await Promise.all([
    store.list('projects'),
    store.list('skills'),
    store.list('experience'),
    store.list('certifications'),
  ]);

  if (projects.length === 0) {
    for (const p of seed.projects) await store.create('projects', p);
    console.log('[seed] projects seeded');
  }
  if (skills.length === 0) {
    for (const s of seed.skills) await store.create('skills', s);
    console.log('[seed] skills seeded');
  }
  if (experience.length === 0) {
    for (const e of seed.experience) await store.create('experience', e);
    console.log('[seed] experience seeded');
  }
  if (certifications.length === 0) {
    for (const c of seed.certifications) await store.create('certifications', c);
    console.log('[seed] certifications seeded');
  }
}

async function main() {
  const { mode } = await store.connect();
  await ensureAdminUser();
  await seedIfEmpty();

  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1); // correct client IPs behind Render/Vercel proxies

  // CORS: allow listed origins, the server's own origin (when serving the
  // built client from this process), and no-origin requests (curl/health).
  // Foreign origins get no CORS headers (browser blocks them) instead of a 500.
  app.use((req, res, next) => {
    const selfOrigin = `${req.protocol}://${req.headers.host}`;
    cors({
      origin(origin, cb) {
        if (!origin || config.cors.origins.includes(origin) || origin === selfOrigin) {
          return cb(null, true);
        }
        return cb(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })(req, res, next);
  });

  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());

  // Health check (used by Render + the client to verify the API is up).
  app.get('/api/health', (req, res) =>
    res.json({ ok: true, db: mode, uptime: process.uptime() })
  );

  app.use('/api', routes);
  app.use('/api', notFound);
  app.use(errorHandler);

  // Serve the built client if it exists (single-service deployment mode).
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }

  app.listen(config.port, () => {
    console.log(`[server] Portfolio API running in ${config.env} mode`);
    console.log(`[server] Store: ${mode} | Port: ${config.port}`);
    console.log(`[server] CORS origins: ${config.cors.origins.join(', ')}`);
  });
}

main().catch((err) => {
  console.error('[server] Fatal startup error:', err);
  process.exit(1);
});
