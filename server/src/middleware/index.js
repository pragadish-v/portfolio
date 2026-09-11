const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const config = require('../config');

/** Wrap async route handlers so rejected promises hit the error middleware. */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/** Central error handler: hides internals in production, shows them in dev. */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message =
    status === 500 && config.isProd ? 'Something went wrong on our side.' : err.message;
  if (status >= 500) console.error('[error]', err);
  res.status(status).json({ error: message });
};

/** 404 handler for unknown API routes. */
const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found.' });
};

/**
 * JWT auth middleware: reads the httpOnly cookie set at login and
 * verifies the token. Invalid or missing token -> 401.
 */
function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[config.jwt.cookieName];
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = { id: payload.sub, username: payload.username };
    next();
  } catch {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}

/** Brute-force protection for the contact endpoint. */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

/** Brute-force protection for login attempts. */
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in a few minutes.' },
});

module.exports = {
  asyncHandler,
  errorHandler,
  notFound,
  requireAuth,
  contactLimiter,
  loginLimiter,
};
