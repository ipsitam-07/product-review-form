import { Form } from './Form';
import { Table } from './Table';
import { state } from '../state/app.state';
import { ThemeToggle } from './ThemeToggle';

export function renderApp(): void {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element app not found');
  }

  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${state.theme}`);

  root.innerHTML = '';

  const topBar = document.createElement('div');
  topBar.className = 'top-bar';
  topBar.appendChild(ThemeToggle());

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

  root.appendChild(topBar);
  root.appendChild(layout);
}
