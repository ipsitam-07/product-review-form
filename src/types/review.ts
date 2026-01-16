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
