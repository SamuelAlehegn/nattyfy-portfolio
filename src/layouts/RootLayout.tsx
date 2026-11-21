import { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { SkipLink } from '@/components/layout/SkipLink';

export function RootLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="page-surface flex min-h-svh flex-col overflow-x-clip text-copy">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
