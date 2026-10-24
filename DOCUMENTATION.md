# Sh1r00 Digital — editable-landing-page-nuxt4 (Agency Landing)

> Category: Landing Page Template · Live: https://landing-page-sh1r00-946.netlify.app

## Functionality

A full-featured agency landing page for "Sh1r00 Digital" with hero, services, pricing, team, testimonials, and portfolio sections plus a contact form. It is the "editable" template in the set: it ships an admin area (login → dashboard → content editor) backed by a Nitro server API that persists content to `public/content.json`. Public pages render from a static seed file, with dark mode, PWA, and i18n included.

- **Public pages** — `app/pages/index.vue`, `app/pages/about.vue`, `app/pages/contact.vue`, `app/pages/privacy.vue`, `app/pages/terms.vue`.
- **Admin area** — `pages/admin/login.vue`, `pages/admin/index.vue` (dashboard), `pages/admin/content.vue` (editor); guarded by `stores/auth.ts` / `composables/auth.ts`.
- **Server API** — `server/api/auth/login.post.ts` (password `admin123`), `server/api/content/index.get.ts` + `index.post.ts` (read/write `public/content.json`).
- **Seed content** — `app/data/content.ts` (services, portfolio, testimonials, pricing, team, stats, contact info).
- **Components** — atoms (`ABaseButton`, `ACard`, `ADarkModeToggle`, `AIcon`, `AInput`), molecules (`MFormField`, `MServiceCard`, `MTeamMember`, `MTestimonial`), organisms (`OHeader`, `OFooter`), plus `PwaInstallPrompt.vue` and `AdminLayout.vue`.
- **Also included** — dark mode (SSR-safe via Pinia + `useCookie`), PWA (offline + install prompt), i18n (3 locales).

## Stack

- Nuxt 4 (`compatibilityVersion: 4`), Vue 3 `<script setup>`, TypeScript
- Tailwind CSS v3.4 (`@nuxtjs/tailwindcss` v6) — blue agency theme with Poppins/Inter fonts
- Pinia (stores: `darkMode`, `pwaInstall`, plus root-level `auth` and `content`)
- `@nuxtjs/i18n` v10 — 3 locales (English, Español, አማርኛ), `strategy: 'prefix'`, `lazy: true`
- `@vite-pwa/nuxt` — service worker, offline caching, installable manifest
- `nuxt-security` — CSP (nonce-based), rate limiter, XSS validator (production only)
- Nitro server routes (`server/api/`) for the admin/editable backend
- Vitest + Vue Test Utils (unit), Playwright (e2e)

## Steps Taken

`git log --oneline` (newest first):

- `4e5d560` fix(netlify): root `/` redirect to `/en/` (prefix strategy) + SPA fallback to `/200.html`
- `2a73cc3` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `12c718d` fix(i18n+security): detectBrowserLanguage:false, `$t`→`t`, missing keys, CSP nonce, lazy i18n, branded PWA
- `5a4955b` fix README.md formatting
- `b5237af` convert README.txt to README.md with GitHub markdown formatting
- `ea52eac` add README.txt with deploy instructions + project overview
- `d9eae35` nuxt4 migration/creation + editable-landing-page-nuxt4

## Pitfalls & Fixes

### Shared pitfalls (all shiro Nuxt 4 templates)

- **`nuxt-security@2.6.0` needs Node ≥ 24** — Netlify's default Node is too old and `npm install` fails (EBADENGINE). Fix: `NODE_VERSION = "24"` in `netlify.toml` `[build.environment]`.
- **esbuild peer conflict** — a peer dependency conflict (esbuild/rollup) aborts `npm install` with ERESOLVE. Fix: `npm install --legacy-peer-deps`.
- **i18n v10 `detectBrowserLanguage`** — must be `false`; browser detection causes unpredictable 302s on first load. Fix: `detectBrowserLanguage: false` and build links with `const localePath = useLocalePath()`.
- **`$t()` is banned in `<template>`** — i18n v10 drops the global `$t()` template helper. Fix: `const { t } = useI18n()` in `<script setup>` and call `t('key')`.
- **Component auto-import `pathPrefix: false`** — the default path-prefixed auto-import names don't match the tags, producing a blank screen with no console errors. Fix: declare each component dir with `pathPrefix: false`.
- **PWA `navigateFallback`** — a precached SPA fallback serves non-precached URLs as the app shell → blank screen. Fix: `navigateFallback: null` and exclude `.html` from precache globs (the Netlify SPA fallback targets `/200.html`).
- **i18n `prefix` strategy root redirect** — with `strategy: 'prefix'` there is no page at `/`. Netlify must 302 `/` → `/en/` (not a `/*` → `/index.html` SPA fallback, which loops).
- **`defineProps()` without `const props =`** — in `<script setup>` you must capture the return value (`const props = defineProps<...>()`); otherwise destructuring throws "props is not defined".
- **SSG vs SSR output dirs** — `nuxt build` (SSR) writes `.output/server` + `.output/public`; `nuxt generate` (SSG) writes the static site to `.output/public` only. Netlify `publish` must point at `.output/public`.

### Project-specific

- **Dual directory layout** — source lives in `app/` (Nuxt 4 `srcDir`), but there are also root-level `pages/admin/`, `components/admin/`, `stores/`, `composables/`, and `server/api/` directories. `nuxt.config.ts` lists both `~/app/components/...` and `~/components/...` dirs (the former is effectively a no-op since `~` already resolves to `app/`).
- **Public pages read static seed, not the editable store** — public pages import from `app/data/content.ts` (static seed). The admin editor writes `public/content.json` via `/api/content`, and the root-level `stores/content.ts` fetches `/api/content`; the public site does not currently consume that edited JSON.
- **Hard-coded admin password** — `server/api/auth/login.post.ts` accepts the literal password `admin123` and returns a `cp_session_*` token; there is no real auth/session validation.

## Deployment

Static site generation:

```bash
npm install --legacy-peer-deps
npm run generate   # → .output/public
```

Netlify (`netlify.toml`): `NODE_VERSION = "24"`, build command `npm install --legacy-peer-deps --no-audit --no-fund && npm run generate`, publish dir `.output/public`, redirects `/` → `/en/` (302) and `/*` → `/200.html` (200, SPA fallback).

Live: https://landing-page-sh1r00-946.netlify.app

## TODO / Roadmap
- [ ] Point a custom domain (optional) — for client-facing work; a single wildcard domain can cover all sites.
