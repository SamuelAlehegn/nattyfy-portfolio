# Natnael Fikreyesus — Portfolio

A responsive portfolio for Natnael Fikreyesus, a graphic and brand identity designer. Built with React, TypeScript, Vite, React Router, Tailwind CSS 4, and Motion.

## Run locally

Requirements: Node.js `>=22.22.2` and npm `>=10`.

```bash
nvm use
npm ci
npm run dev
```

Vite prints the local development URL. Useful commands:

| Command            | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `npm run build`    | Type-check and create a production build in `dist/` |
| `npm run preview`  | Serve the production build locally                  |
| `npm run lint`     | Check source with ESLint                            |
| `npm run test:run` | Run the Vitest suite once                           |

## Theme system

The theme is class-based: the `dark` class on `<html>` selects dark semantic colors. `src/theme/theme-script.ts` applies the saved theme before the first paint to avoid a flash. `ThemeProvider` defaults to dark on a first visit, supports `system`, `light`, and `dark`, follows system preference when selected, and stores the choice in local storage. Theme colors and design tokens live in `src/styles/tokens.css`; Tailwind CSS 4 utilities and theme mappings are declared in `src/styles/globals.css` with `@theme` and `@theme inline`.

The project uses Tailwind CSS 4's CSS-first configuration, so there is no JavaScript Tailwind config to keep in sync. The exported maintainable design system is the CSS variables in `src/styles/tokens.css`, together with the `@theme` mappings in `src/styles/globals.css`.

## Content and assets

- **Projects:** add or update entries in `src/data/projects.ts`. Use stable slugs and place project images under `src/assets/images/`; reference imported assets from the project data. Keep descriptions and gallery image alt text meaningful.
- **Logos:** update the logo data in `src/data/logos.ts` and add SVG files under `src/assets/images/logos/`.
- **Social posts:** update `src/data/socialPosts.ts`; add optimized post images under `src/assets/images/social/`.
- **Contact and social profiles:** edit the shared email, phone, and social URLs in `src/data/site.ts`.
- **Fonts and shared brand art:** place source assets in `src/assets/` and import them from components or styles. Prefer SVG for logos and icons, and optimized WebP/AVIF for photography and mockups. Give raster images useful dimensions, descriptive alt text, and lazy loading when they appear below the fold.

Keep assets local where possible, avoid duplicating large originals, and preserve licenses alongside font or third-party assets. The mobile header automatically switches to the icon-only logo.

## Routes

- `/` — Home
- `/works` — Selected work and portfolio categories
- `/works/:slug` — Project case study
- `/about` — About Natnael
- `/contact` — Contact form and direct contact details

## Deployment

Production is deployed to [Vercel](https://vercel.com) from `main`. Day-to-day work happens on the `develop` branch: pushing to `develop` publishes a test build to GitHub Pages, and merging `develop` into `main` triggers the production Vercel deployment.

### Vercel (production)

1. Import the repository into Vercel.
2. Set the **Production Branch** to `main`.
3. Use the Vite preset. `vercel.json` also declares the install command (`npm ci`), build command (`npm run build`), and output directory (`dist`).
4. Add `VITE_APP_NAME` and `VITE_FORMSPREE_FORM_ID` under the project's environment variables.
5. Do not set `VITE_BASE_PATH` in Vercel. It must remain `/` for the site to work at the domain root.

`vercel.json` rewrites unmatched paths to `index.html` so React Router deep links work on refresh. It also disables Vercel deployments for every branch except `main`, so pushes to `develop` only run the GitHub Pages test workflow and never create Vercel preview deployments.

### GitHub Pages (testing)

The **Deploy test site** workflow (`.github/workflows/deploy.yml`) runs on every push to `develop` and can also be started manually with `workflow_dispatch`. Configure the repository once:

1. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. If the `github-pages` environment restricts deployment branches, allow `develop`.
3. Optionally add the repository variables `VITE_APP_NAME` and `VITE_FORMSPREE_FORM_ID`. Set `VITE_BASE_PATH` to `/` only if the test site uses a custom domain.

The test site is served at `https://<owner>.github.io/<repository>/`. The workflow derives the Vite base path from the repository name automatically.

### Build details

`npm run build` creates the static site in `dist/`. The post-build step writes an `index.html` shell for every known route (`/about`, `/works`, project pages, and `/contact`) so refreshing a deep link returns `200`, and keeps `404.html` as a fallback for unknown paths.

The contact form sends submissions through [Formspree](https://formspree.io) when `VITE_FORMSPREE_FORM_ID` is configured. Create a form in Formspree, then add its ID as an environment variable in Vercel and as a repository variable for the GitHub Pages test workflow. Without it, the form falls back to opening the visitor's configured email application with a prefilled message.
