import { renderApp } from './App';
import type { AppState, ReviewType } from '../types/review';

const reviewTypes: ReviewType[] = ['Verified Purchase', 'General Review'];

export function ReviewDetails(state: AppState): HTMLElement {
  const section = document.createElement('section');
  section.className = 'form-section';

  const heading = document.createElement('h3');
  heading.textContent = 'Your Review';

  section.appendChild(heading);

  //Review Title
  const title = document.createElement('div');
  title.className = 'form-group';

  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Review Title';

  title.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'input';
  titleInput.placeholder = 'Sum up your experience';
  titleInput.minLength = 10;
  titleInput.maxLength = 100;
  titleInput.value = state.reviewForm.data.title;

  titleInput.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    state.reviewForm.data.title = target.value;
  });

  title.appendChild(titleInput);

  const titleHelper = document.createElement('div');
  titleHelper.className = 'helper-text';
  titleHelper.textContent = '10–100 characters';

  title.appendChild(titleHelper);

  const titleError = document.createElement('span');
  titleError.className = 'error-msg';

  title.appendChild(titleError);

  section.appendChild(title);

  //Review Details
  const details = document.createElement('div');
  details.className = 'form-group';

  const detailsLabel = document.createElement('label');
  detailsLabel.textContent = 'Detailed Review';

  details.appendChild(detailsLabel);

  const detailsTextarea = document.createElement('textarea');
  detailsTextarea.className = 'textarea';
  detailsTextarea.placeholder = 'What did you like or dislike? What did you use this product for?';
  detailsTextarea.minLength = 30;
  detailsTextarea.maxLength = 1000;
  detailsTextarea.rows = 5;
  detailsTextarea.value = state.reviewForm.data.details;

  detailsTextarea.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    state.reviewForm.data.details = target.value;
  });

  details.appendChild(detailsTextarea);

  const detailsHelper = document.createElement('div');
  detailsHelper.className = 'helper-text';
  detailsHelper.textContent = '30–1000 characters';
  details.appendChild(detailsHelper);

  const detailsError = document.createElement('span');
  detailsError.className = 'error-msg';
  details.appendChild(detailsError);

  section.appendChild(details);

  //review type
  const type = document.createElement('div');
  type.className = 'form-group';

  const typeLabel = document.createElement('label');
  typeLabel.textContent = 'Review Type';
  type.appendChild(typeLabel);

  const radioGroup = document.createElement('div');
  radioGroup.className = 'radio-group';

  reviewTypes.forEach((type) => {
    const label = document.createElement('label');
    label.className = 'radio-label';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'reviewType';
    radio.value = type;
    radio.checked = state.reviewForm.data.reviewType === type;

    radio.addEventListener('change', () => {
      state.reviewForm.data.reviewType = type;
      renderApp();
    });

    label.appendChild(radio);
    label.append(type);

    radioGroup.appendChild(label);
  });

  type.appendChild(radioGroup);
  section.appendChild(type);

  return section;
}
