import type { ReviewFormState, AppState } from '../types/state';

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

export const initialAppState: AppState = {
  reviews: [],
  reviewForm: initialReviewFormState,
  theme: 'light',
};
