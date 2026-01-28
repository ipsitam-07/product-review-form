import type { AppState } from '../types/state';
import type { Ratings } from '../types/review';

export type Action =
  | {
      type: 'UPDATE_FORM_FIELD';
      field: keyof AppState['reviewForm']['data'];
      value: string | boolean;
    }
  | {
      type: 'UPDATE_RATING';
      ratingKey: keyof Ratings;
      value: string;
    }
  | {
      type: 'TOGGLE_TAG';
      tag: string;
    }
  | {
      type: 'SUBMIT_REVIEW';
    }
  | {
      type: 'EDIT_REVIEW';
      reviewId: string;
    }
  | {
      type: 'DELETE_REVIEW';
      reviewId: string;
    }
  | {
      type: 'STORE_REVIEW';
      payload: Partial<AppState>;
    };
