import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
});

describe('App', () => {
  it('renders the home page inside the root layout', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /natnael fikreyesus/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /portfolio highlight/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    const contactLinks = screen.getAllByRole('link', { name: 'Contact Me' });
    expect(contactLinks).toHaveLength(2);
    contactLinks.forEach((link) => expect(link).toHaveAttribute('href', '/contact'));

    expect(screen.getByRole('link', { name: /natnael fikreyesus — home/i })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'View more projects' })).toHaveAttribute(
      'href',
      '/works',
    );
    expect(screen.getByRole('link', { name: /fikreyesusn@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:fikreyesusn@gmail.com',
    );
    expect(screen.getByText(/design is the silent ambassador/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /opens in a new tab/i })).toHaveLength(3);
  });

  it('opens and closes the mobile navigation menu', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: 'Open menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));

    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
  });

  it('defaults to the dark theme and toggles the preference', () => {
    render(<App />);

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('natnael-theme')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }));

    expect(document.documentElement).not.toHaveClass('dark');
    expect(window.localStorage.getItem('natnael-theme')).toBe('light');
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
  });
});
