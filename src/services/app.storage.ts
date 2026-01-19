import type { Review } from '../types/review';
import { state } from '../state/app.state';

const STORAGE_KEY = 'reviews';

export function saveToLocalStorage(reviews: Review[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function loadFromStorage(): void {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return;
  }

  try {
    state.reviews = JSON.parse(stored) as Review[];
  } catch {
    state.reviews = [];
  }
}
