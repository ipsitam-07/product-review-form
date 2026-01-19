import type { AppState, ReviewFormState, Theme } from '../types/review';

export const initialReviewFormState: ReviewFormState = {
  data: {
    date: '',
    title: '',
    details: '',
    rating: {
      overall: '',
      quality: '',
      value: '',
      delivery: '',
      service: '',
    },
    reviewType: 'Verified Purchase',
    tags: [],
    recommend: '',
    buyAgain: false,
    makePublic: false,
    agreeTerms: false,
  },
  ui: {
    editId: null,
    errors: {},
  },
};

export const state: AppState = {
  reviewForm: structuredClone(initialReviewFormState),
  reviews: [],
  theme: 'light' as Theme,
};
