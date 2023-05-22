import { useContext } from 'react';
import { TeleText } from '../components/TeleText';
import { Topbar } from '../components/Topbar';
import { ScoreContext } from '../context/Score/ScoreContext';
import { usePlayerStats } from '../hooks/usePlayerStats';
import { colors } from '../App.styles';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

export const PlayerCard = () => {
    const { scoreState, dispatch } = useContext(ScoreContext);
    const { loading, stats, error } = usePlayerStats('yearByYear');

    const onBack = () => {
        dispatch({ ...scoreState, activePlayer: null });
    };

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;
        else if (error) return <Notification message="Failed to load player stats" />;

        return Object.entries(stats).map((key, value) => {
            return (
                <TeleText
                    testID="player-stat"
                    key={value}
                    style={{ lineHeight: 15, color: colors.blue }}
                >{`${key[0]}: ${key[1]}`}</TeleText>
            );
        });
    };

    return (
        <>
            <Topbar
                left={{ title: 'Back', onPress: onBack }}
                title={scoreState.activePlayer.fullName}
            />

            {renderContent()}
        </>
    );
};
