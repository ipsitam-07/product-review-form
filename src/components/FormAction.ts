import { state } from '../state/app.state';

export function FormActions(): HTMLElement {
  const actions = document.createElement('div');
  actions.className = 'form-action';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'submit-btn';

  if (state.reviewForm.ui.editId === null) {
    submitBtn.textContent = 'Submit Review';
  } else {
    submitBtn.textContent = 'Save Review';
  }

  actions.appendChild(submitBtn);

  return actions;
}
