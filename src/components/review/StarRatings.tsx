function StarRatings() {
  return (
    <>
      <section className="form-section">
        <h3>Rate this Product</h3>

        <div className="rating-group required">
          <label>
            Overall Rating <span className="required-star">*</span>
          </label>
          <div className="star-rating" data-name="overallRating">
            <span className="star" data-value="1">
              ★
            </span>
            <span className="star" data-value="2">
              ★
            </span>
            <span className="star" data-value="3">
              ★
            </span>
            <span className="star" data-value="4">
              ★
            </span>
            <span className="star" data-value="5">
              ★
            </span>
          </div>
          <input type="hidden" name="overallRating" id="overallRating" required />
          <span className="error-msg" id="error-overallRating"></span>
        </div>

        <div className="rating-group required">
          <label>
            Quality Rating <span className="required-star">*</span>
          </label>
          <div className="star-rating" data-name="qualityRating">
            <span className="star" data-value="1">
              ★
            </span>
            <span className="star" data-value="2">
              ★
            </span>
            <span className="star" data-value="3">
              ★
            </span>
            <span className="star" data-value="4">
              ★
            </span>
            <span className="star" data-value="5">
              ★
            </span>
          </div>
          <input type="hidden" name="qualityRating" id="qualityRating" required />
          <span className="error-msg" id="error-qualityRating"></span>
        </div>

        <div className="rating-group required">
          <label>
            Value for Money <span className="required-star">*</span>
          </label>
          <div className="star-rating" data-name="valueRating">
            <span className="star" data-value="1">
              ★
            </span>
            <span className="star" data-value="2">
              ★
            </span>
            <span className="star" data-value="3">
              ★
            </span>
            <span className="star" data-value="4">
              ★
            </span>
            <span className="star" data-value="5">
              ★
            </span>
          </div>
          <input type="hidden" name="valueRating" id="valueRating" required />
          <span className="error-msg" id="error-valueRating"></span>
        </div>

        <div className="rating-group">
          <label>
            Delivery Experience <small>(Optional)</small>
          </label>
          <div className="star-rating" data-name="deliveryRating">
            <span className="star" data-value="1">
              ★
            </span>
            <span className="star" data-value="2">
              ★
            </span>
            <span className="star" data-value="3">
              ★
            </span>
            <span className="star" data-value="4">
              ★
            </span>
            <span className="star" data-value="5">
              ★
            </span>
          </div>
          <input type="hidden" name="deliveryRating" id="deliveryRating" />
        </div>

        <div className="rating-group">
          <label>
            Customer Service <small>(Optional)</small>
          </label>
          <div className="star-rating" data-name="serviceRating">
            <span className="star" data-value="1">
              ★
            </span>
            <span className="star" data-value="2">
              ★
            </span>
            <span className="star" data-value="3">
              ★
            </span>
            <span className="star" data-value="4">
              ★
            </span>
            <span className="star" data-value="5">
              ★
            </span>
          </div>
          <input type="hidden" name="serviceRating" id="serviceRating" />
        </div>
      </section>
    </>
  );
}

export default StarRatings;
