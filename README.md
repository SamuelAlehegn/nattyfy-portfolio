# Nattyfy Portfolio

[![CI](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/deploy.yml)

A minimal React + TypeScript + Vite starter with linting, formatting, tests, and GitHub Actions
CI/CD to GitHub Pages. No deployment secrets are required. Replace `src/App.tsx` and
`src/index.css` with your own design.

## Stack

- React 19 + TypeScript
- Vite 8
- Vitest + Testing Library
- ESLint 10 + Prettier
- GitHub Actions + GitHub Pages

## Requirements

- Node.js `>=22.22.2` — use the version in `.nvmrc` (`nvm use`)
- npm `>=10`

## Quick start

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

The development server runs at [http://localhost:5173](http://localhost:5173).

## Environment variables

| Variable        | Required | Default     | Purpose                   |
| --------------- | -------- | ----------- | ------------------------- |
| `VITE_APP_NAME` | No       | `React App` | Name shown in the starter |

Vite only exposes variables prefixed with `VITE_` to the browser. These values are bundled into
the client, so never put secrets in them.

For the deployed site, add `VITE_APP_NAME` as an Actions repository variable under
_Settings → Secrets and variables → Actions → Variables_. The deploy workflow passes it to the
production build. Repository variables are public configuration, not secrets.

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite development server        |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Run ESLint and apply safe fixes          |
| `npm run format`       | Format the repository with Prettier      |
| `npm run format:check` | Verify formatting without changing files |
| `npm run test`         | Run Vitest in watch mode                 |
| `npm run test:run`     | Run the test suite once (used in CI)     |
| `npm run typecheck`    | Run TypeScript project builds            |

## Project structure

```text
.
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── src/
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── eslint.config.js
├── index.html
└── vite.config.ts
```

## Development workflow

1. Branch from `main`: `feat/...`, `fix/...`, `chore/...`, or `docs/...`.
2. Make focused changes and add or update tests.
3. Run the same checks as CI:

   ```bash
   npm run lint
   npm run format:check
   npm run test:run
   npm run build
   ```

4. Open a pull request against `main`. CI must pass before merging.
5. Use [Conventional Commits](https://www.conventionalcommits.org/) and squash merge.

Keep `package-lock.json` committed. Do not commit `.env.local` or any credentials.

For stricter protection, enable branch protection on `main` and require the
`CI / Lint, format, test, build` check.

## CI/CD

### Continuous integration

`.github/workflows/ci.yml` runs on every pull request targeting `main` and is callable as a
reusable workflow. It installs dependencies with `npm ci`, then runs linting, formatting checks,
tests, and the production build. It uses read-only permissions and never accesses secrets.

### Continuous deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Calls the CI workflow as a required job, so deployment only starts after CI passes.
2. Builds the production bundle and uploads it as a GitHub Pages artifact.
3. Deploys through the `github-pages` environment using the built-in `GITHUB_TOKEN`.
4. Publishes the deployment URL to the workflow run and environment.

No repository secrets are required. The deploy job receives only the scoped permissions it
needs: `pages: write` and `id-token: write`.

## One-time GitHub Pages setup

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Merge a pull request into `main`, or re-run the Deploy workflow.
4. The site is published at `https://samuelalehegn.github.io/nattyfy-portfolio/`.

Vite uses a relative base (`base: './'`), so assets work on both the project URL and a custom
domain. If you add client-side routing later, configure the base path and a Pages `404.html`
fallback for your router.

To use a custom domain, configure it under **Settings → Pages → Custom domain**. No workflow
change is needed.

## Security and maintenance

- Workflows use least-privilege permissions and disable persisted Git credentials on checkout.
- Deployment uses short-lived GitHub-issued credentials; no long-lived tokens are stored.
- Pull request CI has read-only access and never receives deployment permissions.
- Dependabot proposes weekly npm updates and monthly GitHub Actions updates.

## Troubleshooting

| Problem                                   | Fix                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| `npm ci` fails on an unsupported Node     | Run `nvm use`; CI should use Node 22.22+                                          |
| Deploy fails with “Get Pages site failed” | Set **Settings → Pages → Source** to **GitHub Actions**, then re-run the workflow |
| Assets return 404 after deploying         | Keep `base: './'` in `vite.config.ts` or set it to your Pages base path           |
| Deploy does not run                       | Deployment runs only on pushes to `main`; PRs run CI only                         |
| Formatting fails in CI                    | Run `npm run format` locally, then commit the changes                             |
