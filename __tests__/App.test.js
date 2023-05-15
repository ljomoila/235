import React from 'react';
import App from '../App';
import { renderTest } from '../testUtils';
import { initialAppState } from '../context/App/AppContext';

jest.mock('../hooks/useSetupApp');

describe('App', () => {
    it('renders loading indicator while app state loading', () => {
        // given
        initialAppState.loading = true;

        // when
        const { getByAccessibilityHint } = renderTest(<App />);

        // then
        expect(getByAccessibilityHint('loading')).toBeTruthy();
    });

    it('renders scores as active view', () => {
        // given
        initialAppState.loading = false;

        // when
        const { getByTestId } = renderTest(<App />);

        // then
        expect(getByTestId('scores')).toBeTruthy();
    });
});
