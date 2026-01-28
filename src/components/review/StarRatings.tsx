import { RATING_CONFIG } from '../../constants/constants';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { Ratings } from '../../types/review';
import { RatingRow } from './StarRatingRow';

function StarRatings() {
  const { state, dispatch } = useContext(AppContext);

  const { rating } = state.reviewForm.data;
  const { errors } = state.reviewForm.ui;
  return (
    <>
      <section className="form-section">
        <h3>Your Rating</h3>
        {RATING_CONFIG.map(({ key, label, required }) => {
          const selectedValue = Number(rating[key as keyof Ratings] || 0);

          return (
            <RatingRow
              key={key}
              label={label}
              ratingKey={key}
              selectedValue={selectedValue}
              required={required}
              error={errors[key]}
              onSelect={(value) =>
                dispatch({
                  type: 'UPDATE_RATING',
                  ratingKey: key,
                  value: String(value),
                })
              }
            />
          );
        })}
      </section>
    </>
  );
}

export default StarRatings;
