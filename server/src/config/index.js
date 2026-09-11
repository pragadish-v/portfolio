require('dotenv').config();

const warnMissing = (name) =>
  console.warn(`[config] Missing env var: ${name}: using a safe default.`);

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    cookieName: 'pws_token',
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'pragadish',
    // Bootstrap password is only used when creating the very first admin
    // account. If it is empty in production, startup fails loudly rather
    // than silently creating an insecure account.
    bootstrapPassword: process.env.ADMIN_PASSWORD || '',
  },
  cors: {
    origins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
  },
  isProd: process.env.NODE_ENV === 'production',
};

if (!config.jwt.secret) {
  if (config.isProd) {
    throw new Error('[config] JWT_SECRET is required in production.');
  }
  warnMissing('JWT_SECRET');
  // Dev-only fallback so local development never crashes.
  config.jwt.secret = 'dev-only-insecure-secret-change-me';
}

if (!config.admin.bootstrapPassword) {
  if (config.isProd && !config.mongoUri) {
    // Production without an existing DB: require an explicit password.
    warnMissing('ADMIN_PASSWORD');
  }
  config.admin.bootstrapPassword = 'changeme';
}

module.exports = config;
