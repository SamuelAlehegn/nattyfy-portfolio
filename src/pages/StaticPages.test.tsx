import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { AboutPage } from './AboutPage';
import { ContactPage } from './ContactPage';

beforeEach(() => {
  document.title = '';
});

describe('static page titles', () => {
  it('sets the title for the About page', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /design with meaning/i }),
    ).toBeInTheDocument();
    expect(document.title).toBe('About — Natnael Fikreyesus');
  });

  it('sets the title for the Contact page', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /let’s work together/i }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Contact — Natnael Fikreyesus');
  });
});
