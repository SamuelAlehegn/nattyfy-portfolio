import { createBrowserRouter } from 'react-router-dom';
import { RouteHydrateFallback } from '@/components/layout/RouteHydrateFallback';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
    HydrateFallback: RouteHydrateFallback,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'works',
        lazy: async () => {
          const { WorksPage } = await import('@/pages/WorksPage');
          return { Component: WorksPage };
        },
      },
      {
        path: 'works/:slug',
        lazy: async () => {
          const { ProjectDetailPage } = await import('@/pages/ProjectDetailPage');
          return { Component: ProjectDetailPage };
        },
      },
      {
        path: 'about',
        lazy: async () => {
          const { AboutPage } = await import('@/pages/AboutPage');
          return { Component: AboutPage };
        },
      },
      {
        path: 'contact',
        lazy: async () => {
          const { ContactPage } = await import('@/pages/ContactPage');
          return { Component: ContactPage };
        },
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: getBasename() });
