import type { Ratings, ReviewType, Review } from './review';

export type ReviewFormData = {
  date: string;
  title: string;
  details: string;
  rating: Ratings;
  reviewType: ReviewType;
  tags: string[];
  recommend: string;
  buyAgain: boolean;
  makePublic: boolean;
  agreeTerms: boolean;
};

export type ReviewFormUI = {
  editId: string | null;
  errors: Record<string, string>;
};

export type ReviewFormState = {
  data: ReviewFormData;
  ui: ReviewFormUI;
};

export type Theme = 'light' | 'dark';

export type AppState = {
  reviewForm: ReviewFormState;
  reviews: Review[];
  modal: ModalState;
  theme: Theme;
};

export type ModalType = 'edit' | 'delete' | null;

export type ModalState = {
  type: ModalType;
  reviewId: string | null;
};
