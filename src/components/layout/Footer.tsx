import { site } from '@/data/site';
import { Container } from './Container';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  return (
    <footer className="footer-panel relative z-10 mt-auto overflow-hidden rounded-t-[2.5rem] shadow-panel">
      <Container className="relative pt-10 pb-12 md:pt-12 md:pb-14">
        <blockquote className="mx-auto max-w-[56rem] text-center">
          <p className="text-quote italic text-heading">
            &ldquo;Design is the silent ambassador of your brand.&rdquo;
          </p>
          <cite className="mt-1 block text-small italic text-muted">&ndash; Paul Rand</cite>
        </blockquote>

        <div className="mt-12 flex flex-col items-center gap-10 text-center md:mt-14 md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          <div>
            <p className="font-display text-heading">
              <span className="block text-footer-brand-1">NATNAEL</span>
              <span className="block text-footer-brand-2">FIKREYESUS</span>
            </p>
            <p className="mt-3 text-body text-copy">
              &raquo; {site.roles[0]}
              <br />
              &raquo; {site.roles[1]}
            </p>
          </div>

          <address className="flex not-italic flex-col items-center gap-1.5 md:items-end">
            <a
              href={`mailto:${site.email}`}
              className="text-contact text-copy underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="text-contact-sm text-copy underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
            >
              {site.phoneDisplay}
            </a>
            <SocialLinks className="mt-2 justify-center md:justify-end" />
          </address>
        </div>

        <p className="mt-12 text-center text-nav text-copy md:mt-16">
          Thank You for Visiting!
          <br />
          <span className="text-muted">&copy;2026</span>
        </p>
      </Container>
    </footer>
  );
}
