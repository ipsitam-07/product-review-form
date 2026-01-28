import type { AppState } from '../types/state';
import type { Dispatch } from 'react';
import type { Action } from '../state/actions';
import { createContext } from 'react';
import { initialAppState } from '../state/appState';
type AppContextValue = {
  state: AppState;
  dispatch: Dispatch<Action>;
};
export const AppContext = createContext<AppContextValue>({
  state: initialAppState,
  dispatch: () => {},
});
