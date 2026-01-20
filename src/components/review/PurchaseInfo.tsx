function PurchaseInfo() {
  return (
    <>
      <section className="form-section">
        <h3>Purchase Information</h3>
        <div className="row">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value="Wireless Noise-Canceling Headphones"
              className="readonly-input"
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Product SKU</label>
            <input type="text" value="SKU-998877" className="readonly-input" readOnly />
          </div>
        </div>
        <div className="form-group">
          <label>
            Purchase Date <span className="required-star">*</span>
          </label>
          <input type="date" id="purchaseDate" name="purchaseDate" max="" required />
          <span className="error-msg" id="error-purchaseDate"></span>
        </div>
      </section>
    </>
  );
}

export default PurchaseInfo;
