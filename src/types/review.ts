export type Ratings = {
  overall: string;
  quality: string;
  value: string;
  delivery?: string;
  service?: string;
};

export type Review = {
  id: string;
  date: string;
  title: string;
  details: string;
  rating: Ratings;
  reviewType: 'Verified Purchase' | 'General Review';
  tags?: string[];
  recommend: string;
  buyAgain?: boolean;
  makePublic: boolean;
  agreeTerms: boolean;
};

export type ReviewFormData = {
  date: string;
  title: string;
  details: string;
  rating: Ratings;
  reviewType: 'Verified Purchase' | 'General Review';
  tags?: string[];
  recommend: string;
  buyAgain?: boolean;
  makePublic: boolean;
  agreeTerms: boolean;
};

export type ReviewFormUI = {
  editId: string | null;
  errors: Record<string, string>;
}

export type ReviewFormState = {
  data: ReviewFormData;
  ui: ReviewFormUI;
}
export type AppState = {
  reviewForm: ReviewFormData;
  reviews: Review[];
};
