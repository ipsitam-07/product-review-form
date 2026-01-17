import type { AppState } from '../types/review';

export const state: AppState = {
  reviewForm: {
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
      reviewType: 'General Review',
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
  },
  reviews: [],
};
