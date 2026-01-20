function AddtitionalInfoSection() {
  return (
    <>
      <section className="form-section last-section">
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="buyAgain" /> I would buy this product again
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="makePublic" required /> Make my review public
            <span className="required-star">*</span>
          </label>
          <span className="error-msg" id="error-makePublic"></span>
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="agreeTerms" required /> I agree to the{' '}
            <a href="#">Terms & Conditions</a>
            <span className="required-star">*</span>
          </label>
          <span className="error-msg" id="error-agreeTerms"></span>
        </div>
      </section>
    </>
  );
}

export default AddtitionalInfoSection;
