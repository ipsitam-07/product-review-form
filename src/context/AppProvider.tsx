import { createContext, useEffect, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';

import type { AppState } from '../types/state';
import type { Action } from '../state/actions';
import { appReducer } from '../state/reducer';
import { initialAppState } from '../state/appState';
import { getterStorage, setterStorage } from '../storage/storage';

type AppContextValue = {
  state: AppState;
  dispatch: Dispatch<Action>;
};
export const AppContext = createContext<AppContextValue>({
  state: initialAppState,
  dispatch: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    dispatch({
      type: 'STORE_REVIEW',
      payload: {
        reviews: getterStorage(),
      },
    });
  }, []);

  useEffect(() => {
    setterStorage(state.reviews);
  }, [state.reviews]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
