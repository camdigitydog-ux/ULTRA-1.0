# ULTRA 1.0

A static web app for building a multi-week running plan and viewing **mileage-based fueling** targets tied to each run. There is no build step: open the pages in a browser or serve the folder locally.

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

[github.com/camdigitydog-ux/ULTRA-1.0](https://github.com/camdigitydog-ux/ULTRA-1.0)
