import { renderApp } from './components/App';
import { loadFromStorage } from './storage/app.storage';

document.addEventListener('DOMContentLoaded', (): void => {
  loadFromStorage();
  renderApp();
});
