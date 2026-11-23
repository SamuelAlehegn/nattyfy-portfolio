import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ResolvedTheme, ThemeMode } from '@/types/theme';
import { ThemeContext } from './theme-context';
import {
  applyTheme,
  DEFAULT_THEME_MODE,
  getSystemTheme,
  isThemeMode,
  readStoredTheme,
  THEME_STORAGE_KEY,
  writeStoredTheme,
} from './theme-storage';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // The inline pre-paint script has already applied the correct class. The provider
  // reads the same source of truth and keeps React state in sync with it.
  const [theme, setThemeState] = useState<ThemeMode>(() => readStoredTheme() ?? DEFAULT_THEME_MODE);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const frame = window.requestAnimationFrame(() => root.classList.add('theme-ready'));

    return () => {
      window.cancelAnimationFrame(frame);
      root.classList.remove('theme-ready');
    };
  }, []);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      setThemeState(isThemeMode(event.newValue) ? event.newValue : DEFAULT_THEME_MODE);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    writeStoredTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: ResolvedTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    writeStoredTheme(nextTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
