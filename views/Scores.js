import { useContext } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import ScoreStatus from '../components/ScoreStatus';
import { getDateStr } from '../components/ScoresTopbar';
import ScoreTeam from '../components/ScoreTeam';
import { TeleText } from '../components/TeleText';
import { Topbar } from '../components/Topbar';
import { ScoreContext } from '../context/Score/ScoreContext';
import useScores from '../hooks/useScores';
import { PlayerCard } from './PlayerCard';

const Scores = () => {
  const { scoreState, dispatch } = useContext(ScoreContext);
  const { loading, scores, error } = useScores();

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

  return (
    <>
      <Topbar
        title={getDateStr(scoreState.dateIndex)}
        left={{ title: 'Back', onPress: () => onDateChange(-1) }}
        right={{ title: 'Forward', onPress: () => onDateChange(1) }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />}
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
    </>
  );
};

const styles = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#454547'
  },
  player: {
    fontSize: 12,
    marginBottom: 5
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    width: '20%',
    paddingTop: 5
  },
  score: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scoreItem: {
    fontSize: 14,
    color: '#23ff06',
    marginBottom: 5
  },
  status: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  }
});

export default Scores;
