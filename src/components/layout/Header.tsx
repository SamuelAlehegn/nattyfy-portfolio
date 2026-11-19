import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Container } from './Container';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'My Works', to: '/works' },
  { label: 'About Me', to: '/about' },
] as const;

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
      className="size-6"
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-header text-header-fg transition-colors duration-[250ms]">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-22">
        <Logo />

        <div className="flex items-center gap-2 md:gap-6 lg:gap-8 2xl:gap-14">
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-14">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative py-2 text-nav font-medium transition-colors duration-150 hover:text-accent-hover',
                    isActive
                      ? "after:absolute after:left-1/2 after:-bottom-0.5 after:h-0.5 after:w-[calc(100%+1.25rem)] after:-translate-x-1/2 after:bg-current after:content-['']"
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-header-fg px-4 text-sm font-semibold whitespace-nowrap text-header transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-highlight hover:text-on-highlight hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:h-12 lg:min-w-[12.125rem] lg:px-6 lg:text-button"
          >
            Contact Me
          </Link>

          <div className="min-[1720px]:absolute min-[1720px]:inset-y-0 min-[1720px]:right-10 min-[1720px]:flex min-[1720px]:items-center">
            <ThemeToggle />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-sm transition-colors duration-150 hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current lg:hidden"
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
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'flex min-h-12 items-center text-nav font-medium transition-colors duration-150 hover:text-accent-hover',
                  isActive ? 'underline decoration-2 underline-offset-8' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
