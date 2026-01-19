import { renderApp } from './components/App';
import { loadFromStorage } from './services/app.storage';

document.addEventListener('DOMContentLoaded', (): void => {
  loadFromStorage();
  renderApp();
});
