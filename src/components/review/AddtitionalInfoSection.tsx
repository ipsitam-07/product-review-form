import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function AddtitionalInfoSection() {
  const { state, dispatch } = useContext(AppContext);

  const { buyAgain, makePublic, agreeTerms } = state.reviewForm.data;
  const { errors } = state.reviewForm.ui;
  return (
    <>
      <section className="form-section last-section">
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={buyAgain}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_FORM_FIELD',
                  field: 'buyAgain',
                  value: e.target.checked,
                })
              }
            />
            I would buy this product again
          </label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={makePublic}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_FORM_FIELD',
                  field: 'makePublic',
                  value: e.target.checked,
                })
              }
            />
            Make my review public <span className="required-star">*</span>
          </label>

          {errors.makePublic && <span className="error-msg">{errors.makePublic}</span>}
        </div>
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

export default AddtitionalInfoSection;
