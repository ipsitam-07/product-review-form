import { Form } from './Form';
import { Table } from './Table';
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

  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container';

  formContainer.appendChild(Form(state));
  tableContainer.appendChild(Table(state));
  layout.appendChild(formContainer);
  layout.appendChild(tableContainer);

  root.appendChild(layout);
}
