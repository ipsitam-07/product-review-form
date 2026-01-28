import type { RatingRowProps } from '../../types/props';
import { useState } from 'react';

export function RatingRow({ label, selectedValue, required, error, onSelect }: RatingRowProps) {
  const [hoverStar, setHoverStar] = useState<number | null>(null);

  const currentValue = hoverStar !== null ? hoverStar : selectedValue;
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={`rating-group ${required ? 'required' : ''}`}>
      <label>
        {label}

        {required && <span className="required-star">*</span>}
      </label>

      <div className="star-rating">
        {stars.map((starValue) => (
          <span
            key={starValue}
            className={`star ${starValue <= currentValue ? 'star-active' : ''}`}
            onMouseEnter={() => setHoverStar(starValue)}
            onMouseLeave={() => setHoverStar(null)}
            onClick={() => onSelect(starValue)}
          >
            ★
          </span>
        ))}
      </div>

      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}
