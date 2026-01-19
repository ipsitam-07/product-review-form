import type { Review } from '../types/review';
import { state } from '../state/app.state';

const STORAGE_KEY = 'reviews';

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

export function saveToLocalStorage(reviews: Review[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function loadFromStorage(): void {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return;
  }

  try {
    const parsed = JSON.parse(stored) as Review[];
    state.reviews = parsed.map(normalizeReview);
  } catch {
    state.reviews = [];
  }
}
