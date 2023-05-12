import { useContext } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native';
import ScoreStatus from '../components/ScoreStatus';
import { getDateStr } from '../components/ScoresTopbar';
import ScoreTeam from '../components/ScoreTeam';
import { TeleText } from '../components/TeleText';
import { Topbar } from '../components/Topbar';
import { ScoreContext } from '../context/Score/ScoreContext';
import useScores from '../hooks/useScores';
import { PlayerCard } from './PlayerCard';
import styles from './Scores.styles';
import LoadingSpinner from '../components/LoadingSpinner';

const Scores = () => {
    const { scoreState, dispatch } = useContext(ScoreContext);
    const { loading, scores } = useScores();

    const onRefresh = () => {
        dispatch({ ...scoreState, update: true });
    };

    const onDateChange = (increment) => {
        const dateIndex = scoreState.dateIndex + increment;
        dispatch({ ...scoreState, dateIndex, update: true });
    };

    if (scoreState.activePlayer) {
        return <PlayerCard />;
    }

    // TODO: Add error handling

    return (
        <View data-testid="scores">
            <Topbar
                title={getDateStr(scoreState.dateIndex)}
                left={{ title: 'Back', onPress: () => onDateChange(-1) }}
                right={{ title: 'Forward', onPress: () => onDateChange(1) }}
            />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />
                    }
                >
                    {scores.length ? (
                        scores.map(({ teams, status }, i) => (
                            <View key={i} style={styles.game}>
                                <ScoreTeam team={teams.home} />
                                <ScoreStatus teams={teams} status={status} />
                                <ScoreTeam team={teams.away} />
                            </View>
                        ))
                    ) : (
                        <TeleText>No scheduled games</TeleText>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default Scores;
