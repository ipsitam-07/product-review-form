import type { Review, Theme } from '../types/review';
import { state } from '../state/app.state';
import { STORAGE_KEY, THEME } from '../utils/constants';

function normalizeReview(review: Review): Review {
  return {
    ...review,
    rating: review.rating ?? {
      overall: '',
      quality: '',
      value: '',
      delivery: '',
      service: '',
    },
    tags: review.tags ?? [],
  };
}

export function getReviewsFromStorage(): Review[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return (JSON.parse(stored) as Review[]).map(normalizeReview);
  } catch {
    return [];
  }
}

export function setReviewsToStorage(reviews: Review[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function saveToLocalStorage(): void {
  setReviewsToStorage(state.reviews);
}

export function loadFromStorage(): void {
  state.reviews = getReviewsFromStorage();
}

//Theme persistence
export function getTheme(): Theme | null {
  const stored = localStorage.getItem(THEME);

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return null;
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME, theme);
}

export function loadTheme(): void {
  const storedTheme = getTheme();

  if (storedTheme) {
    state.theme = storedTheme;
  }
}

export function persistTheme(): void {
  setTheme(state.theme);
}
