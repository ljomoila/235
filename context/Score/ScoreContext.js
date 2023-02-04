import { createContext } from 'react';

export const initialScoreState = {
  dateIndex: 0,
  update: true,
  activePlayer: null
};

export const ScoreContext = createContext({
  scoreState: initialScoreState,
  dispatch: () => initialScoreState
});
