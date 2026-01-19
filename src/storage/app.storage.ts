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
