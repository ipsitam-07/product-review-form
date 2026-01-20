function DetailReview() {
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
            required
          />
          <div className="helper-text">10-100 characters</div>
          <span className="error-msg" id="error-reviewTitle"></span>
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
            required
          ></textarea>
          <div className="helper-text">30-1000 characters</div>
          <span className="error-msg" id="error-reviewDetails"></span>
        </div>

        <div className="form-group">
          <label>Review Type</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="reviewType" value="Verified Purchase" checked /> Verified
              Purchase
            </label>
            <label className="radio-label">
              <input type="radio" name="reviewType" value="General Review" /> General Review
            </label>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-group">
          <label>
            Product Tags <small>(Select all that apply)</small>
          </label>
          <div className="tags-container" id="tagsContainer">
            <button type="button" className="tag-btn">
              Best Quality
            </button>
            <button type="button" className="tag-btn">
              Great Value
            </button>
            <button type="button" className="tag-btn">
              Good Packaging
            </button>
            <button type="button" className="tag-btn">
              Fast Delivery
            </button>
            <button type="button" className="tag-btn">
              Highly Recommended
            </button>
            <button type="button" className="tag-btn">
              Poor Quality
            </button>
            <button type="button" className="tag-btn">
              Not Worth Price
            </button>
            <button type="button" className="tag-btn">
              Damaged on Arrival
            </button>
          </div>
          <input type="hidden" name="selectedTags" id="selectedTags" />
        </div>

        <div className="form-group">
          <label>
            Would you recommend this product? <span className="required-star">*</span>
          </label>
          <div className="radio-stack">
            <label>
              <input type="radio" name="recommend" value="Definitely Yes" required /> Definitely Yes
            </label>
            <label>
              <input type="radio" name="recommend" value="Yes" /> Yes
            </label>
            <label>
              <input type="radio" name="recommend" value="Maybe" /> Maybe
            </label>
            <label>
              <input type="radio" name="recommend" value="No" /> No
            </label>
            <label>
              <input type="radio" name="recommend" value="Definitely No" /> Definitely No
            </label>
          </div>
          <span className="error-msg" id="error-recommend"></span>
        </div>
      </section>
    </>
  );
}

export default DetailReview;
