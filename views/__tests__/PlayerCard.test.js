import React from 'react';
import { PlayerCard } from '../PlayerCard';
import { renderTest } from '../../testUtils';
import { initialScoreState } from '../../context/Score/ScoreContext';
import { usePlayerStats } from '../../hooks/usePlayerStats';

jest.mock('../../hooks/usePlayerStats');

const scoreState = { ...initialScoreState, activePlayer: { fullName: 'Test Player' } };

describe('PlayerCard', () => {
    beforeEach(() => {
        usePlayerStats.mockReturnValue({ loading: false, stats: {} });
    });

    it('renders topbar and loading spinner while player stats loading', () => {
        // given
        usePlayerStats.mockReturnValue({ loading: true });

        // when
        const { getByAccessibilityHint, getByText } = renderTest(<PlayerCard />, { scoreState });

        // then
        expect(getByText('Test Player')).toBeTruthy();
        expect(getByText('Back')).toBeTruthy();
        expect(getByAccessibilityHint('loading')).toBeTruthy();
    });

    it('renders player stats', () => {
        // given
        usePlayerStats.mockReturnValue({
            loading: false,
            stats: { '2019-20': { games: 80 }, '2020-21': { games: 82 } }
        });

        // when
        const { getAllByTestId } = renderTest(<PlayerCard />, { scoreState });

        // then
        expect(getAllByTestId('player-stat').length).toEqual(2);
    });

    it('renders error when loading stats fails', () => {
        // given
        usePlayerStats.mockReturnValue({ loading: false, error: true });

        // when
        const { getByText } = renderTest(<PlayerCard />, { scoreState });

        // then
        expect(getByText('Failed to load player stats')).toBeTruthy();
    });
});
