import React from 'react';
import App from '../App';
import { renderTest } from '../testUtils';
import { initialAppState } from '../context/App/AppContext';

jest.mock('../hooks/useSetupApp');

describe('App', () => {
    it('renders loading indicator while app state loading', () => {
        // when
        const { getByAccessibilityHint } = renderTest(<App />, { appState: { loading: true } });

        // then
        expect(getByAccessibilityHint('loading')).toBeTruthy();
    });

    // TODO: for some reason context does not get mocked properly for App
    it.skip('renders scores as active view', () => {
        // when
        const { getByTestId } = renderTest(<App />, {
            appState: { ...initialAppState, loading: false, activeView: 'scores' }
        });

        // then
        expect(getByTestId('scores')).toBeTruthy();
    });
});
