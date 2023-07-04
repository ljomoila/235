import { TeleText } from '../components/TeleText';
import { usePlayerStats } from '../hooks/usePlayerStats';
import { colors } from '../App.styles';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

export const PlayerCard = () => {
    const { loading, stats, error } = usePlayerStats('yearByYear');

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;
        else if (error) return <Notification message="Failed to load player stats" />;

        // TODO: refactor when player stats POJO comes from backend
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

    return <>{renderContent()}</>;
};
