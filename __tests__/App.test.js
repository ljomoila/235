import React from 'react';
import App from '../App';
import { renderTest } from './testUtils';

jest.mock('../hooks/useSetupApp');

describe('App', () => {
    beforeEach(() => {});

    it('renders loading indicator while app state loading', () => {
        // when
        const { getByAccessibilityHint } = renderTest(<App />, { appState: { loading: true } });

        // then
        expect(getByAccessibilityHint('loading')).toBeTruthy();
    });

    it('renders scores as active view', () => {
        // when
        const { getByTestId } = renderTest(<App />, {
            appState: { loading: false, activeView: 'scores' }
        });

        // then
        expect(getByTestId('scores')).toBeTruthy();
    });
});
