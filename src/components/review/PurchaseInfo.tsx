import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';

function PurchaseInfo() {
  const { state, dispatch } = useContext(AppContext);

  const purchaseDate = state.reviewForm.data.date;
  const dateError = state.reviewForm.ui.errors.date;
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
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={purchaseDate}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FORM_FIELD',
                field: 'date',
                value: e.target.value,
              })
            }
            required
          />
          {dateError && <span className="error-msg">{dateError}</span>}
        </div>
      </section>
    </>
  );
}

export default PurchaseInfo;
