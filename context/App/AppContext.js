import { createContext } from 'react';
import Api from '../../service/Api';

export const Views = {
    SCORES: 'scores',
    TEAM_STANDINGS: 'team_standings',
    PLAYER_STANDINGS: 'player_standings'
};

export const initialAppState = {
    api: new Api(),
    loading: true,
    error: '',
    activeView: Views.SCORES,
    teams: []
};

export const AppContext = createContext({
    appState: initialAppState,
    dispatch: () => initialAppState
});
