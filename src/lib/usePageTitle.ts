import { useEffect } from 'react';

const SITE_TITLE = 'Natnael F. Portfolio — Logo & Brand Identity Designer';

/**
 * Keeps the browser tab title in sync with the active route. React Router does
 * not update the document title for client-side navigations on its own.
 */
export function usePageTitle(page?: string): void {
  useEffect(() => {
    document.title = page ? `${page} — Natnael Fikreyesus` : SITE_TITLE;
  }, [page]);
}
