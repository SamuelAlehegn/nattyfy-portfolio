import { memo, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import { EASE_OUT } from '@/lib/motion';
import { Container } from './Container';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'My Works', to: '/works' },
  { label: 'About Me', to: '/about' },
] as const;

/** The dropdown menu drops Home; the logo is the home link on mobile. */
const mobileNavigation = navigation.filter((item) => item.to !== '/');

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-2 text-nav font-medium transition-colors duration-150 hover:text-accent-hover',
    isActive &&
      "after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-[calc(100%+1rem)] after:-translate-x-1/2 after:bg-current after:content-['']",
  );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex min-h-12 items-center justify-center px-4 text-[clamp(1.5rem,4.5vw,2rem)] font-medium transition-colors duration-150 hover:text-accent-hover',
    isActive && 'underline decoration-2 underline-offset-8',
  );

/**
 * Three strokes that collapse into an X. Each stroke stays in the layout, so
 * only transforms and opacity animate (never top/left/width).
 */
function MenuIcon({ open }: { open: boolean }) {
  const reduceMotion = useReducedMotion();
  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 420, damping: 32, mass: 0.8 };

  return (
    <span aria-hidden="true" className="flex h-5 w-5 flex-col justify-between">
      <motion.span
        animate={open ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={transition}
        className="h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
        transition={transition}
        className="h-0.5 w-full rounded-full bg-current"
      />
      <motion.span
        animate={open ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={transition}
        className="h-0.5 w-full rounded-full bg-current"
      />
    </span>
  );
}

export const Header = memo(function Header() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  // Tying the open state to the history entry closes the menu on navigation
  // without an extra effect.
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const menuOpen = menuOpenedAt === location.key;
  const [hidden, setHidden] = useState(false);
  const [scrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 8);
  const menuOpenRef = useRef(menuOpen);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Crossing into the desktop breakpoint unmounts the visual menu. Reset the
  // state too, otherwise the header would remain stuck in "menu open" scroll mode.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia('(min-width: 64rem)');
    const handleChange = () => {
      if (media.matches) {
        setMenuOpenedAt(null);
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const updateHeader = () => {
      scrollFrame.current = null;

      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastScrollY.current;

      // setScrolled((current) => {
      //   const nextScrolled = currentY > 8;
      //   return current === nextScrolled ? current : nextScrolled;
      // });

      // Always reveal the header at the top of the page.
      if (currentY < 24) {
        lastScrollY.current = currentY;
        setHidden(false);
        return;
      }

      // Ignore tiny scroll jitters so the bar does not flicker.
      if (Math.abs(delta) < 4) {
        return;
      }

      lastScrollY.current = currentY;

      if (menuOpenRef.current || headerRef.current?.contains(document.activeElement)) {
        setHidden(false);
        return;
      }

      // Scroll down past the header height to hide it; any upward scroll reveals it.
      if (delta > 0 && currentY > 96) {
        setHidden(true);
      } else if (delta < 0) {
        setHidden(false);
      }
    };

    const handleScroll = () => {
      if (scrollFrame.current !== null) {
        return;
      }

      scrollFrame.current = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
    };
  }, []);

  // Lock the page behind the open menu.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [menuOpen]);

  // Escape closes, and Tab stays inside the header + menu while it is open.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpenedAt(null);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = [headerRef.current, menuPanelRef.current].flatMap((root) =>
        root
          ? Array.from(
              root.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
              ),
            ).filter((element) => element.getClientRects().length > 0)
          : [],
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || active === null || !focusable.includes(active))) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || active === null || !focusable.includes(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpenedAt(null);

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }

    setMenuOpenedAt(location.key);
  };

  const headerHidden = hidden && !menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'sticky top-0 z-50 bg-header text-header-fg transition-[translate,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          headerHidden ? '-translate-y-full' : 'translate-y-0',
          scrolled && !menuOpen && 'shadow-nav',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-4 transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            'h-14 md:h-18',
          )}
        >
          <Logo onNavigate={closeMenu} />

          <div className="flex items-center gap-2 md:gap-6 lg:gap-8 2xl:gap-14">
            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-14">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={desktopNavLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="hidden h-9 items-center justify-center rounded-sm bg-header-fg px-3 text-xs font-semibold whitespace-nowrap text-header transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-highlight hover:text-on-highlight hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:inline-flex lg:h-10 lg:min-w-[9.7rem] lg:px-5 lg:text-button"
            >
              Contact Me
            </Link>

            <div
              className={cn(
                'min-[1600px]:absolute min-[1600px]:inset-y-0 min-[1600px]:right-10 min-[1600px]:flex min-[1600px]:items-center',
                menuOpen && 'hidden',
              )}
            >
              <ThemeToggle />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex size-11 items-center justify-center rounded-sm transition-colors duration-150 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </Container>
      </header>

      {/*
        Inline (not portaled) so it stays inside `.page-surface`'s stacking
        context. It drops below the sticky header instead of covering the page.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={menuPanelRef}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: EASE_OUT }}
            className={cn(
              'fixed inset-x-0 z-40 overflow-hidden border-b border-current/10 bg-header text-header-fg shadow-nav lg:hidden',
              scrolled ? 'top-14 md:top-16' : 'top-16 md:top-22',
            )}
          >
            <div className="flex flex-col items-center px-6 pt-6 pb-8">
              <nav aria-label="Mobile" className="flex flex-col items-center gap-1">
                {mobileNavigation.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.28,
                      delay: reduceMotion ? 0 : 0.1 + index * 0.06,
                      ease: EASE_OUT,
                    }}
                  >
                    <NavLink to={item.to} onClick={closeMenu} className={mobileNavLinkClass}>
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    delay: reduceMotion ? 0 : 0.1 + mobileNavigation.length * 0.06,
                    ease: EASE_OUT,
                  }}
                  className="mt-4"
                >
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="inline-flex min-h-12 min-w-[12rem] items-center justify-center rounded-sm bg-header-fg px-10 text-lg font-medium text-header transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-highlight hover:text-on-highlight hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                  >
                    Contact Me
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
