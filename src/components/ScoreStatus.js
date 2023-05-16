import { StyleSheet, View } from 'react-native';
import { TeleText } from './TeleText';

const ScoreStatus = ({ teams, status }) => {
  return (
    <View style={styles.scoreContainer}>
      <TeleText style={styles.scoreItem}>
        {teams.home.goals}-{teams.away.goals}
      </TeleText>
      <TeleText style={styles.status}>{status}</TeleText>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
    width: '20%',
    paddingTop: 5
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

export default ScoreStatus;
