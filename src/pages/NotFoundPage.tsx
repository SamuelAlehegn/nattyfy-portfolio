import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { usePageTitle } from '@/lib/usePageTitle';

export function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <Container className="py-24 text-center md:py-32">
      <p className="font-display text-display-2 text-brand">404</p>
      <h1 className="mt-4 text-h1 text-heading">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-brand px-6 text-button font-semibold text-on-brand transition-colors duration-200 hover:bg-highlight hover:text-on-highlight"
      >
        Back to home
      </Link>
    </Container>
  );
}
