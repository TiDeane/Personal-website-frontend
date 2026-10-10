# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal résumé site (tiagodeane.com) built with Astro 5 + Tailwind CSS 3, originally based on **AstroWind** and customized since (hence `aw-` CSS variables and the `astrowind:config` virtual module). Static output only (`output: 'static'`).

## Commands

```bash
npm run dev        # dev server at localhost:4321 (Vite file watching uses polling — repo lives on a WSL /mnt/c path)
npm run build      # production build to ./dist/
npm run preview    # serve the built site
npm run check      # astro check (types) + eslint + prettier --check
npm run fix        # eslint --fix + prettier -w
```

There is no test suite. `npm run check` is the verification step; `npm run check:astro` alone runs type checking.

## Deployment

Every push to `main` triggers `.github/workflows/` → `npm ci && npm run build` (Node 18), syncs `dist/` to an S3 bucket with `--delete`, and invalidates CloudFront. Pushing to `main` is therefore a production deploy, so do development on feature branches and merge to `main` only when a change is ready to go live.

## Architecture

- **Site config**: `src/config.yaml` (site name/URL, UI theme) is loaded at build time by the local integration in `lib/config/` and exposed as the virtual module `astrowind:config` (`SITE`, `UI`). Edit the YAML, not the generated module.
- **Path alias**: `~` → `src/` (configured in `astro.config.ts` and `tsconfig.json`).
- **Page composition**: `src/pages/index.astro` is the real page. It wraps content in `layouts/PageLayout.astro` (Header/Footer slots around `Layout.astro`) and composes widgets from `components/widgets/`, passing content as inline data: skills logos and certifications are arrays in the page frontmatter, while experience/education entries, contact links and the Off the clock links are passed directly as props. Section order: `Hero2` → `ResumeSteps` (Experience) → `ResumeSteps` (Education) → `Marquee` (Skills) → `Certifications` → `ContactSocial` → `OffTheClock`. `Hero2` renders `ResumeButton`, which opens `public/resume.pdf` in a new tab. `src/navigation.ts` holds footer social links.
- **Component layers**: `components/ui/` are primitives (`WidgetWrapper` provides section spacing/background/scroll-in animation; `Headline`, `Timeline`, `ItemGrid`, …); `components/widgets/` are page sections built on them; `components/common/` holds head/meta/theme scripts. Numbered variants (`Hero2`, `Steps2`, `Marquee2`, `ItemGrid2`) are separate versions of the same widget. Treat every component as this site's own code: some started from AstroWind but have since been modified (`Hero2`, for example), and others were written from scratch (`Marquee`, `Marquee2`, `Certifications`, `ContactSocial`, `OffTheClock`, …), so don't assume any of them matches upstream or can be replaced with the upstream version. `OffTheClock` is deliberately self-contained so it can be removed easily; the steps are in the comment at the top of the file.
- **Single page**: `src/pages/index.astro` (plus `404.astro`) is the only page that belongs in the repo. Do layout experiments on a git branch rather than in copied pages like `index-wip.astro`; any such scratch copies are temporary and must not be committed (every file in `src/pages/` is built and deployed as a route).
- **Theming**: colors are CSS variables in `components/CustomStyles.astro` (`--aw-color-*`) mapped into Tailwind (`primary`, `secondary`, `accent`, `default`, `muted`). Dark mode is class-based; default theme is set in `config.yaml`.
- **Scroll animations**: the custom `intersect:` Tailwind variant (defined in `tailwind.config.js`) is driven by an IntersectionObserver in `components/common/BasicScripts.astro`.
- **Icons**: `astro-icon` with the full `tabler` set and whitelisted subsets of `flat-color-icons` and `simple-icons` (the latter only for `OffTheClock`) — new icons from those two sets must be added to the `include` list in `astro.config.ts`.
- **Images**: only images under `src/assets/` and `public/` are built. `unused-images/` at the repo root is gitignored and holds images kept out of the build.

## Backend integration

A separate serverless backend (github.com/TiDeane/Personal-website-backend) tracks visits per country, via two client-side calls:

- `BasicScripts.astro` POSTs to `https://tiagodeane.com/track` on page load, only when `location.hostname` is `tiagodeane.com`. The guard matters because the API Gateway CORS config only blocks the browser from _reading_ responses: a bare POST is a simple request (no preflight), so it would still reach the Lambda and count a visit from localhost. It is also throttled per browser: after a 2xx response it stores `lastVisitTrackedAt` in `localStorage` and skips the POST for the next 5 minutes (if storage is unavailable it sends on every load).
- `widgets/Footer.astro` GETs `https://tiagodeane.com/top` and renders top visitor countries; on failure or an empty result it falls back to showing social links. In dev (`import.meta.env.DEV`) it renders placeholder countries instead of calling the API. Flags are emoji; `country-flag-emoji-polyfill` loads a self-hosted flag font only on browsers without flag glyphs (Chromium on Windows).
