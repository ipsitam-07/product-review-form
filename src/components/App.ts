import { ProductDeatils } from "./ProductDetails";
import { StarRating } from "./StarRating";

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';
  const form: HTMLDivElement = document.createElement('div');
  form.className = 'app';

  form.appendChild(ProductDeatils());
  form.appendChild(StarRating());

  root.appendChild(form);

}
