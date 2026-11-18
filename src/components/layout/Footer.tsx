import { Container } from './Container';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-2 py-10 text-center text-small text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-display text-base text-heading">NATNAEL FIKREYESUS</p>
        <p>©2026 Natnael Fikreyesus. All rights reserved.</p>
      </Container>
    </footer>
  );
}
