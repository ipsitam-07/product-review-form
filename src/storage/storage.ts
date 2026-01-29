import { STORAGE_KEY, THEME } from '../constants/constants';
import type { Review } from '../types/review';
import type { Theme } from '../types/state-types';

export function getterStorage(): Review[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Review[];
  } catch {
    return [];
  }
}

export function setterStorage(reviews: Review[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getterTheme(): Theme | null {
  const stored = localStorage.getItem(THEME);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

export function setterTheme(theme: Theme): void {
  localStorage.setItem(THEME, theme);
}
