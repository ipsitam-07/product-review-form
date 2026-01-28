import { useEffect, useReducer, useRef } from 'react';
import type { ReactNode } from 'react';
import { appReducer } from '../state/reducer';
import { initialAppState } from '../state/appState';
import { getterStorage, setterStorage } from '../storage/storage';
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

    hasHydration.current = true;
  }, []);

  useEffect(() => {
    setterStorage(state.reviews);
  }, [state.reviews]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
