import { createContext } from 'react';
import type { ResolvedTheme, ThemeMode } from '@/types/theme';

export interface ThemeContextValue {
  /** Persisted user preference. */
  theme: ThemeMode;
  /** Theme currently applied to <html>. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
