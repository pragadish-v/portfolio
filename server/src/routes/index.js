const express = require('express');
const { requireAuth, loginLimiter } = require('../middleware');
const { crudController } = require('../controllers/crud');
const auth = require('../controllers/authController');
const messages = require('../controllers/messageController');

const router = express.Router();

const PROJECT_FIELDS = [
  'title', 'tagline', 'description', 'problem', 'stack', 'features',
  'category', 'status', 'highlight', 'order', 'githubUrl', 'liveUrl', 'imageUrl',
];
const SKILL_FIELDS = ['group', 'items', 'order'];
const EXPERIENCE_FIELDS = [
  'org', 'role', 'period', 'location', 'description', 'highlights', 'current', 'order',
];
const CERT_FIELDS = ['title', 'issuer', 'date', 'url', 'order'];

/* ── Public content endpoints (used by the portfolio frontend) ── */
router.get('/projects', crudController('projects', PROJECT_FIELDS).list);
router.get('/skills', crudController('skills', SKILL_FIELDS).list);
router.get('/experience', crudController('experience', EXPERIENCE_FIELDS).list);
router.get('/certifications', crudController('certifications', CERT_FIELDS).list);

/* ── Auth ──────────────────────────────────────────────────── */
router.post('/auth/login', loginLimiter, auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAuth, auth.me);

/* ── Protected admin CRUD (all write ops require a valid session) ── */
const projectCtrl = crudController('projects', PROJECT_FIELDS, ['title', 'description']);
router.get('/projects/:id', projectCtrl.getOne);
router.post('/projects', requireAuth, projectCtrl.create);
router.put('/projects/:id', requireAuth, projectCtrl.update);
router.delete('/projects/:id', requireAuth, projectCtrl.remove);

const skillCtrl = crudController('skills', SKILL_FIELDS, ['group']);
router.get('/skills/:id', skillCtrl.getOne);
router.post('/skills', requireAuth, skillCtrl.create);
router.put('/skills/:id', requireAuth, skillCtrl.update);
router.delete('/skills/:id', requireAuth, skillCtrl.remove);

const expCtrl = crudController('experience', EXPERIENCE_FIELDS, ['org', 'role']);
router.get('/experience/:id', expCtrl.getOne);
router.post('/experience', requireAuth, expCtrl.create);
router.put('/experience/:id', requireAuth, expCtrl.update);
router.delete('/experience/:id', requireAuth, expCtrl.remove);

const certCtrl = crudController('certifications', CERT_FIELDS, ['title']);
router.get('/certifications/:id', certCtrl.getOne);
router.post('/certifications', requireAuth, certCtrl.create);
router.put('/certifications/:id', requireAuth, certCtrl.update);
router.delete('/certifications/:id', requireAuth, certCtrl.remove);

/* ── Contact & messages ────────────────────────────────────── */
router.post('/contact', messages.sendMessage);
router.get('/messages', requireAuth, messages.listMessages);
router.patch('/messages/:id/read', requireAuth, messages.markRead);
router.delete('/messages/:id', requireAuth, messages.removeMessage);

module.exports = router;
