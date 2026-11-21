import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { site } from '@/data/site';

export function ContactPage() {
  return (
    <Container className="py-16 md:py-24 lg:py-32">
      <header className="max-w-[48rem]">
        <p className="mb-4 text-small font-semibold tracking-[0.2em] text-accent uppercase">
          Contact
        </p>
        <h1 className="text-page-title font-display text-heading">
          Let’s make something meaningful.
        </h1>
        <p className="mt-6 text-body-lg leading-relaxed text-muted">
          Have a brand, design, or video project in mind? I’m based in {site.location} and open to
          thoughtful collaborations. Get in touch and tell me what you’re working on.
        </p>
      </header>

      <section
        aria-labelledby="contact-details"
        className="mt-12 grid gap-10 border-t border-border pt-8 md:mt-16 md:grid-cols-[minmax(12rem,0.65fr)_1fr] md:pt-10"
      >
        <h2 id="contact-details" className="text-h1 font-semibold text-heading">
          Get in touch
        </h2>
        <div>
          <address className="flex flex-col items-start gap-5 not-italic">
            <a
              className="text-body-lg text-copy underline decoration-border underline-offset-4 hover:text-accent-hover"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            <a
              className="text-body-lg text-copy underline decoration-border underline-offset-4 hover:text-accent-hover"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
          </address>
          <h3 className="mt-10 font-semibold text-heading">Find me online</h3>
          <SocialLinks className="mt-3 -ml-1" />
        </div>
      </section>
    </Container>
  );
}
