import { useContext } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import ScoreStatus from '../components/ScoreStatus';
import { getDateStr } from '../components/ScoresTopbar';
import ScoreTeam from '../components/ScoreTeam';
import { TeleText } from '../components/TeleText';
import { ScoreContext } from '../context/Score/ScoreContext';
import useScores from '../hooks/useScores';
import styles from './Scores.styles';
import LoadingSpinner from '../components/LoadingSpinner';
import Notification from '../components/Notification';

const Scores = () => {
    const { scoreState, dispatch } = useContext(ScoreContext);
    const { loading, games, error } = useScores();

    const onRefresh = () => {
        dispatch({ ...scoreState, update: true });
    };

    const renderScoresContent = () => {
        if (loading) return <LoadingSpinner />;
        else if (error) return <Notification message="Failed to load scores" />;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />
                }
            >
                {games.length ? (
                    games.map(({ home, away, status }, i) => (
                        <View key={i} style={styles.game}>
                            <ScoreTeam team={home} homeTeam={true} />
                            <ScoreStatus home={home} away={away} status={status} />
                            <ScoreTeam team={away} />
                        </View>
                    ))
                ) : (
                    <TeleText>No scheduled games</TeleText>
                )}
            </ScrollView>
        );
    };

    return <View testID="scores">{renderScoresContent()}</View>;
};

export default Scores;
