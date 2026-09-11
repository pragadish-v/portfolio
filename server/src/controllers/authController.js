const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('../db/store');
const config = require('../config');
const { asyncHandler } = require('../middleware');

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Sets an httpOnly JWT cookie on success.
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = await store.findOne('users', { username: String(username).toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign({ sub: user.id, username: user.username }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  res
    .cookie(config.jwt.cookieName, token, {
      httpOnly: true,
      secure: config.isProd,
      sameSite: config.isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ data: { username: user.username } });
});

/** POST /api/auth/logout: clears the auth cookie. */
const logout = (req, res) => {
  res.clearCookie(config.jwt.cookieName).json({ data: { ok: true } });
};

/** GET /api/auth/me: returns the logged-in user, or 401. */
const me = asyncHandler(async (req, res) => {
  res.json({ data: { username: req.user.username } });
});

module.exports = { login, logout, me };
