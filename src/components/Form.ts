import type { AppState } from '../types/review';
import { renderApp } from './App';
import { StarRatings } from './StarRating';
import { ReviewDetails } from './ReviewDetails';
import { TagsAndRecommendSection } from './TagsAndRecommend';
import { AdditionalInfoSection } from './AdditonalInfoSection';
import { FormActions } from './FormAction';
import { validateReviewForm } from '../services/formValidation';
import { createReviewFromForm } from '../services/createForm';
import { scrollToFirstError } from '../utils/dom';
import { saveToLocalStorage } from '../storage/app.storage';
import { initialReviewFormState } from '../state/app.state';
export function Form(state: AppState): HTMLFormElement {
  const formState = state.reviewForm;

  const form = document.createElement('form');
  form.className = 'form';

  //Header

  const header = document.createElement('header');
  header.className = 'header';

  const heading = document.createElement('h1');
  heading.className = 'header-h1';
  heading.textContent = 'Write a Review';

  const subHeading = document.createElement('p');
  subHeading.className = 'header-p';
  subHeading.textContent = 'Tell us what you think about our product.';

  header.appendChild(heading);
  header.appendChild(subHeading);

  //Purchase Info section

  const purchaseSection = document.createElement('section');
  purchaseSection.className = 'form-section';

  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = 'Purchase Information';

  //Product name

  const row = document.createElement('div');
  row.className = 'row';

  const productName = document.createElement('div');
  productName.className = 'form-group';

  const productNameText = document.createElement('label');
  productNameText.textContent = 'Product Name';

  const productNameInput = document.createElement('input');
  productNameInput.type = 'text';
  productNameInput.className = 'input';
  productNameInput.value = 'Wireless Noise-Canceling Headphones';
  productNameInput.readOnly = true;

  productName.appendChild(productNameText);
  productName.appendChild(productNameInput);

  //Product SKU

  const sku = document.createElement('div');
  sku.className = 'form-group';

  const skuLabel = document.createElement('label');
  skuLabel.textContent = 'Product SKU';

  const skuInput = document.createElement('input');
  skuInput.type = 'text';
  skuInput.className = 'input';
  skuInput.value = 'SKU-998877';
  skuInput.readOnly = true;

  sku.appendChild(skuLabel);
  sku.appendChild(skuInput);

  row.appendChild(productName);
  row.appendChild(sku);
  //Purchase Date

  const dateGroup = document.createElement('div');
  dateGroup.className = 'form-group';

  const dateLabel = document.createElement('label');
  dateLabel.innerHTML = 'Purchase Date  <span class="required-star">*</span>';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'purchaseDate';
  dateInput.max = '';
  dateInput.className = 'input';
  dateInput.value = formState.data.date;

  dateInput.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;

    state.reviewForm.data.date = target.value;
    renderApp();
  });

  dateGroup.appendChild(dateLabel);
  dateGroup.appendChild(dateInput);

  const dateError = document.createElement('span');
  dateError.className = 'error-msg';

  const dateErrMsg = state.reviewForm.ui.errors.date;
  if (dateErrMsg) {
    dateError.textContent = dateErrMsg;
  }

  dateGroup.appendChild(dateError);

  purchaseSection.appendChild(sectionTitle);
  purchaseSection.appendChild(row);
  purchaseSection.appendChild(dateGroup);

  //final
  form.appendChild(header);
  form.appendChild(purchaseSection);
  form.appendChild(StarRatings(state));
  form.appendChild(ReviewDetails(state));
  form.appendChild(TagsAndRecommendSection(state));
  form.appendChild(AdditionalInfoSection(state));
  form.appendChild(FormActions());

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = validateReviewForm(state.reviewForm.data);
    state.reviewForm.ui.errors = errors;

    if (Object.keys(errors).length > 0) {
      renderApp();
      requestAnimationFrame(scrollToFirstError);
      return;
    }

    if (state.reviewForm.ui.editId) {
      state.reviews = state.reviews.map((review) =>
        review.id === state.reviewForm.ui.editId ? { ...review, ...state.reviewForm.data } : review,
      );
      alert('Review Updated!');
    } else {
      const newReview = createReviewFromForm(state.reviewForm.data);
      state.reviews = [...state.reviews, newReview];
      alert('Review Submitted!');
    }

    saveToLocalStorage(state.reviews);
    state.reviewForm = structuredClone(initialReviewFormState);
    renderApp();
  });

  return form;
}
