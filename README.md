# Pragadish Portfolio

> **Pragadish V** — Computer Science Student · Software & Full-Stack Developer · Builder
>
> A full-stack personal portfolio: React + Vite frontend, Express + MongoDB backend,
> protected admin dashboard, contact pipeline, and one-command local setup.
> Built as part of the **Thiranex Personal Portfolio Website** task.

---

## ✨ Features

**Portfolio (public)**
- Premium dark/light theme with persistence, animated hero, scroll reveals
- Projects, Skills, Experience, Education, Business (PWS), Certifications,
  "Currently Learning" and Contact sections
- Project detail modal (problem, features, full stack, links)
- Optional project cover images (set `imageUrl` per project in the Admin UI)
- Honest skill-level labels: Comfortable / Building with / Learning / Familiar
- Fully responsive (mobile nav, fluid typography) and accessible (semantic
  landmarks, labels, focus states, skip link, alt text)
- SEO: meta + Open Graph + Twitter tags, JSON-LD Person schema, robots.txt,
  sitemap.xml, favicon

**Full-stack behaviour**
- All portfolio content is served by the API (`GET /api/...`) — the site is
  database-driven, not hardcoded
- Contact form → Express validation → database, with loading/success/error
  states and rate limiting
- Resilience: if the API is unreachable, the UI falls back to bundled content
  and shows a subtle notice instead of breaking

**Admin dashboard** (`/#/admin`)
- Login with bcrypt-hashed credentials + httpOnly JWT cookie sessions
- Create / edit / delete: Projects, Skills, Experience, Certifications
- Inbox: view, mark-read, delete contact messages
- Rate-limited login, input sanitisation, CORS allow-list

---

## 🧱 Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Frontend  | React 18, Vite 5, React Router 6, custom CSS  |
| Fonts     | Space Grotesk + Manrope + JetBrains Mono (self-hosted via Fontsource) |
| Icons     | Phosphor Icons                                |
| Backend   | Node.js, Express 4                            |
| Database  | MongoDB (Mongoose) with local JSON file-store fallback |
| Auth      | JWT (httpOnly cookie) + bcryptjs              |
| Security  | CORS allow-list, rate limiting, input sanitisation |
| Deploy    | Vercel (client) + Render (server) + MongoDB Atlas |

---

## 📁 Project Structure

```
portfolio/
│
├── client/                      # React + Vite frontend
│   ├── public/                  # favicon, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/          # Navbar, Footer, Section, ProjectCard, Modal…
│   │   ├── sections/            # Hero, About, Skills, Projects, Experience,
│   │   │                        # Education, Business, Achievements,
│   │   │                        # CurrentLearning, Contact
│   │   ├── pages/               # Home, Admin, NotFound
│   │   ├── context/             # Theme, Toast, Auth, Content providers
│   │   ├── hooks/               # useReveal (scroll animations)
│   │   ├── services/            # api.js (fetch client), content.js (fallback data)
│   │   ├── data/profile.js      # personal identity + placeholder links
│   │   ├── styles/index.css     # design system (tokens, dark/light themes)
│   │   ├── App.jsx              # providers + router
│   │   └── main.jsx
│   └── vite.config.js           # dev proxy → API, code splitting
│
├── server/                      # Express + MongoDB backend
│   ├── src/
│   │   ├── config/              # env-driven configuration
│   │   ├── controllers/         # auth, messages, generic CRUD
│   │   ├── routes/              # /api route table
│   │   ├── middleware/          # auth, errors, rate limiters
│   │   └── db/                  # store (Mongo adapter + file fallback), seed
│   ├── data/db.json             # file-store database (auto-created, gitignored)
│   ├── .env.example
│   └── server.js                # app entry: CORS, static client, seeding
│
├── .gitignore
├── package.json                 # root scripts (install:all, dev:*, build:client)
└── README.md
```

---

## 🚀 Local Development

Requires **Node.js 18+**. No database install needed to start — the server
falls back to a JSON file store and seeds itself on first run.

```bash
# 1. install everything (root + server + client)
npm run install:all

# 2. configure the server (or skip — defaults work locally)
cp server/.env.example server/.env
#   → set ADMIN_PASSWORD so the admin account gets created

# 3. start the backend  (http://localhost:5000)
npm run dev:server

# 4. start the frontend  (http://localhost:5173)
npm run dev:client
```

- Site: <http://localhost:5173> (or <http://localhost:5000> to see the
  production-style single-service mode)
- Admin: <http://localhost:5173/#/admin>
- Production build: `npm run build:client`, then restart the server — it
  serves `client/dist` automatically

> The Vite dev server proxies `/api/*` to port 5000, so cookies and API calls
> just work in development.

---

## 🔐 Environment Variables

### `server/.env` (copy from `server/.env.example`)

| Variable         | Required | Description                                                        |
| ---------------- | -------- | ------------------------------------------------------------------ |
| `MONGODB_URI`    | prod     | MongoDB Atlas connection string. Empty = local file-store fallback |
| `JWT_SECRET`     | prod     | Long random string. Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `JWT_EXPIRES_IN` | no       | Token lifetime (default `1d`)                                      |
| `ADMIN_USERNAME` | no       | Bootstrap admin username (default `pragadish`)                     |
| `ADMIN_PASSWORD` | yes      | Bootstrap admin password — **only used to create the first admin** |
| `CORS_ORIGIN`    | yes      | Comma-separated frontend origins, e.g. `https://your-site.vercel.app` |
| `PORT`           | no       | Defaults to 5000 (Render injects it)                               |

### `client/.env` (optional)

| Variable       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `VITE_API_URL` | Backend base URL in production, e.g. `https://your-api.onrender.com`. Leave unset in dev (proxy handles it). |

**Bootstrap admin behaviour:** on first start, if no admin user exists, one is
created from `ADMIN_USERNAME`/`ADMIN_PASSWORD`. The password is hashed with
bcrypt and never stored in plain text. Changing `ADMIN_PASSWORD` later does
not change an existing admin (edit via DB, or delete the user to re-bootstrap).

---

## 🗄️ Database Setup

### Option A — zero setup (default)
Nothing to do. On start without `MONGODB_URI`, the server creates
`server/data/db.json` and seeds it with the default content. The public API
and admin CRUD work identically.

### Option B — MongoDB Atlas (production)
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user, allow your server's IP (or `0.0.0.0/0` for Render)
3. Get the connection string and set it:
   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
4. Restart the server — collections (`projects`, `skills`, `experience`,
   `certifications`, `messages`, `users`) are created and seeded on first run

---

## 📡 API Documentation

Base URL: `/api` · Content type: JSON · Auth: httpOnly JWT cookie

### Public

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/health`       | `{ ok, db: "mongo"|"file" }`    |
| GET    | `/api/projects`     | All projects                    |
| GET    | `/api/projects/:id` | One project                     |
| GET    | `/api/skills`       | Skill groups with items         |
| GET    | `/api/experience`   | Experience entries              |
| GET    | `/api/certifications` | Certifications                |
| POST   | `/api/contact`      | Submit a message. Body: `{ name, email, subject?, message }`. Field errors come back as `{ error, fields: { name?, email?, message? } }` |

### Auth

| Method | Endpoint         | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| POST   | `/api/auth/login`  | `{ username, password }` → sets JWT cookie |
| POST   | `/api/auth/logout` | Clears the cookie                          |
| GET    | `/api/auth/me`     | Current user (requires session)            |

### Admin (session required)

| Method           | Endpoint                        | Description            |
| ---------------- | ------------------------------- | ---------------------- |
| POST             | `/api/projects`                 | Create project         |
| PUT              | `/api/projects/:id`             | Update project         |
| DELETE           | `/api/projects/:id`             | Delete project         |
| POST/PUT/DELETE  | `/api/skills…`                  | Same pattern for skills |
| POST/PUT/DELETE  | `/api/experience…`              | Same pattern for experience |
| POST/PUT/DELETE  | `/api/certifications…`          | Same pattern for certifications |
| GET              | `/api/messages`                 | Inbox                  |
| PATCH            | `/api/messages/:id/read`        | Mark message read      |
| DELETE           | `/api/messages/:id`             | Delete message         |

Errors: `400` validation · `401` unauthenticated · `404` not found ·
`429` rate limited · `500` server error.

---

## ☁️ Deployment

### 1. MongoDB Atlas
Follow **Database Setup → Option B** above. Keep the connection string for the backend env.

### 2. Backend → Render
1. New → **Web Service** → connect your repo
2. Root directory: `server` · Build: `npm install` · Start: `npm start`
3. Environment variables:
   - `MONGODB_URI` = your Atlas string
   - `JWT_SECRET` = long random string
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD`
   - `CORS_ORIGIN` = `https://<your-frontend>.vercel.app`
   - `NODE_ENV` = `production`
4. Deploy. Verify: `https://<service>.onrender.com/api/health` → `{"ok":true,"db":"mongo"}`

### 3. Frontend → Vercel
1. New → Project → import the repo
2. Root directory: `client` · Framework: Vite (auto)
3. Environment variable: `VITE_API_URL` = `https://<service>.onrender.com`
4. Deploy

### 4. Connect & test production
- Visit the Vercel URL — projects/skills should load from the API
  (Network tab → `GET /api/projects` → 200)
- Submit the contact form, then check **Admin → Messages**
- Log into `/#/admin` with your production credentials
- Try a wrong-origin API call (it should be CORS-blocked)

> Free Render services sleep after ~15 min; the first request may take ~30 s.

---

## 🧪 Testing Checklist

- [x] `npm run install:all` completes
- [x] Server boots, seeds content, `GET /api/health` returns `ok`
- [x] `GET /api/projects|skills|experience|certifications` return seeded data
- [x] Contact form: client validation → API → persisted message
- [x] Contact rate limiting + field-level errors
- [x] Admin login rejects bad credentials; accepts correct ones
- [x] Session survives page refresh (httpOnly cookie)
- [x] Admin CRUD: create/edit/delete projects, skills, experience, certifications
- [x] Admin inbox: mark read / delete
- [x] Unauthenticated write attempts return 401
- [x] `npm run build:client` passes; server serves the build
- [x] Theme toggle persists; light theme has proper contrast
- [x] Mobile: burger nav, no horizontal overflow, usable forms
- [x] 404 page for unknown routes
- [x] API-down fallback keeps the site readable

---

## 📸 Screenshots

Add screenshots here before submission:
`client/public/` → e.g. `screenshot-hero.png`, `screenshot-admin.png`,
then reference them below.

| Home (dark) | Admin dashboard |
| ----------- | --------------- |
| _[ADD SCREENSHOT]_ | _[ADD SCREENSHOT]_ |

---

## 🔮 Future Improvements

- Rich-form admin editors (structured inputs instead of JSON editing)
- Image uploads for projects (Cloudinary — already proven in TeddyWish)
- Email notifications on new contact messages
- Analytics dashboard (views, message trends)
- Tests (Vitest + Supertest) in CI

---

## 📄 License

MIT — built by **Pragadish V** · [GitHub](#) · [LinkedIn](#) _(links pending — see checklist)_
