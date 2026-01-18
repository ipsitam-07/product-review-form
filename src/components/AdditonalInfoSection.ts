import { renderApp } from './App';
import type { AppState } from '../types/review';

export function AdditionalInfoSection(state: AppState): HTMLElement {
  const section = document.createElement('section');
  section.className = 'form-section last-section';

  //Buy again

  const buyAgain = document.createElement('div');
  buyAgain.className = 'checkbox-group';

  const buyAgainLabel = document.createElement('label');

  const buyAgainCheckbox = document.createElement('input');
  buyAgainCheckbox.type = 'checkbox';
  buyAgainCheckbox.checked = state.reviewForm.data.buyAgain;

  buyAgainCheckbox.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    state.reviewForm.data.buyAgain = target.checked;
    renderApp();
  });

  buyAgainLabel.appendChild(buyAgainCheckbox);
  buyAgainLabel.append(' I would buy this product again');

  buyAgain.appendChild(buyAgainLabel);
  section.appendChild(buyAgain);

  //Make Public

  const makePublic = document.createElement('div');
  makePublic.className = 'checkbox-group';

  const makePublicLabel = document.createElement('label');

  const makePublicCheckbox = document.createElement('input');
  makePublicCheckbox.type = 'checkbox';
  makePublicCheckbox.checked = state.reviewForm.data.makePublic;

  makePublicCheckbox.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    state.reviewForm.data.makePublic = target.checked;
    renderApp();
  });

  makePublicLabel.appendChild(makePublicCheckbox);
  makePublicLabel.append(' Make my review public ');
  makePublicLabel.insertAdjacentHTML('beforeend', '<span class="required-star">*</span>');

  makePublic.appendChild(makePublicLabel);

  const makePublicError = document.createElement('span');
  makePublicError.className = 'error-msg';
  makePublic.appendChild(makePublicError);

  section.appendChild(makePublic);

  //Agree Terms

  const agree = document.createElement('div');
  agree.className = 'checkbox-group';

  const agreeLabel = document.createElement('label');

  const agreeCheckbox = document.createElement('input');
  agreeCheckbox.type = 'checkbox';
  agreeCheckbox.checked = state.reviewForm.data.agreeTerms;

  agreeCheckbox.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    state.reviewForm.data.agreeTerms = target.checked;
    renderApp();
  });

  agreeLabel.appendChild(agreeCheckbox);
  agreeLabel.insertAdjacentHTML('beforeend', ' I agree to the <a href="#">Terms & Conditions</a> ');
  agreeLabel.insertAdjacentHTML('beforeend', '<span class="required-star">*</span>');

  agree.appendChild(agreeLabel);

  const agreeError = document.createElement('span');
  agreeError.className = 'error-msg';
  agree.appendChild(agreeError);

  section.appendChild(agree);

  return section;
}
