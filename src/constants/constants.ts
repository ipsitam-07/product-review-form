export const TAG_OPTIONS = [
  'Best Quality',
  'Great Value',
  'Good Packaging',
  'Fast Delivery',
  'Highly Recommended',
  'Poor Quality',
  'Not Worth Price',
  'Damaged on Arrival',
];

export const RATING_CONFIG = [
  { key: 'overall', label: 'Overall Rating', required: true },
  { key: 'quality', label: 'Quality Rating', required: true },
  { key: 'value', label: 'Value for Money', required: true },
  { key: 'delivery', label: 'Delivery Experience', required: false },
  { key: 'service', label: 'Customer Service', required: false },
] as const;

export const RECOMMEND_OPTIONS = ['Definitely Yes', 'Yes', 'Maybe', 'No', 'Definitely No'];

export const STORAGE_KEY = 'reviews';
export const THEME = 'theme';
