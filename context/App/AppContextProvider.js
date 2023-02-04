import { useMemo, useReducer } from 'react';
import { reduce } from '../utils';
import { initialAppState, AppContext } from './AppContext';

const AppContextProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reduce, initialAppState);

  const contextValue = useMemo(() => ({ appState, dispatch }), [appState, dispatch]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
