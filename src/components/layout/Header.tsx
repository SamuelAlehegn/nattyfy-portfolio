import { memo, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import { Container } from './Container';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'My Works', to: '/works' },
  { label: 'About Me', to: '/about' },
] as const;

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-2 text-nav font-medium transition-colors duration-150 hover:text-accent-hover',
    isActive &&
      "after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-[calc(100%+1rem)] after:-translate-x-1/2 after:bg-current after:content-['']",
  );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-h-12 items-center text-nav font-medium transition-colors duration-150 hover:text-accent-hover',
    isActive && 'underline decoration-2 underline-offset-8',
  );

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className="size-5"
    >
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export const Header = memo(function Header() {
  const location = useLocation();
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const menuOpen = menuOpenedAt === location.key;
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 8,
  );
  const menuOpenRef = useRef(menuOpen);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

      setScrolled((current) => {
        const nextScrolled = currentY > 8;
        return current === nextScrolled ? current : nextScrolled;
      });

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

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpenedAt(null);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpenedAt(null);
  const headerHidden = hidden && !menuOpen;

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        'sticky top-0 z-50 bg-header text-header-fg transition-[translate,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        headerHidden ? '-translate-y-full' : 'translate-y-0',
        scrolled && 'shadow-nav',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled ? 'h-14 md:h-16' : 'h-16 md:h-22',
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
            className="inline-flex h-9 items-center justify-center rounded-sm bg-header-fg px-3 text-xs font-semibold whitespace-nowrap text-header transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-highlight hover:text-on-highlight hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:h-10 lg:min-w-[9.7rem] lg:px-5 lg:text-button"
          >
            Contact Me
          </Link>

          <div className="min-[1720px]:absolute min-[1720px]:inset-y-0 min-[1720px]:right-10 min-[1720px]:flex min-[1720px]:items-center">
            <ThemeToggle />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() =>
              setMenuOpenedAt((current) => (current === location.key ? null : location.key))
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-sm transition-colors duration-150 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-current/15 bg-header lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex flex-col py-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeMenu}
              className={mobileNavLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
});
