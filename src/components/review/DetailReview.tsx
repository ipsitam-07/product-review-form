import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { TAG_OPTIONS, RECOMMEND_OPTIONS } from '../../constants/constants';
import type { ReviewType } from '../../types/review';

function DetailReview() {
  const { state, dispatch } = useContext(AppContext);
  const { title, details, reviewType, tags, recommend } = state.reviewForm.data;

  const { errors } = state.reviewForm.ui;

  const reviewTypes: ReviewType[] = ['Verified Purchase', 'General Review'];

  return (
    <>
      <section className="form-section">
        <h3>Your Review</h3>
        <div className="form-group">
          <label>
            Review Title <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="reviewTitle"
            name="reviewTitle"
            placeholder="Sum up your experience"
            minLength={100}
            maxLength={1000}
            value={title}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FORM_FIELD',
                field: 'title',
                value: e.target.value,
              })
            }
            required
          />
          <div className="helper-text">10-100 characters</div>
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>
            Detailed Review <span className="required-star">*</span>
          </label>
          <textarea
            id="reviewDetails"
            name="reviewDetails"
            placeholder="What did you like or dislike? What did you use this product for?"
            minLength={30}
            maxLength={1000}
            rows={5}
            value={details}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FORM_FIELD',
                field: 'details',
                value: e.target.value,
              })
            }
            required
          ></textarea>
          <div className="helper-text">30-1000 characters</div>
          {errors.details && <span className="error-msg">{errors.details}</span>}
        </div>

        <div className="form-group">
          <label>Review Type</label>
          <div className="radio-group">
            {reviewTypes.map((type) => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  name="reviewType"
                  checked={reviewType === type}
                  onChange={() =>
                    dispatch({
                      type: 'UPDATE_FORM_FIELD',
                      field: 'reviewType',
                      value: type,
                    })
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-group">
          <label>
            Product Tags <small>(Select all that apply)</small>
          </label>
          <div className="tags-container">
            {TAG_OPTIONS.map((tag) => {
              const isSelected = tags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  className={`tag-btn ${isSelected ? 'tag-btn-selected' : ''}`}
                  onClick={() =>
                    dispatch({
                      type: 'TOGGLE_TAG',
                      tag,
                    })
                  }
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-group">
          <label>
            Would you recommend this product? <span className="required-star">*</span>
          </label>
          <div className="radio-stack">
            {RECOMMEND_OPTIONS.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="recommend"
                  checked={recommend === option}
                  onChange={() =>
                    dispatch({
                      type: 'UPDATE_FORM_FIELD',
                      field: 'recommend',
                      value: option,
                    })
                  }
                />
                {option}
              </label>
            ))}
          </div>
          {errors.recommend && <span className="error-msg">{errors.recommend}</span>}
        </div>
      </section>
    </>
  );
}

export default DetailReview;
