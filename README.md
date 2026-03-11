# My Astro Page

Production-style Astro website for a digital agency with a multi-page marketing site, pricing section, and web configurator form flow.

## Tech Stack

- Astro 5
- Tailwind CSS 4
- Vite (via Astro)
- TypeScript (strict Astro config)
- Node.js adapter (`@astrojs/node`) in `standalone` server mode

## Requirements

- Node.js 20+ recommended
- npm 10+ recommended

## Local Development

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321`

## Scripts

- `npm run dev`: Start local dev server
- `npm run build`: Build production output
- `npm run preview`: Preview production build locally
- `npm run astro`: Run Astro CLI commands

## Project Structure

```text
.
├── astro.config.mjs
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── api/
│   │   │   └── configurator-submit.ts
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── portfolio.astro
│   │   ├── contact.astro
│   │   └── ...
│   └── styles/
├── data-temp/
└── package.json
```

## Pages

Main public pages are in `src/pages/` and include:

- Home (`index.astro`)
- Services (`services.astro`)
- Portfolio (`portfolio.astro`)
- Process (`process.astro`)
- FAQ (`faq.astro`)
- Contact (`contact.astro`)
- Legal pages (`privacy.astro`, `terms.astro`, `legal.astro`)
- Configurator flow (`configurator.astro`, `thank-you.astro`)

## API and Form Storage

Endpoint: `POST /api/configurator-submit`

Implementation file:

- `src/pages/api/configurator-submit.ts`

What it does:

- Receives submitted configurator form data
- Parses JSON fields when present (`config`, `contentInputJson`)
- Generates a submission record with `id` + `submittedAt`
- Saves the payload as JSON into `data-temp/`
- Redirects to `/thank-you` (or `/thank-you?status=error` on failure)

Important:

- `data-temp/` is local file storage. For production, consider replacing with database or external storage.

## Build and Deploy

This project is configured for server output:

- `output: "server"`
- Node adapter with `mode: "standalone"`

Build:

```bash
npm run build
```

Preview built app locally:

```bash
npm run preview
```

## Styling

- Global styles: `src/styles/global.css`
- Tailwind is loaded with `@import "tailwindcss"` and configured through the Vite plugin in `astro.config.mjs`.

## SEO Notes

- Shared layout metadata is managed in `src/layouts/Layout.astro`.
- Page-level `title` and `description` props can be passed from page files (for example `src/pages/index.astro`).
