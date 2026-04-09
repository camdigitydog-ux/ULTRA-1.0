# ULTRA 1.0

A static web app for building a multi-week running plan and viewing **mileage-based fueling** targets tied to each run. There is no build step: open the pages in a browser or serve the folder locally.

## Live site (GitHub Pages)

**[https://camdigitydog-ux.github.io/ULTRA-1.0/](https://camdigitydog-ux.github.io/ULTRA-1.0/)**

The repository is served from the **`main`** branch root. After each push, Pages rebuilds in about a minute.

### Custom domain (for ULTRA 1.0)

GitHub Pages URLs must be a real hostname you control (for example `www.ultra10.com` or `ultra.yourdomain.com`). Spaces and branding text like “ULTRA 1.0” alone are not valid DNS names—pick a domain or subdomain and point it at Pages.

1. **DNS at your registrar** (replace `www` / hostname with yours):
   - **Subdomain (e.g. `www` or `app`):** create a **CNAME** record → `camdigitydog-ux.github.io` (no `https://`).
   - **Apex (`yourdomain.com` only):** use GitHub’s [documented A and AAAA records](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain) (or an **ALIAS/ANAME** to `camdigitydog-ux.github.io` if your DNS supports it).

2. **GitHub:** repo **Settings → Pages → Custom domain** → enter the exact hostname (e.g. `www.ultra10.com`) → **Save**. Wait for the DNS check to pass.

3. **This repo:** add a file named **`CNAME`** in the **repository root** (no file extension) whose **only line** is that same hostname, then commit and push:

   ```text
   www.ultra10.com
   ```

   (Use your real hostname; the example is not configured for this project.)

4. Leave **Enforce HTTPS** on after the certificate is issued (often a few minutes after DNS is correct).

If you tell us your exact hostname (e.g. `app.mydomain.com`), we can add the `CNAME` file here for you.

## Features

- **Create plan** (`index.html`) — Goal distance, plan length, runs per week, level, and start date; generates a weekly breakdown stored in the browser (`localStorage`).
- **Weekly plan** (`plan.html`) — Progress stats, expandable weeks, mark runs complete. **Nutrition** and the run line link to mileage fuel with `?miles=` for that run’s distance.
- **Mileage fuel** (`nutrition.html`) — Pre / during / post tabs plus daily basics pointer. Distance comes **only** from the plan link (`?miles=`); there is no manual distance picker.
- **Fueling basics** (`nutrition-basics.html`) — Longer-form guidance (daily training, long runs, hydration, ultras, troubleshooting).

## Run locally

Python 3:

```bash
npm run serve
# or: python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) and start at `index.html`.

Any static file server works (VS Code Live Server, `npx serve`, etc.).

## Project layout

| Path | Role |
|------|------|
| `index.html`, `plan.html` | Plan UI; `script.js` drives generation and storage |
| `nutrition.html` | Shell; `nutrition-guide.js` renders guides from URL miles |
| `nutrition-basics.html` | Static article-style page |
| `styles.css` | Shared theme |
| `assets/dashboard-bg.png` | Background image |
| `scripts/github-login-and-push.sh` | Optional: `gh` login + `git push` helper |

## Tech notes

- **Stack:** HTML, CSS, vanilla JS. [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) from Google Fonts.
- **Mileage fuel** copy and carb math live in `nutrition-guide.js` (imperial-focused ranges; not medical advice).

## Repository

[github.com/camdigitydog-ux/ULTRA-1.0](https://github.com/camdigitydog-ux/ULTRA-1.0) (public — required for free GitHub Pages)
