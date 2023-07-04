import { createContext } from 'react';
import Api from '../../service/Api';

export const Views = {
    SELECT_COUNTRY: 'select_country',
    SCORES: 'scores',
    PLAYER_STATS: 'player_stats',
    TEAM_STANDINGS: 'team_standings',
    PLAYER_STANDINGS: 'player_standings'
};

export const initialAppState = {
    api: new Api(),
    loading: true,
    error: '',
    activeView: Views.SELECT_COUNTRY,
    selectedCountry: 'FIN',
    teams: []
};

export const AppContext = createContext({
    appState: initialAppState,
    dispatch: () => initialAppState
});
