import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import ReviewRow from './ReviewRow';
import EmptyRow from './EmptyRow';

function ReviewsTable() {
  const { state } = useContext(AppContext);
  const { reviews } = state;

  return (
    <>
      <div className="table">
        <div className="table-container">
          <div className="table-header">
            <h1>Submitted Reviews</h1>
            <small>Live data</small>
          </div>

          <div className="table-section">
            <table id="reviewsTable">
              <thead>
                <tr>
                  <th>Review Title</th>
                  <th>Review Description</th>
                  <th>Purchase Date</th>
                  <th>Rating</th>
                  <th>Review Type</th>
                  <th>Product Tags</th>
                  <th>Recommend</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {reviews.length === 0 ? (
                  <EmptyRow />
                ) : (
                  reviews.map((review) => <ReviewRow key={review.id} review={review} />)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewsTable;
