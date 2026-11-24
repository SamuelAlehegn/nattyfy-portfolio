import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Start new routes at the top while leaving in-page filter changes (query
 * strings) alone, so switching My Works tabs never jumps the page.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash && window.scrollY > 0) {
      // `instant` bypasses the global smooth-scroll setting for route changes.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
