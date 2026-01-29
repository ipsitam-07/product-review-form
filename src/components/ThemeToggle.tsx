import { FaMoon, FaSun } from 'react-icons/fa';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function ThemeToggle() {
  const { state, dispatch } = useContext(AppContext);
  const isDark = state.theme === 'dark';

  return (
    <button className="theme-toggle" onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
