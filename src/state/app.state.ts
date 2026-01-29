import type { ReviewFormState, AppState } from '../types/state-types';

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

export const initialModalState = {
  type: null,
  reviewId: null,
};

export const initialAppState: AppState = {
  reviews: [],
  reviewForm: initialReviewFormState,
  modal: initialModalState,
  theme: 'light',
};
