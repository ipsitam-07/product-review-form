import { useContext, useEffect, useRef } from 'react';
import AddtitionalInfoSection from './AddtitionalInfoSection';
import DetailReview from './DetailReview';
import PurchaseInfo from './PurchaseInfo';
import StarRatings from './StarRatings';
import { AppContext } from '../../context/AppContext';
import { scrollToFirstError } from '../../utils/scrollToError';

function ReviewForm() {
  const { state, dispatch } = useContext(AppContext);

  const editingRef = useRef(false);

  useEffect(() => {
    const errors = state.reviewForm.ui.errors;
    const editId = state.reviewForm.ui.editId;

    if (Object.keys(errors).length > 0) {
      scrollToFirstError();
    }

    if (editingRef.current && editId === null && Object.keys(errors).length === 0) {
      alert('Review updated successfully');
    }
    editingRef.current = editId !== null;
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
              {state.reviewForm.ui.editId ? 'Update Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReviewForm;
