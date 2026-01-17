import type { AppState } from '../types/review';
import { renderApp } from './App';

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
  dateLabel.textContent = 'Purchase Date';

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'input';
  dateInput.value = formState.data.date;

  dateInput.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;

    state.reviewForm.data.date = target.value;
    renderApp();
  });

  dateGroup.appendChild(dateLabel);
  dateGroup.appendChild(dateInput);

  purchaseSection.appendChild(sectionTitle);
  purchaseSection.appendChild(row);
  purchaseSection.appendChild(dateGroup);

  //Ratings section

  const ratingsSection = document.createElement('section');
  ratingsSection.className = 'form-group';

  const ratingsTitle = document.createElement('h3');
  ratingsTitle.textContent = 'Rate this Product';

  ratingsSection.appendChild(ratingsTitle);

  function createRatingRow(labelText: string): HTMLDivElement {
    const row = document.createElement('div');

    row.className = 'rating-row';

    const label = document.createElement('label');

    label.textContent = labelText;

    const starsContainer = document.createElement('div');

    starsContainer.className = 'star-rating';

    for (let i = 0; i < 5; i += 1) {
      const star = document.createElement('span');
      star.className = 'star';
      star.textContent = '★';
      starsContainer.appendChild(star);
    }

    row.appendChild(label);
    row.appendChild(starsContainer);

    return row;
  }
  ratingsSection.appendChild(createRatingRow('Overall Rating'));
  ratingsSection.appendChild(createRatingRow('Quality Rating'));
  ratingsSection.appendChild(createRatingRow('Value for Money'));
  ratingsSection.appendChild(createRatingRow('Delivery Experience'));
  ratingsSection.appendChild(createRatingRow('Customer Service'));

  //final
  form.appendChild(header);
  form.appendChild(purchaseSection);
  form.appendChild(ratingsSection);

  return form;
}
