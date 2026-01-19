export function FormActions(): HTMLElement {
  const actions = document.createElement('div');
  actions.className = 'form-action';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'submit-btn';
  submitBtn.textContent = 'Submit Review';

  actions.appendChild(submitBtn);

  return actions;
}
