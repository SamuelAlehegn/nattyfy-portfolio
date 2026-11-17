# Nattyfy Portfolio

[![CI](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/SamuelAlehegn/nattyfy-portfolio/actions/workflows/deploy.yml)

A minimal React + TypeScript + Vite starter with linting, formatting, tests, and GitHub Actions
CI/CD to Vercel. Replace `src/App.tsx` and `src/index.css` with your own design.

## Stack

- React 19 + TypeScript
- Vite 8
- Vitest + Testing Library
- ESLint 10 + Prettier
- GitHub Actions + Vercel

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
the client, so never put secrets in them. Deployment credentials belong in GitHub Secrets.

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
├── vercel.json
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

Keep `package-lock.json` committed. Do not commit `.env.local`, `.vercel`, or any credentials.

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
2. Uses the `production` GitHub Environment.
3. Pulls Vercel settings, builds the project, and deploys with the Vercel CLI.
4. Writes the deployment URL to the job summary and environment URL.

Production deployments are serialized, and existing deployments are not cancelled.

## One-time deployment setup

1. **Create the Vercel project.** Import this repository in Vercel and select the Vite preset.
   `vercel.json` sets the build command, output directory, and install command.
2. **Create a Vercel token** in _Account Settings → Tokens_, scoped to the project.
3. **Link the project locally** to get its identifiers:

   ```bash
   npx vercel login
   npx vercel link
   cat .vercel/project.json
   ```

4. **Add GitHub secrets** in _Settings → Secrets and variables → Actions_:

   | Secret              | Value                   |
   | ------------------- | ----------------------- |
   | `VERCEL_TOKEN`      | The token from step 2   |
   | `VERCEL_ORG_ID`     | `orgId` from step 3     |
   | `VERCEL_PROJECT_ID` | `projectId` from step 3 |

   For production-only scoping, create a `production` environment and add the secrets there.
   The deploy job already declares that environment.

5. **Add production environment variables** in Vercel under _Settings → Environment Variables_.
   Add `VITE_APP_NAME` for the Production environment if you use it.
6. **Avoid duplicate production deployments.** `vercel.json` disables Vercel's automatic Git
   deployments for `main`, so GitHub Actions owns production.
7. **Optional hardening.** Add protection rules to the `production` environment, such as required
   reviewers.
8. **Ship it.** Merge a pull request into `main` and follow the Deploy workflow.

If you rename the default branch, update the `branches` filters in both workflows and the
`git.deploymentEnabled` entry in `vercel.json`.

## Security and maintenance

- Workflows use least-privilege permissions and disable persisted Git credentials on checkout.
- Deployment secrets are exposed only to the Vercel steps in the deploy job, never to pull
  request CI.
- `vercel.json` adds standard security headers and immutable caching for hashed assets.
- Dependabot proposes weekly npm updates and monthly GitHub Actions updates.
- Keep the Vercel CLI major version in `deploy.yml` current with Vercel's supported release.

## Troubleshooting

| Problem                               | Fix                                                                                   |
| ------------------------------------- | ------------------------------------------------------------------------------------- |
| `npm ci` fails on an unsupported Node | Run `nvm use`; CI should use Node 22.22+                                              |
| Deploy fails with a missing secret    | Check the secret names and whether they are repository-level or environment-level     |
| Vercel reports a missing project      | Re-run `vercel link`, confirm the token belongs to the same team, and refresh the IDs |
| `vercel pull` asks for authentication | Confirm `VERCEL_TOKEN` is available to the step and has not expired                   |
| Formatting fails in CI                | Run `npm run format` locally, then commit the changes                                 |
