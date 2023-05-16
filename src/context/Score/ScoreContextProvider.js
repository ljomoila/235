import { useMemo, useReducer } from 'react';
import { reduce } from '../utils';
import { initialScoreState, ScoreContext } from './ScoreContext';

const ScoreContextProvider = ({ children }) => {
  const [scoreState, dispatch] = useReducer(reduce, initialScoreState);

  const contextValue = useMemo(() => ({ scoreState, dispatch }), [scoreState, dispatch]);

  return <ScoreContext.Provider value={contextValue}>{children}</ScoreContext.Provider>;
};

export default ScoreContextProvider;
