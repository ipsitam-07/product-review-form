import { state } from '../state/app.state';
import { persistTheme } from '../storage/app.storage';
import { renderApp } from './App';

export function ThemeToggle(): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'theme-btn';

  button.textContent = state.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  button.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    persistTheme();
    renderApp();
  });

  return button;
}
