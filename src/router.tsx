import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WorksPage } from '@/pages/WorksPage';

/**
 * React Router must strip the GitHub Pages project prefix (`/nattyfy-portfolio`)
 * before matching routes. `BASE_URL` is `/` locally and `/nattyfy-portfolio/`
 * in the production build created by the deploy workflow.
 */
function getBasename(): string | undefined {
  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl === '/' || baseUrl === '') {
    return undefined;
  }

  if (baseUrl === './') {
    // Defensive fallback for a relative build on a GitHub Pages project site.
    if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
      const [repository] = window.location.pathname.split('/').filter(Boolean);
      return repository ? `/${repository}` : undefined;
    }

    return undefined;
  }

  return baseUrl.replace(/\/$/, '');
}

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'works', element: <WorksPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: getBasename() });
