import { NavLink } from 'react-router-dom';
import { Container } from './Container';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header text-header-fg">
      <Container className="flex h-16 items-center justify-between md:h-22">
        <NavLink to="/" className="font-display text-xl text-logo">
          NATNAEL F.
        </NavLink>
        <span className="text-small">Header placeholder</span>
      </Container>
    </header>
  );
}
