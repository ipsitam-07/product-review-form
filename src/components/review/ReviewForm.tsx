import { useContext, useEffect } from 'react';
import AddtitionalInfoSection from './AddtitionalInfoSection';
import DetailReview from './DetailReview';
import PurchaseInfo from './PurchaseInfo';
import StarRatings from './StarRatings';
import { AppContext } from '../../context/AppContext';
import { scrollToFirstError } from '../../utils/scrollToError';

function ReviewForm() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const errors = state.reviewForm.ui.errors;

    if (Object.keys(errors).length > 0) {
      scrollToFirstError();
    }
  }, [state.reviewForm.ui.errors]);

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Write a Review</h1>
          <p>Tell us what you think about your purchase.</p>
        </header>
        <form
          id="review-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: 'SUBMIT_REVIEW',
            });
          }}
        >
          <PurchaseInfo />
          <StarRatings />
          <DetailReview />
          <AddtitionalInfoSection />
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReviewForm;
