import { Form } from './Form';
import { state } from '../state/app.state';

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'app';

  const formContainer = document.createElement('div');
  formContainer.className = 'container';

  formContainer.appendChild(Form(state));
  layout.appendChild(formContainer);

  root.appendChild(layout);
}
