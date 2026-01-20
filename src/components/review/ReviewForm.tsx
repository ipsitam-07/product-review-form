import AddtitionalInfoSection from './AddtitionalInfoSection';
import DetailReview from './DetailReview';
import PurchaseInfo from './PurchaseInfo';
import StarRatings from './StarRatings';

function ReviewForm() {
  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Write a Review</h1>
          <p>Tell us what you think about your purchase.</p>
          <form id="review-form" noValidate>
            <PurchaseInfo />
            <StarRatings />
            <DetailReview />
            <AddtitionalInfoSection />
          </form>
        </header>
      </div>
    </>
  );
}

export default ReviewForm;
