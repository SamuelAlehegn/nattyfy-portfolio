import { useState, type FormEvent } from 'react';
import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { site } from '@/data/site';
import { usePageTitle } from '@/lib/usePageTitle';

type FormStatus = { type: 'success' | 'error'; message: string } | null;

type ContactDetails = {
  name: string;
  email: string;
  message: string;
  gotcha: string;
};

const fieldClassName =
  'min-h-12 w-full rounded-sm border border-border bg-page px-4 text-copy placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f';

function getFormspreeFormId(): string | undefined {
  return import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() || undefined;
}

function buildMailtoHref(name: string, email: string, message: string): string {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);

  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/**
 * Used only as a fallback when no Formspree form is configured (or the service
 * is unreachable). Clicking a real anchor is the most reliable way to hand a
 * `mailto:` URL to the OS.
 */
function openMailClient(href: string) {
  const link = document.createElement('a');
  link.href = href;
  link.rel = 'noopener';
  link.tabIndex = -1;
  link.setAttribute('aria-hidden', 'true');
  link.style.position = 'fixed';
  link.style.left = '-9999px';
  document.body.append(link);
  link.click();
  link.remove();
}

async function sendViaFormspree(formId: string, details: ContactDetails): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${FORMSPREE_ENDPOINT}/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        message: details.message,
        _gotcha: details.gotcha,
        _replyto: details.email,
        _subject: `Portfolio inquiry from ${details.name}`,
      }),
    });
  } catch {
    throw new Error(
      'Could not reach the mail service. Please check your connection and try again.',
    );
  }

  if (response.ok) {
    return;
  }

  let message = 'Something went wrong while sending your message. Please try again.';

  try {
    const payload = (await response.json()) as {
      error?: string;
      errors?: Array<{ field?: string; message?: string }>;
    };
    const fieldMessages = payload.errors
      ?.map((error) => {
        if (!error.message) {
          return undefined;
        }

        return error.field ? `${error.field} ${error.message}` : error.message;
      })
      .filter(Boolean)
      .join(' ');

    message = payload.error || fieldMessages || message;
  } catch {
    // Keep the generic message when the service doesn't return JSON.
  }

  throw new Error(message);
}

export function ContactPage() {
  usePageTitle('Contact');

  const formspreeFormId = getFormspreeFormId();
  const sendsFromSite = Boolean(formspreeFormId);

  const [status, setStatus] = useState<FormStatus>(null);
  const [draftHref, setDraftHref] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (isSubmitting) {
      return;
    }

    if (!form.reportValidity()) {
      setStatus({
        type: 'error',
        message: 'Please complete each field with a valid email address.',
      });
      setDraftHref(null);
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }

    const data = new FormData(form);
    const details: ContactDetails = {
      name: String(data.get('name')),
      email: String(data.get('email')),
      message: String(data.get('message')),
      gotcha: String(data.get('_gotcha') ?? ''),
    };

    if (!formspreeFormId) {
      const href = buildMailtoHref(details.name, details.email, details.message);
      openMailClient(href);
      setDraftHref(href);
      setStatus({
        type: 'success',
        message: 'Your email app should be opening with your message ready to send.',
      });
      form.reset();
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setDraftHref(null);

    try {
      await sendViaFormspree(formspreeFormId, details);
      setStatus({
        type: 'success',
        message: 'Thanks! Your message has been sent. I’ll get back to you soon.',
      });
      form.reset();
    } catch (error) {
      setDraftHref(buildMailtoHref(details.name, details.email, details.message));
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          aria-busy={isSubmitting}
          className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-card md:p-9"
        >
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
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
            <>
              <p
                id="contact-status"
                role={statusIsError ? 'alert' : 'status'}
                aria-live={statusIsError ? 'assertive' : 'polite'}
                aria-atomic="true"
                className={statusIsError ? 'text-danger' : 'text-success'}
              >
                {status.message}
              </p>
              {draftHref ? (
                <p className="text-small text-muted">
                  {status.type === 'success' ? 'Email app didn’t open? ' : 'You can also '}
                  <a
                    className="underline underline-offset-4 hover:text-accent-hover"
                    href={draftHref}
                  >
                    {status.type === 'success'
                      ? 'open the draft again'
                      : 'open the draft in your email app'}
                  </a>{' '}
                  or email me directly at{' '}
                  <a
                    className="underline underline-offset-4 hover:text-accent-hover"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                  .
                </p>
              ) : null}
            </>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-primary px-7 font-semibold text-on-primary transition duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-highlight enabled:hover:text-on-highlight enabled:hover:shadow-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-56"
          >
            {isSubmitting ? (
              'Sending…'
            ) : (
              <>
                {sendsFromSite ? 'Send message' : 'Prepare email'}{' '}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </>
            )}
          </button>
          <p className="text-small text-muted">
            {sendsFromSite
              ? ''
              : 'Your email app will open with the message addressed to me.'}
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
