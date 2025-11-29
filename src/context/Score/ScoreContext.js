import { createContext } from 'react';

export const initialScoreState = {
    date: new Date(),
    update: true,
    activePlayer: null // TODO: move player stuff to own context
};

export const ScoreContext = createContext({
    scoreState: initialScoreState,
    dispatch: () => initialScoreState
});
