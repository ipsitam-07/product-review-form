import type { Review } from '../../types/review';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

type Props = {
  review: Review;
};

function ReviewRow({ review }: Props) {
  const { dispatch } = useContext(AppContext);
  return (
    <tr>
      <td>{review.title}</td>
      <td>{review.details}</td>
      <td>{review.date}</td>

      <td>
        <ul>
          {review.rating.overall && <li>Overall: {review.rating.overall}</li>}
          {review.rating.quality && <li>Quality: {review.rating.quality}</li>}
          {review.rating.value && <li>Value: {review.rating.value}</li>}
          {review.rating.delivery && <li>Delivery: {review.rating.delivery}</li>}
          {review.rating.service && <li>Service: {review.rating.service}</li>}
        </ul>
      </td>

      <td>{review.reviewType}</td>

      <td>
        {review.tags.length > 0 ? (
          <div className="tags-list">
            {review.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <span>—</span>
        )}
      </td>

      <td>{review.recommend}</td>

      <td>
        <div className="action-column">
          <button
            type="button"
            className="edit-icon-btn"
            onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL', reviewId: review.id })}
          >
            <FaEdit />
          </button>
          <button
            className="dlt-icon-btn"
            type="button"
            onClick={() => dispatch({ type: 'OPEN_DELETE_MODAL', reviewId: review.id })}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ReviewRow;
