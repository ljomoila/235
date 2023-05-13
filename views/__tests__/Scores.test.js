import React from 'react';
import Scores from '../Scores';
import { initialScoreState } from '../../context/Score/ScoreContext';
import { renderTest } from '../../testUtils';

const useScoresMock = { loading: false, scores: [] };
jest.mock('../../hooks/useScores', () => {
    return jest.fn(() => useScoresMock);
});

describe('Scores', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

    beforeEach(() => {
        useScoresMock = { loading: false, scores: [] };
    });

    it('renders topbar info and loading indicator while scores are loading', () => {
        // given
        useScoresMock.loading = true;

        // when
        const { getByAccessibilityHint, getByText } = renderTest(<Scores />);

        // then
        expect(getByAccessibilityHint('loading')).toBeTruthy();
        expect(getByText('Back')).toBeTruthy();
        expect(getByText('Forward')).toBeTruthy();
        expect(getByText('2023-01-01')).toBeTruthy();
    });

    it('renders scores view', () => {
        // given
        useScoresMock.scores = [
            {
                dateTime: 1683932400000,
                status: 'SCHEDULED',
                teams: { away: { players: [] }, home: { players: [] } }
            },
            {
                dateTime: 1683943200000,
                status: 'SCHEDULED',
                teams: { away: { players: [] }, home: { players: [] } }
            }
        ];

        // when
        const { getAllByText } = renderTest(<Scores />);

        // then
        expect(getAllByText('SCHEDULED').length).toEqual(2);
    });

    it('renders no schduled games when no scores', () => {
        // given
        useScoresMock.scores = [];

        // when
        const { getByText } = renderTest(<Scores />);

        // then
        expect(getByText('No scheduled games')).toBeTruthy();
    });

    it('renders active player when set', () => {
        // when
        const { getByText } = renderTest(<Scores />, {
            scoreState: { ...initialScoreState, activePlayer: { fullName: 'Test Player' } }
        });

        // then
        expect(getByText('Test Player')).toBeTruthy();
    });
});
