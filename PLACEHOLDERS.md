# Demo Content Guide - What's Filled and What to Swap

All bracket placeholders (`[ADD ...]`, `[YOUR ...]`) are gone. The site now
runs on **realistic demo values** chosen to fit the profile, so it reads as a
complete, working portfolio. Before publishing under his real identity,
Pragadish should swap the demo values below for his real ones.

## 1. Personal links - `client/src/data/profile.js` (single source of truth)

| Field    | Demo value (filled)                        | Swap for                       |
| -------- | ------------------------------------------ | ------------------------------ |
| Email    | `pragadish.v.dev@gmail.com`                | His real email                 |
| GitHub   | `https://github.com/pragadish-v`           | Real profile URL               |
| LinkedIn | `https://www.linkedin.com/in/pragadish-v`  | Real profile URL               |
| Resume   | `/Pragadish-V-Resume.pdf`                  | Real resume PDF (same path ok) |

## 2. Project links (seed + fallback, or edit via Admin UI)

| Project           | Demo GitHub                                | Demo Live                          |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| SmartBill Pro     | `github.com/pragadish-v/smartbill-pro`     | `smartbill-pro-demo.onrender.com`  |
| TeddyWish 3D      | `github.com/pragadish-v/teddywish-3d`      | `teddywish3d.vercel.app`           |
| SkillGap AI       | `github.com/pragadish-v/skillgap-ai`       | (none, status: In development)     |
| Habit Tracker     | `github.com/pragadish-v/habit-tracker`     | (none)                             |
| Mini-Git          | `github.com/pragadish-v/mini-git`          | (none)                             |
| Movie Recommender | `github.com/pragadish-v/movie-recommender` | (none)                             |

Demo repos/URLs are plausible but not his. Create the real repos (even
private-to-public transitions) or update the URLs.

### 2b. Project screenshots (still recommended)

Each project has an `imageUrl` field (Admin UI). Real 1600x900 screenshots of
SmartBill Pro and TeddyWish 3D remain the highest-impact visual upgrade.

## 3. Experience: CodeAlpha internship

Filled as: **Jun 2025 to Aug 2025, Remote**, with a factual sprint/Git
description and two highlight bullets. Replace with the real dates and real
task list if they differ - Admin UI > Experience > Edit.

## 4. Certifications

Filled with: CodeAlpha Internship Certificate (Aug 2025), HackerRank Java
(Basic) Mar 2025, HackerRank Python (Basic) May 2025. Certificate URLs point
to plausible-but-demo verification links. Swap for real certificate URLs, or
delete rows in the Admin UI.

## 5. Education

Filled as: expected graduation **2028** with coursework summary. Adjust the
year if needed (Admin edits do not cover this one; it is in
`client/src/sections/Education.jsx`).

## 6. Domain & deploy URLs

| Where | Current | Swap for |
| --- | --- | --- |
| `client/index.html` canonical + JSON-LD, robots.txt, sitemap.xml | `https://pragadish.dev/` | Real domain / Vercel URL |
| `client/public/og-image.png` | missing | 1200x630 OG image |
| `server/.env` `CORS_ORIGIN` | localhost | Production URL at deploy time |

## 7. Security notes

- `server/.env` is **gitignored** and never committed. It currently holds
  local dev secrets only (a generated JWT secret and a local admin password).
- For production: generate a fresh `JWT_SECRET` and a strong, unique
  `ADMIN_PASSWORD`. Never reuse local values, and never document passwords in
  the repo.
- To rotate the admin password locally: delete the `users` array entries in
  `server/data/db.json`, update `ADMIN_PASSWORD` in `server/.env`, restart.
  The admin is re-bootstrapped from the env value on first login.
