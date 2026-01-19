import { renderApp } from './components/App';
import { loadFromStorage, loadTheme } from './storage/app.storage';

document.addEventListener('DOMContentLoaded', (): void => {
  loadTheme();
  loadFromStorage();
  renderApp();
});
