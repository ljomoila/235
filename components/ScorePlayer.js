import { colors } from '../styles';
import { TeleText } from './TeleText';

const ScorePlayer = ({ stats, styles, onPress }) => {
  const { player, goals, assists } = stats;
  styles.color = player.nationality === 'FIN' ? colors.green : colors.blue;

  return (
    <TeleText style={styles} onPress={() => onPress(player)}>
      {player.displayName} {`${goals}+${assists}`}
    </TeleText>
  );
};

export default ScorePlayer;
