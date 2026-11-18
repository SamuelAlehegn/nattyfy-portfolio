import { Link, NavLink } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Container } from './Container';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'My Works', to: '/works' },
  { label: 'About Me', to: '/about' },
] as const;

export function Header() {
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
        </div>
      </Container>
    </header>
  );
}
