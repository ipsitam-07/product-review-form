export function StarRating(): HTMLElement {
    let starRating = document.createElement('p');

    starRating.innerHTML = 
     `
            <section class="form-section">
            <h3>Rate this Product</h3>
            
            <div class="rating-group required">
                <label>Overall Rating <span class="required-star">*</span></label>
                <div class="star-rating" data-name="overallRating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <input type="hidden" name="overallRating" id="overallRating" required>
                <span class="error-msg" id="error-overallRating"></span>
            </div>

            <div class="rating-group required">
                <label>Quality Rating <span class="required-star">*</span></label>
                <div class="star-rating" data-name="qualityRating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <input type="hidden" name="qualityRating" id="qualityRating" required>
                <span class="error-msg" id="error-qualityRating"></span>
            </div>

            <div class="rating-group required">
                <label>Value for Money <span class="required-star">*</span></label>
                <div class="star-rating" data-name="valueRating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <input type="hidden" name="valueRating" id="valueRating" required>
                <span class="error-msg" id="error-valueRating"></span>
            </div>

            <div class="rating-group">
                <label>Delivery Experience <small>(Optional)</small></label>
                <div class="star-rating" data-name="deliveryRating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <input type="hidden" name="deliveryRating" id="deliveryRating">
            </div>

            <div class="rating-group">
                <label>Customer Service <small>(Optional)</small></label>
                <div class="star-rating" data-name="serviceRating">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
                <input type="hidden" name="serviceRating" id="serviceRating">
            </div>
        </section>

    `
    return starRating;
}