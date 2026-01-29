import type { AppState, Theme } from '../types/state-types';
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
    }
  | {
      type: 'OPEN_EDIT_MODAL';
      reviewId: string;
    }
  | {
      type: 'OPEN_DELETE_MODAL';
      reviewId: string;
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'CONFIRM_DELETE';
    }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; theme: Theme };
