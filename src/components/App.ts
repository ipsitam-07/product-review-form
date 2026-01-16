import { ReviewForm } from './ReviewForm';

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element not found');
  }

  root.innerHTML = '';

  const layout: HTMLDivElement = document.createElement('div');

  layout.className = 'app';

  layout.appendChild(ReviewForm());

  root.appendChild(layout);
}
