import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { site } from '@/data/site';
import { ContactPage } from './ContactPage';

function renderContactPage() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  );
}

function fillContactForm() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
}

function submitContactForm() {
  const form = screen
    .getByRole('button', { name: /(prepare email|send message)/i })
    .closest('form');
  expect(form).not.toBeNull();
  fireEvent.submit(form!);
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('ContactPage form (mailto fallback)', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_FORMSPREE_FORM_ID', '');
  });

  it('shows the "Prepare email" label when Formspree is not configured', () => {
    renderContactPage();

    expect(screen.getByRole('button', { name: /prepare email/i })).toBeInTheDocument();
    expect(screen.getByText(/email app will open/i)).toBeInTheDocument();
  });

  it('opens a prefilled mailto draft when no Formspree form is configured', () => {
    const clickedHrefs: string[] = [];
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      clickedHrefs.push(this.href);
    });

    renderContactPage();
    fillContactForm();
    submitContactForm();

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(clickedHrefs).toHaveLength(1);

    const draft = new URL(clickedHrefs[0]!);
    expect(draft.protocol).toBe('mailto:');
    expect(draft.pathname).toBe(site.email);
    expect(draft.searchParams.get('subject')).toBe('Portfolio inquiry from Ada Lovelace');
    expect(draft.searchParams.get('body')).toBe(
      'From: Ada Lovelace (ada@example.com)\n\nHello there',
    );

    expect(screen.getByRole('status')).toHaveTextContent(/email app should be opening/i);
    expect(screen.getByRole('link', { name: 'open the draft again' })).toHaveAttribute(
      'href',
      clickedHrefs[0],
    );
  });

  it('shows an error and does not open a draft when the form is invalid', () => {
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);

    renderContactPage();
    submitContactForm();

    expect(clickSpy).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/complete each field/i);
  });
});

describe('ContactPage form (Formspree)', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_FORMSPREE_FORM_ID', 'test-form-id');
  });

  it('shows the "Send message" label when Formspree is configured', () => {
    renderContactPage();

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    expect(screen.getByText(/sent straight from the site/i)).toBeInTheDocument();
  });

  it('sends the message from the site and shows a success status', async () => {
    let resolveRequest: (response: Response) => void = () => undefined;
    const fetchMock = vi.fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>(
      () =>
        new Promise<Response>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);

    renderContactPage();
    fillContactForm();
    submitContactForm();

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

    await act(async () => {
      resolveRequest({
        ok: true,
        json: async () => ({ ok: true }),
      } as Response);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(await screen.findByRole('status')).toHaveTextContent(/message has been sent/i);
    expect(screen.getByLabelText('Name')).toHaveValue('');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://formspree.io/f/test-form-id');
    expect(init).toMatchObject({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    expect(JSON.parse(String(init?.body))).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello there',
      _gotcha: '',
      _replyto: 'ada@example.com',
      _subject: 'Portfolio inquiry from Ada Lovelace',
    });
  });

  it('shows the service error and offers a mailto fallback', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn<(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>>()
        .mockResolvedValue({
          ok: false,
          json: async () => ({ errors: [{ message: 'Email address is invalid.' }] }),
        } as Response),
    );

    renderContactPage();
    fillContactForm();
    submitContactForm();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Email address is invalid.');
    expect(screen.getByRole('link', { name: /open the draft in your email app/i })).toHaveAttribute(
      'href',
      expect.stringContaining(`mailto:${site.email}`),
    );
    expect(screen.getByLabelText('Name')).toHaveValue('Ada Lovelace');
  });

  it('shows a connection error when the service cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    renderContactPage();
    fillContactForm();
    submitContactForm();

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach the mail service/i);
  });
});
