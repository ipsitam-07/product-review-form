export type RatingRowProps = {
  label: string;
  ratingKey: string;
  selectedValue: number;
  required: boolean;
  error?: string;
  onSelect: (value: number) => void;
};
