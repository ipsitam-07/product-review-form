export type Ratings = {
  overall: string;
  quality: string;
  value: string;
  delivery?: string;
  service?: string;
};

export type ReviewType = 'Verified Purchase' | 'General Review';

export type Review = {
  id: string;
  date: string;
  title: string;
  details: string;
  rating: Ratings;
  reviewType: ReviewType;
  tags: string[];
  recommend: string;
  buyAgain?: boolean;
  makePublic: boolean;
  agreeTerms: boolean;
};
