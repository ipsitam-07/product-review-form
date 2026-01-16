export function ProductDeatils(): HTMLElement {
    let productDetails = document.createElement('header');
    productDetails.innerHTML = `
    <header class="review-form-header">
      <h1>Write a Review</h1>
      <p>Tell us what you think about your purchase.</p>
    </header>
    <section class="form-section">
      <h3>Purchase Information</h3>
 
      <div class="form-row">
        <div class="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value="Wireless Noise-Canceling Headphones"
            readonly
          />
        </div>
 
        <div class="form-group">
          <label>Product SKU</label>
          <input
            type="text"
            value="SKU-998877"
            readonly
          />
        </div>
      </div>
 
      <div class="form-group">
        <label>Purchase Date</label>
        <input type="date" />
      </div>
    </section>

  `
  return productDetails;
}
 