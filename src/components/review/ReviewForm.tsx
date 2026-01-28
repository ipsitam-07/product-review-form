import { useContext } from 'react';
import AddtitionalInfoSection from './AddtitionalInfoSection';
import DetailReview from './DetailReview';
import PurchaseInfo from './PurchaseInfo';
import StarRatings from './StarRatings';
import { AppContext } from '../../context/AppContext';

function ReviewForm() {
  const { dispatch } = useContext(AppContext);
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
