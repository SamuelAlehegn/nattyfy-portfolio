import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

const projectDirectory = new URL('../', import.meta.url);
const distDirectory = new URL('dist/', projectDirectory);

// GitHub Pages serves 404.html for unknown paths, so deep links boot the SPA but
// still respond with a 404 status. Emitting an index.html for every known route
// lets GitHub Pages answer those URLs with a 200 instead.
const indexHtml = await readFile(new URL('index.html', distDirectory), 'utf8');
const projectsSource = await readFile(new URL('src/data/projects.ts', projectDirectory), 'utf8');

// Project URLs live in `href` fields, with the project id as a fallback if the
// hrefs ever become computed values.
const projectSlugs = new Set([
  ...[...projectsSource.matchAll(/href:\s*['"]\/works\/([a-z0-9-]+)['"]/g)].map(([, slug]) => slug),
  ...[...projectsSource.matchAll(/\bid:\s*['"]([a-z0-9-]+)['"]/g)].map(([, slug]) => slug),
]);

const staticRoutes = ['about', 'works', 'contact'];
const routes = new Set([...staticRoutes, ...[...projectSlugs].map((slug) => `works/${slug}`)]);

for (const route of routes) {
  const routeDirectory = new URL(`${route}/`, distDirectory);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(new URL('index.html', routeDirectory), indexHtml);
}

// Fallback for paths that are not known at build time, such as an unknown
// project slug. The app renders its own not-found page in that case.
await copyFile(new URL('index.html', distDirectory), new URL('404.html', distDirectory));
