# Deploy Checklist (Atlas -> Render -> Vercel)

Condensed click-by-click version of the full guide in README.md.

## Already live: GitHub Pages (frontend only)

The site auto-deploys to **https://pragadish-v.github.io/portfolio/** on every
push to `main` via `.github/workflows/pages.yml`. Pages source must stay set
to **GitHub Actions** (Settings -> Pages). This deployment uses the bundled
fallback content; the contact form needs the backend, so follow the steps
below for the full experience.

## 0. Prereqs
- Repo pushed: https://github.com/pragadish-v/portfolio (done)
- Free accounts: mongodb.com/atlas, render.com, vercel.com (sign in with GitHub)

## 1. MongoDB Atlas (~5 min)
1. Create account (or sign in with Google/GitHub) -> Create deployment -> **M0 Free**
2. Pick a cloud/region close to you (e.g. Mumbai `ap-south-1`) -> Create
3. **Database user:** Security Quickstart -> username `pragadish_admin`,
   password (autogenerate, COPY IT), "User needs read+write" -> Create User
4. **Network access:** allow `0.0.0.0/0` (Anywhere) -> Confirm
   (needed because Render free tier uses dynamic IPs)
5. **Get the string:** Database -> Connect -> Drivers -> copy URI like
   `mongodb+srv://pragadish_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Edit it: replace `<password>` with your real password, add the db name
   before the `?`: `...mongodb.net/portfolio?retryWrites=true...`
7. Keep this URI secret for step 2.

## 2. Render backend (~5 min)
1. dashboard.render.com -> **New +** -> **Blueprint** -> pick
   `pragadish-v/portfolio` -> connect
2. Render reads `render.yaml`. It will ask for 3 values:
   - `MONGODB_URI` = your Atlas URI from step 1
   - `ADMIN_PASSWORD` = choose a strong password (this bootstraps your
     dashboard login - save it in a password manager)
   - `CORS_ORIGIN` = come back and set this after Vercel gives you your URL
     (start with `https://example.vercel.app` as a placeholder, fix in step 4)
3. Apply -> wait for first deploy -> open the service URL ->
   `https://pragadish-portfolio-api.onrender.com/api/health`
   should return `{"ok":true,"db":"mongo"}`

## 3. Vercel frontend (~3 min)
1. vercel.com -> **Add New...** -> **Project** -> import `pragadish-v/portfolio`
2. Framework Preset: **Vite** (auto-detected). **Root Directory: client**
   (Settings -> General -> Root Directory BEFORE first deploy)
3. **Environment Variables:** add `VITE_API_URL` =
   `https://pragadish-portfolio-api.onrender.com` (your Render URL from step 2)
4. Deploy.

## 4. Connect the two (the 2-min step everyone forgets)
1. Copy your Vercel URL: `https://<project>.vercel.app`
2. Render -> your service -> **Environment** -> edit `CORS_ORIGIN`
   -> set exactly `https://<project>.vercel.app` (no trailing slash) -> Save
   (service redeploys itself)
3. Redeploy on Vercel not required - CORS is server-side only.

## 5. Verify production (5 checks)
- [ ] `https://<api>.onrender.com/api/health` -> `{"ok":true,"db":"mongo"}`
- [ ] Vercel site loads, Projects/Skills sections show content (Network tab:
      `GET /api/projects` -> 200)
- [ ] Contact form submits -> success message
- [ ] `https://<site>.vercel.app/#/admin` logs in with your Render
      `ADMIN_USERNAME`/`ADMIN_PASSWORD`
- [ ] Contact message appears in Admin -> Messages

## Free-tier notes
- Render free services sleep after ~15 min idle: first request takes ~30-50s.
  Keep the API warm with a free cron pinger (cron-job.org -> GET /api/health
  every 10 min) if that bothers you.
- Atlas M0 + Render free + Vercel Hobby = $0/month.
- When you get a real domain: add it on Vercel (Settings -> Domains), then
  update `CORS_ORIGIN` on Render and the canonical/sitemap URLs in
  `client/index.html` + `client/public/`.
