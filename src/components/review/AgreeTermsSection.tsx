import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function AgreeTermsSection() {
  const { state, dispatch } = useContext(AppContext);
  const { agreeTerms } = state.reviewForm.data;
  const { errors } = state.reviewForm.ui;

  return (
    <>
      <section className="form-section-agreeTerms">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_FORM_FIELD',
                  field: 'agreeTerms',
                  value: e.target.checked,
                })
              }
            />
            I agree to the <a href="#">Terms & Conditions</a>{' '}
            <span className="required-star">*</span>
          </label>

          {errors.agreeTerms && <span className="error-msg">{errors.agreeTerms}</span>}
        </div>
      </section>
    </>
  );
}

export default AgreeTermsSection;
