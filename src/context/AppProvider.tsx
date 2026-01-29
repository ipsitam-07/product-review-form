import { useEffect, useReducer, useRef } from 'react';
import type { ReactNode } from 'react';
import { appReducer } from '../state/reducer';
import { initialAppState } from '../state/app.state';
import { getterStorage, setterStorage, setterTheme, getterTheme } from '../storage/storage';
import { AppContext } from './AppContext';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const hasHydration = useRef(false);

  useEffect(() => {
    if (hasHydration.current) return;
    dispatch({
      type: 'STORE_REVIEW',
      payload: {
        reviews: getterStorage(),
      },
    });

    dispatch({
      type: 'SET_THEME',
      theme: getterTheme() ?? 'light',
    });

    hasHydration.current = true;
  }, []);

  useEffect(() => {
    setterStorage(state.reviews);
  }, [state.reviews]);

  useEffect(() => {
    setterTheme(state.theme);
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', state.theme === 'dark');
  }, [state.theme]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
