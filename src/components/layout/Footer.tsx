import { memo } from 'react';
import { site } from '@/data/site';
import { Container } from './Container';
import { SocialLinks } from './SocialLinks';

export const Footer = memo(function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-panel relative z-10 mt-auto overflow-hidden rounded-t-[2.5rem] shadow-panel">
      <Container className="relative pt-10 pb-12 md:pt-12 md:pb-14">
        <blockquote className="mx-auto max-w-[56rem] text-center">
          <p className="text-[1.3125rem] leading-[1.35] italic text-heading lg:text-quote">
            &ldquo;Design is the silent ambassador of your brand.&rdquo;
          </p>
          <cite className="mt-1 block text-[0.9375rem] italic text-muted lg:text-small">
            &ndash; Paul Rand
          </cite>
        </blockquote>

        <div className="mt-12 flex flex-col items-center gap-[1.875rem] text-center md:mt-14 md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          <div className="text-left">
            <p className="font-display text-heading">
              <span className="block text-[2.3125rem] leading-[0.9] lg:text-footer-brand-1">
                NATNAEL
              </span>
              <span className="block text-[1.78125rem] leading-[0.9] lg:text-footer-brand-2">
                FIKREYESUS
              </span>
            </p>
            <p className="mt-3 text-[1.1875rem] leading-[1.5] text-copy lg:text-body">
              &raquo; {site.roles[0]}
              <br />
              &raquo; {site.roles[1]}
            </p>
          </div>

          <address className="flex not-italic flex-col items-center gap-0 text-[1.1875rem] leading-[1.8] md:items-end md:gap-1.5 md:leading-normal">
            <a
              href={`mailto:${site.email}`}
              className="text-[1.1875rem] text-copy inline-block transition-all duration-100 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] lg:text-contact"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="text-[1.1875rem] text-copy inline-block transition-all duration-100 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] lg:text-contact-sm"
            >
              {site.phoneDisplay}
            </a>
            <SocialLinks className="mt-2 justify-center md:justify-end" />
          </address>
        </div>

        <p className="mt-12 text-center text-[1.1875rem] text-copy md:mt-16 lg:text-nav">
          Thank You for Visiting!
          <br />
          <span className="text-muted">&copy;{year}</span>
        </p>
      </Container>
    </footer>
  );
});
