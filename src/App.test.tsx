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
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Me' })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /natnael fikreyesus — home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('toggles the theme and persists the preference', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /switch to dark theme/i }));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('natnael-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
  });
});
