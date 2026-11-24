import { useState, type FormEvent } from 'react';
import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { site } from '@/data/site';
import { usePageTitle } from '@/lib/usePageTitle';

type FormStatus = { type: 'success' | 'error'; message: string } | null;

const fieldClassName =
  'min-h-12 w-full rounded-sm border border-border bg-page px-4 text-copy placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

export function ContactPage() {
  usePageTitle('Contact');

  const [status, setStatus] = useState<FormStatus>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus({
        type: 'error',
        message: 'Please complete each field with a valid email address.',
      });
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(data.get('name'))}`);
    const body = encodeURIComponent(
      `From: ${String(data.get('name'))} (${String(data.get('email'))})\n\n${String(data.get('message'))}`,
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus({
      type: 'success',
      message: 'Your email app is opening with your message ready to send.',
    });
    form.reset();
  }

  const statusIsError = status?.type === 'error';

  return (
    <Container className="py-16 md:py-24 lg:py-32">
      <header className="max-w-[48rem]">
        <p className="mb-4 text-small font-semibold tracking-[0.2em] text-accent uppercase">
          Contact
        </p>
        <h1 className="text-page-title font-display text-heading">Let’s work together.</h1>
        <p className="mt-6 text-body-lg text-muted">
          Have a project in mind or want to talk about your brand? Send me a note and I’ll be glad
          to connect.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:gap-20">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-card md:p-9"
        >
          <div>
            <label htmlFor="contact-name" className="mb-2 block font-medium text-heading">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block font-medium text-heading">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              className={fieldClassName}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block font-medium text-heading">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={5000}
              className={`${fieldClassName} resize-y py-3`}
            />
          </div>
          {status ? (
            <p
              id="contact-status"
              role={statusIsError ? 'alert' : 'status'}
              aria-live={statusIsError ? 'assertive' : 'polite'}
              aria-atomic="true"
              className={statusIsError ? 'text-danger' : 'text-success'}
            >
              {status.message}
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-primary px-7 font-semibold text-on-primary transition duration-200 hover:-translate-y-0.5 hover:bg-highlight hover:text-on-highlight hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:w-auto sm:min-w-56"
          >
            Prepare email{' '}
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </button>
          <p className="text-small text-muted">
            Your email app will open with the message addressed to me.
          </p>
        </form>

        <aside aria-labelledby="contact-direct" className="lg:pt-2">
          <h2 id="contact-direct" className="text-h1 font-semibold text-heading">
            Direct contact
          </h2>
          <address className="mt-6 flex flex-col gap-4 not-italic">
            <a
              className="w-fit text-body text-copy underline underline-offset-4 hover:text-accent-hover"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            <a
              className="w-fit text-body text-copy underline underline-offset-4 hover:text-accent-hover"
              href={site.phoneHref}
            >
              {site.phoneDisplay}
            </a>
          </address>
          <h3 className="mt-10 font-semibold text-heading">Find me online</h3>
          <SocialLinks className="mt-3 -ml-1" />
        </aside>
      </div>
    </Container>
  );
}
